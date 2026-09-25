"use client";

import React from "react";
import { ProjectCategoryFilter } from "@/lib/projects/types";

interface ProjectFilterProps {
  categories: ProjectCategoryFilter[];
  activeCategory: ProjectCategoryFilter;
  onSelectCategory: (category: ProjectCategoryFilter) => void;
  counts?: Record<string, number>;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <nav
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-2 py-4"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        const count = counts && counts[cat] !== undefined ? counts[cat] : null;

        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono transition-all duration-300 ${
              isActive
                ? "border border-sky-400/50 bg-sky-500/10 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                : "border border-white/10 bg-slate-900/50 text-slate-400 hover:border-white/20 hover:bg-slate-800/60 hover:text-slate-200"
            }`}
          >
            <span>{cat}</span>
            {count !== null && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  isActive
                    ? "bg-sky-400/20 text-sky-300"
                    : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
