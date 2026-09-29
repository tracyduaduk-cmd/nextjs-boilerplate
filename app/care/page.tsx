import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CareHero } from "@/components/care/CareHero";
import { CarePhilosophy } from "@/components/care/CarePhilosophy";
import { CareAreas } from "@/components/care/CareAreas";
import { CareProblemMatrix } from "@/components/care/CareProblemMatrix";
import { CareLevels } from "@/components/care/CareLevels";
import { CareProcess } from "@/components/care/CareProcess";
import { CareFAQ } from "@/components/care/CareFAQ";
import { CareCTA } from "@/components/care/CareCTA";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SystemBadge } from "@/components/spatial/SystemBadge";

export const metadata: Metadata = {
  title: "Snow Care | Technical Maintenance, Security & Support",
  description:
    "Snow Care provides ongoing technical attention, bug fixes, security updates, performance monitoring, and system optimization for websites, applications, and digital systems.",
  openGraph: {
    title: "Snow Care | Ongoing Technical Maintenance & Support",
    description:
      "Keep websites, web applications, and digital business systems monitored, updated, and continuously improving after launch.",
    url: "https://snow.tech/care",
  },
};

export default function CarePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      <Header />
      <main id="main-content">
        <section className="border-b border-slate-800/80 bg-slate-950 pt-28 pb-8 sm:pt-36 sm:pb-10">
          <Container>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SystemBadge variant="emerald" pulse>CARE / CONTINUOUS OPERATIONS</SystemBadge>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">Snow Care is the ongoing operations layer: protect the system, improve its performance, and keep the next action visible.</p>
              </div>
              <nav aria-label="Care capabilities" className="flex flex-wrap gap-2 text-xs font-mono">
                {["Protection", "Performance", "Maintenance", "Recovery"].map((label) => <a key={label} href="#care-categories" className="rounded-full border border-slate-800 px-3 py-1.5 text-slate-400 transition hover:border-emerald-500/60 hover:text-emerald-300">{label}</a>)}
                <Link href="/request?care=snow-care" className="rounded-full border border-emerald-500/60 bg-emerald-400 px-3 py-1.5 font-bold text-slate-950">Start Care ↗</Link>
              </nav>
            </div>
          </Container>
        </section>
        <CareHero />
        <CarePhilosophy />
        <CareAreas />
        <CareProblemMatrix />
        <CareLevels />
        <CareProcess />
        <CareFAQ />
        <CareCTA />
      </main>
      <Footer />
    </div>
  );
}
