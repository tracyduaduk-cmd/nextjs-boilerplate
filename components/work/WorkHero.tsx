"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { DepthLayer } from "@/components/spatial/DepthLayer";

export const WorkHero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-900 bg-slate-950">
      {/* Background Spatial Atmosphere */}
      <DepthLayer depth={-20} className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </DepthLayer>

      <Container className="relative z-10">
        <div className="max-w-5xl space-y-6">
          {/* Eyebrow badge */}
          <Reveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono tracking-wider text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>SPATIAL DIGITAL LABORATORY // SELECTED WORK</span>
            </div>
          </Reveal>

          {/* Large Editorial Headline */}
          <Reveal direction="up" delay={0.1} duration={0.8}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-100 font-sans leading-[0.98]">
              SELECTED WORK.
            </h1>
          </Reveal>

          {/* Editorial Supporting Statement */}
          <Reveal direction="up" delay={0.2} duration={0.8}>
            <p className="text-xl sm:text-2xl text-slate-300 font-sans font-light leading-relaxed max-w-3xl">
              Digital products, interfaces and systems built across web, software, AI and technical platforms.
            </p>
          </Reveal>

          {/* Factual Context Bar */}
          <Reveal direction="up" delay={0.3} duration={0.8}>
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-900/80 font-mono text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">COLLECTION</span>
                <span className="text-slate-200 font-semibold">8 System Studies</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">MEDIA ENGINE</span>
                <span className="text-sky-400 font-semibold">Supabase snow-media</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">EXECUTION</span>
                <span className="text-slate-200 font-semibold">Production Architecture</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">TARGET RESPONSE</span>
                <span className="text-emerald-400 font-semibold">&lt; 100ms Interaction</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
