"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";

const careAreas = [
  {
    title: "Website Care",
    category: "Web Infrastructure",
    description: "Proactive care for marketing sites, corporate portals, and Content Management Systems.",
    items: [
      "Software & dependency updates",
      "Content updates & publishing assistance",
      "Broken link & form submission checks",
      "Routine technical health diagnostics",
      "Automated off-site backups",
      "Security header & SSL monitoring",
      "Performance & Core Web Vitals review",
    ],
    accent: "emerald",
  },
  {
    title: "Application Care",
    category: "Full-Stack Software",
    description: "Dedicated maintenance for custom web applications, SaaS backends, and internal portals.",
    items: [
      "Bug investigation & triage",
      "Dependency runtime maintenance",
      "Framework & environment compatibility",
      "API & third-party integration monitoring",
      "Feature patch deployments",
      "Database query & index tuning",
      "Staging & deployment pipeline support",
    ],
    accent: "sky",
  },
  {
    title: "Ecommerce Care",
    category: "Commerce Systems",
    description: "Continuous operational monitoring for online storefronts and payment flows.",
    items: [
      "Checkout & payment gateway validation",
      "Product catalog & inventory support",
      "Third-party payment integration checks",
      "Peak traffic performance review",
      "Transaction security checks",
      "Plugin & platform engine updates",
      "Conversion friction diagnostic",
    ],
    accent: "indigo",
  },
  {
    title: "Business Technology Care",
    category: "IT & Infrastructure",
    description: "Operational technology assistance for internal devices, accounts, and workflows.",
    items: [
      "Hardware & workstation troubleshooting",
      "Business IT & domain guidance",
      "Workflow & automation maintenance",
      "Legitimate account access recovery support",
      "Email & DNS infrastructure guidance",
      "Cloud service configuration checks",
      "Technology vendor technical liaison",
    ],
    accent: "teal",
  },
];

export const CareAreas: React.FC = () => {
  return (
    <section className="py-20 border-b border-slate-800/60">
      <Container>
        <div className="max-w-3xl mb-16">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2 block">Specialized Attention</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4">
              Care across four technology pillars.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Whether you operate a high-volume ecommerce site, a custom Web application, or complex internal IT infrastructure, Snow provides targeted technical coverage.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careAreas.map((area, index) => (
            <Reveal key={area.title} direction="up" delay={index * 100}>
              <Tilt maxRotation={4} className="h-full">
                <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-700/60 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
                        {area.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">PILLAR 0{index + 1}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-100 mb-3">{area.title}</h3>
                    <p className="text-slate-300 text-sm mb-6 leading-relaxed">{area.description}</p>

                    <div className="border-t border-slate-800/80 pt-6">
                      <p className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-4">Includes Technical Coverage:</p>
                      <ul className="space-y-2.5">
                        {area.items.map((item) => (
                          <li key={item} className="flex items-start text-sm text-slate-300 gap-2.5">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
