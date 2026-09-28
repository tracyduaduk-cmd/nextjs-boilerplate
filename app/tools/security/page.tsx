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

export default function SecurityPage() {
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
                  category: "HTTPS & TLS Transport",
                  scoreLabel: "Secure TLS 1.3",
                  status: "pass",
                  findings: [
                    "HTTPS transport active and enforced via automatic redirect",
                    "Valid SSL/TLS certificate chain verified",
                    "No mixed content warnings detected on primary page",
                  ],
                },
                {
                  category: "Security Response Headers",
                  scoreLabel: "Hardening Advised",
                  status: "warning",
                  findings: [
                    "Strict-Transport-Security (HSTS) header present",
                    "Content-Security-Policy (CSP) recommended to restrict script sources",
                    "X-Frame-Options set to DENY/SAMEORIGIN to prevent clickjacking",
                  ],
                },
                {
                  category: "Server Metadata Exposure",
                  scoreLabel: "Information Leak",
                  status: "warning",
                  findings: [
                    "Server version banner exposed in response header",
                    "Recommend suppressing X-Powered-By and Server headers",
                    "Public directory listings verified restricted",
                  ],
                },
                {
                  category: "Cookie Attributes",
                  scoreLabel: "Protected",
                  status: "pass",
                  findings: [
                    "Session cookies set with Secure flag",
                    "HttpOnly attribute present on sensitive tokens",
                    "SameSite=Lax/Strict attribute defined to mitigate CSRF",
                  ],
                },
              ],
              recommendedService: {
                name: "Security & Account Recovery Service",
                slug: "security",
                description: "Snow provides defensive security reviews, security header hardening, SSL monitoring, and ethical recovery assistance.",
              },
              careCategorySlug: "security-care",
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
        badge="Defensive Security Audit (Coming Soon)"
        title="Security Check"
        description="Perform non-intrusive defensive audits on HTTPS transport integrity, security response headers, and public exposure signals."
        status={status}
        statusMessage={
          status === "engine-ready"
            ? "Defensive Security Diagnostic Preview Ready"
            : status === "scanning"
            ? "Auditing Security Headers & Transport Security..."
            : "Security Review Complete"
        }
      />

      <Container className="py-12">
        <div className="mb-8 max-w-2xl mx-auto p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-xs font-mono text-amber-300 flex flex-wrap items-center justify-between gap-2 shadow-lg">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Automated security header audit engine under development (Coming Soon)
          </span>
          <span className="px-2.5 py-1 rounded-full bg-amber-900/80 text-amber-200 border border-amber-700/80 text-[10px] font-bold uppercase tracking-wider">
            PREVIEW DIAGNOSTIC
          </span>
        </div>

        <ToolInput
          placeholder="Enter website URL (e.g. https://yourcompany.com)"
          buttonLabel="Run Defensive Security Check"
          onSubmit={handleRunDiagnostic}
          isLoading={status === "scanning"}
        />

        {status === "scanning" && <ToolProgress progress={progress} label="Inspecting SSL, security headers & cookies..." />}

        {status === "completed" && resultData && <ToolResult data={resultData} />}

        {status === "engine-ready" && (
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400 mt-8 space-y-2">
            <p className="font-mono text-amber-400">✓ Ethical & Defensive Policy</p>
            <p>
              Snow Security Check performs strictly non-intrusive, safe website-level header reviews. Snow never requests passwords, API keys, private tokens, or recovery credentials.
            </p>
          </div>
        )}

        <ToolCTA />
      </Container>
    </ToolShell>
  );
}
