"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import {
  Globe,
  Smartphone,
  ShieldCheck,
  Zap,
  Cloud,
  Code2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export interface CareCategoryItem {
  modCode: string;
  slug: string;
  title: string;
  categoryTag: string;
  description: string;
  icon: React.ElementType;
  items: string[];
  accentColor: "emerald" | "sky" | "indigo" | "teal" | "purple" | "cyan";
  glowColor: string;
  borderColor: string;
}

const CARE_CATEGORIES: CareCategoryItem[] = [
  {
    modCode: "MOD-01",
    slug: "website-care",
    title: "Website Care",
    categoryTag: "Web Infrastructure",
    description: "Proactive engineering care for marketing websites, company portals, and CMS installations.",
    icon: Globe,
    items: [
      "CMS & dependency updates",
      "Bug fixes & broken layout repairs",
      "Content updates & publishing support",
      "Performance & Core Web Vitals maintenance",
      "Form submission & link checks",
      "Routine technical health diagnostics",
    ],
    accentColor: "emerald",
    glowColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    modCode: "MOD-02",
    slug: "app-care",
    title: "App Care",
    categoryTag: "Full-Stack Software",
    description: "Dedicated technical maintenance for mobile apps, web applications, SaaS backends, and internal portals.",
    icon: Smartphone,
    items: [
      "Mobile & web application bug fixes",
      "Framework & runtime dependency updates",
      "Feature maintenance & minor extensions",
      "Release pipeline & app store support",
      "API & database query stabilization",
      "Staging environment management",
    ],
    accentColor: "sky",
    glowColor: "rgba(56, 189, 248, 0.15)",
    borderColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    modCode: "MOD-03",
    slug: "security-care",
    title: "Security Care",
    categoryTag: "Security & Defense",
    description: "Defensive security reviews, authentication fixes, account recovery guidance, and access hardening.",
    icon: ShieldCheck,
    items: [
      "Defensive security posture reviews",
      "Authentication & MFA issue triage",
      "Legitimate account access recovery support",
      "Security dependency updates & patches",
      "Access hardening & permission audits",
      "SSL certificate & header enforcement",
    ],
    accentColor: "teal",
    glowColor: "rgba(45, 212, 191, 0.15)",
    borderColor: "rgba(45, 212, 191, 0.4)",
  },
  {
    modCode: "MOD-04",
    slug: "performance-care",
    title: "Performance Care",
    categoryTag: "Speed & Optimization",
    description: "In-depth speed investigations, frontend optimization, and backend query tuning.",
    icon: Zap,
    items: [
      "Targeted performance investigation",
      "Core Web Vitals & speed remediation",
      "Frontend asset & script bundle optimization",
      "Database & slow query optimization",
      "Edge caching & CDN configuration",
      "Image & media payload compression",
    ],
    accentColor: "indigo",
    glowColor: "rgba(129, 140, 248, 0.15)",
    borderColor: "rgba(129, 140, 248, 0.4)",
  },
  {
    modCode: "MOD-05",
    slug: "infrastructure-care",
    title: "Infrastructure Care",
    categoryTag: "Cloud & DevOps",
    description: "Reliable management for deployments, hosting environments, databases, and monitoring configuration.",
    icon: Cloud,
    items: [
      "Deployment issue investigation & fix",
      "Cloud hosting & VPS environment management",
      "Database backup & migration assistance",
      "Environment variable & DNS configuration",
      "Technical monitoring setup & alerts",
      "Domain, SSL & SSL gateway support",
    ],
    accentColor: "purple",
    glowColor: "rgba(192, 132, 252, 0.15)",
    borderColor: "rgba(192, 132, 252, 0.4)",
  },
  {
    modCode: "MOD-06",
    slug: "ongoing-development",
    title: "Ongoing Development",
    categoryTag: "Product Engineering",
    description: "Continuous engineering partnership for recurring feature builds, product iteration, and system evolution.",
    icon: Code2,
    items: [
      "Continuous feature development sprints",
      "Product iteration & UI enhancement",
      "Technical debt cleanup & refactoring",
      "Architecture guidance & roadmap planning",
      "Dedicated developer hours & triage",
      "Vendor & third-party API liaison",
    ],
    accentColor: "cyan",
    glowColor: "rgba(34, 211, 238, 0.15)",
    borderColor: "rgba(34, 211, 238, 0.4)",
  },
];

export const CareAreas: React.FC = () => {
  return (
    <section id="care-categories" className="py-20 border-b border-slate-800/80 bg-slate-950 relative overflow-hidden">
      <Container>
        <div className="max-w-3xl mb-16">
          <Reveal direction="up">
            <SystemBadge variant="emerald" pulse={true} className="mb-4">
              SPATIAL CAPABILITY SYSTEM
            </SystemBadge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4 font-sans">
              Snow Care Service Categories.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              Targeted technical coverage modules tailored to your digital ecosystem. Select any capability module to initiate a direct intake request.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric Bento Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CARE_CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            const requestUrl = `/request?service=snow-care&category=${cat.slug}`;

            return (
              <Reveal key={cat.slug} direction="up" delay={index * 60}>
                <Tilt maxRotation={4} className="h-full">
                  <ProximitySurface
                    glowColor={cat.glowColor}
                    borderColor={cat.borderColor}
                    className="p-8 bg-slate-900/80 border border-slate-800 h-full flex flex-col justify-between group shadow-xl"
                  >
                    <div>
                      {/* Module Header Bar */}
                      <div className="flex items-center justify-between mb-6 border-b border-slate-800/80 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 group-hover:scale-105 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                            {cat.modCode}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/60">
                          {cat.categoryTag}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-100 mb-2 font-sans group-hover:text-emerald-300 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-6 leading-relaxed min-h-[48px] font-sans">
                        {cat.description}
                      </p>

                      <div className="border-t border-slate-800/80 pt-5 mb-8">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                            CAPABILITIES & SCOPE
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400">
                            6 MODULES
                          </span>
                        </div>
                        <ul className="space-y-2.5 font-sans">
                          {cat.items.map((item) => (
                            <li key={item} className="flex items-start text-xs text-slate-300 gap-2.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      href={requestUrl}
                      className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold text-slate-200 bg-slate-800/90 hover:bg-emerald-400 hover:text-slate-950 border border-slate-700/80 transition-all duration-200 flex items-center justify-center gap-2 group-hover:border-emerald-500/60"
                    >
                      <span>REQUEST CARE</span>
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
