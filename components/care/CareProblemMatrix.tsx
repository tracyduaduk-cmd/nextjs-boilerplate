"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import {
  AlertTriangle,
  Zap,
  Wrench,
  ShieldAlert,
  Smartphone,
  CloudOff,
  Clock,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export interface ProblemOption {
  id: string;
  label: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  icon: React.ElementType;
  accentColor: string;
}

const PROBLEMS: ProblemOption[] = [
  {
    id: "site-down",
    label: "My website is down",
    description: "Site returns 5xx errors, white screen of death, or DNS failures.",
    categorySlug: "website-care",
    categoryName: "Website Care",
    icon: AlertTriangle,
    accentColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  },
  {
    id: "site-slow",
    label: "My website is slow",
    description: "High loading times, poor Core Web Vitals, or bloated assets.",
    categorySlug: "performance-care",
    categoryName: "Performance Care",
    icon: Zap,
    accentColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    id: "something-broken",
    label: "Something is broken",
    description: "Form submissions, layout shifts, or broken interactive features.",
    categorySlug: "website-care",
    categoryName: "Website Care",
    icon: Wrench,
    accentColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
  {
    id: "security-issue",
    label: "I think my site/app has a security issue",
    description: "Unusual traffic, security warnings, or authentication anomalies.",
    categorySlug: "security-care",
    categoryName: "Security Care",
    icon: ShieldAlert,
    accentColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    id: "app-update",
    label: "My app needs an update",
    description: "Dependency upgrades, mobile framework patches, or feature maintenance.",
    categorySlug: "app-care",
    categoryName: "App Care",
    icon: Smartphone,
    accentColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
  },
  {
    id: "deployment-failing",
    label: "My deployment is failing",
    description: "Build errors, broken CI/CD pipelines, or server hosting issues.",
    categorySlug: "infrastructure-care",
    categoryName: "Infrastructure Care",
    icon: CloudOff,
    accentColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
  {
    id: "ongoing-maintenance",
    label: "I need ongoing maintenance",
    description: "Continuous development, regular patches, and technical oversight.",
    categorySlug: "ongoing-development",
    categoryName: "Ongoing Development",
    icon: Clock,
    accentColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
  },
  {
    id: "not-sure",
    label: "I'm not sure",
    description: "Describe what you are observing and let Snow engineers advise.",
    categorySlug: "website-care",
    categoryName: "Diagnostic Guidance",
    icon: HelpCircle,
    accentColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
];

export const CareProblemMatrix: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("site-down");

  const activeProblem = PROBLEMS.find((p) => p.id === selectedId) || PROBLEMS[0];

  const buildRequestUrl = (problem: ProblemOption) => {
    const params = new URLSearchParams();
    params.set("service", "snow-care");
    params.set("category", problem.categorySlug);
    params.set("problem", problem.label);
    if (problem.id === "not-sure") {
      params.set("mode", "diagnostic");
    }
    return `/request?${params.toString()}`;
  };

  return (
    <section id="care-problem-matrix" className="py-20 bg-slate-950/90 border-b border-slate-800/60">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Routing Matrix
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
              What&apos;s happening with your system?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Select the situation matching your current operational state to route directly into Snow&apos;s technical intake workflow.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Options Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROBLEMS.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = item.id === selectedId;

              return (
                <Reveal key={item.id} direction="up" delay={idx * 40}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isSelected
                        ? "bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-950/40 text-slate-100 ring-1 ring-emerald-500/50"
                        : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700/80 text-slate-300 hover:bg-slate-900/80"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg border shrink-0 mt-0.5 ${item.accentColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold font-sans tracking-tight text-slate-100 truncate">
                          {item.label}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Selected Action Panel */}
          <div className="lg:col-span-5 sticky top-28">
            <Reveal direction="up" delay={100}>
              <Tilt maxRotation={4} className="w-full">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-800/60 shadow-2xl relative overflow-hidden space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800/60">
                      Selected Routing Target
                    </span>
                    <span className="text-xs font-mono text-slate-500">ROUTER // SNW</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-2 font-sans">
                      {activeProblem.label}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {activeProblem.description}
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Service:</span>
                        <span className="text-emerald-400">Snow Care</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Category:</span>
                        <span className="text-slate-200">{activeProblem.categoryName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Intent:</span>
                        <span className="text-slate-300">Technical Triage & Request</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={buildRequestUrl(activeProblem)}
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
                  >
                    <span>Request Care for this Issue</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-[11px] text-slate-500 text-center font-sans">
                    Routes directly into the Snow technical intake system with pre-selected problem context.
                  </p>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
