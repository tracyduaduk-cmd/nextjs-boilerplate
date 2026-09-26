import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { INSIGHT_ARTICLES, getArticleBySlug } from "@/lib/insights/articles";

export async function generateStaticParams() {
  return INSIGHT_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Snow Insights",
    };
  }

  return {
    title: `${article.title} | Snow Insights`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Snow Technical Editorial`,
      description: article.excerpt,
      url: `https://snow.tech/insights/${article.slug}`,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Related articles in same category or recent
  const relatedArticles = INSIGHT_ARTICLES.filter(
    (a) => a.slug !== article.slug && (a.category === article.category || a.featured)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950 flex flex-col justify-between">
      <Header />

      <main className="flex-1 pb-20">
        {/* Article Hero */}
        <section className="pt-24 pb-12 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
          <Container>
            <PerspectiveContainer perspective={1200} className="max-w-3xl mx-auto">
              <Reveal direction="up">
                <div className="flex items-center gap-3 mb-6 text-xs font-mono">
                  <Link href="/insights" className="text-slate-400 hover:text-sky-400 transition-colors">
                    ← Back to Insights
                  </Link>
                  <span className="text-slate-700">|</span>
                  <span className="text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded border border-sky-800 uppercase">
                    {article.category}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{article.readingTime}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-[1.15] mb-6">
                  {article.title}
                </h1>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-4 font-mono">
                  <span>Published by {article.author}</span>
                  <span>{article.publishedAt}</span>
                </div>
              </Reveal>
            </PerspectiveContainer>
          </Container>
        </section>

        {/* Article Body */}
        <section className="py-12">
          <Container>
            <div className="max-w-3xl mx-auto space-y-10">
              {/* Key Takeaways Box */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <Reveal direction="up">
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-sky-800/60 shadow-lg">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-3">
                      Executive Summary & Key Takeaways
                    </span>
                    <ul className="space-y-2.5">
                      {article.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-200 gap-2.5">
                          <span className="text-sky-400 font-bold shrink-0">✦</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* Article Content Paragraphs */}
              <div className="prose prose-invert max-w-none space-y-8">
                {article.content.map((sec, idx) => (
                  <Reveal key={idx} direction="up" delay={idx * 50}>
                    <div className="space-y-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight border-b border-slate-800/80 pb-2">
                        {sec.heading}
                      </h2>
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-base sm:text-lg text-slate-300 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Connected Services & Diagnostic Tools */}
              {(article.relatedServices || article.relatedTools || article.relatedCare) && (
                <Reveal direction="up">
                  <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 my-12">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
                      Connected Snow Platform Capabilities
                    </span>

                    {article.relatedServices && article.relatedServices.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-slate-400 uppercase mb-2">Relevant Services:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {article.relatedServices.map((srv) => (
                            <Link
                              key={srv.name}
                              href={srv.href}
                              className="p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-sky-800 transition-all block"
                            >
                              <p className="text-sm font-semibold text-slate-100">{srv.name} ↗</p>
                              <p className="text-xs text-slate-400 mt-1">{srv.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {article.relatedTools && article.relatedTools.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-slate-400 uppercase mb-2">Recommended Diagnostic Tools:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {article.relatedTools.map((tool) => (
                            <Link
                              key={tool.name}
                              href={tool.href}
                              className="p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-sky-800 transition-all block"
                            >
                              <p className="text-sm font-semibold text-sky-400">{tool.name} ↗</p>
                              <p className="text-xs text-slate-400 mt-1">{tool.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {article.relatedCare && article.relatedCare.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-slate-400 uppercase mb-2">Long-term Maintenance Care:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {article.relatedCare.map((care) => (
                            <Link
                              key={care.name}
                              href={care.href}
                              className="p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-emerald-800 transition-all block"
                            >
                              <p className="text-sm font-semibold text-emerald-400">{care.name} ↗</p>
                              <p className="text-xs text-slate-400 mt-1">{care.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              )}

              {/* Request CTA */}
              <Reveal direction="up">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/50 border border-sky-800/60 text-center shadow-xl">
                  <h3 className="text-2xl font-bold text-slate-100 mb-3">Have a project or technical challenge in mind?</h3>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6">
                    Connect directly with Snow technology engineers to diagnose your system requirements or request a custom estimate.
                  </p>
                  <Link
                    href="/request"
                    className="inline-block px-8 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-sm transition-all"
                  >
                    Request a Service Estimate ↗
                  </Link>
                </div>
              </Reveal>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="pt-12 border-t border-slate-800/80">
                  <h3 className="text-xl font-bold text-slate-100 mb-6">Related Editorial Insights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedArticles.map((rel) => (
                      <Tilt key={rel.slug} maxRotation={3}>
                        <Link href={`/insights/${rel.slug}`} className="block h-full">
                          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all h-full flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-sky-400 uppercase block mb-1">
                                {rel.category}
                              </span>
                              <h4 className="text-sm font-bold text-slate-100 line-clamp-2 mb-2">
                                {rel.title}
                              </h4>
                            </div>
                            <span className="text-xs text-slate-400 mt-2 font-mono">Read →</span>
                          </div>
                        </Link>
                      </Tilt>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
