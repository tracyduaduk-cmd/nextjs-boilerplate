"use client";

import React from "react";

export interface SystemBadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "emerald" | "amber" | "rose" | "neutral";
  size?: "sm" | "md";
  className?: string;
  pulse?: boolean;
}

export const SystemBadge: React.FC<SystemBadgeProps> = ({
  children,
  variant = "cyan",
  size = "md",
  className = "",
  pulse = true,
}) => {
  const variantStyles = {
    cyan: "bg-cyan-950/80 text-cyan-300 border-cyan-800/80",
    emerald: "bg-emerald-950/80 text-emerald-300 border-emerald-800/80",
    amber: "bg-amber-950/80 text-amber-300 border-amber-800/80",
    rose: "bg-rose-950/80 text-rose-300 border-rose-800/80",
    neutral: "bg-slate-900/80 text-slate-300 border-slate-800",
  };

  const dotStyles = {
    cyan: "bg-cyan-400 shadow-[0_0_8px_#38bdf8]",
    emerald: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    amber: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
    rose: "bg-rose-400 shadow-[0_0_8px_#fb7185]",
    neutral: "bg-slate-400",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-semibold tracking-wider uppercase backdrop-blur-md ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      <span
        className={`inline-block size-1.5 rounded-full ${dotStyles[variant]} ${pulse ? "animate-pulse" : ""}`}
      />
      <span>{children}</span>
    </span>
  );
};
