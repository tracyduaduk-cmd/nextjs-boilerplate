'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tilt } from '@/components/spatial/Tilt';
import { PointerGlow } from '@/components/spatial/PointerGlow';

export type DeviceFrameType = 'desktop' | 'browser' | 'mobile' | 'phone';

interface PortfolioDeviceFrameProps {
  type?: DeviceFrameType;
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  className?: string;
  interactive?: boolean;
  priority?: boolean;
  showUrlBar?: boolean;
  urlText?: string;
  aspectRatio?: 'video' | 'portrait' | 'auto';
}

export function PortfolioDeviceFrame({
  type = 'desktop',
  src,
  alt,
  title,
  caption,
  className = '',
  interactive = true,
  priority = false,
  showUrlBar = true,
  urlText,
  aspectRatio = 'auto',
}: PortfolioDeviceFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isMobileType = type === 'mobile' || type === 'phone';

  // Fallback aspect ratios if auto
  const finalAspectRatio =
    aspectRatio === 'auto'
      ? isMobileType
        ? 'aspect-[9/19.5]'
        : 'aspect-[16/10]'
      : aspectRatio === 'portrait'
      ? 'aspect-[9/16]'
      : 'aspect-video';

  if (isMobileType) {
    return (
      <Tilt maxRotation={interactive ? 8 : 0} className={`w-full max-w-[320px] mx-auto ${className}`}>
        <div
          className="relative group rounded-[2.5rem] border-[6px] sm:border-[8px] border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-black/80 overflow-hidden hover:border-slate-700 transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <PointerGlow color="rgba(56, 189, 248, 0.15)" className="rounded-[2.2rem]" />

          {/* Top Dynamic Island / Camera Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center border border-slate-800/80">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-900/60 ml-3" />
          </div>

          {/* Viewport Frame */}
          <div className={`relative w-full ${finalAspectRatio} rounded-[2rem] overflow-hidden bg-slate-950 border border-slate-800/60`}>
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 400px"
              className={`object-cover object-top transition-all duration-700 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } ${isHovered ? 'scale-105' : 'scale-100'}`}
              onLoad={() => setIsLoaded(true)}
            />

            {/* Subtle gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />

            {/* Bottom Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full z-20 pointer-events-none" />
          </div>

          {(title || caption) && (
            <div className="pt-2 px-2 pb-1 text-center font-mono text-[10px] text-slate-400 truncate">
              {title && <span className="text-slate-200 font-semibold block truncate">{title}</span>}
              {caption && <span className="text-slate-500 block truncate">{caption}</span>}
            </div>
          )}
        </div>
      </Tilt>
    );
  }

  // Desktop / Browser Presentation Chrome
  return (
    <Tilt maxRotation={interactive ? 5 : 0} className={`w-full ${className}`}>
      <div
        className="relative group rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden hover:border-sky-500/40 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <PointerGlow color="rgba(56, 189, 248, 0.12)" className="rounded-2xl" />

        {/* Browser Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 font-mono text-xs z-20 relative backdrop-blur-md">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/40" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
          </div>

          {showUrlBar && (
            <div className="flex items-center justify-center max-w-md w-full px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800/80 text-slate-400 text-[11px] truncate mx-4 shadow-inner">
              <svg
                className="w-3.5 h-3.5 mr-2 text-cyan-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="truncate">{urlText || 'https://snow.dev/production/active-surface'}</span>
            </div>
          )}

          <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold font-mono shrink-0 hidden sm:block">
            {title || 'SNOW SYSTEM'}
          </div>
        </div>

        {/* Viewport Frame */}
        <div className={`relative w-full ${finalAspectRatio} overflow-hidden bg-slate-950`}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1200px) 100vw, 1200px"
            className={`object-cover object-top transition-all duration-700 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
            } ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}
            onLoad={() => setIsLoaded(true)}
          />

          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 via-transparent to-white/5 pointer-events-none z-10" />
        </div>

        {caption && (
          <div className="p-3 bg-slate-950/90 border-t border-slate-800/80 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span className="truncate">{caption}</span>
            <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider shrink-0 ml-2">CANONICAL ASSET</span>
          </div>
        )}
      </div>
    </Tilt>
  );
}
