'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Terminal, Box } from 'lucide-react';
import { KineticText } from '@/components/spatial/KineticText';
import { SpatialWebGLScene } from '@/components/spatial/SpatialWebGLScene';
import { InteractiveMedia } from '@/components/spatial/InteractiveMedia';
import { getPublicUrl } from '@/lib/projects/mediaManifest';
import { useCursor } from '@/components/spatial/CursorSystem';

export const Hero: React.FC = () => {
  const { setCursorState, resetCursorState } = useCursor();
  const orbitDesktop = getPublicUrl('orbit-finance', 'desktop.webp');

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col justify-center overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-20 bg-black text-white">
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Column: Hero Eyebrow, Controlled Headline, Body, CTAs */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-cyan-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold tracking-widest uppercase">SNOW</span>
            <span className="text-neutral-500">{"//"}</span>
            <span className="text-neutral-300 tracking-wider">EDITORIAL TECHNOLOGY STUDIO</span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <KineticText variant="velocity" className="text-[clamp(2.25rem,5.5vw,4.75rem)] font-black tracking-tighter uppercase leading-[0.95] text-white">
              BUILD DIGITAL
            </KineticText>
            <KineticText variant="velocity" className="text-[clamp(2.25rem,5.5vw,4.75rem)] font-black tracking-tighter uppercase leading-[0.95] text-cyan-400">
              EXPERIENCES
            </KineticText>
            <KineticText variant="velocity" className="text-[clamp(2.25rem,5.5vw,4.75rem)] font-black tracking-tighter uppercase leading-[0.95] text-neutral-400">
              THAT MOVE.
            </KineticText>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 max-w-xl leading-relaxed font-light">
            Snow engineers spatial Web application platforms, high-throughput software architectures, custom AI systems, and bespoke digital infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/request"
              onMouseEnter={() => setCursorState('MAGNETIC', 'START')}
              onMouseLeave={resetCursorState}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-cyan-400 text-black font-mono font-bold text-xs sm:text-sm tracking-wider hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link
              href="/work"
              onMouseEnter={() => setCursorState('LINK')}
              onMouseLeave={resetCursorState}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-mono text-xs sm:text-sm hover:bg-white/10 transition-all"
            >
              EXPLORE WORK
            </Link>
          </div>

          {/* System Footer Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] sm:text-xs text-neutral-400">
            <div className="flex items-center gap-2.5">
              <span className="text-cyan-400 font-semibold">SNOW // SYSTEM 01</span>
              <span>•</span>
              <span>GLOBAL DIGITAL LAB</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Terminal size={14} />
              <span>HIGH-THROUGHPUT PERFORMANCE ENGINE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Independent Dedicated Spatial Block (3D Instrument + Digital Product Showcase) */}
        <div className="lg:col-span-5 space-y-6">

          {/* 3D Spatial Instrument - Dedicated Card Block */}
          <div className="relative rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-4 backdrop-blur-md overflow-hidden shadow-2xl shadow-cyan-950/30">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Box size={13} />
                <span>SPATIAL INSTRUMENT • MODE: HOME</span>
              </div>
              <span className="text-neutral-500">[INTERACTIVE 3D]</span>
            </div>

            <div className="w-full h-[240px] sm:h-[280px]">
              <SpatialWebGLScene />
            </div>
          </div>

          {/* Digital Interface Showcase */}
          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-950/40">
            <InteractiveMedia
              src={orbitDesktop}
              alt="Orbit Finance Spatial Interface"
              aspectRatio="aspect-[16/10]"
              caption="ORBIT FINANCE / SPATIAL CAPITAL DASHBOARD"
              cursorLabel="INSPECT"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
