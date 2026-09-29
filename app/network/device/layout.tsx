import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Device & Browser Diagnostics",
  description: "Inspect browser capabilities, viewport, WebGL renderer, hardware concurrency, and touch support locally.",
  path: "/network/device",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
