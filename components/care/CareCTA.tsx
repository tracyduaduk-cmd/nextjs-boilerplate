"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { ArrowRight, Activity, Terminal } from "lucide-react";

export const CareCTA: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-950">
      <Container>
        <Reveal direction="up">
          <Tilt maxRotation={3} className="w-full">
            <ProximitySurface
              glowColor="rgba(16, 185, 129, 0.2)"
              borderColor="rgba(16, 185, 129, 0.5)"
              className="p-8 sm:p-14 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-800/60 text-center relative z-10 shadow-2xl space-y-6"
            >
              <div className="inline-flex items-center gap-2">
                <SystemBadge variant="emerald" pulse={true}>
                  TECHNICAL ASSISTANCE TERMINAL
                </SystemBadge>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-2xl mx-auto font-sans">
                Not sure what your system needs?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans">
                Run an automated diagnostic check or describe your current system behavior to Snow engineers. We will inspect your setup and deliver an actionable technical assessment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/tools/website-health"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 font-sans group"
                >
                  <Activity className="w-4 h-4 text-slate-950" />
                  <span>Run Website Health Check</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/request?service=snow-care&mode=diagnostic"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center justify-center gap-2 font-sans hover:border-emerald-500/60 group"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Describe Your Issue to Snow</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ProximitySurface>
          </Tilt>
        </Reveal>
      </Container>
    </section>
  );
};
