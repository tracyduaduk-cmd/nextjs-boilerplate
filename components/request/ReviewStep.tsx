"use client";

import React from "react";
import { ServiceRequestData } from "@/lib/requests/types";
import { TIMELINE_OPTIONS, BUDGET_OPTIONS, SERVICE_RULES_CONFIGS } from "@/lib/requests/serviceRules";
import { ShieldCheck, Edit3, Send, CheckCircle2 } from "lucide-react";

interface ReviewStepProps {
  data: ServiceRequestData;
  serviceName: string;
  onJumpToStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  errorMessage?: string | null;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  serviceName,
  onJumpToStep,
  onSubmit,
  isSubmitting,
  errorMessage,
}) => {
  const timelineLabel =
    TIMELINE_OPTIONS.find((t) => t.value === data.timeline)?.label || data.timeline;
  const budgetLabel =
    BUDGET_OPTIONS.find((b) => b.value === data.budgetRange)?.label || data.budgetRange;

  const questionsConfig = SERVICE_RULES_CONFIGS[data.selectedServiceSlug];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>REQUEST SUMMARY & REVIEW</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans tracking-tight">
          Does this look right?
        </h2>

        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          Review your structured request details below before submitting to Snow engineering.
        </p>
      </div>

      {/* Summary Card */}
      <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Service & Category Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="text-[10px] font-mono text-sky-400 uppercase tracking-wider font-semibold">
              SELECTED SERVICE CAPABILITY
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-100 mt-0.5">
              {serviceName}
            </h3>
            <div className="text-xs font-mono text-slate-500 mt-1">
              CAPABILITY FAMILY: {data.selectedFamilyId}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Change Service</span>
          </button>
        </div>

        {/* Problem Description / Context */}
        {data.problemDescription && (
          <div className="space-y-2 pb-6 border-b border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400 font-semibold uppercase">
                PROBLEM / OBJECTIVE DESCRIPTION
              </div>
              <button
                type="button"
                onClick={() => onJumpToStep(data.entryMode === "diagnostic" ? 2 : 4)}
                className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
              {data.problemDescription}
            </p>
          </div>
        )}

        {/* Structured Question Answers */}
        {data.answers && Object.keys(data.answers).length > 0 && (
          <div className="space-y-3 pb-6 border-b border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400 font-semibold uppercase">
                SPECIFIC REQUIREMENTS
              </div>
              <button
                type="button"
                onClick={() => onJumpToStep(3)}
                className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(data.answers).map(([key, val]) => {
                if (key.startsWith("_")) return null; // Internal fields
                const qDef = questionsConfig?.questions.find((q) => q.id === key);
                const label = qDef ? qDef.label : key.replace(/_/g, " ");

                let displayVal = "";
                if (Array.isArray(val)) {
                  displayVal = val.join(", ");
                } else if (typeof val === "boolean") {
                  displayVal = val ? "Yes" : "No";
                } else {
                  displayVal = String(val);
                }

                return (
                  <div key={key} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 font-sans">
                    <div className="text-[11px] text-slate-400 font-mono line-clamp-1">{label}</div>
                    <div className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5 capitalize">
                      {displayVal || "Not specified"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Timeline & Budget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 font-semibold uppercase">TIMELINE</span>
              <button
                type="button"
                onClick={() => onJumpToStep(5)}
                className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>
            <div className="text-sm font-bold text-slate-200">{timelineLabel}</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 font-semibold uppercase">APPROX. BUDGET</span>
              <button
                type="button"
                onClick={() => onJumpToStep(5)}
                className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>
            <div className="text-sm font-bold text-slate-200">{budgetLabel}</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-slate-400 font-semibold uppercase">CONTACT DETAILS</div>
            <button
              type="button"
              onClick={() => onJumpToStep(7)}
              className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 font-sans space-y-1">
            <div><span className="text-slate-500 font-mono">Name:</span> {data.contact.name}</div>
            <div><span className="text-slate-500 font-mono">Email:</span> {data.contact.email}</div>
            {data.contact.phone && <div><span className="text-slate-500 font-mono">Phone/WhatsApp:</span> {data.contact.phone}</div>}
            {data.contact.company && <div><span className="text-slate-500 font-mono">Organization:</span> {data.contact.company}</div>}
            <div><span className="text-slate-500 font-mono">Preferred Channel:</span> <span className="capitalize">{data.contact.preferredContact}</span></div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans">
          {errorMessage}
        </div>
      )}

      {/* Primary Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Request an Estimate • No payment required at intake</span>
        </div>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold font-mono text-sm flex items-center justify-center gap-3 shadow-xl shadow-sky-950/50 transition-all"
        >
          {isSubmitting ? (
            <span>Submitting Request...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Request for Estimate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
