"use client";

import React from "react";
import { TimelineOption, BudgetOption } from "@/lib/requests/types";
import { TIMELINE_OPTIONS, BUDGET_OPTIONS } from "@/lib/requests/serviceRules";
import { Clock, Wallet, Check } from "lucide-react";

interface TimelineStepProps {
  timeline: TimelineOption;
  onTimelineChange: (val: TimelineOption) => void;
  budgetRange?: BudgetOption;
  onBudgetChange: (val: BudgetOption) => void;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  timeline,
  onTimelineChange,
  budgetRange = "not_sure",
  onBudgetChange,
}) => {
  return (
    <div className="space-y-10">
      {/* 1. Timeline Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
            <Clock className="w-3.5 h-3.5" />
            <span>TIMELINE & URGENCY</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-100">
            What is your desired timeframe?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Helps Snow prioritize engineering allocation and response scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TIMELINE_OPTIONS.map((opt) => {
            const isSelected = timeline === opt.value;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onTimelineChange(opt.value)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isSelected
                    ? "bg-sky-500/15 border-sky-500 text-slate-100 shadow-lg shadow-sky-950/30"
                    : "bg-slate-950/80 border-slate-800 hover:bg-slate-900/80 text-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold font-sans">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-1">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Optional Budget Signal Section */}
      <div className="space-y-4 pt-6 border-t border-slate-800/80">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400">
            <Wallet className="w-3.5 h-3.5" />
            <span>OPTIONAL BUDGET SIGNAL</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-100">
            Approximate project budget
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            This indicator helps match suitable solution architectures. It is optional and does not bind your quote.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BUDGET_OPTIONS.map((opt) => {
            const isSelected = budgetRange === opt.value;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onBudgetChange(opt.value)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  isSelected
                    ? "bg-indigo-500/15 border-indigo-500 text-slate-100 shadow-lg shadow-indigo-950/30"
                    : "bg-slate-950/80 border-slate-800 hover:bg-slate-900/80 text-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold font-sans">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-indigo-500 text-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-1">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
