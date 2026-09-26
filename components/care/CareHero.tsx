"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { DepthLayer } from "@/components/spatial/DepthLayer";
import { Tilt } from "@/components/spatial/Tilt";
import { Reveal } from "@/components/spatial/Reveal";
import { PointerGlow } from "@/components/spatial/PointerGlow";

export const CareHero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-slate-800/60">
      <PointerGlow color="rgba(16, 185, 129, 0.12)" size={600} />

      <Container className="relative z-10">
        <PerspectiveContainer perspective={1200} className="max-w-5xl mx-auto text-center">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Snow Care Platform
            </span>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.08] mb-8">
              Your technology should not be left alone <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">after launch.</span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              Snow Care keeps websites, applications and business technology maintained, monitored and continuously improving long after the initial build is complete.
            </p>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Tilt maxRotation={8} className="w-full sm:w-auto">
                <a
                  href="#care-plans"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-900/30"
                >
                  Explore Care Plans
                </a>
              </Tilt>
              <Tilt maxRotation={8} className="w-full sm:w-auto">
                <Link
                  href="/request"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all"
                >
                  Request a Service Recommendation ↗
                </Link>
              </Tilt>
            </div>
          </Reveal>

          <DepthLayer depth={-20} className="mt-16 pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">Proactive</p>
              <p className="text-sm font-medium text-slate-200 mt-1">Preventative Maintenance</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">Continuous</p>
              <p className="text-sm font-medium text-slate-200 mt-1">Health Monitoring</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">Adaptive</p>
              <p className="text-sm font-medium text-slate-200 mt-1">Security & Dependencies</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">Tailored</p>
              <p className="text-sm font-medium text-slate-200 mt-1">Evolving Optimization</p>
            </div>
          </DepthLayer>
        </PerspectiveContainer>
      </Container>
    </section>
  );
};
