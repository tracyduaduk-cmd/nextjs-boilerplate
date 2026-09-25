"use client";

import React from "react";

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Project Categories Filter">
      <button
        type="button"
        onClick={() => onSelectCategory("All")}
        className={`px-4 py-2 rounded-xl text-xs font-mono transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
          activeCategory === "All"
            ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20"
            : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        }`}
      >
        All Systems ({categories.length})
      </button>

      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              isActive
                ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
