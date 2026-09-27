'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useCursor } from '@/components/spatial/CursorSystem';

export type SpatialInstrumentMode =
  | 'home'
  | 'work-index'
  | 'commerce'
  | 'aurora-commerce'
  | 'health'
  | 'pulse-health'
  | 'finance'
  | 'orbit-finance'
  | 'ai'
  | 'nova-ai-assistant'
  | 'business'
  | 'atlas-business-portal'
  | 'design'
  | 'studio-landing'
  | 'local'
  | 'local-services-platform'
  | 'security'
  | 'secure-account-recovery'
  | 'services'
  | 'care'
  | 'request'
  | string;

interface SpatialInstrumentProps {
  mode?: SpatialInstrumentMode;
  className?: string;
  interactive?: boolean;
  autoRotate?: boolean;
  scale?: number;
  accentColor?: string;
  badgeLabel?: string;
}

export function SpatialInstrument({
  mode = 'home',
  className = '',
  interactive = true,
  autoRotate = true,
  scale = 1.0,
  accentColor,
  badgeLabel,
}: SpatialInstrumentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const { setCursorState, resetCursorState } = useCursor();

  // Pointer gesture refs
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Normalize mode string
  const normalizedMode = mode.toLowerCase();

  useEffect(() => {
    // 1. WebGL Support Test
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setTimeout(() => setWebglSupported(false), 0);
        return;
      }
    } catch {
      setTimeout(() => setWebglSupported(false), 0);
      return;
    }

    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 6.0;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const rootGroup = new THREE.Group();
    rootGroup.scale.set(scale, scale, scale);
    scene.add(rootGroup);

    // Color Palette selection based on mode or override
    let mainHex = 0x38bdf8; // Cyan default
    let secondaryHex = 0x818cf8; // Indigo
    let coreHex = 0x0284c7; // Dark cyan

    if (accentColor) {
      mainHex = new THREE.Color(accentColor).getHex();
    } else if (normalizedMode.includes('health') || normalizedMode.includes('care')) {
      mainHex = 0x10b981; // Emerald
      secondaryHex = 0x34d399;
      coreHex = 0x059669;
    } else if (normalizedMode.includes('finance') || normalizedMode.includes('orbit')) {
      mainHex = 0x06b6d4; // Cyan/Teal
      secondaryHex = 0x38bdf8;
      coreHex = 0x0891b2;
    } else if (normalizedMode.includes('ai') || normalizedMode.includes('nova')) {
      mainHex = 0xa855f7; // Purple/Violet
      secondaryHex = 0x38bdf8;
      coreHex = 0x7e22ce;
    } else if (normalizedMode.includes('security')) {
      mainHex = 0x0ea5e9; // Sky Blue / Cyan
      secondaryHex = 0x10b981;
      coreHex = 0x0284c7;
    } else if (normalizedMode.includes('commerce') || normalizedMode.includes('aurora')) {
      mainHex = 0x38bdf8;
      secondaryHex = 0xf43f5e;
      coreHex = 0x0284c7;
    } else if (normalizedMode.includes('business') || normalizedMode.includes('atlas')) {
      mainHex = 0x3b82f6; // Royal Blue
      secondaryHex = 0x60a5fa;
      coreHex = 0x1d4ed8;
    } else if (normalizedMode.includes('design') || normalizedMode.includes('studio')) {
      mainHex = 0xf43f5e; // Rose/Pink
      secondaryHex = 0x38bdf8;
      coreHex = 0xe11d48;
    } else if (normalizedMode.includes('services')) {
      mainHex = 0x22c55e; // Green
      secondaryHex = 0x38bdf8;
      coreHex = 0x15803d;
    } else if (normalizedMode.includes('request')) {
      mainHex = 0x38bdf8;
      secondaryHex = 0x10b981;
      coreHex = 0x0284c7;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(mainHex, 3.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(secondaryHex, 2.5);
    rimLight.position.set(-4, -4, -3);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(mainHex, 3, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Disposables memory tracker
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // Helper for adding tracked meshes
    const trackMesh = (mesh: THREE.Mesh | THREE.LineSegments) => {
      rootGroup.add(mesh);
      if (mesh.geometry) geometriesToDispose.push(mesh.geometry);
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => materialsToDispose.push(m));
        } else {
          materialsToDispose.push(mesh.material);
        }
      }
    };

    // Active sub-element references for custom per-frame animation
    let subMeshA: THREE.Object3D | null = null;
    let subMeshB: THREE.Object3D | null = null;
    let subMeshC: THREE.Object3D | null = null;

    // 3. Mode-Specific Geometry Construction
    if (normalizedMode.includes('commerce') || normalizedMode.includes('aurora')) {
      // --- COMMERCE: Rotating Modular Cube Grid ---
      const coreGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: mainHex,
        roughness: 0.2,
        metalness: 0.1,
        transmission: 0.7,
        thickness: 1.2,
        transparent: true,
        opacity: 0.85,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      trackMesh(coreMesh);
      subMeshA = coreMesh;

      const wireGeo = new THREE.BoxGeometry(2.1, 2.1, 2.1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: secondaryHex,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      trackMesh(wireMesh);
      subMeshB = wireMesh;

      const ringGeo = new THREE.TorusGeometry(2.5, 0.02, 16, 80);
      const ringMat = new THREE.MeshStandardMaterial({ color: mainHex, emissive: coreHex, emissiveIntensity: 0.6 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      trackMesh(ringMesh);
      subMeshC = ringMesh;
    } else if (normalizedMode.includes('health') || normalizedMode.includes('care')) {
      // --- HEALTHCARE / CARE: Calm Dual Concentric Torus Orbits ---
      const torus1Geo = new THREE.TorusGeometry(1.6, 0.05, 16, 100);
      const torus1Mat = new THREE.MeshStandardMaterial({
        color: mainHex,
        emissive: coreHex,
        emissiveIntensity: 0.5,
        roughness: 0.1,
        metalness: 0.8,
      });
      const torus1Mesh = new THREE.Mesh(torus1Geo, torus1Mat);
      torus1Mesh.rotation.x = Math.PI / 4;
      trackMesh(torus1Mesh);
      subMeshA = torus1Mesh;

      const torus2Geo = new THREE.TorusGeometry(2.2, 0.025, 16, 100);
      const torus2Mat = new THREE.MeshBasicMaterial({ color: secondaryHex, transparent: true, opacity: 0.5 });
      const torus2Mesh = new THREE.Mesh(torus2Geo, torus2Mat);
      torus2Mesh.rotation.y = Math.PI / 3;
      trackMesh(torus2Mesh);
      subMeshB = torus2Mesh;

      const coreSphereGeo = new THREE.IcosahedronGeometry(0.8, 2);
      const coreSphereMat = new THREE.MeshPhysicalMaterial({
        color: mainHex,
        transmission: 0.85,
        opacity: 0.9,
        transparent: true,
        roughness: 0.1,
      });
      const coreSphereMesh = new THREE.Mesh(coreSphereGeo, coreSphereMat);
      trackMesh(coreSphereMesh);
      subMeshC = coreSphereMesh;
    } else if (normalizedMode.includes('finance') || normalizedMode.includes('orbit')) {
      // --- FINTECH: Circular Telemetry & Data Ring Array ---
      const discGeo = new THREE.RingGeometry(0.8, 1.8, 64);
      const discMat = new THREE.MeshBasicMaterial({
        color: mainHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
        wireframe: true,
      });
      const discMesh = new THREE.Mesh(discGeo, discMat);
      discMesh.rotation.x = Math.PI / 3;
      trackMesh(discMesh);
      subMeshA = discMesh;

      const ringOuterGeo = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
      const ringOuterMat = new THREE.MeshStandardMaterial({ color: secondaryHex, emissive: mainHex, emissiveIntensity: 0.8 });
      const ringOuterMesh = new THREE.Mesh(ringOuterGeo, ringOuterMat);
      ringOuterMesh.rotation.x = Math.PI / 3;
      trackMesh(ringOuterMesh);
      subMeshB = ringOuterMesh;

      const octGeo = new THREE.OctahedronGeometry(0.9, 0);
      const octMat = new THREE.MeshStandardMaterial({ color: mainHex, metalness: 0.9, roughness: 0.1 });
      const octMesh = new THREE.Mesh(octGeo, octMat);
      trackMesh(octMesh);
      subMeshC = octMesh;
    } else if (normalizedMode.includes('ai') || normalizedMode.includes('nova')) {
      // --- AI: Neural Node Constellation ---
      const nodeCount = 12;
      const points: THREE.Vector3[] = [];
      const linePositions: number[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        const radius = 1.8;
        const vec = new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        );
        points.push(vec);
      }

      // Interconnect nodes
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (points[i].distanceTo(points[j]) < 2.2) {
            linePositions.push(points[i].x, points[i].y, points[i].z);
            linePositions.push(points[j].x, points[j].y, points[j].z);
          }
        }
      }

      const linesGeo = new THREE.BufferGeometry();
      linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      const linesMat = new THREE.LineBasicMaterial({ color: mainHex, transparent: true, opacity: 0.6 });
      const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
      trackMesh(linesMesh);
      subMeshA = linesMesh;

      const centralCoreGeo = new THREE.IcosahedronGeometry(0.75, 1);
      const centralCoreMat = new THREE.MeshPhysicalMaterial({
        color: mainHex,
        emissive: coreHex,
        emissiveIntensity: 0.6,
        roughness: 0.1,
        transmission: 0.8,
        transparent: true,
      });
      const centralCoreMesh = new THREE.Mesh(centralCoreGeo, centralCoreMat);
      trackMesh(centralCoreMesh);
      subMeshB = centralCoreMesh;
    } else if (normalizedMode.includes('security')) {
      // --- SECURITY: Octagonal Shield / Lock Grid ---
      const shieldGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.2, 8);
      const shieldMat = new THREE.MeshStandardMaterial({
        color: mainHex,
        emissive: coreHex,
        emissiveIntensity: 0.3,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true,
      });
      const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
      shieldMesh.rotation.x = Math.PI / 2;
      trackMesh(shieldMesh);
      subMeshA = shieldMesh;

      const innerLockGeo = new THREE.TorusGeometry(0.8, 0.08, 16, 32);
      const innerLockMat = new THREE.MeshStandardMaterial({ color: secondaryHex, metalness: 0.9, roughness: 0.1 });
      const innerLockMesh = new THREE.Mesh(innerLockGeo, innerLockMat);
      trackMesh(innerLockMesh);
      subMeshB = innerLockMesh;
    } else if (normalizedMode.includes('work-index')) {
      // --- WORK INDEX: Orbital Project System ---
      const ring1Geo = new THREE.TorusGeometry(2.0, 0.03, 16, 100);
      const ring1Mat = new THREE.MeshStandardMaterial({ color: mainHex, emissive: coreHex, emissiveIntensity: 0.6 });
      const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1Mesh.rotation.x = Math.PI / 3.5;
      trackMesh(ring1Mesh);
      subMeshA = ring1Mesh;

      const ring2Geo = new THREE.TorusGeometry(2.6, 0.015, 12, 100);
      const ring2Mat = new THREE.MeshBasicMaterial({ color: secondaryHex, transparent: true, opacity: 0.4 });
      const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2Mesh.rotation.y = Math.PI / 4;
      trackMesh(ring2Mesh);
      subMeshB = ring2Mesh;

      const orbGeo = new THREE.OctahedronGeometry(1.1, 2);
      const orbMat = new THREE.MeshPhysicalMaterial({
        color: mainHex,
        roughness: 0.1,
        transmission: 0.75,
        transparent: true,
        opacity: 0.85,
      });
      const orbMesh = new THREE.Mesh(orbGeo, orbMat);
      trackMesh(orbMesh);
      subMeshC = orbMesh;
    } else {
      // --- DEFAULT / HOME: Crystalline Sculpture with Dual Rings ---
      const shellGeo = new THREE.IcosahedronGeometry(1.6, 1);
      const shellMat = new THREE.MeshPhysicalMaterial({
        color: mainHex,
        emissive: coreHex,
        emissiveIntensity: 0.2,
        roughness: 0.1,
        metalness: 0.15,
        clearcoat: 1.0,
        transmission: 0.8,
        thickness: 1.5,
        transparent: true,
        opacity: 0.85,
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      trackMesh(shellMesh);
      subMeshA = shellMesh;

      const wireGeo = new THREE.IcosahedronGeometry(1.62, 1);
      const wireMat = new THREE.MeshBasicMaterial({ color: mainHex, wireframe: true, transparent: true, opacity: 0.35 });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      trackMesh(wireMesh);

      const coreGeo = new THREE.OctahedronGeometry(0.8, 2);
      const coreMat = new THREE.MeshStandardMaterial({ color: mainHex, emissive: coreHex, emissiveIntensity: 0.8 });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      trackMesh(coreMesh);
      subMeshB = coreMesh;

      const ringGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({ color: secondaryHex, emissive: mainHex, emissiveIntensity: 0.6 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      trackMesh(ringMesh);
      subMeshC = ringMesh;
    }

    // 4. Pointer Interaction Handlers (Bounded to Canvas)
    const onPointerDown = (e: PointerEvent) => {
      if (!interactive || (e.button !== 0 && e.pointerType === 'mouse')) return;
      isDraggingRef.current = true;
      setIsDraggingState(true);
      setHasInteracted(true);
      previousPointerRef.current = { x: e.clientX, y: e.clientY };
      velocityRef.current = { x: 0, y: 0 };

      setCursorState('DRAG', 'ROTATE');
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive || !isDraggingRef.current) return;
      const deltaX = e.clientX - previousPointerRef.current.x;
      const deltaY = e.clientY - previousPointerRef.current.y;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };

      const rotateSpeed = 0.007;
      const vx = deltaX * rotateSpeed;
      const vy = deltaY * rotateSpeed;

      velocityRef.current = { x: vx, y: vy };
      rotationRef.current.y += vx;
      rotationRef.current.x += vy;

      // Constrain vertical rotation to prevent flipping upside down
      rotationRef.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotationRef.current.x));
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDraggingState(false);
      setCursorState('DRAG', 'GRAB');
      try {
        if (canvas.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore pointer capture release error
      }
    };

    const onPointerEnter = () => {
      if (interactive && !isDraggingRef.current) {
        setCursorState('DRAG', 'GRAB');
      }
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (!isDraggingRef.current) {
        resetCursorState();
      } else {
        onPointerUp(e);
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerenter', onPointerEnter);
    canvas.addEventListener('pointerleave', onPointerLeave);

    // 5. Animation Loop
    let animId: number;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const now = performance.now() * 0.001;

      if (!isDraggingRef.current) {
        // Apply inertia momentum
        rotationRef.current.y += velocityRef.current.x;
        rotationRef.current.x += velocityRef.current.y;

        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;

        if (autoRotate && !prefersReducedMotion) {
          rotationRef.current.y += 0.0025;
        }
      }

      rootGroup.rotation.y = rotationRef.current.y;
      rootGroup.rotation.x = rotationRef.current.x;

      // Internal sub-mesh motion
      if (!prefersReducedMotion) {
        if (subMeshA) subMeshA.rotation.y += 0.002;
        if (subMeshB) subMeshB.rotation.z -= 0.003;
        if (subMeshC) {
          subMeshC.rotation.x += 0.002;
          const breathe = 1 + Math.sin(now * 2) * 0.03;
          subMeshC.scale.set(breathe, breathe, breathe);
        }
        pointLight.intensity = 2.5 + Math.sin(now * 2.5) * 0.7;
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // 6. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();

      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      canvas.removeEventListener('pointerleave', onPointerLeave);

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [mode, normalizedMode, interactive, autoRotate, scale, accentColor, setCursorState, resetCursorState]);

  if (!webglSupported) {
    return (
      <div className={`w-full h-full min-h-[280px] flex items-center justify-center bg-slate-950/80 rounded-2xl border border-cyan-500/20 p-6 text-center ${className}`}>
        <div className="space-y-1">
          <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-mono text-sm">
            SNOW
          </div>
          <p className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-wider">
            [{mode.toUpperCase()} INSTRUMENT • FALLBACK]
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full min-h-[280px] flex items-center justify-center select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y focus:outline-none"
        aria-label={`Interactive 3D Spatial Instrument - ${mode}`}
        tabIndex={0}
      />

      {badgeLabel && (
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ${
            hasInteracted && !isDraggingState ? 'opacity-30 scale-95' : isDraggingState ? 'opacity-0 scale-90' : 'opacity-80'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-cyan-500/30 backdrop-blur-md text-[9px] font-mono text-cyan-300 shadow-md tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{badgeLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
}
