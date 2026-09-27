"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";

export const WorkCTA: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none" />

      <Container className="relative z-10">
        <Reveal direction="up">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-8 sm:p-16 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>ENGAGE SNOW STUDIO</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 font-sans leading-[1.05]">
              Ready to engineer your digital architecture?
            </h2>

            <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
              Snow provides custom software development, web applications, AI integrations, and technical infrastructure hardening.
            </p>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
              <Link
                href="/request"
                className="px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold font-mono text-sm transition-all shadow-xl shadow-sky-500/20 hover:scale-[1.02]"
              >
                Start a Service Request →
              </Link>
              <Link
                href="/design-system"
                className="px-8 py-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-sm transition-all"
              >
                Inspect Design System
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
