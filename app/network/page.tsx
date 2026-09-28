"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import {
  Globe,
  Wifi,
  Laptop,
  Gauge,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";

const NETWORK_TOOLS = [
  {
    id: "dns",
    name: "DNS Lookup",
    slug: "/network/dns",
    badge: "Cloudflare DoH",
    purpose: "Query domain DNS records (A, AAAA, MX, TXT, CNAME, NS) directly using public DNS-over-HTTPS.",
    icon: Globe,
    highlights: ["A, AAAA, MX, TXT, CNAME, NS records", "Cloudflare DoH JSON integration", "Copy individual or full JSON results", "Zero telemetry tracking"],
  },
  {
    id: "ip",
    name: "Public IP & Network Info",
    slug: "/network/ip",
    badge: "IPv4 / IPv6",
    purpose: "Inspect your public IP address, ISP / Organization, ASN, and approximate geographic region.",
    icon: Wifi,
    highlights: ["Dual-stack IPv4 & IPv6 detection", "Approximate region & ASN details", "Clear privacy & non-tracking guarantee", "Zero database retention"],
  },
  {
    id: "device",
    name: "Device & Browser Diagnostics",
    slug: "/network/device",
    badge: "100% Local",
    purpose: "Evaluate local browser capabilities, screen viewport, hardware cores, Network API, and WebGL context.",
    icon: Laptop,
    highlights: ["Logical CPU cores & device memory", "Network Information API details", "WebGL renderer & unmasked vendor", "Honest 'Not exposed' fallbacks"],
  },
  {
    id: "speed",
    name: "Connection & Speed Diagnostic",
    slug: "/network/speed",
    badge: "Latency & Throughput",
    purpose: "Measure round-trip ping latency, jitter, effective connection type, and controlled download speed.",
    icon: Gauge,
    highlights: ["HTTP ping round-trip latency & jitter", "Network API effective type & downlink", "Controlled user-initiated download test", "Explicit speed disclaimers"],
  },
];

export default function NetworkLandingPage() {
  return (
    <ToolShell>
      <ToolHeader
        title="Network Diagnostics"
        description="Understand what your connection is doing. Practical, privacy-first network and browser diagnostic tools built for engineers, operators, and web users."
        category="NETWORK LAYER"
        badge="Privacy Preserving"
        status="engine-ready"
        statusMessage="Network Diagnostic Layer Active"
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        {/* System Flow Diagram Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/80 uppercase">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              SYSTEM DIAGNOSTIC ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Practical connection analysis with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">zero tracking.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Snow's Network Diagnostics suite gives you direct visibility into domain resolution, IP routing, client environment specs, and network performance. Every tool executes directly in your browser or queries transparent, public DNS endpoints without logging or storing your personal network footprint.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">Zero Data Retention</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    IP addresses, fingerprints, and test results are never saved to Snow's database.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">Transparent Resolvers</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Uses Cloudflare DNS-over-HTTPS and standard Web APIs with minimal data exposure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ToolVisualStage
              visualType="network"
              mode="services"
              statusLabel="NETWORK LAYER ACTIVE"
              metricLabel="DIAGNOSTIC SUITE"
              metricValue="4 UTILITIES"
              accentColor="#38bdf8"
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">Browser Network Pipeline</p>
                <p className="text-slate-400 leading-relaxed">
                  Sequentially verify connectivity from client device, through DNS resolution, to public network endpoints.
                </p>
              </div>
            </ToolVisualStage>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mb-16">
          <div className="mb-8 border-b border-slate-800/80 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">DIAGNOSTIC UTILITIES</span>
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Available Network Tools</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">4 ACTIVE UTILITIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NETWORK_TOOLS.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Reveal key={tool.id} direction="up" delay={index * 80}>
                  <Tilt maxRotation={3} className="h-full">
                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-700/80 transition-all h-full flex flex-col justify-between group shadow-xl">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-xl bg-sky-950/80 border border-sky-800/60 text-sky-400 group-hover:scale-105 transition-transform">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-mono uppercase font-semibold px-2.5 py-1 rounded-full border bg-sky-950/80 text-sky-400 border-sky-800/60">
                            {tool.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-sky-300 transition-colors font-sans">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                          {tool.purpose}
                        </p>

                        <div className="border-t border-slate-800/80 pt-4 mb-6">
                          <ul className="space-y-2">
                            {tool.highlights.map((item) => (
                              <li key={item} className="flex items-center text-[11px] text-slate-400 gap-2 font-mono">
                                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Link
                        href={tool.slug}
                        className="w-full text-center py-3 px-4 rounded-xl font-mono text-xs font-semibold bg-slate-800 hover:bg-sky-400 hover:text-slate-950 text-slate-200 border border-slate-700/80 transition-all flex items-center justify-center gap-2"
                      >
                        <span>LAUNCH TOOL</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Technical Recommendation */}
        <ToolRecommendation
          serviceName="Infrastructure & Application Engineering"
          serviceSlug="app-care"
          serviceDescription="Experiencing DNS propagation issues, network latency, or CDN routing bottlenecks? Snow provides dedicated technical engineering to optimize global infrastructure performance."
          careCategorySlug="app-care"
        />
      </Container>
    </ToolShell>
  );
}
