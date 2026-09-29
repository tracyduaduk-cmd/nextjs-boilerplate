import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Network Diagnostics | DNS, IP, Device & Speed Tools",
  description:
    "Privacy-first network diagnostics for DNS lookups, public IP and route information, browser and device signals, location, and connection speed.",
  path: "/network",
});

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Snow", path: "/" }, { name: "Network Diagnostics", path: "/network" }]}
      />
      {children}
    </>
  );
}
