"use client";

import React from "react";
import { AlertTriangle, CheckCircle, ArrowRight, ShieldAlert } from "lucide-react";

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
    "Optimized index & query caching",
  ],
  className = "",
}) => {
  return (
    <div className={`p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          PROBLEM → FIX DIAGNOSTIC MATRIX
        </span>
        <span className="text-[11px] font-mono text-slate-500">SNOW CARE SYSTEM ARCHITECTURE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Problem State */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-rose-950/30 border border-rose-900/60 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>UNMANAGED STATE (RISK)</span>
          </div>
          <h4 className="text-base font-bold text-slate-100 font-sans">{problemText}</h4>
          <ul className="space-y-1.5 pt-2 border-t border-rose-900/40 text-xs font-mono text-slate-300">
            {problemDetails.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400">✕</span>
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Transition Indicator */}
        <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-2">
          <div className="p-3 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 shadow-lg">
            <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-2 font-semibold uppercase">SNOW CARE</span>
        </div>

        {/* Right: Corrected / Fix State */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-emerald-950/30 border border-emerald-900/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>OPTIMIZED STATE (STABLE)</span>
          </div>
          <h4 className="text-base font-bold text-slate-100 font-sans">{fixText}</h4>
          <ul className="space-y-1.5 pt-2 border-t border-emerald-900/40 text-xs font-mono text-slate-300">
            {fixDetails.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
