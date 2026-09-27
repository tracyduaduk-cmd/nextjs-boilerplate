"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { DepthLayer } from "@/components/spatial/DepthLayer";
import { Tilt } from "@/components/spatial/Tilt";
import { Reveal } from "@/components/spatial/Reveal";
import { PointerGlow } from "@/components/spatial/PointerGlow";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";
import { ShieldCheck, Activity, Wrench, Zap, RefreshCw, ArrowRight } from "lucide-react";

export const CareHero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-slate-800/60">
      <PointerGlow color="rgba(16, 185, 129, 0.12)" size={600} />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content Column */}
          <div className="lg:col-span-7">
            <PerspectiveContainer perspective={1200} className="w-full text-left">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 uppercase mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Snow Care Technical Service
                </span>
              </Reveal>

              <Reveal direction="up" delay={100}>
                <h1 className="text-[clamp(2.25rem,4.5vw,4.25rem)] font-extrabold tracking-tight text-slate-100 leading-[1.08] mb-6 font-sans">
                  Your technology should not be left alone{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                    after launch.
                  </span>
                </h1>
              </Reveal>

              <Reveal direction="up" delay={200}>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-sans">
                  Snow Care provides ongoing technical attention, bug fixes, dependency hygiene, performance tuning, and system evolution for websites, web applications, and digital business infrastructure.
                </p>
              </Reveal>

              <Reveal direction="up" delay={300}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
                  <Tilt maxRotation={6} className="w-full sm:w-auto">
                    <Link
                      href="/request?service=snow-care"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-950/50 gap-2"
                    >
                      <span>Request Care Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Tilt>

                  <Tilt maxRotation={6} className="w-full sm:w-auto">
                    <a
                      href="#care-problem-matrix"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all"
                    >
                      What&apos;s Happening? Quick Routing
                    </a>
                  </Tilt>
                </div>
              </Reveal>

              {/* Core Pillars Bar */}
              <DepthLayer depth={-15} className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>MONITOR</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Wrench className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>FIX BUGS</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>SECURE</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>OPTIMIZE</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>MAINTAIN</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="w-3.5 h-3.5 rounded-full border border-emerald-400 text-[9px] flex items-center justify-center font-bold text-emerald-400">E</span>
                  <span>EVOLVE</span>
                </div>
              </DepthLayer>
            </PerspectiveContainer>
          </div>

          {/* Right Column: Dedicated Spatial Instrument territory */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <Reveal direction="up" delay={150}>
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl w-full max-w-md mx-auto text-center space-y-4 relative z-10">
                <div className="w-full h-[260px] sm:h-[300px] relative flex items-center justify-center touch-pan-y">
                  <SpatialInstrument mode="care" badgeLabel="[ CARE NODE ACTIVE ]" scale={0.95} accentColor="#10b981" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-200 font-sans">
                    Snow Technical Care Node
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Interactive 3D status visualizer demonstrating structural balance and diagnostic readiness.
                  </p>
                </div>

                <div className="w-full pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>NODE: CARE-01</span>
                  <span>STATUS: ONLINE</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
