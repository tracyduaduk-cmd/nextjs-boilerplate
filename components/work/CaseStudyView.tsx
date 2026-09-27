"use client";

import React from "react";
import Link from "next/link";
import { ProjectWithMedia } from "@/lib/projects/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";
import { PortfolioDeviceFrame } from "@/components/work/PortfolioDeviceFrame";
import { MediaGallery } from "@/components/work/MediaGallery";
import { getPublicUrl, PortfolioProjectSlug } from "@/lib/projects/mediaManifest";

interface CaseStudyViewProps {
  project: ProjectWithMedia;
  nextProject: ProjectWithMedia;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({ project, nextProject }) => {
  const slug = project.slug as PortfolioProjectSlug;
  const heroUrl =
    project.hero_media?.url ||
    getPublicUrl(slug, "hero.webp");
  const desktopUrl =
    project.desktop_media?.url ||
    getPublicUrl(slug, "desktop.webp");
  const mobileUrl =
    project.mobile_media?.url ||
    getPublicUrl(slug, "mobile.webp");

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* 1. PROJECT OPENING & SPATIAL INSTRUMENT */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-900 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.1)_0%,transparent_70%)] pointer-events-none" />

        <Container className="relative z-10">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/work"
              className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors gap-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Selected Work</span>
            </Link>

            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
              ORIGINAL CONCEPT DEMO
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
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

            {/* Embedded Project-Specific 3D Spatial Instrument */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="w-full max-w-[280px] sm:max-w-[320px] h-[280px] sm:h-[320px] rounded-3xl bg-slate-900/40 border border-slate-800/80 p-2 shadow-2xl relative">
                <SpatialInstrument
                  mode={project.slug}
                  badgeLabel={`[ ${project.title.toUpperCase()} 3D INSTRUMENT ]`}
                  scale={0.95}
                />
              </div>
            </div>
          </div>

          {/* Opening Hero Media Device Frame */}
          <div className="mt-12">
            <PortfolioDeviceFrame
              type="browser"
              src={heroUrl}
              alt={`${project.title} Hero View`}
              title={`${project.title} Hero Surface`}
              caption={`Primary concept demonstration surface for ${project.title}`}
              urlText={`https://snow.dev/case-study/${project.slug}`}
              priority={true}
            />
          </div>
        </Container>
      </section>

      {/* 2. MULTI-DEVICE RESPONSIVE PRESENTATION */}
      <section className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/90 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
              MULTI-DEVICE INTERFACE COMPOSITION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-sans">
              Desktop & Mobile Systems.
            </h2>
            <p className="text-slate-400 text-base font-sans">
              Real WebP assets served directly from Supabase Storage bucket <code className="text-cyan-400">snow-media</code>, presented in responsive device frames.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Desktop Surface */}
            <div className="lg:col-span-8">
              <PortfolioDeviceFrame
                type="browser"
                src={desktopUrl}
                alt={`${project.title} Desktop Screenshot`}
                title="DESKTOP WORKSPACE"
                caption="Web / Dashboard Application View"
                urlText={`https://snow.dev/desktop/${project.slug}`}
              />
            </div>

            {/* Mobile Surface */}
            <div className="lg:col-span-4">
              <PortfolioDeviceFrame
                type="phone"
                src={mobileUrl}
                alt={`${project.title} Mobile Screenshot`}
                title="MOBILE APP"
                caption="Mobile Companion View"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. PROJECT CONTEXT & NARRATIVE */}
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

      {/* 4. HONEST PROVENANCE & CONCEPT DISCLOSURE */}
      <section className="py-12 border-b border-slate-900 bg-slate-900/30">
        <Container>
          <div className="p-6 rounded-2xl bg-black/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <div className="space-y-1">
              <span className="text-cyan-400 font-bold block">[ PROVENANCE DISCLOSURE ]</span>
              <p className="text-slate-300 font-sans text-xs">
                This project is an original concept interface / prototype developed internally by Snow for digital demonstration.
              </p>
            </div>
            <div className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              SUPABASE STORAGE: snow-media
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs text-slate-200 hover:border-sky-500/50 transition-colors"
                >
                  <span className="text-[10px] text-slate-500 block mb-1">DEPLOYED TECH</span>
                  <span className="font-semibold">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. FULL MEDIA SURFACE GALLERY */}
      {project.media && project.media.length > 0 && (
        <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-950">
          <Container>
            <div className="mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
                INTERFACE BREAKDOWN
              </span>
              <h2 className="text-3xl font-bold text-slate-100 font-sans">
                Canonical Storage Records
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
