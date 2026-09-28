"use client";

import React from "react";
import { GlassNav } from "@/components/spatial/GlassNav";
import { Footer } from "@/components/layout/Footer";

export interface ToolShellProps {
  children: React.ReactNode;
}

export const ToolShell: React.FC<ToolShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-400 selection:text-slate-950 flex flex-col justify-between">
      <GlassNav activeHref="/tools" />
      <main className="flex-1 pb-12 sm:pb-24 pt-12 sm:pt-16">{children}</main>
      <Footer />
    </div>
  );
};
