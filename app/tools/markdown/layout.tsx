import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Markdown Editor & Preview",
  description: "Write, preview, and export GitHub-flavored Markdown with Snow’s free browser-based Markdown editor.",
  path: "/tools/markdown",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
