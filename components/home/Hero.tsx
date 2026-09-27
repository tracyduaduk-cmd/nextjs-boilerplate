"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { Tilt } from "@/components/spatial/Tilt";
import { Magnetic } from "@/components/spatial/Magnetic";
import { DepthLayer } from "@/components/spatial/DepthLayer";
import { PointerGlow } from "@/components/spatial/PointerGlow";
import { SplitText } from "@/components/spatial/SplitText";
import { Reveal } from "@/components/spatial/Reveal";
import { heroMediaConfig, InteractiveModeConfig } from "@/config/hero-media";
import { motionTokens } from "@/motion/tokens";
import { Terminal, Cpu, ShieldCheck, Activity, ArrowUpRight, Zap, Sparkles, Layers } from "lucide-react";

export const Hero: React.FC = () => {
  const [activeModeId, setActiveModeId] = useState<"telemetry" | "ai" | "architecture">("telemetry");
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>("m1");
  const heroSectionRef = useRef<HTMLElement>(null);

  const activeMode: InteractiveModeConfig =
    heroMediaConfig.consoleModes.find((m) => m.id === activeModeId) || heroMediaConfig.consoleModes[0];

  const activeMetric =
    activeMode.metrics.find((m) => m.id === selectedMetricId) || activeMode.metrics[0];

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-[90vh] flex items-center pt-8 sm:pt-16 pb-20 sm:pb-28 overflow-hidden bg-[#07090e] border-b border-slate-900/80 text-slate-100"
    >
      {/* Background Spatial Ambient Light & Grid Texture */}
      <PointerGlow color="rgba(56, 189, 248, 0.12)" size={600} />

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(56,189,248,0.1),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Grid Pattern with Spatial Perspective */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full">
        <PerspectiveContainer perspective={1400} className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* LEFT COLUMN: Editorial Typography & Spatial Controls */}
            <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">

              {/* Eyebrow Status Tag */}
              <Reveal direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 text-xs font-mono text-slate-300 w-fit backdrop-blur-md shadow-lg shadow-sky-950/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
                  </span>
                  <span className="font-semibold text-slate-200 tracking-wider">
                    {heroMediaConfig.eyebrow.brandName}
                  </span>
                  <span className="text-slate-700">•</span>
                  <span className="text-sky-400 font-medium">
                    {heroMediaConfig.eyebrow.statusBadge}
                  </span>
                  <span className="text-slate-700 hidden sm:inline">•</span>
                  <span className="text-slate-400 hidden sm:inline">
                    {heroMediaConfig.eyebrow.roleTag}
                  </span>
                </div>
              </Reveal>

              {/* Oversized Cinematic Typography */}
              <div className="space-y-3">
                <SplitText
                  text={heroMediaConfig.headline}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] font-extrabold tracking-tight text-slate-100 font-sans leading-[1.08]"
                  delay={0.15}
                  stagger={0.03}
                />
              </div>

              {/* Value Proposition Subtext */}
              <Reveal direction="up" delay={0.4}>
                <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl font-normal">
                  {heroMediaConfig.subheadline}
                </p>
              </Reveal>

              {/* Spatial Interactive Action Area */}
              <Reveal direction="up" delay={0.5}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Magnetic intensity={15}>
                    <Button href={heroMediaConfig.cta.primary.href} variant="primary" size="lg" className="group">
                      <span>{heroMediaConfig.cta.primary.text}</span>
                      <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </Magnetic>

                  <Magnetic intensity={12}>
                    <Button href={heroMediaConfig.cta.secondary.href} variant="secondary" size="lg">
                      {heroMediaConfig.cta.secondary.text}
                    </Button>
                  </Magnetic>
                </div>
              </Reveal>

              {/* Capabilities Pills with Spatial Hover */}
              <Reveal direction="up" delay={0.6}>
                <div className="pt-6 border-t border-slate-900/90 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-slate-400 font-medium">
                  <span className="text-slate-500 font-mono text-[10px] tracking-wider uppercase mr-1">
                    ENGINEERING FOCUS:
                  </span>
                  {heroMediaConfig.capabilities.map((cap, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.2 rounded-md bg-slate-900/80 border border-slate-800/80 text-slate-300 font-mono text-[11px] hover:border-sky-500/40 hover:text-sky-300 transition-colors cursor-default"
                    >
                      {cap}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: 3D Spatial Interactive Console */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              {/* Background Parallax Depth Layer with High-Resolution 3D Render Asset */}
              <DepthLayer depth={-0.3} zDistance={-40} className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-sky-500/10 via-indigo-500/5 to-transparent blur-2xl opacity-60" />
              </DepthLayer>

              {/* Main Interactive Console Container */}
              <Tilt maxRotation={7} scaleOnHover={1.01} className="w-full">
                <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800/90 p-5 sm:p-7 shadow-2xl shadow-sky-950/30 backdrop-blur-xl group overflow-hidden">

                  {/* 3D Visual Asset Header Banner */}
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-5 border border-slate-800/80">
                    <Image
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                      alt="3D Spatial Mesh Engine Render"
                      fill
                      unoptimized
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-sky-400 backdrop-blur-sm flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-sky-400" />
                      <span>3D SPATIAL ENGINE v4.2</span>
                    </div>
                  </div>

                  {/* Console Header Tabs */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>

                    {/* Mode Selector Tabs */}
                    <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModeId("telemetry");
                          setSelectedMetricId("m1");
                        }}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          activeModeId === "telemetry"
                            ? "bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Activity className="w-3.5 h-3.5 inline mr-1" />
                        Telemetry
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveModeId("ai");
                          setSelectedMetricId("a1");
                        }}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          activeModeId === "ai"
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Cpu className="w-3.5 h-3.5 inline mr-1" />
                        AI Engine
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveModeId("architecture");
                          setSelectedMetricId("c1");
                        }}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          activeModeId === "architecture"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                        Audits
                      </button>
                    </div>
                  </div>

                  {/* Mode Tagline */}
                  <div className="pt-4 pb-2">
                    <p className="text-xs font-mono text-slate-400 flex items-center justify-between">
                      <span>{`// ${activeMode.title}`}</span>
                      <span className="text-[10px] text-sky-400/80">CLICK CARDS TO INSPECT</span>
                    </p>
                    <p className="text-xs text-slate-300 mt-1 font-sans">{activeMode.tagline}</p>
                  </div>

                  {/* Interactive Metric Cards */}
                  <div className="mt-3 space-y-3 font-mono text-xs">
                    <AnimatePresence mode="wait">
                      {activeMode.metrics.map((metric) => {
                        const isSelected = selectedMetricId === metric.id;

                        return (
                          <motion.div
                            key={metric.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: motionTokens.duration.fast }}
                            onClick={() => setSelectedMetricId(metric.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-slate-900 border-sky-500/50 shadow-md shadow-sky-950/50"
                                : "bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700/80"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`p-2 rounded-lg ${
                                    metric.accentColor === "sky"
                                      ? "bg-sky-500/10 text-sky-400"
                                      : metric.accentColor === "indigo"
                                      ? "bg-indigo-500/10 text-indigo-400"
                                      : "bg-emerald-500/10 text-emerald-400"
                                  }`}
                                >
                                  {metric.id.startsWith("m") ? (
                                    <Terminal className="w-4 h-4" />
                                  ) : metric.id.startsWith("a") ? (
                                    <Sparkles className="w-4 h-4" />
                                  ) : (
                                    <Zap className="w-4 h-4" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-slate-200 font-sans font-semibold text-xs sm:text-sm">
                                    {metric.label}
                                  </div>
                                  <div className="text-slate-400 text-[11px]">{metric.value}</div>
                                </div>
                              </div>

                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                                  metric.accentColor === "sky"
                                    ? "text-sky-300 bg-sky-500/10 border-sky-500/20"
                                    : metric.accentColor === "indigo"
                                    ? "text-indigo-300 bg-indigo-500/10 border-indigo-500/20"
                                    : "text-emerald-300 bg-emerald-500/10 border-emerald-500/20"
                                }`}
                              >
                                {metric.badge}
                              </span>
                            </div>

                            {/* Expanded Technical Inspection View */}
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: motionTokens.duration.fast }}
                                className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] space-y-2 overflow-hidden"
                              >
                                <p className="text-slate-300 font-sans leading-relaxed">
                                  {metric.description}
                                </p>
                                <div className="p-2 rounded bg-slate-950 border border-slate-800/90 text-sky-300/90 text-[10px] overflow-x-auto font-mono">
                                  <code>{metric.codeSnippet}</code>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Console Interactive Footer Details */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      SNOW CORE ENGINE • READY
                    </span>
                    <span className="text-slate-400">STATE: {activeMetric?.status.toUpperCase()}</span>
                  </div>
                </div>
              </Tilt>

              {/* Foreground Floating Spatial Badge */}
              <DepthLayer depth={0.4} zDistance={30} className="hidden sm:block absolute -bottom-6 -left-6 z-20">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-xl backdrop-blur-md flex items-center gap-3 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold">Sub-100ms Target</div>
                    <div className="text-slate-500 text-[10px]">Zero Unnecessary Re-renders</div>
                  </div>
                </div>
              </DepthLayer>
            </div>

          </div>
        </PerspectiveContainer>
      </Container>
    </section>
  );
};
