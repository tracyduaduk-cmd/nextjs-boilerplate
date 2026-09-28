"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { DepthLayer } from "@/components/spatial/DepthLayer";
import { Tilt } from "@/components/spatial/Tilt";
import { Reveal } from "@/components/spatial/Reveal";
import { PointerGlow } from "@/components/spatial/PointerGlow";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { CareSystemVisual } from "@/components/care/CareSystemVisual";
import { ShieldCheck, Activity, Wrench, Zap, RefreshCw, ArrowRight, Terminal, Cpu } from "lucide-react";

export const CareHero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-slate-800/80 bg-slate-950">
      <PointerGlow color="rgba(16, 185, 129, 0.12)" size={600} />

      {/* Atmospheric Background Grid & Glow Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <Container className="relative z-10">
        {/* Top Operational Status Bar */}
        <Reveal direction="down">
          <div className="mb-8 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <SystemBadge variant="emerald" pulse={true} size="sm">
                SYSTEM OPERATIONAL
              </SystemBadge>
              <span className="hidden sm:inline-block text-slate-500">|</span>
              <span className="text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">ENGINEERING CONTROL:</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="hidden md:inline-block text-slate-500">LATENCY: &lt; 15ms</span>
              <span className="hidden lg:inline-block text-slate-500">UPTIME TARGET: 99.95%</span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-semibold">
                SNW-CARE-SYS-v2.4
              </span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content Column */}
          <div className="lg:col-span-7">
            <PerspectiveContainer perspective={1200} className="w-full text-left">
              <Reveal direction="up" delay={50}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 uppercase mb-6 shadow-lg shadow-emerald-950/40">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>SNOW TECHNICAL CARE STUDIO</span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={100}>
                <h1 className="text-[clamp(2.5rem,5.2vw,4.75rem)] font-extrabold tracking-tight text-slate-100 leading-[1.05] mb-6 font-sans">
                  YOUR SYSTEM DOESN&apos;T STOP AT{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                    LAUNCH.
                  </span>
                </h1>
              </Reveal>

              <Reveal direction="up" delay={150}>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-sans">
                  Snow Care provides continuous technical monitoring, rapid bug fixes, dependency hygiene, performance tuning, and architectural evolution for web applications, company portals, and digital software infrastructure.
                </p>
              </Reveal>

              <Reveal direction="up" delay={200}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
                  <Tilt maxRotation={6} className="w-full sm:w-auto">
                    <Link
                      href="/request?service=snow-care"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-950/60 gap-2 font-sans group"
                    >
                      <span>Request Care Service</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Tilt>

                  <Tilt maxRotation={6} className="w-full sm:w-auto">
                    <a
                      href="#care-problem-matrix"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all hover:border-emerald-500/50"
                    >
                      Diagnostic Routing Matrix
                    </a>
                  </Tilt>
                </div>
              </Reveal>

              {/* Core Pillars Bar */}
              <DepthLayer depth={-15} className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ProximitySurface glowColor="rgba(16, 185, 129, 0.15)" borderColor="rgba(16, 185, 129, 0.3)" className="p-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>MONITOR</span>
                  </div>
                </ProximitySurface>

                <ProximitySurface glowColor="rgba(16, 185, 129, 0.15)" borderColor="rgba(16, 185, 129, 0.3)" className="p-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <Wrench className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>FIX BUGS</span>
                  </div>
                </ProximitySurface>

                <ProximitySurface glowColor="rgba(16, 185, 129, 0.15)" borderColor="rgba(16, 185, 129, 0.3)" className="p-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>SECURE</span>
                  </div>
                </ProximitySurface>

                <ProximitySurface glowColor="rgba(16, 185, 129, 0.15)" borderColor="rgba(16, 185, 129, 0.3)" className="p-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>OPTIMIZE</span>
                  </div>
                </ProximitySurface>

                <ProximitySurface glowColor="rgba(16, 185, 129, 0.15)" borderColor="rgba(16, 185, 129, 0.3)" className="p-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>MAINTAIN</span>
                  </div>
                </ProximitySurface>

                <ProximitySurface glowColor="rgba(16, 185, 129, 0.15)" borderColor="rgba(16, 185, 129, 0.3)" className="p-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <span className="w-3.5 h-3.5 rounded-full border border-emerald-400 text-[9px] flex items-center justify-center font-bold text-emerald-400">E</span>
                    <span>EVOLVE</span>
                  </div>
                </ProximitySurface>
              </DepthLayer>
            </PerspectiveContainer>
          </div>

          {/* Right Column: Snow Care Technical System Pipeline Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <Reveal direction="up" delay={150} className="w-full">
              <CareSystemVisual />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
