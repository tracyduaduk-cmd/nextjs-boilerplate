"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const ToolCTA: React.FC = () => {
  return (
    <div className="mt-16 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center max-w-3xl mx-auto space-y-4 shadow-xl">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-xs font-mono text-emerald-400 uppercase">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Expert Engineering Evaluation</span>
      </div>
      <h3 className="text-xl font-bold text-slate-100 font-sans">Need a tailored manual diagnostic?</h3>
      <p className="text-sm text-slate-300 font-sans leading-relaxed max-w-xl mx-auto">
        Automated checks offer rapid signals, but complex software issues require hands-on technical investigation by Snow software engineers.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
        <Link
          href="/request?service=snow-care&mode=diagnostic"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
        >
          <span>Request Snow Care Audit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/care"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2"
        >
          <span>Explore Snow Care Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
