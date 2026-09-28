"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolActions } from "@/components/tools/ToolActions";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { Container } from "@/components/ui/Container";

const SAMPLE_TEXT = "https://snow.tech/request";

export default function QrToolPage() {
  const [content, setContent] = useState(SAMPLE_TEXT);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function generateQr() {
      if (!content.trim()) {
        if (active) {
          setQrDataUrl("");
          setError(null);
        }
        return;
      }

      try {
        const dataUrl = await QRCode.toDataURL(content, {
          width: 360,
          margin: 2,
          color: {
            dark: "#020617",
            light: "#38bdf8",
          },
        });

        if (active) {
          setQrDataUrl(dataUrl);
          setError(null);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (active) {
          setQrDataUrl("");
          setError(`QR Generation Error: ${msg}`);
        }
      }
    }

    generateQr();

    return () => {
      active = false;
    };
  }, [content]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "snow-qr-code.png";
    a.click();
  };

  return (
    <ToolShell>
      <ToolHeader
        title="Client-Side QR Code Generator"
        description="Generate high-resolution QR codes locally in your browser. Zero third-party API dependencies or content tracking."
        category="DESIGN UTILITY"
        badge="Zero Network Calls"
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Generator Workspace */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="QR Payload / URL"
              actions={
                <ToolActions
                  onSampleData={() => setContent(SAMPLE_TEXT)}
                  sampleLabel="Sample Request URL"
                  onClear={() => setContent("")}
                  copyContent={content}
                />
              }
            >
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter text, URL, WiFi config or contact info..."
                rows={5}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-sky-200 font-mono text-xs sm:text-sm focus:outline-none focus:border-sky-500 transition-all leading-relaxed"
              />
            </ToolInputPanel>

            <ToolOutputPanel
              title="Generated QR Code Matrix"
              badge={qrDataUrl ? "360x360 PNG Ready" : "Awaiting Payload"}
              error={error}
              actions={
                <ToolActions
                  onDownload={qrDataUrl ? handleDownload : undefined}
                  copyContent={qrDataUrl}
                />
              }
            >
              {qrDataUrl ? (
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="p-3 bg-sky-400 rounded-2xl shadow-xl border border-sky-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrDataUrl}
                      alt="Generated QR Code"
                      className="w-56 h-56 rounded-xl object-contain"
                    />
                  </div>
                  <p className="text-xs font-mono text-slate-400 max-w-sm text-center truncate">
                    Payload: <span className="text-slate-200">{content}</span>
                  </p>
                </div>
              ) : (
                <div className="p-10 text-center text-slate-500 text-xs font-mono">
                  Enter text or a URL above to generate a QR matrix...
                </div>
              )}
            </ToolOutputPanel>
          </div>

          {/* Right Visual / System Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage
              mode="local"
              statusLabel="CANVAS QR RENDERING"
              metricLabel="DEPENDENCY"
              metricValue="LOCAL CANVAS"
              accentColor="#38bdf8"
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">Privacy & Payload Security</p>
                <p className="text-slate-400 leading-relaxed">
                  Unlike external QR generator endpoints that log destination URLs, this generator runs strictly using HTML5 Canvas inside your client browser.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Supported Payload Types
              </h4>
              <ul className="text-xs text-slate-300 space-y-1 font-mono">
                <li>• Web URLs (https://)</li>
                <li>• Plain Text & Wi-Fi strings</li>
                <li>• vCard Contact Details</li>
                <li>• Bitcoin / Crypto addresses</li>
              </ul>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Mobile & QR Integration"
          serviceSlug="app-care"
          serviceDescription="Building custom mobile QR scanning workflows, authentication tokens, or physical product integrations? Snow provides mobile app engineering."
          careCategorySlug="app-care"
        />
      </Container>
    </ToolShell>
  );
}
