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
  const isActive = (category: string) => activeCategory === category;

  return (
    <nav aria-label="Work project categories" className="w-full">
      <div className="border-l-2 border-slate-950/15 pl-4 sm:pl-5">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_0_4px_rgba(14,165,233,0.12)]" />
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-950">
            Work
          </p>
        </div>

        <div className="mt-3 space-y-1" role="list">
          <div role="listitem">
            <button
              type="button"
              onClick={() => onSelectCategory("All")}
              aria-current={isActive("All") ? "page" : undefined}
              className={`flex min-h-11 w-full items-center justify-between rounded-r-xl border-l-2 px-3 py-2 text-left font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2] ${
                isActive("All")
                  ? "border-sky-500 bg-sky-400 text-slate-950 shadow-sm"
                  : "border-transparent text-slate-600 hover:border-slate-950/25 hover:bg-white/70 hover:text-slate-950"
              }`}
            >
              <span>All Projects</span>
              <span aria-hidden="true" className={isActive("All") ? "text-slate-950" : "text-slate-400"}>↗</span>
            </button>
          </div>

          {categories.map((category) => {
            const active = isActive(category);
            return (
              <div key={category} role="listitem" className="pl-4 sm:pl-5">
                <button
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 w-full items-center justify-between rounded-r-xl border-l-2 px-3 py-2 text-left font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2] ${
                    active
                      ? "border-sky-500 bg-sky-400 text-slate-950 shadow-sm"
                      : "border-transparent text-slate-600 hover:border-slate-950/25 hover:bg-white/70 hover:text-slate-950"
                  }`}
                >
                  <span>{category}</span>
                  {active && <span aria-hidden="true">↗</span>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
