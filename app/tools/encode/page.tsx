"use client";

import React, { useState, useMemo } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolActions } from "@/components/tools/ToolActions";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { Container } from "@/components/ui/Container";

const SAMPLE_TEXT = "Snow Technology Studio — Secure Data Layer 2026";

export default function EncodeToolPage() {
  const [input, setInput] = useState(SAMPLE_TEXT);
  const [mode, setMode] = useState<"base64" | "url">("base64");
  const [action, setAction] = useState<"encode" | "decode">("encode");

  const result = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };

    try {
      if (mode === "base64") {
        if (action === "encode") {
          // UTF-8 friendly Base64 encode
          const encoded = btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
          return { output: encoded, error: null };
        } else {
          // UTF-8 friendly Base64 decode
          const decoded = decodeURIComponent(
            Array.prototype.map
              .call(atob(input.trim()), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          return { output: decoded, error: null };
        }
      } else {
        if (action === "encode") {
          return { output: encodeURIComponent(input), error: null };
        } else {
          return { output: decodeURIComponent(input), error: null };
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { output: "", error: `Failed to ${action} (${mode.toUpperCase()}): ${msg}` };
    }
  }, [input, mode, action]);

  const handleSwap = () => {
    if (result.output && !result.error) {
      setInput(result.output);
      setAction(action === "encode" ? "decode" : "encode");
    }
  };

  return (
    <ToolShell>
      <ToolHeader
        title="Base64 & URL Encoder / Decoder"
        description="Encode or decode strings using Base64 or standard URL percent-encoding. 100% browser native execution."
        category="ENCODE & SECURITY"
        badge="UTF-8 Safe"
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Transformation Column */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Input String"
              actions={
                <div className="flex flex-wrap items-center justify-between w-full gap-3">
                  <div className="flex items-center gap-2">
                    {/* Mode selector */}
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setMode("base64")}
                        className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                          mode === "base64" ? "bg-sky-400 text-slate-950 font-bold" : "text-slate-400"
                        }`}
                      >
                        Base64
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode("url")}
                        className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                          mode === "url" ? "bg-sky-400 text-slate-950 font-bold" : "text-slate-400"
                        }`}
                      >
                        URL Component
                      </button>
                    </div>

                    {/* Action selector */}
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setAction("encode")}
                        className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                          action === "encode" ? "bg-emerald-400 text-slate-950 font-bold" : "text-slate-400"
                        }`}
                      >
                        Encode
                      </button>
                      <button
                        type="button"
                        onClick={() => setAction("decode")}
                        className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                          action === "decode" ? "bg-emerald-400 text-slate-950 font-bold" : "text-slate-400"
                        }`}
                      >
                        Decode
                      </button>
                    </div>
                  </div>

                  <ToolActions
                    onSampleData={() => setInput(SAMPLE_TEXT)}
                    sampleLabel="Sample Text"
                    onClear={() => setInput("")}
                    copyContent={input}
                  />
                </div>
              }
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Enter content to ${action} (${mode.toUpperCase()})...`}
                rows={6}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-sky-200 font-mono text-xs sm:text-sm focus:outline-none focus:border-sky-500 transition-all leading-relaxed"
              />
            </ToolInputPanel>

            <ToolOutputPanel
              title={`${action.toUpperCase()}D Output (${mode.toUpperCase()})`}
              badge={result.error ? "Decoding Error" : "Output Ready"}
              error={result.error}
              actions={
                <ToolActions
                  copyContent={result.output}
                  onSwap={result.output ? handleSwap : undefined}
                />
              }
            >
              <textarea
                readOnly
                value={result.output}
                placeholder="Transformed string will appear here..."
                rows={6}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm focus:outline-none leading-relaxed"
              />
            </ToolOutputPanel>
          </div>

          {/* Right Visual / System Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage visualType="encode"
              mode="security"
              statusLabel={result.error ? "DECODE ERROR" : "TRANSFORMATION READY"}
              metricLabel="MODE"
              metricValue={`${mode.toUpperCase()} / ${action.toUpperCase()}`}
              accentColor={result.error ? "#f43f5e" : "#10b981"}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">Encoding vs Encryption Notice</p>
                <p className="text-slate-400 leading-relaxed">
                  Base64 and URL encoding are data representation transformations for transit safety, NOT cryptographic encryption methods.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                UTF-8 Character Support
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Native `btoa` / `atob` methods fail on non-ASCII characters. Snow’s encoder uses standard URI component escaping to support multi-byte UTF-8 strings safely.
              </p>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Application Data Engineering"
          serviceSlug="app-care"
          serviceDescription="Building API endpoints, webhook processors, or secure data transfer channels? Snow provides ongoing application engineering."
          careCategorySlug="app-care"
        />
      </Container>
    </ToolShell>
  );
}
