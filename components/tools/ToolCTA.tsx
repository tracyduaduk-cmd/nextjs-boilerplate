"use client";

import React from "react";
import Link from "next/link";

export const ToolCTA: React.FC = () => {
  return (
    <div className="mt-16 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-slate-100 mb-2">Need a tailored manual diagnostic?</h3>
      <p className="text-sm text-slate-300 mb-6">
        Automated checks offer rapid signals, but complex software problems often require hands-on technical investigation by Snow software engineers.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/request"
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition-all"
        >
          Request Expert Audit ↗
        </Link>
        <Link
          href="/care"
          className="px-6 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 font-semibold text-sm border border-emerald-800/80 transition-all"
        >
          Explore Snow Care Plans ↗
        </Link>
      </div>
    </div>
  );
};
