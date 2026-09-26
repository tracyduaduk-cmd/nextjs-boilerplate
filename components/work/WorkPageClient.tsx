"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WorkHero } from "./WorkHero";
import { ProjectExplorer } from "./ProjectExplorer";
import { ProjectFilter } from "./ProjectFilter";
import { WebsitePreview } from "./WebsitePreview";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ProjectWithMedia } from "@/lib/projects/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Button } from "@/components/ui/Button";

interface WorkPageClientProps {
  projects: ProjectWithMedia[];
}

export const WorkPageClient: React.FC<WorkPageClientProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <Header />

      <main id="main-content" className="flex-1">
        <WorkHero />

        <ProjectExplorer projects={projects} />

        <section className="py-16 md:py-24 bg-slate-950 border-b border-slate-900">
          <Container>
            <Reveal direction="up" duration={0.6}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
                    02 / FULL ARCHIVE
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 font-sans">
                    All Systems & Products
                  </h2>
                </div>

                <ProjectFilter
                  categories={categories}
                  activeCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredProjects.map((project, idx) => (
                <Reveal key={project.id} direction="up" delay={idx * 0.05} duration={0.6}>
                  <div className="flex flex-col space-y-4">
                    <WebsitePreview project={project} />
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <h3 className="text-xl font-bold text-slate-100 hover:text-sky-400 transition-colors">
                          <Link href={`/work/${project.slug}`}>{project.title}</Link>
                        </h3>
                        <p className="text-xs font-mono text-slate-400 mt-1">
                          {project.category} • {project.year || "2026"}
                        </p>
                      </div>

                      <Link
                        href={`/work/${project.slug}`}
                        className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-sky-400 transition-colors shrink-0"
                      >
                        Case Study →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24 bg-slate-950 border-b border-slate-900">
          <Container>
            <Reveal direction="up" duration={0.6}>
              <div className="max-w-3xl mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
                  03 / SYSTEM EVOLUTION
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 font-sans">
                  Legacy Modernization & Optimization
                </h2>
                <p className="mt-3 text-slate-400 text-base leading-relaxed">
                  Compare legacy storefront presentation against Snow’s high-performance spatial interface architecture. Drag the divider to explore the transformation.
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2} duration={0.8}>
              <BeforeAfterSlider
                beforeImage="https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/aurora-commerce/desktop.webp"
                afterImage="https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/aurora-commerce/hero.webp"
                beforeLabel="Legacy Storefront (Slow & Generic)"
                afterLabel="Snow Engineered Architecture"
              />
            </Reveal>
          </Container>
        </section>

        <section className="py-20 md:py-28 bg-gradient-to-b from-slate-950 to-slate-900/80">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6 bg-slate-900/80 border border-slate-800 p-8 sm:p-14 rounded-3xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
                READY TO BUILD?
              </span>

              <h2 className="text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight font-sans">
                Have something similar to build or repair?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Start an interactive service request or get an immediate technical quote for your project with our Phase 4 Diagnostic system.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button href="/request" variant="primary" size="lg">
                  Request an Estimate
                </Button>
                <Button href="/#services" variant="secondary" size="lg">
                  Explore Services Ecosystem
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
};
