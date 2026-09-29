import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Developer Tools & Free Utilities",
  description:
    "Free browser-based developer tools including a JSON formatter, Base64 encoder, UUID generator, regex tester, Markdown editor, QR code generator, and website diagnostics.",
  path: "/tools",
});

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Snow", path: "/" }, { name: "Developer Tools", path: "/tools" }]}
      />
      {children}
    </>
  );
}
