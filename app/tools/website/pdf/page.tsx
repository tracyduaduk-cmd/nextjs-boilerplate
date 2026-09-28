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
  FileText,
  Globe,
  Download,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Printer,
} from "lucide-react";

type RequestState = "READY" | "RUNNING" | "COMPLETE" | "ERROR";

type PaperFormat = "A4" | "Letter" | "Legal" | "Tabloid";

interface PdfApiResponse {
  success: boolean;
  url?: string;
  resolvedIp?: string;
  dataUrl?: string;
  contentType?: string;
  sizeBytes?: number;
  generatedAt?: string;
  errorCategory?: string;
  errorMessage?: string;
}

export default function WebsitePdfPage() {
  const [targetUrl, setTargetUrl] = useState("https://snowwebdev.com");
  const [paperFormat, setPaperFormat] = useState<PaperFormat>("A4");
  const [landscape, setLandscape] = useState(false);
  const [printBackground, setPrintBackground] = useState(true);

  const [requestState, setRequestState] = useState<RequestState>("READY");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [result, setResult] = useState<PdfApiResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleGeneratePdf = async (e?: React.FormEvent) => {
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
      const response = await fetch("/api/tools/website/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: targetUrl,
          paperFormat,
          landscape,
          printBackground,
        }),
      });

      const data: PdfApiResponse = await response.json();

      if (!isMountedRef.current) return;

      if (!response.ok || !data.success) {
        setRequestState("ERROR");
        setErrorCategory(data.errorCategory || "RENDER_FAILED");
        setErrorMessage(data.errorMessage || "Failed to generate website PDF.");
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
        title="WEBSITE PDF CONVERTER"
        description="Transform live websites or web documents into standardized PDF print artifacts via Cloudflare edge workers."
        category="WEBSITE LAB"
        badge="CLOUDFLARE BROWSER RUN"
        isLocalOnly={false}
        status={requestState === "RUNNING" ? "scanning" : requestState === "COMPLETE" ? "completed" : "engine-ready"}
        statusMessage={
          requestState === "RUNNING"
            ? "Rendering PDF artifact..."
            : requestState === "COMPLETE"
            ? "PDF generated"
            : "Ready for target URL"
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <ToolInputPanel
              title="PRINT CONFIGURATION"
              badge="CONFIG"
            >
              <form onSubmit={handleGeneratePdf} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="target-url-input-pdf" className="block text-xs font-mono font-semibold text-slate-300">
                    TARGET WEBSITE URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      id="target-url-input-pdf"
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
                    PAPER FORMAT
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "A4", label: "A4 Standard", desc: "210 × 297 mm" },
                      { id: "Letter", label: "US Letter", desc: "8.5 × 11 in" },
                      { id: "Legal", label: "US Legal", desc: "8.5 × 14 in" },
                      { id: "Tabloid", label: "Tabloid", desc: "11 × 17 in" },
                    ].map((fmt) => {
                      const isSelected = paperFormat === fmt.id;
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setPaperFormat(fmt.id as PaperFormat)}
                          disabled={requestState === "RUNNING"}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "bg-cyan-950/60 border-cyan-500/80 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                              : "bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold">{fmt.label}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 mt-1">{fmt.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={landscape}
                      onChange={(e) => setLandscape(e.target.checked)}
                      disabled={requestState === "RUNNING"}
                      className="w-4 h-4 rounded border-slate-800 text-cyan-500 focus:ring-cyan-400 bg-slate-950"
                    />
                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-200">Landscape Orientation</span>
                      <p className="text-[10px] font-sans text-slate-400">Rotates printable canvas horizontally</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={printBackground}
                      onChange={(e) => setPrintBackground(e.target.checked)}
                      disabled={requestState === "RUNNING"}
                      className="w-4 h-4 rounded border-slate-800 text-cyan-500 focus:ring-cyan-400 bg-slate-950"
                    />
                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-200">Print Background Graphics</span>
                      <p className="text-[10px] font-sans text-slate-400">Includes CSS background colors & images</p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={requestState === "RUNNING"}
                  className="w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="w-4 h-4" />
                  <span>{requestState === "RUNNING" ? "GENERATING PDF..." : "GENERATE PDF"}</span>
                </button>
              </form>
            </ToolInputPanel>

            <ToolVisualStage
              visualType="dns"
              mode="website-hub"
              statusLabel={requestState === "RUNNING" ? "PDF_ENGINE_ACTIVE" : requestState === "COMPLETE" ? "PDF_READY" : "SYSTEM_READY"}
              metricLabel="FORMAT"
              metricValue={`${paperFormat} ${landscape ? "(LANDSCAPE)" : "(PORTRAIT)"}`}
              isError={requestState === "ERROR"}
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <ToolOutputPanel
              title="GENERATED PDF DOCUMENT"
              badge={requestState === "COMPLETE" ? "PDF CREATED" : requestState === "ERROR" ? "ERROR" : "STANDBY"}
              actions={
                result?.dataUrl ? (
                  <div className="flex flex-wrap items-center gap-3 w-full justify-between">
                    <div className="text-[11px] font-mono text-slate-400">
                      Format: <strong className="text-slate-200">application/pdf</strong> | Size: <strong className="text-slate-200">{Math.round((result.sizeBytes || 0) / 1024)} KB</strong>
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
                        download={`document-${new Date().getTime()}.pdf`}
                        className="py-2 px-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>DOWNLOAD PDF</span>
                      </a>
                    </div>
                  </div>
                ) : null
              }
            >
              {requestState === "READY" && (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                    <Printer className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-mono text-slate-300">NO PDF GENERATED</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Submit a target website URL above to generate a printable PDF artifact.
                    </p>
                  </div>
                </div>
              )}

              {requestState === "RUNNING" && (
                <div className="py-20 text-center space-y-4">
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
                    <FileText className="w-5 h-5 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-mono text-cyan-300">RENDERING PDF ARTIFACT</h4>
                    <p className="text-xs font-mono text-slate-400">
                      Processing {targetUrl} ({paperFormat}) via Cloudflare Browser Run
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
                        <h4 className="text-sm font-bold text-rose-200">PDF GENERATION REJECTED / FAILED</h4>
                      </div>
                      <p className="text-xs text-rose-300 font-mono leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>

                  {errorCategory === "BROWSER_QUOTA_EXHAUSTED" && (
                    <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs font-mono flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Cloudflare Workers Free browser daily rendering limit reached. Please try again tomorrow.</span>
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

                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-mono text-slate-100">PDF DOCUMENT READY</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Format: {paperFormat} ({landscape ? "Landscape" : "Portrait"}) • Size: {Math.round((result.sizeBytes || 0) / 1024)} KB
                      </p>
                    </div>
                    <div className="pt-2">
                      <iframe
                        src={result.dataUrl}
                        title="PDF Preview"
                        className="w-full h-[450px] rounded-lg border border-slate-800 bg-slate-950"
                      />
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
