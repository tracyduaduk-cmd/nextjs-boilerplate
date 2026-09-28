"use client";

import React from "react";

export interface ToolInputPanelProps {
  title?: string;
  badge?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const ToolInputPanel: React.FC<ToolInputPanelProps> = ({
  title = "Input Data",
  badge,
  children,
  actions,
  className = "",
}) => {
  return (
    <div className={`p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-xl flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
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
        <div>{children}</div>
      </div>
      {actions && <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3">{actions}</div>}
    </div>
  );
};
