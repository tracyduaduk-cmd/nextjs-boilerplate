"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { DepthLayer } from "@/components/spatial/DepthLayer";
import { Tilt } from "@/components/spatial/Tilt";
import { Reveal } from "@/components/spatial/Reveal";
import { PointerGlow } from "@/components/spatial/PointerGlow";

export type ConciergeIntent =
  | "build"
  | "repair"
  | "grow"
  | "automate"
  | "protect"
  | "operate"
  | "diagnose"
  | "unknown";

export interface ConciergeRecommendation {
  intent: ConciergeIntent;
  title: string;
  summary: string;
  primaryService: { name: string; slug: string; capabilityFamily: string };
  recommendedTool?: { name: string; href: string };
  recommendedCare?: { name: string; href: string };
  actionLink: { label: string; href: string };
  relevantCapabilityFamilies: string[];
}

const SUGGESTED_PROMPTS = [
  "My website is broken",
  "I need a new website",
  "I want an online store",
  "I need an app",
  "I want to automate my business",
  "My website is slow",
  "I need better Google visibility",
  "I think my account was compromised",
  "I need help choosing the right technology",
  "I'm not sure what I need",
];

export function determineIntentAndRecommendation(input: string): ConciergeRecommendation {
  const query = input.toLowerCase().trim();

  if (query.includes("slow") || query.includes("speed") || query.includes("performance") || query.includes("lag")) {
    return {
      intent: "diagnose",
      title: "Performance Diagnostic & Speed Optimization",
      summary: "Your load times directly impact visitor retention and conversion rates. We recommend running our diagnostic speed check first.",
      primaryService: { name: "Performance Optimization", slug: "performance-optimization", capabilityFamily: "WEB" },
      recommendedTool: { name: "Run Speed Diagnostic", href: "/tools/speed" },
      recommendedCare: { name: "Business Care Plan", href: "/care#care-plans" },
      actionLink: { label: "Run Speed Test Now", href: "/tools/speed" },
      relevantCapabilityFamilies: ["WEB", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("broken") || query.includes("fix") || query.includes("repair") || query.includes("error") || query.includes("crash")) {
    return {
      intent: "repair",
      title: "Website & Application Emergency Repair",
      summary: "Snow provides rapid triage and fix operations for broken sites, server errors, and integration failures.",
      primaryService: { name: "Website Repair", slug: "website-repair", capabilityFamily: "SECURITY & RECOVERY" },
      recommendedTool: { name: "Website Health Check", href: "/tools/website-health" },
      recommendedCare: { name: "Essential Care", href: "/care" },
      actionLink: { label: "Request Emergency Repair", href: "/request" },
      relevantCapabilityFamilies: ["SECURITY & RECOVERY", "WEB", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("store") || query.includes("ecommerce") || query.includes("shop") || query.includes("checkout") || query.includes("payment")) {
    return {
      intent: "build",
      title: "High-Conversion Ecommerce Architecture",
      summary: "We design and build modern online stores with secure checkout, automated inventory sync, and localized payment options.",
      primaryService: { name: "Ecommerce Systems", slug: "ecommerce-systems", capabilityFamily: "WEB" },
      recommendedTool: { name: "Run Security Check", href: "/tools/security" },
      recommendedCare: { name: "Continuous Care", href: "/care" },
      actionLink: { label: "Request Store Development", href: "/request" },
      relevantCapabilityFamilies: ["WEB", "SECURITY & RECOVERY"],
    };
  }

  if (query.includes("app") || query.includes("mobile") || query.includes("software") || query.includes("platform") || query.includes("saas")) {
    return {
      intent: "build",
      title: "Custom Application & Platform Development",
      summary: "Tailored full-stack Web and Mobile applications built with resilient databases, responsive UX, and scalable architecture.",
      primaryService: { name: "Web Applications", slug: "web-applications", capabilityFamily: "APPS & SOFTWARE" },
      recommendedTool: { name: "AI Readiness Check", href: "/tools/ai-readiness" },
      recommendedCare: { name: "Continuous Care", href: "/care" },
      actionLink: { label: "Start Application Request", href: "/request" },
      relevantCapabilityFamilies: ["APPS & SOFTWARE", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("automate") || query.includes("ai") || query.includes("bot") || query.includes("workflow") || query.includes("process")) {
    return {
      intent: "automate",
      title: "AI Solutions & Workflow Automation",
      summary: "Automate repetitive customer queries, document parsing, and business operations using intelligent LLM workflows.",
      primaryService: { name: "AI Solutions & Automation", slug: "ai-solutions-automation", capabilityFamily: "AI" },
      recommendedTool: { name: "Evaluate AI Readiness", href: "/tools/ai-readiness" },
      recommendedCare: { name: "Continuous Care", href: "/care" },
      actionLink: { label: "Explore AI Automation", href: "/request" },
      relevantCapabilityFamilies: ["AI", "BUSINESS IT"],
    };
  }

  if (query.includes("google") || query.includes("seo") || query.includes("traffic") || query.includes("visibility") || query.includes("growth")) {
    return {
      intent: "grow",
      title: "Technical SEO & Search Visibility Foundation",
      summary: "Clean semantic markup, schema structured data, and performance architecture to earn organic Google positioning.",
      primaryService: { name: "SEO & Digital Growth", slug: "seo-digital-growth", capabilityFamily: "DIGITAL GROWTH" },
      recommendedTool: { name: "Run SEO Check", href: "/tools/seo" },
      recommendedCare: { name: "Business Care", href: "/care" },
      actionLink: { label: "Run Free SEO Check", href: "/tools/seo" },
      relevantCapabilityFamilies: ["DIGITAL GROWTH", "WEB"],
    };
  }

  if (query.includes("compromised") || query.includes("hack") || query.includes("security") || query.includes("recovery") || query.includes("account")) {
    return {
      intent: "protect",
      title: "Security & Account Recovery Assistance",
      summary: "Ethical security audits, header hardening, and legitimate recovery guidance for compromised digital accounts.",
      primaryService: { name: "Account Recovery Assistance", slug: "account-recovery-assistance", capabilityFamily: "SECURITY & RECOVERY" },
      recommendedTool: { name: "Security Check", href: "/tools/security" },
      recommendedCare: { name: "Essential Care", href: "/care" },
      actionLink: { label: "Request Recovery Assistance", href: "/request" },
      relevantCapabilityFamilies: ["SECURITY & RECOVERY", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("new website") || query.includes("redesign") || query.includes("build") || query.includes("site")) {
    return {
      intent: "build",
      title: "Bespoke Website Development",
      summary: "Cinematic, fast, and responsive web presences engineered to establish technical authority and convert clients.",
      primaryService: { name: "Website Development", slug: "website-development", capabilityFamily: "WEB" },
      recommendedTool: { name: "Website Health Check", href: "/tools/website-health" },
      recommendedCare: { name: "Essential Care", href: "/care" },
      actionLink: { label: "Request Website Build", href: "/request" },
      relevantCapabilityFamilies: ["WEB", "DIGITAL GROWTH"],
    };
  }

  // Fallback for "not sure", general query or unknown
  return {
    intent: "diagnose",
    title: "Snow Guided Technology Assessment",
    summary: "Tell us about your goals or challenges. We will guide you through a diagnostic check or match you with the exact capability family.",
    primaryService: { name: "Technology Consulting", slug: "technology-consulting", capabilityFamily: "BUSINESS IT" },
    recommendedTool: { name: "Explore All Diagnostic Tools", href: "/tools" },
    recommendedCare: { name: "Explore Snow Care", href: "/care" },
    actionLink: { label: "Request a Direct Consultation", href: "/request" },
    relevantCapabilityFamilies: ["WEB", "AI", "SECURITY & RECOVERY", "BUSINESS IT"],
  };
}

export interface AIConciergeProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const AIConcierge: React.FC<AIConciergeProps> = ({
  className = "",
  title = "Snow Intelligent Concierge",
  subtitle = "Describe your business challenge or goal in plain language.",
}) => {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<ConciergeRecommendation | null>(null);

  const inputId = useId();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsAnalyzing(true);
    setRecommendation(null);

    // Simulate brief system analysis state
    setTimeout(() => {
      const rec = determineIntentAndRecommendation(query);
      setRecommendation(rec);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleSelectPrompt = (prompt: string) => {
    setQuery(prompt);
    setIsAnalyzing(true);
    setRecommendation(null);
    setTimeout(() => {
      const rec = determineIntentAndRecommendation(prompt);
      setRecommendation(rec);
      setIsAnalyzing(false);
    }, 400);
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 p-4 sm:p-8 ${className}`}>
      <PointerGlow color="rgba(56, 189, 248, 0.15)" size={500} />

      <PerspectiveContainer perspective={1000} className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-5 sm:mb-8">
          <Reveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/60 uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              Interactive Intent Discovery Engine
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-2">{title}</h2>
            <p className="text-sm sm:text-base text-slate-400">{subtitle}</p>
          </Reveal>
        </div>

        {/* Input Form */}
        <Reveal direction="up" delay={100}>
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative flex items-center">
              <label htmlFor={inputId} className="sr-only">
                What do you need help with?
              </label>
              <input
                id={inputId}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. My website loads slowly and customers are complaining..."
                className="w-full py-3.5 sm:py-4 pl-4 sm:pl-5 pr-28 sm:pr-32 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner"
              />
              <button
                type="submit"
                disabled={isAnalyzing || !query.trim()}
                className="absolute right-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze ↗"}
              </button>
            </div>
          </form>
        </Reveal>

        {/* Suggested Prompts */}
        <Reveal direction="up" delay={150}>
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
              Suggested Prompts:
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSelectPrompt(prompt)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-800 hover:border-sky-800/60 transition-all text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Analyzing Animation State */}
        {isAnalyzing && (
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center animate-pulse">
            <div className="inline-block w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-mono text-sky-400 uppercase tracking-widest">Evaluating Capabilities & System Mapping...</p>
          </div>
        )}

        {/* Recommendation Card Output */}
        {recommendation && !isAnalyzing && (
          <Reveal direction="up" delay={200}>
            <Tilt maxRotation={4}>
              <div className="p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-sky-950/30 border border-sky-800/60 shadow-2xl relative">
                <DepthLayer depth={10}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono font-semibold tracking-wider text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800/80 uppercase">
                      INTENT MATCH: {recommendation.intent.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {recommendation.relevantCapabilityFamilies.map((fam) => (
                        <span key={fam} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {fam}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">{recommendation.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">{recommendation.summary}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800/80 pt-6 mb-6">
                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Recommended Service</span>
                      <p className="text-sm font-semibold text-slate-100">{recommendation.primaryService.name}</p>
                    </div>

                    {recommendation.recommendedTool && (
                      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
                        <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Diagnostic Tool</span>
                        <Link href={recommendation.recommendedTool.href} className="text-sm font-semibold text-sky-400 hover:underline">
                          {recommendation.recommendedTool.name} ↗
                        </Link>
                      </div>
                    )}

                    {recommendation.recommendedCare && (
                      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
                        <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Long-term Care</span>
                        <Link href={recommendation.recommendedCare.href} className="text-sm font-semibold text-emerald-400 hover:underline">
                          {recommendation.recommendedCare.name} ↗
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                      href={recommendation.actionLink.href}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all text-center shadow-md shadow-sky-950"
                    >
                      {recommendation.actionLink.label}
                    </Link>
                    <span className="text-xs text-slate-500 font-mono">
                      Connected to Snow Intelligent Service Engine
                    </span>
                  </div>
                </DepthLayer>
              </div>
            </Tilt>
          </Reveal>
        )}
      </PerspectiveContainer>
    </div>
  );
};
