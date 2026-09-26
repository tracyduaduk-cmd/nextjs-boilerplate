"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface SpatialMediaProps {
  src: string;
  alt: string;
  title?: string | null;
  caption?: string | null;
  category?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto" | "wide";
  className?: string;
  priority?: boolean;
  interactive?: boolean;
  showOverlay?: boolean;
}

export const SpatialMedia: React.FC<SpatialMediaProps> = ({
  src,
  alt,
  title,
  caption,
  category = "CONCEPT DEMO",
  aspectRatio = "video",
  className = "",
  priority = false,
  showOverlay = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let active = true;
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth === 0) {
        queueMicrotask(() => {
          if (active) setHasError(true);
        });
      } else {
        queueMicrotask(() => {
          if (active) setIsLoading(false);
        });
      }
    }
    return () => {
      active = false;
    };
  }, [src]);

  const aspectClasses = {
    video: "aspect-[16/10]",
    wide: "aspect-[21/9]",
    square: "aspect-square",
    portrait: "aspect-[9/16]",
    auto: "min-h-[260px]",
  }[aspectRatio];

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/90 shadow-2xl transition-all duration-500 group/spatial ${aspectClasses} ${className}`}
    >
      {/* Corner Technical Crosshairs / Grid Accents */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none flex items-center gap-1 font-mono text-[9px] text-slate-500/70 uppercase">
        <span className="inline-block w-1.5 h-1.5 border-t border-l border-sky-400/60" />
        <span>SNOW.MEDIA // {category}</span>
      </div>
      <div className="absolute top-2 right-2 z-20 pointer-events-none">
        <span className="inline-block w-1.5 h-1.5 border-t border-r border-sky-400/60" />
      </div>
      <div className="absolute bottom-2 left-2 z-20 pointer-events-none">
        <span className="inline-block w-1.5 h-1.5 border-b border-l border-sky-400/60" />
      </div>
      <div className="absolute bottom-2 right-2 z-20 pointer-events-none flex items-center gap-1 font-mono text-[9px] text-slate-500/70">
        <span>SYS.01</span>
        <span className="inline-block w-1.5 h-1.5 border-b border-r border-sky-400/60" />
      </div>

      {/* Atmospheric Radial Glow */}
      <div className="absolute -inset-1/2 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none z-10" />

      {/* Image Loading State Indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-sky-500/30 border-t-sky-400 rounded-full animate-spin mb-2" />
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
            Rendering Spatial Media...
          </span>
        </div>
      )}

      {/* Fallback Intentional Designed Canvas if image fails to load */}
      {hasError ? (
        <div className="relative z-10 w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 bg-slate-950 border border-slate-800/80 text-center select-none overflow-hidden">
          {/* Subtle Cyber Grid lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 max-w-sm space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-sky-400 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              MEDIA PREVIEW // SNOW DESIGN LAB
            </div>

            <h4 className="text-lg font-bold text-slate-200 font-sans tracking-tight">
              {title || "Spatial Interface Preview"}
            </h4>

            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              {caption || "High-performance spatial system architectural asset."}
            </p>

            <div className="pt-2 flex items-center justify-center gap-3 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
              <span>LATENCY &lt; 10ms</span>
              <span>•</span>
              <span>VECTOR DEPTH</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full min-h-[220px]">
          <Image
            key={src}
            ref={imgRef}
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className={`object-cover object-top transition-all duration-700 ease-out group-hover/spatial:scale-[1.03] ${
              isLoading ? "scale-105 blur-sm opacity-0" : "scale-100 blur-0 opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
          {showOverlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 opacity-70 group-hover/spatial:opacity-40 transition-opacity duration-300 pointer-events-none z-10" />
          )}
        </div>
      )}
    </div>
  );
};
