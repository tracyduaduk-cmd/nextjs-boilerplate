import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProjects, fetchProjectBySlug } from "@/lib/projects/queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { MediaGallery } from "@/components/work/MediaGallery";
import { WebsitePreview } from "@/components/work/WebsitePreview";
import { Button } from "@/components/ui/Button";

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

  const mediaGalleryItems = project.media || [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <Header />

      <main id="main-content" className="flex-1">
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 border-b border-slate-900 bg-slate-950 relative overflow-hidden">
          <Container>
            <div className="mb-8">
              <Link
                href="/work"
                className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors gap-2"
              >
                <span>←</span>
                <span>Back to Project Archive</span>
              </Link>
            </div>

            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400">
                  SYSTEM #{project.sort_order.toString().padStart(2, "0")}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  {project.category}
                </span>
                {project.year && (
                  <span className="text-xs font-mono text-slate-500">
                    Year: {project.year}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-100 font-sans">
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans">
                {project.summary}
              </p>

              {project.client_name && (
                <div className="pt-2 text-xs font-mono text-slate-400">
                  Client / Partner: <strong className="text-slate-200 font-normal">{project.client_name}</strong>
                </div>
              )}
            </div>

            <div className="mt-12">
              <WebsitePreview project={project} interactive={true} />
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-950">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {project.problem && (
                <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-rose-400 block">
                    THE CHALLENGE
                  </span>
                  <h2 className="text-2xl font-bold text-slate-100">
                    What needed solving?
                  </h2>
                  <p className="text-slate-300 text-base leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
                    THE SOLUTION
                  </span>
                  <h2 className="text-2xl font-bold text-slate-100">
                    What Snow delivered
                  </h2>
                  <p className="text-slate-300 text-base leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>

            {project.results && !project.results.includes("Concept demonstration") && (
              <div className="mt-12 p-8 rounded-2xl bg-sky-950/30 border border-sky-800/50 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
                  MEASURED RESULTS
                </span>
                <p className="text-lg font-semibold text-slate-100">
                  {project.results}
                </p>
              </div>
            )}
          </Container>
        </section>

        <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-950">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-lime-300 block">
                  CAPABILITIES INVOLVED
                </span>
                <h2 className="text-3xl font-bold text-slate-100 font-sans">A focused system, not a template.</h2>
                <p className="text-slate-400 leading-relaxed">
                  This archive record is organized around the capabilities visible in the project brief and supplied media. It does not imply unverified outcomes.
                </p>
              </div>
              <div className="max-w-3xl space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
                TECHNICAL FOUNDATION
              </span>
              <h2 className="text-3xl font-bold text-slate-100 font-sans">
                Technologies & Architecture
              </h2>
              <p className="text-slate-400 text-base">
                Selected stack components utilized in building and deploying this solution:
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              </div>
            </div>
          </Container>
        </section>

        {mediaGalleryItems.length > 0 && (
          <section className="py-16 md:py-24 border-b border-slate-900 bg-slate-950">
            <Container>
              <div className="mb-10">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
                  INTERFACE GALLERY
                </span>
                <h2 className="text-3xl font-bold text-slate-100 font-sans">
                  Visual Previews & Screenshots
                </h2>
              </div>

              <MediaGallery mediaItems={mediaGalleryItems} projectTitle={project.title} />
            </Container>
          </section>
        )}

        <section className="py-20 md:py-28 bg-gradient-to-b from-slate-950 to-slate-900">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6 bg-slate-900/80 border border-slate-800 p-8 sm:p-14 rounded-3xl backdrop-blur-md">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
                PARTNER WITH SNOW
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight font-sans">
                Have a similar system to build or optimize?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
                Snow provides full-stack engineering, AI workflow development, and technical repair services. Let&apos;s build your foundation.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button href="/request" variant="primary" size="lg">
                  Start a Service Request
                </Button>
                <Button href="/work" variant="secondary" size="lg">
                  Explore More Work
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
