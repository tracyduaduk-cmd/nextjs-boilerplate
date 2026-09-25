"use client";

import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens } from "@/motion/tokens";

export interface MagneticProps {
  children: React.ReactNode;
  intensity?: number; // Attraction distance cap in pixels (e.g., 20px)
  className?: string;
  disabled?: boolean;
}

/**
 * Magnetic component. Gently attracts the wrapped element toward the pointer cursor when hovered.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  intensity = 18,
  className = "",
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = usePointerPosition(containerRef);
  const shouldReduceMotion = useReducedMotion();

  const isInteractive = !disabled && !shouldReduceMotion && !pointer.isTouch;

  const targetX = pointer.isHovered && isInteractive ? pointer.xNormalized * intensity : 0;
  const targetY = pointer.isHovered && isInteractive ? pointer.yNormalized * intensity : 0;

  const springConfig = motionTokens.spring.snappy;
  const x = useSpring(targetX, springConfig);
  const y = useSpring(targetY, springConfig);

  return (
    <motion.div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        x: isInteractive ? x : 0,
        y: isInteractive ? y : 0,
      }}
    >
      {children}
    </motion.div>
  );
};
