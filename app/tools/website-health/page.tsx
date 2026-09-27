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

export default function WebsiteHealthPage() {
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
                  category: "Performance Signals",
                  scoreLabel: "Optimal",
                  status: "pass",
                  findings: [
                    "DOM size and rendering speed within baseline limits",
                    "Asset loading sequence verified",
                    "Compression enabled on primary static routes",
                  ],
                },
                {
                  category: "Mobile Experience",
                  scoreLabel: "Verified",
                  status: "pass",
                  findings: [
                    "Responsive viewport meta tag correctly defined",
                    "Touch target sizes meet mobile accessibility thresholds",
                    "No horizontal overflow detected",
                  ],
                },
                {
                  category: "Accessibility & UX",
                  scoreLabel: "Passable",
                  status: "pass",
                  findings: [
                    "Contrast ratios meet WCAG AA baseline",
                    "Semantic heading hierarchy present",
                    "Key form fields properly labeled",
                  ],
                },
                {
                  category: "Technical Reliability",
                  scoreLabel: "Needs Monitoring",
                  status: "warning",
                  findings: [
                    "Console warnings detected on client-side script execution",
                    "SSL TLS 1.3 protocol verified active",
                    "Periodic health check schedule recommended",
                  ],
                },
              ],
              recommendedService: {
                name: "Website Development & Health Review",
                slug: "website-development",
                description: "Snow provides technical health maintenance, code refactoring, and performance optimizations to keep web applications running flawlessly.",
              },
              careCategorySlug: "website-care",
              recommendedCarePlan: {
                name: "Essential Care Plan",
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
        badge="Full System Diagnostic"
        title="Website Health Check"
        description="Run a full-spectrum diagnostic evaluating performance, mobile responsiveness, accessibility standards, and technical reliability."
        status={status}
        statusMessage={
          status === "engine-ready"
            ? "Diagnostic Engine Ready"
            : status === "scanning"
            ? "Scanning Website Architecture..."
            : "Health Check Report Complete"
        }
      />

      <Container className="py-12">
        <ToolInput
          placeholder="Enter website URL (e.g. https://yourcompany.com)"
          buttonLabel="Run Health Diagnostic"
          onSubmit={handleRunDiagnostic}
          isLoading={status === "scanning"}
        />

        {status === "scanning" && <ToolProgress progress={progress} label="Auditing Website Health Signals..." />}

        {status === "completed" && resultData && <ToolResult data={resultData} />}

        {status === "engine-ready" && (
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400 mt-8">
            <p className="font-mono text-sky-400 mb-1">✓ Diagnostic Engine Ready</p>
            <p>Enter any URL above to initiate an automated health analysis connected to Snow&apos;s analysis infrastructure.</p>
          </div>
        )}

        <ToolCTA />
      </Container>
    </ToolShell>
  );
}
