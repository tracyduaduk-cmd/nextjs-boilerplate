import { Metadata } from "next";
import Link from "next/link";
import { GlassNav } from "@/components/spatial/GlassNav";
import { ShortCodeDirectory } from "@/components/telecom/ShortCodeDirectory";
import { QuickActionGrid } from "@/components/telecom/QuickActionGrid";
import { OperatorGuide } from "@/components/telecom/OperatorGuide";
import { TelecomGuides } from "@/components/telecom/TelecomGuides";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { Radio, ShieldCheck, ArrowUpRight, Smartphone, Info } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata({
  title: "Nigerian Telecom Hub | USSD & Short Codes Reference",
  description:
    "Interactive Nigerian telecom control and reference center. Authoritative NCC harmonized short codes for MTN, Airtel, Glo, and 9mobile, including check balance (*310#), buy data (*312#), DND (2442), and NIN/SIM linkage (*996#).",
  path: "/telecom",
});

export default function TelecomPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Global Spatial Glass Navigation */}
      <GlassNav activeHref="/telecom" />

      {/* Hero Header Section */}
      <div className="pt-20 sm:pt-28 pb-6 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                OFFICIAL NCC DIRECTIVES
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                LIVE UTILITY HUB
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-sans tracking-tight text-white leading-tight">
              NIGERIAN TELECOM CONTROL CENTER
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              An interactive, zero-data reference center for Nigerian mobile network subscribers. Powered strictly by authoritative NCC harmonized short code regulations for MTN, Airtel, Glo, and 9mobile.
            </p>
          </div>

          {/* Quick Jump Anchors */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <a
              href="#directory"
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            >
              Short Codes
            </a>
            <a
              href="#operators"
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            >
              Networks
            </a>
            <a
              href="#dnd"
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            >
              DND 2442
            </a>
            <a
              href="#nin"
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            >
              NIN *996#
            </a>
          </div>
        </div>

        {/* Visual Instrument Stage & System Status Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <ToolVisualStage
              mode="security"
              pageKey="telecom_hub"
              slotKey="hero_pipeline"
              visualType="telecom"
              statusLabel="NCC HARMONIZED FRAMEWORK ACTIVE"
              metricLabel="NETWORK OPERATORS"
              metricValue="MTN • AIRTEL • GLO • 9MOBILE"
              accentColor="#22d3ee"
              className="h-full"
            />
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>MOBILE ACCESSIBILITY</span>
              </div>
              <h2 className="text-xl font-bold font-sans text-slate-100">
                HARMONIZED USSD ARCHITECTURE
              </h2>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                In 2023–2024, the Nigerian Communications Commission (NCC) mandated standard short codes across all mobile networks to eliminate operator fragmentation.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1.5">
              <div className="flex items-center justify-between">
                <span>STOP SERVICE:</span>
                <strong className="text-amber-400">*305#</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>CHECK BALANCE:</span>
                <strong className="text-cyan-300">*310#</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>RECHARGE CREDIT:</span>
                <strong className="text-emerald-400">*311*</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>DATA PLAN:</span>
                <strong className="text-cyan-300">*312#</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>ZERO DIRECT DIALING</span>
              <span className="text-emerald-400">SAFE REFERENCE</span>
            </div>
          </div>
        </div>

        {/* 1. Universal Quick Actions */}
        <section className="pt-6">
          <QuickActionGrid />
        </section>

        {/* 2. Interactive Searchable Short Code Directory */}
        <section id="directory" className="pt-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h2 className="text-xl font-bold font-sans text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              UNIVERSAL USSD SHORT CODE DIRECTORY
            </h2>
            <span className="text-xs font-mono text-slate-400">SEARCH & COPY</span>
          </div>

          <ShortCodeDirectory />
        </section>

        {/* 3. Operator Specific Guidance */}
        <section id="operators" className="pt-10">
          <OperatorGuide />
        </section>

        {/* 4. Deep Guides: DND, SIM/NIN, Porting */}
        <section className="pt-10">
          <TelecomGuides />
        </section>

        {/* Footer Navigation & Call to Action */}
        <div className="pt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>SNOW EDITORIAL TELECOM UTILITY</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/tools"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <span>Explore Studio Tools</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/request"
              className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-bold hover:bg-cyan-500/30 transition-all"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
