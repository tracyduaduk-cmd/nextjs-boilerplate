"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

export interface ToolNavItem {
  slug: string;
  name: string;
  shortName: string;
  category: "BUILD" | "ENCODE" | "DESIGN" | "DIAGNOSTICS" | "NETWORK";
  icon: React.ElementType;
}

export const TOOLS_LIST: ToolNavItem[] = [
  // NETWORK DIAGNOSTICS SUITE
  { slug: "/network", name: "Network Hub", shortName: "Network", category: "NETWORK", icon: Network },
  { slug: "/network/dns", name: "DNS Lookup", shortName: "DNS", category: "NETWORK", icon: Globe },
  { slug: "/network/ip", name: "Public IP", shortName: "IP Info", category: "NETWORK", icon: Wifi },
  { slug: "/network/device", name: "Device Diagnostics", shortName: "Device", category: "NETWORK", icon: Laptop },
  { slug: "/network/speed", name: "Connection Speed", shortName: "Speed Test", category: "NETWORK", icon: Gauge },

  // BUILD
  { slug: "/tools/json", name: "JSON Formatter", shortName: "JSON", category: "BUILD", icon: Code2 },
  { slug: "/tools/markdown", name: "Markdown Preview", shortName: "Markdown", category: "BUILD", icon: FileText },
  { slug: "/tools/regex", name: "Regex Tester", shortName: "Regex", category: "BUILD", icon: Search },

  // ENCODE / SECURITY
  { slug: "/tools/encode", name: "Base64 & URL Encoder", shortName: "Encoder", category: "ENCODE", icon: Binary },
  { slug: "/tools/uuid", name: "UUID Generator", shortName: "UUID", category: "ENCODE", icon: KeyRound },
  { slug: "/tools/hash", name: "Crypto Hash", shortName: "Hash", category: "ENCODE", icon: ShieldCheck },

  // DESIGN / OUTPUT
  { slug: "/tools/color", name: "Color Utility", shortName: "Color", category: "DESIGN", icon: Palette },
  { slug: "/tools/qr", name: "QR Generator", shortName: "QR Code", category: "DESIGN", icon: QrCode },

  // DIAGNOSTICS
  { slug: "/tools/website-health", name: "Website Health", shortName: "Health", category: "DIAGNOSTICS", icon: Activity },
  { slug: "/tools/speed", name: "Speed Audit", shortName: "Speed", category: "DIAGNOSTICS", icon: Gauge },
  { slug: "/tools/seo", name: "SEO Checker", shortName: "SEO", category: "DIAGNOSTICS", icon: SearchCheck },
  { slug: "/tools/security", name: "Security Headers", shortName: "Security", category: "DIAGNOSTICS", icon: Shield },
  { slug: "/tools/ai-readiness", name: "AI Readiness", shortName: "AI Audit", category: "DIAGNOSTICS", icon: Bot },
];

export const ToolNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Tools Navigation" className="w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-16 z-30 py-2.5 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1.5 min-w-max">
        <Link
          href="/tools"
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
            pathname === "/tools"
              ? "bg-sky-400 text-slate-950 font-bold shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"
          }`}
        >
          All Tools
        </Link>
        <span className="text-slate-700 mx-1">|</span>

        {TOOLS_LIST.map((tool) => {
          const Icon = tool.icon;
          const isActive = pathname === tool.slug;

          return (
            <Link
              key={tool.slug}
              href={tool.slug}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                isActive
                  ? "bg-sky-950/90 text-sky-300 border border-sky-700/80 font-bold shadow-inner"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-sky-400" : "text-slate-500"}`} />
              <span>{tool.shortName}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
