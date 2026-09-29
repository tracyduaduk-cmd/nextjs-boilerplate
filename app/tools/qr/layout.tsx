import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "QR Code Generator",
  description: "Create downloadable SVG and PNG QR codes for URLs, text, Wi-Fi, and vCards with Snow’s QR generator.",
  path: "/tools/qr",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
