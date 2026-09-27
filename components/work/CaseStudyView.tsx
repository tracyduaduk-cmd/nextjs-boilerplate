"use client";

import React from "react";
import Link from "next/link";
import { ProjectWithMedia } from "@/lib/projects/types";
import { Container } from "@/components/ui/Container";
import { SpatialMedia } from "@/components/spatial/SpatialMedia";
import { GlassSurface } from "@/components/spatial/GlassSurface";
import { Tilt } from "@/components/spatial/Tilt";
import { Reveal } from "@/components/spatial/Reveal";
import { PointerGlow } from "@/components/spatial/PointerGlow";
import { MediaGallery } from "@/components/work/MediaGallery";

interface CaseStudyViewProps {
  project: ProjectWithMedia;
  nextProject: ProjectWithMedia;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({ project, nextProject }) => {
  const heroUrl = project.hero_media?.url || project.media[0]?.url || "";
  const desktopUrl = project.desktop_media?.url || heroUrl;
  const mobileUrl = project.mobile_media?.url || heroUrl;

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* 1. PROJECT OPENING */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-900 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.1)_0%,transparent_70%)] pointer-events-none" />

        <Container className="relative z-10">
          <div className="mb-8">
            <Link
              href="/work"
              className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors gap-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Selected Work</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-6">
              <Reveal direction="down">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold tracking-wider">
                    SYSTEM #{project.sort_order.toString().padStart(2, "0")}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {project.category}
                  </span>
                  <span className="text-slate-500">
                    {project.project_type_label || "Concept Study"} ({project.year})
                  </span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 font-sans leading-[1.02]">
                  {project.title}
                </h1>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-lg sm:text-2xl text-slate-300 font-sans font-light leading-relaxed max-w-3xl">
                  {project.summary}
                </p>
              </Reveal>

              {project.client_name && (
                <Reveal direction="up" delay={0.3}>
                  <div className="pt-2 text-xs font-mono text-slate-400">
                    CLASSIFICATION / CONTEXT: <span className="text-slate-200">{project.client_name}</span>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Header Metadata Glass Panel */}
            <div className="lg:col-span-4">
              <GlassSurface intensity="heavy" elevation="raised" className="p-6 space-y-4">
                <div className="font-mono text-xs text-sky-400 uppercase tracking-widest">
                  SYSTEM SPECIFICATION
                </div>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-500">Domain</span>
                    <span>{project.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-500">Type</span>
                    <span>{project.project_type_label || "Digital Product"}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-500">Media Assets</span>
                    <span className="text-sky-400">3 Roles (Canonical)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Latency</span>
                    <span className="text-emerald-400">&lt; 100ms</span>
                  </div>
                </div>
              </GlassSurface>
            </div>
          </div>

          {/* Opening Hero Media */}
          <div className="mt-12">
            <Tilt maxRotation={3} className="w-full">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <SpatialMedia
                  src={heroUrl}
                  alt={`${project.title} Primary View`}
                  title={project.title}
                  category="PRIMARY HERO VIEW"
                  aspectRatio="video"
                  priority={true}
                />
              </div>
            </Tilt>
          </div>
        </Container>
      </section>

      {/* 2. SPATIAL MEDIA MOMENT (Multi-Layer Depth) */}
      <section className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/90 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
              SPATIAL MEDIA COMPOSITION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-sans">
              Layered Interface Depth.
            </h2>
            <p className="text-slate-400 text-base">
              Desktop and mobile surfaces rendered with physical z-index spatial hierarchy to demonstrate responsive layout adaptation.
            </p>
          </div>

          <div className="relative min-h-[420px] sm:min-h-[520px] rounded-3xl bg-slate-900/40 border border-slate-800/80 p-6 sm:p-12 flex items-center justify-center overflow-hidden">
            <PointerGlow color="rgba(56, 189, 248, 0.15)" className="rounded-3xl" />

            {/* Desktop Surface Layer */}
            <div className="w-[88%] sm:w-[82%] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative z-10">
              <SpatialMedia
                src={desktopUrl}
                alt={`${project.title} Desktop View`}
                title="Desktop Environment View"
                category="DESKTOP ENVIRONMENT"
                aspectRatio="video"
              />
            </div>

            {/* Mobile Surface Overlay Layer */}
            <div className="absolute right-4 sm:right-12 bottom-4 sm:bottom-8 w-[42%] sm:w-[32%] z-20 rounded-2xl overflow-hidden border-2 border-slate-600 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              <SpatialMedia
                src={mobileUrl}
                alt={`${project.title} Mobile View`}
                title="Mobile Interface View"
                category="MOBILE INTERFACE"
                aspectRatio="portrait"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. PROJECT CONTEXT & CHALLENGE */}
      <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-950">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {project.problem && (
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-rose-400 block">
                  THE CHALLENGE
                </span>
                <h3 className="text-2xl font-bold text-slate-100 font-sans">
                  System Context & Problem
                </h3>
                <p className="text-slate-300 text-base leading-relaxed font-sans">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
                  ARCHITECTURAL SOLUTION
                </span>
                <h3 className="text-2xl font-bold text-slate-100 font-sans">
                  Delivered Implementation
                </h3>
                <p className="text-slate-300 text-base leading-relaxed font-sans">
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          {project.results && (
            <div className="mt-10 p-8 rounded-2xl bg-sky-950/30 border border-sky-800/50 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
                VERIFIED STUDY OUTCOME
              </span>
              <p className="text-lg font-semibold text-slate-100 font-sans">
                {project.results}
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* 4. APPROACH */}
      <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-950">
        <Container>
          <div className="max-w-4xl space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
                METHODOLOGY & CRAFT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 font-sans">
                Engineering & Design Approach
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-sky-400 uppercase">01 // FRONTEND ARCHITECTURE</span>
                <h4 className="text-lg font-bold text-slate-200">Responsive Spatial Hierarchy</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Constructed with atomic Next.js components, fluid CSS grid spatial layering, and sub-100ms interaction feedback loops.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-emerald-400 uppercase">02 // DATA & MEDIA PIPELINE</span>
                <h4 className="text-lg font-bold text-slate-200">Canonical Storage Delivery</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Assets delivered directly via Supabase snow-media bucket using webp compression and priority-based eager loading.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. TECHNOLOGY STACK */}
      <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-950">
        <Container>
          <div className="max-w-4xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-lime-300 block">
              STACK COMPOSITION
            </span>
            <h2 className="text-3xl font-bold text-slate-100 font-sans">
              Technologies & Infrastructure
            </h2>
            <p className="text-slate-400 text-sm">
              Core technologies utilized in building this system study:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs text-slate-200 hover:border-sky-500/50 transition-colors"
                >
                  <span className="text-[10px] text-slate-500 block mb-1">TECH DEPLOYMENT</span>
                  <span className="font-semibold">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. RESPONSIVE / PRODUCT GALLERY */}
      {project.media && project.media.length > 0 && (
        <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-950">
          <Container>
            <div className="mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
                INTERFACE BREAKDOWN
              </span>
              <h2 className="text-3xl font-bold text-slate-100 font-sans">
                Full Media Surface Record
              </h2>
            </div>

            <MediaGallery mediaItems={project.media} projectTitle={project.title} />
          </Container>
        </section>
      )}

      {/* 7. RELATED SERVICE CTA */}
      <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-900">
        <Container>
          <div className="max-w-4xl mx-auto p-8 sm:p-14 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6 shadow-2xl backdrop-blur-md">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
              CAPABILITY ENGAGEMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight font-sans">
              Building a system like {project.title}?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-sans">
              Snow provides custom software development, web applications, and technical infrastructure hardening matching this architectural profile.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href={`/request?service=${project.related_service_slug || "custom-software-web-apps"}`}
                className="px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold font-mono text-sm transition-all shadow-xl shadow-sky-500/20"
              >
                Request Service Specification →
              </Link>
              <Link
                href="/work"
                className="px-8 py-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-mono text-sm transition-colors"
              >
                Explore Selected Work
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. NEXT PROJECT TRANSITION */}
      {nextProject && (
        <section className="py-16 md:py-24 bg-slate-950">
          <Container>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group block p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-sky-500/50 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-2">
                    NEXT SYSTEM RECORD → #{nextProject.sort_order.toString().padStart(2, "0")}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-bold text-slate-100 font-sans group-hover:text-sky-300 transition-colors">
                    {nextProject.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 font-sans line-clamp-1">
                    {nextProject.summary}
                  </p>
                </div>

                <div className="shrink-0 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 font-mono text-xs font-bold group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                  Next Case Study →
                </div>
              </div>
            </Link>
          </Container>
        </section>
      )}
    </article>
  );
};
