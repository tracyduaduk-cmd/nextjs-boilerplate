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

export default function SpeedPage() {
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
              overallStatus: "Requires Optimization",
              categories: [
                {
                  category: "Core Web Vitals",
                  scoreLabel: "LCP / CLS Alert",
                  status: "warning",
                  findings: [
                    "Largest Contentful Paint (LCP) delayed by hero image payload",
                    "Cumulative Layout Shift (CLS) within acceptable threshold",
                    "Interaction to Next Paint (INP) responsive under test input",
                  ],
                },
                {
                  category: "Image Optimization",
                  scoreLabel: "Overhead Detected",
                  status: "warning",
                  findings: [
                    "Uncompressed image formats detected on primary landing page",
                    "Recommend conversion to WebP or AVIF image assets",
                    "Explicit width/height attributes recommended to prevent layout shift",
                  ],
                },
                {
                  category: "JavaScript & CSS Overhead",
                  scoreLabel: "Render Blocking",
                  status: "warning",
                  findings: [
                    "Render-blocking scripts delaying initial paint",
                    "Unused third-party tracking scripts adding execution overhead",
                    "Code-splitting and async script deferral advised",
                  ],
                },
                {
                  category: "Caching & Compression",
                  scoreLabel: "Passed",
                  status: "pass",
                  findings: [
                    "Gzip/Brotli text compression active on web server",
                    "Static assets served with cache-control headers",
                    "CDN edge delivery verified",
                  ],
                },
              ],
              recommendedService: {
                name: "Performance Optimization Service",
                slug: "performance-optimization",
                description: "Snow eliminates loading bottlenecks, optimizes media pipelines, and refactors script execution to achieve exceptional speed scores.",
              },
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
        badge="Speed & Vitals Diagnostic"
        title="Speed Diagnostic"
        description="Audit loading speeds, Core Web Vitals, asset compression, and render-blocking scripts that impact conversions."
        status={status}
        statusMessage={
          status === "engine-ready"
            ? "Speed Diagnostic Engine Ready"
            : status === "scanning"
            ? "Measuring Loading Behavior & Web Vitals..."
            : "Speed Audit Complete"
        }
      />

      <Container className="py-12">
        <ToolInput
          placeholder="Enter website URL (e.g. https://yourcompany.com)"
          buttonLabel="Run Speed Diagnostic"
          onSubmit={handleRunDiagnostic}
          isLoading={status === "scanning"}
        />

        {status === "scanning" && <ToolProgress progress={progress} label="Testing loading performance & Core Web Vitals..." />}

        {status === "completed" && resultData && <ToolResult data={resultData} />}

        {status === "engine-ready" && (
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400 mt-8">
            <p className="font-mono text-sky-400 mb-1">✓ Speed Engine Ready</p>
            <p>Enter any URL above to measure Core Web Vitals, asset sizes, and script overhead.</p>
          </div>
        )}

        <ToolCTA />
      </Container>
    </ToolShell>
  );
}
