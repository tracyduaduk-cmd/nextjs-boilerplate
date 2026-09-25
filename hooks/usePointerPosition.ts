"use client";

import { useEffect, useState, RefObject } from "react";

export interface PointerState {
  // Normalized coords relative to element center (-1 to +1)
  xNormalized: number;
  yNormalized: number;
  // Raw pixel offsets from element center
  xPixel: number;
  yPixel: number;
  // Pointer coordinates relative to viewport
  clientX: number;
  clientY: number;
  // State indicators
  isHovered: boolean;
  isTouch: boolean;
}

const defaultState: PointerState = {
  xNormalized: 0,
  yNormalized: 0,
  xPixel: 0,
  yPixel: 0,
  clientX: 0,
  clientY: 0,
  isHovered: false,
  isTouch: false,
};

/**
 * Tracks pointer / touch movement over a target container or global window.
 * Returns normalized coordinates (-1 to 1) from element center with passive RAF updates.
 */
export function usePointerPosition(containerRef?: RefObject<HTMLElement | null>): PointerState {
  const [pointer, setPointer] = useState<PointerState>(defaultState);

  useEffect(() => {
    let animationFrameId: number;
    const element = containerRef?.current;

    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      const isTouchDevice = e.type.startsWith("touch");
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as PointerEvent).clientX;
        clientY = (e as PointerEvent).clientY;
      }

      animationFrameId = requestAnimationFrame(() => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const rawX = clientX - centerX;
          const rawY = clientY - centerY;

          const normX = Math.max(-1, Math.min(1, rawX / (rect.width / 2)));
          const normY = Math.max(-1, Math.min(1, rawY / (rect.height / 2)));

          const isInside =
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom;

          setPointer({
            xNormalized: normX,
            yNormalized: normY,
            xPixel: rawX,
            yPixel: rawY,
            clientX,
            clientY,
            isHovered: isInside,
            isTouch: isTouchDevice,
          });
        } else {
          // Global window relative
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;

          const rawX = clientX - centerX;
          const rawY = clientY - centerY;

          const normX = rawX / centerX;
          const normY = rawY / centerY;

          setPointer({
            xNormalized: normX,
            yNormalized: normY,
            xPixel: rawX,
            yPixel: rawY,
            clientX,
            clientY,
            isHovered: true,
            isTouch: isTouchDevice,
          });
        }
      });
    };

    const handleMouseLeave = () => {
      setPointer((prev) => ({
        ...prev,
        xNormalized: 0,
        yNormalized: 0,
        xPixel: 0,
        yPixel: 0,
        isHovered: false,
      }));
    };

    const target = element || window;

    target.addEventListener("pointermove", handlePointerMove as EventListener, { passive: true });
    target.addEventListener("touchmove", handlePointerMove as EventListener, { passive: true });

    if (element) {
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      target.removeEventListener("pointermove", handlePointerMove as EventListener);
      target.removeEventListener("touchmove", handlePointerMove as EventListener);
      if (element) {
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef]);

  return pointer;
}
