'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollSceneProps {
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
  pin?: boolean;
}

export const ScrollScene: React.FC<ScrollSceneProps> = ({
  children,
  className = '',
  horizontal = false,
  pin = false,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !targetRef.current) return;

    const trigger = triggerRef.current;
    const target = targetRef.current;

    const ctx = gsap.context(() => {
      if (horizontal) {
        const scrollWidth = target.scrollWidth - trigger.clientWidth;
        if (scrollWidth > 0) {
          gsap.to(target, {
            x: -scrollWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: trigger,
              pin: pin,
              scrub: 1,
              end: () => `+=${scrollWidth}`,
              invalidateOnRefresh: true,
            },
          });
        }
      } else if (pin) {
        ScrollTrigger.create({
          trigger: trigger,
          pin: true,
          start: 'top top',
          end: '+=100%',
          scrub: true,
        });
      }
    }, triggerRef);

    return () => ctx.revert();
  }, [horizontal, pin]);

  return (
    <div ref={triggerRef} className={`relative overflow-hidden w-full ${className}`}>
      <div ref={targetRef} className={horizontal ? 'flex flex-nowrap w-max' : 'w-full'}>
        {children}
      </div>
    </div>
  );
};
