"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeHeroCanvasProps {
  className?: string;
  mousePosition?: { x: number; y: number };
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({
  className = "",
  mousePosition = { x: 0, y: 0 },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL support check
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // Lighting setup - Studio lighting for crystalline glass object
    const ambientLight = new THREE.AmbientLight(0x0a101d, 2.5);
    scene.add(ambientLight);

    // Cyan key light
    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // White specular highlight light
    const specularLight = new THREE.DirectionalLight(0xffffff, 4.0);
    specularLight.position.set(-3, 4, 5);
    scene.add(specularLight);

    // Indigo rim light
    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.0);
    rimLight.position.set(0, -4, -3);
    scene.add(rimLight);

    // Point light inside crystal
    const innerLight = new THREE.PointLight(0x06b6d4, 3, 5);
    innerLight.position.set(0, 0, 0);
    scene.add(innerLight);

    // Core Crystalline Sculpture Geometry
    const group = new THREE.Group();
    scene.add(group);

    // Outer crystalline glass shell (Icosahedron)
    const shellGeometry = new THREE.IcosahedronGeometry(1.6, 0);
    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0e1726,
      emissive: 0x0284c7,
      emissiveIntensity: 0.15,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.52,
      transparent: true,
      opacity: 0.85,
      wireframe: false,
    });
    const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial);
    group.add(shellMesh);

    // Wireframe overlay for technical precision feel
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.62, 0);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    group.add(wireframeMesh);

    // Inner dense crystalline core (Octahedron)
    const coreGeometry = new THREE.OctahedronGeometry(0.8, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Floating Orbital Technical Ring
    const ringGeometry = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    group.add(ringMesh);

    // Secondary subtle orbital ring
    const outerRingGeometry = new THREE.TorusGeometry(2.7, 0.01, 12, 100);
    const outerRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.4,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
    outerRingMesh.rotation.x = -Math.PI / 4;
    outerRingMesh.rotation.z = Math.PI / 5;
    group.add(outerRingMesh);

    // Animation variables
    let animationFrameId: number;
    let targetRotX = 0;
    let targetRotY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        // Continuous organic motion
        group.rotation.y += 0.004;
        shellMesh.rotation.x += 0.002;
        coreMesh.rotation.y -= 0.006;
        ringMesh.rotation.z += 0.003;
        outerRingMesh.rotation.z -= 0.002;

        // Pointer parallax response
        targetRotY = mouseRef.current.x * 0.4;
        targetRotX = -mouseRef.current.y * 0.4;

        group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
        group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();

      // Dispose geometries & materials
      shellGeometry.dispose();
      shellMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      outerRingGeometry.dispose();
      outerRingMaterial.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div
        className={`relative flex items-center justify-center rounded-3xl border border-sky-500/20 bg-slate-900/60 backdrop-blur-xl p-8 ${className}`}
      >
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)]" />
        <div className="relative z-10 text-center font-mono text-xs text-sky-300">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full border border-sky-400/30 bg-sky-500/10 flex items-center justify-center animate-pulse">
            <div className="w-12 h-12 rounded-full border border-sky-300/50 bg-sky-400/20" />
          </div>
          <span>[ SPATIAL OBJECT / REDUCED RENDER ]</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[480px] pointer-events-none select-none ${className}`}
      aria-label="3D Spatial Glass Sculpture Scene"
    />
  );
};
