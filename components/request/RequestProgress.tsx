"use client";

import React from "react";
import { motion } from "framer-motion";

interface RequestProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  className?: string;
}

export const RequestProgress: React.FC<RequestProgressProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  className = "",
}) => {
  const percentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* Top Header Row */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-sky-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>STEP 0{currentStep} OF 0{totalSteps}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 uppercase tracking-wider">
            {stepLabels[currentStep - 1] || "Request Intake"}
          </span>
        </div>

        <div className="text-slate-500 font-medium">
          {Math.round(percentage)}% COMPLETED
        </div>
      </div>

      {/* Spatial Progress Bar */}
      <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner">
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-400 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Step Indicators for Larger Screens */}
      <div className="hidden sm:flex justify-between items-center text-[10px] font-mono text-slate-500 pt-1">
        {stepLabels.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-1.5 transition-colors ${
                isCurrent
                  ? "text-sky-300 font-bold"
                  : isCompleted
                  ? "text-slate-400 font-medium"
                  : "text-slate-600"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                  isCurrent
                    ? "bg-sky-500 text-slate-950 font-bold"
                    : isCompleted
                    ? "bg-slate-800 text-sky-400"
                    : "bg-slate-900 text-slate-600 border border-slate-800"
                }`}
              >
                {stepNum}
              </span>
              <span className="hidden md:inline truncate max-w-[80px]">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
