"use client";

import { useEffect, useRef } from "react";

export function SecurityMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 640px)").matches;
    const characters = "01SNOW//<>[]{}:$#";
    let animationFrame = 0;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.ceil(window.innerWidth / (compact ? 24 : 18));
      drops = Array.from({ length: columns }, (_, index) => (index * 17) % 28);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (reduced) {
      context.fillStyle = "rgba(3, 12, 15, 0.42)";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      return () => window.removeEventListener("resize", resize);
    }

    const draw = () => {
      context.fillStyle = "rgba(3, 12, 15, 0.11)";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.font = `${compact ? 10 : 11}px monospace`;
      drops.forEach((drop, index) => {
        const x = index * (compact ? 24 : 18);
        const y = drop * (compact ? 15 : 17);
        context.fillStyle = index % 5 === 0 ? "rgba(103, 232, 249, 0.24)" : "rgba(74, 222, 128, 0.18)";
        context.fillText(characters[(index + Math.floor(drop)) % characters.length], x, y);
        if (y > window.innerHeight && Math.random() > 0.985) drops[index] = 0;
        drops[index] += 0.35;
      });
      animationFrame = window.requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-45 mix-blend-screen" />;
}
