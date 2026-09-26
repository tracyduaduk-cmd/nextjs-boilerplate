"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { ToolStatus } from "./ToolStatus";

export interface ToolHeroProps {
  badge: string;
  title: string;
  description: string;
  status?: "engine-ready" | "scanning" | "completed";
  statusMessage?: string;
}

export const ToolHero: React.FC<ToolHeroProps> = ({
  badge,
  title,
  description,
  status = "engine-ready",
  statusMessage,
}) => {
  return (
    <section className="pt-20 pb-12 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
      <Container>
        <PerspectiveContainer perspective={1200} className="max-w-4xl mx-auto text-center">
          <Reveal direction="up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Link
                href="/tools"
                className="text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
              >
                ← Back to Diagnostic Hub
              </Link>
              <span className="text-slate-700">|</span>
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">{badge}</span>
            </div>
            <div className="mb-4">
              <ToolStatus status={status} message={statusMessage} />
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </Reveal>
        </PerspectiveContainer>
      </Container>
    </section>
  );
};
