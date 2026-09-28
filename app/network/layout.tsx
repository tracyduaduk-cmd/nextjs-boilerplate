import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Diagnostics — Snow Technology Studio",
  description:
    "Practical network and browser diagnostic tools. Perform DNS lookups, inspect public IP & routing, analyze local device capabilities, and measure latency.",
  openGraph: {
    title: "Network Diagnostics — Snow Technology Studio",
    description:
      "Practical network and browser diagnostic tools. DNS lookup, public IP info, local browser capability diagnostics, and speed checks.",
    type: "website",
  },
};

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
