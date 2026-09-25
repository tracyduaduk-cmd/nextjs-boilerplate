"use client";

import React from "react";
import { ServiceRulesConfig, QuestionDefinition } from "@/lib/requests/types";
import { SERVICE_RULES_CONFIGS, DEFAULT_SERVICE_RULE } from "@/lib/requests/serviceRules";
import { HelpCircle, ShieldAlert, Check } from "lucide-react";

interface ContextQuestionsStepProps {
  serviceSlug: string;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, value: any) => void;
}

export const ContextQuestionsStep: React.FC<ContextQuestionsStepProps> = ({
  serviceSlug,
  answers,
  onAnswerChange,
}) => {
  const rulesConfig: ServiceRulesConfig =
    SERVICE_RULES_CONFIGS[serviceSlug] || {
      ...DEFAULT_SERVICE_RULE,
      serviceSlug,
    };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>SPECIFIC REQUIREMENTS</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans tracking-tight">
          {rulesConfig.title} Details
        </h2>

        <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-xl">
          Please answer a few quick questions so our technical team can tailor your project estimate.
        </p>
      </div>

      {/* Security Warning Notice if applicable */}
      {rulesConfig.securityNotice && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-sans flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">{rulesConfig.securityNotice}</div>
        </div>
      )}

      {/* Progressive Form Questions List */}
      <div className="space-y-6">
        {rulesConfig.questions.map((q: QuestionDefinition, index) => {
          const currentValue = answers[q.id];

          return (
            <div
              key={q.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <label className="block text-sm sm:text-base font-bold text-slate-200 font-sans">
                  <span className="text-sky-400 font-mono mr-2">0{index + 1}.</span>
                  {q.label}
                  {q.required && <span className="text-rose-400 ml-1">*</span>}
                </label>
              </div>

              {q.subtitle && (
                <p className="text-xs text-slate-400 font-sans">{q.subtitle}</p>
              )}

              {/* Input Type: Select (Rendered as interactive card grid) */}
              {q.type === "select" && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = currentValue === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onAnswerChange(q.id, opt.value)}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                          isSelected
                            ? "bg-sky-500/15 border-sky-500 text-slate-100 shadow-sm"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300"
                        }`}
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-semibold">
                            {opt.label}
                          </div>
                          {opt.description && (
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {opt.description}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shrink-0 ml-2">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Input Type: Multiselect */}
              {q.type === "multiselect" && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt) => {
                    const selectedArray: string[] = Array.isArray(currentValue)
                      ? currentValue
                      : [];
                    const isChecked = selectedArray.includes(opt.value);

                    const toggleOption = () => {
                      if (isChecked) {
                        onAnswerChange(
                          q.id,
                          selectedArray.filter((v) => v !== opt.value)
                        );
                      } else {
                        onAnswerChange(q.id, [...selectedArray, opt.value]);
                      }
                    };

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={toggleOption}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                          isChecked
                            ? "bg-sky-500/15 border-sky-500 text-slate-100 shadow-sm"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300"
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-semibold">
                          {opt.label}
                        </div>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                            isChecked
                              ? "bg-sky-500 border-sky-500 text-slate-950"
                              : "border-slate-700 bg-slate-950"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Input Type: Text / URL / Textarea */}
              {q.type === "text" && (
                <input
                  type="text"
                  value={currentValue || ""}
                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                  placeholder={q.placeholder || "Enter details..."}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans text-xs sm:text-sm"
                />
              )}

              {q.type === "url" && (
                <input
                  type="url"
                  value={currentValue || ""}
                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                  placeholder={q.placeholder || "https://example.com"}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans text-xs sm:text-sm"
                />
              )}

              {q.type === "textarea" && (
                <textarea
                  rows={3}
                  value={currentValue || ""}
                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                  placeholder={q.placeholder || "Provide details..."}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans text-xs sm:text-sm resize-none"
                />
              )}

              {q.helpText && (
                <p className="text-[11px] font-mono text-slate-500 pt-1">
                  {q.helpText}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
