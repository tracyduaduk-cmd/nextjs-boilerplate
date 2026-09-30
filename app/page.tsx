import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { CapabilityField } from "@/components/home/CapabilityField";
import { WorkShowcaseScene } from "@/components/home/WorkShowcaseScene";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { SnowCareScene } from "@/components/home/SnowCareScene";
import { SystemCtaScene } from "@/components/home/SystemCtaScene";
import { Footer } from "@/components/layout/Footer";
import { VisualSection } from "@/components/ui/VisualSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f6f2] font-sans text-slate-950 selection:bg-cyan-300 selection:text-slate-950">
      <Header />
      <main id="main-content" className="flex-1">
        {/* SCENE 01: INTRO & KINETIC HERO */}
        <Hero />

        {/* SCENE 02: CAPABILITY MATRIX & SPATIAL FIELD */}
        <CapabilityField />

        <VisualSection
          eyebrow="A studio in motion"
          title="Ideas become interfaces people can feel."
          description="We bring art direction, product thinking, and engineering into the same room — then shape the useful details that make a digital experience memorable."
          project="studio-landing"
          role="hero"
          accent="violet"
          href="/work"
          cta="Explore the studies"
        />

        {/* SCENE 03: EDITORIAL WORK SHOWCASE */}
        <WorkShowcaseScene />

        {/* SCENE 04: SERVICES UNIVERSE */}
        <section id="services">
          <ServiceExplorer />
        </section>

        {/* SCENE 05: CONTINUOUS OPERATIONS / SNOW CARE MODE */}
        <SnowCareScene />

        {/* SCENE 06: INITIATE SYSTEM CTA */}
        <SystemCtaScene />
      </main>
      <Footer />
    </div>
  );
}
