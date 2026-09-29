import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Inspector | Metadata & SEO Audit",
  description: "Inspect website security headers, Open Graph tags, Twitter cards, canonical URLs, and DOM metadata.",
  path: "/tools/website/inspect",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
