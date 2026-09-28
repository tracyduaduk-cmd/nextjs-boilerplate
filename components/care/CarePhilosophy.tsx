"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { ProblemVisual } from "@/components/ui/ProblemVisual";

const degradationFactors = [
  { label: "Browser Engine Changes", desc: "Chromium, Safari, and Firefox update fast. CSS/JS standard shifts silently break layouts." },
  { label: "Third-Party API Drift", desc: "Payment gateways, maps, analytics, and social APIs deprecate methods without warning." },
  { label: "Security Vulnerabilities", desc: "Dependencies accumulate security CVE advisories over time requiring immediate patches." },
  { label: "Unmanaged Database Growth", desc: "Accumulated assets, unindexed data queries, and unmanaged caches slow loading speed." },
  { label: "Mobile Viewport Shifts", desc: "New device screen sizes and mobile browser bars alter interactive touch elements." },
  { label: "SSL & Domain Expirations", desc: "SSL certificates, gateway tokens, and DNS records require persistent oversight." },
];

export const CarePhilosophy: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950/60 border-b border-slate-800/60">
      <Container>
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <Reveal direction="up">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">The Reality of Modern Software</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-6">
              Websites and applications degrade without anyone intentionally breaking them.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Software is not a static printed poster. It lives in an ecosystem of changing browsers, operating systems, security standards, and third-party APIs. Snow Care provides disciplined, ongoing technical attention so your business infrastructure remains sharp.
            </p>
          </Reveal>
        </div>

        {/* Technical Transformation Visual Stage */}
        <Reveal direction="up" delay={100} className="mb-16">
          <ProblemVisual
            problemText="Unmonitored systems silently degrade due to API shifts and security CVE advisories."
            fixText="Disciplined Snow Care engineering stabilizes performance, updates runtime dependencies, and locks down security."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {degradationFactors.map((factor, index) => (
            <Reveal key={factor.label} direction="up" delay={index * 50}>
              <Tilt maxRotation={5} className="h-full">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-800/60 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-emerald-400/80 mb-3 block">0{index + 1} Risk Signal</span>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">{factor.label}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{factor.desc}</p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
