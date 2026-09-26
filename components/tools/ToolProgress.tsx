"use client";

import React from "react";

export interface ToolProgressProps {
  progress: number;
  label?: string;
}

export const ToolProgress: React.FC<ToolProgressProps> = ({
  progress,
  label = "Analyzing digital infrastructure...",
}) => {
  return (
    <div className="max-w-xl mx-auto my-12 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
      <div className="flex items-center justify-between text-xs font-mono mb-2">
        <span className="text-slate-400">{label}</span>
        <span className="text-sky-400 font-bold">{progress}%</span>
      </div>
      <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-4">
        Snow Diagnostic Engine evaluating response metrics, security signals & structure.
      </p>
    </div>
  );
};
