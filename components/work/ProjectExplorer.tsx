"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ProjectWithMedia } from "@/lib/projects/types";
import { WebsitePreview } from "./WebsitePreview";
import { Reveal } from "@/components/spatial/Reveal";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { DepthLayer } from "@/components/spatial/DepthLayer";
import { Container } from "@/components/ui/Container";

interface ProjectExplorerProps {
  projects: ProjectWithMedia[];
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const handleNext = useCallback(() => {
    if (!projects || projects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects]);

  const handlePrev = useCallback(() => {
    if (!projects || projects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[activeIndex];

  return (
    <section className="py-16 md:py-24 bg-slate-950 border-b border-slate-900 overflow-hidden relative">
      <Container className="relative z-10">
        <Reveal direction="up" duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
                01 / SPATIAL SHOWCASE
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-sans">
                Interactive Systems Explorer
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Project"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-sky-400 font-semibold">{activeIndex + 1}</span> / {projects.length}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Project"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        <PerspectiveContainer
          className="w-full"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const delta = event.changedTouches[0]?.clientX - touchStartX.current;
            if (Math.abs(delta) > 44) (delta < 0 ? handleNext : handlePrev)();
            touchStartX.current = null;
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, x: 32, rotateY: -4, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -32, rotateY: 4, scale: 0.98 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
                >
                  <WebsitePreview project={currentProject} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <DepthLayer depth={10}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                      PROJECT #{currentProject.sort_order.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {currentProject.year || "2026"}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight font-sans">
                    {currentProject.title}
                  </h3>

                  <div className="inline-block px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                    Category: <strong className="text-sky-300 font-normal">{currentProject.category}</strong>
                  </div>

                  <p className="text-base text-slate-300 leading-relaxed font-sans">
                    {currentProject.description || currentProject.summary}
                  </p>
                </div>
              </DepthLayer>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/work/${currentProject.slug}`}
                  className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-sky-500/20 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span>Read Case Study</span>
                  <span>→</span>
                </Link>

                {currentProject.live_url && (
                  <a
                    href={currentProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-mono transition-all inline-flex items-center gap-2"
                  >
                    <span>Visit Live Site</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </PerspectiveContainer>

        <div className="mt-12 pt-8 border-t border-slate-900 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {projects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? "bg-slate-900 border-sky-500 text-slate-100 ring-1 ring-sky-500"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900/60 hover:border-slate-700"
                }`}
              >
                <span className="text-[10px] font-mono block text-slate-500">
                  0{proj.sort_order}
                </span>
                <span className="text-xs font-medium truncate block mt-1 font-sans">
                  {proj.title}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
