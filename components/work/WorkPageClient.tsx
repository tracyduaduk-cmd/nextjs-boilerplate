"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ProjectRecord, ProjectCategoryFilter } from "@/lib/projects/types";
import { InteractiveProjectExplorer } from "./InteractiveProjectExplorer";
import { ProjectFilter } from "./ProjectFilter";
import { ProjectMediaDisplay } from "./ProjectMediaDisplay";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { HoverScale } from "@/components/spatial/HoverScale";

interface WorkPageClientProps {
  initialProjects: ProjectRecord[];
}

const CATEGORIES: ProjectCategoryFilter[] = [
  "All",
  "E-commerce",
  "Web App",
  "Dashboard",
  "AI",
  "Business Software",
  "Website",
  "Platform",
  "Digital Support",
];

export const WorkPageClient: React.FC<WorkPageClientProps> = ({
  initialProjects,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryFilter>("All");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialProjects.length };
    initialProjects.forEach((proj) => {
      counts[proj.category] = (counts[proj.category] || 0) + 1;
    });
    return counts;
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return initialProjects;
    }
    return initialProjects.filter((p) => p.category === activeCategory);
  }, [initialProjects, activeCategory]);

  return (
    <div className="space-y-16">
      {/* 1. Interactive Showcase Explorer */}
      <div>
        <InteractiveProjectExplorer projects={initialProjects} />
      </div>

      {/* 2. Filter Bar */}
      <div className="border-t border-white/10 pt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Project Archive & Systems Index
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Filter by capability domain or inspect all engineered projects
            </p>
          </div>
        </div>

        <div className="mt-4">
          <ProjectFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            counts={categoryCounts}
          />
        </div>
      </div>

      {/* 3. Project Archive Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-12 text-center">
          <p className="text-slate-400 font-mono text-sm">
            No projects found in category &quot;{activeCategory}&quot;.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className="mt-4 rounded-lg bg-sky-500/20 px-4 py-2 text-xs font-mono text-sky-300 hover:bg-sky-500/30"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            const primaryMedia =
              project.media?.find((m) => m.media_type === "screenshot" || m.media_type === "image") ||
              project.media?.[0];

            return (
              <Reveal key={project.id} delay={idx * 50}>
                <Tilt maxRotation={5} scaleOnHover={1.01} className="h-full">
                  <div className="group relative flex h-full flex-col justify-between rounded-xl border border-white/10 bg-slate-900/50 p-6 transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-900/80 hover:shadow-2xl">
                    <div className="space-y-4">
                      {/* Media Thumbnail */}
                      {primaryMedia && (
                        <div className="relative overflow-hidden rounded-lg">
                          <ProjectMediaDisplay
                            media={primaryMedia}
                            aspectRatio="wide"
                          />
                        </div>
                      )}

                      {/* Meta & Title */}
                      <div className="space-y-1 pt-2">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="text-sky-400 font-semibold">{project.category}</span>
                          <span>{project.year || 2026}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-slate-500">
                          {project.client_name || "Snow Concept Lab"}
                        </p>
                      </div>

                      {/* Summary */}
                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                        {project.summary}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[11px] font-mono text-slate-400"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-[11px] font-mono text-slate-500 self-center">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer Action Link */}
                    <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
                      <HoverScale scale={1.02}>
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-sky-400 group-hover:text-sky-300"
                        >
                          View Case Study
                          <svg
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </HoverScale>

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-slate-400 hover:text-white"
                        >
                          Live Link ↗
                        </a>
                      )}
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
};
