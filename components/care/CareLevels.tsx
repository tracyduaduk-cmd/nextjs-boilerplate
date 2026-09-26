"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";

const carePlans = [
  {
    name: "Essential Care",
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
  },
  {
    name: "Business Care",
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
  },
  {
    name: "Continuous Care",
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
  },
];

export const CareLevels: React.FC = () => {
  return (
    <section id="care-plans" className="py-20 bg-slate-950/80 border-b border-slate-800/60">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2 block">Service Architecture</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4">
              Structured Care Levels.
            </h2>
            <p className="text-slate-300 text-lg">
              Choose the depth of technical stewardship that matches your operational requirements.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {carePlans.map((plan, index) => (
            <Reveal key={plan.name} direction="up" delay={index * 100}>
              <Tilt maxRotation={5} className="h-full">
                <div
                  className={`p-8 rounded-2xl h-full flex flex-col justify-between border transition-all ${
                    plan.popular
                      ? "bg-slate-900/90 border-emerald-500/80 shadow-xl shadow-emerald-950/50"
                      : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div>
                    {plan.popular && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-emerald-400 text-slate-950 uppercase mb-4">
                        Recommended Balance
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-slate-100 mb-2">{plan.name}</h3>
                    <p className="text-sm font-medium text-emerald-400 mb-4">{plan.tagline}</p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6 bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                      {plan.purpose}
                    </p>

                    <div className="border-t border-slate-800/80 pt-6 mb-8">
                      <div className="mb-4">
                        <span className="text-xl font-bold text-slate-100">Tailored to your system</span>
                        <p className="text-xs text-slate-400 mt-1">Pricing matches complexity and scale</p>
                      </div>

                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Scope & Features:</p>
                      <ul className="space-y-3">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start text-sm text-slate-300 gap-2.5">
                            <span className="text-emerald-400 font-bold shrink-0">✦</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/request"
                    className={`w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all ${
                      plan.popular
                        ? "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80"
                    }`}
                  >
                    Request a Care Recommendation ↗
                  </Link>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
