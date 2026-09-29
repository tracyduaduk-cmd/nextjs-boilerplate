import type { Metadata } from "next";
import { AIConcierge } from "@/components/concierge/AIConcierge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Snow Concierge | AI Capability Finder",
  description: "Describe a technical challenge in plain language and Snow Concierge will map it to relevant tools, services, and Care capabilities.",
  path: "/ai",
});

export default function AIPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main id="main-content" className="pt-28 sm:pt-36">
        <section className="border-b border-slate-800/80 pb-10 sm:pb-14">
          <Container>
            <div className="max-w-3xl">
              <SystemBadge variant="cyan" pulse>AI / INTELLIGENCE</SystemBadge>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">Find the right next move.</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">Snow Concierge turns a plain-language challenge into a grounded recommendation across Snow tools, services, and Care.</p>
              <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500"><span className="rounded-full border border-slate-800 px-3 py-1.5">Text only</span><span className="rounded-full border border-slate-800 px-3 py-1.5">Session only</span><span className="rounded-full border border-emerald-800/70 px-3 py-1.5 text-emerald-300">Grounded mapping</span></div>
            </div>
          </Container>
        </section>
        <section className="py-8 sm:py-12"><Container><AIConcierge title="Snow Intelligent Concierge" subtitle="Describe your business challenge or technical goal in plain language." /></Container></section>
      </main>
      <Footer />
    </div>
  );
}
