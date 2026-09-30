"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to detect user preference for reduced motion.
 * Automatically updates if system preference changes.
 */
export function useReducedMotion(): boolean {
  // Keep the server and first client render identical. The browser preference
  // is applied immediately after hydration in the effect below.
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frame = window.requestAnimationFrame(() => setShouldReduceMotion(mediaQuery.matches));

    const handleChange = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        window.cancelAnimationFrame(frame);
        mediaQuery.removeEventListener("change", handleChange);
      };
    } else {
      mediaQuery.addListener(handleChange);
      return () => {
        window.cancelAnimationFrame(frame);
        mediaQuery.removeListener(handleChange);
      };
    }
  }, []);

  return shouldReduceMotion;
}
