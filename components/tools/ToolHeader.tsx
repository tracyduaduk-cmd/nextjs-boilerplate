"use client";

import React from "react";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { Reveal } from "@/components/spatial/Reveal";
import { ToolStatus } from "@/components/tools/ToolStatus";

export interface ToolHeaderProps {
  title: string;
  description: string;
  category?: string;
  badge?: string;
  status?: "engine-ready" | "scanning" | "completed";
  statusMessage?: string;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({
  title,
  description,
  category = "DEVELOPER UTILITY",
  badge,
  status = "engine-ready",
  statusMessage,
}) => {
  return (
    <header className="pt-20 pb-10 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PerspectiveContainer perspective={1200} className="max-w-4xl">
          <Reveal direction="up">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800/80 uppercase">
                {category}
              </span>
              {badge && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60 uppercase">
                  {badge}
                </span>
              )}
              <ToolStatus status={status} message={statusMessage} />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-[1.1] mb-4 font-sans">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-sans">
              {description}
            </p>
          </Reveal>
        </PerspectiveContainer>
      </div>
    </header>
  );
};
