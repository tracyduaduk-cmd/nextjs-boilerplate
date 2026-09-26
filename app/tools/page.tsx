import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ToolShell } from "@/components/tools/ToolShell";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { Tilt } from "@/components/spatial/Tilt";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { AIConcierge } from "@/components/concierge/AIConcierge";

export const metadata: Metadata = {
  title: "Diagnostic Tools & System Audits | Snow Technology Studio",
  description:
    "Know what is wrong before you decide what to fix. Explore Snow's diagnostic tools for website health, speed, SEO, security, and AI readiness.",
  openGraph: {
    title: "Snow Diagnostic Tools & System Audits",
    description:
      "Understand the condition of your website, app, or technology workflow before committing to a solution.",
    url: "https://snow.tech/tools",
  },
};

const diagnosticTools = [
  {
    id: "website-health",
    name: "Website Health Check",
    slug: "/tools/website-health",
    badge: "Full System Audit",
    purpose: "Evaluate overall functional reliability, broken paths, mobile rendering, and baseline technical health.",
    whatItChecks: [
      "Mobile responsiveness & viewport stability",
      "Form submission endpoints & contact channels",
      "Accessibility & contrast signals",
      "Core SEO markup & document structure",
      "Technical reliability & console errors",
    ],
    expectedOutput: "Comprehensive health breakdown categorized by performance, UX, and technical reliability.",
    accent: "emerald",
  },
  {
    id: "speed",
    name: "Speed Diagnostic",
    slug: "/tools/speed",
    badge: "Performance & Vitals",
    purpose: "Analyze loading speed, Core Web Vitals, script overhead, and caching efficiency.",
    whatItChecks: [
      "Core Web Vitals (LCP, FID/INP, CLS)",
      "Unoptimized image & asset payloads",
      "JavaScript & CSS execution blocking",
      "Server response time & TTFB signals",
      "Caching headers & compression parameters",
    ],
    expectedOutput: "Loading breakdown with actionable recommendations for page speed optimization.",
    accent: "sky",
  },
  {
    id: "seo",
    name: "SEO Check",
    slug: "/tools/seo",
    badge: "Search Visibility",
    purpose: "Audit technical search foundation, indexability, structured data, and search engine readiness.",
    whatItChecks: [
      "Title tags, meta descriptions & hierarchy",
      "Canonical tags, sitemap.xml & robots.txt",
      "Open Graph & social metadata",
      "JSON-LD structured data schema",
      "Mobile crawlability & URL structure",
    ],
    expectedOutput: "Detailed search visibility audit identifying indexing blockers and growth opportunities.",
    accent: "amber",
  },
  {
    id: "security",
    name: "Security Check",
    slug: "/tools/security",
    badge: "Defensive Security",
    purpose: "Safely audit website security headers, SSL certificate integrity, and public exposure signals.",
    whatItChecks: [
      "HTTPS availability & TLS certificate validity",
      "Security headers (HSTS, CSP, X-Frame-Options)",
      "Publicly exposed server metadata signals",
      "Cookie security attributes (Secure, HttpOnly, SameSite)",
      "Safe defensive vulnerability signals",
    ],
    expectedOutput: "Ethical security signal breakdown prioritizing header hardening and transport protection.",
    accent: "rose",
  },
  {
    id: "ai-readiness",
    name: "AI Readiness Assessment",
    slug: "/tools/ai-readiness",
    badge: "Automation Framework",
    purpose: "Evaluate whether your business data, customer workflows, and systems are structured for AI integration.",
    whatItChecks: [
      "Data organization & accessibility",
      "Workflow documentation & repetitive manual tasks",
      "Customer enquiry consistency & FAQ structures",
      "API connectivity & software integrations",
      "Data privacy, human-in-the-loop governance & safety",
    ],
    expectedOutput: "Snow AI Readiness Framework maturity tier (Foundation, Ready, Opportunity, Advanced).",
    accent: "teal",
  },
];

export default function ToolsHubPage() {
  return (
    <ToolShell>
      {/* Hero Section */}
      <section className="pt-24 pb-16 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950">
        <Container>
          <PerspectiveContainer perspective={1200} className="max-w-4xl mx-auto text-center">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/80 uppercase mb-6">
                Snow Diagnostic Suite
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.08] mb-6">
                Know what is wrong before you decide <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">what to fix.</span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Snow&apos;s diagnostic tools help you understand the condition of a website, digital system or technology workflow before committing to a solution.
              </p>
            </Reveal>
          </PerspectiveContainer>
        </Container>
      </section>

      {/* Concierge Embedded Section */}
      <section className="py-12 border-b border-slate-800/60 bg-slate-950/50">
        <Container>
          <AIConcierge
            title="Unsure which diagnostic tool you need?"
            subtitle="Describe your issue or goal and Snow Concierge will recommend the right tool."
          />
        </Container>
      </section>

      {/* Tools Cards Grid */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mb-12">
            <Reveal direction="up">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">Diagnostic Suite</span>
              <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Available Analysis Tools</h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {diagnosticTools.map((tool, index) => (
              <Reveal key={tool.id} direction="up" delay={index * 80}>
                <Tilt maxRotation={4} className="h-full">
                  <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-sky-800/80 transition-all h-full flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono uppercase font-semibold text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800/60">
                          {tool.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-500">TOOL 0{index + 1}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-100 mb-2">{tool.name}</h3>
                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">{tool.purpose}</p>

                      <div className="border-t border-slate-800/80 pt-5 mb-6">
                        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Key Audit Areas:</p>
                        <ul className="space-y-2 mb-4">
                          {tool.whatItChecks.map((item) => (
                            <li key={item} className="flex items-start text-xs sm:text-sm text-slate-300 gap-2">
                              <span className="text-sky-400 font-bold shrink-0">✦</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-400">
                          <strong className="text-slate-300">Expected Output: </strong>
                          {tool.expectedOutput}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={tool.slug}
                      className="w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-sky-400 hover:text-slate-950 text-slate-100 border border-slate-700 transition-all shadow-md"
                    >
                      Open {tool.name} ↗
                    </Link>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </ToolShell>
  );
}
