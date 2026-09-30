import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/spatial/SmoothScrollProvider";
import { CursorProvider } from "@/components/spatial/CursorSystem";
import { SnowStructuredData } from "@/components/seo/StructuredData";
import { siteOrigin } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: {
    default: "Snow | Spatial Technology Studio",
    template: "%s | Snow",
  },
  description:
    "Snow is a technology studio engineering high-performance web applications, intelligent AI workflows, digital products, and resilient infrastructure.",
  metadataBase: siteOrigin,
  alternates: { canonical: "/" },
  authors: [{ name: "Snow Technology Studio" }],
  creator: "Snow Technology Studio",
  applicationName: "Snow",
  openGraph: {
    title: "Snow | Spatial Technology Studio",
    description:
      "Snow engineers web applications, AI workflows, digital products, and developer utilities.",
    type: "website",
    locale: "en_US",
    siteName: "Snow",
    url: siteOrigin,
  },
  twitter: {
    card: "summary",
    title: "Snow | Spatial Technology Studio",
    description:
      "Snow engineers web applications, AI workflows, digital products, and developer utilities.",
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="bg-[#f7f6f2] text-slate-950 min-h-screen flex flex-col font-sans selection:bg-cyan-300 selection:text-slate-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan-400 text-black font-mono font-bold rounded-full shadow-lg"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <CursorProvider>
            <SnowStructuredData />
            {children}
          </CursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
