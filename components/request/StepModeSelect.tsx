"use client";

import React from "react";
import { EntryMode } from "@/lib/requests/types";
import { Tilt } from "@/components/spatial/Tilt";
import { Target, HelpCircle, ArrowRight, Sparkles } from "lucide-react";

interface StepModeSelectProps {
  selectedMode: EntryMode | null;
  onSelectMode: (mode: EntryMode) => void;
}

export const StepModeSelect: React.FC<StepModeSelectProps> = ({
  selectedMode,
  onSelectMode,
}) => {
  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INTAKE ENTRY MODE</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
          How would you like to start?
        </h2>

        <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed max-w-xl">
          Whether you have a clear technical deliverable in mind or an unclassified technology issue, Snow will structure your request for our engineering team.
        </p>
      </div>

      {/* Two Entry Mode Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Option 1: Direct Service Selection */}
        <Tilt maxRotation={4} scaleOnHover={1.02} glare={true} className="h-full">
          <button
            type="button"
            onClick={() => onSelectMode("direct")}
            className={`w-full h-full text-left p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              selectedMode === "direct"
                ? "bg-slate-900 border-sky-500/70 shadow-xl shadow-sky-950/40 ring-1 ring-sky-500/40"
                : "bg-slate-950/80 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    selectedMode === "direct"
                      ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                      : "bg-slate-900 text-slate-300 border-slate-800 group-hover:border-sky-500/30 group-hover:text-sky-400"
                  }`}
                >
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                  DIRECT SELECTION
                </span>
              </div>

              <h3 className="text-xl font-bold font-sans text-slate-100 group-hover:text-sky-300 transition-colors">
                I know what I need
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Select directly from Snow&apos;s service catalog and 8 capability families (Web, App, AI, Infrastructure, Security, Business IT, etc.).
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
                Choose Service
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        </Tilt>

        {/* Option 2: Problem Diagnostic Mode */}
        <Tilt maxRotation={4} scaleOnHover={1.02} glare={true} className="h-full">
          <button
            type="button"
            onClick={() => onSelectMode("diagnostic")}
            className={`w-full h-full text-left p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              selectedMode === "diagnostic"
                ? "bg-slate-900 border-sky-500/70 shadow-xl shadow-sky-950/40 ring-1 ring-sky-500/40"
                : "bg-slate-950/80 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    selectedMode === "diagnostic"
                      ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                      : "bg-slate-900 text-slate-300 border-slate-800 group-hover:border-indigo-500/30 group-hover:text-indigo-400"
                  }`}
                >
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                  DIAGNOSTIC INTAKE
                </span>
              </div>

              <h3 className="text-xl font-bold font-sans text-slate-100 group-hover:text-indigo-300 transition-colors">
                Help me figure it out
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Describe your issue or technical objective in plain English. Snow will classify the problem and guide your details.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
                Describe Problem
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        </Tilt>
      </div>
    </div>
  );
};
