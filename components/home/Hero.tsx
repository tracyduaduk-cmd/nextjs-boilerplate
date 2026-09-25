import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const Hero: React.FC = () => {
  const capabilitiesList = [
    "Web Application Engineering",
    "AI Workflows & Agents",
    "Business Automation",
    "Performance Optimization",
  ];

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-20 sm:pb-28 border-b border-slate-800/80 bg-slate-950">
      {/* Subtle Background Radial Grid Effect */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/20 via-slate-950 to-slate-950 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Column: Confident Snow Copy */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
            {/* Status / Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 w-fit shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="font-semibold text-slate-200">SNOW</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Modern Technology Partner</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight text-slate-50 font-sans leading-[1.08]">
              We engineer modern web applications, intelligent AI integrations, and automated digital systems.
            </h1>

            {/* Clear, Confident Value Proposition */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
              Snow helps businesses and individuals build scalable web products, fix complex technical friction, optimize performance, and integrate custom AI workflows. We deliver execution, not excuses.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button href="#contact" variant="primary" size="lg">
                Start a Project
              </Button>
              <Button href="#services" variant="secondary" size="lg">
                Explore Capabilities
              </Button>
            </div>

            {/* Key Capabilities Pills */}
            <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400 font-medium">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] mr-1">
                Core Focus:
              </span>
              {capabilitiesList.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800/80 text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Right Column: Technological Interactive Visual Console */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
              {/* Header Dots & Label */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-sky-400 font-semibold uppercase tracking-wider text-[11px]">
                  system.status // active
                </span>
              </div>

              {/* Status Metrics Cards */}
              <div className="mt-6 space-y-4 font-mono text-xs">
                {/* Tech Metric 1 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-200 font-sans font-semibold text-sm">Full-Stack Development</div>
                      <div className="text-slate-500 text-[11px]">Next.js • React • Supabase • APIs</div>
                    </div>
                  </div>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-semibold border border-emerald-500/20">
                    OPT-100%
                  </span>
                </div>

                {/* Tech Metric 2 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h6l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-200 font-sans font-semibold text-sm">AI & Business Automation</div>
                      <div className="text-slate-500 text-[11px]">Custom Agents • LLM Workflows</div>
                    </div>
                  </div>
                  <span className="text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded text-[10px] font-semibold border border-sky-500/20">
                    ENABLED
                  </span>
                </div>

                {/* Tech Metric 3 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-200 font-sans font-semibold text-sm">Maintenance & Fixing</div>
                      <div className="text-slate-500 text-[11px]">Troubleshooting • Security • Audit</div>
                    </div>
                  </div>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-semibold border border-emerald-500/20">
                    READY
                  </span>
                </div>
              </div>

              {/* Console Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All Systems Operational
                </span>
                <span>Response Time &lt; 24h</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
