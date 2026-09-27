"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

interface GlassNavProps {
  className?: string;
  activeHref?: string;
}

export const GlassNav: React.FC<GlassNavProps> = ({ className = "", activeHref }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavLinks = [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/work" },
    { label: "Care", href: "/care" },
    { label: "Tools", href: "/tools" },
  ];

  return (
    <>
      <header className={`fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none ${className}`}>
        <nav
          aria-label="Global Spatial Navigation"
          className="pointer-events-auto relative w-full max-w-5xl flex items-center justify-between p-2 pl-4 sm:pl-5 rounded-full border border-slate-700/60 bg-slate-950/70 backdrop-blur-2xl shadow-2xl shadow-black/80 transition-all duration-300 hover:border-slate-600/80"
        >
          {/* Brand Identity Section */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-full"
            >
              <span className="grid place-items-center w-8 h-8 rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-300 group-hover:scale-105 group-hover:border-sky-400/60 transition-all">
                <Sparkles size={15} />
              </span>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-xs tracking-widest text-white uppercase flex items-center gap-1.5">
                  SNOW
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Studio Available" />
                </span>
                <span className="font-mono text-[9px] text-slate-400 tracking-wider">
                  DIGITAL STUDIO
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full border border-slate-800/80 bg-slate-900/50 backdrop-blur-md">
            {mainNavLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions & Status */}
          <div className="hidden md:flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-slate-400 border-r border-slate-800 pr-4">
              <span className="text-slate-500">AVAILABILITY:</span>
              <span className="text-sky-400 font-semibold">Q2 SELECT</span>
            </div>

            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/40 bg-sky-500/15 text-sky-200 hover:text-white hover:bg-sky-400 hover:text-slate-950 font-mono text-xs font-medium backdrop-blur-md transition-all shadow-lg shadow-sky-950/40 group"
            >
              <span>Start</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex items-center md:hidden gap-2">
            <Link
              href="/request"
              className="px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 font-mono text-xs"
            >
              Start
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-slate-800 bg-slate-900/80 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Spatial Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl flex flex-col justify-between p-6 pt-28 md:hidden animate-in fade-in duration-200"
        >
          <div className="flex flex-col space-y-6">
            <div className="font-mono text-xs text-sky-400 uppercase tracking-widest border-b border-slate-800 pb-3">
              // Navigation
            </div>

            <nav className="flex flex-col space-y-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-sans font-bold text-slate-100 hover:text-sky-400 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={20} className="text-slate-600" />
                </Link>
              ))}
              <Link
                href="/design-system"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-mono text-slate-400 hover:text-sky-400 transition-colors pt-2"
              >
                Design System Playground
              </Link>
            </nav>
          </div>

          <div className="border-t border-slate-800/80 pt-6 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400">
              <span>STATUS: AVAILABLE FOR Q2</span>
              <span className="text-sky-400">LAGOS / GLOBAL</span>
            </div>

            <Link
              href="/request"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-400 text-slate-950 font-mono text-sm font-bold shadow-lg shadow-sky-500/20"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
