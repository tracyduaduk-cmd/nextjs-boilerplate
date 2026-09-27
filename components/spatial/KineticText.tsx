'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface KineticTextProps {
  children: string;
  className?: string;
  as?: React.ElementType;
  variant?: 'velocity' | 'character' | 'word' | 'perspective' | 'mask';
  speed?: number;
  stagger?: number;
  delay?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  children,
  className = '',
  as: Component = 'h2',
  variant = 'velocity',
  speed = 1,
  stagger = 0.03,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll velocity tracking via framer-motion
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Map velocity to skew & scale
  const skewX = useTransform(smoothVelocity, [-3000, 3000], [-12 * speed, 12 * speed]);
  const scaleY = useTransform(smoothVelocity, [-3000, 0, 3000], [1.15, 1, 1.15]);

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  if (variant === 'velocity') {
    return (
      <Component className={`${className} overflow-visible`}>
        <motion.span
          style={{ skewX, scaleY }}
          className="inline-block origin-center transform-gpu transition-transform duration-75"
        >
          {children}
        </motion.span>
      </Component>
    );
  }

  if (variant === 'character') {
    const chars = Array.from(children);
    return (
      <Component className={`${className} inline-flex flex-wrap overflow-hidden`}>
        {chars.map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              initial={{ y: '120%', opacity: 0, rotateX: -60 }}
              whileInView={{ y: '0%', opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * stagger,
              }}
              className="inline-block transform-gpu origin-bottom-left"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  if (variant === 'word') {
    const words = children.split(' ');
    return (
      <Component className={`${className} inline-flex flex-wrap gap-x-[0.3em] overflow-hidden`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.215, 0.61, 0.355, 1],
                delay: delay + i * stagger * 2,
              }}
              className="inline-block transform-gpu"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  if (variant === 'mask') {
    return (
      <Component className={`${className} relative overflow-hidden`}>
        <motion.span
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1], delay }}
          className="block transform-gpu"
        >
          {children}
        </motion.span>
      </Component>
    );
  }

  return <Component className={className}>{children}</Component>;
};
