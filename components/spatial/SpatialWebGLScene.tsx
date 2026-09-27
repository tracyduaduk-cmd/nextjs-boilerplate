'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function SpatialWebGLScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    if (!containerRef.current) return;
    const container = containerRef.current;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create technical wireframe spatial geometry
    const geometry = new THREE.IcosahedronGeometry(2.2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x083344,
      emissiveIntensity: 0.3,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Inner glowing core
    const coreGeo = new THREE.OctahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 3, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x0284c7, 2, 50);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Pointer response
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetX = (e.clientX - windowHalfX) * 0.0008;
      targetY = (e.clientY - windowHalfY) * 0.0008;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;

      coreMesh.rotation.x -= 0.005;
      coreMesh.rotation.y -= 0.003;

      // Smooth camera movement towards target pointer
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-950/80 rounded-3xl border border-cyan-500/20 p-8 text-center">
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 font-mono text-xl">
            SNOW
          </div>
          <p className="text-sm font-mono text-cyan-400/80">3D SPATIAL ENGINE [FALLBACK MODE]</p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full min-h-[400px] relative overflow-hidden" />;
}
