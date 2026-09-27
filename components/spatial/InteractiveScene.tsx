'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface InteractiveSceneProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light' | 'midnight' | 'ice';
  pinned?: boolean;
}

export const InteractiveScene: React.FC<InteractiveSceneProps> = ({
  id,
  children,
  className = '',
  theme = 'dark',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 0.98]);

  const getThemeClass = () => {
    switch (theme) {
      case 'light':
        return 'bg-neutral-100 text-neutral-900 selection:bg-neutral-900 selection:text-white';
      case 'midnight':
        return 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black';
      case 'ice':
        return 'bg-slate-900 text-cyan-50 selection:bg-cyan-400 selection:text-black';
      case 'dark':
      default:
        return 'bg-black text-white selection:bg-cyan-400 selection:text-black';
    }
  };

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 py-24 px-6 md:px-12 lg:px-20 ${getThemeClass()} ${className}`}
    >
      <motion.div style={{ opacity, scale }} className="relative z-10 w-full max-w-7xl mx-auto">
        {children}
      </motion.div>
    </section>
  );
};
