"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectRecord } from "@/lib/projects/types";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { Tilt } from "@/components/spatial/Tilt";
import { DepthLayer } from "@/components/spatial/DepthLayer";
import { PointerGlow } from "@/components/spatial/PointerGlow";
import { Reveal } from "@/components/spatial/Reveal";
import { HoverScale } from "@/components/spatial/HoverScale";

interface InteractiveProjectExplorerProps {
  projects: ProjectRecord[];
}

export const InteractiveProjectExplorer: React.FC<InteractiveProjectExplorerProps> = ({
  projects,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return null;
  }

  const activeProject = projects[activeIndex];
  const totalProjects = projects.length;

  const primaryMedia =
    activeProject.media?.find((m) => m.media_type === "screenshot" || m.media_type === "image") ||
    activeProject.media?.[0];

  const previewUrl =
    primaryMedia?.url ||
    `https://placehold.co/1600x1000/0f172a/38bdf8.png?text=${encodeURIComponent(activeProject.title)}`;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* Explorer Top Controls & Numbering */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
            Interactive Project Explorer
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-400">
            PROJECT <strong className="text-white">0{activeIndex + 1}</strong> / 0{totalProjects}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project in explorer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-900/60 text-slate-300 transition-all hover:border-sky-400 hover:text-sky-300 hover:bg-slate-800"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project in explorer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-900/60 text-slate-300 transition-all hover:border-sky-400 hover:text-sky-300 hover:bg-slate-800"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Explorer Spatial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Interactive 3D Website Frame Preview */}
        <div className="lg:col-span-7">
          <PerspectiveContainer perspective={1200} className="w-full">
            <Tilt maxRotation={8} scaleOnHover={1.01} className="w-full">
              <div className="group relative w-full overflow-hidden rounded-xl border border-white/15 bg-slate-900 shadow-2xl">
                <PointerGlow color="rgba(56, 189, 248, 0.15)" size={500} />

                {/* Browser Bar Frame */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="mx-4 flex-1 max-w-sm rounded-md bg-slate-900/80 border border-white/5 px-3 py-1 text-[11px] font-mono text-slate-400 text-center truncate">
                    snow.engineering/work/{activeProject.slug}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {activeProject.category}
                  </span>
                </div>

                {/* Browser Viewport with Image & Parallax Depth */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <DepthLayer depth={-10} className="h-full w-full">
                    <Image
                      src={previewUrl}
                      alt={activeProject.title}
                      fill
                      unoptimized={previewUrl.startsWith("http") && !previewUrl.includes("supabase")}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </DepthLayer>

                  {/* Scanlines overlay */}
                  <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-30 mix-blend-overlay" />

                  {/* Quick view overlay tag */}
                  <div className="absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs font-mono text-slate-300 backdrop-blur-md">
                    Interactive Frame Preview
                  </div>
                </div>
              </div>
            </Tilt>
          </PerspectiveContainer>
        </div>

        {/* Right Side: Project Story & Metadata */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <Reveal>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                <span>{activeProject.client_name || "Snow Concept Lab"}</span>
                <span>•</span>
                <span>{activeProject.year || 2026}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {activeProject.title}
              </h2>
              <p className="text-sm font-mono text-slate-400">
                Category: <span className="text-slate-200">{activeProject.category}</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              {activeProject.summary}
            </p>
          </Reveal>

          {/* Problem / Solution Snapshot */}
          {activeProject.problem && (
            <Reveal delay={200}>
              <div className="rounded-lg border border-white/10 bg-slate-900/50 p-4 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Core Challenge
                </span>
                <p className="text-xs text-slate-300 line-clamp-3">
                  {activeProject.problem}
                </p>
              </div>
            </Reveal>
          )}

          {/* Technology Badges */}
          {activeProject.technologies && activeProject.technologies.length > 0 && (
            <Reveal delay={300}>
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Action CTAs */}
          <Reveal delay={400}>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <HoverScale scale={1.03}>
                <Link
                  href={`/work/${activeProject.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-xs font-mono font-semibold text-slate-950 transition-colors hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                >
                  View Case Study
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </HoverScale>

              {activeProject.live_url && (
                <a
                  href={activeProject.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/60 px-5 py-3 text-xs font-mono font-semibold text-slate-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  Visit Live Site
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Explorer Dots Navigation Bar */}
      <div className="mt-8 flex items-center justify-center gap-2 border-t border-white/10 pt-6">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Jump to project ${proj.title}`}
            className={`h-2.5 transition-all duration-300 rounded-full ${
              idx === activeIndex
                ? "w-8 bg-sky-400"
                : "w-2.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
