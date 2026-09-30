"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RealLocationData, SimulatedDeviceData, SessionPoint, formatCoordinateDMS } from "@/lib/tools/findDevice";

interface CinematicGlobeProps { liveLocation?: RealLocationData | null; simulatedLocation?: SimulatedDeviceData | null; sessionTrail?: SessionPoint[]; className?: string; }
const EARTH_RADIUS = 1.62;
const SURFACE_RADIUS = EARTH_RADIUS + 0.012;
function coordinateVector(latitude: number, longitude: number, radius: number): THREE.Vector3 { const lat = THREE.MathUtils.degToRad(latitude); const lng = THREE.MathUtils.degToRad(longitude); return new THREE.Vector3(radius * Math.cos(lat) * Math.sin(lng), radius * Math.sin(lat), radius * Math.cos(lat) * Math.cos(lng)); }
function disposeObject(root: THREE.Object3D) { root.traverse((child) => { const mesh = child as THREE.Mesh; if (mesh.geometry) mesh.geometry.dispose(); if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((material) => material.dispose()); }); }

export function CinematicGlobe({ liveLocation = null, simulatedLocation = null, sessionTrail = [], className = "" }: CinematicGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeLocation = liveLocation || simulatedLocation;
  const isSimulated = !liveLocation && !!simulatedLocation;
  const locationKey = activeLocation ? `${activeLocation.latitude}:${activeLocation.longitude}:${isSimulated ? "simulated" : "live"}` : "empty";
  const dms = activeLocation ? formatCoordinateDMS(activeLocation.latitude, activeLocation.longitude) : null;

  useEffect(() => { const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)"); const updateMotion = () => setReducedMotion(mediaQuery.matches); updateMotion(); mediaQuery.addEventListener("change", updateMotion); return () => mediaQuery.removeEventListener("change", updateMotion); }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const testCanvas = document.createElement("canvas");
    if (!testCanvas.getContext("webgl") && !testCanvas.getContext("experimental-webgl")) { window.setTimeout(() => setWebglSupported(false), 0); return; }
    const container = containerRef.current;
    const canvas = canvasRef.current;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" }); } catch { window.setTimeout(() => setWebglSupported(false), 0); return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.05, 5.1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x020711, 0);
    const root = new THREE.Group();
    scene.add(root);
    const earth = new THREE.Group();
    root.add(earth);
    const accent = new THREE.Color(isSimulated ? "#f59e0b" : "#38bdf8");
    const accentSoft = new THREE.Color(isSimulated ? "#fbbf24" : "#7dd3fc");
    scene.add(new THREE.AmbientLight(0x25496c, 1.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6); keyLight.position.set(4, 3, 5); scene.add(keyLight);
    const earthMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0, emissive: 0x020b16, emissiveIntensity: 0.12 });
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS, 72, 48), earthMaterial); earth.add(earthMesh);
    const texture = new THREE.TextureLoader().load("/assets/nasa-blue-marble.png", (loaded) => { loaded.colorSpace = THREE.SRGBColorSpace; earthMaterial.map = loaded; earthMaterial.needsUpdate = true; });
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.075, 48, 32), new THREE.MeshBasicMaterial({ color: 0x6fd7ff, transparent: true, opacity: 0.12, side: THREE.BackSide, blending: THREE.AdditiveBlending })); earth.add(atmosphere);
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index += 1) { const radius = 7 + (index % 7); const theta = index * 2.39996; const phi = Math.acos(1 - 2 * ((index + 1) / 181)); starPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta); starPositions[index * 3 + 1] = radius * Math.cos(phi); starPositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta); }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3)); scene.add(new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0x9bdcff, size: 0.025, transparent: true, opacity: 0.65 })));
    const markerLayer = new THREE.Group(); earth.add(markerLayer);
    let marker: THREE.Group | null = null;
    let targetRotation = new THREE.Quaternion();
    if (activeLocation) {
      const point = coordinateVector(activeLocation.latitude, activeLocation.longitude, SURFACE_RADIUS + 0.08);
      const normal = point.clone().normalize();
      targetRotation = new THREE.Quaternion().setFromUnitVectors(normal, new THREE.Vector3(0, 0, 1));
      marker = new THREE.Group(); marker.position.copy(point); marker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal); markerLayer.add(marker);
      marker.add(new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 12), new THREE.MeshBasicMaterial({ color: accent })));
      marker.add(new THREE.Mesh(new THREE.SphereGeometry(0.18, 20, 12), new THREE.MeshBasicMaterial({ color: accentSoft, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending })));
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.17, 48), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.85, side: THREE.DoubleSide })); ring.position.z = 0.01; marker.add(ring);
      const accuracy = liveLocation?.accuracy || simulatedLocation?.accuracyMeters || 25;
      const accuracyScale = THREE.MathUtils.clamp(0.17 + accuracy / 260, 0.2, 0.65);
      const accuracyRing = new THREE.Mesh(new THREE.RingGeometry(accuracyScale * 0.94, accuracyScale, 64), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.25, side: THREE.DoubleSide, blending: THREE.AdditiveBlending })); accuracyRing.position.z = 0.005; marker.add(accuracyRing);
    }
    if (sessionTrail.length > 1) { const trailPoints = sessionTrail.map((point) => coordinateVector(point.latitude, point.longitude, SURFACE_RADIUS + 0.035)); const geometry = new THREE.BufferGeometry().setFromPoints(trailPoints); earth.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.78 })) ); }
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => { const bounds = container.getBoundingClientRect(); pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2; pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2; };
    const onPointerLeave = () => { pointer.x = 0; pointer.y = 0; };
    container.addEventListener("pointermove", onPointerMove); container.addEventListener("pointerleave", onPointerLeave);
    const resize = () => { const width = Math.max(1, container.clientWidth); const height = Math.max(1, container.clientHeight); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container); resize();
    let animationFrame = 0; let elapsed = 0; let lastTime = performance.now();
    const animate = (now: number) => { const delta = Math.min((now - lastTime) / 1000, 0.05); lastTime = now; elapsed += delta; earth.quaternion.slerp(targetRotation, reducedMotion ? 0.12 : 0.045); root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, reducedMotion ? 0 : -pointer.y * 0.06, 0.05); root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, reducedMotion ? 0 : pointer.x * 0.1, 0.05); if (!reducedMotion) earth.rotation.z += delta * 0.008; if (marker) marker.scale.setScalar(reducedMotion ? 1 : 1 + Math.sin(elapsed * 2.6) * 0.12); renderer.render(scene, camera); animationFrame = requestAnimationFrame(animate); };
    animationFrame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animationFrame); resizeObserver.disconnect(); container.removeEventListener("pointermove", onPointerMove); container.removeEventListener("pointerleave", onPointerLeave); texture.dispose(); disposeObject(scene); renderer.dispose(); };
  }, [locationKey, sessionTrail, reducedMotion, activeLocation, isSimulated, liveLocation?.accuracy, simulatedLocation?.accuracyMeters]);

  return <div ref={containerRef} className={`relative min-h-[440px] h-full w-full overflow-hidden ${className}`}><canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />{!webglSupported && <div className="absolute inset-0 flex items-center justify-center bg-slate-950 p-8 text-center font-mono text-xs text-slate-300">WebGL is unavailable in this browser. The location details remain available without the globe.</div>}<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_22%,rgba(2,7,17,0.08)_58%,rgba(2,7,17,0.82)_100%)]" aria-hidden="true" /><div className="pointer-events-none absolute left-5 top-20 max-w-[230px] font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400"><span className="text-sky-300">Snow spatial instrument</span><span className="mt-1 block tracking-normal text-slate-500">Photographic Earth · NASA Blue Marble</span></div><div className="pointer-events-none absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3 font-mono text-xs"><div className="rounded-2xl border border-slate-700/80 bg-slate-950/80 px-3 py-2.5 backdrop-blur-md"><span className="block text-[10px] uppercase tracking-[0.16em] text-slate-500">Earth coordinate state</span><span className="mt-1 block font-bold text-slate-100">{activeLocation ? `${activeLocation.latitude.toFixed(6)}°, ${activeLocation.longitude.toFixed(6)}°` : "Awaiting location signal"}</span>{dms && <span className="mt-1 block text-[10px] text-slate-400">{dms.latDMS} / {dms.lngDMS}</span>}</div><div className={`rounded-xl border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-md ${isSimulated ? "border-amber-700/80 bg-amber-950/80 text-amber-300" : "border-sky-700/80 bg-sky-950/80 text-sky-300"}`}>{isSimulated ? "Preview location · simulated" : activeLocation ? "Browser GPS · live" : "Ready to locate"}</div></div><p className="sr-only" aria-live="polite">{activeLocation ? `${isSimulated ? "Simulated location" : "Browser GPS location"} at ${activeLocation.latitude.toFixed(6)} latitude and ${activeLocation.longitude.toFixed(6)} longitude.` : "No location has been resolved. The globe is ready for a browser location request."}</p></div>;
}
