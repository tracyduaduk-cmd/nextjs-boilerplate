import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CareHero } from "@/components/care/CareHero";
import { CarePhilosophy } from "@/components/care/CarePhilosophy";
import { CareAreas } from "@/components/care/CareAreas";
import { CareLevels } from "@/components/care/CareLevels";
import { CareProcess } from "@/components/care/CareProcess";
import { CareFAQ } from "@/components/care/CareFAQ";
import { CareCTA } from "@/components/care/CareCTA";

export const metadata: Metadata = {
  title: "Snow Care | Technical Maintenance, Security & Monitoring",
  description:
    "Snow Care provides ongoing technical attention, security patching, performance monitoring, and system optimization for websites, web applications, and business IT.",
  openGraph: {
    title: "Snow Care | Ongoing Technology Maintenance & Support",
    description:
      "Keep websites, web applications, and digital business systems monitored, updated, and continuously improving after launch.",
    url: "https://snow.tech/care",
  },
};

export default function CarePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      <Header />
      <main>
        <CareHero />
        <CarePhilosophy />
        <CareAreas />
        <CareLevels />
        <CareProcess />
        <CareFAQ />
        <CareCTA />
      </main>
      <Footer />
    </div>
  );
}
