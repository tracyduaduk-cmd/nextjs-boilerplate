'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useCursor } from '@/components/spatial/CursorSystem';

export function SpatialWebGLScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);
  const { setCursorState, resetCursorState } = useCursor();

  // Interaction refs
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const objectRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraDistanceRef = useRef<number>(6.5);
  const targetCameraDistanceRef = useRef<number>(6.5);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
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

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = cameraDistanceRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Root group for user drag rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Dynamic lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 4.0); // Cyan key light
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const specularLight = new THREE.DirectionalLight(0xffffff, 3.5); // White specular highlight
    specularLight.position.set(-5, 4, 4);
    scene.add(specularLight);

    const rimLight = new THREE.DirectionalLight(0x6366f1, 2.5); // Electric blue / indigo rim
    rimLight.position.set(0, -5, -4);
    scene.add(rimLight);

    const innerLight = new THREE.PointLight(0x06b6d4, 4, 10); // Core point light
    innerLight.position.set(0, 0, 0);
    scene.add(innerLight);

    // 1. Crystalline Outer Shell (Glass physical material)
    const shellGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.8,
      thickness: 1.5,
      ior: 1.52,
      transparent: true,
      opacity: 0.85,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    mainGroup.add(shellMesh);

    // 2. Technical Wireframe Overlay
    const wireframeGeo = new THREE.IcosahedronGeometry(1.82, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    mainGroup.add(wireframeMesh);

    // 3. Dense Inner Glowing Core
    const coreGeo = new THREE.OctahedronGeometry(0.9, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Core Wireframe detail
    const coreWireGeo = new THREE.OctahedronGeometry(0.92, 2);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const coreWireMesh = new THREE.Mesh(coreWireGeo, coreWireMat);
    mainGroup.add(coreWireMesh);

    // 4. Primary Orbital Technical Ring
    const ring1Geo = new THREE.TorusGeometry(2.6, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.9,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    ring1Mesh.rotation.y = Math.PI / 6;
    mainGroup.add(ring1Mesh);

    // 5. Secondary Outer Orbital Ring
    const ring2Geo = new THREE.TorusGeometry(3.1, 0.015, 12, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.45,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI / 4;
    ring2Mesh.rotation.z = Math.PI / 5;
    mainGroup.add(ring2Mesh);

    // Pointer & Drag Handlers
    const onPointerDown = (e: PointerEvent) => {
      // Primary button or single touch
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      isDraggingRef.current = true;
      setIsDraggingState(true);
      setHasInteracted(true);
      previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
      velocityRef.current = { x: 0, y: 0 };

      setCursorState('DRAG', 'ROTATE');
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousPointerPositionRef.current.x;
      const deltaY = e.clientY - previousPointerPositionRef.current.y;

      previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };

      const rotateSpeed = 0.007;
      const vx = deltaX * rotateSpeed;
      const vy = deltaY * rotateSpeed;

      velocityRef.current = { x: vx, y: vy };

      objectRotationRef.current.y += vx;
      objectRotationRef.current.x += vy;

      // Constrain vertical rotation X to avoid flipping completely inside out
      objectRotationRef.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, objectRotationRef.current.x));
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
        // Ignore if pointer capture release fails
      }
    };

    const onPointerEnter = () => {
      if (!isDraggingRef.current) {
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

    // Wheel zoom / dolly control with strict constraints
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSensitivity = 0.003;
      targetCameraDistanceRef.current += e.deltaY * zoomSensitivity;
      // Constrain camera distance min 4.5, max 9.5
      targetCameraDistanceRef.current = Math.max(4.5, Math.min(9.5, targetCameraDistanceRef.current));
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerenter', onPointerEnter);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // Animation Loop
    let animId: number;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      const now = performance.now();

      // Camera distance damping (zoom)
      cameraDistanceRef.current += (targetCameraDistanceRef.current - cameraDistanceRef.current) * 0.1;
      camera.position.z = cameraDistanceRef.current;

      if (!isDraggingRef.current) {
        // Apply inertia momentum on release
        objectRotationRef.current.y += velocityRef.current.x;
        objectRotationRef.current.x += velocityRef.current.y;

        // Dampen velocity
        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;

        // When momentum dies down, gently add auto-rotation if reduced motion is disabled
        if (!prefersReducedMotion) {
          const autoRotateSpeedY = 0.003;
          objectRotationRef.current.y += autoRotateSpeedY;
        }
      }

      // Apply rotations to main group
      mainGroup.rotation.y = objectRotationRef.current.y;
      mainGroup.rotation.x = objectRotationRef.current.x;

      // Internal breathing & counter-rotations
      if (!prefersReducedMotion) {
        shellMesh.rotation.y += 0.002;
        coreMesh.rotation.y -= 0.005;
        coreMesh.rotation.x += 0.002;
        coreWireMesh.rotation.y -= 0.005;
        ring1Mesh.rotation.z += 0.003;
        ring2Mesh.rotation.z -= 0.002;

        // Slight breathing scale movement
        const time = now * 0.0015;
        const scaleBreath = 1 + Math.sin(time) * 0.03;
        coreMesh.scale.set(scaleBreath, scaleBreath, scaleBreath);

        // Light pulse
        innerLight.intensity = 3.5 + Math.sin(time * 2) * 0.8;
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // Resize Handler
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

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();

      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('wheel', onWheel);

      shellGeo.dispose();
      shellMat.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      coreWireGeo.dispose();
      coreWireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      renderer.dispose();
    };
  }, [setCursorState, resetCursorState]);

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-[380px] flex items-center justify-center bg-slate-950/80 rounded-3xl border border-cyan-500/20 p-8 text-center">
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 font-mono text-xl">
            SNOW
          </div>
          <p className="text-sm font-mono text-cyan-400/80">3D SPATIAL ENGINE [FALLBACK MODE]</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none focus:outline-none"
        aria-label="Interactive 3D Spatial Instrument Sculpture"
        tabIndex={0}
      />

      {/* Interaction cue badge */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-500 ${
          hasInteracted && !isDraggingState ? 'opacity-30 scale-95' : isDraggingState ? 'opacity-0 scale-90' : 'opacity-90 animate-pulse'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-cyan-400/40 backdrop-blur-md text-[10px] font-mono text-cyan-300 shadow-lg tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>[ GRAB / ROTATE 3D ]</span>
        </div>
      </div>
    </div>
  );
}
