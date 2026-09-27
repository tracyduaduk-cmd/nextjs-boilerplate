"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function useSceneProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return progress;
}

export function PointerField({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      setPoint({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      });
    };
    node.addEventListener("pointermove", move, { passive: true });
    return () => node.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ref}
      className={`pointer-field ${className}`}
      style={{ "--pointer-x": `${point.x}%`, "--pointer-y": `${point.y}%` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function KineticLine({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return <span className={`kinetic-line kinetic-line-${tone}`}>{children}</span>;
}

export function SceneMarker({ index, label, invert = false }: { index: string; label: string; invert?: boolean }) {
  return (
    <div className={`scene-marker ${invert ? "scene-marker-invert" : ""}`}>
      <span>{index}</span>
      <span className="scene-marker-line" />
      <span>{label}</span>
    </div>
  );
}
