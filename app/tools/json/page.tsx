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

const SAMPLE_JSON = `{
  "studio": "Snow Technology Studio",
  "project": "Snow Tools Foundation",
  "version": 1.0,
  "features": [
    "JSON Formatter & Validator",
    "Base64 / URL Encoder",
    "UUID Generator",
    "Web Crypto Hash",
    "Regex Tester",
    "Markdown Preview",
    "Color Utility",
    "Client-Side QR"
  ],
  "clientSideOnly": true,
  "config": {
    "privacy": "100% Browser Execution",
    "externalTransmission": false
  }
}`;

export default function JsonToolPage() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState<number>(2);

  const parsedResult = useMemo(() => {
    if (!input.trim()) {
      return { formatted: "", minified: "", error: null, lineCol: null, keyCount: 0, sizeBytes: 0 };
    }

    const sizeBytes = new Blob([input]).size;

    try {
      const obj = JSON.parse(input);
      const formatted = JSON.stringify(obj, null, indent);
      const minified = JSON.stringify(obj);

      const countKeys = (item: unknown): number => {
        if (typeof item !== "object" || item === null) return 0;
        let keys = Object.keys(item).length;
        for (const k in item as Record<string, unknown>) {
          keys += countKeys((item as Record<string, unknown>)[k]);
        }
        return keys;
      };

      return {
        formatted,
        minified,
        error: null,
        lineCol: null,
        keyCount: countKeys(obj),
        sizeBytes,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      let lineCol = "";

      const positionMatch = message.match(/at position (\d+)/i) || message.match(/line (\d+) column (\d+)/i);
      if (positionMatch) {
        if (positionMatch[2]) {
          lineCol = `Line ${positionMatch[1]}, Column ${positionMatch[2]}`;
        } else {
          const pos = parseInt(positionMatch[1], 10);
          const lines = input.slice(0, pos).split("\n");
          lineCol = `Line ${lines.length}, Column ${lines[lines.length - 1].length + 1}`;
        }
      }

      return {
        formatted: "",
        minified: "",
        error: message,
        lineCol,
        keyCount: 0,
        sizeBytes,
      };
    }
  }, [input, indent]);

  const handleFormat = () => {
    if (parsedResult.formatted) {
      setInput(parsedResult.formatted);
    }
  };

  const handleMinify = () => {
    if (parsedResult.minified) {
      setInput(parsedResult.minified);
    }
  };

  const handleDownload = () => {
    if (!parsedResult.formatted) return;
    const blob = new Blob([parsedResult.formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell>
      <ToolHeader
        title="JSON Formatter & Validator"
        description="Format, minify, structure, and validate JSON data entirely inside your browser. Safe, instant, zero network transmission."
        category="BUILD UTILITY"
        badge="Zero Transmission"
        status={parsedResult.error ? "scanning" : "engine-ready"}
        statusMessage={parsedResult.error ? "Invalid JSON Detected" : "JSON Valid"}
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Workspace Column */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="JSON Input Editor"
              badge={`${parsedResult.sizeBytes} Bytes`}
              actions={
                <div className="flex flex-wrap items-center justify-between w-full gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-mono text-slate-400">Indent:</label>
                    <select
                      value={indent}
                      onChange={(e) => setIndent(Number(e.target.value))}
                      className="bg-slate-950 text-slate-200 border border-slate-700 text-xs font-mono rounded-lg px-2.5 py-1 focus:outline-none focus:border-sky-400"
                    >
                      <option value={2}>2 Spaces</option>
                      <option value={4}>4 Spaces</option>
                      <option value={8}>8 Spaces</option>
                    </select>
                  </div>

                  <ToolActions
                    onSampleData={() => setInput(SAMPLE_JSON)}
                    sampleLabel="Sample JSON"
                    onClear={() => setInput("")}
                    copyContent={input}
                  />
                </div>
              }
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste or type raw JSON here..."
                rows={14}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-sky-200 font-mono text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all leading-relaxed resize-y"
              />
            </ToolInputPanel>

            <ToolOutputPanel
              title="Formatted JSON Result"
              badge={parsedResult.error ? "Error" : `${parsedResult.keyCount} Keys Identified`}
              error={parsedResult.error ? `${parsedResult.error} ${parsedResult.lineCol ? `(${parsedResult.lineCol})` : ""}` : null}
              actions={
                <div className="flex flex-wrap items-center justify-between w-full gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleFormat}
                      disabled={!parsedResult.formatted}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all disabled:opacity-40"
                    >
                      Format Input
                    </button>
                    <button
                      type="button"
                      onClick={handleMinify}
                      disabled={!parsedResult.minified}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all disabled:opacity-40"
                    >
                      Minify Input
                    </button>
                  </div>

                  <ToolActions
                    copyContent={parsedResult.formatted}
                    onDownload={parsedResult.formatted ? handleDownload : undefined}
                  />
                </div>
              }
            >
              <pre className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto max-h-[360px] leading-relaxed">
                {parsedResult.formatted || "// Formatted JSON output will appear here..."}
              </pre>
            </ToolOutputPanel>
          </div>

          {/* Right Visual / System Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage visualType="json"
              mode="commerce"
              statusLabel={parsedResult.error ? "SYNTAX ERROR DETECTED" : "DATA STRUCTURE STABLE"}
              metricLabel="TOTAL KEYS"
              metricValue={String(parsedResult.keyCount)}
              accentColor={parsedResult.error ? "#f43f5e" : "#10b981"}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">Browser Processing Architecture</p>
                <p className="text-slate-400 leading-relaxed">
                  JSON strings are parsed and reformatted entirely using standard browser V8 JavaScript engines. Sensitive data never leaves standard window memory.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Why Validate Before Integration?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Malformed JSON leads to runtime API errors, silent parsing failures, and broken database ingest pipelines. Validating structure prior to deployment prevents cascade software failures.
              </p>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Web & Application Development"
          serviceSlug="app-care"
          serviceDescription="Building APIs, data migration pipelines, or full-stack software applications? Snow provides dedicated technical engineering to structure and scale your backend."
          careCategorySlug="app-care"
        />
      </Container>
    </ToolShell>
  );
}
