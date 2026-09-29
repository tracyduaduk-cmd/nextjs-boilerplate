import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Binary,
  Bot,
  Braces,
  Camera,
  FileSearch,
  FileText,
  Gauge,
  Globe,
  KeyRound,
  Laptop,
  MapPin,
  Network,
  Palette,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";

export type NavigationStatus = "ready" | "live";

export interface NavigationItem {
  href: string;
  label: string;
  shortLabel?: string;
  description?: string;
  icon: LucideIcon;
  status?: NavigationStatus;
}

export interface NavigationGroup {
  id: string;
  label: string;
  eyebrow: string;
  icon: LucideIcon;
  items: NavigationItem[];
}

export const NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    id: "build",
    label: "Build",
    eyebrow: "BUILD & DATA",
    icon: Braces,
    items: [
      { href: "/tools/json", label: "JSON Formatter", shortLabel: "JSON", description: "Format and validate data locally.", icon: Braces },
      { href: "/tools/markdown", label: "Markdown Preview", shortLabel: "Markdown", description: "Write and render structured notes.", icon: FileText },
      { href: "/tools/regex", label: "Regex Tester", shortLabel: "Regex", description: "Test patterns and capture groups.", icon: Search },
    ],
  },
  {
    id: "encode",
    label: "Encode",
    eyebrow: "ENCODE & CRYPTO",
    icon: Binary,
    items: [
      { href: "/tools/encode", label: "Base64 & URL Encoder", shortLabel: "Encoder", description: "Encode and decode strings safely.", icon: Binary },
      { href: "/tools/uuid", label: "UUID Generator", shortLabel: "UUID", description: "Generate cryptographic identifiers.", icon: KeyRound },
      { href: "/tools/hash", label: "Crypto Hash", shortLabel: "Hash", description: "Calculate Web Crypto digests.", icon: ShieldCheck },
      { href: "/tools/qr", label: "QR Code Generator", shortLabel: "QR", description: "Create downloadable QR codes.", icon: QrCode },
    ],
  },
  {
    id: "design",
    label: "Design",
    eyebrow: "DESIGN SYSTEMS",
    icon: Palette,
    items: [
      { href: "/tools/color", label: "Color Utility", shortLabel: "Color", description: "Inspect color and contrast.", icon: Palette },
    ],
  },
  {
    id: "website",
    label: "Website Lab",
    eyebrow: "WEBSITE LAB",
    icon: Camera,
    items: [
      { href: "/tools/website", label: "Website Lab", shortLabel: "Overview", description: "Cloudflare-backed web capture tools.", icon: Globe },
      { href: "/tools/website/screenshot", label: "Website Screenshot", shortLabel: "Screenshot", description: "Capture public pages at real viewports.", icon: Camera },
      { href: "/tools/website/pdf", label: "Website PDF Export", shortLabel: "PDF", description: "Render a public page to PDF.", icon: FileText },
      { href: "/tools/website/inspect", label: "Website Inspector", shortLabel: "Inspector", description: "Inspect DOM and response metadata.", icon: FileSearch },
    ],
  },
  {
    id: "network",
    label: "Network",
    eyebrow: "NETWORK DIAGNOSTICS",
    icon: Network,
    items: [
      { href: "/network", label: "Network Overview", shortLabel: "Overview", description: "Open the network diagnostic suite.", icon: Network, status: "live" },
      { href: "/network/find", label: "Find My Device", shortLabel: "Find Device", description: "Use the spatial location center.", icon: MapPin },
      { href: "/network/dns", label: "DNS Lookup", shortLabel: "DNS", description: "Query authoritative DNS records.", icon: Globe },
      { href: "/network/ip", label: "Public IP", shortLabel: "IP", description: "Inspect public IP and route data.", icon: Wifi },
      { href: "/network/device", label: "Device Diagnostics", shortLabel: "Device", description: "Inspect browser and hardware signals.", icon: Laptop },
      { href: "/network/speed", label: "Connection Speed", shortLabel: "Speed", description: "Measure latency and throughput.", icon: Gauge },
    ],
  },
  {
    id: "ai",
    label: "AI / Intelligence",
    eyebrow: "AI / INTELLIGENCE",
    icon: Bot,
    items: [
      { href: "/ai", label: "Snow Concierge", shortLabel: "Concierge", description: "Describe a challenge and find the right Snow capability.", icon: Bot, status: "live" },
    ],
  },
];

export const PRIMARY_NAVIGATION = [
  { href: "/work", label: "Work", icon: Sparkles },
  { href: "/#services", label: "Services", icon: Wrench },
  { href: "/care", label: "Care", icon: Activity },
  { href: "/tools", label: "Tools", icon: Zap },
] satisfies NavigationItem[];

export const UTILITY_NAVIGATION = [
  { href: "/telecom", label: "Telecom", icon: Wifi },
  { href: "/request", label: "Start a project", icon: Zap },
] satisfies NavigationItem[];

export function getNavigationItem(pathname: string): NavigationItem | null {
  for (const group of NAVIGATION_GROUPS) {
    const item = group.items.find((candidate) => pathname === candidate.href);
    if (item) return item;
  }
  return null;
}

export function getNavigationGroup(pathname: string): NavigationGroup | null {
  return NAVIGATION_GROUPS.find((group) => group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))) || null;
}

export function isNavigationPathActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return pathname === href.split("#")[0] || pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
