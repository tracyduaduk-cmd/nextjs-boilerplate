"use client";

import React from "react";
import { CheckCircle, ArrowRight, ShieldAlert } from "lucide-react";

export interface ProblemVisualProps {
  title?: string;
  problemText: string;
  fixText: string;
  problemDetails?: string[];
  fixDetails?: string[];
  className?: string;
}

export const ProblemVisual: React.FC<ProblemVisualProps> = ({
  title = "Technical System State Transformation",
  problemText,
  fixText,
  problemDetails = [
    "Unmonitored runtime memory drift",
    "Outdated framework dependencies",
    "Unindexed query latency",
  ],
  fixDetails = [
    "Proactive dependency patches",
    "Automated regression triage",
    "Optimized data access layers",
  ],
  className = "",
}) => {
  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" /> {title}
        </h3>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 uppercase border border-slate-700">
          Architecture Shift
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-rose-900/40 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold uppercase">
            <span>Current Pain Point</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <p className="text-sm font-semibold text-slate-200">{problemText}</p>
          <ul className="space-y-1.5 pt-2 border-t border-slate-900 text-xs font-mono text-slate-400">
            {problemDetails.map((detail, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-rose-500">✕</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-800/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold uppercase">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-cyan-400" /> Snow Engineering Fix</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <p className="text-sm font-semibold text-slate-100">{fixText}</p>
          <ul className="space-y-1.5 pt-2 border-t border-cyan-950 text-xs font-mono text-cyan-200/80">
            {fixDetails.map((detail, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
