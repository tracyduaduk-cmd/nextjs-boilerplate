import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Snow — Modern Technology Services & Software Partner",
    template: "%s | Snow",
  },
  description:
    "Snow helps businesses and individuals build scalable web applications, integrate custom AI workflows, optimize performance, and resolve complex software friction.",
  keywords: [
    "Snow",
    "Web Application Development",
    "Website Design",
    "Software Engineering",
    "AI Integrations",
    "Business Automation",
    "Technical Troubleshooting",
    "Performance Optimization",
  ],
  authors: [{ name: "Snow Technology Services" }],
  creator: "Snow Technology Services",
  openGraph: {
    title: "Snow — Modern Technology Services & Software Partner",
    description:
      "Snow builds scalable web applications, custom AI integrations, and automated digital systems for modern businesses.",
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
  themeColor: "#090a0f",
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
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
    >
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
        {/* Skip to main content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-sky-400 text-slate-950 font-bold rounded-lg shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
