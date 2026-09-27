"use client";

import React from "react";
import Link from "next/link";
import { ProjectWithMedia } from "@/lib/projects/types";
import { SpatialMedia } from "@/components/spatial/SpatialMedia";
import { GlassSurface } from "@/components/spatial/GlassSurface";
import { Tilt } from "@/components/spatial/Tilt";
import { Reveal } from "@/components/spatial/Reveal";
import { PointerGlow } from "@/components/spatial/PointerGlow";

interface ProjectVariantProps {
  project: ProjectWithMedia;
}

/**
 * Variant 1: FEATURED SPATIAL
 * Large dominant hero media with floating offset glass metadata plane.
 * High contrast spatial layout with perspective tilt.
 */
export const FeaturedSpatialProject: React.FC<ProjectVariantProps> = ({ project }) => {
  const heroUrl = project.hero_media?.url || project.media[0]?.url || "";

  return (
    <Reveal direction="up" duration={0.8} className="w-full">
      <div className="relative group rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 md:p-10 overflow-hidden shadow-2xl hover:border-sky-500/40 transition-all duration-500">
        <PointerGlow color="rgba(56, 189, 248, 0.12)" className="rounded-3xl pointer-events-none" />

        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold tracking-wide">
              FEATURED SYSTEM #{project.sort_order.toString().padStart(2, "0")}
            </span>
            <span className="text-slate-400">• {project.category}</span>
          </div>
          <span className="font-mono text-xs text-slate-500">{project.project_type_label || "Concept System"} ({project.year})</span>
        </div>

        {/* Asymmetric Spatial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Visual Surface */}
          <div className="lg:col-span-7 relative z-10">
            <Tilt maxRotation={6} className="w-full">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl">
                <SpatialMedia
                  src={heroUrl}
                  alt={project.title}
                  title={project.title}
                  category={project.category}
                  aspectRatio="video"
                  priority={true}
                />
              </div>
            </Tilt>
          </div>

          {/* Floating Glass Metadata Panel */}
          <div className="lg:col-span-5 relative z-20 space-y-6">
            <GlassSurface intensity="heavy" elevation="floating" className="p-6 md:p-8 space-y-5">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase block mb-1">
                  ARCHITECTURAL PROFILE
                </span>
                <h3 className="text-3xl font-bold tracking-tight text-white font-sans">
                  {project.title}
                </h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                {project.summary}
              </p>

              {project.problem && (
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                    CHALLENGE SCOPE
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {project.client_name || "Internal Research"}
                </span>
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold font-mono text-xs transition-colors shadow-lg shadow-sky-500/20"
                >
                  <span>Explore Case Study</span>
                  <span>→</span>
                </Link>
              </div>
            </GlassSurface>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/**
 * Variant 2: DEVICE STACK
 * Desktop interface floating behind a responsive mobile device with true 3D z-index layering.
 */
export const DeviceStackProject: React.FC<ProjectVariantProps> = ({ project }) => {
  const desktopUrl = project.desktop_media?.url || project.hero_media?.url || "";
  const mobileUrl = project.mobile_media?.url || project.hero_media?.url || "";

  return (
    <Reveal direction="up" duration={0.8} className="w-full">
      <div className="relative group rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-10 overflow-hidden shadow-2xl hover:border-slate-700 transition-all duration-500">
        <PointerGlow color="rgba(125, 211, 252, 0.08)" className="rounded-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Metadata Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <span>SYSTEM #{project.sort_order.toString().padStart(2, "0")}</span>
              <span>•</span>
              <span className="text-sky-400">{project.category}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 font-sans">
              {project.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              {project.summary}
            </p>

            <div className="space-y-2 font-mono text-xs">
              <div className="text-slate-500 uppercase tracking-wider text-[10px]">VERIFIED OUTCOME</div>
              <p className="text-slate-300 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                &quot;{project.results}&quot;
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-900">
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 font-mono text-xs text-sky-400 hover:text-sky-300 font-semibold group/link"
              >
                <span>View Responsive Case Study</span>
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Layered Device Stack Side */}
          <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] flex items-center justify-center p-4">
            {/* Desktop Canvas (Background Layer) */}
            <div className="w-[85%] sm:w-[88%] transform -rotate-1 group-hover:rotate-0 transition-transform duration-700 shadow-2xl relative z-10 rounded-2xl overflow-hidden border border-slate-700/80">
              <SpatialMedia
                src={desktopUrl}
                alt={`${project.title} Desktop View`}
                title={`${project.title} Desktop Surface`}
                category="DESKTOP"
                aspectRatio="video"
              />
            </div>

            {/* Mobile Device (Foreground Layer Overlap) */}
            <div className="absolute right-2 sm:right-6 bottom-2 sm:bottom-4 w-[40%] sm:w-[35%] z-20 transform translate-y-2 group-hover:translate-y-0 group-hover:-rotate-1 transition-all duration-700 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden border-2 border-slate-600 bg-slate-950">
              <SpatialMedia
                src={mobileUrl}
                alt={`${project.title} Mobile View`}
                title={`${project.title} Mobile`}
                category="MOBILE"
                aspectRatio="portrait"
              />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/**
 * Variant 3: DARK LAB
 * Near-black spatial laboratory treatment with cyan/ice highlights and glass metadata panel.
 */
export const DarkLabProject: React.FC<ProjectVariantProps> = ({ project }) => {
  const heroUrl = project.hero_media?.url || project.media[0]?.url || "";

  return (
    <Reveal direction="up" duration={0.8} className="w-full">
      <div className="relative group rounded-3xl border border-sky-900/30 bg-slate-950 p-6 md:p-10 overflow-hidden shadow-2xl hover:border-sky-500/50 transition-all duration-500">
        {/* Background Lab Grid & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>LABORATORY PROTOCOL #{project.sort_order.toString().padStart(2, "0")}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs text-slate-400">
            {project.category}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7">
            <Tilt maxRotation={4} className="w-full">
              <div className="rounded-2xl overflow-hidden border border-sky-800/40 shadow-2xl shadow-sky-950/50">
                <SpatialMedia
                  src={heroUrl}
                  alt={project.title}
                  title={project.title}
                  category="LAB SPEC"
                  aspectRatio="video"
                />
              </div>
            </Tilt>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-1">
                TECHNICAL ANALYSIS
              </span>
              <h3 className="text-3xl font-bold tracking-tight text-slate-100 font-sans">
                {project.title}
              </h3>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              {project.summary}
            </p>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">ARCHITECTURAL SOLUTION</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950/60 border border-sky-800/60 text-sky-300">
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${project.slug}`}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-sky-500/40 hover:border-sky-400 text-sky-400 text-xs font-mono font-semibold transition-all hover:bg-sky-500/10"
              >
                Inspect Protocol →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/**
 * Variant 4: EDITORIAL
 * Oversized typography intersecting cropped visual media layout.
 */
export const EditorialProject: React.FC<ProjectVariantProps> = ({ project }) => {
  const desktopUrl = project.desktop_media?.url || project.hero_media?.url || "";

  return (
    <Reveal direction="up" duration={0.8} className="w-full">
      <div className="relative group rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-12 overflow-hidden hover:border-slate-700 transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6 z-10">
            <div className="font-mono text-xs text-slate-500">
              SYSTEM RECORD #{project.sort_order.toString().padStart(2, "0")} — {project.category}
            </div>

            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-100 font-sans leading-[1.05]">
              {project.title}
            </h3>

            <p className="text-base text-slate-300 leading-relaxed max-w-lg font-sans">
              {project.summary}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs font-mono transition-colors"
              >
                <span>Read Case Study</span>
                <span>→</span>
              </Link>
              <span className="text-xs font-mono text-slate-500">
                {project.project_type_label || "Platform Study"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl transform lg:rotate-1 group-hover:rotate-0 transition-transform duration-500">
              <SpatialMedia
                src={desktopUrl}
                alt={project.title}
                title={project.title}
                category="EDITORIAL"
                aspectRatio="video"
              />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/**
 * Variant 5: SPLIT PERSPECTIVE
 * Dual-plane perspective showing desktop and mobile interface interaction side-by-side.
 */
export const SplitPerspectiveProject: React.FC<ProjectVariantProps> = ({ project }) => {
  const desktopUrl = project.desktop_media?.url || project.hero_media?.url || "";
  const mobileUrl = project.mobile_media?.url || project.hero_media?.url || "";

  return (
    <Reveal direction="up" duration={0.8} className="w-full">
      <div className="relative group rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-10 overflow-hidden hover:border-slate-700 transition-all duration-500">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-sky-400 block mb-1">
              SYSTEM #{project.sort_order.toString().padStart(2, "0")} • {project.category}
            </span>
            <h3 className="text-3xl font-bold text-slate-100 font-sans">
              {project.title}
            </h3>
          </div>
          <Link
            href={`/work/${project.slug}`}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
          >
            Explore Dual View →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <SpatialMedia
              src={desktopUrl}
              alt={`${project.title} Desktop View`}
              title="Desktop View"
              category="DESKTOP VIEW"
              aspectRatio="video"
            />
          </div>

          <div className="md:col-span-4 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <SpatialMedia
              src={mobileUrl}
              alt={`${project.title} Mobile View`}
              title="Mobile View"
              category="MOBILE VIEW"
              aspectRatio="portrait"
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-400 max-w-xl font-sans">
            {project.summary}
          </p>
          <div className="flex gap-2">
            {project.technologies.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/**
 * Variant 6: MINIMAL EDITORIAL
 * Clean light architectural editorial layout with high contrast, crisp typography and elegant whitespace.
 */
export const MinimalProject: React.FC<ProjectVariantProps> = ({ project }) => {
  const heroUrl = project.hero_media?.url || project.media[0]?.url || "";

  return (
    <Reveal direction="up" duration={0.8} className="w-full">
      <div className="relative group rounded-3xl border border-slate-200/20 bg-slate-100 text-slate-950 p-6 md:p-12 overflow-hidden shadow-2xl transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="font-mono text-xs text-slate-600 uppercase tracking-wider">
              {project.category} -- RECORD #{project.sort_order.toString().padStart(2, "0")}
            </div>

            <h3 className="text-4xl font-bold tracking-tight text-slate-950 font-sans">
              {project.title}
            </h3>

            <p className="text-slate-700 text-sm leading-relaxed font-sans">
              {project.summary}
            </p>

            <div className="pt-2 border-t border-slate-300/80">
              <span className="text-[11px] font-mono text-slate-500 block mb-2">
                SCOPE & APPROACH
              </span>
              <p className="text-xs text-slate-800 leading-relaxed">
                {project.solution}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                {project.project_type_label || "Design Exploration"}
              </span>
              <Link
                href={`/work/${project.slug}`}
                className="px-4 py-2 rounded-xl bg-slate-950 text-white hover:bg-slate-800 text-xs font-mono font-semibold transition-colors"
              >
                View Study →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
              <SpatialMedia
                src={heroUrl}
                alt={project.title}
                title={project.title}
                category="STUDIO VIEW"
                aspectRatio="video"
              />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export const ProjectCompositionMapper: React.FC<ProjectVariantProps> = ({ project }) => {
  const variant = project.composition_variant || "featured";

  switch (variant) {
    case "featured":
      return <FeaturedSpatialProject project={project} />;
    case "device-stack":
      return <DeviceStackProject project={project} />;
    case "dark-lab":
      return <DarkLabProject project={project} />;
    case "editorial":
      return <EditorialProject project={project} />;
    case "split-perspective":
      return <SplitPerspectiveProject project={project} />;
    case "minimal":
      return <MinimalProject project={project} />;
    default:
      return <FeaturedSpatialProject project={project} />;
  }
};
