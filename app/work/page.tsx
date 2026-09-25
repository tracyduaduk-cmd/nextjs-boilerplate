import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { fetchProjects } from "@/lib/projects/fetchProjects";
import { WorkPageClient } from "@/components/work/WorkPageClient";

export const metadata: Metadata = {
  title: "Work & Case Studies | Snow Technology & Digital Systems",
  description:
    "Explore Snow's portfolio of web applications, e-commerce storefronts, AI workflows, digital infrastructure, and re-engineered technology systems built in Kwang, Jos.",
  openGraph: {
    title: "Work & Case Studies | Snow",
    description:
      "Interactive showcase of digital products, web applications, platforms, and technical repair systems engineered by Snow.",
  },
};

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function WorkPage() {
  const projects = await fetchProjects();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950">
      {/* Editorial Opening Section */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-3/4 max-w-5xl rounded-full bg-sky-500/10 blur-[140px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-mono text-sky-300">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span>Snow Work Archive & Case Studies</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Work that solves <span className="text-sky-400">something real.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
              We design, build, repair, and optimize modern websites, web applications,
              AI workflows, and digital infrastructure for businesses demanding precision, performance, and reliability.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-sky-400">✦</span> Based in Kwang, Jos, Nigeria
              </div>
              <div className="hidden sm:block text-slate-700">•</div>
              <div className="flex items-center gap-2">
                <span className="text-sky-400">✦</span> Production-Ready Systems
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Component handling state, filtering, explorer & project grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <WorkPageClient initialProjects={projects} />
      </section>

      {/* Internal Linking / Conversion Banner */}
      <section className="border-t border-white/10 bg-slate-900/60 py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Have a project or system that needs building or fixing?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-300">
            Whether you need a new website, custom software, an AI workflow, or emergency technical repair, our team is ready.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request"
              className="rounded-xl bg-sky-500 px-6 py-3.5 text-xs font-mono font-semibold text-slate-950 transition-all hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              Request a Technical Quote ↗
            </Link>
            <Link
              href="/#services"
              className="rounded-xl border border-white/15 bg-slate-900/80 px-6 py-3.5 text-xs font-mono font-semibold text-slate-300 transition-all hover:border-white/30 hover:text-white"
            >
              Explore Capabilities Ecosystem
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
