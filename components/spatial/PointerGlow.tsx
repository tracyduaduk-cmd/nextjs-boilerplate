"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface PointerGlowProps {
  color?: string; // e.g. "rgba(56, 189, 248, 0.15)"
  size?: number; // Size in pixels
  className?: string;
}

/**
 * PointerGlow primitive. Follows pointer location across its container to cast interactive glow/ambient lighting.
 */
export const PointerGlow: React.FC<PointerGlowProps> = ({
  color = "rgba(56, 189, 248, 0.14)",
  size = 400,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = usePointerPosition(containerRef);
  const shouldReduceMotion = useReducedMotion();

  const isInteractive = !shouldReduceMotion && !pointer.isTouch;

  if (!isInteractive) return null;

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          left: pointer.clientX - size / 2,
          top: pointer.clientY - size / 2,
          background: `radial-gradient(circle, ${color} 0%, rgba(0, 0, 0, 0) 70%)`,
          opacity: pointer.isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
        aria-hidden="true"
      />
    </div>
  );
};
