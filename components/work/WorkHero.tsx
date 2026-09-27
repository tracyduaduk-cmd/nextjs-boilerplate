'use client';

import React from 'react';
import { KineticText } from '@/components/spatial/KineticText';

export const WorkHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-black text-white border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-8 relative z-10">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>SPATIAL DIGITAL LABORATORY // SELECTED PRODUCTIONS</span>
        </div>

        <KineticText variant="velocity" className="text-5xl sm:text-7xl lg:text-[7rem] font-black uppercase tracking-tight leading-[0.9] text-white">
          SELECTED WORK.
        </KineticText>

        <p className="text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
          Digital products, spatial Web platforms, high-throughput applications, and AI systems built for demanding operational environments.
        </p>

        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 font-mono text-xs text-neutral-400">
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
