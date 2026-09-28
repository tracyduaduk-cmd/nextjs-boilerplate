"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { ProblemVisual } from "@/components/ui/ProblemVisual";
import { AlertCircle } from "lucide-react";

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
    <section className="py-20 bg-slate-950/80 border-b border-slate-800/80 relative overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto mb-14 text-center">
          <Reveal direction="up">
            <SystemBadge variant="amber" pulse={true} className="mb-4">
              SYSTEM DEGRADATION DIAGNOSTIC
            </SystemBadge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-6 font-sans">
              Websites and applications degrade without anyone intentionally breaking them.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              Software is not a static poster. It operates in a dynamic ecosystem of evolving browsers, operating systems, security standards, and third-party APIs. Snow Care provides disciplined engineering attention so your business infrastructure remains sharp.
            </p>
          </Reveal>
        </div>

        {/* Technical Transformation Visual Stage */}
        <Reveal direction="up" delay={100} className="mb-16">
          <ProblemVisual
            problemText="Unmonitored systems silently degrade due to API shifts, browser updates, and security CVE advisories."
            fixText="Disciplined Snow Care engineering stabilizes performance, updates runtime dependencies, and locks down security."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {degradationFactors.map((factor, index) => (
            <Reveal key={factor.label} direction="up" delay={index * 50}>
              <Tilt maxRotation={4} className="h-full">
                <ProximitySurface
                  glowColor="rgba(245, 158, 11, 0.12)"
                  borderColor="rgba(245, 158, 11, 0.3)"
                  className="p-6 bg-slate-900/60 border border-slate-800/80 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60">
                        0{index + 1} RISK SIGNAL
                      </span>
                      <AlertCircle className="w-4 h-4 text-amber-400/80" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2 font-sans">{factor.label}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">{factor.desc}</p>
                  </div>
                </ProximitySurface>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
