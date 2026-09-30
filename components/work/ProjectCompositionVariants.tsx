"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectWithMedia } from "@/lib/projects/types";
import { PortfolioDeviceFrame } from "@/components/work/PortfolioDeviceFrame";
import { Reveal } from "@/components/spatial/Reveal";
import { getLocalPublicUrl, PortfolioProjectSlug } from "@/lib/projects/mediaManifest";

interface ProjectVariantProps {
  project: ProjectWithMedia;
}

function mediaUrl(project: ProjectWithMedia, role: "hero" | "desktop" | "mobile") {
  const slug = project.slug as PortfolioProjectSlug;
  const record = role === "hero" ? project.hero_media : role === "desktop" ? project.desktop_media : project.mobile_media;
  return record?.url || getLocalPublicUrl(slug, `${role}.webp`);
}

function ProjectMeta({ project, dark = false }: ProjectVariantProps & { dark?: boolean }) {
  const ink = dark ? "text-white" : "text-slate-950";
  const muted = dark ? "text-white/60" : "text-slate-500";
  return (
    <div className={`grid grid-cols-2 gap-x-5 gap-y-4 border-t ${dark ? "border-white/15" : "border-slate-950/15"} pt-5 font-mono text-[10px] uppercase tracking-[0.16em] ${muted}`}>
      <div><span className="mb-1 block opacity-60">Category</span><span className={ink}>{project.category}</span></div>
      <div><span className="mb-1 block opacity-60">Year</span><span className={ink}>{project.year || "Concept"}</span></div>
      <div className="col-span-2"><span className="mb-2 block opacity-60">Technology / context</span><div className="flex flex-wrap gap-2 normal-case tracking-normal">{project.technologies.slice(0, 5).map((technology) => <span key={technology} className={`rounded-full border px-2.5 py-1 ${dark ? "border-white/15 text-white/75" : "border-slate-950/15 text-slate-600"}`}>{technology}</span>)}</div></div>
    </div>
  );
}

function ProjectLink({ project, dark = false, label = "Explore study" }: ProjectVariantProps & { dark?: boolean; label?: string }) {
  return <Link href={`/work/${project.slug}`} className={`group/link inline-flex min-h-11 items-center gap-3 rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${dark ? "bg-white text-slate-950" : "bg-slate-950 text-white"}`}>{label}<span aria-hidden="true" className="text-base transition-transform group-hover/link:translate-x-1">↗</span></Link>;
}

function BrowserStage({ project, priority = false, className = "" }: ProjectVariantProps & { priority?: boolean; className?: string }) {
  return <div className={className}><PortfolioDeviceFrame type="browser" src={mediaUrl(project, "desktop")} alt={`${project.title} desktop interface concept`} title={project.title} priority={priority} showUrlBar={false} /></div>;
}

function ProjectEyebrow({ project, dark = false, number }: ProjectVariantProps & { dark?: boolean; number: string }) {
  return <div className={`flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[.18em] ${dark ? "text-cyan-300" : "text-cyan-700"}`}><span className={`inline-flex h-7 items-center rounded-full px-3 ${dark ? "bg-cyan-300/10" : "bg-cyan-100"}`}>Project {number}</span><span className={dark ? "text-white/55" : "text-slate-500"}>{project.category}</span></div>;
}

/** Shared case-study presentation used by every project variant. */
export const PremiumProjectFrame: React.FC<ProjectVariantProps & { variant?: "featured" | "stack" | "dark" | "editorial" | "split" | "minimal" }> = ({ project, variant = "featured" }) => {
  const mobile = mediaUrl(project, "mobile");
  const number = project.sort_order.toString().padStart(2, "0");
  if (variant === "dark") return <Reveal className="w-full"><article className="portfolio-project portfolio-project-dark relative overflow-hidden rounded-[2rem] bg-[#101927] p-5 text-white shadow-[0_28px_80px_rgba(15,23,42,.18)] sm:p-8 lg:p-12"><div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" /><div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,.7fr)] lg:items-end lg:gap-14"><div className="order-2 lg:order-1"><BrowserStage project={project} priority={project.sort_order === 1} /></div><div className="order-1 space-y-6 lg:order-2"><ProjectEyebrow project={project} dark number={number} /><h3 className="max-w-[10ch] text-4xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl">{project.title}</h3><p className="max-w-md text-base leading-relaxed text-white/70">{project.summary}</p><ProjectMeta project={project} dark /><ProjectLink project={project} dark label="Open project" /></div></div></article></Reveal>;
  if (variant === "split" || variant === "stack") return <Reveal className="w-full"><article className="portfolio-project relative overflow-hidden rounded-[2rem] border border-slate-950/10 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,.1)] sm:p-8 lg:p-12"><div className={`grid gap-8 lg:grid-cols-12 lg:items-center ${variant === "stack" ? "" : "lg:gap-14"}`}><div className={`relative min-w-0 lg:col-span-7 ${variant === "stack" ? "lg:order-2" : ""}`}><BrowserStage project={project} priority={project.sort_order === 1} /><div className="absolute -bottom-8 right-0 w-[27%] min-w-[88px] max-w-[180px] sm:-bottom-12 sm:right-4"><PortfolioDeviceFrame type="phone" src={mobile} alt={`${project.title} mobile interface concept`} title="Mobile view" showUrlBar={false} interactive={false} /></div></div><div className={`space-y-6 lg:col-span-5 ${variant === "stack" ? "lg:order-1" : ""}`}><ProjectEyebrow project={project} number={number} /><h3 className="max-w-[11ch] text-4xl font-semibold leading-[.95] tracking-[-.06em] text-slate-950 sm:text-6xl">{project.title}</h3><p className="max-w-md text-base leading-relaxed text-slate-600">{project.summary}</p><ProjectMeta project={project} /><ProjectLink project={project} /></div></div></article></Reveal>;
  const hero = mediaUrl(project, "hero");
  return <Reveal className="w-full"><article className={`portfolio-project relative overflow-hidden rounded-[2rem] border border-slate-950/10 p-5 shadow-[0_24px_70px_rgba(15,23,42,.1)] sm:p-8 lg:p-12 ${variant === "minimal" ? "bg-[#dff8f1]" : "bg-white"}`}><div className="mb-8 flex flex-wrap items-start justify-between gap-4"><ProjectEyebrow project={project} number={number} /><span className="rounded-full border border-slate-950/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-slate-500">Concept study</span></div><div className="relative"><div className="relative aspect-[16/8] overflow-hidden rounded-[1.4rem] bg-slate-100 shadow-[0_24px_60px_rgba(15,23,42,.14)]"><Image src={hero} alt={`${project.title} interface concept hero`} fill priority={project.sort_order === 1} loading={project.sort_order === 1 ? "eager" : "lazy"} sizes="(max-width: 768px) 100vw, 1100px" className="object-cover" /></div><div className="relative z-10 -mt-10 ml-4 max-w-xl rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,.14)] backdrop-blur sm:ml-10 sm:p-7"><h3 className="text-3xl font-semibold leading-none tracking-[-.05em] text-slate-950 sm:text-5xl">{project.title}</h3><p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{project.summary}</p><div className="mt-6"><ProjectLink project={project} /></div></div></div><div className="mt-8 max-w-2xl"><ProjectMeta project={project} /></div></article></Reveal>;
};

export const FeaturedSpatialProject: React.FC<ProjectVariantProps> = ({ project }) => <PremiumProjectFrame project={project} variant="featured" />;
export const DeviceStackProject: React.FC<ProjectVariantProps> = ({ project }) => <PremiumProjectFrame project={project} variant="stack" />;
export const DarkLabProject: React.FC<ProjectVariantProps> = ({ project }) => <PremiumProjectFrame project={project} variant="dark" />;
export const EditorialProject: React.FC<ProjectVariantProps> = ({ project }) => <PremiumProjectFrame project={project} variant="editorial" />;
export const SplitPerspectiveProject: React.FC<ProjectVariantProps> = ({ project }) => <PremiumProjectFrame project={project} variant="split" />;
export const MinimalProject: React.FC<ProjectVariantProps> = ({ project }) => <PremiumProjectFrame project={project} variant="minimal" />;

export const ProjectCompositionMapper: React.FC<ProjectVariantProps> = ({ project }) => {
  switch (project.composition_variant) {
    case "device-stack": return <DeviceStackProject project={project} />;
    case "dark-lab": return <DarkLabProject project={project} />;
    case "editorial": return <EditorialProject project={project} />;
    case "split-perspective": return <SplitPerspectiveProject project={project} />;
    case "minimal": return <MinimalProject project={project} />;
    default: return <FeaturedSpatialProject project={project} />;
  }
};
