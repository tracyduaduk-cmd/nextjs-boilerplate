"use client";

import React, { useState, useEffect } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolActions } from "@/components/tools/ToolActions";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { Container } from "@/components/ui/Container";

const SAMPLE_INPUT = "Snow Technology Studio — High Assurance Cryptographic Hash";

export default function HashToolPage() {
  const [input, setInput] = useState(SAMPLE_INPUT);
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-384" | "SHA-512">("SHA-256");
  const [hashOutput, setHashOutput] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    let active = true;

    async function computeHash() {
      if (!input.trim()) {
        if (active) setHashOutput("");
        return;
      }

      setIsCalculating(true);
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

        if (active) {
          setHashOutput(hashHex);
        }
      } catch (err: unknown) {
        console.error("Hashing failed", err);
        if (active) setHashOutput("Error generating hash");
      } finally {
        if (active) setIsCalculating(false);
      }
    }

    computeHash();

    return () => {
      active = false;
    };
  }, [input, algorithm]);

  return (
    <ToolShell>
      <ToolHeader
        title="Web Crypto Hash Generator"
        description="Compute SHA-256, SHA-384, and SHA-512 hashes locally using standard browser Web Crypto API."
        category="ENCODE & SECURITY"
        badge="One-Way Cryptographic Digest"
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Hashing Workspace */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Input Payload"
              actions={
                <div className="flex flex-wrap items-center justify-between w-full gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-mono text-slate-400">Algorithm:</label>
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                      {(["SHA-256", "SHA-384", "SHA-512"] as const).map((alg) => (
                        <button
                          key={alg}
                          type="button"
                          onClick={() => setAlgorithm(alg)}
                          className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                            algorithm === alg ? "bg-sky-400 text-slate-950 font-bold" : "text-slate-400"
                          }`}
                        >
                          {alg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <ToolActions
                    onSampleData={() => setInput(SAMPLE_INPUT)}
                    sampleLabel="Sample Input"
                    onClear={() => setInput("")}
                    copyContent={input}
                  />
                </div>
              }
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text string to hash..."
                rows={6}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-sky-200 font-mono text-xs sm:text-sm focus:outline-none focus:border-sky-500 transition-all leading-relaxed"
              />
            </ToolInputPanel>

            <ToolOutputPanel
              title={`${algorithm} Digest Output`}
              badge={isCalculating ? "Calculating..." : `${hashOutput.length * 4} Bit Hex Output`}
              actions={<ToolActions copyContent={hashOutput} />}
            >
              <textarea
                readOnly
                value={hashOutput}
                placeholder="Hash string will appear here..."
                rows={4}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm focus:outline-none leading-relaxed break-all"
              />
            </ToolOutputPanel>
          </div>

          {/* Right Visual / System Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage visualType="hash"
              mode="security"
              statusLabel="WEB CRYPTO SUBTLE DIGEST"
              metricLabel="ALGORITHM"
              metricValue={algorithm}
              accentColor="#10b981"
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">Hashing vs Encryption</p>
                <p className="text-slate-400 leading-relaxed">
                  Cryptographic hashing is strictly a <strong className="text-slate-200">one-way mathematical function</strong>. A hash cannot be reversed or decrypted back into the original input.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Security Assurance
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Input payloads are evaluated via `window.crypto.subtle.digest()`. Content is never logged, stored, or sent across any network connection.
              </p>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Security & Cryptographic Review"
          serviceSlug="security-care"
          serviceDescription="Storing passwords, checksums, or sensitive user tokens? Ensure your system uses salted hashing frameworks like Argon2 or bcrypt instead of raw SHA."
          careCategorySlug="security-care"
        />
      </Container>
    </ToolShell>
  );
}
