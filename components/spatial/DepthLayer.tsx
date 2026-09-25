"use client";

import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens } from "@/motion/tokens";

export interface DepthLayerProps {
  children: React.ReactNode;
  depth?: number; // Spatial depth multiplier (e.g. -0.5 background, 0.5 foreground, Z-translate)
  zDistance?: number; // 3D Translate Z in pixels (e.g. 30px)
  className?: string;
  disabled?: boolean;
}

/**
 * DepthLayer primitive. Shifts element position along X, Y, and Z axis according to spatial depth.
 * Allows creation of deep layered compositions where foreground and background elements move relative to user interaction.
 */
export const DepthLayer: React.FC<DepthLayerProps> = ({
  children,
  depth = 0.2,
  zDistance = 20,
  className = "",
  disabled = false,
}) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const pointer = usePointerPosition();
  const shouldReduceMotion = useReducedMotion();

  const isInteractive = !disabled && !shouldReduceMotion && !pointer.isTouch;

  // X and Y parallax shift
  const targetX = isInteractive ? pointer.xNormalized * depth * 35 : 0;
  const targetY = isInteractive ? pointer.yNormalized * depth * 35 : 0;

  const springConfig = motionTokens.spring.gentle;
  const x = useSpring(targetX, springConfig);
  const y = useSpring(targetY, springConfig);

  return (
    <motion.div
      ref={layerRef}
      className={`transform-gpu ${className}`}
      style={{
        x,
        y,
        z: zDistance * depth,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};
