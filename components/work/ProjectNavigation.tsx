"use client";

import React from "react";
import Link from "next/link";
import { ProjectRecord } from "@/lib/projects/types";

interface ProjectNavigationProps {
  currentProject: ProjectRecord;
  projects: ProjectRecord[];
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentProject,
  projects,
}) => {
  const currentIndex = projects.findIndex((p) => p.id === currentProject.id);
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <div className="border-t border-white/10 bg-slate-950/80 pt-12 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Previous Project Link */}
          {prevProject && (
            <Link
              href={`/work/${prevProject.slug}`}
              className="group flex flex-1 flex-col items-start rounded-xl border border-white/10 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-900/80 hover:shadow-lg"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 group-hover:text-sky-400 flex items-center gap-2">
                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Project
              </span>
              <span className="mt-2 text-lg font-semibold text-white group-hover:text-sky-200">
                {prevProject.title}
              </span>
              <span className="mt-1 text-xs text-slate-400">
                {prevProject.category}
              </span>
            </Link>
          )}

          {/* Index Link */}
          <Link
            href="/work"
            className="flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 px-6 py-8 text-xs font-mono uppercase tracking-widest text-slate-300 transition-all duration-300 hover:border-sky-400 hover:text-sky-400 hover:shadow-md"
          >
            All Projects Index ✦
          </Link>

          {/* Next Project Link */}
          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-1 flex-col items-end text-right rounded-xl border border-white/10 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-900/80 hover:shadow-lg"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 group-hover:text-sky-400 flex items-center gap-2">
                Next Project
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="mt-2 text-lg font-semibold text-white group-hover:text-sky-200">
                {nextProject.title}
              </span>
              <span className="mt-1 text-xs text-slate-400">
                {nextProject.category}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
