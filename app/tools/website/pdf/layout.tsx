import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website PDF Converter",
  description: "Convert a public website or web document into a printable PDF with Snow Website Lab.",
  path: "/tools/website/pdf",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
