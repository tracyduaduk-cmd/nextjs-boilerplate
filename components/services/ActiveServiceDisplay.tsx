"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceRecord, CapabilityFamilyMeta } from "@/lib/services/types";
import { Tilt } from "@/components/spatial/Tilt";
import { Magnetic } from "@/components/spatial/Magnetic";
import { Button } from "@/components/ui/Button";
import { motionTokens } from "@/motion/tokens";
import {
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  Zap,
  Terminal,
} from "lucide-react";

interface ActiveServiceDisplayProps {
  service: ServiceRecord;
  familyMeta: CapabilityFamilyMeta;
  onRequestService: (service: ServiceRecord) => void;
  className?: string;
}

export const ActiveServiceDisplay: React.FC<ActiveServiceDisplayProps> = ({
  service,
  familyMeta,
  onRequestService,
  className = "",
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{
          duration: motionTokens.duration.normal,
          ease: motionTokens.ease.outExponential,
        }}
        className={`w-full ${className}`}
      >
        <Tilt maxRotation={5} scaleOnHover={1.005} glare={true} className="w-full">
          <div className="relative rounded-3xl bg-slate-950/90 border border-slate-800/90 p-6 sm:p-8 md:p-10 shadow-2xl shadow-sky-950/30 backdrop-blur-xl group overflow-hidden">

            {/* Top Spatial Accent Lighting */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Header: Family Badge, Category, Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-500/10 border border-sky-500/30 text-sky-300">
                  {familyMeta.badge}
                </span>
                <span className="text-slate-600 font-mono">•</span>
                <span className="text-xs font-mono text-slate-400">
                  CATEGORY: {service.category.toUpperCase()}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CAPABILITY READY</span>
              </div>
            </div>

            {/* Title & Descriptions */}
            <div className="pt-6 space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 font-sans tracking-tight leading-tight">
                {service.name}
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-sans font-medium leading-relaxed">
                {service.short_description}
              </p>
              {service.description && (
                <p className="text-sm text-slate-400 font-sans leading-relaxed pt-1">
                  {service.description}
                </p>
              )}
            </div>

            {/* Grid Layout: Capabilities & What We Help With */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-800/80">

              {/* Column 1: Specific Capabilities Checklist */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>SPECIFIC CAPABILITIES INCLUDED</span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                  {service.capabilities && service.capabilities.length > 0 ? (
                    service.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-500 italic">Standard technical capabilities applied.</li>
                  )}
                </ul>
              </div>

              {/* Column 2: What Snow Can Help With */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>WHAT SNOW CAN HELP WITH</span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                  {service.what_we_help_with && service.what_we_help_with.length > 0 ? (
                    service.what_we_help_with.map((help, i) => (
                      <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                        <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{help}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-500 italic">Custom technical problem solving.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Process / Approach Row */}
            {service.process && service.process.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>ENGINEERING PROCESS & APPROACH</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {service.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-left font-mono"
                    >
                      <div className="text-[10px] text-slate-500 font-bold mb-1">
                        STEP 0{idx + 1}
                      </div>
                      <div className="text-xs text-slate-200 font-medium font-sans">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer CTA & Request Action */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-400">
                <span>SERVICE REF: </span>
                <span className="text-slate-200 font-semibold">{service.slug}</span>
              </div>

              <Magnetic intensity={15}>
                <Button
                  onClick={() => onRequestService(service)}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto group shadow-xl shadow-sky-950/50"
                >
                  <span>Request this service</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Magnetic>
            </div>

          </div>
        </Tilt>
      </motion.div>
    </AnimatePresence>
  );
};
