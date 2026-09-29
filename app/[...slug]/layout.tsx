import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snow System Route",
  robots: { index: false, follow: false },
};

export default function CatchAllLayout({ children }: { children: React.ReactNode }) {
  return children;
}
