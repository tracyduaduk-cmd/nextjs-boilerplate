"use client";

import React from "react";
import {
  SpatialStage,
  GlassSurface,
  FloatingPanel,
  MediaStack,
  OrbitalObject,
  SpatialFrame,
  EditorialMedia,
  GlassNav,
} from "@/components/spatial";
import { getPublicUrl } from "@/lib/projects/mediaManifest";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  Layers,
  Compass,
  LayoutGrid,
} from "lucide-react";

export default function DesignSystemPlaygroundPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-[#f8fafc] font-sans selection:bg-cyan-400 selection:text-black">
      {/* Floating Glass Navigation */}
      <GlassNav activeHref="/design-system" />

      {/* Hero / Introduction Stage */}
      <SpatialStage theme="dark" className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-300/30 bg-cyan-300/10 text-[10px] font-mono tracking-widest text-cyan-200 uppercase w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
            SNOW SPATIAL DESIGN SYSTEM v1.0
          </div>

          <h1 className="text-6xl md:text-8xl font-normal tracking-tighter leading-[0.88] text-white">
            SPATIAL <br />
            <span className="text-slate-500">ARCHITECTURE.</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-light max-w-xl leading-relaxed">
            Phase A Visual Architecture Playground. Demonstrating structural spatial depth, art-directed editorial stages, material glass surfaces, and canonical Supabase media integration.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs text-slate-400">
            <span className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
              PRIMARY: Snow White / Near-Black
            </span>
            <span className="px-3 py-1.5 rounded-lg border border-cyan-400/20 text-cyan-300 bg-cyan-400/5">
              ACCENT: Ice Cyan #A5F3FC
            </span>
            <span className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
              TYPOGRAPHY: Geist Sans + Geist Mono
            </span>
          </div>
        </div>
      </SpatialStage>

      {/* Section 1: Dark Spatial Stage vs. Light Editorial Stage Contrast */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-mono uppercase tracking-wider text-slate-300 flex items-center gap-3">
            <LayoutGrid size={18} className="text-cyan-300" />
            1. Stage Atmosphere & Surface Contrast
          </h2>
          <span className="font-mono text-xs text-slate-500 uppercase">LIGHT / DARK PAIRING</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6">
          {/* Dark Spatial Stage */}
          <SpatialStage theme="dark" className="rounded-2xl border border-white/15 p-8 md:p-12 min-h-[420px] flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-cyan-300 tracking-widest uppercase block mb-3">
                [STAGE 01] / DARK SPATIAL STAGE
              </span>
              <h3 className="text-4xl md:text-5xl font-normal tracking-tight leading-none text-white mb-4">
                Deep Spatial <br />
                <span className="text-slate-500">Immersion.</span>
              </h3>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Graphite surfaces, radial lighting glimmers, floating translucent cards, and technical crosshairs create cinematic depth without SaaS visual clutter.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6 font-mono text-xs text-slate-400">
              <span>BG: #08090B</span>
              <span className="text-cyan-300">SYSTEM NOMINAL</span>
            </div>
          </SpatialStage>

          {/* Light Editorial Stage */}
          <SpatialStage theme="light" className="rounded-2xl border border-slate-300 p-8 md:p-12 min-h-[420px] flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-slate-600 tracking-widest uppercase block mb-3">
                [STAGE 02] / LIGHT EDITORIAL STAGE
              </span>
              <h3 className="text-4xl md:text-5xl font-normal tracking-tight leading-none text-[#09090b] mb-4">
                Architectural <br />
                <span className="text-slate-400">Purity.</span>
              </h3>
              <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
                Light off-white surfaces (#F5F5F7) act as visual breathing room between deep dark spatial sections, offering crisp typography contrast and editorial gravity.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-300 pt-6 font-mono text-xs text-slate-600">
              <span>BG: #F5F5F7</span>
              <span>EDITORIAL PAUSE</span>
            </div>
          </SpatialStage>
        </div>
      </section>

      {/* Section 2: Reusable Glass Material System */}
      <section className="py-16 border-t border-white/10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-mono uppercase tracking-wider text-slate-300 flex items-center gap-3">
            <Layers size={18} className="text-cyan-300" />
            2. Reusable Glass Materials
          </h2>
          <span className="font-mono text-xs text-slate-500 uppercase">TRANSLUCENT SURFACES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
          {/* GlassSurface Subtle */}
          <GlassSurface intensity="subtle" className="p-8 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase block mb-2">
                MATERIAL 01 // SUBTLE GLASS
              </span>
              <h4 className="text-xl font-bold text-white mb-2">Subtle Backdrop Blur</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Light translucent surface with subtle 10% white background and minimal specular edge highlight.
              </p>
            </div>
            <div className="font-mono text-[10px] text-slate-500 uppercase">blur(12px) · opacity(0.04)</div>
          </GlassSurface>

          {/* GlassSurface Medium */}
          <GlassSurface intensity="medium" className="p-8 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="font-mono text-[10px] text-cyan-300 tracking-widest uppercase block mb-2">
                MATERIAL 02 // MEDIUM PANEL
              </span>
              <h4 className="text-xl font-bold text-white mb-2">Controlled Glass Panel</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Primary structural glass with top 1px white specular border, inset directional shadow, and subtle internal glow.
              </p>
            </div>
            <div className="font-mono text-[10px] text-cyan-300 uppercase">blur(24px) · specular line</div>
          </GlassSurface>

          {/* FloatingPanel */}
          <FloatingPanel badgeText="INTERACTIVE SURFACE" className="p-8 flex flex-col justify-between min-h-[260px]">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Floating Glass Surface</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Elevated surface with spring-like hover response, glowing border highlight, and dark spatial depth shadow.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-300 uppercase pt-4">
              <span>HOVER DEPTH +8PX</span>
              <ArrowUpRight size={14} />
            </div>
          </FloatingPanel>
        </div>
      </section>

      {/* Section 3: Structural 3D Hero & Spatial Object Composition */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
          <h2 className="text-2xl font-mono uppercase tracking-wider text-slate-300 flex items-center gap-3">
            <Compass size={18} className="text-cyan-300" />
            3. Structural 3D Composition & Perspective
          </h2>
          <span className="font-mono text-xs text-slate-500 uppercase">3D DEPTH vs FLAT TILT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-6 items-center">
          {/* Spatial Frame Console */}
          <div className="lg:col-span-7">
            <SpatialFrame title="SNOW_OS / SPATIAL EXECUTION ENGINE" statusText="STATIONARY STAGE">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block">
                      CORE PRINCIPLE
                    </span>
                    <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
                      3D MUST BE STRUCTURAL.
                    </h3>
                  </div>
                  <Sparkles size={24} className="text-cyan-300 opacity-80" />
                </div>

                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  Instead of wrapping standard rectangular cards in generic 3D tilt library wrappers, Snow constructs real spatial depth through foreground floating UI, middle-layer perspective device frames, background grids, and interactive orbital glass spheres.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                  <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                    <span className="text-cyan-300 block mb-1">✓ FOREGROUND</span>
                    <span className="text-slate-400 text-[11px]">Floating glass controls & badges</span>
                  </div>
                  <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                    <span className="text-cyan-300 block mb-1">✓ PERSPECTIVE</span>
                    <span className="text-slate-400 text-[11px]">Rotated CSS 3D device surfaces</span>
                  </div>
                </div>
              </div>
            </SpatialFrame>
          </div>

          {/* 3D Glass Orbital Object Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/60 to-slate-950 relative overflow-hidden min-h-[360px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />
            <OrbitalObject size={220} glowColor="#a5f3fc" />
            <span className="font-mono text-xs text-cyan-200 tracking-widest uppercase mt-6">
              ORBITAL GLASS OBJECT
            </span>
          </div>
        </div>
      </section>

      {/* Section 4: Art-Directed Canonical Supabase Media Architecture */}
      <section className="py-20 border-t border-white/10 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
          <h2 className="text-2xl font-mono uppercase tracking-wider text-slate-300 flex items-center gap-3">
            <Sparkles size={18} className="text-cyan-300" />
            4. Canonical Supabase Media Architecture
          </h2>
          <span className="font-mono text-xs text-slate-500 uppercase">8 PROJECTS × 3 ROLES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-6">
          {/* Project 1: Aurora Commerce */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest block">
                  01 / E-COMMERCE
                </span>
                <h3 className="text-2xl font-bold text-white">AURORA COMMERCE</h3>
              </div>
              <span className="font-mono text-xs text-slate-400">SUPABASE BUCKET</span>
            </div>

            <MediaStack
              title="Aurora Commerce"
              category="E-commerce"
              heroUrl={getPublicUrl("aurora-commerce", "hero.webp")}
              desktopUrl={getPublicUrl("aurora-commerce", "desktop.webp")}
              mobileUrl={getPublicUrl("aurora-commerce", "mobile.webp")}
            />
          </div>

          {/* Project 2: Pulse Health */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest block">
                  02 / HEALTHCARE
                </span>
                <h3 className="text-2xl font-bold text-white">PULSE HEALTH</h3>
              </div>
              <span className="font-mono text-xs text-slate-400">SUPABASE BUCKET</span>
            </div>

            <MediaStack
              title="Pulse Health"
              category="Healthcare"
              heroUrl={getPublicUrl("pulse-health", "hero.webp")}
              desktopUrl={getPublicUrl("pulse-health", "desktop.webp")}
              mobileUrl={getPublicUrl("pulse-health", "mobile.webp")}
            />
          </div>
        </div>
      </section>

      {/* Section 5: Asymmetric Editorial Composition & Typography Scale */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
          <h2 className="text-2xl font-mono uppercase tracking-wider text-slate-300 flex items-center gap-3">
            <Code2 size={18} className="text-cyan-300" />
            5. Asymmetric Editorial Layouts & Typography
          </h2>
          <span className="font-mono text-xs text-slate-500 uppercase">NON-GRID COMPOSITION</span>
        </div>

        {/* Asymmetric 7/5 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-6 items-end">
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs text-cyan-300 tracking-widest uppercase">
              {/* TYPOGRAPHY SCALE DEMO */}
              TYPOGRAPHY SCALE DEMO
            </div>
            <h2 className="text-6xl md:text-8xl font-normal tracking-tighter leading-[0.85] text-white">
              OVERSIZED <br />
              <span className="text-slate-600">HEADLINES.</span>
            </h2>
            <p className="text-slate-300 text-lg font-light leading-relaxed max-w-xl">
              Snow avoids standard 16px/24px card copy density. Typography acts as structural artwork on the page before visual media even loads.
            </p>
          </div>

          <div className="lg:col-span-5">
            <EditorialMedia
              src={getPublicUrl("nova-ai-assistant", "hero.webp")}
              alt="Nova AI Assistant"
              caption="Neural execution pipeline preview image."
              kicker="CANONICAL ASSET // NOVA AI"
            />
          </div>
        </div>
      </section>

      {/* Footer System Verification */}
      <footer className="border-t border-white/10 py-12 bg-slate-950 font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
            SNOW SPATIAL DESIGN SYSTEM // PHASE A VERIFIED
          </div>
          <div>SUPABASE BUCKET: snow-media (24 OBJECTS LOADED)</div>
        </div>
      </footer>
    </main>
  );
}
