import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Snow Insights | Technology & Product Engineering",
  description: "Read practical Snow insights about web development, digital products, AI integration, performance, and technical maintenance.",
  path: "/insights",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
