"use client";

import React, { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens } from "@/motion/tokens";

export interface TiltProps {
  children: React.ReactNode;
  maxRotation?: number; // Maximum tilt angle in degrees (e.g. 10deg)
  scaleOnHover?: number; // Scale factor when hovered (e.g. 1.02)
  glare?: boolean; // Whether to render light/glare overlay
  className?: string;
  disabled?: boolean;
}

/**
 * Spatial Tilt primitive. Subtle 3D perspective rotation responding to pointer position.
 * Respects reduced motion preferences and touch devices gracefully.
 */
export const Tilt: React.FC<TiltProps> = ({
  children,
  maxRotation = 10,
  scaleOnHover = 1.02,
  glare = true,
  className = "",
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = usePointerPosition(containerRef);
  const shouldReduceMotion = useReducedMotion();

  const isInteractive = !disabled && !shouldReduceMotion && !pointer.isTouch;

  // Smooth springs for rotation X (tilt based on Y displacement) and rotation Y (tilt based on X displacement)
  const springConfig = motionTokens.spring.spatial;
  const rawRotateX = pointer.isHovered ? -pointer.yNormalized * maxRotation : 0;
  const rawRotateY = pointer.isHovered ? pointer.xNormalized * maxRotation : 0;

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scale = useSpring(pointer.isHovered && isInteractive ? scaleOnHover : 1, springConfig);

  // Glare position calculation
  const glareX = useTransform(rotateY, [-maxRotation, maxRotation], ["0%", "100%"]);
  const glareY = useTransform(rotateX, [-maxRotation, maxRotation], ["0%", "100%"]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative transform-gpu transition-all duration-300 ${className}`}
      style={{
        transformStyle: "preserve-3d",
        rotateX: isInteractive ? rotateX : 0,
        rotateY: isInteractive ? rotateY : 0,
        scale: isInteractive ? scale : 1,
      }}
    >
      {children}

      {/* Subtle Dynamic Glare Overlay */}
      {glare && isInteractive && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};
