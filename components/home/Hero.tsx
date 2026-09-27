'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Terminal, Layers } from 'lucide-react';
import { KineticText } from '@/components/spatial/KineticText';
import { SpatialWebGLScene } from '@/components/spatial/SpatialWebGLScene';
import { InteractiveMedia } from '@/components/spatial/InteractiveMedia';
import { getPublicUrl } from '@/lib/projects/mediaManifest';
import { useCursor } from '@/components/spatial/CursorSystem';

export const Hero: React.FC = () => {
  const { setCursorState, resetCursorState } = useCursor();
  const orbitDesktop = getPublicUrl('orbit-finance', 'desktop.webp');

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-20 bg-black text-white">
      {/* Background WebGL Spatial Scene */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <SpatialWebGLScene />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Kinetic Typography & Hero Statement */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold tracking-widest uppercase">SNOW</span>
            <span className="text-neutral-500">//</span>
            <span className="text-neutral-300 tracking-wider">EDITORIAL TECHNOLOGY STUDIO</span>
          </div>

          <div className="space-y-2">
            <KineticText variant="velocity" className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter uppercase leading-[0.9] text-white">
              BUILD DIGITAL
            </KineticText>
            <KineticText variant="velocity" className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter uppercase leading-[0.9] text-cyan-400">
              EXPERIENCES
            </KineticText>
            <KineticText variant="velocity" className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter uppercase leading-[0.9] text-neutral-400">
              THAT MOVE.
            </KineticText>
          </div>

          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed font-light">
            Snow engineers spatial Web application platforms, high-throughput software architectures, custom AI systems, and bespoke digital infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/request"
              onMouseEnter={() => setCursorState('MAGNETIC', 'START')}
              onMouseLeave={resetCursorState}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-black font-mono font-bold text-sm tracking-wider hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link
              href="/work"
              onMouseEnter={() => setCursorState('LINK')}
              onMouseLeave={resetCursorState}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-mono text-sm hover:bg-white/10 transition-all"
            >
              EXPLORE WORK
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400">SNOW // SYSTEM 01</span>
              <span>•</span>
              <span>GLOBAL DIGITAL LAB</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Terminal size={14} />
              <span>SUB-100MS PERFORMANCE ENGINE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Spatial Media Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-950/40">
            <InteractiveMedia
              src={orbitDesktop}
              alt="Orbit Finance Spatial Interface"
              aspectRatio="aspect-[4/3]"
              caption="ORBIT FINANCE / SPATIAL CAPITAL DASHBOARD"
              cursorLabel="INSPECT"
            />
          </div>

          {/* Floating Glass Detail Badge */}
          <div className="absolute -bottom-6 -left-6 z-20 hidden sm:block p-4 rounded-xl border border-white/20 bg-black/80 backdrop-blur-2xl shadow-2xl max-w-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-400/20 text-cyan-400">
                <Layers size={18} />
              </div>
              <div>
                <p className="font-mono text-xs text-cyan-400 font-bold">SPATIAL PRIMITIVES</p>
                <p className="font-sans text-xs text-white">WebGL + CSS 3D Layering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
