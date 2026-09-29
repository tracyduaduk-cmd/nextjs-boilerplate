import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Lab | Screenshot, PDF & Inspection Tools",
  description:
    "Use Snow Website Lab to capture website screenshots, export web pages to PDF, and inspect security headers, Open Graph tags, canonical URLs, and DOM metadata.",
  path: "/tools/website",
});

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
