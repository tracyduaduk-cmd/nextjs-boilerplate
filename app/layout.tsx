import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://snow.example"),
  title: { default: "Snow — Technology made clearer.", template: "%s — Snow" },
  description: "Snow builds, fixes, improves and automates websites, apps and digital systems.",
  openGraph: { title: "Snow — Technology made clearer.", description: "Build better digital systems with Snow.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}><body>{children}</body></html>;
}
