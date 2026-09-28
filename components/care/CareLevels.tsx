"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { CheckCircle2, ArrowRight, Layers } from "lucide-react";

const carePlans = [
  {
    tierCode: "TIER-01",
    name: "Essential Care",
    slug: "essential-care",
    tagline: "Preventative technical maintenance for established web presences.",
    purpose: "For businesses that mainly need preventative maintenance and essential updates.",
    features: [
      "Routine technical health checks",
      "Core & dependency software updates",
      "Automated backups (where supported)",
      "Basic security signals review",
      "Minor content & publishing updates",
      "Periodic technical health summary",
    ],
    popular: false,
    glowColor: "rgba(56, 189, 248, 0.12)",
    borderColor: "rgba(56, 189, 248, 0.3)",
  },
  {
    tierCode: "TIER-02",
    name: "Business Care",
    slug: "business-care",
    tagline: "Active technical stewardship for mission-critical digital operations.",
    purpose: "For businesses whose web technology is operationally central to customer acquisition and service.",
    features: [
      "Everything in Essential Care",
      "More frequent technical health audits",
      "Performance & loading speed reviews",
      "Integration & lead form submission testing",
      "Priority content & support request turnarounds",
      "Quarterly technical improvement recommendations",
    ],
    popular: true,
    glowColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "rgba(16, 185, 129, 0.6)",
  },
  {
    tierCode: "TIER-03",
    name: "Continuous Care",
    slug: "continuous-care",
    tagline: "Comprehensive engineering partnership for high-dependency systems.",
    purpose: "For platforms, apps, and ecommerce businesses requiring proactive continuous improvement.",
    features: [
      "Everything in Business Care",
      "Deeper full-stack technical monitoring",
      "Ecommerce & payment gateway checks",
      "Ongoing speed & conversion optimization",
      "Priority roadmap & project planning",
      "Dedicated technical advisory & architecture guidance",
    ],
    popular: false,
    glowColor: "rgba(129, 140, 248, 0.12)",
    borderColor: "rgba(129, 140, 248, 0.3)",
  },
];

export const CareLevels: React.FC = () => {
  return (
    <section id="care-plans" className="py-20 bg-slate-950/90 border-b border-slate-800/80 relative overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal direction="up">
            <SystemBadge variant="cyan" pulse={true} className="mb-4">
              SERVICE ARCHITECTURE
            </SystemBadge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4 font-sans">
              Structured Care Levels.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-sans">
              Choose the depth of technical stewardship that matches your operational requirements.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {carePlans.map((plan, index) => {
            const requestUrl = `/request?service=snow-care&plan=${plan.slug}`;

            return (
              <Reveal key={plan.name} direction="up" delay={index * 100}>
                <Tilt maxRotation={4} className="h-full">
                  <ProximitySurface
                    glowColor={plan.glowColor}
                    borderColor={plan.borderColor}
                    className={`p-8 h-full flex flex-col justify-between shadow-2xl ${
                      plan.popular
                        ? "bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/30 border-emerald-500/80 shadow-emerald-950/50"
                        : "bg-slate-900/60 border-slate-800/80"
                    }`}
                  >
                    <div>
                      {/* Tier Header */}
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-emerald-400" />
                          {plan.tierCode}
                        </span>
                        {plan.popular ? (
                          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-emerald-400 text-slate-950 uppercase">
                            Recommended Balance
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 uppercase">TIER LEVEL</span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-100 mb-2 font-sans">{plan.name}</h3>
                      <p className="text-xs font-mono text-emerald-400 mb-4">{plan.tagline}</p>
                      <p className="text-xs text-slate-300 leading-relaxed mb-6 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 font-sans">
                        {plan.purpose}
                      </p>

                      <div className="border-t border-slate-800/80 pt-6 mb-8">
                        <div className="mb-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-sm font-bold text-slate-100 block font-sans">Tailored to your system</span>
                          <p className="text-xs text-slate-400 mt-0.5 font-sans">Pricing matches complexity and scale</p>
                        </div>

                        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3">
                          SCOPE & COVERAGE:
                        </p>
                        <ul className="space-y-3 font-sans">
                          {plan.features.map((feat) => (
                            <li key={feat} className="flex items-start text-xs text-slate-300 gap-2.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      href={requestUrl}
                      className={`w-full text-center py-3.5 px-6 rounded-xl font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 group ${
                        plan.popular
                          ? "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-950/60"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80"
                      }`}
                    >
                      <span>REQUEST {plan.name.toUpperCase()}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </ProximitySurface>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
