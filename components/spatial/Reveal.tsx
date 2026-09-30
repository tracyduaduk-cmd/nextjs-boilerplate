"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens } from "@/motion/tokens";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
}

/**
 * Reveal component for viewport-driven scroll/load animations.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = motionTokens.duration.normal,
  className = "",
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      // Render content immediately as a resilient baseline; the viewport animation
      // can enhance it without ever hiding portfolio content from slow observers.
      initial={false}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: motionTokens.ease.outExponential,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
