'use client';

import React from 'react';
import { KineticText } from '@/components/spatial/KineticText';
import { SpatialInstrument } from '@/components/spatial/SpatialInstrument';

export const WorkHero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-28 bg-[#f7f6f2] text-slate-950 border-b border-slate-950/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(34,211,238,.24),transparent_28%),linear-gradient(120deg,rgba(247,246,242,1),rgba(226,248,255,.8))]" aria-hidden="true" />
      {/* Dedicated Spatial Instrument for Work Index */}
      <div className="absolute top-1/2 right-6 lg:right-20 -translate-y-1/2 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] pointer-events-auto opacity-70 z-0 hidden md:block">
        <SpatialInstrument mode="work-index" badgeLabel="SNOW / SPATIAL WORK" scale={1.0} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-6 relative z-10">
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/60 border border-slate-950/15 text-[11px] sm:text-xs font-mono text-cyan-700">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span>SNOW / OUR WORK / ORIGINAL STUDIES</span>
        </div>

        <KineticText variant="velocity" className="text-[clamp(2.5rem,6vw,5.25rem)] font-black uppercase tracking-tight leading-[0.95] text-slate-950">
          MADE TO BE USED.
        </KineticText>

        <p className="text-lg sm:text-xl text-slate-600 font-light max-w-2xl leading-relaxed">
          Websites, products, AI interfaces, and spatial experiments designed to make complex things feel clear.
        </p>

        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-slate-950/15 font-mono text-xs text-slate-500">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">THE FIELD</span>
            <span className="text-slate-950 font-bold">Digital products</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">MATERIAL</span>
            <span className="text-cyan-400 font-bold">UI / code / motion</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">LABEL</span>
            <span className="text-slate-950 font-bold">Concepts + prototypes</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">NEXT</span>
            <span className="text-cyan-400 font-bold">Explore a project</span>
          </div>
        </div>
      </div>
    </section>
  );
};
