'use client';

import React from 'react';
import { KineticText } from '@/components/spatial/KineticText';
import { SpatialInstrument } from '@/components/spatial/SpatialInstrument';

export const WorkHero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-black text-white border-b border-white/10 overflow-hidden">
      {/* Dedicated Spatial Instrument for Work Index */}
      <div className="absolute top-1/2 right-6 lg:right-20 -translate-y-1/2 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] pointer-events-auto opacity-70 z-0 hidden md:block">
        <SpatialInstrument mode="work-index" badgeLabel="[ WORK ARCHIVE INSTRUMENT ]" scale={1.0} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-6 relative z-10">
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>SPATIAL DIGITAL LABORATORY // SELECTED PRODUCTIONS</span>
        </div>

        <KineticText variant="velocity" className="text-[clamp(2.5rem,6vw,5.25rem)] font-black uppercase tracking-tight leading-[0.95] text-white">
          SELECTED WORK.
        </KineticText>

        <p className="text-lg sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
          Digital products, spatial Web platforms, high-throughput applications, and AI systems built for demanding operational environments.
        </p>

        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 font-mono text-xs text-neutral-400">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">ARCHIVE</span>
            <span className="text-white font-bold">8 System Studies</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">MEDIA ENGINE</span>
            <span className="text-cyan-400 font-bold">Supabase snow-media</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">GRAPHICS ENGINE</span>
            <span className="text-white font-bold">WebGL + Three.js</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">TARGET LATENCY</span>
            <span className="text-cyan-400 font-bold">&lt; 100ms Interaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};
