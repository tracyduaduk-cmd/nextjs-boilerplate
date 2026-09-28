"use client";

import React from "react";
import { SpatialInstrument, SpatialInstrumentMode } from "@/components/spatial/SpatialInstrument";

export interface ToolVisualStageProps {
  mode?: SpatialInstrumentMode;
  statusLabel?: string;
  metricLabel?: string;
  metricValue?: string;
  accentColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export const ToolVisualStage: React.FC<ToolVisualStageProps> = ({
  mode = "home",
  statusLabel = "SYSTEM PROCESSING ACTIVE",
  metricLabel = "DATA MODE",
  metricValue = "LOCAL BROWSER",
  accentColor = "#38bdf8",
  children,
  className = "",
}) => {
  return (
    <div className={`p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800/80 pb-2.5">
        <span className="flex items-center gap-2 text-sky-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          {statusLabel}
        </span>
        <span className="text-slate-500">CLIENT-SIDE SECURE</span>
      </div>

      <div className="w-full h-[180px] sm:h-[220px] relative flex items-center justify-center touch-pan-y">
        <SpatialInstrument mode={mode} scale={0.85} accentColor={accentColor} />
      </div>

      {children}

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>{metricLabel}: <strong className="text-slate-200">{metricValue}</strong></span>
        <span>ZERO TRANSMISSION</span>
      </div>
    </div>
  );
};
