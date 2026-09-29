"use client";

import React from "react";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { Reveal } from "@/components/spatial/Reveal";
import { ToolStatus } from "@/components/tools/ToolStatus";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import Link from "next/link";
import { getNavigationGroup } from "@/lib/navigation";
import { usePathname } from "next/navigation";

export interface ToolHeaderProps {
  title: string;
  description: string;
  category?: string;
  badge?: string;
  status?: "engine-ready" | "scanning" | "completed";
  statusMessage?: string;
  isLocalOnly?: boolean;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({
  title,
  description,
  category = "DEVELOPER INSTRUMENT",
  badge,
  status = "engine-ready",
  statusMessage,
  isLocalOnly = true,
}) => {
  const pathname = usePathname();
  const navigationGroup = getNavigationGroup(pathname);
  return (
    <header className="relative pt-20 pb-12 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <PerspectiveContainer perspective={1200} className="max-w-4xl">
          <Reveal direction="up">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {navigationGroup && (
                <div className="w-full flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">
                  <Link href="/tools" className="text-cyan-400 hover:text-cyan-200">Tools</Link>
                  <span aria-hidden="true">→</span>
                  <span>{navigationGroup.label}</span>
                  <span aria-hidden="true">→</span>
                  <span className="text-slate-300">Current instrument</span>
                </div>
              )}
              <SystemBadge variant="cyan">{category}</SystemBadge>
              {badge && <SystemBadge variant="emerald">{badge}</SystemBadge>}
              {isLocalOnly && <SystemBadge variant="neutral">100% Client-Side Isolation</SystemBadge>}
              <ToolStatus status={status} message={statusMessage} />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.08] mb-4">
              {title}
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans">
              {description}
            </p>
          </Reveal>
        </PerspectiveContainer>
      </div>
    </header>
  );
};
