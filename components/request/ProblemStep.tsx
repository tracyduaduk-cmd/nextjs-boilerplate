"use client";

import React from "react";
import { DiagnosticResult } from "@/lib/requests/types";
import { classifyProblemDescription } from "@/lib/requests/serviceRules";
import { Sparkles, Terminal, ArrowRight, Lightbulb } from "lucide-react";

interface ProblemStepProps {
  value: string;
  onChange: (text: string, classification: DiagnosticResult) => void;
  onContinue: () => void;
}

const EXAMPLE_PROMPTS = [
  "My website has been showing a white screen since yesterday.",
  "My online store stopped accepting payments.",
  "My website became extremely slow.",
  "I need an AI assistant for customer support.",
  "My business needs a booking system.",
  "I need help recovering an employee email account.",
];

export const ProblemStep: React.FC<ProblemStepProps> = ({
  value,
  onChange,
  onContinue,
}) => {
  const classification = classifyProblemDescription(value);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const classified = classifyProblemDescription(text);
    onChange(text, classified);
  };

  const handleApplyPrompt = (prompt: string) => {
    const classified = classifyProblemDescription(prompt);
    onChange(prompt, classified);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>FREE-TEXT DIAGNOSTIC INTAKE</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
          What happened or what are you trying to build?
        </h2>

        <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed max-w-xl">
          Describe the technical issue, bug, or vision in your own words. You don&apos;t need to know technical terms.
        </p>
      </div>

      {/* Main Text Area Input */}
      <div className="space-y-3">
        <div className="relative">
          <textarea
            rows={5}
            value={value}
            onChange={handleTextChange}
            placeholder="e.g. My website has been showing a blank white screen since yesterday, or I need an automated customer service chatbot..."
            className="w-full p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-sans text-sm sm:text-base leading-relaxed resize-none shadow-inner transition-colors"
          />
          <div className="absolute bottom-3 right-4 text-[11px] font-mono text-slate-500">
            {value.length}/4000
          </div>
        </div>

        {/* Example Prompt Chips */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Example inputs (click to apply):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyPrompt(prompt)}
                className="text-left text-xs font-sans px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-300 text-slate-300 transition-colors"
              >
                &ldquo;{prompt}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Classification Card */}
      {value.trim().length >= 5 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-900/90 border border-indigo-500/30 shadow-xl backdrop-blur-md space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>INTAKE CLASSIFICATION</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase font-semibold">
              {classification.detectedFamilyId}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-100 font-sans">
              Recommended Service: <span className="text-sky-300">{classification.recommendedServiceName}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed italic">
              &ldquo;{classification.explanation}&rdquo;
            </p>
          </div>

          <div className="pt-2 text-[11px] font-mono text-slate-500">
            Note: This is an intake classification to guide follow-up questions, not an automated technical diagnosis.
          </div>
        </div>
      )}
    </div>
  );
};
