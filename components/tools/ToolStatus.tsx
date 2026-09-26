"use client";

import React from "react";

export interface ToolStatusProps {
  status: "engine-ready" | "scanning" | "completed";
  message?: string;
}

export const ToolStatus: React.FC<ToolStatusProps> = ({ status, message }) => {
  if (status === "scanning") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-sky-400 bg-sky-950/80 border border-sky-800/80">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        <span>{message || "Diagnostic Scan in Progress..."}</span>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>{message || "Diagnostic Report Generated"}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800">
      <span className="w-2 h-2 rounded-full bg-slate-500" />
      <span>{message || "Diagnostic Engine Ready"}</span>
    </div>
  );
};
