import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLocalPublicUrl, PortfolioProjectSlug } from "@/lib/projects/mediaManifest";
import { SpatialMediaPlane } from "@/components/spatial/SpatialMediaPlane";

interface VisualSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  project: PortfolioProjectSlug;
  role?: "hero" | "desktop" | "mobile";
  accent?: "cyan" | "violet" | "emerald" | "amber";
  href?: string;
  cta?: string;
  reverse?: boolean;
  compact?: boolean;
}

const accents = {
  cyan: "from-cyan-300/45 via-cyan-400/5 to-transparent text-cyan-700",
  violet: "from-violet-300/45 via-violet-400/5 to-transparent text-violet-700",
  emerald: "from-emerald-300/45 via-emerald-400/5 to-transparent text-emerald-700",
  amber: "from-amber-300/45 via-amber-400/5 to-transparent text-amber-700",
};

export function VisualSection({
  eyebrow,
  title,
  description,
  project,
  role = "hero",
  accent = "cyan",
  href,
  cta,
  reverse = false,
  compact = false,
}: VisualSectionProps) {
  const image = getLocalPublicUrl(project, `${role}.webp`);
  return (
    <section className={`relative overflow-hidden bg-[#f5f4ef] ${compact ? "py-10 sm:py-14" : "py-16 sm:py-24"}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_30%,rgba(34,211,238,.1),transparent_28%),radial-gradient(circle_at_88%_70%,rgba(139,92,246,.08),transparent_28%)]" aria-hidden="true" />
      <div className={`relative mx-auto grid max-w-7xl items-center gap-8 px-6 sm:gap-12 sm:px-10 lg:grid-cols-12 lg:px-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="lg:col-span-5">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[.2em] ${accents[accent].split(" ").pop()}`}>{eyebrow}</span>
          <h2 className="mt-4 max-w-xl text-3xl font-black leading-[.95] tracking-[-.055em] text-slate-950 sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
          {href && cta && <Link href={href} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[.12em] text-white transition hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">{cta}<ArrowUpRight size={15} /></Link>}
        </div>
        <div className="lg:col-span-7 [perspective:1200px]">
          <SpatialMediaPlane className="group/spatial-plane" intensity={2.25}>
            <div className={`group relative overflow-hidden rounded-[1.75rem] border border-slate-950/10 bg-slate-950 shadow-[0_28px_80px_rgba(15,23,42,.16)] ${compact ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
              <Image src={image} alt={`${title} — original Snow concept`} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
              <div className={`absolute inset-0 bg-gradient-to-tr ${accents[accent].split(" ").slice(0, 3).join(" ")} via-transparent to-slate-950/55 mix-blend-screen`} />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:px-5">
                <div><span className="block font-mono text-[9px] uppercase tracking-[.18em] text-cyan-200">Snow / original concept</span><span className="mt-1 block text-sm font-semibold">Interface study · {project.replaceAll("-", " ")}</span></div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">{role}</span>
              </div>
            </div>
          </SpatialMediaPlane>
        </div>
      </div>
    </section>
  );
}
