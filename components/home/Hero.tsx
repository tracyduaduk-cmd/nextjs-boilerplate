"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Terminal, Activity, Layers, Cpu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThreeHeroCanvas } from "@/components/spatial/ThreeHeroCanvas";
import { GlassSurface } from "@/components/spatial/GlassSurface";
import { Magnetic } from "@/components/spatial/Magnetic";
import { Reveal } from "@/components/spatial/Reveal";
import { SplitText } from "@/components/spatial/SplitText";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { getPublicUrl } from "@/lib/projects/mediaManifest";

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const pointer = usePointerPosition(heroRef);

  // Canonical Supabase project asset anchor
  const projectDesktopImage = getPublicUrl("orbit-finance", "desktop.webp");
  const projectMobileImage = getPublicUrl("orbit-finance", "mobile.webp");

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-28 sm:pt-36 pb-20 overflow-hidden bg-[#07090e] border-b border-slate-900/80 text-slate-100"
      aria-label="Snow Hero Section"
    >
      {/* ---------------- BACKGROUND LAYER ---------------- */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Ambient Ice Cyan Lighting Field */}
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),rgba(14,165,233,0.04)_50%,transparent_70%)] blur-3xl"
          style={{
            transform: `translate(-50%, ${pointer.yNormalized * -20}px) scale(${1 + Math.abs(pointer.xNormalized) * 0.05})`,
          }}
        />

        {/* Spatial Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_60%,transparent_100%)] opacity-80" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ---------------- LEFT COLUMN: EDITORIAL TYPOGRAPHY & IDENTITY ---------------- */}
          <div className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-8 z-20">

            {/* Technical Studio Eyebrow Metadata */}
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 w-fit backdrop-blur-md shadow-lg shadow-black/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
                </span>
                <span className="font-bold text-sky-300 tracking-wider">SNOW</span>
                <span className="text-slate-600">//</span>
                <span className="text-slate-400">EDITORIAL TECHNOLOGY STUDIO</span>
              </div>
            </Reveal>

            {/* Dominant Oversized Headline */}
            <div className="space-y-2">
              <SplitText
                text="BUILD DIGITAL"
                className="text-4xl sm:text-6xl lg:text-[4.8rem] font-black tracking-tight text-white leading-[0.92] uppercase font-sans"
                delay={0.15}
                stagger={0.03}
              />
              <SplitText
                text="EXPERIENCES"
                className="text-4xl sm:text-6xl lg:text-[4.8rem] font-black tracking-tight text-sky-400 leading-[0.92] uppercase font-sans"
                delay={0.25}
                stagger={0.03}
              />
              <SplitText
                text="THAT MOVE."
                className="text-4xl sm:text-6xl lg:text-[4.8rem] font-black tracking-tight text-slate-400 leading-[0.92] uppercase font-sans"
                delay={0.35}
                stagger={0.03}
              />
            </div>

            {/* One-Glance Value Proposition Subtext */}
            <Reveal direction="up" delay={0.45}>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                Snow is an independent technology studio engineering spatial Web platforms, high-throughput applications, and bespoke digital infrastructure.
              </p>
            </Reveal>

            {/* Call to Action Actions */}
            <Reveal direction="up" delay={0.55}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Magnetic intensity={14}>
                  <Button
                    href="/request"
                    variant="primary"
                    size="lg"
                    className="group !rounded-full shadow-lg shadow-sky-500/20"
                  >
                    <span>START A PROJECT</span>
                    <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </Magnetic>

                <Magnetic intensity={10}>
                  <Button
                    href="/work"
                    variant="secondary"
                    size="lg"
                    className="!rounded-full border-slate-700/80 text-slate-200 hover:text-white"
                  >
                    EXPLORE WORK
                  </Button>
                </Magnetic>
              </div>
            </Reveal>

            {/* Editorial Metadata Footer Row */}
            <Reveal direction="up" delay={0.65}>
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-slate-400 tracking-wider">
                <div className="flex items-center gap-4">
                  <span>SNOW / SYSTEM 01</span>
                  <span className="text-slate-600">•</span>
                  <span>LAGOS / GLOBAL</span>
                </div>
                <div className="flex items-center gap-2 text-sky-400 font-semibold">
                  <Activity size={12} />
                  <span>ALL SYSTEMS NOMINAL</span>
                </div>
              </div>
            </Reveal>

          </div>

          {/* ---------------- RIGHT COLUMN: 3D SPATIAL ART-DIRECTED COMPOSITION ---------------- */}
          <div className="lg:col-span-6 relative flex items-center justify-center mt-6 lg:mt-0">

            {/* MIDGROUND LAYER 1: WebGL 3D Glass Sculpture Scene */}
            <div
              className="absolute inset-0 z-0 flex items-center justify-center opacity-90 transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${pointer.xNormalized * 15}px, ${pointer.yNormalized * 15}px, 0)`,
              }}
            >
              <ThreeHeroCanvas mousePosition={{ x: pointer.xNormalized, y: pointer.yNormalized }} />
            </div>

            {/* MIDGROUND LAYER 2: Canonical Supabase Project Interface Surface */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 12, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 10, rotateY: -12 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1200px) rotateX(${10 - pointer.yNormalized * 8}deg) rotateY(${-12 + pointer.xNormalized * 8}deg)`,
              }}
              className="relative z-10 w-full max-w-lg rounded-2xl border border-white/20 bg-slate-900/80 p-2 shadow-2xl shadow-black/80 backdrop-blur-xl group"
            >
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-800">
                <Image
                  src={projectDesktopImage}
                  alt="Orbit Finance Spatial Interface Anchor"
                  fill
                  unoptimized
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Project Anchor Header Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono text-sky-300 backdrop-blur-md flex items-center gap-1.5">
                    <Layers size={12} className="text-sky-400" />
                    <span>ORBIT FINANCE / CASE STUDY</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    LIVE SYSTEM
                  </span>
                </div>
              </div>

              {/* Mobile Anchor Preview Overlay Surface */}
              <div
                className="hidden sm:block absolute -bottom-6 -right-6 z-20 w-36 aspect-[9/16] rounded-xl border border-white/25 bg-slate-950/90 shadow-2xl overflow-hidden p-1 backdrop-blur-md transition-transform duration-500 hover:scale-105"
                style={{
                  transform: `translate3d(${pointer.xNormalized * -12}px, ${pointer.yNormalized * -12}px, 20px)`,
                }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-800">
                  <Image
                    src={projectMobileImage}
                    alt="Orbit Finance Mobile Experience"
                    fill
                    unoptimized
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 text-[8px] font-mono text-sky-300 font-bold">
                    MOBILE OS
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FOREGROUND LAYER 3: Floating Glass Technical Console Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              style={{
                transform: `translate3d(${pointer.xNormalized * -25}px, ${pointer.yNormalized * -25}px, 40px)`,
              }}
              className="absolute -bottom-8 -left-2 sm:left-4 z-30"
            >
              <GlassSurface
                intensity="heavy"
                elevation="floating"
                className="p-4 sm:p-5 rounded-2xl border-white/25 shadow-2xl backdrop-blur-2xl max-w-[260px] sm:max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300">
                    <Terminal size={18} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-sky-400 font-bold tracking-wider uppercase">
                      SNOW_OS / ACTIVE
                    </div>
                    <div className="font-sans font-bold text-xs sm:text-sm text-white mt-0.5">
                      Sub-100ms Latency Engine
                    </div>
                  </div>
                </div>
                <p className="mt-2.5 text-[11px] font-mono text-slate-300 leading-normal border-t border-slate-800/80 pt-2">
                  Spatial architecture designed for high-density visual performance.
                </p>
              </GlassSurface>
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
};
