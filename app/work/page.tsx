import { Metadata } from "next";
import { fetchProjects } from "@/lib/projects/queries";
import { WorkPageClient } from "@/components/work/WorkPageClient";

export const metadata: Metadata = {
  title: "Work & Portfolio | Snow Technology Services",
  description:
    "Explore Snow's interactive portfolio of high-performance web applications, modern e-commerce storefronts, AI systems, and resilient digital architectures.",
  openGraph: {
    title: "Work & Portfolio | Snow Technology Services",
    description:
      "Explore Snow's interactive portfolio of high-performance web applications, modern e-commerce storefronts, AI systems, and resilient digital architectures.",
    url: "https://snow.dev/work",
    type: "website",
  },
};

export default async function WorkPage() {
  const projects = await fetchProjects();

  return <WorkPageClient projects={projects} />;
}
