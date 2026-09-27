"use client";

import React from "react";
import { FileText } from "lucide-react";

interface DetailsStepProps {
  problemDescription: string;
  onDescriptionChange: (val: string) => void;
}

export const DetailsStep: React.FC<DetailsStepProps> = ({
  problemDescription,
  onDescriptionChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
          <FileText className="w-3.5 h-3.5" />
          <span>PROJECT SCOPE & DETAILS</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans tracking-tight">
          Additional Context & Specs
        </h2>

        <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-xl">
          Provide any further background, specific features, design preferences, or technical constraints.
        </p>
      </div>

      {/* Text Area */}
      <div className="space-y-3">
        <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
          ADDITIONAL SCOPE & REQUIREMENTS SUMMARY
        </label>
        <textarea
          rows={5}
          value={problemDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="e.g. We need integration with Paystack, multi-language support (English & French), and a launch before Q3..."
          className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans text-xs sm:text-sm leading-relaxed resize-none"
        />
        <div className="text-[11px] font-mono text-slate-500 text-right">
          Optional but recommended for precise scoping.
        </div>
      </div>
    </div>
  );
};
