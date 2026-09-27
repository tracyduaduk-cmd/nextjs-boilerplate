"use client";

import React, { ReactNode } from "react";

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "heavy";
  elevation?: "flat" | "raised" | "floating";
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  className = "",
  intensity = "medium",
  elevation = "raised",
}) => {
  const intensityMap = {
    subtle: "backdrop-blur-md bg-white/[0.04] border-white/10",
    medium: "backdrop-blur-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.03] border-white/20",
    heavy: "backdrop-blur-3xl bg-gradient-to-br from-white/[0.18] to-slate-900/80 border-white/30",
  }[intensity];

  const elevationMap = {
    flat: "shadow-sm",
    raised: "shadow-2xl shadow-black/40 shadow-inner-[0_1px_1px_rgba(255,255,255,0.4)]",
    floating: "-translate-y-2 shadow-[0_25px_60px_rgba(0,0,0,0.6)] shadow-inner-[0_1px_1px_rgba(255,255,255,0.5)]",
  }[elevation];

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-500 ${intensityMap} ${elevationMap} ${className}`}
    >
      {/* Specular Edge Highlight Top Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none rounded-t-2xl" />
      {children}
    </div>
  );
};
