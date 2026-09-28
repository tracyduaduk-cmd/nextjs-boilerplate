"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolCommandNav } from "@/components/tools/ToolCommandNav";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { Reveal } from "@/components/spatial/Reveal";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { ToolTabs } from "@/components/tools/ToolTabs";
import { AIConcierge } from "@/components/concierge/AIConcierge";
import { useCursor } from "@/components/spatial/CursorSystem";
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
  Shield,
  ArrowRight,
  Cpu,
  Lock,
  Wifi,
  Camera,
  FileSearch,
} from "lucide-react";

interface ToolItem {
  id: string;
  name: string;
  slug: string;
  badge: string;
  category: "BUILD" | "ENCODE" | "DESIGN" | "WEBSITE" | "NETWORK" | "DIAGNOSTICS";
  purpose: string;
  icon: React.ElementType;
  capabilities: string[];
  isLocalOnly?: boolean;
  isComingSoon?: boolean;
  status: "ACTIVE" | "READY" | "PREVIEW";
}

const ALL_TOOLS: ToolItem[] = [
  // BUILD UTILITIES
  {
    id: "json",
    name: "JSON Formatter & Validator",
    slug: "/tools/json",
    category: "BUILD",
    badge: "Zero Transmission",
    purpose: "Format, minify, structure, and validate raw JSON data with instant syntax error detection.",
    icon: FileCode,
    capabilities: ["Parse & indent (2, 4, 8 spaces)", "Minify JSON strings", "Key counting & payload metrics", "100% browser memory isolation"],
    isLocalOnly: true,
    status: "ACTIVE",
  },
  {
    id: "regex",
    name: "Regex Tester & Matcher",
    slug: "/tools/regex",
    category: "BUILD",
    badge: "Local Matcher",
    purpose: "Test regular expressions with flag toggles, live match highlighting, and capture group breakdown.",
    icon: Search,
    capabilities: ["Real-time match highlighting", "Flag selectors (g, i, m, s)", "Capture group breakdown", "Bounded loop evaluation"],
    isLocalOnly: true,
    status: "ACTIVE",
  },
  {
    id: "markdown",
    name: "Markdown Live Preview",
    slug: "/tools/markdown",
    category: "BUILD",
    badge: "GFM Support",
    purpose: "Write GitHub-Flavored Markdown with instant live rendered HTML document previewing and export.",
    icon: FileText,
    capabilities: ["GFM headings, tables, code blocks", "Client-side HTML sanitization", "Raw Markdown download", "Clean document copying"],
    isLocalOnly: true,
    status: "ACTIVE",
  },

  // ENCODE / SECURITY
  {
    id: "encode",
    name: "Base64 & URL Encoder",
    slug: "/tools/encode",
    category: "ENCODE",
    badge: "UTF-8 Safe",
    purpose: "Encode and decode text payloads using Base64 or URL percent-encoding safely.",
    icon: Binary,
    capabilities: ["UTF-8 safe Base64 transformation", "URL Component percent encoding", "One-click input/output swap", "Zero network transmission"],
    isLocalOnly: true,
    status: "ACTIVE",
  },
  {
    id: "uuid",
    name: "UUID v4 Generator",
    slug: "/tools/uuid",
    category: "ENCODE",
    badge: "Crypto.randomUUID()",
    purpose: "Generate cryptographically unique Version-4 UUIDs in bulk using standard Web Crypto APIs.",
    icon: Hash,
    capabilities: ["Web Crypto entropy", "Batch generation (up to 100)", "Uppercase & hyphen options", "Individual & batch copy"],
    isLocalOnly: true,
    status: "ACTIVE",
  },
  {
    id: "hash",
    name: "Web Crypto Hash",
    slug: "/tools/hash",
    category: "ENCODE",
    badge: "SHA-256 / SHA-512",
    purpose: "Compute SHA-256, SHA-384, and SHA-512 cryptographic digests locally in browser memory.",
    icon: ShieldCheck,
    capabilities: ["SHA-256, SHA-384, SHA-512", "Web Crypto Subtle API", "One-way cryptographic digest", "Zero data transmission"],
    isLocalOnly: true,
    status: "ACTIVE",
  },

  // DESIGN & OUTPUT
  {
    id: "color",
    name: "Color & Contrast Utility",
    slug: "/tools/color",
    category: "DESIGN",
    badge: "WCAG 2.1 AA/AAA",
    purpose: "Convert HEX, RGB, and HSL colors and audit foreground/background contrast compliance.",
    icon: Palette,
    capabilities: ["HEX, RGB, HSL color conversions", "WCAG AA (4.5:1) & AAA (7:1) checks", "Live typography surface preview", "Accessible contrast verdicts"],
    isLocalOnly: true,
    status: "ACTIVE",
  },
  {
    id: "qr",
    name: "Client-Side QR Generator",
    slug: "/tools/qr",
    category: "DESIGN",
    badge: "Zero Network Calls",
    purpose: "Generate high-resolution PNG QR codes directly in your browser without third-party APIs.",
    icon: QrCode,
    capabilities: ["URL, text & contact payload support", "High-res 360px PNG download", "Zero third-party endpoint tracking", "Client-side canvas rendering"],
    isLocalOnly: true,
    status: "ACTIVE",
  },

  // WEBSITE LAB (Cloudflare Browser Run)
  {
    id: "website-screenshot",
    name: "Website Screenshot Studio",
    slug: "/tools/website/screenshot",
    category: "WEBSITE",
    badge: "Cloudflare Run",
    purpose: "Capture full-page and viewport screenshots via headless Cloudflare Browser Rendering.",
    icon: Camera,
    capabilities: ["Headless Chrome rendering", "Desktop, tablet & mobile viewports", "Full-page scroll capture", "SSRF security validation"],
    isLocalOnly: false,
    status: "ACTIVE",
  },
  {
    id: "website-pdf",
    name: "Website PDF Exporter",
    slug: "/tools/website/pdf",
    category: "WEBSITE",
    badge: "Cloudflare Run",
    purpose: "Export any public URL to a clean, print-ready PDF document with background graphics.",
    icon: FileText,
    capabilities: ["A4 / Letter layout formats", "CSS print media query emulation", "Background graphics preserved", "Direct vector PDF download"],
    isLocalOnly: false,
    status: "ACTIVE",
  },
  {
    id: "website-inspect",
    name: "Website Inspector",
    slug: "/tools/website/inspect",
    category: "WEBSITE",
    badge: "Cloudflare Run",
    purpose: "Inspect meta tags, Open Graph previews, header responses, and DOM elements safely.",
    icon: FileSearch,
    capabilities: ["DOM structural inspection", "Open Graph & Twitter card previews", "HTTP response header breakdown", "Safe SSRF URL normalization"],
    isLocalOnly: false,
    status: "ACTIVE",
  },

  // NETWORK SUITE
  {
    id: "network-hub",
    name: "Network Diagnostics Hub",
    slug: "/network",
    category: "NETWORK",
    badge: "Browser APIs",
    purpose: "Full suite of client-side network diagnostics, latency measurement, and device audits.",
    icon: Wifi,
    capabilities: ["Public IP lookup", "DNS records interrogation", "Client device feature audit", "Real-time bandwidth test"],
    isLocalOnly: true,
    status: "ACTIVE",
  },

  // SYSTEM DIAGNOSTICS (COMING SOON)
  {
    id: "website-health",
    name: "Website Health Check",
    slug: "/tools/website-health",
    category: "DIAGNOSTICS",
    badge: "Preview Stage",
    purpose: "Full-spectrum diagnostic evaluating performance, mobile responsiveness, and reliability.",
    icon: Activity,
    capabilities: ["DOM render speed checks", "Mobile viewport compliance", "Accessibility signals", "Technical reliability"],
    isComingSoon: true,
    status: "PREVIEW",
  },
  {
    id: "speed",
    name: "Speed Diagnostic",
    slug: "/tools/speed",
    category: "DIAGNOSTICS",
    badge: "Preview Stage",
    purpose: "Analyze loading speed, Core Web Vitals, script overhead, and caching efficiency.",
    icon: Gauge,
    capabilities: ["Core Web Vitals (LCP, INP, CLS)", "Unoptimized asset payloads", "JavaScript blocking", "Caching headers"],
    isComingSoon: true,
    status: "PREVIEW",
  },
  {
    id: "security",
    name: "Security Headers Audit",
    slug: "/tools/security",
    category: "DIAGNOSTICS",
    badge: "Preview Stage",
    purpose: "Safely audit website security headers, SSL certificate integrity, and public exposure signals.",
    icon: Shield,
    capabilities: ["HTTPS & TLS certificate check", "Security headers (HSTS, CSP)", "Cookie security attributes", "Defensive hardening"],
    isComingSoon: true,
    status: "PREVIEW",
  },
];

type CategoryId = "ALL" | "BUILD" | "ENCODE" | "DESIGN" | "WEBSITE" | "NETWORK" | "DIAGNOSTICS";

export default function ToolsHubPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("ALL");
  const { setCursorState, resetCursorState } = useCursor();

  const filteredTools = activeCategory === "ALL"
    ? ALL_TOOLS
    : ALL_TOOLS.filter((tool) => tool.category === activeCategory);

  return (
    <ToolShell>
      {/* Interactive Snow Utility Console Hero */}
      <section className="relative pt-20 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial Header */}
            <div className="lg:col-span-7">
              <PerspectiveContainer perspective={1200} className="w-full text-left">
                <Reveal direction="up">
                  <div className="flex items-center gap-3 mb-6">
                    <SystemBadge variant="cyan" pulse>SNOW UTILITY CONSOLE</SystemBadge>
                    <SystemBadge variant="emerald">100% ISOLATED RUNTIME</SystemBadge>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.08] mb-6 font-sans">
                    INSTRUMENTS FOR <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                      TECHNICAL & SPATIAL SYSTEMS.
                    </span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-sans mb-8">
                    An integrated laboratory of browser-isolated developer utilities, network diagnostics, and Cloudflare-backed website tools.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      Client-side Web Crypto & Web Workers
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      Zero Data Retention
                    </span>
                  </div>
                </Reveal>
              </PerspectiveContainer>
            </div>

            {/* Interactive 3D Spatial Instrument Stage */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <Reveal direction="up" delay={150}>
                <ProximitySurface className="p-6 w-full max-w-md mx-auto text-center space-y-4">
                  <div
                    className="w-full h-[240px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
                    onMouseEnter={() => setCursorState("DRAG", "ROTATE 3D")}
                    onMouseLeave={resetCursorState}
                  >
                    <SpatialInstrument mode="services" scale={0.92} accentColor="#38bdf8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-200 font-mono uppercase tracking-wider">
                      SNOW_SPATIAL_CORE
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      Interactive 3D representation of active client execution and cryptographic safety.
                    </p>
                  </div>
                </ProximitySurface>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Global Tool Command Bar */}
      <ToolCommandNav />

      {/* AI Concierge Task Matcher */}
      <section className="py-10 border-b border-slate-800/80 bg-slate-950/60">
        <Container>
          <AIConcierge
            title="Need guidance on selecting an instrument?"
            subtitle="Describe your task, payload, or diagnostic requirement to receive an immediate recommendation from Snow Concierge."
          />
        </Container>
      </section>

      {/* Main Filterable Tool Modules Grid */}
      <section className="py-16">
        <Container>
          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <ToolTabs<CategoryId>
              tabs={[
                { id: "ALL", label: "All Instruments", badge: ALL_TOOLS.length },
                { id: "BUILD", label: "Build & Data", badge: ALL_TOOLS.filter((t) => t.category === "BUILD").length },
                { id: "ENCODE", label: "Encode & Crypto", badge: ALL_TOOLS.filter((t) => t.category === "ENCODE").length },
                { id: "DESIGN", label: "Design & Output", badge: ALL_TOOLS.filter((t) => t.category === "DESIGN").length },
                { id: "WEBSITE", label: "Website Lab", badge: ALL_TOOLS.filter((t) => t.category === "WEBSITE").length },
                { id: "NETWORK", label: "Network Suite", badge: ALL_TOOLS.filter((t) => t.category === "NETWORK").length },
                { id: "DIAGNOSTICS", label: "System Audits", badge: ALL_TOOLS.filter((t) => t.category === "DIAGNOSTICS").length },
              ]}
              activeTab={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Asymmetric Tool Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Reveal key={tool.id} direction="up" delay={index * 50}>
                  <ProximitySurface
                    className="h-full flex flex-col justify-between p-6 group transition-all duration-300 hover:border-cyan-500/60"
                    onMouseEnter={() => setCursorState("TOOL", "OPEN")}
                    onMouseLeave={resetCursorState}
                  >
                    <div>
                      {/* Module Top Bar */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <SystemBadge
                          variant={
                            tool.isComingSoon
                              ? "amber"
                              : tool.isLocalOnly
                              ? "cyan"
                              : "emerald"
                          }
                          size="sm"
                        >
                          {tool.badge}
                        </SystemBadge>
                      </div>

                      {/* Tool Title & Category */}
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 block mb-1">
                        {tool.category} LAYER
                      </span>
                      <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors font-sans">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-300 mb-5 leading-relaxed min-h-[36px] font-sans">
                        {tool.purpose}
                      </p>

                      {/* Capability Metadata List */}
                      <div className="border-t border-slate-800/80 pt-4 mb-6">
                        <ul className="space-y-2">
                          {tool.capabilities.map((cap) => (
                            <li key={cap} className="flex items-center text-[11px] text-slate-400 gap-2 font-mono">
                              <span className="text-cyan-400 font-bold shrink-0">✦</span>
                              <span className="truncate">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Entry CTA Action */}
                    <Link
                      href={tool.slug}
                      className={`w-full text-center py-3 px-4 rounded-xl font-mono text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                        tool.isComingSoon
                          ? "bg-slate-900/80 hover:bg-amber-950/80 text-amber-300 border-amber-800/60"
                          : "bg-slate-800/90 hover:bg-cyan-400 hover:text-slate-950 text-slate-200 border-slate-700/80 shadow-md"
                      }`}
                    >
                      <span>{tool.isComingSoon ? "PREVIEW INSTRUMENT" : "LAUNCH INSTRUMENT"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </ProximitySurface>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </ToolShell>
  );
}
