'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // negative moves slower, positive moves faster
  className?: string;
  depth?: 'fg' | 'mg' | 'bg';
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.5,
  className = '',
  depth = 'mg',
}) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: layerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  const getDepthStyle = () => {
    switch (depth) {
      case 'fg':
        return 'z-30 pointer-events-auto';
      case 'bg':
        return 'z-0 pointer-events-none opacity-60 blur-[1px]';
      case 'mg':
      default:
        return 'z-10';
    }
  };

  return (
    <div ref={layerRef} className={`relative ${getDepthStyle()} ${className}`}>
      <motion.div style={{ y }} className="transform-gpu">
        {children}
      </motion.div>
    </div>
  );
};
