"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Cloud, Globe2, LockKeyhole, Smartphone, Gauge, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { SystemBadge } from "@/components/spatial/SystemBadge";

const capabilities = [
  {
    code: "01",
    title: "Website Care",
    slug: "website-care",
    icon: Globe2,
    what: "Keep websites, CMS installs, portals, and forms healthy after launch.",
    why: "Browser, dependency, and content changes can quietly break a working site.",
    next: "Request website coverage",
    color: "emerald",
  },
  {
    code: "02",
    title: "App Care",
    slug: "app-care",
    icon: Smartphone,
    what: "Maintain web apps, mobile products, SaaS backends, and internal tools.",
    why: "Runtime updates and API drift need an owner before they become incidents.",
    next: "Request application coverage",
    color: "sky",
  },
  {
    code: "03",
    title: "Security Care",
    slug: "security-care",
    icon: LockKeyhole,
    what: "Harden access, dependencies, certificates, headers, and recovery paths.",
    why: "Security posture changes continuously even when product code does not.",
    next: "Request security coverage",
    color: "teal",
  },
  {
    code: "04",
    title: "Performance Care",
    slug: "performance-care",
    icon: Gauge,
    what: "Investigate speed, Core Web Vitals, payloads, caching, and slow queries.",
    why: "Performance loss is usually cumulative and visible before it is diagnosed.",
    next: "Request performance coverage",
    color: "indigo",
  },
  {
    code: "05",
    title: "Infrastructure Care",
    slug: "infrastructure-care",
    icon: Cloud,
    what: "Stabilize deployments, hosting environments, databases, and monitoring.",
    why: "Operational failures need a clear path from signal to recovery.",
    next: "Request infrastructure coverage",
    color: "purple",
  },
  {
    code: "06",
    title: "Ongoing Development",
    slug: "ongoing-development",
    icon: Wrench,
    what: "Pair routine maintenance with small improvements and technical planning.",
    why: "The best systems are maintained deliberately instead of rebuilt reactively.",
    next: "Request an ongoing partnership",
    color: "cyan",
  },
] as const;

const colorClasses: Record<(typeof capabilities)[number]["color"], string> = {
  emerald: "border-emerald-500/30 text-emerald-300",
  sky: "border-sky-500/30 text-sky-300",
  teal: "border-teal-500/30 text-teal-300",
  indigo: "border-indigo-500/30 text-indigo-300",
  purple: "border-purple-500/30 text-purple-300",
  cyan: "border-cyan-500/30 text-cyan-300",
};

export function CareCapabilities() {
  return (
    <section id="care-capabilities" className="border-b border-slate-800/80 bg-slate-950 py-16 sm:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <SystemBadge variant="emerald" pulse>WHAT SNOW CARE DOES</SystemBadge>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">Operational attention, shaped around the system.</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">Choose the real coverage area that matches the signal you are seeing. Each path keeps the context intact when it moves into Snow&apos;s request flow.</p>
          </div>
          <Link href="#care-problem-matrix" className="inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-300 hover:text-white">Jump to incident routing <ArrowUpRight size={14} /></Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/30">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Reveal key={capability.slug} direction="up" delay={index * 35}>
                <article className="grid gap-4 border-b border-slate-800/80 p-5 last:border-b-0 sm:grid-cols-[auto_1.1fr_1.2fr_1.2fr_auto] sm:items-center sm:p-6">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-slate-950 ${colorClasses[capability.color]}`}><Icon size={18} /></div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">CARE / {capability.code}</p>
                    <h3 className="mt-1 text-lg font-bold text-white">{capability.title}</h3>
                  </div>
                  <div><p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">What</p><p className="mt-1 text-sm leading-relaxed text-slate-300">{capability.what}</p></div>
                  <div><p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Why</p><p className="mt-1 text-sm leading-relaxed text-slate-400">{capability.why}</p></div>
                  <Link href={`/request?service=snow-care&category=${capability.slug}`} className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"><CheckCircle2 size={14} />Next action</Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
