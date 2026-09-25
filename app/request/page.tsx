import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceRequestFlow } from "@/components/request/ServiceRequestFlow";
import { EntryMode } from "@/lib/requests/types";

export const metadata = {
  title: "Request a Technical Service | Snow Studio",
  description:
    "Structured technical request and diagnostic experience. Get a tailored estimate for web engineering, apps, AI, security, or IT infrastructure.",
};

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; mode?: string; problem?: string }>;
}) {
  const params = await searchParams;
  const initialServiceSlug = params.service;
  const initialMode = (params.mode === "diagnostic" || params.mode === "direct") ? (params.mode as EntryMode) : undefined;
  const initialProblemText = params.problem;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <Header />
      <main id="main-content" className="flex-1">
        <ServiceRequestFlow
          initialServiceSlug={initialServiceSlug}
          initialMode={initialMode}
          initialProblemText={initialProblemText}
        />
      </main>
      <Footer />
    </div>
  );
}
