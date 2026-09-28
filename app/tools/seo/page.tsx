"use client";

import React, { useState } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolInput } from "@/components/tools/ToolInput";
import { ToolProgress } from "@/components/tools/ToolProgress";
import { ToolResult } from "@/components/tools/ToolResult";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { Container } from "@/components/ui/Container";
import { ToolResultData } from "@/lib/tools/types";

export default function SeoPage() {
  const [status, setStatus] = useState<"engine-ready" | "scanning" | "completed">("engine-ready");
  const [progress, setProgress] = useState(0);
  const [resultData, setResultData] = useState<ToolResultData | null>(null);

  const handleRunDiagnostic = (url: string) => {
    setStatus("scanning");
    setProgress(10);
    setResultData(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setProgress(100);
            setStatus("completed");
            setResultData({
              urlOrTarget: url,
              overallStatus: "Baseline Passed",
              categories: [
                {
                  category: "Document Metadata & Titles",
                  scoreLabel: "Optimized",
                  status: "pass",
                  findings: [
                    "Unique title tag detected within length guidelines",
                    "Meta description present and compelling",
                    "Single H1 tag properly structured on target page",
                  ],
                },
                {
                  category: "Crawlability & Indexing",
                  scoreLabel: "Verified",
                  status: "pass",
                  findings: [
                    "Canonical URL tag configured correctly",
                    "Robots.txt allows search engine crawlers",
                    "XML Sitemap directive detected in robots header",
                  ],
                },
                {
                  category: "Open Graph & Social Sharing",
                  scoreLabel: "Attention Needed",
                  status: "warning",
                  findings: [
                    "og:title and og:description meta tags present",
                    "og:image social share preview missing or defaulting",
                    "Twitter card tags partially defined",
                  ],
                },
                {
                  category: "Structured Data Schema",
                  scoreLabel: "Expansion Opportunity",
                  status: "pass",
                  findings: [
                    "JSON-LD Organization schema present",
                    "Product / Article schema could be expanded for rich search snippets",
                    "BreadcrumbList schema recommended for hierarchy",
                  ],
                },
              ],
              recommendedService: {
                name: "SEO & Digital Growth Service",
                slug: "seo-digital-growth",
                description: "Snow builds solid technical SEO foundations, schema markup, and crawlable site structures to grow organic search visibility.",
              },
              careCategorySlug: "website-care",
              recommendedCarePlan: {
                name: "Business Care Plan",
                href: "/care#care-plans",
              },
            });
          }, 300);
          return 90;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <ToolShell>
      <ToolHero
        badge="Technical SEO Audit (Coming Soon)"
        title="SEO Check"
        description="Audit meta tags, canonical setup, indexing directives, Open Graph previews, and structured data schema."
        status={status}
        statusMessage={
          status === "engine-ready"
            ? "SEO Diagnostic Preview Ready"
            : status === "scanning"
            ? "Analyzing Search Indexability & Structured Markup..."
            : "SEO Audit Complete"
        }
      />

      <Container className="py-12">
        <div className="mb-8 max-w-2xl mx-auto p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-xs font-mono text-amber-300 flex flex-wrap items-center justify-between gap-2 shadow-lg">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Automated SEO crawler engine under development (Coming Soon)
          </span>
          <span className="px-2.5 py-1 rounded-full bg-amber-900/80 text-amber-200 border border-amber-700/80 text-[10px] font-bold uppercase tracking-wider">
            PREVIEW DIAGNOSTIC
          </span>
        </div>

        <ToolInput
          placeholder="Enter website URL (e.g. https://yourcompany.com)"
          buttonLabel="Run SEO Check"
          onSubmit={handleRunDiagnostic}
          isLoading={status === "scanning"}
        />

        {status === "scanning" && <ToolProgress progress={progress} label="Auditing metadata, headings & schema tags..." />}

        {status === "completed" && resultData && <ToolResult data={resultData} />}

        {status === "engine-ready" && (
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400 mt-8">
            <p className="font-mono text-amber-400 mb-1">✓ Preview SEO Engine Ready</p>
            <p>Enter any URL above to inspect sample meta tag structure and indexability reporting.</p>
          </div>
        )}

        <ToolCTA />
      </Container>
    </ToolShell>
  );
}
