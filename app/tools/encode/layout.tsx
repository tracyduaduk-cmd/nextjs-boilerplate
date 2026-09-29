import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Base64 & URL Encoder / Decoder",
  description: "Encode and decode Base64, URL components, and text safely in your browser with Snow’s free encoding utility.",
  path: "/tools/encode",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
