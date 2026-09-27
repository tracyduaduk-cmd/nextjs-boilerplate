"use client";

import React, { ReactNode } from "react";

interface FloatingPanelProps {
  children: ReactNode;
  className?: string;
  badgeText?: string;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  children,
  className = "",
  badgeText,
}) => {
  return (
    <div
      className={`relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 via-white/5 to-slate-950/70 p-6 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_35px_80px_rgba(0,0,0,0.6),0_0_30px_rgba(165,243,252,0.15)] ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
      {badgeText && (
        <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-cyan-300/30 bg-cyan-300/10 text-[9px] font-mono tracking-widest text-cyan-200 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
          {badgeText}
        </span>
      )}
      {children}
    </div>
  );
};
