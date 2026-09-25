"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionTokens } from "@/motion/tokens";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType;
}

/**
 * SplitText typography primitive. Renders typography split by words with animated line-mask reveals.
 */
export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 0.1,
  stagger = motionTokens.stagger.normal,
  as: Component = "h1",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: "110%",
      rotateX: -20,
    },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      transition: {
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease.outExponential,
      },
    },
  };

  return (
    <Component className={`${className} inline-flex flex-wrap`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden pb-1 pr-[0.25em]">
            <motion.span variants={wordVariants} className="inline-block transform-gpu origin-bottom">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
