import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website SEO Audit Tool",
  description: "Audit metadata, canonical setup, indexing directives, Open Graph previews, and structured data for a website.",
  path: "/tools/seo",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
