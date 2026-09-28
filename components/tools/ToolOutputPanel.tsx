"use client";

import React from "react";

export interface ToolOutputPanelProps {
  title?: string;
  badge?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  error?: string | null;
  className?: string;
}

export const ToolOutputPanel: React.FC<ToolOutputPanelProps> = ({
  title = "Formatted Result",
  badge,
  children,
  actions,
  error,
  className = "",
}) => {
  return (
    <div className={`p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-xl flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${error ? "bg-rose-400 animate-pulse" : "bg-emerald-400"}`} />
            <h3 className="text-sm font-bold text-slate-200 font-mono uppercase tracking-wider">
              {title}
            </h3>
          </div>
          {badge && (
            <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
              {badge}
            </span>
          )}
        </div>

        {error ? (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs sm:text-sm font-mono leading-relaxed space-y-1">
            <p className="font-bold text-rose-400 flex items-center gap-2">
              <span>⚠</span> Validation / Processing Error
            </p>
            <p className="whitespace-pre-wrap break-all">{error}</p>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>

      {actions && <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3">{actions}</div>}
    </div>
  );
};
