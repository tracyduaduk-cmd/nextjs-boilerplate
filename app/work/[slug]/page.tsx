import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchProjects, fetchProjectBySlug } from "@/lib/projects/fetchProjects";
import { ProjectMediaDisplay } from "@/components/work/ProjectMediaDisplay";
import { BeforeAfterSlider } from "@/components/work/BeforeAfterSlider";
import { ProjectNavigation } from "@/components/work/ProjectNavigation";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { Tilt } from "@/components/spatial/Tilt";
import { Reveal } from "@/components/spatial/Reveal";
import { HoverScale } from "@/components/spatial/HoverScale";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Snow",
    };
  }

  return {
    title: `${project.title} — Case Study | Snow`,
    description: project.summary || `Detailed engineering case study for ${project.title}.`,
    openGraph: {
      title: `${project.title} — Case Study | Snow`,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const allProjects = await fetchProjects();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const mediaList = project.media || [];
  const heroMedia =
    mediaList.find((m) => m.media_type === "image" || m.media_type === "screenshot") ||
    mediaList[0];

  const galleryMedia = mediaList.filter((m) => m.id !== heroMedia?.id);

  // Check if we have media items suitable for Before/After
  const hasBeforeAfter =
    mediaList.length >= 2 &&
    mediaList.some(
      (m) =>
        m.title?.toLowerCase().includes("before") ||
        m.alt_text?.toLowerCase().includes("before")
    );

  const beforeMedia = mediaList.find(
    (m) =>
      m.title?.toLowerCase().includes("before") ||
      m.alt_text?.toLowerCase().includes("before")
  );
  const afterMedia = mediaList.find(
    (m) =>
      m.title?.toLowerCase().includes("after") ||
      m.alt_text?.toLowerCase().includes("after") ||
      (m.id !== beforeMedia?.id && beforeMedia !== undefined)
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950">
      {/* 1. Case Study Header */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-3/4 max-w-5xl rounded-full bg-sky-500/10 blur-[140px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-sky-400">
              <Link href="/work" className="hover:underline flex items-center gap-1">
                ← Back to Work
              </Link>
              <span>/</span>
              <span>{project.category}</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 max-w-3xl text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
              {project.summary}
            </p>
          </Reveal>

          {/* Quick Meta Stats Grid */}
          <Reveal delay={300}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8 text-xs font-mono">
              <div>
                <span className="text-slate-500 uppercase block mb-1">Client / Origin</span>
                <span className="text-slate-200 font-semibold">{project.client_name || "Snow Concept Lab"}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block mb-1">Category</span>
                <span className="text-sky-300 font-semibold">{project.category}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block mb-1">Year</span>
                <span className="text-slate-200 font-semibold">{project.year || 2026}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block mb-1">Live URL</span>
                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline font-semibold"
                  >
                    Visit Live Site ↗
                  </a>
                ) : (
                  <span className="text-slate-500">Not Available</span>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Hero Visual Showcase */}
      {heroMedia && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <PerspectiveContainer perspective={1200} className="w-full">
            <Tilt maxRotation={4} scaleOnHover={1.01}>
              <ProjectMediaDisplay
                media={heroMedia}
                priority
                aspectRatio="wide"
                showCaption
              />
            </Tilt>
          </PerspectiveContainer>
        </section>
      )}

      {/* 3. Editorial Challenge & Solution Sections */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Problem / Challenge */}
          {project.problem && (
            <div className="md:col-span-6 space-y-4 rounded-2xl border border-white/10 bg-slate-900/40 p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                The Challenge
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Core Problem Statement
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {/* Solution / Delivery */}
          {project.solution && (
            <div className="md:col-span-6 space-y-4 rounded-2xl border border-white/10 bg-slate-900/40 p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                The Snow Solution
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Engineering & Delivery
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}
        </div>

        {/* Detailed Description if available */}
        {project.description && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-8 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-widest">
              System Architecture & Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* Technologies & Capabilities Involved */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Technology Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-sky-500/10 border border-sky-400/20 px-3 py-1 text-xs font-mono text-sky-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Results (Only displayed when real results data exists and isn't empty) */}
          {project.results && (
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Measured Impact & Verification
              </h4>
              <p className="text-sm text-slate-200 font-mono">
                {project.results}
              </p>
            </div>
          )}
        </div>

        {/* Before / After Slider (Only displayed if valid before & after media exist) */}
        {hasBeforeAfter && beforeMedia && afterMedia && (
          <div className="space-y-6 pt-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block">
                Interactive Transformation
              </span>
              <h2 className="text-2xl font-bold text-white">
                Before & After Comparison
              </h2>
            </div>

            <BeforeAfterSlider
              beforeUrl={beforeMedia.url}
              afterUrl={afterMedia.url}
              beforeAlt={beforeMedia.alt_text || "Before"}
              afterAlt={afterMedia.alt_text || "After"}
            />
          </div>
        )}

        {/* 4. Media Gallery */}
        {galleryMedia.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-white/10">
            <div className="space-y-2">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block">
                Visual Documentation
              </span>
              <h2 className="text-2xl font-bold text-white">
                Interface Gallery & Previews
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {galleryMedia.map((m) => (
                <ProjectMediaDisplay
                  key={m.id}
                  media={m}
                  aspectRatio="wide"
                  showCaption
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 5. Phase 4 Conversion CTA */}
      <section className="border-t border-white/10 bg-slate-900/80 py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
            Start a Similar Initiative
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Have something similar to build or repair?
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300">
            Let Snow&apos;s engineering team evaluate your requirements, run a technical diagnostic, and deliver a clear quote.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <HoverScale scale={1.03}>
              <Link
                href="/request"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-8 py-4 text-xs font-mono font-bold text-slate-950 transition-all hover:bg-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.3)]"
              >
                Request a Service Quote ↗
              </Link>
            </HoverScale>

            <Link
              href="/#services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900 px-6 py-4 text-xs font-mono font-semibold text-slate-300 transition-all hover:border-white/30 hover:text-white"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Spatial Project Navigation */}
      <ProjectNavigation currentProject={project} projects={allProjects} />
    </main>
  );
}
