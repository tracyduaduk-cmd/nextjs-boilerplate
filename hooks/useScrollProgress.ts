"use client";

import { useEffect, useState, RefObject } from "react";

export interface ScrollProgressState {
  // Overall page scroll progress 0 -> 1
  scrollYProgress: number;
  // Target container scroll progress 0 -> 1
  elementYProgress: number;
  // Is container currently in viewport
  isInView: boolean;
}

/**
 * Lightweight scroll progress tracking hook using passive scroll events and RAF.
 * Avoids extra library overhead while supplying smooth progress values.
 */
export function useScrollProgress(containerRef?: RefObject<HTMLElement | null>): ScrollProgressState {
  const [scrollState, setScrollState] = useState<ScrollProgressState>({
    scrollYProgress: 0,
    elementYProgress: 0,
    isInView: false,
  });

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pageProgress = totalHeight > 0 ? Math.min(1, Math.max(0, scrollTop / totalHeight)) : 0;

        let elemProgress = 0;
        let inView = false;

        if (containerRef?.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const viewHeight = window.innerHeight;

          inView = rect.bottom > 0 && rect.top < viewHeight;

          if (inView) {
            const distance = viewHeight + rect.height;
            const progress = (viewHeight - rect.top) / distance;
            elemProgress = Math.min(1, Math.max(0, progress));
          }
        }

        setScrollState({
          scrollYProgress: pageProgress,
          elementYProgress: elemProgress,
          isInView: inView,
        });
      });
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef]);

  return scrollState;
}
