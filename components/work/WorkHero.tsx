"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { DepthLayer } from "@/components/spatial/DepthLayer";

export const WorkHero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-slate-900 bg-slate-950">
      {/* Background Spatial Atmosphere */}
      <DepthLayer depth={-20} className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full" />
      </DepthLayer>

      <Container className="relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <Reveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono tracking-wider text-sky-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>PROJECT ARCHIVE & CASE STUDIES</span>
            </div>
          </Reveal>

          {/* Large Editorial Headline */}
          <Reveal direction="up" delay={0.1} duration={0.8}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 font-sans leading-[1.08] mb-6">
              Engineering solutions that <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-slate-200">
                endure & perform.
              </span>
            </h1>
          </Reveal>

          {/* Editorial Supporting Copy */}
          <Reveal direction="up" delay={0.2} duration={0.8}>
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl font-sans">
              Explore Snow’s portfolio of high-performance web applications, modern e-commerce storefronts, custom AI integrations, and resilient digital architectures. Built with mathematical precision and spatial depth.
            </p>
          </Reveal>

          {/* Live System Stats Bar */}
          <Reveal direction="up" delay={0.3} duration={0.8}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <div>
                <span className="text-xs font-mono text-slate-500 block">DEPLOYMENT ARCHIVE</span>
                <span className="text-lg font-semibold text-slate-200 font-mono">8 Systems</span>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block">TECH STACK</span>
                <span className="text-lg font-semibold text-sky-400 font-mono">Next.js • Supabase</span>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block">EXECUTION QUALITY</span>
                <span className="text-lg font-semibold text-slate-200 font-mono">Production Grade</span>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block">RESPONSE TIME</span>
                <span className="text-lg font-semibold text-emerald-400 font-mono">&lt; 100ms Standard</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
