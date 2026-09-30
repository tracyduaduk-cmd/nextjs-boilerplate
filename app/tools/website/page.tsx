"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ToolShell } from "@/components/tools/ToolShell";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { Camera, FileText, FileSearch, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import { VisualSection } from "@/components/ui/VisualSection";

export default function WebsiteLabPage() {
  const tools = [
    {
      name: "Website Screenshot Generator",
      slug: "/tools/website/screenshot",
      badge: "FULL-PAGE RENDER",
      description: "High-fidelity capture of web pages across desktop, tablet, and mobile viewports.",
      icon: Camera,
      capabilities: ["Multi-viewport capture", "Full-page scrolling capture", "Cloudflare edge browser rendering", "PNG / WebP download"],
    },
    {
      name: "Website PDF Converter",
      slug: "/tools/website/pdf",
      badge: "PRINT ENGINE",
      description: "Convert any live website or web document into a clean, printable PDF artifact.",
      icon: FileText,
      capabilities: ["A4 & Letter paper formats", "Custom background printing", "CSS print media query emulation", "Isolated PDF generation"],
    },
    {
      name: "Website Inspector & Meta Diagnostic",
      slug: "/tools/website/inspect",
      badge: "DOM & META AUDIT",
      description: "Audit security headers, Open Graph media tags, canonical links, and DOM performance.",
      icon: FileSearch,
      capabilities: ["Security & HSTS header audit", "Open Graph & Twitter Card preview", "SSRF-protected request routing", "JSON metadata export"],
    },
  ];

  return (
    <ToolShell>
      <section className="pt-10 sm:pt-20 pb-8 sm:pb-16 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <SystemBadge variant="cyan" pulse>CLOUDFLARE BACKED</SystemBadge>
                <SystemBadge variant="emerald">SSRF PROTECTED</SystemBadge>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight font-sans">
                WEBSITE LAB & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  BROWSER RENDERING ENGINE.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Server-side website diagnostics, full-page screenshots, PDF generation, and DOM metadata analysis powered by Cloudflare edge workers.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  Global Edge Execution
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Zero Client Data Retention
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <ProximitySurface className="p-6 w-full max-w-md text-center space-y-3">
                <div className="w-full h-[140px] sm:h-[180px] relative flex items-center justify-center">
                  <SpatialInstrument mode="website-hub" scale={0.85} accentColor="#38bdf8" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider">
                    WEBSITE_RENDER_CORE
                  </h3>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Edge headless browser stack for automated screenshot, PDF, and DOM inspection.
                  </p>
                </div>
              </ProximitySurface>
            </div>
          </div>
        </Container>
      </section>

      <VisualSection
        eyebrow="Browser laboratory"
        title="Inspect the web as a living surface."
        description="Capture, compare, and understand responsive experiences with a visual workflow that keeps the useful result in focus."
        project="aurora-commerce"
        role="desktop"
        accent="cyan"
        compact
      />

      <section className="py-8 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <ProximitySurface key={tool.slug} className="p-6 h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <SystemBadge variant="cyan" size="sm">{tool.badge}</SystemBadge>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100">{tool.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{tool.description}</p>
                    <div className="border-t border-slate-800/80 pt-3 space-y-1.5">
                      {tool.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                          <span className="text-cyan-400 font-bold">✦</span>
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={tool.slug}
                    className="w-full text-center py-3 px-4 rounded-xl font-mono text-xs font-semibold bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-slate-200 border border-slate-700/80 transition-all flex items-center justify-center gap-2"
                  >
                    <span>LAUNCH TOOL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </ProximitySurface>
              );
            })}
          </div>
        </Container>
      </section>
    </ToolShell>
  );
}
