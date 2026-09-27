"use client";

import React from "react";
import Image from "next/image";

interface MediaStackProps {
  heroUrl: string;
  desktopUrl: string;
  mobileUrl: string;
  title: string;
  category?: string;
  className?: string;
}

export const MediaStack: React.FC<MediaStackProps> = ({
  heroUrl,
  desktopUrl,
  mobileUrl,
  title,
  category = "PORTFOLIO SYSTEM",
  className = "",
}) => {
  return (
    <div className={`relative min-h-[420px] w-full perspective-[1200px] group/stack ${className}`}>
      {/* Background Hero Plane */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl transition-all duration-700 opacity-60 group-hover/stack:opacity-80">
        <Image
          src={heroUrl}
          alt={`${title} hero plane`}
          fill
          unoptimized
          className="object-cover filter grayscale contrast-125 group-hover/stack:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* Middle Layer - Angled Desktop Frame */}
      <div
        className="absolute top-[10%] right-[5%] z-10 w-[72%] rounded-xl border border-white/25 bg-slate-900/90 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-700"
        style={{
          transform: "rotateY(-14deg) rotateX(8deg) rotateZ(-2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/5 rounded-t-xl text-[9px] font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-rose-500/80" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="ml-auto opacity-60">{category.toLowerCase()}.snow.studio</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl">
          <Image
            src={desktopUrl}
            alt={`${title} desktop interface`}
            fill
            unoptimized
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Foreground Layer - Floating Mobile Device */}
      <div
        className="absolute bottom-[5%] left-[8%] z-20 w-[32%] max-w-[180px] rounded-2xl border border-white/35 bg-slate-950/95 p-1.5 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(165,243,252,0.2)] backdrop-blur-2xl transition-all duration-700 group-hover/stack:-translate-y-2 group-hover/stack:rotate-0"
        style={{
          transform: "rotateY(16deg) rotateX(-6deg) rotateZ(4deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative aspect-[9/18] overflow-hidden rounded-xl border border-white/10">
          <Image
            src={mobileUrl}
            alt={`${title} mobile surface`}
            fill
            unoptimized
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};
