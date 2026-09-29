import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Readiness Audit",
  description: "Evaluate how ready a website or digital product is for useful AI discovery, content structure, and technical integration.",
  path: "/tools/ai-readiness",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
