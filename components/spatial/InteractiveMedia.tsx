'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '@/components/spatial/CursorSystem';

export interface InteractiveMediaProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  caption?: string;
  cursorLabel?: string;
  priority?: boolean;
}

export const InteractiveMedia: React.FC<InteractiveMediaProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-video',
  caption,
  cursorLabel = 'VIEW',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorState, resetCursorState } = useCursor();
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const scale = useSpring(isHovered ? 1.05 : 1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorState('PROJECT', cursorLabel);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    resetCursorState();
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl group cursor-none perspective-1000 ${aspectRatio} ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative transform-gpu"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Dynamic Light Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />

        {/* Vignette & Border */}
        <div className="absolute inset-0 ring-1 ring-white/15 rounded-2xl pointer-events-none group-hover:ring-cyan-400/50 transition-all duration-500" />

        {caption && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white font-mono text-xs tracking-wider uppercase">{caption}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
