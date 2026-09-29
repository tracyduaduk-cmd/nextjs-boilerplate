import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "JSON Formatter & Validator",
  description: "Format, validate, prettify, and minify JSON data in your browser with Snow’s free developer utility.",
  path: "/tools/json",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
