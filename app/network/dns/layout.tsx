import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "DNS Lookup | DNS over HTTPS Diagnostic",
  description: "Query A, AAAA, CNAME, MX, TXT, and NS records with Snow’s privacy-first DNS over HTTPS lookup.",
  path: "/network/dns",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
