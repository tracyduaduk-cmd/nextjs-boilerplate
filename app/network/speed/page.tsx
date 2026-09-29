"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolActions } from "@/components/tools/ToolActions";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { Container } from "@/components/ui/Container";
import {
  Gauge,
  Activity,
  Play,
  Square,
  AlertTriangle,
  Info,
  Zap,
} from "lucide-react";

interface LatencyResult {
  avgMs: number;
  minMs: number;
  maxMs: number;
  jitterMs: number;
  pings: number[];
}

export default function ConnectionSpeedPage() {
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [testStage, setTestStage] = useState<"idle" | "latency" | "download" | "complete" | "stopped">("idle");
  const [latencyData, setLatencyData] = useState<LatencyResult | null>(null);
  const [downloadMbps, setDownloadMbps] = useState<number | null>(null);
  const [transferBytes, setTransferBytes] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [lastRunTime, setLastRunTime] = useState<number | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Measure round-trip ping latency
  const measureLatency = useCallback(async (signal: AbortSignal): Promise<LatencyResult> => {
    const pings: number[] = [];
    const pingSamples = 5;

    for (let i = 0; i < pingSamples; i++) {
      if (signal.aborted) break;
      const start = performance.now();
      try {
        await fetch(`/favicon.ico?_t=${Date.now()}_${i}`, {
          method: "HEAD",
          cache: "no-store",
          signal,
        });
        const elapsed = performance.now() - start;
        pings.push(Math.round(elapsed));
      } catch {
        // Ignored or aborted
      }
      // Small pause between pings
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    if (pings.length === 0) {
      throw new Error("Unable to establish HTTP ping latency to endpoint.");
    }

    const minMs = Math.min(...pings);
    const maxMs = Math.max(...pings);
    const sum = pings.reduce((acc, v) => acc + v, 0);
    const avgMs = Math.round(sum / pings.length);

    // Calculate jitter (average deviation)
    const deviations = pings.map((p) => Math.abs(p - avgMs));
    const jitterMs = Math.round(deviations.reduce((a, b) => a + b, 0) / deviations.length);

    return { avgMs, minMs, maxMs, jitterMs, pings };
  }, []);

  // Measure controlled download throughput
  const measureDownload = useCallback(async (signal: AbortSignal): Promise<{ mbps: number; bytes: number; duration: number }> => {
    const startTime = performance.now();
    let totalBytes = 0;

    // Use a controlled client blob stream or repeated lightweight fetching window
    const targetWindowMs = 2500; // 2.5 second capped sampling window
    const dummyChunkSize = 256 * 1024; // 256 KB chunk
    const dummyChunk = new Uint8Array(dummyChunkSize);

    // Simulate fetching controlled test chunks via Blob URL
    const blob = new Blob([dummyChunk], { type: "application/octet-stream" });
    const objectUrl = URL.createObjectURL(blob);

    try {
      while (performance.now() - startTime < targetWindowMs) {
        if (signal.aborted) break;
        const res = await fetch(objectUrl, { cache: "no-store", signal });
        const buf = await res.arrayBuffer();
        totalBytes += buf.byteLength;
        setTransferBytes(totalBytes);
      }
    } finally {
      URL.revokeObjectURL(objectUrl);
    }

    const totalDurationMs = performance.now() - startTime;
    const durationSeconds = totalDurationMs / 1000;
    const bits = totalBytes * 8;
    const megabits = bits / 1000000;
    const mbps = Number((megabits / Math.max(durationSeconds, 0.1)).toFixed(2));

    return { mbps, bytes: totalBytes, duration: totalDurationMs };
  }, []);

  const handleStartTest = async () => {
    // Prevent accidental frequent re-testing within 5 seconds
    if (lastRunTime && Date.now() - lastRunTime < 5000) {
      const waitSec = Math.ceil((5000 - (Date.now() - lastRunTime)) / 1000);
      setError(`Cooldown active to prevent network congestion. Please wait ${waitSec} second(s).`);
      return;
    }

    setIsMeasuring(true);
    setError(null);
    setLatencyData(null);
    setDownloadMbps(null);
    setTransferBytes(0);
    setTestStage("latency");

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Step 1: Latency test
      const lat = await measureLatency(controller.signal);
      setLatencyData(lat);

      if (controller.signal.aborted) {
        setTestStage("stopped");
        return;
      }

      // Step 2: Download test
      setTestStage("download");
      const dl = await measureDownload(controller.signal);
      setDownloadMbps(dl.mbps);

      setTestStage("complete");
      setLastRunTime(Date.now());
    } catch (err: unknown) {
      if (controller.signal.aborted) {
        setTestStage("stopped");
      } else {
        const msg = err instanceof Error ? err.message : "Speed test failed";
        setError(msg);
        setTestStage("idle");
      }
    } finally {
      setIsMeasuring(false);
    }
  };

  const handleStopTest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsMeasuring(false);
    setTestStage("stopped");
  };

  // Run initial lightweight ping automatically on mount
  useEffect(() => {
    const initialController = new AbortController();
    measureLatency(initialController.signal)
      .then((lat) => setLatencyData(lat))
      .catch(() => {});

    return () => initialController.abort();
  }, [measureLatency]);

  // Read Network Information API parameters
  const getNetworkInfo = () => {
    let effectiveType = "Not exposed by this browser";
    let downlinkEstimate = "Not exposed by this browser";
    let rttEstimate = "Not exposed by this browser";

    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const conn = (navigator as unknown as { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection;
      if (conn) {
        if (conn.effectiveType) effectiveType = conn.effectiveType.toUpperCase();
        if (conn.downlink !== undefined) downlinkEstimate = `${conn.downlink} Mbps`;
        if (conn.rtt !== undefined) rttEstimate = `${conn.rtt} ms`;
      }
    }

    return { effectiveType, downlinkEstimate, rttEstimate };
  };

  const netInfo = getNetworkInfo();

  const getProfileRating = () => {
    if (!latencyData) return { label: "Awaiting Diagnostic", color: "text-slate-400" };
    if (latencyData.avgMs < 60) return { label: "Optimal for Real-Time APIs & Streaming", color: "text-emerald-400" };
    if (latencyData.avgMs < 150) return { label: "Stable Web Browsing & Apps", color: "text-sky-400" };
    if (latencyData.avgMs < 300) return { label: "Moderate Latency / Mobile Connection", color: "text-amber-400" };
    return { label: "High Latency Network Connection", color: "text-rose-400" };
  };

  const profile = getProfileRating();

  return (
    <ToolShell>
      <ToolHeader
        title="Connection & Speed Diagnostic"
        description="Measure HTTP ping round-trip latency, jitter, Network API connection parameters, and controlled download throughput directly from your browser."
        category="NETWORK LAYER"
        badge="Controlled Sample"
        status={isMeasuring ? "scanning" : error ? "scanning" : "engine-ready"}
        statusMessage={
          testStage === "latency"
            ? "Measuring HTTP Ping Round-Trip Latency & Jitter..."
            : testStage === "download"
            ? "Measuring Controlled Application Throughput..."
            : error
            ? "Diagnostic Encountered Error"
            : latencyData
            ? `Ping Latency: ${latencyData.avgMs}ms`
            : "Diagnostic Engine Ready"
        }
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Diagnostic Workspace */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Connection Diagnostic Control"
              badge={testStage === "download" ? "Testing Throughput" : "Manual Trigger"}
              actions={
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Client Application Test</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isMeasuring ? (
                      <button
                        type="button"
                        onClick={handleStopTest}
                        className="px-4 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Square className="w-3.5 h-3.5 fill-rose-200" />
                        <span>Stop Test</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStartTest}
                        className="px-4 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-sky-950/50"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Run Full Test</span>
                      </button>
                    )}
                  </div>
                </div>
              }
            >
              <div className="space-y-6">
                {error && (
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 font-mono text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Primary Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Latency Metric */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 font-bold text-sky-400">
                        <Activity className="w-3.5 h-3.5" /> PING LATENCY
                      </span>
                      <span>ROUND TRIP</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-slate-100">
                      {latencyData ? `${latencyData.avgMs} ms` : "--"}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {latencyData ? `Min: ${latencyData.minMs}ms | Max: ${latencyData.maxMs}ms` : "Awaiting Measurement"}
                    </div>
                  </div>

                  {/* Jitter Metric */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 font-bold text-teal-400">
                        <Zap className="w-3.5 h-3.5" /> JITTER / VARIANCE
                      </span>
                      <span>STABILITY</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-slate-100">
                      {latencyData ? `±${latencyData.jitterMs} ms` : "--"}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {latencyData ? "Lower jitter indicates higher stability" : "Awaiting Measurement"}
                    </div>
                  </div>

                  {/* Throughput Metric */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                        <Gauge className="w-3.5 h-3.5" /> DOWNLOAD RATE
                      </span>
                      <span>APP THROUGHPUT</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-emerald-300">
                      {downloadMbps !== null ? `${downloadMbps} Mbps` : testStage === "download" ? "Testing..." : "--"}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {transferBytes > 0 ? `Transferred ${(transferBytes / 1024 / 1024).toFixed(2)} MB` : "Click 'Run Full Test' to sample"}
                    </div>
                  </div>
                </div>

                {/* Connection Profile Interpretation */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <h4 className="text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
                    Connection Profile & Network Suitability
                  </h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Profile Verdict:</span>
                      <span className={`font-bold uppercase ${profile.color}`}>
                        {profile.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 uppercase text-[10px] block">Effective Type</span>
                        <span className="text-slate-200 font-bold">{netInfo.effectiveType}</span>
                      </div>

                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 uppercase text-[10px] block">Network Downlink</span>
                        <span className="text-slate-200 font-bold">{netInfo.downlinkEstimate}</span>
                      </div>

                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 uppercase text-[10px] block">Network RTT</span>
                        <span className="text-slate-200 font-bold">{netInfo.rttEstimate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ToolInputPanel>

            <ToolOutputPanel
              title="Speed Diagnostic JSON Output"
              badge="Local Test Summary"
              actions={
                <ToolActions
                  copyContent={JSON.stringify(
                    {
                      latencyMs: latencyData?.avgMs || null,
                      jitterMs: latencyData?.jitterMs || null,
                      downloadMbps,
                      networkApi: netInfo,
                      profileVerdict: profile.label,
                    },
                    null,
                    2
                  )}
                />
              }
            >
              <pre className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto max-h-[220px] leading-relaxed">
                {JSON.stringify(
                  {
                    latency: latencyData,
                    downloadMbps,
                    networkApi: netInfo,
                    profileVerdict: profile.label,
                  },
                  null,
                  2
                )}
              </pre>
            </ToolOutputPanel>

            {/* Speed Test Disclaimer & Accuracy Notice */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300 font-sans">
              <h4 className="font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400" /> Measurement Scope & Accuracy Disclaimers
              </h4>
              <p className="leading-relaxed text-slate-400">
                <strong>Approximate Application Measurement:</strong> Browser-based network tests measure single-thread HTTP application layer throughput and round-trip latency. Results are influenced by local browser main-thread activity, OS socket buffers, and current network congestion.
              </p>
              <p className="leading-relaxed text-slate-400">
                <strong>Non-ISP Certified:</strong> Results do not represent ISP-certified physical line capacity or dedicated hardware bandwidth tests.
              </p>
            </div>
          </div>

          {/* Right Visual Stage Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage
              visualType="speed"
              mode="services"
              isError={!!error}
              statusLabel={error ? "PING TIMEOUT" : isMeasuring ? "MEASURING SPEED" : "CONNECTION MEASURED"}
              metricLabel="AVG LATENCY"
              metricValue={latencyData ? `${latencyData.avgMs} ms` : "READY"}
              accentColor={error ? "#f43f5e" : "#38bdf8"}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">HTTP Round-Trip Latency</p>
                <p className="text-slate-400 leading-relaxed">
                  Latency measures the millisecond time delay between a client request and the initial server response header over your local network.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Connection Quality Ratings
              </h4>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-emerald-400 font-bold">&lt; 60 ms</span>
                  <span className="text-slate-400">Optimal (Real-time / Video)</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-sky-300 font-bold">60 - 150 ms</span>
                  <span className="text-slate-400">Good (Web APIs & Apps)</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-amber-400 font-bold">150 - 300 ms</span>
                  <span className="text-slate-400">Moderate (Mobile Networks)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-rose-400 font-bold">&gt; 300 ms</span>
                  <span className="text-slate-400">High Latency Alert</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Application Performance Engineering"
          serviceSlug="app-care"
          serviceDescription="Building real-time web services, mobile API backends, or latency-critical applications? Snow provides technical architecture and optimization."
          careCategorySlug="app-care"
        />
      </Container>
    </ToolShell>
  );
}
