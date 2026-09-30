"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { LocateFixed, Minus, Move3d, Plus } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RealLocationData, SimulatedDeviceData, SessionPoint, formatCoordinateDMS } from "@/lib/tools/findDevice";

interface CinematicGlobeProps {
  liveLocation?: RealLocationData | null;
  simulatedLocation?: SimulatedDeviceData | null;
  sessionTrail?: SessionPoint[];
  className?: string;
}

const EARTH_RADIUS = 1.62;
const SURFACE_RADIUS = EARTH_RADIUS + 0.012;
const MIN_CAMERA_Z = 4.25;
const MAX_CAMERA_Z = 5.8;

type GlobeState = {
  earth: THREE.Group;
  markerLayer: THREE.Group;
  trailLayer: THREE.Group;
  marker: THREE.Group | null;
  targetRotation: THREE.Quaternion;
  targetZoom: number;
  zoom: number;
  rotationVelocity: THREE.Vector2;
  dragging: boolean;
  hasInteracted: boolean;
  lastPointer: { x: number; y: number } | null;
  lastDragAt: number;
};

function coordinateVector(latitude: number, longitude: number, radius: number): THREE.Vector3 {
  const lat = THREE.MathUtils.degToRad(latitude);
  const lng = THREE.MathUtils.degToRad(longitude);
  return new THREE.Vector3(radius * Math.cos(lat) * Math.sin(lng), radius * Math.sin(lat), radius * Math.cos(lat) * Math.cos(lng));
}

function locationQuaternion(latitude: number, longitude: number): THREE.Quaternion {
  return new THREE.Quaternion().setFromEuler(new THREE.Euler(-THREE.MathUtils.degToRad(latitude), -THREE.MathUtils.degToRad(longitude), 0));
}

function disposeObject(root: THREE.Object3D) {
  root.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((material) => material.dispose());
  });
}

function clearGroup(group: THREE.Group) {
  while (group.children.length) {
    const child = group.children.pop();
    if (child) disposeObject(child);
  }
}

export function CinematicGlobe({ liveLocation = null, simulatedLocation = null, sessionTrail = [], className = "" }: CinematicGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<GlobeState | null>(null);
  const reducedMotion = useReducedMotion();
  const reducedMotionRef = useRef(reducedMotion);
  const [webglSupported, setWebglSupported] = useState(true);
  const [centerNonce, setCenterNonce] = useState(0);
  const activeLocation = liveLocation || simulatedLocation;
  const isSimulated = !liveLocation && !!simulatedLocation;
  const locationKey = activeLocation ? `${activeLocation.latitude}:${activeLocation.longitude}:${isSimulated ? "simulated" : "live"}` : "empty";
  const activeLatitude = activeLocation?.latitude;
  const activeLongitude = activeLocation?.longitude;
  const dms = activeLocation ? formatCoordinateDMS(activeLocation.latitude, activeLocation.longitude) : null;

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const testCanvas = document.createElement("canvas");
    if (!testCanvas.getContext("webgl") && !testCanvas.getContext("experimental-webgl")) {
      window.setTimeout(() => setWebglSupported(false), 0);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      window.setTimeout(() => setWebglSupported(false), 0);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.05, 5.1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x020711, 0);

    const root = new THREE.Group();
    const earth = new THREE.Group();
    const markerLayer = new THREE.Group();
    const trailLayer = new THREE.Group();
    earth.add(markerLayer, trailLayer);
    root.add(earth);
    scene.add(root);
    scene.add(new THREE.AmbientLight(0x25496c, 1.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 3, 5);
    scene.add(keyLight);

    const earthMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0, emissive: 0x020b16, emissiveIntensity: 0.12 });
    earth.add(new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS, 64, 40), earthMaterial));
    const texture = new THREE.TextureLoader().load("/assets/nasa-blue-marble.png", (loaded) => {
      loaded.colorSpace = THREE.SRGBColorSpace;
      earthMaterial.map = loaded;
      earthMaterial.needsUpdate = true;
    });
    earth.add(new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.075, 40, 28), new THREE.MeshBasicMaterial({ color: 0x6fd7ff, transparent: true, opacity: 0.12, side: THREE.BackSide, blending: THREE.AdditiveBlending })));

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index += 1) {
      const radius = 7 + (index % 7);
      const theta = index * 2.39996;
      const phi = Math.acos(1 - 2 * ((index + 1) / 181));
      starPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[index * 3 + 1] = radius * Math.cos(phi);
      starPositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    scene.add(new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0x9bdcff, size: 0.025, transparent: true, opacity: 0.65 })));

    const state: GlobeState = {
      earth,
      markerLayer,
      trailLayer,
      marker: null,
      targetRotation: new THREE.Quaternion(),
      targetZoom: 5.1,
      zoom: 5.1,
      rotationVelocity: new THREE.Vector2(),
      dragging: false,
      hasInteracted: false,
      lastPointer: null,
      lastDragAt: 0,
    };
    globeRef.current = state;

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      state.dragging = true;
      state.hasInteracted = true;
      state.lastPointer = { x: event.clientX, y: event.clientY };
      state.rotationVelocity.set(0, 0);
      canvas.setPointerCapture?.(event.pointerId);
      canvas.classList.add("cursor-grabbing");
    };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      if (state.dragging && state.lastPointer) {
        const dx = event.clientX - state.lastPointer.x;
        const dy = event.clientY - state.lastPointer.y;
        const nextX = THREE.MathUtils.clamp(state.earth.rotation.x + dy * 0.008, -Math.PI / 2.15, Math.PI / 2.15);
        state.earth.rotation.x = nextX;
        state.earth.rotation.y += dx * 0.008;
        state.rotationVelocity.set(dx * 0.00042, dy * 0.00042);
        state.lastPointer = { x: event.clientX, y: event.clientY };
        state.lastDragAt = performance.now();
      }
      canvas.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 2}`);
      canvas.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 2}`);
    };
    const onPointerUp = (event: PointerEvent) => {
      state.dragging = false;
      state.lastPointer = null;
      canvas.releasePointerCapture?.(event.pointerId);
      canvas.classList.remove("cursor-grabbing");
    };
    const onPointerLeave = () => {
      if (!state.dragging) {
        canvas.style.setProperty("--pointer-x", "0");
        canvas.style.setProperty("--pointer-y", "0");
      }
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      state.hasInteracted = true;
      state.targetZoom = THREE.MathUtils.clamp(state.targetZoom + event.deltaY * 0.0025, MIN_CAMERA_Z, MAX_CAMERA_Z);
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    let animationFrame = 0;
    let elapsed = 0;
    let lastTime = performance.now();
    const animate = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += delta;
      const interactionRecentlyEnded = now - state.lastDragAt < 120;
      if (!state.dragging) {
        if (!reducedMotionRef.current && !interactionRecentlyEnded) {
          state.earth.rotation.y += delta * 0.008;
        }
        state.earth.rotation.y += state.rotationVelocity.x;
        state.earth.rotation.x = THREE.MathUtils.clamp(state.earth.rotation.x + state.rotationVelocity.y, -Math.PI / 2.15, Math.PI / 2.15);
        state.rotationVelocity.multiplyScalar(reducedMotionRef.current ? 0.72 : 0.94);
      }
      if (!state.dragging && !state.hasInteracted) state.earth.quaternion.slerp(state.targetRotation, reducedMotionRef.current ? 0.16 : 0.045);
      state.zoom = THREE.MathUtils.lerp(state.zoom, state.targetZoom, reducedMotionRef.current ? 0.22 : 0.08);
      camera.position.z = state.zoom;
      if (state.marker) state.marker.scale.setScalar(reducedMotionRef.current ? 1 : 1 + Math.sin(elapsed * 2.6) * 0.12);
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("wheel", onWheel);
      texture.dispose();
      disposeObject(scene);
      renderer.dispose();
      globeRef.current = null;
    };
    // The Three.js scene is intentionally created once. Mutable refs update data and controls below.
  }, []);

  useEffect(() => {
    const state = globeRef.current;
    if (!state) return;
    state.targetRotation = typeof activeLatitude === "number" && typeof activeLongitude === "number" ? locationQuaternion(activeLatitude, activeLongitude) : new THREE.Quaternion();
    if (!state.hasInteracted) state.earth.quaternion.copy(state.targetRotation);
    clearGroup(state.markerLayer);
    clearGroup(state.trailLayer);
    state.marker = null;
    const accent = isSimulated ? new THREE.Color("#f59e0b") : new THREE.Color("#38bdf8");
    const accentSoft = isSimulated ? new THREE.Color("#fbbf24") : new THREE.Color("#7dd3fc");

    if (typeof activeLatitude === "number" && typeof activeLongitude === "number") {
      const point = coordinateVector(activeLatitude, activeLongitude, SURFACE_RADIUS + 0.08);
      const normal = point.clone().normalize();
      const marker = new THREE.Group();
      marker.position.copy(point);
      marker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      marker.add(new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 12), new THREE.MeshBasicMaterial({ color: accent })));
      marker.add(new THREE.Mesh(new THREE.SphereGeometry(0.18, 20, 12), new THREE.MeshBasicMaterial({ color: accentSoft, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending })));
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.17, 48), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.85, side: THREE.DoubleSide }));
      ring.position.z = 0.01;
      marker.add(ring);
      const accuracy = liveLocation?.accuracy || simulatedLocation?.accuracyMeters || 25;
      const accuracyScale = THREE.MathUtils.clamp(0.17 + accuracy / 260, 0.2, 0.65);
      const accuracyRing = new THREE.Mesh(new THREE.RingGeometry(accuracyScale * 0.94, accuracyScale, 64), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.25, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
      accuracyRing.position.z = 0.005;
      marker.add(accuracyRing);
      state.markerLayer.add(marker);
      state.marker = marker;
    }
    if (sessionTrail.length > 1) {
      const trailPoints = sessionTrail.map((point) => coordinateVector(point.latitude, point.longitude, SURFACE_RADIUS + 0.035));
      state.trailLayer.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(trailPoints), new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.78 })));
    }
  }, [activeLatitude, activeLongitude, isSimulated, liveLocation?.accuracy, locationKey, sessionTrail, simulatedLocation?.accuracyMeters]);

  useEffect(() => {
    const state = globeRef.current;
    if (!state) return;
    state.targetRotation = typeof activeLatitude === "number" && typeof activeLongitude === "number" ? locationQuaternion(activeLatitude, activeLongitude) : new THREE.Quaternion();
    state.hasInteracted = false;
  }, [activeLatitude, activeLongitude, centerNonce, locationKey]);

  const nudge = (x: number, y: number) => {
    const state = globeRef.current;
    if (!state) return;
    state.hasInteracted = true;
    state.rotationVelocity.x += x;
    state.rotationVelocity.y += y;
  };
  const changeZoom = (amount: number) => {
    const state = globeRef.current;
    if (!state) return;
    state.hasInteracted = true;
    state.targetZoom = THREE.MathUtils.clamp(state.targetZoom + amount, MIN_CAMERA_Z, MAX_CAMERA_Z);
  };

  return (
    <div ref={containerRef} className={`relative min-h-[440px] h-full w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-grab touch-none" aria-label="Interactive NASA Blue Marble Earth. Drag to rotate, use the controls to move, and use the mouse wheel to zoom." />
      {!webglSupported && <div className="absolute inset-0 flex items-center justify-center bg-slate-950 p-8 text-center font-mono text-xs text-slate-300">WebGL is unavailable in this browser. The location details remain available without the globe.</div>}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_22%,rgba(2,7,17,0.08)_58%,rgba(2,7,17,0.82)_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-5 top-20 max-w-[230px] font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400"><span className="text-sky-300">Snow spatial instrument</span><span className="mt-1 block tracking-normal text-slate-500">Photographic Earth · NASA Blue Marble</span></div>
      <div className="absolute right-5 top-20 z-10 flex items-center gap-1 rounded-xl border border-slate-700/80 bg-slate-950/80 p-1 font-mono text-[10px] text-slate-300 backdrop-blur-md" role="group" aria-label="Globe controls">
        <button type="button" onClick={() => nudge(-0.014, 0)} className="rounded-lg px-2 py-1.5 hover:bg-slate-800" aria-label="Rotate globe left">←</button>
        <button type="button" onClick={() => nudge(0.014, 0)} className="rounded-lg px-2 py-1.5 hover:bg-slate-800" aria-label="Rotate globe right">→</button>
        <button type="button" onClick={() => nudge(0, -0.014)} className="rounded-lg px-2 py-1.5 hover:bg-slate-800" aria-label="Rotate globe up">↑</button>
        <button type="button" onClick={() => nudge(0, 0.014)} className="rounded-lg px-2 py-1.5 hover:bg-slate-800" aria-label="Rotate globe down">↓</button>
        <button type="button" onClick={() => setCenterNonce((value) => value + 1)} className="rounded-lg px-2 py-1.5 hover:bg-slate-800" aria-label="Center location"><LocateFixed size={13} /></button>
        <button type="button" onClick={() => changeZoom(-0.35)} className="rounded-lg px-2 py-1.5 hover:bg-slate-800" aria-label="Zoom in"><Plus size={13} /></button>
        <button type="button" onClick={() => changeZoom(0.35)} className="rounded-lg px-2 py-1.5 hover:bg-slate-800" aria-label="Zoom out"><Minus size={13} /></button>
      </div>
      <div className="pointer-events-none absolute bottom-24 left-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400"><Move3d size={13} className="text-sky-300" /> drag earth to rotate <span className="text-slate-600">·</span> wheel to zoom</div>
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3 font-mono text-xs"><div className="rounded-2xl border border-slate-700/80 bg-slate-950/80 px-3 py-2.5 backdrop-blur-md"><span className="block text-[10px] uppercase tracking-[0.16em] text-slate-500">Earth coordinate state</span><span className="mt-1 block font-bold text-slate-100">{activeLocation ? `${activeLocation.latitude.toFixed(6)}°, ${activeLocation.longitude.toFixed(6)}°` : "Awaiting location signal"}</span>{dms && <span className="mt-1 block text-[10px] text-slate-400">{dms.latDMS} / {dms.lngDMS}</span>}</div><div className={`rounded-xl border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-md ${isSimulated ? "border-amber-700/80 bg-amber-950/80 text-amber-300" : "border-sky-700/80 bg-sky-950/80 text-sky-300"}`}>{isSimulated ? "Preview location · simulated" : activeLocation ? "Browser GPS · live" : "Ready to locate"}</div></div>
      <p className="sr-only" aria-live="polite">{activeLocation ? `${isSimulated ? "Simulated location" : "Browser GPS location"} at ${activeLocation.latitude.toFixed(6)} latitude and ${activeLocation.longitude.toFixed(6)} longitude.` : "No location has been resolved. The globe is ready to receive a location."}</p>
    </div>
  );
}
