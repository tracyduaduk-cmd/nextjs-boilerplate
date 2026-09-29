import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Speed Diagnostics",
  description: "Review practical performance signals and connection behavior for a web page with Snow diagnostics.",
  path: "/tools/speed",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
