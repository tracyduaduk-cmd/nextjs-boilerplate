"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens } from "@/motion/tokens";

export interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  tapScale?: number;
  className?: string;
}

/**
 * HoverScale component providing standard responsive feedback for interactive cards or components.
 */
export const HoverScale: React.FC<HoverScaleProps> = ({
  children,
  scale = 1.025,
  tapScale = 0.98,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: tapScale }}
      transition={motionTokens.spring.snappy}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};
