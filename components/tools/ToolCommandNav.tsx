"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Code2,
  FileText,
  Search,
  Binary,
  KeyRound,
  ShieldCheck,
  Palette,
  QrCode,
  Activity,
  Gauge,
  SearchCheck,
  Shield,
  Bot,
  Globe,
  Wifi,
  Laptop,
  Network,
  Command,
  ChevronRight,
  Camera,
  FileSearch,
} from "lucide-react";

export interface ToolNavItem {
  slug: string;
  name: string;
  shortName: string;
  category: "NETWORK" | "BUILD" | "ENCODE" | "DESIGN" | "DIAGNOSTICS" | "WEBSITE";
  icon: React.ElementType;
  badge?: string;
}

export const TOOLS_LIST: ToolNavItem[] = [
  // NETWORK SUITE
  { slug: "/network", name: "Network Hub", shortName: "Network", category: "NETWORK", icon: Network, badge: "Live" },
  { slug: "/network/dns", name: "DNS Lookup", shortName: "DNS", category: "NETWORK", icon: Globe },
  { slug: "/network/ip", name: "Public IP", shortName: "IP Info", category: "NETWORK", icon: Wifi },
  { slug: "/network/device", name: "Device Diagnostics", shortName: "Device", category: "NETWORK", icon: Laptop },
  { slug: "/network/speed", name: "Connection Speed", shortName: "Speed", category: "NETWORK", icon: Gauge },

  // BUILD UTILITIES
  { slug: "/tools/json", name: "JSON Formatter", shortName: "JSON", category: "BUILD", icon: Code2, badge: "Local" },
  { slug: "/tools/markdown", name: "Markdown Preview", shortName: "Markdown", category: "BUILD", icon: FileText, badge: "GFM" },
  { slug: "/tools/regex", name: "Regex Tester", shortName: "Regex", category: "BUILD", icon: Search },

  // ENCODE / SECURITY
  { slug: "/tools/encode", name: "Base64 & URL Encoder", shortName: "Encoder", category: "ENCODE", icon: Binary, badge: "UTF-8" },
  { slug: "/tools/uuid", name: "UUID Generator", shortName: "UUID", category: "ENCODE", icon: KeyRound, badge: "Crypto" },
  { slug: "/tools/hash", name: "Crypto Hash", shortName: "Hash", category: "ENCODE", icon: ShieldCheck, badge: "Subtle" },

  // DESIGN & OUTPUT
  { slug: "/tools/color", name: "Color Utility", shortName: "Color", category: "DESIGN", icon: Palette, badge: "WCAG" },
  { slug: "/tools/qr", name: "QR Generator", shortName: "QR Code", category: "DESIGN", icon: QrCode },

  // WEBSITE LAB (Cloudflare Browser Run)
  { slug: "/tools/website/screenshot", name: "Website Screenshot", shortName: "Screenshot", category: "WEBSITE", badge: "Cloudflare", icon: Camera },
  { slug: "/tools/website/pdf", name: "Website PDF Export", shortName: "PDF Export", category: "WEBSITE", badge: "Cloudflare", icon: FileText },
  { slug: "/tools/website/inspect", name: "Website Inspector", shortName: "Inspect", category: "WEBSITE", badge: "Cloudflare", icon: FileSearch },

  // DIAGNOSTICS
  { slug: "/tools/website-health", name: "Website Health", shortName: "Health", category: "DIAGNOSTICS", icon: Activity, badge: "Soon" },
  { slug: "/tools/speed", name: "Speed Audit", shortName: "Speed", category: "DIAGNOSTICS", icon: Gauge, badge: "Soon" },
  { slug: "/tools/seo", name: "SEO Checker", shortName: "SEO", category: "DIAGNOSTICS", icon: SearchCheck, badge: "Soon" },
  { slug: "/tools/security", name: "Security Headers", shortName: "Security", category: "DIAGNOSTICS", icon: Shield, badge: "Soon" },
  { slug: "/tools/ai-readiness", name: "AI Readiness", shortName: "AI Audit", category: "DIAGNOSTICS", icon: Bot, badge: "Soon" },
];

const CATEGORIES = [
  { id: "ALL", label: "All Instruments" },
  { id: "BUILD", label: "Build" },
  { id: "ENCODE", label: "Encode" },
  { id: "DESIGN", label: "Design" },
  { id: "WEBSITE", label: "Website Lab" },
  { id: "NETWORK", label: "Network" },
  { id: "DIAGNOSTICS", label: "Diagnostics" },
];

export const ToolCommandNav: React.FC = () => {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const activeTool = TOOLS_LIST.find((t) => t.slug === pathname);

  const filteredTools = activeCategory === "ALL"
    ? TOOLS_LIST
    : TOOLS_LIST.filter((t) => t.category === activeCategory);

  return (
    <nav
      aria-label="Snow Tool Command Navigation"
      className="sticky top-16 z-30 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Active Command Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-mono text-xs font-semibold">
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span>SNOW_CONSOLE</span>
            <ChevronRight className="w-3 h-3 text-cyan-500/60" />
            <span className="text-white font-bold">{activeTool ? activeTool.shortName : "Hub"}</span>
          </div>

          {/* Mobile Category Dropdown / Pills */}
          <div className="flex md:hidden overflow-x-auto scrollbar-none gap-1 py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? "bg-cyan-400 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Category Segment Selector */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800/80">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-colors ${
                  isActive ? "text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="commandNavCat"
                    className="absolute inset-0 rounded-lg bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Tool Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 min-w-0">
          <Link
            href="/tools"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all border ${
              pathname === "/tools"
                ? "bg-cyan-400 text-slate-950 border-cyan-400 font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            Overview
          </Link>

          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = pathname === tool.slug;

            return (
              <Link
                key={tool.slug}
                href={tool.slug}
                className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-cyan-950/90 text-cyan-300 border-cyan-700 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    : "bg-slate-900/50 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-800/80 hover:border-slate-700"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                <span>{tool.shortName}</span>
                {tool.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${isActive ? "bg-cyan-800/80 text-cyan-200" : "bg-slate-800 text-slate-500"}`}>
                    {tool.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
