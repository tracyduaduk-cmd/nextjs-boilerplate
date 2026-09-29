import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { CareHero } from "@/components/care/CareHero";
import { CareCapabilities } from "@/components/care/CareCapabilities";
import { CareProblemMatrix } from "@/components/care/CareProblemMatrix";
import { CareProcess } from "@/components/care/CareProcess";
import { CareLevels } from "@/components/care/CareLevels";
import { CareFAQ } from "@/components/care/CareFAQ";
import { CareCTA } from "@/components/care/CareCTA";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata({ title: "Snow Care | Technical Maintenance, Security & Support", description: "Snow Care provides ongoing technical attention, bug fixes, security updates, performance monitoring, and system optimization for websites, applications, and digital systems.", path: "/care" });
export default function CarePage() { return <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950"><Header /><main id="main-content"><section className="border-b border-slate-800/80 bg-slate-950 pt-28 pb-6 sm:pt-36 sm:pb-8"><Container><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><SystemBadge variant="emerald" pulse>CARE / OVERVIEW</SystemBadge><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">Protection, performance, maintenance, and recovery in one operational layer.</p></div><nav aria-label="Care sections" className="flex flex-wrap gap-2 font-mono text-xs"><a href="#care-capabilities" className="rounded-full border border-slate-800 px-3 py-1.5 text-slate-400 hover:border-emerald-500/60 hover:text-emerald-300">Coverage</a><a href="#care-problem-matrix" className="rounded-full border border-slate-800 px-3 py-1.5 text-slate-400 hover:border-emerald-500/60 hover:text-emerald-300">Incident routing</a><a href="#care-plans" className="rounded-full border border-slate-800 px-3 py-1.5 text-slate-400 hover:border-emerald-500/60 hover:text-emerald-300">Care options</a><a href="#care-process" className="rounded-full border border-slate-800 px-3 py-1.5 text-slate-400 hover:border-emerald-500/60 hover:text-emerald-300">How it works</a></nav></div></Container></section><CareHero /><CareCapabilities /><CareProblemMatrix /><CareProcess /><CareLevels /><CareFAQ /><CareCTA /></main><Footer /></div>; }
