"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";

const CAPABILITIES = [
  {
    title: "Websites & Web Applications",
    description: "High-performance marketing platforms and web apps with sub-100ms response architecture and spatial visual hierarchy.",
    slug: "websites-web-applications",
    tag: "WEB ENGINE",
  },
  {
    title: "AI Solutions & Automation",
    description: "Private conversational assistants, streaming prompt interfaces, dynamic tool execution, and vector context pipelines.",
    slug: "ai-solutions-automation",
    tag: "INTELLIGENCE",
  },
  {
    title: "Custom Software & Web Apps",
    description: "Bespoke SaaS platforms, operational portals, real-time telemetry dashboards, and multi-tenant architectures.",
    slug: "custom-software-web-apps",
    tag: "SYSTEMS",
  },
  {
    title: "Digital Security & Hardening",
    description: "Zero-trust verification pipelines, security header auditing, cryptographically signed logs, and defensive hardening.",
    slug: "cybersecurity-digital-safety",
    tag: "SECURITY",
  },
];

export const WorkCapabilityContext: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-t border-b border-slate-900 bg-slate-950/80 relative">
      <Container>
        <div className="max-w-3xl mb-16 space-y-4">
          <Reveal direction="down">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400 uppercase tracking-widest">
              CAPABILITY MATRIX
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-sans">
              Architectural Disciplines & Stack Engineering.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="text-slate-400 text-base sm:text-lg font-sans">
              Every project in the archive is built on Snow&apos;s modular engineering disciplines — combining spatial frontend craft with production reliability.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap, idx) => (
            <Reveal key={cap.slug} direction="up" delay={idx * 0.1}>
              <div className="group relative p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-sky-500/50 transition-all duration-300 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-sky-400 tracking-wider uppercase px-2.5 py-0.5 rounded bg-sky-950/60 border border-sky-800/60">
                    {cap.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-600">0{idx + 1}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-100 font-sans group-hover:text-sky-300 transition-colors">
                  {cap.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  {cap.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/request?service=${cap.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    <span>Request Service Specification</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
