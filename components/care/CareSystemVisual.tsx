"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { AlertTriangle, Activity, CheckCircle2, ArrowRight, ShieldCheck, RefreshCw, Cpu } from "lucide-react";

export const CareSystemVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState<"problem" | "diagnosis" | "fix">("diagnosis");

  return (
    <ProximitySurface
      glowColor={activeStep === "problem" ? "rgba(244, 63, 94, 0.15)" : activeStep === "diagnosis" ? "rgba(245, 158, 11, 0.15)" : "rgba(16, 185, 129, 0.15)"}
      borderColor={activeStep === "problem" ? "rgba(244, 63, 94, 0.4)" : activeStep === "diagnosis" ? "rgba(245, 158, 11, 0.4)" : "rgba(16, 185, 129, 0.4)"}
      className="w-full max-w-md mx-auto p-5 sm:p-6 bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5 text-left relative overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>CARE COVERAGE</span>
        </div>
        <SystemBadge variant="emerald" size="sm">
          SNW-CARE-01
        </SystemBadge>
      </div>

      {/* Media Image Banner */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-slate-800/80">
        <Image
          src="https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-tech-monitor.png"
          alt="Snow System Telemetry Monitor"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Interactive Step Switcher Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800/90 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveStep("problem")}
          className={`py-2 px-2 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 focus:outline-none ${
            activeStep === "problem"
              ? "bg-rose-950/80 text-rose-300 border border-rose-800/80 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
          <span>1. PROBLEM</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveStep("diagnosis")}
          className={`py-2 px-2 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 focus:outline-none ${
            activeStep === "diagnosis"
              ? "bg-amber-950/80 text-amber-300 border border-amber-800/80 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <RefreshCw className="w-3 h-3 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: "3s" }} />
          <span>2. DIAGNOSIS</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveStep("fix")}
          className={`py-2 px-2 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 focus:outline-none ${
            activeStep === "fix"
              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
          <span>3. FIX</span>
        </button>
      </div>

      {/* Spatial 3D Instrument Stage Container */}
      <div className="relative w-full h-[180px] sm:h-[200px] rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <SpatialInstrument
            mode="care"
            scale={0.75}
            accentColor={activeStep === "problem" ? "#f43f5e" : activeStep === "diagnosis" ? "#f59e0b" : "#10b981"}
          />
        </div>

        {/* Floating Telemetry Box overlay based on current state */}
        <div className="relative z-10 w-[90%] p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md space-y-2 shadow-xl">
          {activeStep === "problem" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  INCIDENT DETECTED
                </span>
                <span>ERR 502 / MEM LEAK</span>
              </div>
              <p className="text-[11px] font-sans text-slate-300 leading-snug">
                Unhandled API drift, expired SSL certificates, or memory fragmentation degrading production response times.
              </p>
            </div>
          )}

          {activeStep === "diagnosis" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  TRIAGE & PROFILING
                </span>
                <span>ROOT CAUSE ISOLATED</span>
              </div>
              <p className="text-[11px] font-sans text-slate-300 leading-snug">
                Snow telemetry isolates thread locks, dependency vulnerabilities, and query bottlenecks within minutes.
              </p>
            </div>
          )}

          {activeStep === "fix" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  SYSTEM HARDENED & STABLE
                </span>
                <span>ACTIVE CARE COVERAGE</span>
              </div>
              <p className="text-[11px] font-sans text-slate-300 leading-snug">
                Patch applied, runtime updated, health monitoring active, continuous technical stewardship enabled.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Visual Pipeline Flow Diagram */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider">
          <span>CARE PROGRESSION</span>
          <span>AUTOMATED TRIAGE</span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className={`flex-1 p-2 rounded-lg text-center border transition-all ${
            activeStep === "problem" ? "border-rose-500/80 bg-rose-950/40 text-rose-300 font-bold" : "border-slate-800 text-slate-500"
          }`}>
            UNSTABLE
          </div>
          <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />
          <div className={`flex-1 p-2 rounded-lg text-center border transition-all ${
            activeStep === "diagnosis" ? "border-amber-500/80 bg-amber-950/40 text-amber-300 font-bold" : "border-slate-800 text-slate-500"
          }`}>
            DIAGNOSIS
          </div>
          <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />
          <div className={`flex-1 p-2 rounded-lg text-center border transition-all ${
            activeStep === "fix" ? "border-emerald-500/80 bg-emerald-950/40 text-emerald-300 font-bold" : "border-slate-800 text-slate-500"
          }`}>
            HARDENED
          </div>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1">
          <Cpu className="w-3 h-3 text-emerald-400" />
          <span>CARE TRIAGE ENGINE</span>
        </span>
        <span className="text-emerald-400 font-semibold">CONTINUOUS MAINTENANCE</span>
      </div>
    </ProximitySurface>
  );
};
