"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";

const steps = [
  {
    step: "01",
    title: "Assess",
    tagline: "Understand the existing system",
    description: "We perform a thorough diagnostic of your website or app codebase, server infrastructure, security posture, third-party dependencies, and loading performance.",
  },
  {
    step: "02",
    title: "Stabilize",
    tagline: "Fix important issues & establish baseline",
    description: "Before initiating routine care, we resolve immediate bugs, patch critical security vulnerabilities, establish clean backups, and benchmark baseline performance.",
  },
  {
    step: "03",
    title: "Maintain",
    tagline: "Perform planned technical care",
    description: "We execute scheduled dependency updates, verify key form/checkout workflows, monitor uptime and security signals, and handle minor technical adjustments.",
  },
  {
    step: "04",
    title: "Improve",
    tagline: "Recommend strategic improvements",
    description: "As your business evolves, we propose technical upgrades, new automation possibilities, speed optimizations, and feature enhancements to keep you ahead.",
  },
];

export const CareProcess: React.FC = () => {
  return (
    <section className="py-20 border-b border-slate-800/60">
      <Container>
        <div className="max-w-3xl mb-16">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2 block">Methodology</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4">
              How Snow Care Works.
            </h2>
            <p className="text-slate-300 text-lg">
              A structured 4-phase lifecycle that transforms vulnerable legacy systems into predictable, high-performance assets.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <Reveal key={item.step} direction="up" delay={index * 100}>
              <Tilt maxRotation={6} className="h-full">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-700/60 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-mono font-bold text-emerald-400">{item.step}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-1">{item.title}</h3>
                    <p className="text-xs font-mono text-emerald-400/90 mb-3">{item.tagline}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
