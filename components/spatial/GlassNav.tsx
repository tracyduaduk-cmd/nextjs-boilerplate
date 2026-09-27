"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface GlassNavProps {
  activeHref?: string;
}

export const GlassNav: React.FC<GlassNavProps> = ({ activeHref }) => {
  return (
    <nav className="glass-nav">
      <Link href="/" className="flex items-center gap-2.5 font-sans font-bold text-xs tracking-widest text-white uppercase">
        <span className="grid place-items-center w-7 h-7 rounded-full border border-white/20 text-cyan-300 bg-cyan-300/10">
          <Sparkles size={14} />
        </span>
        SNOW <em className="not-italic text-slate-400 font-normal">/ STUDIO</em>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-mono text-xs text-slate-300">
        <Link href="#work" className="hover:text-cyan-300 transition-colors">Work</Link>
        <Link href="#capabilities" className="hover:text-cyan-300 transition-colors">Capabilities</Link>
        <Link href="/design-system" className={`hover:text-cyan-300 transition-colors ${activeHref === '/design-system' ? 'text-cyan-300' : ''}`}>
          Design System
        </Link>
        <Link href="#concierge" className="hover:text-cyan-300 transition-colors">Concierge</Link>
      </div>

      <a href="#contact" className="glass-button !py-2 !px-4 !text-[11px]">
        Start a project <ArrowUpRight size={14} />
      </a>
    </nav>
  );
};
