"use client";

import React from "react";
import Link from "next/link";
import { ServiceRequestRecord } from "@/lib/requests/types";
import { CheckCircle2, ArrowRight, MessageSquare, Copy, Check } from "lucide-react";

interface SuccessStateProps {
  record: ServiceRequestRecord;
  onReset?: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  record,
  onReset,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyReference = () => {
    if (record.referenceCode) {
      navigator.clipboard.writeText(record.referenceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      {/* Icon & Badge */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 shadow-xl shadow-emerald-950/40 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 font-semibold">
          <span>REQUEST RECEIVED</span>
          <span className="text-slate-600">•</span>
          <span>SNOW SYSTEM CONFIRMED</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-sans tracking-tight">
          Your technical request is now in the Snow system.
        </h1>

        <p className="text-sm sm:text-base text-slate-400 font-sans max-w-lg mx-auto">
          Thank you, <span className="text-slate-200 font-semibold">{record.contact.name}</span>. Our engineering team has received your submission and will review your requirements.
        </p>
      </div>

      {/* Reference Code Card */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4 text-center relative overflow-hidden">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          YOUR OFFICIAL REQUEST REFERENCE CODE
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-sky-400 tracking-widest bg-slate-900 px-6 py-3 rounded-2xl border border-sky-500/30">
            {record.referenceCode}
          </div>

          <button
            type="button"
            onClick={handleCopyReference}
            className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 transition-colors"
            title="Copy reference code"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <p className="text-xs font-mono text-slate-500">
          Save this reference code for future communications with Snow support.
        </p>
      </div>

      {/* What Happens Next Section */}
      <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
        <h3 className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
          // WHAT HAPPENS NEXT
        </h3>

        <ol className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-sky-400 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
              1
            </span>
            <span>
              <strong>Technical Review:</strong> A senior Snow lead will analyze your request specifications and diagnostic context.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-sky-400 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
              2
            </span>
            <span>
              <strong>Engineering Proposal:</strong> We will prepare a detailed scope outline and estimate delivery schedule.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-sky-400 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
              3
            </span>
            <span>
              <strong>Direct Outreach:</strong> We will reach out via your preferred channel (<span className="capitalize text-sky-300 font-medium">{record.contact.preferredContact}</span>) at <span className="text-slate-200 font-medium">{record.contact.email}</span>.
            </span>
          </li>
        </ol>
      </div>

      {/* Action Navigation Pathways */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-950/50"
        >
          <span>Return to Snow Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-xs transition-colors"
          >
            Submit Another Request
          </button>
        )}
      </div>
    </div>
  );
};
