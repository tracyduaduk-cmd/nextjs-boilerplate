"use client";

import React, { useState, useMemo } from "react";
import { ProjectWithMedia } from "@/lib/projects/types";
import { Container } from "@/components/ui/Container";
import { ProjectFilter } from "@/components/work/ProjectFilter";
import { ProjectCompositionMapper } from "@/components/work/ProjectCompositionVariants";

interface ProjectExplorerProps {
  projects: ProjectWithMedia[];
}

const CATEGORY_MATCHES: Record<string, string[]> = {
  "Web design": ["Design & Spatial", "E-Commerce"],
  "Digital products": ["E-Commerce", "Enterprise Portal", "Fintech"],
  "Web apps": ["Web App", "Enterprise Portal", "Fintech"],
  "AI / automation": ["AI & Intelligence"],
  "UI / UX": ["Healthcare", "Healthcare Systems Study", "Design & Spatial"],
  Experimental: ["Fintech", "AI & Intelligence", "Design & Spatial"],
};

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(() => ["Web design", "Digital products", "Web apps", "AI / automation", "UI / UX", "Experimental"], []);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => CATEGORY_MATCHES[activeCategory]?.includes(p.category));
  }, [projects, activeCategory]);

  return (
    <section className="py-16 md:py-24 bg-slate-950 min-h-screen">
      <Container>
        {/* Category Selector Bar */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-slate-900">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-1">
              EXPLORE THE FIELD
            </span>
            <h2 className="text-xl font-bold text-slate-200 font-sans">
              Projects, prototypes, and interface studies
            </h2>
          </div>

          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Asymmetric Spatial Field */}
        <div className="space-y-12 sm:space-y-16">
          {filteredProjects.map((project) => (
            <ProjectCompositionMapper key={project.id} project={project} />
          ))}

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800">
              <p className="text-slate-400 font-mono text-sm">
                No system studies found under category &quot;{activeCategory}&quot;.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-semibold"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
