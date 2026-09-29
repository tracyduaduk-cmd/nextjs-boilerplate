"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Binary,
  Cpu,
  Lock,
  ArrowRight,
  Braces,
  QrCode,
  Hash,
  Globe,
  Globe2,
  FileText,
  Search,
  Palette,
  Camera,
  Shield,
  Activity,
  Zap,
} from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolCommandNav } from "@/components/tools/ToolCommandNav";
import { ToolTabs } from "@/components/tools/ToolTabs";
import { AIConcierge } from "@/components/concierge/AIConcierge";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { Reveal } from "@/components/spatial/Reveal";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { Container } from "@/components/ui/Container";
import { SiteAssetImage } from "@/components/ui/SiteAssetImage";
import { useCursor } from "@/components/spatial/CursorSystem";

interface ToolModuleMeta {
  id: string;
  slug: string;
  name: string;
  category: "BUILD" | "ENCODE" | "DESIGN" | "WEBSITE" | "NETWORK" | "DIAGNOSTICS";
  badge: string;
  isLocalOnly: boolean;
  purpose: string;
  icon: React.ComponentType<{ className?: string }>;
  capabilities: string[];
  isComingSoon?: boolean;
  status?: string;
  pageKey?: string;
  slotKey?: string;
  imageUrl?: string;
}

const ALL_TOOLS: ToolModuleMeta[] = [
  {
    id: "json",
    slug: "/tools/json",
    name: "JSON Formatter & Validator",
    category: "BUILD",
    badge: "Browser Runtime",
    isLocalOnly: true,
    purpose: "Format, minify, structure, and validate complex JSON data payloads with zero server transmission.",
    icon: Braces,
    capabilities: ["Prettify & Minify", "Syntax error detection & line highlights", "Key-count metadata & depth check", "Local JSON download"],
    pageKey: "tools_json",
    slotKey: "visual_stage",
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-code.png",
  },
  {
    id: "encode",
    slug: "/tools/encode",
    name: "Base64 & URL Encoder / Decoder",
    category: "ENCODE",
    badge: "Client Crypto",
    isLocalOnly: true,
    purpose: "Safely encode and decode strings, binary representations, and URL parameters with full UTF-8 support.",
    icon: Binary,
    capabilities: ["Standard & URL-safe Base64", "URL component encoding / decoding", "Hexadecimal representation", "Instant copy and validation"],
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-developer.png",
  },
  {
    id: "uuid",
    slug: "/tools/uuid",
    name: "UUID v4 & Sequential Generator",
    category: "ENCODE",
    badge: "Crypto CSPRNG",
    isLocalOnly: true,
    purpose: "Generate cryptographically strong Version 4 and sequential UUID identifiers for database records.",
    icon: Hash,
    capabilities: ["RFC 4122 compliant UUIDs", "Bulk generation (up to 1,000 IDs)", "Uppercase / lowercase / no-hyphen formats", "Collision-free CSPRNG entropy"],
  },
  {
    id: "hash",
    slug: "/tools/hash",
    name: "Web Crypto Hash Calculator",
    category: "ENCODE",
    badge: "WebCrypto API",
    isLocalOnly: true,
    purpose: "Compute SHA-256, SHA-512, SHA-384, SHA-1, and MD5 hashes directly in window crypto memory.",
    icon: Lock,
    capabilities: ["SHA-256, SHA-512, SHA-384, SHA-1", "Real-time key hashing", "Salt & HMAC string calculation", "File checksum hash verification"],
  },
  {
    id: "regex",
    slug: "/tools/regex",
    name: "Interactive Regex Matcher",
    category: "DESIGN",
    badge: "Client Engine",
    isLocalOnly: true,
    purpose: "Evaluate regular expressions, capture groups, substitution parameters, and flags in real-time.",
    icon: Search,
    capabilities: ["Full ECMAScript Regex engine", "Interactive group capture highlighting", "Live string replacement test", "Common pattern cheat library"],
    pageKey: "tools_regex",
    slotKey: "visual_stage",
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-design-tools.png",
  },
  {
    id: "markdown",
    slug: "/tools/markdown",
    name: "Live Markdown Editor & Preview",
    category: "DESIGN",
    badge: "Marked.js",
    isLocalOnly: true,
    purpose: "Write, preview, and export clean Markdown document files with live HTML rendering.",
    icon: FileText,
    capabilities: ["GitHub Flavored Markdown (GFM)", "Synchronized split-screen preview", "Raw HTML export & copy", "Word, character & read-time metrics"],
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-digital-design.png",
  },
  {
    id: "color",
    slug: "/tools/color",
    name: "Color Matrix & Contrast Inspector",
    category: "DESIGN",
    badge: "WCAG 2.1",
    isLocalOnly: true,
    purpose: "Convert HEX, RGB, HSL color models and verify WCAG AAA / AA accessibility contrast compliance ratios.",
    icon: Palette,
    capabilities: ["HEX, RGB, HSL, HSB conversions", "WCAG 2.1 Contrast Ratio verification", "Color palette generation", "Perceptual brightness analysis"],
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-design-tools.png",
  },
  {
    id: "qr",
    slug: "/tools/qr",
    name: "Client-Side QR Code Generator",
    category: "ENCODE",
    badge: "Client Canvas",
    isLocalOnly: true,
    purpose: "Generate vector SVG and high-resolution PNG QR codes for URLs, Wi-Fi keys, and vCards.",
    icon: QrCode,
    capabilities: ["Custom foreground / background colors", "Error correction levels (L, M, Q, H)", "PNG & SVG vector export", "Zero external API dependency"],
    pageKey: "tools_qr",
    slotKey: "visual_stage",
  },
  {
    id: "website-screenshot",
    slug: "/tools/website/screenshot",
    name: "Website Capture & Device Preview",
    category: "WEBSITE",
    badge: "Cloudflare Edge",
    isLocalOnly: false,
    purpose: "Capture full-page desktop and mobile viewport screenshots of any public URL via isolated worker nodes.",
    icon: Camera,
    capabilities: ["Desktop (1920x1080) & Mobile (390x844)", "Full-page scroll screenshot capture", "High-DPI WebP & PNG output", "Real viewport rendering verification"],
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-website-builder.png",
  },
  {
    id: "dns",
    slug: "/network/dns",
    name: "DNS over HTTPS Diagnostic Query",
    category: "NETWORK",
    badge: "Cloudflare DoH",
    isLocalOnly: false,
    purpose: "Query global authoritative DNS servers for A, AAAA, CNAME, MX, TXT, and NS records via DoH protocol.",
    icon: Globe,
    capabilities: ["A, AAAA, CNAME, MX, TXT, NS records", "Cloudflare & Google DoH query nodes", "TTL & propagation status check", "RAW JSON DNS response inspection"],
    pageKey: "network_dns",
    slotKey: "visual_stage",
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-network-diagnostics.png",
  },
  {
    id: "telecom",
    slug: "/telecom",
    name: "Nigerian Telecom Directory & USSD Matrix",
    category: "NETWORK",
    badge: "NCC Harmonized",
    isLocalOnly: true,
    purpose: "Interactive directory of NCC harmonized USSD codes, operator prefixes, and service diagnostic flows.",
    icon: Zap,
    capabilities: ["MTN, Airtel, Glo, 9mobile USSD matrix", "Harmonized codes (*310#, *312#, *303#)", "Operator prefix lookup & SIM check", "Direct diagnostic service handoff"],
    pageKey: "telecom_hub",
    slotKey: "hero_pipeline",
  },
  {
    id: "ip",
    slug: "/network/ip",
    name: "IP Address & ASN Route Inspector",
    category: "NETWORK",
    badge: "Network Audit",
    isLocalOnly: false,
    purpose: "Inspect client and host public IP addresses, ASN allocations, BGP routing paths, and reverse DNS.",
    icon: Globe2,
    capabilities: ["IPv4 & IPv6 address detection", "ASN allocation & ISP details", "BGP route verification", "Reverse PTR DNS lookup"],
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-network-diagnostics.png",
  },
  {
    id: "device",
    slug: "/network/device",
    name: "Device & Browser Engine Inspector",
    category: "DIAGNOSTICS",
    badge: "Browser Hardware",
    isLocalOnly: true,
    purpose: "Inspect browser capabilities, GPU renderer, viewport bounds, hardware concurrency, and touch support.",
    icon: Activity,
    capabilities: ["WebGL / GPU renderer detection", "Hardware CPU thread concurrency", "Screen DPR & color depth", "Touch & gesture capability check"],
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-tech-monitor.png",
  },
  {
    id: "security",
    slug: "/tools/security-check",
    name: "HTTP Security Header Inspector",
    category: "DIAGNOSTICS",
    badge: "Preview Instrument",
    isLocalOnly: false,
    purpose: "Audit security headers, SSL certificate integrity, and public exposure signals.",
    icon: Shield,
    capabilities: ["HTTPS & TLS certificate check", "Security headers (HSTS, CSP)", "Cookie security attributes", "Defensive hardening"],
    isComingSoon: true,
    status: "PREVIEW",
    imageUrl: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-tech-monitor.png",
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
      <section className="relative pt-8 sm:pt-16 pb-8 sm:pb-12 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Editorial Header */}
            <div className="lg:col-span-7">
              <PerspectiveContainer perspective={1200} className="w-full text-left">
                <Reveal direction="up">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <SystemBadge variant="cyan" pulse>SNOW UTILITY CONSOLE</SystemBadge>
                    <SystemBadge variant="emerald">100% ISOLATED RUNTIME</SystemBadge>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.08] mb-4 font-sans">
                    INSTRUMENTS FOR <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                      TECHNICAL & SPATIAL SYSTEMS.
                    </span>
                  </h1>

                  <p className="text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans mb-6">
                    An integrated laboratory of browser-isolated developer utilities, network diagnostics, and Cloudflare-backed website tools.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      Client-side Web Crypto & Web Workers
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      Zero Data Retention
                    </span>
                  </div>
                </Reveal>
              </PerspectiveContainer>
            </div>

            {/* Interactive 3D Spatial Instrument / Central Visual Stage */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <Reveal direction="up" delay={150}>
                <ProximitySurface className="p-4 sm:p-5 w-full max-w-md mx-auto text-center space-y-3">
                  <SiteAssetImage
                    pageKey="tools_hub"
                    slotKey="hero_spatial_core"
                    priority
                    fallbackComponent={
                      <div
                        className="w-full h-[160px] sm:h-[200px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
                        onMouseEnter={() => setCursorState("DRAG", "ROTATE 3D")}
                        onMouseLeave={resetCursorState}
                      >
                        <SpatialInstrument mode="services" scale={0.92} accentColor="#38bdf8" />
                      </div>
                    }
                  />
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider">
                      SNOW_SPATIAL_CORE
                    </h3>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Interactive representation of client execution and cryptographic safety.
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
      <section className="py-6 sm:py-8 border-b border-slate-800/80 bg-slate-950/60">
        <Container>
          <AIConcierge
            title="Need guidance on selecting an instrument?"
            subtitle="Describe your task, payload, or diagnostic requirement to receive an immediate recommendation from Snow Concierge."
          />
        </Container>
      </section>

      {/* Main Filterable Tool Modules Grid */}
      <section className="py-8 sm:py-12">
        <Container>
          {/* Category Tabs */}
          <div className="flex justify-center mb-6 sm:mb-10 overflow-x-auto pb-2 scrollbar-none">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Reveal key={tool.id} direction="up" delay={index * 40}>
                  <ProximitySurface
                    className="h-full flex flex-col justify-between p-5 sm:p-6 group transition-all duration-300 hover:border-cyan-500/60"
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

                      {/* Tool Asset Preview (DB SiteAsset or General Storage Image) */}
                      {tool.pageKey && tool.slotKey ? (
                        <div className="mb-4">
                          <SiteAssetImage pageKey={tool.pageKey} slotKey={tool.slotKey} />
                        </div>
                      ) : tool.imageUrl ? (
                        <div className="mb-4 relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-slate-800/80">
                          <Image
                            src={tool.imageUrl}
                            alt={`${tool.name} visual preview`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : null}

                      {/* Tool Title & Category */}
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 block mb-1">
                        {tool.category} LAYER
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors font-sans">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-300 mb-4 leading-relaxed font-sans">
                        {tool.purpose}
                      </p>

                      {/* Capability Metadata List */}
                      <div className="border-t border-slate-800/80 pt-3.5 mb-5">
                        <ul className="space-y-1.5">
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
                      className={`w-full text-center py-2.5 sm:py-3 px-4 rounded-xl font-mono text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
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
