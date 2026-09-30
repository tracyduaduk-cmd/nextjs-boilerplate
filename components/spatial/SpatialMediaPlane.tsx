"use client";

import React from "react";
import { motion, useSpring } from "framer-motion";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens } from "@/motion/tokens";

export interface SpatialMediaPlaneProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  disabled?: boolean;
}

/**
 * A restrained spatial surface for media and editorial compositions.
 * It enhances pointer devices only, preserves the layout box, and becomes a
 * static surface for touch users or reduced-motion preferences.
 */
export function SpatialMediaPlane({
  children,
  className = "",
  intensity = 2.5,
  disabled = false,
}: SpatialMediaPlaneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pointer = usePointerPosition(containerRef);
  const shouldReduceMotion = useReducedMotion();
  const interactive = !disabled && !shouldReduceMotion && !pointer.isTouch;
  const rotateX = useSpring(
    interactive && pointer.isHovered ? -pointer.yNormalized * intensity : 0,
    motionTokens.spring.spatial,
  );
  const rotateY = useSpring(
    interactive && pointer.isHovered ? pointer.xNormalized * intensity : 0,
    motionTokens.spring.spatial,
  );
  const translateZ = useSpring(
    interactive && pointer.isHovered ? 8 : 0,
    motionTokens.spring.spatial,
  );

  return (
    <motion.div
      ref={containerRef}
      className={`relative transform-gpu ${className}`}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        z: interactive ? translateZ : 0,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/20 opacity-0 transition-opacity duration-300 group-hover/spatial-plane:opacity-100"
      />
    </motion.div>
  );
}
