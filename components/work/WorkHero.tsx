'use client';

import React from 'react';
import { KineticText } from '@/components/spatial/KineticText';
import { SpatialInstrument } from '@/components/spatial/SpatialInstrument';

export const WorkHero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-28 bg-[#101b2a] text-white border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(34,211,238,.2),transparent_28%),linear-gradient(120deg,rgba(16,27,42,1),rgba(10,48,59,.85))]" aria-hidden="true" />
      {/* Dedicated Spatial Instrument for Work Index */}
      <div className="absolute top-1/2 right-6 lg:right-20 -translate-y-1/2 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] pointer-events-auto opacity-70 z-0 hidden md:block">
        <SpatialInstrument mode="work-index" badgeLabel="[ WORK ARCHIVE INSTRUMENT ]" scale={1.0} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-6 relative z-10">
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>SNOW / WORK / ORIGINAL STUDIES</span>
        </div>

        <KineticText variant="velocity" className="text-[clamp(2.5rem,6vw,5.25rem)] font-black uppercase tracking-tight leading-[0.95] text-white">
          MADE TO BE USED.
        </KineticText>

        <p className="text-lg sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
          Websites, products, AI interfaces, and spatial experiments designed to make complex things feel clear.
        </p>

        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 font-mono text-xs text-neutral-400">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">THE FIELD</span>
            <span className="text-white font-bold">Digital products</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">MATERIAL</span>
            <span className="text-cyan-400 font-bold">UI / code / motion</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">LABEL</span>
            <span className="text-white font-bold">Concepts + prototypes</span>
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
