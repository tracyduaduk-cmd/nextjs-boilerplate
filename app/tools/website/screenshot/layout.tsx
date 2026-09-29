import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Screenshot Tool",
  description: "Capture full-page website screenshots across desktop, tablet, and mobile viewports with Snow Website Lab.",
  path: "/tools/website/screenshot",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
