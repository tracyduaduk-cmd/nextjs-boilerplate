"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ProjectWithMedia } from "@/lib/projects/types";
import { Container } from "@/components/ui/Container";
import { ProjectFilter } from "@/components/work/ProjectFilter";
import { ProjectCompositionMapper } from "@/components/work/ProjectCompositionVariants";

interface ProjectExplorerProps {
  projects: ProjectWithMedia[];
}

export const CATEGORY_MATCHES: Record<string, string[]> = {
  Web: ["Design & Spatial", "E-Commerce"],
  "Digital Products": ["E-Commerce", "Enterprise Portal", "Fintech", "Web App"],
  "UI / UX": ["Healthcare", "Healthcare Systems Study", "Design & Spatial"],
  Mobile: ["Healthcare", "Fintech", "AI & Intelligence"],
  AI: ["AI & Intelligence"],
  SaaS: ["Enterprise Portal", "Fintech"],
  "E-commerce": ["E-Commerce"],
  Experimental: ["Fintech", "AI & Intelligence", "Design & Spatial"],
};

const CATEGORY_SLUGS: Record<string, string> = {
  All: "all",
  ...Object.fromEntries(
    Object.keys(CATEGORY_MATCHES).map((category) => [category, category.toLowerCase().replace(/[\s/]+/g, "-")]),
  ),
};

const CATEGORY_BY_SLUG = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([category, slug]) => [slug, category]),
);

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(() => Object.keys(CATEGORY_MATCHES), []);

  useEffect(() => {
    const categoryFromUrl = new URLSearchParams(window.location.search).get("category");
    const category = categoryFromUrl ? CATEGORY_BY_SLUG[categoryFromUrl.toLowerCase()] : undefined;
    if (!category) return;
    const frame = window.requestAnimationFrame(() => setActiveCategory(category));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    const url = new URL(window.location.href);
    if (category === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", CATEGORY_SLUGS[category]);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => CATEGORY_MATCHES[activeCategory]?.includes(project.category));
  }, [projects, activeCategory]);

  return (
    <section className="work-explorer min-h-screen bg-[#f7f6f2] py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)]">
          <aside className="lg:pt-1">
            <div className="mb-7 border-b border-slate-950 pb-5">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Explore the field
              </span>
              <h2 className="text-xl font-bold leading-tight text-slate-950">
                Projects, prototypes, and interface studies
              </h2>
            </div>
            <ProjectFilter
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={selectCategory}
            />
          </aside>

          <div aria-live="polite" className="min-w-0">
            <div className="mb-8 flex items-center justify-between border-b border-slate-950/20 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <span>{activeCategory === "All" ? "All projects" : activeCategory}</span>
              <span>{filteredProjects.length.toString().padStart(2, "0")} studies</span>
            </div>

            <div className="space-y-12 sm:space-y-16">
              {filteredProjects.map((project) => (
                <ProjectCompositionMapper key={project.id} project={project} />
              ))}

              {filteredProjects.length === 0 && (
                <div className="space-y-4 rounded-2xl border border-slate-950/15 bg-white/50 px-6 py-20 text-center">
                  <p className="font-mono text-sm text-slate-600">
                    No system studies found under category &quot;{activeCategory}&quot;.
                  </p>
                  <button
                    type="button"
                    onClick={() => selectCategory("All")}
                    className="min-h-11 rounded-xl bg-sky-500 px-4 py-2 font-mono text-xs font-semibold text-slate-950 transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
