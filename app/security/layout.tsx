import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Security Lab — Simulated Cyber Operations",
  description: "A controlled Snow laboratory for exploring deterministic, fictional cybersecurity simulations.",
  path: "/security",
});

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <><BreadcrumbJsonLd items={[{ name: "Snow", path: "/" }, { name: "Security Lab", path: "/security" }]} />{children}</>;
}
