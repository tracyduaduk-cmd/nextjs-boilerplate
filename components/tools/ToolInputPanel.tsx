"use client";

import React from "react";
import { Terminal } from "lucide-react";

export interface ToolInputPanelProps {
  title?: string;
  badge?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const ToolInputPanel: React.FC<ToolInputPanelProps> = ({
  title = "CONTROL SURFACE",
  badge = "INPUT",
  children,
  actions,
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 ${className}`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Surface Control Header */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-200 uppercase">
                {title}
              </h3>
            </div>
            {badge && (
              <span className="text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800/60 uppercase">
                {badge}
              </span>
            )}
          </div>

          {/* Form / Input Surface Content */}
          <div className="space-y-4">{children}</div>
        </div>

        {/* Action Toolbar */}
        {actions && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
