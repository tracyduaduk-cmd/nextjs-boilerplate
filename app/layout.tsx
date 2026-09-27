import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/spatial/SmoothScrollProvider";
import { CursorProvider } from "@/components/spatial/CursorSystem";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Snow — Interactive Technology & Design Studio",
    template: "%s | Snow",
  },
  description:
    "Snow is an editorial technology magazine and spatial digital laboratory engineering web, AI, software, and interactive experiences.",
  keywords: [
    "Snow",
    "Spatial Web",
    "Software Engineering",
    "AI Integrations",
    "Interaction Design",
    "WebGL",
    "Digital Studio",
  ],
  authors: [{ name: "Snow Technology Studio" }],
  creator: "Snow Technology Studio",
  openGraph: {
    title: "Snow — Interactive Technology & Design Studio",
    description:
      "Snow builds spatial web applications, WebGL visual systems, and custom AI integrations.",
    type: "website",
    locale: "en_US",
    siteName: "Snow",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
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
      <body className="bg-black text-white min-h-screen flex flex-col font-sans selection:bg-cyan-400 selection:text-black">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan-400 text-black font-mono font-bold rounded-full shadow-lg"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <CursorProvider>{children}</CursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
