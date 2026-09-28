"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { AIConcierge } from "@/components/concierge/AIConcierge";
import {
  FileCode,
  Binary,
  Hash,
  ShieldCheck,
  Search,
  FileText,
  Palette,
  QrCode,
  Activity,
  Gauge,
  SearchCheck,
  Shield,
  Bot,
  ArrowRight,
  Clock,
} from "lucide-react";

interface ToolItem {
  id: string;
  name: string;
  slug: string;
  badge: string;
  purpose: string;
  icon: React.ElementType;
  whatItDoes: string[];
  isComingSoon?: boolean;
}

const BUILD_TOOLS: ToolItem[] = [
  {
    id: "json",
    name: "JSON Formatter & Validator",
    slug: "/tools/json",
    badge: "Zero Transmission",
    purpose: "Format, minify, structure, and validate raw JSON data with instant syntax error detection.",
    icon: FileCode,
    whatItDoes: ["Parse & indent (2, 4, 8 spaces)", "Minify JSON strings", "Key counting & payload metrics", "100% browser memory isolation"],
  },
  {
    id: "regex",
    name: "Regex Tester & Matcher",
    slug: "/tools/regex",
    badge: "Local Matcher",
    purpose: "Test regular expressions with flag toggles, live match highlighting, and capture group breakdown.",
    icon: Search,
    whatItDoes: ["Real-time match highlighting", "Flag selectors (g, i, m, s)", "Capture group breakdown", "Bounded loop evaluation"],
  },
  {
    id: "markdown",
    name: "Markdown Live Preview",
    slug: "/tools/markdown",
    badge: "GFM Support",
    purpose: "Write GitHub-Flavored Markdown with instant live rendered HTML document previewing and export.",
    icon: FileText,
    whatItDoes: ["GFM headings, tables, code blocks", "Client-side HTML sanitization", "Raw Markdown download", "Clean document copying"],
  },
];

const ENCODE_TOOLS: ToolItem[] = [
  {
    id: "encode",
    name: "Base64 & URL Encoder",
    slug: "/tools/encode",
    badge: "UTF-8 Safe",
    purpose: "Encode and decode text payloads using Base64 or URL percent-encoding safely.",
    icon: Binary,
    whatItDoes: ["UTF-8 safe Base64 transformation", "URL Component percent encoding", "One-click input/output swap", "Zero network transmission"],
  },
  {
    id: "uuid",
    name: "UUID v4 Generator",
    slug: "/tools/uuid",
    badge: "Crypto.randomUUID()",
    purpose: "Generate cryptographically unique Version-4 UUIDs in bulk using standard Web Crypto APIs.",
    icon: Hash,
    whatItDoes: ["Web Crypto entropy", "Batch generation (up to 100)", "Uppercase & hyphen options", "Individual & batch copy"],
  },
  {
    id: "hash",
    name: "Web Crypto Hash",
    slug: "/tools/hash",
    badge: "SHA-256 / SHA-512",
    purpose: "Compute SHA-256, SHA-384, and SHA-512 cryptographic digests locally in browser memory.",
    icon: ShieldCheck,
    whatItDoes: ["SHA-256, SHA-384, SHA-512", "Web Crypto Subtle API", "One-way cryptographic digest", "Zero data transmission"],
  },
];

const DESIGN_TOOLS: ToolItem[] = [
  {
    id: "color",
    name: "Color & Contrast Utility",
    slug: "/tools/color",
    badge: "WCAG 2.1 AA/AAA",
    purpose: "Convert HEX, RGB, and HSL colors and audit foreground/background contrast compliance.",
    icon: Palette,
    whatItDoes: ["HEX, RGB, HSL color conversions", "WCAG AA (4.5:1) & AAA (7:1) checks", "Live typography surface preview", "Accessible contrast verdicts"],
  },
  {
    id: "qr",
    name: "Client-Side QR Generator",
    slug: "/tools/qr",
    badge: "Zero Network Calls",
    purpose: "Generate high-resolution PNG QR codes directly in your browser without third-party APIs.",
    icon: QrCode,
    whatItDoes: ["URL, text & contact payload support", "High-res 360px PNG download", "Zero third-party endpoint tracking", "Client-side canvas rendering"],
  },
];

const DIAGNOSTIC_TOOLS: ToolItem[] = [
  {
    id: "website-health",
    name: "Website Health Check",
    slug: "/tools/website-health",
    badge: "Coming Soon",
    purpose: "Full-spectrum diagnostic evaluating performance, mobile responsiveness, and reliability.",
    icon: Activity,
    whatItDoes: ["DOM render speed checks", "Mobile viewport compliance", "Accessibility signals", "Technical reliability"],
    isComingSoon: true,
  },
  {
    id: "speed",
    name: "Speed Diagnostic",
    slug: "/tools/speed",
    badge: "Coming Soon",
    purpose: "Analyze loading speed, Core Web Vitals, script overhead, and caching efficiency.",
    icon: Gauge,
    whatItDoes: ["Core Web Vitals (LCP, INP, CLS)", "Unoptimized asset payloads", "JavaScript blocking", "Caching headers"],
    isComingSoon: true,
  },
  {
    id: "seo",
    name: "SEO Check",
    slug: "/tools/seo",
    badge: "Coming Soon",
    purpose: "Audit technical search foundation, indexability, structured data, and search engine readiness.",
    icon: SearchCheck,
    whatItDoes: ["Title tags & meta structure", "Canonical tags & sitemap.xml", "Open Graph metadata", "JSON-LD structured data"],
    isComingSoon: true,
  },
  {
    id: "security",
    name: "Security Headers Audit",
    slug: "/tools/security",
    badge: "Coming Soon",
    purpose: "Safely audit website security headers, SSL certificate integrity, and public exposure signals.",
    icon: Shield,
    whatItDoes: ["HTTPS & TLS certificate check", "Security headers (HSTS, CSP)", "Cookie security attributes", "Defensive hardening"],
    isComingSoon: true,
  },
  {
    id: "ai-readiness",
    name: "AI Readiness Framework",
    slug: "/tools/ai-readiness",
    badge: "Coming Soon",
    purpose: "Evaluate whether your business data, customer workflows, and systems are structured for AI integration.",
    icon: Bot,
    whatItDoes: ["Data organization readiness", "Workflow automation mapping", "API connectivity check", "Data privacy & safety"],
    isComingSoon: true,
  },
];

export default function ToolsHubPage() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "BUILD" | "ENCODE" | "DESIGN" | "DIAGNOSTICS">("ALL");

  const renderToolGrid = (tools: ToolItem[], categoryTitle: string, categoryTag: string) => (
    <div className="mb-16">
      <div className="mb-6 border-b border-slate-800/80 pb-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">{categoryTag}</span>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">{categoryTitle}</h2>
        </div>
        <span className="text-xs font-mono text-slate-500">{tools.length} UTILITIES</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Reveal key={tool.id} direction="up" delay={index * 60}>
              <Tilt maxRotation={4} className="h-full">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-700/80 transition-all h-full flex flex-col justify-between group shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-sky-950/80 border border-sky-800/60 text-sky-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[11px] font-mono uppercase font-semibold px-2.5 py-1 rounded-full border ${
                          tool.isComingSoon
                            ? "bg-amber-950/80 text-amber-400 border-amber-800/80 flex items-center gap-1"
                            : "bg-sky-950/80 text-sky-400 border-sky-800/60"
                        }`}
                      >
                        {tool.isComingSoon && <Clock className="w-3 h-3 text-amber-400" />}
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-sky-300 transition-colors font-sans">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-300 mb-5 leading-relaxed min-h-[36px]">
                      {tool.purpose}
                    </p>

                    <div className="border-t border-slate-800/80 pt-4 mb-6">
                      <ul className="space-y-1.5">
                        {tool.whatItDoes.map((item) => (
                          <li key={item} className="flex items-center text-[11px] text-slate-400 gap-2 font-mono">
                            <span className="text-sky-400 font-bold shrink-0">✦</span>
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={tool.slug}
                    className={`w-full text-center py-3 px-4 rounded-xl font-mono text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                      tool.isComingSoon
                        ? "bg-slate-900 hover:bg-amber-950/80 text-amber-300 border-amber-800/60"
                        : "bg-slate-800 hover:bg-sky-400 hover:text-slate-950 text-slate-200 border-slate-700/80"
                    }`}
                  >
                    <span>{tool.isComingSoon ? "PREVIEW (COMING SOON)" : "OPEN UTILITY"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </div>
  );

  return (
    <ToolShell>
      {/* Hero Section */}
      <section className="pt-24 pb-16 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy */}
            <div className="lg:col-span-7">
              <PerspectiveContainer perspective={1200} className="w-full text-left">
                <Reveal direction="up">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/80 uppercase mb-6">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    Snow Technology Tools
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.08] mb-6">
                    Small tools for building, debugging & understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">digital systems.</span>
                  </h1>
                  <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-sans mb-8">
                    Essential browser-based developer utilities and system diagnostic suites. Built to run 100% client-side with zero data tracking.
                  </p>
                </Reveal>
              </PerspectiveContainer>
            </div>

            {/* Right Column: Spatial Instrument Visual */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <Reveal direction="up" delay={150}>
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl w-full max-w-md mx-auto text-center space-y-4">
                  <div className="w-full h-[240px] relative flex items-center justify-center touch-pan-y">
                    <SpatialInstrument mode="services" scale={0.9} accentColor="#38bdf8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-200 font-sans">
                      Snow System Utility Core
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      Interactive 3D representation of isolated local processing and cryptographic integrity.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <ToolNavigation />

      {/* AI Concierge Recommendation */}
      <section className="py-10 border-b border-slate-800/60 bg-slate-950/50">
        <Container>
          <AIConcierge
            title="Unsure which tool or diagnostic check you need?"
            subtitle="Describe your development task or problem and Snow Concierge will recommend the right utility."
          />
        </Container>
      </section>

      {/* Main Filterable Tool Suite */}
      <section className="py-16">
        <Container>
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: "ALL", label: "All Utilities" },
              { id: "BUILD", label: "Build Tools" },
              { id: "ENCODE", label: "Encode & Security" },
              { id: "DESIGN", label: "Design & Output" },
              { id: "DIAGNOSTICS", label: "System Diagnostics" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeCategory === tab.id
                    ? "bg-sky-400 text-slate-950 shadow-md shadow-sky-950/50"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid Renderers */}
          {(activeCategory === "ALL" || activeCategory === "BUILD") &&
            renderToolGrid(BUILD_TOOLS, "Build & Data Utilities", "BUILD LAYER")}

          {(activeCategory === "ALL" || activeCategory === "ENCODE") &&
            renderToolGrid(ENCODE_TOOLS, "Encoding, Hashing & Identity", "SECURITY LAYER")}

          {(activeCategory === "ALL" || activeCategory === "DESIGN") &&
            renderToolGrid(DESIGN_TOOLS, "Design, Color & Output", "DESIGN LAYER")}

          {(activeCategory === "ALL" || activeCategory === "DIAGNOSTICS") &&
            renderToolGrid(DIAGNOSTIC_TOOLS, "System Audits & Diagnostics", "DIAGNOSTIC LAYER")}
        </Container>
      </section>
    </ToolShell>
  );
}
