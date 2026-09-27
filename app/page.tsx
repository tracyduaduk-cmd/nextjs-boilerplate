import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { CapabilityField } from "@/components/home/CapabilityField";
import { WorkShowcaseScene } from "@/components/home/WorkShowcaseScene";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { SnowCareScene } from "@/components/home/SnowCareScene";
import { SystemCtaScene } from "@/components/home/SystemCtaScene";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-cyan-400 selection:text-black">
      <Header />
      <main id="main-content" className="flex-1">
        {/* SCENE 01: INTRO & KINETIC HERO */}
        <Hero />

        {/* SCENE 02: CAPABILITY MATRIX & SPATIAL FIELD */}
        <CapabilityField />

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
