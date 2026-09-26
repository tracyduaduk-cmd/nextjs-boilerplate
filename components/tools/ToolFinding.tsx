"use client";

import React from "react";

export interface ToolFindingProps {
  category: string;
  status: "pass" | "warning" | "attention";
  scoreLabel: string;
  findings: string[];
}

export const ToolFinding: React.FC<ToolFindingProps> = ({
  category,
  status,
  scoreLabel,
  findings,
}) => {
  const getBadgeStyle = () => {
    if (status === "pass") return "text-emerald-400 bg-emerald-950/80 border-emerald-800/80";
    if (status === "warning") return "text-amber-400 bg-amber-950/80 border-amber-800/80";
    return "text-rose-400 bg-rose-950/80 border-rose-800/80";
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-100">{category}</h3>
        <span className={`text-xs font-mono font-semibold px-3 py-1 rounded-full border ${getBadgeStyle()}`}>
          {scoreLabel}
        </span>
      </div>
      <ul className="space-y-2">
        {findings.map((f, i) => (
          <li key={i} className="flex items-start text-sm text-slate-300 gap-2.5">
            <span className="text-slate-500 font-mono text-xs mt-0.5">•</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
