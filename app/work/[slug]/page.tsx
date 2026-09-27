import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProjects, fetchProjectBySlug } from "@/lib/projects/queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyView } from "@/components/work/CaseStudyView";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Snow",
    };
  }

  return {
    title: `${project.title} — Case Study | Snow`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study | Snow`,
      description: project.summary,
      url: `https://snow.dev/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projects = await fetchProjects();
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <Header />

      <main id="main-content" className="flex-1">
        <CaseStudyView project={project} nextProject={nextProject} />
      </main>

      <Footer />
    </div>
  );
}
