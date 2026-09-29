import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const publicRoutes = [
  "/",
  "/tools",
  "/ai",
  "/care",
  "/work",
  "/request",
  "/telecom",
  "/network",
  "/network/dns",
  "/network/ip",
  "/network/device",
  "/network/speed",
  "/network/find",
  "/tools/json",
  "/tools/encode",
  "/tools/uuid",
  "/tools/hash",
  "/tools/regex",
  "/tools/markdown",
  "/tools/color",
  "/tools/qr",
  "/tools/website",
  "/tools/website/screenshot",
  "/tools/website/pdf",
  "/tools/website/inspect",
  "/tools/ai-readiness",
  "/tools/security",
  "/tools/seo",
  "/tools/speed",
  "/tools/website-health",
  "/insights",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/tools" || path === "/network" ? 0.9 : 0.7,
  }));
}
