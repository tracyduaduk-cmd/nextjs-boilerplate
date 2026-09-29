import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Security Headers Tool",
  description: "Review common website security headers and understand practical protections for web applications.",
  path: "/tools/security",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
