"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export interface ToolShellProps {
  children: React.ReactNode;
}

export const ToolShell: React.FC<ToolShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950 flex flex-col justify-between">
      <Header />
      <main className="flex-1 pb-20">{children}</main>
      <Footer />
    </div>
  );
};
