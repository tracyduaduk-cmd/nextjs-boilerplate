import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "UUID Generator",
  description: "Generate RFC 4122 UUID v4 identifiers in bulk with Snow’s free browser-based UUID generator.",
  path: "/tools/uuid",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
