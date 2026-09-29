import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Internet Speed & Connection Diagnostics",
  description: "Measure latency, jitter, connection type, and controlled download throughput with Snow’s browser-based diagnostic.",
  path: "/network/speed",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
