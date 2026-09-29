import { Metadata } from "next";
import { fetchProjects } from "@/lib/projects/queries";
import { WorkPageClient } from "@/components/work/WorkPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Work & Portfolio | Snow Technology Services",
  description:
    "Explore Snow's interactive portfolio of web applications, digital products, AI systems, and resilient digital architectures.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await fetchProjects();

  return <WorkPageClient projects={projects} />;
}
