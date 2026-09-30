import type { Metadata } from "next";
import { SecurityLabApp } from "@/components/security/SecurityLabApp";
import { SecurityShell } from "@/components/security/SecurityShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Snow Security Lab — Simulated Cyber Operations",
  description: "Enter Snow Security Lab, a controlled educational simulation of recon, credential, packet, and defensive cyber operations using fictional local data.",
  path: "/security",
});

export default function SecurityLabPage() {
  return <SecurityShell><SecurityLabApp /></SecurityShell>;
}
