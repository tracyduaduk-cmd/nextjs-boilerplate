"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { ArrowRight, Wrench } from "lucide-react";

export const CareCTA: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <Container>
        <Reveal direction="up">
          <Tilt maxRotation={3} className="w-full">
            <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-800/40 text-center relative z-10 shadow-2xl space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800/60 inline-flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5" />
                Technical Guidance
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-2xl mx-auto font-sans">
                Not sure what your system needs?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans">
                Run an automated diagnostic check or tell Snow what issues you are experiencing. We will evaluate your setup and provide an honest technical assessment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/tools/website-health"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
                >
                  <span>Run Website Health Check</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/request?service=snow-care&mode=diagnostic"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 transition-all flex items-center justify-center gap-2"
                >
                  <span>Describe Your Issue to Snow</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Tilt>
        </Reveal>
      </Container>
    </section>
  );
};
