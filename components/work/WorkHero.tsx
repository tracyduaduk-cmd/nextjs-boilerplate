"use client";

import React from "react";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";

export const WorkHero: React.FC = () => (
  <section className="relative overflow-hidden border-b border-slate-950/10 bg-[#f7f6f2] pb-14 pt-28 text-slate-950 md:pb-20 md:pt-36">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(34,211,238,.22),transparent_28%),radial-gradient(circle_at_12%_85%,rgba(119,103,255,.12),transparent_26%)]" aria-hidden="true" />
    <div className="absolute right-4 top-1/2 hidden h-[300px] w-[300px] -translate-y-1/2 opacity-70 md:block lg:right-16 lg:h-[380px] lg:w-[380px]"><SpatialInstrument mode="work-index" badgeLabel="SNOW / SPATIAL WORK" scale={1} /></div>
    <div className="relative z-10 mx-auto max-w-7xl space-y-7 px-6 md:px-12 lg:px-20">
      <div className="inline-flex items-center gap-3 rounded-full border border-slate-950/15 bg-white/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[.14em] text-cyan-700"><span className="h-2 w-2 rounded-full bg-cyan-500" />Selected work / original studies</div>
      <h1 className="max-w-4xl text-[clamp(3.2rem,8vw,7.8rem)] font-black uppercase leading-[.86] tracking-[-.07em] text-slate-950">Digital systems<br /><span className="text-gradient">made tangible.</span></h1>
      <div className="grid max-w-3xl gap-6 border-t border-slate-950/15 pt-6 sm:grid-cols-[1.3fr_.7fr] sm:gap-12"><p className="text-lg leading-relaxed text-slate-600 sm:text-xl">Interfaces, products, AI workflows, and spatial experiments designed to make complex things feel clear.</p><p className="font-mono text-[10px] uppercase leading-relaxed tracking-[.16em] text-slate-500">A visual archive of concept projects and interface explorations by Snow.</p></div>
    </div>
  </section>
);
