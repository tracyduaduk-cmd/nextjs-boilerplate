"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { INSIGHT_ARTICLES } from "@/lib/insights/articles";

const CATEGORIES = ["All", "Build", "Grow", "AI", "Protect", "Operate"];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = INSIGHT_ARTICLES.filter((article) => {
    if (selectedCategory === "All") return true;
    return article.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const featuredArticles = INSIGHT_ARTICLES.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950 flex flex-col justify-between">
      <Header />

      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="pt-24 pb-16 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
          <Container>
            <PerspectiveContainer perspective={1200} className="max-w-4xl mx-auto text-center">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/80 uppercase mb-6">
                  Snow Technical Editorial
                </span>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.08] mb-6">
                  Useful technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">thinking.</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Practical guides on building, improving, protecting and operating digital systems for modern business.
                </p>
              </Reveal>
            </PerspectiveContainer>
          </Container>
        </section>

        {/* Featured Showcase */}
        {selectedCategory === "All" && featuredArticles.length > 0 && (
          <section className="py-12 border-b border-slate-800/60 bg-slate-950/40">
            <Container>
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">Featured Analysis</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.slice(0, 3).map((article) => (
                  <Reveal key={article.slug} direction="up">
                    <Tilt maxRotation={4} className="h-full">
                      <Link href={`/insights/${article.slug}`} className="block h-full">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/30 border border-sky-800/60 hover:border-sky-400 transition-all h-full flex flex-col justify-between shadow-xl">
                          <div>
                            <div className="flex items-center justify-between mb-3 text-xs font-mono">
                              <span className="text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded border border-sky-800 uppercase">
                                {article.category}
                              </span>
                              <span className="text-slate-400">{article.readingTime}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-100 mb-2 hover:text-sky-300 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                              {article.excerpt}
                            </p>
                          </div>
                          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                            <span>{article.author}</span>
                            <span className="text-sky-400 font-semibold">Read Insight →</span>
                          </div>
                        </div>
                      </Link>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Filter Navigation & Grid */}
        <section className="py-16">
          <Container>
            {/* Category Filter Tabs */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                      isActive
                        ? "bg-sky-400 text-slate-950 border-sky-400 shadow-md"
                        : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <Reveal key={article.slug} direction="up" delay={index * 50}>
                  <Tilt maxRotation={4} className="h-full">
                    <Link href={`/insights/${article.slug}`} className="block h-full">
                      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3 text-xs font-mono">
                            <span className="text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800 uppercase">
                              {article.category}
                            </span>
                            <span className="text-slate-500">{article.readingTime}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-2 hover:text-sky-400 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                          <span>{article.author}</span>
                          <span className="text-slate-300 font-medium">Read Article ↗</span>
                        </div>
                      </div>
                    </Link>
                  </Tilt>
                </Reveal>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <p>No articles found for category &quot;{selectedCategory}&quot;.</p>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
