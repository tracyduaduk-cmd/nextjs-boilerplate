import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { AIConcierge } from "@/components/concierge/AIConcierge";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <section className="py-12 border-y border-slate-800/60 bg-slate-950/40">
          <Container>
            <AIConcierge />
          </Container>
        </section>
        <ServiceExplorer />
      </main>
      <Footer />
    </div>
  );
}
