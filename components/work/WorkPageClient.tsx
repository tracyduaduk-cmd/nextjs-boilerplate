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
    <div className="work-page flex flex-col min-h-screen bg-[#f7f6f2] text-slate-950 font-sans selection:bg-cyan-300 selection:text-slate-950">
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
