"use client";

import { useEffect, useRef } from "react";
import type { OperationCategory, OperationStatus } from "@/lib/security/simulation";

interface SecurityMatrixProps {
  category?: OperationCategory;
  status?: OperationStatus;
}

export function SecurityMatrix({ category = "recon", status = "idle" }: SecurityMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 640px)").matches;

    // Emerald/acid-green & cyan glyph sets
    const glyphs = "01SNOW_Matrix<>[]{}:$#*+=%@ØÆµ⚡▲◈";
    let animationFrame = 0;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const isRunning = status === "running";

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const colWidth = compact ? 20 : 16;
      columns = Math.ceil(window.innerWidth / colWidth);
      drops = Array.from({ length: columns }, (_, index) => (index * 19) % 35);
      speeds = Array.from({ length: columns }, () => 0.25 + Math.random() * 0.45);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (reduced) {
      context.fillStyle = "rgba(3, 12, 15, 0.65)";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      return () => window.removeEventListener("resize", resize);
    }

    let tick = 0;

    const draw = () => {
      tick++;
      // Operation reaction fade intensity
      const fadeAlpha = isRunning ? 0.08 : 0.12;
      context.fillStyle = `rgba(3, 12, 15, ${fadeAlpha})`;
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const fontSize = compact ? 11 : 12;
      context.font = `${fontSize}px monospace`;

      const colWidth = compact ? 20 : 16;
      const speedMult = isRunning ? (category === "credentials" ? 1.8 : 1.4) : 0.9;

      drops.forEach((drop, index) => {
        const x = index * colWidth;
        const y = drop * (compact ? 16 : 18);

        // Highlight head character
        const isHead = Math.random() > 0.85;

        if (isHead) {
          context.fillStyle = isRunning ? "rgba(224, 242, 254, 0.95)" : "rgba(187, 247, 208, 0.85)";
          context.shadowColor = "rgba(74, 222, 128, 0.8)";
          context.shadowBlur = isRunning ? 10 : 4;
        } else if (index % 6 === 0) {
          context.fillStyle = "rgba(103, 232, 249, 0.45)"; // Cyan depth accents
          context.shadowBlur = 0;
        } else {
          context.fillStyle = isRunning ? "rgba(74, 222, 128, 0.35)" : "rgba(34, 197, 94, 0.22)";
          context.shadowBlur = 0;
        }

        const glyphChar = glyphs[(index + Math.floor(drop) + tick) % glyphs.length];
        context.fillText(glyphChar, x, y);

        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[index] = 0;
        }
        drops[index] += speeds[index] * speedMult;
      });

      // Operational Atmosphere Effects (Scanlines / Signals during running ops)
      if (isRunning && tick % 2 === 0) {
        context.strokeStyle = category === "recon" ? "rgba(103, 232, 249, 0.05)" : "rgba(74, 222, 128, 0.04)";
        context.lineWidth = 1;
        const scanY = (tick * 4) % window.innerHeight;
        context.beginPath();
        context.moveTo(0, scanY);
        context.lineTo(window.innerWidth, scanY);
        context.stroke();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [category, status]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`h-full w-full opacity-65 mix-blend-screen transition-opacity duration-700 ${
          status === "running" ? "opacity-85" : "opacity-60"
        }`}
      />
      {/* Visual scanline & phosphor glow layers */}
      <div className="security-crt-overlay absolute inset-0 pointer-events-none z-10" />
    </div>
  );
}
