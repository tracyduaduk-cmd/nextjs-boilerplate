"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";

const steps = [
  {
    step: "01",
    phaseCode: "PHASE-01 // ASSESS",
    title: "Assess",
    tagline: "Understand the existing system",
    description: "We perform a thorough diagnostic of your website or app codebase, server infrastructure, security posture, third-party dependencies, and loading performance.",
    deliverable: "Diagnostic Baseline Report",
  },
  {
    step: "02",
    phaseCode: "PHASE-02 // STABILIZE",
    title: "Stabilize",
    tagline: "Fix important issues & establish baseline",
    description: "Before initiating routine care, we resolve immediate bugs, patch critical security vulnerabilities, establish clean backups, and benchmark baseline performance.",
    deliverable: "Hardened Production Baseline",
  },
  {
    step: "03",
    phaseCode: "PHASE-03 // MAINTAIN",
    title: "Maintain",
    tagline: "Perform planned technical care",
    description: "We execute scheduled dependency updates, verify key form/checkout workflows, monitor uptime and security signals, and handle minor technical adjustments.",
    deliverable: "Continuous Care Log",
  },
  {
    step: "04",
    phaseCode: "PHASE-04 // IMPROVE",
    title: "Improve",
    tagline: "Recommend strategic improvements",
    description: "As your business evolves, we propose technical upgrades, new automation possibilities, speed optimizations, and feature enhancements to keep you ahead.",
    deliverable: "Quarterly System Roadmap",
  },
];

export const CareProcess: React.FC = () => {
  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-950 relative overflow-hidden">
      <Container>
        <div className="max-w-3xl mb-16">
          <Reveal direction="up">
            <SystemBadge variant="emerald" pulse={true} className="mb-4">
              ENGINEERING METHODOLOGY PIPELINE
            </SystemBadge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4 font-sans">
              How Snow Care Works.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              A structured 4-phase engineering lifecycle that transforms vulnerable digital setups into predictable, high-performance assets.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <Reveal key={item.step} direction="up" delay={index * 80}>
              <Tilt maxRotation={4} className="h-full">
                <ProximitySurface
                  glowColor="rgba(16, 185, 129, 0.12)"
                  borderColor="rgba(16, 185, 129, 0.3)"
                  className="p-6 bg-slate-900/60 border border-slate-800/80 h-full flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                      <span className="text-3xl font-mono font-extrabold text-emerald-400 group-hover:scale-110 transition-transform">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {item.phaseCode}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 mb-1 font-sans">{item.title}</h3>
                    <p className="text-xs font-mono text-emerald-400/90 mb-3">{item.tagline}</p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">{item.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500">DELIVERABLE:</span>
                    <span className="text-slate-200 font-semibold">{item.deliverable}</span>
                  </div>
                </ProximitySurface>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
