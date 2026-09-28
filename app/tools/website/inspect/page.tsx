"use client";

import React, { useState, useRef, useEffect } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import {
  FileSearch,
  Globe,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  Code,
  Share2,
  Lock,
} from "lucide-react";
import type { MetaDiagnosticData } from "@/app/api/tools/website/inspect/route";

type RequestState = "READY" | "RUNNING" | "COMPLETE" | "ERROR";

interface InspectApiResponse {
  success: boolean;
  data?: MetaDiagnosticData;
  inspectedAt?: string;
  errorCategory?: string;
  errorMessage?: string;
}

export default function WebsiteInspectPage() {
  const [targetUrl, setTargetUrl] = useState("https://snowwebdev.com");

  const [requestState, setRequestState] = useState<RequestState>("READY");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [result, setResult] = useState<InspectApiResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleInspect = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (requestState === "RUNNING") return;

    if (!targetUrl.trim()) {
      setRequestState("ERROR");
      setErrorCategory("INVALID_URL");
      setErrorMessage("Please enter a valid website URL.");
      return;
    }

    setRequestState("RUNNING");
    setErrorMessage(null);
    setErrorCategory(null);
    setResult(null);

    try {
      const response = await fetch("/api/tools/website/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data: InspectApiResponse = await response.json();

      if (!isMountedRef.current) return;

      if (!response.ok || !data.success) {
        setRequestState("ERROR");
        setErrorCategory(data.errorCategory || "TARGET_UNREACHABLE");
        setErrorMessage(data.errorMessage || "Failed to inspect website metadata.");
      } else {
        setRequestState("COMPLETE");
        setResult(data);
      }
    } catch (err: unknown) {
      if (!isMountedRef.current) return;
      setRequestState("ERROR");
      setErrorCategory("UNKNOWN_ERROR");
      setErrorMessage(err instanceof Error ? err.message : "An unexpected network error occurred.");
    }
  };

  const handleCopyJson = () => {
    if (result?.data) {
      navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const data = result?.data;

  return (
    <ToolShell>
      <ToolHeader
        title="WEBSITE INSPECTOR & META DIAGNOSTIC"
        description="Audit security headers, Open Graph media tags, Twitter/X cards, canonical URLs, and DOM metadata."
        category="WEBSITE LAB"
        badge="DOM & META AUDIT"
        isLocalOnly={false}
        status={requestState === "RUNNING" ? "scanning" : requestState === "COMPLETE" ? "completed" : "engine-ready"}
        statusMessage={
          requestState === "RUNNING"
            ? "Executing DOM & security audit..."
            : requestState === "COMPLETE"
            ? "Audit completed"
            : "Ready for target URL"
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <ToolInputPanel
              title="INSPECTION TARGET"
              badge="INSPECT"
            >
              <form onSubmit={handleInspect} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="target-url-input-inspect" className="block text-xs font-mono font-semibold text-slate-300">
                    TARGET WEBSITE URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      id="target-url-input-inspect"
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="e.g. https://snowwebdev.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      disabled={requestState === "RUNNING"}
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1.5">
                  <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AUDIT CHECKS INCLUDED</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>HSTS & Security Response Headers</li>
                    <li>Open Graph & Twitter Card Previews</li>
                    <li>Canonical URL & Meta Descriptions</li>
                    <li>DOM Structure & Technical Diagnostics</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={requestState === "RUNNING"}
                  className="w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileSearch className="w-4 h-4" />
                  <span>{requestState === "RUNNING" ? "INSPECTING SITE..." : "RUN INSPECTION AUDIT"}</span>
                </button>
              </form>
            </ToolInputPanel>

            <ToolVisualStage
              visualType="regex"
              mode="website-hub"
              statusLabel={requestState === "RUNNING" ? "DOM_INSPECTING" : requestState === "COMPLETE" ? "AUDIT_COMPLETE" : "SYSTEM_READY"}
              metricLabel="HTTP STATUS"
              metricValue={data ? `${data.statusCode} ${data.statusText}` : "N/A"}
              isError={requestState === "ERROR"}
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <ToolOutputPanel
              title="INSPECTION AUDIT RESULTS"
              badge={requestState === "COMPLETE" ? `${data?.statusCode || 200} OK` : requestState === "ERROR" ? "ERROR" : "STANDBY"}
              actions={
                data ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="text-[11px] font-mono text-slate-400">
                      Latency: <strong className="text-cyan-400">{data.responseTimeMs} ms</strong> | IP: <strong className="text-slate-200">{data.resolvedIp || "N/A"}</strong>
                    </div>
                    <button
                      onClick={handleCopyJson}
                      className="py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "COPIED" : "EXPORT JSON"}</span>
                    </button>
                  </div>
                ) : null
              }
            >
              {requestState === "READY" && (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                    <FileSearch className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-mono text-slate-300">NO INSPECTION CONDUCTED</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Submit a website URL above to inspect DOM metadata, security headers, and Open Graph previews.
                    </p>
                  </div>
                </div>
              )}

              {requestState === "RUNNING" && (
                <div className="py-20 text-center space-y-4">
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
                    <FileSearch className="w-5 h-5 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-mono text-cyan-300">ANALYZING TARGET DOM & HEADERS</h4>
                    <p className="text-xs font-mono text-slate-400">Fetching {targetUrl}</p>
                  </div>
                </div>
              )}

              {requestState === "ERROR" && (
                <ProximitySurface className="p-6 border-rose-800/80 bg-rose-950/20 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-rose-950 border border-rose-800 text-rose-400 shrink-0">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <SystemBadge variant="rose" size="sm">{errorCategory || "ERROR"}</SystemBadge>
                        <h4 className="text-sm font-bold text-rose-200">INSPECTION FAILED</h4>
                      </div>
                      <p className="text-xs text-rose-300 font-mono leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>
                </ProximitySurface>
              )}

              {requestState === "COMPLETE" && data && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2 text-slate-200 truncate font-bold">
                        <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">{data.finalUrl}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <SystemBadge variant={data.statusCode < 400 ? "emerald" : "rose"} size="sm">
                          {data.statusCode} {data.statusText}
                        </SystemBadge>
                        <a
                          href={data.finalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-slate-100 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">RESPONSE TIME</span>
                        <span className="text-cyan-300 font-bold">{data.responseTimeMs} ms</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">CONTENT TYPE</span>
                        <span className="text-slate-200 truncate block">{data.contentType || "N/A"}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">SERVER</span>
                        <span className="text-slate-200 truncate block">{data.server || "N/A"}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">RESOLVED IP</span>
                        <span className="text-slate-200 truncate block">{data.resolvedIp || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Security Response Headers Audit</span>
                      </h4>
                      <SystemBadge variant={data.hstsStatus.present ? "emerald" : "amber"} size="sm">
                        {data.hstsStatus.present ? "HSTS ACTIVE" : "HSTS MISSING"}
                      </SystemBadge>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {data.securityHeaders.map((hdr) => {
                        const isObserved = hdr.status === "observed";
                        return (
                          <div
                            key={hdr.header}
                            className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                              isObserved
                                ? "bg-emerald-950/10 border-emerald-800/50 text-slate-200"
                                : "bg-slate-950 border-slate-800/80 text-slate-400"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                                {isObserved ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                )}
                                <span>{hdr.header}</span>
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                  isObserved ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-slate-900 text-slate-500 border border-slate-800"
                                }`}
                              >
                                {hdr.status}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400">{hdr.description}</p>
                            {isObserved && hdr.value && (
                              <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-300 font-mono break-all mt-1">
                                {hdr.value}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-2">
                      <Code className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Document & Meta Tags</span>
                    </h4>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
                      <div>
                        <span className="text-slate-500 text-[10px] block">PAGE TITLE ({data.meta.title ? data.meta.title.length : 0} chars)</span>
                        <span className="text-slate-100 font-bold">{data.meta.title || "Missing <title> tag"}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">META DESCRIPTION ({data.meta.description ? data.meta.description.length : 0} chars)</span>
                        <span className="text-slate-300 leading-relaxed block">{data.meta.description || "Missing meta description tag"}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                        <div>
                          <span className="text-slate-500 text-[10px] block">CANONICAL URL</span>
                          <span className="text-cyan-300 truncate block">{data.meta.canonical || "Not specified"}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">ROBOTS / INDEXING</span>
                          <span className="text-slate-200 block">{data.meta.robots || "Default (index, follow)"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-2">
                      <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Open Graph & Social Media Preview</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                        <span className="text-cyan-400 font-bold block text-[10px] uppercase">OPEN GRAPH (Facebook / LinkedIn)</span>
                        {data.openGraph.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={data.openGraph.image}
                            alt="Open Graph Preview"
                            className="w-full h-32 object-cover rounded-lg border border-slate-800"
                          />
                        )}
                        <div className="text-slate-100 font-bold truncate">{data.openGraph.title || data.meta.title || "No OG Title"}</div>
                        <div className="text-slate-400 text-[11px] line-clamp-2">{data.openGraph.description || data.meta.description || "No OG Description"}</div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                        <span className="text-cyan-400 font-bold block text-[10px] uppercase">TWITTER / X CARD</span>
                        {data.twitterCard.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={data.twitterCard.image}
                            alt="Twitter Card Preview"
                            className="w-full h-32 object-cover rounded-lg border border-slate-800"
                          />
                        )}
                        <div className="text-slate-100 font-bold truncate">{data.twitterCard.title || data.openGraph.title || data.meta.title || "No Twitter Title"}</div>
                        <div className="text-slate-400 text-[11px] line-clamp-2">{data.twitterCard.description || data.openGraph.description || data.meta.description || "No Twitter Description"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ToolOutputPanel>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
