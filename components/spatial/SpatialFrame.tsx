"use client";

import React, { ReactNode } from "react";

interface SpatialFrameProps {
  children: ReactNode;
  title?: string;
  statusText?: string;
  className?: string;
}

export const SpatialFrame: React.FC<SpatialFrameProps> = ({
  children,
  title = "SNOW_OS / SPATIAL CONSOLE",
  statusText = "SYS.ONLINE",
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/25 bg-slate-950/80 shadow-[0_25px_65px_rgba(0,0,0,0.7)] backdrop-blur-2xl ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[10px] text-slate-300 tracking-wider uppercase">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-cyan-300 tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
          {statusText}
        </div>
      </div>
      <div className="relative p-6">{children}</div>
    </div>
  );
};
