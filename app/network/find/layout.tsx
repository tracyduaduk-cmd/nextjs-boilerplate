import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Find My Device | Browser Location Tool",
  description: "Use browser geolocation and Snow’s spatial location utility to inspect your current device context.",
  path: "/network/find",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
