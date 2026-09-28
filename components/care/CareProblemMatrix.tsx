"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
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
  Terminal,
  Activity,
} from "lucide-react";

export interface ProblemOption {
  id: string;
  sigCode: string;
  label: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  borderColor: string;
}

const PROBLEMS: ProblemOption[] = [
  {
    id: "site-down",
    sigCode: "SIG-01",
    label: "My website is down",
    description: "Site returns 5xx errors, white screen of death, or DNS/gateway failures.",
    categorySlug: "website-care",
    categoryName: "Website Care",
    icon: AlertTriangle,
    accentColor: "text-rose-400 border-rose-500/40 bg-rose-950/60",
    glowColor: "rgba(244, 63, 94, 0.2)",
    borderColor: "rgba(244, 63, 94, 0.5)",
  },
  {
    id: "site-slow",
    sigCode: "SIG-02",
    label: "My website is slow",
    description: "High loading times, poor Core Web Vitals, or bloated JS/CSS payloads.",
    categorySlug: "performance-care",
    categoryName: "Performance Care",
    icon: Zap,
    accentColor: "text-amber-400 border-amber-500/40 bg-amber-950/60",
    glowColor: "rgba(245, 158, 11, 0.2)",
    borderColor: "rgba(245, 158, 11, 0.5)",
  },
  {
    id: "something-broken",
    sigCode: "SIG-03",
    label: "Something is broken",
    description: "Form submissions, layout shifts, or broken interactive UI features.",
    categorySlug: "website-care",
    categoryName: "Website Care",
    icon: Wrench,
    accentColor: "text-sky-400 border-sky-500/40 bg-sky-950/60",
    glowColor: "rgba(56, 189, 248, 0.2)",
    borderColor: "rgba(56, 189, 248, 0.5)",
  },
  {
    id: "security-issue",
    sigCode: "SIG-04",
    label: "I think my site/app has a security issue",
    description: "Unusual traffic, security header warnings, or authentication anomalies.",
    categorySlug: "security-care",
    categoryName: "Security Care",
    icon: ShieldAlert,
    accentColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/60",
    glowColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "rgba(16, 185, 129, 0.5)",
  },
  {
    id: "app-update",
    sigCode: "SIG-05",
    label: "My app needs an update",
    description: "Dependency upgrades, mobile framework patches, or feature maintenance.",
    categorySlug: "app-care",
    categoryName: "App Care",
    icon: Smartphone,
    accentColor: "text-indigo-400 border-indigo-500/40 bg-indigo-950/60",
    glowColor: "rgba(129, 140, 248, 0.2)",
    borderColor: "rgba(129, 140, 248, 0.5)",
  },
  {
    id: "deployment-failing",
    sigCode: "SIG-06",
    label: "My deployment is failing",
    description: "Build errors, broken CI/CD pipelines, or server hosting build failures.",
    categorySlug: "infrastructure-care",
    categoryName: "Infrastructure Care",
    icon: CloudOff,
    accentColor: "text-purple-400 border-purple-500/40 bg-purple-950/60",
    glowColor: "rgba(192, 132, 252, 0.2)",
    borderColor: "rgba(192, 132, 252, 0.5)",
  },
  {
    id: "ongoing-maintenance",
    sigCode: "SIG-07",
    label: "I need ongoing maintenance",
    description: "Continuous development, regular security patches, and technical oversight.",
    categorySlug: "ongoing-development",
    categoryName: "Ongoing Development",
    icon: Clock,
    accentColor: "text-teal-400 border-teal-500/40 bg-teal-950/60",
    glowColor: "rgba(45, 212, 191, 0.2)",
    borderColor: "rgba(45, 212, 191, 0.5)",
  },
  {
    id: "not-sure",
    sigCode: "SIG-08",
    label: "I'm not sure",
    description: "Describe what you are observing and let Snow engineers diagnose.",
    categorySlug: "website-care",
    categoryName: "Diagnostic Guidance",
    icon: HelpCircle,
    accentColor: "text-cyan-400 border-cyan-500/40 bg-cyan-950/60",
    glowColor: "rgba(34, 211, 238, 0.2)",
    borderColor: "rgba(34, 211, 238, 0.5)",
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
    <section id="care-problem-matrix" className="py-20 bg-slate-950 border-b border-slate-800/80 relative overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <Reveal direction="up">
            <SystemBadge variant="emerald" pulse={true} className="mb-4">
              INCIDENT → SIGNAL → DIAGNOSIS → RESPONSE
            </SystemBadge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4 font-sans">
              What&apos;s happening with your system?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              Select the signal matching your current operational state to instantly route directly into Snow&apos;s technical intake workflow.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Options Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {PROBLEMS.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = item.id === selectedId;

              return (
                <Reveal key={item.id} direction="up" delay={idx * 30}>
                  <ProximitySurface
                    glowColor={item.glowColor}
                    borderColor={isSelected ? item.borderColor : "rgba(255, 255, 255, 0.08)"}
                    onClick={() => setSelectedId(item.id)}
                    className={`p-4 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-emerald-500/80 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/50"
                        : "bg-slate-900/40 hover:bg-slate-900/80"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className="w-full text-left focus:outline-none flex items-start gap-3.5"
                    >
                      <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${item.accentColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            {item.sigCode}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <span className="text-xs font-bold font-sans tracking-tight text-slate-100 block truncate">
                          {item.label}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-snug mt-1 line-clamp-2 font-sans">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  </ProximitySurface>
                </Reveal>
              );
            })}
          </div>

          {/* Selected Action Panel */}
          <div className="lg:col-span-5 sticky top-28">
            <Reveal direction="up" delay={100}>
              <Tilt maxRotation={4} className="w-full">
                <ProximitySurface
                  glowColor={activeProblem.glowColor}
                  borderColor={activeProblem.borderColor}
                  className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-800/60 shadow-2xl space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                        DIAGNOSTIC ROUTER
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{activeProblem.sigCode}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-2 font-sans">
                      {activeProblem.label}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-5 font-sans">
                      {activeProblem.description}
                    </p>

                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Service Pipeline:</span>
                        <span className="text-emerald-400 font-bold">Snow Care</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Target Category:</span>
                        <span className="text-slate-200">{activeProblem.categoryName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Diagnostic Status:</span>
                        <span className="text-amber-400 flex items-center gap-1">
                          <Activity className="w-3 h-3 animate-pulse" />
                          Ready for Triage
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={buildRequestUrl(activeProblem)}
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 font-sans group"
                  >
                    <span>Request Care for this Issue</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <p className="text-[11px] text-slate-400 text-center font-mono">
                    Routes directly into Snow technical intake with pre-configured problem context.
                  </p>
                </ProximitySurface>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
