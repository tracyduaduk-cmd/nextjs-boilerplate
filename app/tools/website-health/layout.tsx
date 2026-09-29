import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Health Check",
  description: "Run a practical website health check across availability, metadata, security, and experience signals.",
  path: "/tools/website-health",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
