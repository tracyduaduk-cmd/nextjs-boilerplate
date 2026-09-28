"use client";

import React from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export interface ToolOutputPanelProps {
  title?: string;
  badge?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  error?: string | null;
  className?: string;
}

export const ToolOutputPanel: React.FC<ToolOutputPanelProps> = ({
  title = "LIVE RESULT SURFACE",
  badge = "OUTPUT",
  children,
  actions,
  error,
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${
        error ? "border-rose-800/80 bg-rose-950/20" : "border-slate-800/90 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90"
      } p-5 sm:p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 ${className}`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Result Surface Header */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-1.5 rounded-lg border ${
                  error
                    ? "bg-rose-950/80 border-rose-800/60 text-rose-400"
                    : "bg-emerald-950/80 border-emerald-800/60 text-emerald-400"
                }`}
              >
                {error ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              </div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-200 uppercase">
                {title}
              </h3>
            </div>

            {badge && (
              <span
                className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border uppercase ${
                  error
                    ? "bg-rose-950/80 text-rose-300 border-rose-800/80"
                    : "bg-emerald-950/80 text-emerald-300 border-emerald-800/80"
                }`}
              >
                {badge}
              </span>
            )}
          </div>

          {/* Diagnostic Error Banner */}
          {error ? (
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 font-mono text-xs leading-relaxed space-y-1">
              <p className="font-bold uppercase tracking-wider text-rose-300">✦ Execution Error</p>
              <p className="break-all">{error}</p>
            </div>
          ) : (
            <div className="space-y-4">{children}</div>
          )}
        </div>

        {/* Action Bar */}
        {actions && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
