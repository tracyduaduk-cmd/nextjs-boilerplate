"use client";

import React from "react";
import { ProjectWithMedia } from "@/lib/projects/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WorkHero } from "./WorkHero";
import { ProjectExplorer } from "./ProjectExplorer";
import { WorkCapabilityContext } from "./WorkCapabilityContext";
import { WorkCTA } from "./WorkCTA";

interface WorkPageClientProps {
  projects: ProjectWithMedia[];
}

export const WorkPageClient: React.FC<WorkPageClientProps> = ({ projects }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <Header />

      <main id="main-content" className="flex-1">
        {/* 1. OPENING WORK STATEMENT HERO */}
        <WorkHero />

        {/* 2. ASYMMETRIC PROJECT FIELD WITH EDITORIAL FILTERS */}
        <ProjectExplorer projects={projects} />

        {/* 3. CAPABILITY / TECHNOLOGY CONTEXT */}
        <WorkCapabilityContext />

        {/* 4. START A PROJECT CTA */}
        <WorkCTA />
      </main>

      <Footer />
    </div>
  );
};
