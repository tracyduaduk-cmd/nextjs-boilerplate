"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useCursor } from "@/components/spatial/CursorSystem";

export interface SpatialEarthGlobeProps {
  latitude?: number;
  longitude?: number;
  accuracyMeters?: number;
  status?: string;
  isSimulated?: boolean;
  className?: string;
  accentColor?: string;
  interactive?: boolean;
  autoRotate?: boolean;
  showCoordinatesBadge?: boolean;
}

/**
 * Converts Latitude and Longitude in degrees to a 3D Cartesian vector on a sphere of radius R.
 */
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

export function SpatialEarthGlobe({
  latitude = 9.8965,
  longitude = 8.8583,
  accuracyMeters = 25,
  status = "READY",
  isSimulated = false,
  className = "",
  accentColor,
  interactive = true,
  autoRotate = true,
  showCoordinatesBadge = true,
}: SpatialEarthGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported] = useState<boolean>(checkWebGLSupport);
  const [, setIsDraggingState] = useState<boolean>(false);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
  const { setCursorState, resetCursorState } = useCursor();

  // Pointer interaction state refs
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const globeGroupRef = useRef<THREE.Group | null>(null);

  const primaryAccentHex = accentColor || (isSimulated ? "#f59e0b" : "#38bdf8");

  useEffect(() => {
    if (!webglSupported || !containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 6.8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    globeGroupRef.current = mainGroup;

    const globeRadius = 2.2;
    const accentHexNumber = parseInt(primaryAccentHex.replace("#", ""), 16);

    // 1. Core Obsidian Glass Sphere
    const coreGeo = new THREE.IcosahedronGeometry(globeRadius, 4);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x020617,
      emissive: 0x0b1329,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.6,
      opacity: 0.9,
      transparent: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Latitude & Longitude Wireframe Grid
    const gridGroup = new THREE.Group();
    mainGroup.add(gridGroup);

    // Parallels (Latitudes)
    const latSteps = [-60, -30, 0, 30, 60];
    latSteps.forEach((latDeg) => {
      const phi = (90 - latDeg) * (Math.PI / 180);
      const r = globeRadius * Math.sin(phi);
      const y = globeRadius * Math.cos(phi);

      const circleGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      circleGeo.setFromPoints(points);

      const isEquator = latDeg === 0;
      const lineMat = new THREE.LineBasicMaterial({
        color: isEquator ? accentHexNumber : 0x1e293b,
        transparent: true,
        opacity: isEquator ? 0.7 : 0.35,
      });
      const line = new THREE.Line(circleGeo, lineMat);
      gridGroup.add(line);
    });

    // Meridians (Longitudes)
    const lngSteps = 12;
    for (let i = 0; i < lngSteps; i++) {
      const theta = (i / lngSteps) * Math.PI * 2;
      const circleGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            globeRadius * Math.sin(phi) * Math.cos(theta),
            globeRadius * Math.cos(phi),
            globeRadius * Math.sin(phi) * Math.sin(theta)
          )
        );
      }
      circleGeo.setFromPoints(points);

      const lineMat = new THREE.LineBasicMaterial({
        color: i === 0 ? accentHexNumber : 0x0f172a,
        transparent: true,
        opacity: i === 0 ? 0.6 : 0.25,
      });
      const line = new THREE.Line(circleGeo, lineMat);
      gridGroup.add(line);
    }

    // 3. Geographic Topological Point Cloud
    const particleCount = 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    let pIndex = 0;
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const r = globeRadius + 0.02;
      particlePositions[pIndex * 3] = x * r;
      particlePositions[pIndex * 3 + 1] = y * r;
      particlePositions[pIndex * 3 + 2] = z * r;

      particleSizes[pIndex] = (Math.sin(i * 0.1) + 1.5) * 1.5;
      pIndex++;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const pointCloud = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(pointCloud);

    // 4. Outer Atmosphere Glow Sphere
    const atmosGeo = new THREE.IcosahedronGeometry(globeRadius + 0.22, 3);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: accentHexNumber,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    mainGroup.add(atmosMesh);

    // 5. Spatial Location Marker & Ripples
    const markerGroup = new THREE.Group();
    mainGroup.add(markerGroup);

    // Core Beacon Sphere
    const beaconGeo = new THREE.IcosahedronGeometry(0.06, 2);
    const beaconMat = new THREE.MeshBasicMaterial({ color: accentHexNumber });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    markerGroup.add(beaconMesh);

    // Radial Ray Line extending outwards
    const rayPoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0.4)];
    const rayGeo = new THREE.BufferGeometry().setFromPoints(rayPoints);
    const rayMat = new THREE.LineBasicMaterial({
      color: accentHexNumber,
      transparent: true,
      opacity: 0.8,
    });
    const rayLine = new THREE.Line(rayGeo, rayMat);
    markerGroup.add(rayLine);

    // Concentric Ripple Ring 1
    const rippleGeo1 = new THREE.RingGeometry(0.08, 0.1, 32);
    const rippleMat1 = new THREE.MeshBasicMaterial({
      color: accentHexNumber,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const rippleMesh1 = new THREE.Mesh(rippleGeo1, rippleMat1);
    markerGroup.add(rippleMesh1);

    // Concentric Ripple Ring 2
    const rippleGeo2 = new THREE.RingGeometry(0.14, 0.16, 32);
    const rippleMat2 = new THREE.MeshBasicMaterial({
      color: accentHexNumber,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const rippleMesh2 = new THREE.Mesh(rippleGeo2, rippleMat2);
    markerGroup.add(rippleMesh2);

    // Accuracy Field Ring
    const accuracyRadius = Math.min(0.6, Math.max(0.15, Math.log10(accuracyMeters + 1) * 0.15));
    const accuracyGeo = new THREE.RingGeometry(accuracyRadius - 0.02, accuracyRadius, 48);
    const accuracyMat = new THREE.MeshBasicMaterial({
      color: accentHexNumber,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const accuracyMesh = new THREE.Mesh(accuracyGeo, accuracyMat);
    markerGroup.add(accuracyMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0284c7, 1.0);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    // --- ANIMATION LOOP & COORD TARGETING ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const targetPos = latLngToVector3(latitude, longitude, globeRadius);

    // Position marker group on globe surface
    markerGroup.position.copy(targetPos);
    markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), targetPos.clone().normalize());

    const render = () => {
      const time = clock.getElapsedTime();

      // Animate Beacon Ripples
      const scale1 = 1 + (Math.sin(time * 3) + 1) * 0.3;
      rippleMesh1.scale.set(scale1, scale1, 1);
      (rippleMesh1.material as THREE.MeshBasicMaterial).opacity = 0.8 - (scale1 - 1) * 0.8;

      const scale2 = 1 + (Math.sin(time * 3 + Math.PI) + 1) * 0.4;
      rippleMesh2.scale.set(scale2, scale2, 1);
      (rippleMesh2.material as THREE.MeshBasicMaterial).opacity = 0.5 - (scale2 - 1) * 0.5;

      // Handle Inertial Globe Rotation
      if (!isDraggingRef.current) {
        if (!hasUserInteracted && autoRotate && !prefersReducedMotion) {
          const targetPhi = (longitude + 180) * (Math.PI / 180);
          const targetTheta = (latitude * Math.PI) / 180;

          mainGroup.rotation.y = THREE.MathUtils.lerp(mainGroup.rotation.y, -targetPhi + Math.PI / 2, 0.03);
          mainGroup.rotation.x = THREE.MathUtils.lerp(mainGroup.rotation.x, targetTheta * 0.3, 0.03);
        } else {
          mainGroup.rotation.y += velocityRef.current.x;
          mainGroup.rotation.x += velocityRef.current.y;

          velocityRef.current.x *= 0.93;
          velocityRef.current.y *= 0.93;
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      rayGeo.dispose();
      rayMat.dispose();
      rippleGeo1.dispose();
      rippleMat1.dispose();
      rippleGeo2.dispose();
      rippleMat2.dispose();
      accuracyGeo.dispose();
      accuracyMat.dispose();

      renderer.dispose();
    };
  }, [webglSupported, latitude, longitude, accuracyMeters, isSimulated, primaryAccentHex, autoRotate, hasUserInteracted]);

  // --- POINTER DRAG INTERACTION ---
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    setIsDraggingState(true);
    setHasUserInteracted(true);
    previousPointerRef.current = { x: e.clientX, y: e.clientY };
    setCursorState("DRAG", "ORBIT");
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !globeGroupRef.current) return;

    const deltaX = e.clientX - previousPointerRef.current.x;
    const deltaY = e.clientY - previousPointerRef.current.y;

    velocityRef.current = {
      x: deltaX * 0.005,
      y: deltaY * 0.005,
    };

    globeGroupRef.current.rotation.y += deltaX * 0.006;
    globeGroupRef.current.rotation.x += deltaY * 0.006;

    globeGroupRef.current.rotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, globeGroupRef.current.rotation.x));

    previousPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
    resetCursorState();
  };

  if (!webglSupported) {
    return (
      <div className={`relative w-full h-full min-h-[320px] bg-slate-950 rounded-3xl border border-slate-800 flex items-center justify-center p-6 text-center ${className}`}>
        <div className="space-y-2">
          <p className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">WebGL Fallback Engine Active</p>
          <p className="text-xs text-slate-400 font-sans">
            Position: {latitude.toFixed(4)}°, {longitude.toFixed(4)}° (±{Math.round(accuracyMeters)}m)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[340px] sm:min-h-[420px] overflow-hidden select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <canvas ref={canvasRef} className="w-full h-full block touch-pan-y cursor-grab active:cursor-grabbing" />

      {showCoordinatesBadge && (
        <div className="absolute bottom-4 left-4 z-10 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md font-mono text-xs space-y-1 shadow-xl pointer-events-none">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: primaryAccentHex }}
            />
            <span className="text-slate-100 font-bold">
              {latitude.toFixed(5)}°, {longitude.toFixed(5)}°
            </span>
          </div>
          <div className="flex justify-between gap-4 text-[10px] text-slate-400">
            <span>Accuracy: ±{Math.round(accuracyMeters)}m</span>
            <span className="uppercase text-sky-400 font-semibold">{status}</span>
          </div>
        </div>
      )}

      {hasUserInteracted && (
        <button
          type="button"
          onClick={() => setHasUserInteracted(false)}
          className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800/80 backdrop-blur-md text-[10px] font-mono font-bold transition-all shadow-lg"
        >
          RE-CENTER COORDINATES
        </button>
      )}
    </div>
  );
}
