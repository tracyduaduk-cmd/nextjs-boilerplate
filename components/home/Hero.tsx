'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Terminal, Box, Sparkles, Activity } from 'lucide-react';
import { KineticText } from '@/components/spatial/KineticText';
import { SpatialWebGLScene } from '@/components/spatial/SpatialWebGLScene';
import { InteractiveMedia } from '@/components/spatial/InteractiveMedia';
import { ProximitySurface } from '@/components/spatial/ProximitySurface';
import { SystemBadge } from '@/components/spatial/SystemBadge';
import { getPublicUrl } from '@/lib/projects/mediaManifest';
import { useCursor } from '@/components/spatial/CursorSystem';

export const Hero: React.FC = () => {
  const { setCursorState, resetCursorState } = useCursor();
  const orbitDesktop = getPublicUrl('orbit-finance', 'desktop.webp');

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-center overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-20 bg-slate-950 text-white border-b border-slate-800/80">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Column: Hero Eyebrow, Kinetic Oversized Headline, Body, CTAs */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <SystemBadge variant="cyan" pulse>
              SNOW SPATIAL STUDIO
            </SystemBadge>
            <SystemBadge variant="emerald">
              SYSTEM 01 ACTIVE
            </SystemBadge>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <KineticText variant="velocity" className="text-[clamp(2.5rem,6vw,5.25rem)] font-black tracking-tighter uppercase leading-[0.92] text-white">
              BUILD DIGITAL
            </KineticText>
            <KineticText variant="velocity" className="text-[clamp(2.5rem,6vw,5.25rem)] font-black tracking-tighter uppercase leading-[0.92] text-cyan-400">
              SYSTEMS THAT
            </KineticText>
            <KineticText variant="velocity" className="text-[clamp(2.5rem,6vw,5.25rem)] font-black tracking-tighter uppercase leading-[0.92] text-slate-400">
              FEEL ALIVE.
            </KineticText>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-xl leading-relaxed font-light font-sans">
            Snow is an independent technology studio engineering spatial Web applications, high-throughput software architectures, AI agent systems, and bespoke digital infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/request"
              onMouseEnter={() => setCursorState('MAGNETIC', 'INITIATE')}
              onMouseLeave={resetCursorState}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-slate-950 font-mono font-bold text-xs sm:text-sm tracking-wider hover:bg-white transition-all shadow-[0_0_30px_rgba(56,189,248,0.4)] group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link
              href="/tools"
              onMouseEnter={() => setCursorState('TOOL', 'EXPLORE')}
              onMouseLeave={resetCursorState}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 font-mono text-xs sm:text-sm hover:border-cyan-500/80 hover:bg-slate-800 transition-all backdrop-blur-md"
            >
              <Sparkles size={16} className="text-cyan-400" />
              <span>UTILITY CONSOLE</span>
            </Link>
          </div>

          {/* System Status Footer Bar */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] sm:text-xs text-slate-400">
            <div className="flex items-center gap-2.5">
              <span className="text-cyan-400 font-semibold">SNOW // SPATIAL OPERATING SYSTEM</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1.5"><Activity size={12} /> ALL SYSTEMS NOMINAL</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal size={14} className="text-cyan-400" />
              <span>NEW YORK · EVERYWHERE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Spatial Instrument 3D Stage & Interactive Product Frame */}
        <div className="lg:col-span-5 space-y-6">

          {/* 3D Spatial Instrument Stage */}
          <ProximitySurface className="p-5 w-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Box size={14} />
                <span>SPATIAL INSTRUMENT • MODE: HOME</span>
              </div>
              <span className="text-emerald-400 font-bold">[INTERACTIVE WEBGL]</span>
            </div>

            <div
              className="w-full h-[240px] sm:h-[280px] cursor-grab active:cursor-grabbing"
              onMouseEnter={() => setCursorState("DRAG", "ROTATE 3D")}
              onMouseLeave={resetCursorState}
            >
              <SpatialWebGLScene />
            </div>
          </ProximitySurface>

          {/* Digital Interface Showcase */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl">
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
