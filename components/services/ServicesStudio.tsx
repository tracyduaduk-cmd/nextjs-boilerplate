'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { ServiceRecord } from '@/lib/services/types';
import { CAPABILITY_FAMILIES } from '@/lib/services/capabilityFamilies';
import { getPublicUrl } from '@/lib/projects/mediaManifest';

const FAMILY_VISUALS: Record<string, { image: string; eyebrow: string; tone: string }> = {
  WEB: { image: getPublicUrl('aurora-commerce', 'hero.webp'), eyebrow: 'WEB / DIGITAL PRODUCTS', tone: 'from-cyan-400/30' },
  'APPS & SOFTWARE': { image: getPublicUrl('pulse-health', 'desktop.webp'), eyebrow: 'MOBILE / SOFTWARE', tone: 'from-violet-400/30' },
  AI: { image: getPublicUrl('nova-ai-assistant', 'hero.webp'), eyebrow: 'AI / AUTOMATION', tone: 'from-fuchsia-400/30' },
  INFRASTRUCTURE: { image: getPublicUrl('atlas-business-portal', 'desktop.webp'), eyebrow: 'SYSTEMS / INFRASTRUCTURE', tone: 'from-emerald-400/30' },
  'SECURITY & RECOVERY': { image: getPublicUrl('orbit-finance', 'desktop.webp'), eyebrow: 'SECURITY / RECOVERY', tone: 'from-amber-400/30' },
  'DIGITAL GROWTH': { image: getPublicUrl('studio-landing', 'hero.webp'), eyebrow: 'GROWTH / PERFORMANCE', tone: 'from-rose-400/30' },
  'DEVICES & HARDWARE': { image: getPublicUrl('orbit-finance', 'desktop.webp'), eyebrow: 'DEVICES / HARDWARE', tone: 'from-orange-400/30' },
  'BUSINESS IT': { image: getPublicUrl('atlas-business-portal', 'hero.webp'), eyebrow: 'BUSINESS / SUPPORT', tone: 'from-sky-400/30' },
};

interface ServicesStudioProps { services: ServiceRecord[]; }

export function ServicesStudio({ services }: ServicesStudioProps) {
  const [activeFamily, setActiveFamily] = useState('ALL');
  const visibleServices = useMemo(
    () => activeFamily === 'ALL' ? services : services.filter((service) => service.capability_family === activeFamily),
    [activeFamily, services],
  );
  const featured = visibleServices[0];
  const rest = visibleServices.slice(1);
  const visual = featured ? (FAMILY_VISUALS[featured.capability_family] || FAMILY_VISUALS.WEB) : FAMILY_VISUALS.WEB;

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-slate-950">
      <section className="relative overflow-hidden bg-[#101b2a] px-6 pb-20 pt-32 text-white sm:px-10 lg:px-16 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(34,211,238,.2),transparent_32%),linear-gradient(120deg,#101b2a_0%,#0d2633_52%,#143d45_100%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.2em] text-cyan-200">
              <Sparkles size={13} /> Snow studio / services
            </div>
            <h1 className="max-w-4xl text-[clamp(3.2rem,8vw,7.7rem)] font-black leading-[.86] tracking-[-.07em]">Built for the<br /><span className="text-cyan-300">next interface.</span></h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">Snow designs, builds, and looks after digital products that need to feel as considered as they are capable.</p>
          </div>
          <div className="relative hidden min-h-[300px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 lg:block">
            <Image src={getPublicUrl('nova-ai-assistant', 'hero.webp')} alt="Snow AI interface concept" fill priority className="object-cover opacity-80 mix-blend-screen" sizes="40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101b2a] via-transparent to-cyan-300/10" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[.18em] text-cyan-200"><span>Design + engineering</span><span>01 / 08</span></div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f5f4ef]/90 px-6 py-4 backdrop-blur-xl sm:px-10 lg:px-16" aria-label="Service categories">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto scrollbar-none" role="tablist">
          <button role="tab" aria-selected={activeFamily === 'ALL'} onClick={() => setActiveFamily('ALL')} className={`shrink-0 rounded-full px-4 py-2 font-mono text-xs transition ${activeFamily === 'ALL' ? 'bg-slate-950 text-white' : 'border border-slate-300 text-slate-600 hover:border-slate-950 hover:text-slate-950'}`}>All capabilities</button>
          {CAPABILITY_FAMILIES.map((family) => <button key={family.id} role="tab" aria-selected={activeFamily === family.id} onClick={() => setActiveFamily(family.id)} className={`shrink-0 rounded-full px-4 py-2 font-mono text-xs transition ${activeFamily === family.id ? 'bg-slate-950 text-white' : 'border border-slate-300 text-slate-600 hover:border-slate-950 hover:text-slate-950'}`}>{family.badge}</button>)}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        {featured && <article className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl sm:min-h-[460px]">
            <Image src={visual.image} alt={`${featured.name} visual`} fill className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1024px) 100vw, 55vw" />
            <div className={`absolute inset-0 bg-gradient-to-tr ${visual.tone} via-transparent to-slate-950/70`} />
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[.18em] text-white backdrop-blur">{visual.eyebrow}</div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"><span className="max-w-[14rem] text-2xl font-bold leading-tight">A clearer way to move from idea to product.</span><span className="font-mono text-xs text-cyan-200">FEATURED</span></div>
          </div>
          <div className="lg:pl-8">
            <p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-700">{featured.category} / {featured.capability_family}</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-6xl">{featured.name}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{featured.short_description}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">{featured.capabilities.slice(0, 6).map((capability) => <li key={capability} className="flex items-start gap-2 text-sm text-slate-700"><Check size={16} className="mt-0.5 shrink-0 text-cyan-700" />{capability}</li>)}</ul>
            <Link href={`/request?service=${encodeURIComponent(featured.name)}`} className="mt-9 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-mono text-xs font-bold text-white transition hover:bg-cyan-700">Talk about this work <ArrowUpRight size={15} /></Link>
          </div>
        </article>}

        <div className="mt-24 grid gap-5 md:grid-cols-2">
          {rest.map((service, index) => { const itemVisual = FAMILY_VISUALS[service.capability_family] || FAMILY_VISUALS.WEB; return <article key={service.id} className={`group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white ${index % 3 === 1 ? 'md:translate-y-10' : ''}`}>
            <div className="relative h-52 overflow-hidden bg-slate-900"><Image src={itemVisual.image} alt={`${service.name} concept`} fill className="object-cover opacity-85 transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-transparent" /><span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[.16em] text-cyan-200">{itemVisual.eyebrow}</span></div>
            <div className="p-6 sm:p-8"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-slate-400">0{index + 2} / {service.category}</p><h3 className="mt-3 text-2xl font-bold tracking-tight">{service.name}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{service.short_description}</p><div className="mt-5 flex flex-wrap gap-2">{service.capabilities.slice(0, 3).map((cap) => <span key={cap} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600">{cap}</span>)}</div><Link href={`/request?service=${encodeURIComponent(service.name)}`} className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-700 hover:text-slate-950">Explore this capability <ArrowUpRight size={14} /></Link></div>
          </article>; })}
        </div>
      </main>

      <section className="bg-cyan-300 px-6 py-20 sm:px-10 lg:px-16"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-slate-800">A good next step</p><h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-.05em] sm:text-6xl">Bring us the problem behind the brief.</h2></div><Link href="/request" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-mono text-xs font-bold text-white">Start a project <ArrowUpRight size={15} /></Link></div></section>
    </div>
  );
}
