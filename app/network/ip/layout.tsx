import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Public IP & ASN Lookup",
  description: "Inspect public IP address, ISP, ASN, route, and reverse DNS information with Snow’s network diagnostic tool.",
  path: "/network/ip",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
