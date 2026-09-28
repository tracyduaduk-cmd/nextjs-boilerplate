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

function generateUuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Safe cryptographically random fallback
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => {
    const num = Number(c);
    return (
      num ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))
    ).toString(16);
  });
}

export default function UuidToolPage() {
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [seed, setSeed] = useState<number>(0);

  const uuids = useMemo(() => {
    // Re-evaluate when quantity, uppercase, hyphens, or seed changes
    const list: string[] = [];
    const count = Math.min(Math.max(quantity, 1), 100);

    for (let i = 0; i < count; i++) {
      let id = generateUuidV4();
      if (!hyphens) {
        id = id.replace(/-/g, "");
      }
      if (uppercase) {
        id = id.toUpperCase();
      }
      list.push(id);
    }
    return list;
  }, [quantity, uppercase, hyphens, seed]);

  const outputText = uuids.join("\n");

  const handleGenerate = () => {
    setSeed((prev) => prev + 1);
  };

  return (
    <ToolShell>
      <ToolHeader
        title="UUID v4 Batch Generator"
        description="Generate cryptographically strong Version-4 Universally Unique Identifiers using standard Web Crypto APIs."
        category="ENCODE & SECURITY"
        badge="Crypto.randomUUID()"
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Controls Column */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Generator Parameters"
              actions={
                <div className="flex flex-wrap items-center justify-between w-full gap-3">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm font-mono bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all shadow-md"
                  >
                    Generate New Batch ↻
                  </button>

                  <ToolActions
                    onClear={() => setQuantity(1)}
                    copyContent={outputText}
                  />
                </div>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Quantity (1 - 100):</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="uppercase-toggle"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="w-4 h-4 accent-sky-400 rounded cursor-pointer"
                  />
                  <label htmlFor="uppercase-toggle" className="text-xs font-mono text-slate-300 cursor-pointer">
                    Uppercase Output
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="hyphen-toggle"
                    checked={hyphens}
                    onChange={(e) => setHyphens(e.target.checked)}
                    className="w-4 h-4 accent-sky-400 rounded cursor-pointer"
                  />
                  <label htmlFor="hyphen-toggle" className="text-xs font-mono text-slate-300 cursor-pointer">
                    Include Hyphens
                  </label>
                </div>
              </div>
            </ToolInputPanel>

            <ToolOutputPanel
              title="Generated UUID Identifiers"
              badge={`${uuids.length} Generated`}
              actions={<ToolActions copyContent={outputText} />}
            >
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm space-y-1.5 max-h-[360px] overflow-y-auto leading-relaxed">
                {uuids.map((id, index) => (
                  <div key={index} className="flex items-center justify-between group hover:bg-slate-900/60 p-1.5 rounded">
                    <span>{id}</span>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(id)}
                      className="text-[10px] font-mono text-slate-500 hover:text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      copy
                    </button>
                  </div>
                ))}
              </div>
            </ToolOutputPanel>
          </div>

          {/* Right Visual / System Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage
              mode="security"
              statusLabel="ENTROPY ENGINE ONLINE"
              metricLabel="BATCH SIZE"
              metricValue={String(uuids.length)}
              accentColor="#38bdf8"
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">UUID v4 Cryptographic Collision Probability</p>
                <p className="text-slate-400 leading-relaxed">
                  Version 4 UUIDs provide 122 bits of random entropy. The likelihood of generating a single collision is practically zero (~1 in 2.71 × 10¹⁸).
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                UUID v4 Anatomy
              </h4>
              <p className="text-xs font-mono text-slate-300 leading-relaxed">
                xxxxxxxx-xxxx-<span className="text-amber-400">4</span>xxx-<span className="text-emerald-400">y</span>xxx-xxxxxxxxxxxx
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Position 13 is fixed to `4` for Version 4; position 17 uses variants 8, 9, A, or B.
              </p>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Database & Architecture Design"
          serviceSlug="app-care"
          serviceDescription="Designing distributed databases, primary key indexing strategies, or high-concurrency data models? Snow provides architecture consultations."
          careCategorySlug="app-care"
        />
      </Container>
    </ToolShell>
  );
}
