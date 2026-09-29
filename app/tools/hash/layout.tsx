import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Web Crypto Hash Calculator",
  description: "Calculate SHA-256, SHA-512, SHA-384, SHA-1, and MD5 digests locally with Snow’s hash calculator.",
  path: "/tools/hash",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
