"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";

export const CareCTA: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <Container>
        <Reveal direction="up">
          <Tilt maxRotation={3} className="w-full">
            <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-800/40 text-center relative z-10 shadow-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800/60 inline-block mb-6">
                Next Steps
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4 max-w-2xl mx-auto">
                Not sure what your system needs?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Run an automated diagnostic check or tell Snow what issues you are experiencing. We will evaluate your setup and provide an honest technical assessment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/tools/website-health"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-950/50"
                >
                  Run Website Health Check
                </Link>
                <Link
                  href="/request"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 transition-all"
                >
                  Tell Snow What Is Wrong ↗
                </Link>
              </div>
            </div>
          </Tilt>
        </Reveal>
      </Container>
    </section>
  );
};
