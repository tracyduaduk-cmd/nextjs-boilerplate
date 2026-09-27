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
