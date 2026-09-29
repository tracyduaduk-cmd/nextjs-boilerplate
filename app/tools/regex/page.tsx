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

const SAMPLE_PATTERN = `([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})`;
const SAMPLE_TEXT = `Contact us at support@example.com or engineering@example.com for service inquiries.
Direct technical contact: dajinjihn@gmail.com or emergency-triage@dev.snow.internal.`;

export default function RegexToolPage() {
  const [pattern, setPattern] = useState(SAMPLE_PATTERN);
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState(SAMPLE_TEXT);

  const regexAnalysis = useMemo(() => {
    if (!pattern) {
      return { matches: [], error: null, count: 0, highlightedHtml: testText };
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches: Array<{ match: string; index: number; groups: string[] }> = [];

      let matchExec;
      if (flags.includes("g")) {
        let safetyCounter = 0;
        while ((matchExec = regex.exec(testText)) !== null && safetyCounter < 500) {
          safetyCounter++;
          matches.push({
            match: matchExec[0],
            index: matchExec.index,
            groups: matchExec.slice(1),
          });
          if (matchExec.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        matchExec = regex.exec(testText);
        if (matchExec) {
          matches.push({
            match: matchExec[0],
            index: matchExec.index,
            groups: matchExec.slice(1),
          });
        }
      }

      // Generate highlighted HTML
      let lastIndex = 0;
      let html = "";
      for (const m of matches) {
        const before = testText.slice(lastIndex, m.index);
        html += escapeHtml(before);
        html += `<mark class="bg-sky-400/30 text-sky-200 border border-sky-400/60 px-1 rounded font-bold">${escapeHtml(m.match)}</mark>`;
        lastIndex = m.index + m.match.length;
      }
      html += escapeHtml(testText.slice(lastIndex));

      return {
        matches,
        error: null,
        count: matches.length,
        highlightedHtml: html,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        matches: [],
        error: message,
        count: 0,
        highlightedHtml: escapeHtml(testText),
      };
    }
  }, [pattern, flags, testText]);

  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <ToolShell>
      <ToolHeader
        title="Regex Tester & Matcher"
        description="Test regular expressions in real-time, inspect capture groups, and visualize matches with zero server execution."
        category="BUILD UTILITY"
        badge="Safe Client Execution"
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Regular Expression Column */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Pattern & Test String"
              actions={
                <ToolActions
                  onSampleData={() => {
                    setPattern(SAMPLE_PATTERN);
                    setTestText(SAMPLE_TEXT);
                    setFlags("g");
                  }}
                  sampleLabel="Sample Email Regex"
                  onClear={() => {
                    setPattern("");
                    setTestText("");
                  }}
                />
              }
            >
              <div className="space-y-4">
                {/* Pattern & Flags */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">/</span>
                    <input
                      type="text"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="e.g. ([a-z]+)"
                      className="w-full pl-8 pr-8 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sky-300 font-mono text-sm focus:outline-none focus:border-sky-500"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">/</span>
                  </div>

                  {/* Flag Toggles */}
                  <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl shrink-0">
                    {["g", "i", "m", "s"].map((flag) => {
                      const active = flags.includes(flag);
                      return (
                        <button
                          key={flag}
                          type="button"
                          onClick={() => toggleFlag(flag)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                            active
                              ? "bg-sky-400 text-slate-950 font-bold"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {flag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Test Text Area */}
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Test Input Text:</label>
                  <textarea
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    placeholder="Enter test text to execute regex against..."
                    rows={6}
                    className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs sm:text-sm focus:outline-none focus:border-sky-500 transition-all leading-relaxed"
                  />
                </div>
              </div>
            </ToolInputPanel>

            {/* Output Match Visualization Panel */}
            <ToolOutputPanel
              title="Match Visualization"
              badge={`${regexAnalysis.count} Match${regexAnalysis.count === 1 ? "" : "es"} Found`}
              error={regexAnalysis.error}
            >
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono text-slate-400 mb-2">Highlighted Text:</p>
                  <div
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-all min-h-[100px]"
                    dangerouslySetInnerHTML={{ __html: regexAnalysis.highlightedHtml }}
                  />
                </div>

                {regexAnalysis.matches.length > 0 && (
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-2">Extracted Matches & Capture Groups:</p>
                    <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                      {regexAnalysis.matches.map((m, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs font-mono space-y-1">
                          <div className="flex items-center justify-between text-slate-400">
                            <span className="text-sky-400 font-bold">Match #{idx + 1} (Index {m.index}):</span>
                            <span className="text-emerald-400">{m.match}</span>
                          </div>
                          {m.groups.length > 0 && (
                            <div className="pl-3 border-l border-slate-800 space-y-0.5 text-slate-400">
                              {m.groups.map((grp, gIdx) => (
                                <p key={gIdx}>Group ${gIdx + 1}: <span className="text-amber-300">{grp}</span></p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ToolOutputPanel>
          </div>

          {/* Right Visual / System Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage visualType="regex"
              pageKey="tools_regex"
              slotKey="visual_stage"
              mode="security"
              statusLabel={regexAnalysis.error ? "PATTERN SYNTAX ERROR" : "MATCH SCAN COMPLETE"}
              metricLabel="TOTAL MATCHES"
              metricValue={String(regexAnalysis.count)}
              accentColor={regexAnalysis.error ? "#f43f5e" : "#38bdf8"}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">Bounded Evaluation Safeguard</p>
                <p className="text-slate-400 leading-relaxed">
                  Regex evaluation executes locally in your browser with strict iteration caps (max 500 global matches) to prevent main-thread hangs during complex pattern matching.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Common Flag Descriptions
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                <li><strong className="text-sky-400">g</strong> — Global match (don&apos;t stop after first)</li>
                <li><strong className="text-sky-400">i</strong> — Case-insensitive search</li>
                <li><strong className="text-sky-400">m</strong> — Multi-line mode (^ and $ match lines)</li>
                <li><strong className="text-sky-400">s</strong> — Dotall (. matches newlines)</li>
              </ul>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Defensive Security & Input Validation"
          serviceSlug="security-care"
          serviceDescription="Unsanitized user inputs and flawed regex validation create critical vulnerability paths. Request Snow Security Care for input hardening."
          careCategorySlug="security-care"
        />
      </Container>
    </ToolShell>
  );
}
