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
  Camera,
  Globe,
  Monitor,
  Tablet,
  Smartphone,
  Download,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";

type RequestState = "READY" | "RUNNING" | "COMPLETE" | "ERROR";

type ViewportPreset = "desktop" | "tablet" | "mobile";

interface ViewportDimensions {
  width: number;
  height: number;
}

const VIEWPORT_PRESETS: Record<ViewportPreset, ViewportDimensions> = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

interface ScreenshotApiResponse {
  success: boolean;
  url?: string;
  resolvedIp?: string;
  dataUrl?: string;
  contentType?: string;
  sizeBytes?: number;
  capturedAt?: string;
  errorCategory?: string;
  errorMessage?: string;
}

export default function WebsiteScreenshotPage() {
  const [targetUrl, setTargetUrl] = useState("https://snowwebdev.com");
  const [viewportPreset, setViewportPreset] = useState<ViewportPreset>("desktop");
  const [fullPage, setFullPage] = useState(false);

  const [requestState, setRequestState] = useState<RequestState>("READY");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [result, setResult] = useState<ScreenshotApiResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleCapture = async (e?: React.FormEvent) => {
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

    const preset = VIEWPORT_PRESETS[viewportPreset];

    try {
      const response = await fetch("/api/tools/website/screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: targetUrl,
          viewportWidth: preset.width,
          viewportHeight: preset.height,
          fullPage,
        }),
      });

      const data: ScreenshotApiResponse = await response.json();

      if (!isMountedRef.current) return;

      if (!response.ok || !data.success) {
        setRequestState("ERROR");
        setErrorCategory(data.errorCategory || "RENDER_FAILED");
        setErrorMessage(data.errorMessage || "Failed to capture website screenshot.");
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

  const handleCopyDataUrl = () => {
    if (result?.dataUrl) {
      navigator.clipboard.writeText(result.dataUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolShell>
      <ToolHeader
        title="WEBSITE SCREENSHOT GENERATOR"
        description="High-fidelity edge headless browser capture across responsive desktop, tablet, and mobile viewports."
        category="WEBSITE LAB"
        badge="CLOUDFLARE BROWSER RUN"
        isLocalOnly={false}
        status={requestState === "RUNNING" ? "scanning" : requestState === "COMPLETE" ? "completed" : "engine-ready"}
        statusMessage={
          requestState === "RUNNING"
            ? "Capturing edge viewport..."
            : requestState === "COMPLETE"
            ? "Screenshot rendered"
            : "Ready for target URL"
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <ToolInputPanel
              title="TARGET SPECIFICATIONS"
              badge="SPECIFICATIONS"
            >
              <form onSubmit={handleCapture} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="target-url-input" className="block text-xs font-mono font-semibold text-slate-300">
                    TARGET WEBSITE URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      id="target-url-input"
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="e.g. https://example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      disabled={requestState === "RUNNING"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono font-semibold text-slate-300">
                    VIEWPORT RESOLUTION
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "desktop", label: "Desktop", desc: "1440 × 900", icon: Monitor },
                      { id: "tablet", label: "Tablet", desc: "768 × 1024", icon: Tablet },
                      { id: "mobile", label: "Mobile", desc: "390 × 844", icon: Smartphone },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = viewportPreset === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setViewportPreset(item.id as ViewportPreset)}
                          disabled={requestState === "RUNNING"}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                            isSelected
                              ? "bg-cyan-950/60 border-cyan-500/80 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                              : "bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Icon className="w-4 h-4" />
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                          </div>
                          <div className="mt-2">
                            <div className="text-xs font-mono font-bold">{item.label}</div>
                            <div className="text-[10px] font-mono text-slate-500">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={fullPage}
                      onChange={(e) => setFullPage(e.target.checked)}
                      disabled={requestState === "RUNNING"}
                      className="w-4 h-4 rounded border-slate-800 text-cyan-500 focus:ring-cyan-400 bg-slate-950"
                    />
                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-200">Full-Page Scrolling Capture</span>
                      <p className="text-[10px] font-sans text-slate-400">Renders entire document scroll height</p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={requestState === "RUNNING"}
                  className="w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Camera className="w-4 h-4" />
                  <span>{requestState === "RUNNING" ? "CAPTURING VIEWPORT..." : "CAPTURE SCREENSHOT"}</span>
                </button>
              </form>
            </ToolInputPanel>

            <ToolVisualStage
              visualType="dns"
              mode="website-hub"
              statusLabel={requestState === "RUNNING" ? "BROWSER_RUNNING" : requestState === "COMPLETE" ? "CAPTURE_COMPLETE" : "SYSTEM_READY"}
              metricLabel="VIEWPORT"
              metricValue={`${VIEWPORT_PRESETS[viewportPreset].width}x${VIEWPORT_PRESETS[viewportPreset].height}`}
              isError={requestState === "ERROR"}
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <ToolOutputPanel
              title="CAPTURE RESULT & ARTIFACT"
              badge={requestState === "COMPLETE" ? "200 OK" : requestState === "ERROR" ? "ERROR" : "STANDBY"}
              actions={
                result?.dataUrl ? (
                  <div className="flex flex-wrap items-center gap-3 w-full justify-between">
                    <div className="text-[11px] font-mono text-slate-400">
                      Format: <strong className="text-slate-200">{result.contentType}</strong> | Size: <strong className="text-slate-200">{Math.round((result.sizeBytes || 0) / 1024)} KB</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyDataUrl}
                        className="py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1.5"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "COPIED" : "COPY DATA URL"}</span>
                      </button>
                      <a
                        href={result.dataUrl}
                        download={`screenshot-${new Date().getTime()}.png`}
                        className="py-2 px-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>DOWNLOAD</span>
                      </a>
                    </div>
                  </div>
                ) : null
              }
            >
              {requestState === "READY" && (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-mono text-slate-300">NO CAPTURE IN PROGRESS</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Submit a valid target website URL above to trigger server-side browser rendering.
                    </p>
                  </div>
                </div>
              )}

              {requestState === "RUNNING" && (
                <div className="py-20 text-center space-y-4">
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
                    <Camera className="w-5 h-5 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-mono text-cyan-300">CLOUDFLARE BROWSER RUNNING</h4>
                    <p className="text-xs font-mono text-slate-400">
                      Navigating to {targetUrl} ({VIEWPORT_PRESETS[viewportPreset].width}×{VIEWPORT_PRESETS[viewportPreset].height})
                    </p>
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
                        <h4 className="text-sm font-bold text-rose-200">CAPTURE REJECTED / FAILED</h4>
                      </div>
                      <p className="text-xs text-rose-300 font-mono leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>

                  {errorCategory === "BROWSER_QUOTA_EXHAUSTED" && (
                    <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs font-mono flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Cloudflare Workers Free browser daily rendering quota reached. Please try again tomorrow or upgrade plan.</span>
                    </div>
                  )}
                </ProximitySurface>
              )}

              {requestState === "COMPLETE" && result?.dataUrl && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-300 truncate">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">{result.url}</span>
                    </div>
                    {result.resolvedIp && (
                      <SystemBadge variant="cyan" size="sm">IP: {result.resolvedIp}</SystemBadge>
                    )}
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-2 overflow-hidden max-h-[600px] overflow-y-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={result.dataUrl}
                      alt={`Screenshot of ${result.url}`}
                      className="w-full h-auto rounded-lg shadow-2xl"
                    />
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
