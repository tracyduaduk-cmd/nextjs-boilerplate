"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeUrl,
  afterUrl,
  beforeAlt = "Before transformation",
  afterAlt = "After transformation",
  beforeLabel = "Before Repair / Legacy",
  afterLabel = "After Snow Re-architecture",
  aspectRatio = "aspect-[16/10]",
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-2xl ${className}`}>
      {/* Top Header Labels */}
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2 text-xs font-mono text-slate-300">
        <span className="flex items-center gap-1.5 text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          {beforeLabel}
        </span>
        <span className="flex items-center gap-1.5 text-sky-400">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          {afterLabel}
        </span>
      </div>

      {/* Slider Interactive Container */}
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden cursor-ew-resize select-none ${aspectRatio}`}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
          }
        }}
      >
        {/* AFTER Image (Full Background) */}
        <div className="absolute inset-0">
          <Image
            src={afterUrl}
            alt={afterAlt}
            fill
            unoptimized={afterUrl.startsWith("http") && !afterUrl.includes("supabase")}
            className="object-cover"
          />
        </div>

        {/* BEFORE Image (Clipped overlay) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative h-full w-full">
            {/* Image rendered full width inside clipped container */}
            <div
              className="absolute top-0 bottom-0 left-0"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100vw",
              }}
            >
              <Image
                src={beforeUrl}
                alt={beforeAlt}
                fill
                unoptimized={beforeUrl.startsWith("http") && !beforeUrl.includes("supabase")}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <button
            type="button"
            role="slider"
            aria-valuenow={sliderPosition}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Before and after comparison slider"
            onKeyDown={handleKeyDown}
            className="absolute top-1/2 -left-4 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-sky-400 bg-slate-900 text-sky-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l-4 4 4 4m8-8l4 4-4 4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
