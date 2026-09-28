import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

export default async function RoutePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const rawTitle = slug.at(-1)?.replace(/-/g, " ") ?? "Snow System Route";
  const formattedTitle = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header />

      <main id="main-content" className="flex-1 pt-32 pb-24 border-b border-slate-800/60">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Snow // {slug.join(" / ")}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 font-sans leading-tight">
                {formattedTitle}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                This route is provisioned within the Snow Technology architecture and ready for custom project specification, client portal access, or dedicated service integration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>ROUTE SPECIFICATION & INGESTION</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Looking to build a custom solution or integrate specialized API routes for this pathway? Start a project request directly with Snow engineers.
              </p>
              <div className="pt-2">
                <Link
                  href="/request"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-950/50"
                >
                  <span>Initiate Custom Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
