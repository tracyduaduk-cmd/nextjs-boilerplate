import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Color Contrast Checker & Color Utility",
  description: "Convert colors and check WCAG 2.1 contrast ratios with Snow’s browser-based color utility.",
  path: "/tools/color",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
