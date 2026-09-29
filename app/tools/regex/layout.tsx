import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Regex Tester",
  description: "Test JavaScript regular expressions, capture groups, flags, and replacements with Snow’s interactive regex tester.",
  path: "/tools/regex",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
