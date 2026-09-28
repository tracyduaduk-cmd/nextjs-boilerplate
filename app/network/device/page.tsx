"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Laptop,
  Monitor,
  Cpu,
  Globe,
  Wifi,
  Battery,
  ShieldCheck,
  RefreshCw,
  Info,
  Lock,
} from "lucide-react";

interface DeviceDiagnosticData {
  browser: string;
  os: string;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  cpuCores: string;
  deviceMemoryGb: string;
  language: string;
  timezone: string;
  onlineState: string;
  connectionType: string;
  effectiveConnectionType: string;
  downlinkEstimate: string;
  rttEstimate: string;
  webglVendor: string;
  webglRenderer: string;
  batteryLevel: string;
  batteryCharging: string;
}

export default function DeviceDiagnosticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [deviceData, setDeviceData] = useState<DeviceDiagnosticData | null>(null);
  const [unexposedCount, setUnexposedCount] = useState(0);

  const parseBrowserAndOs = () => {
    if (typeof window === "undefined") {
      return { browser: "Server Side", os: "Server Side" };
    }

    const ua = navigator.userAgent;
    let browserName = "Unknown Browser";
    let browserVersion = "";

    if (ua.includes("Firefox/")) {
      browserName = "Mozilla Firefox";
      browserVersion = ua.split("Firefox/")[1]?.split(" ")[0] || "";
    } else if (ua.includes("Edg/")) {
      browserName = "Microsoft Edge";
      browserVersion = ua.split("Edg/")[1]?.split(" ")[0] || "";
    } else if (ua.includes("Chrome/")) {
      browserName = "Google Chrome";
      browserVersion = ua.split("Chrome/")[1]?.split(" ")[0] || "";
    } else if (ua.includes("Safari/")) {
      browserName = "Apple Safari";
      browserVersion = ua.split("Version/")[1]?.split(" ")[0] || "";
    }

    const fullBrowser = browserVersion ? `${browserName} (${browserVersion})` : browserName;

    let osName = "Unknown OS";
    if (ua.includes("Win")) osName = "Windows";
    else if (ua.includes("Mac")) osName = "macOS";
    else if (ua.includes("Android")) osName = "Android";
    else if (ua.includes("Linux")) osName = "Linux";
    else if (ua.includes("iPhone") || ua.includes("iPad")) osName = "iOS";

    return { browser: fullBrowser, os: osName };
  };

  const runDiagnostics = useCallback(async () => {
    setIsLoading(true);
    let missingProps = 0;

    const { browser, os } = parseBrowserAndOs();

    // Screen & Viewport
    const screenWidth = window.screen?.width || 0;
    const screenHeight = window.screen?.height || 0;
    const viewportWidth = window.innerWidth || 0;
    const viewportHeight = window.innerHeight || 0;
    const devicePixelRatio = window.devicePixelRatio || 1;

    // CPU Logical Cores
    let cpuCores = "Not exposed by this browser";
    if (navigator.hardwareConcurrency) {
      cpuCores = `${navigator.hardwareConcurrency} Cores`;
    } else {
      missingProps++;
    }

    // Device Memory
    let deviceMemoryGb = "Not exposed by this browser";
    const navWithMem = navigator as unknown as { deviceMemory?: number };
    if (navWithMem.deviceMemory) {
      deviceMemoryGb = `~${navWithMem.deviceMemory} GB`;
    } else {
      missingProps++;
    }

    // Language & Timezone
    const language = navigator.language || "Not exposed by this browser";
    let timezone = "Not exposed by this browser";
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Not exposed by this browser";
    } catch {
      missingProps++;
    }

    // Online State
    const onlineState = navigator.onLine ? "Online" : "Offline";

    // Network Information API
    let connectionType = "Not exposed by this browser";
    let effectiveConnectionType = "Not exposed by this browser";
    let downlinkEstimate = "Not exposed by this browser";
    let rttEstimate = "Not exposed by this browser";

    const navWithConn = navigator as unknown as {
      connection?: {
        type?: string;
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
      };
      mozConnection?: unknown;
      webkitConnection?: unknown;
    };

    const conn = navWithConn.connection;
    if (conn) {
      if (conn.type) connectionType = conn.type;
      else missingProps++;

      if (conn.effectiveType) effectiveConnectionType = conn.effectiveType.toUpperCase();
      else missingProps++;

      if (conn.downlink !== undefined) downlinkEstimate = `${conn.downlink} Mbps`;
      else missingProps++;

      if (conn.rtt !== undefined) rttEstimate = `${conn.rtt} ms`;
      else missingProps++;
    } else {
      missingProps += 4;
    }

    // WebGL Renderer / Vendor
    let webglVendor = "Not exposed by this browser";
    let webglRenderer = "Not exposed by this browser";

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl && "getExtension" in gl) {
        const glTyped = gl as WebGLRenderingContext;
        const debugInfo = glTyped.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const vendor = glTyped.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const renderer = glTyped.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (vendor) webglVendor = String(vendor);
          if (renderer) webglRenderer = String(renderer);
        } else {
          missingProps += 2;
        }
      } else {
        missingProps += 2;
      }
    } catch {
      missingProps += 2;
    }

    // Battery Info
    let batteryLevel = "Not exposed by this browser";
    let batteryCharging = "Not exposed by this browser";

    const navWithBattery = navigator as unknown as {
      getBattery?: () => Promise<{ level: number; charging: boolean }>;
    };

    if (typeof navWithBattery.getBattery === "function") {
      try {
        const battery = await navWithBattery.getBattery();
        batteryLevel = `${Math.round(battery.level * 100)}%`;
        batteryCharging = battery.charging ? "Charging" : "Discharging / Plugged In";
      } catch {
        missingProps += 2;
      }
    } else {
      missingProps += 2;
    }

    setUnexposedCount(missingProps);
    setDeviceData({
      browser,
      os,
      screenWidth,
      screenHeight,
      viewportWidth,
      viewportHeight,
      devicePixelRatio,
      cpuCores,
      deviceMemoryGb,
      language,
      timezone,
      onlineState,
      connectionType,
      effectiveConnectionType,
      downlinkEstimate,
      rttEstimate,
      webglVendor,
      webglRenderer,
      batteryLevel,
      batteryCharging,
    });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    runDiagnostics();

    const handleResize = () => runDiagnostics();
    const handleOnline = () => runDiagnostics();
    const handleOffline = () => runDiagnostics();

    window.addEventListener("resize", handleResize);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [runDiagnostics]);

  const renderValueItem = (label: string, value: string) => {
    const isUnexposed = value === "Not exposed by this browser";
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800/80 gap-1 font-mono text-xs">
        <span className="text-slate-400 font-semibold">{label}:</span>
        <span className={isUnexposed ? "text-amber-400/90 italic" : "text-emerald-300 font-bold"}>
          {value}
        </span>
      </div>
    );
  };

  return (
    <ToolShell>
      <ToolHeader
        title="Device & Browser Diagnostics"
        description="Audit local hardware specs, browser execution parameters, display metrics, and WebGL graphics capabilities. 100% local browser execution with zero tracking."
        category="NETWORK LAYER"
        badge="100% Local"
        status={isLoading ? "scanning" : "engine-ready"}
        statusMessage={isLoading ? "Auditing Client Browser Capabilities..." : "Client Capabilities Audited"}
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Workspace Column */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Browser Capability Audit"
              badge={`${unexposedCount} Unexposed APIS`}
              actions={
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-Time Window Monitor</span>
                  </div>

                  <button
                    type="button"
                    onClick={runDiagnostics}
                    disabled={isLoading}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-sky-400" : ""}`} />
                    <span>Re-Audit Capabilities</span>
                  </button>
                </div>
              }
            >
              {isLoading || !deviceData ? (
                <div className="p-12 text-center font-mono text-xs text-sky-400 space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-sky-400" />
                  <p className="font-semibold uppercase tracking-wider">Auditing Hardware & Browser APIs...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Category 1: Environment & Screen */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-sky-400" /> Platform & Display Metrics
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {renderValueItem("Browser Engine", deviceData.browser)}
                      {renderValueItem("Operating System", deviceData.os)}
                      {renderValueItem("Screen Resolution", `${deviceData.screenWidth} x ${deviceData.screenHeight} px`)}
                      {renderValueItem("Viewport Dimensions", `${deviceData.viewportWidth} x ${deviceData.viewportHeight} px`)}
                      {renderValueItem("Device Pixel Ratio", `${deviceData.devicePixelRatio}x`)}
                      {renderValueItem("System Timezone", deviceData.timezone)}
                      {renderValueItem("Browser Language", deviceData.language)}
                      {renderValueItem("Network State", deviceData.onlineState)}
                    </div>
                  </div>

                  {/* Category 2: Hardware & Compute */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-sky-400" /> Hardware & Processing Power
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {renderValueItem("CPU Logical Cores", deviceData.cpuCores)}
                      {renderValueItem("Device Memory (RAM)", deviceData.deviceMemoryGb)}
                      {renderValueItem("Battery Level", deviceData.batteryLevel)}
                      {renderValueItem("Charging State", deviceData.batteryCharging)}
                    </div>
                  </div>

                  {/* Category 3: Network Information API */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-sky-400" /> Network Information API
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {renderValueItem("Connection Medium", deviceData.connectionType)}
                      {renderValueItem("Effective Connection", deviceData.effectiveConnectionType)}
                      {renderValueItem("Downlink Speed Estimate", deviceData.downlinkEstimate)}
                      {renderValueItem("RTT Latency Estimate", deviceData.rttEstimate)}
                    </div>
                  </div>

                  {/* Category 4: WebGL Graphics */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                      <Globe className="w-4 h-4 text-sky-400" /> WebGL Graphics Context
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {renderValueItem("WebGL Vendor", deviceData.webglVendor)}
                      {renderValueItem("Unmasked WebGL Renderer", deviceData.webglRenderer)}
                    </div>
                  </div>
                </div>
              )}
            </ToolInputPanel>

            <ToolOutputPanel
              title="JSON Diagnostic Output"
              badge="Local Inspection Only"
              actions={
                <ToolActions
                  copyContent={deviceData ? JSON.stringify(deviceData, null, 2) : ""}
                />
              }
            >
              <pre className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto max-h-[220px] leading-relaxed">
                {deviceData ? JSON.stringify(deviceData, null, 2) : "// Local diagnostic JSON output..."}
              </pre>
            </ToolOutputPanel>

            {/* Honesty & Anti-Fingerprinting Guarantee */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300 font-sans">
              <h4 className="font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-400" /> Local Diagnostic & Privacy Guarantee
              </h4>
              <p className="leading-relaxed text-slate-400">
                <strong>Honest Capability Reporting:</strong> Browser security standards intentionally restrict access to hardware properties like exact RAM or battery levels on certain platforms (e.g. Safari / Firefox). Any API blocked or unexposed by your browser explicitly reports <em>"Not exposed by this browser"</em> rather than fabricating dummy values.
              </p>
              <p className="leading-relaxed text-slate-400">
                <strong>Zero Backend Transmission:</strong> This diagnostic data is computed entirely inside your local browser memory. It is never logged, stored, or transmitted to Snow or any third-party service.
              </p>
            </div>
          </div>

          {/* Right Visual Stage Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage
              visualType="device"
              mode="services"
              isError={unexposedCount > 0}
              statusLabel={unexposedCount > 0 ? "APIs RESTRICTED BY BROWSER" : "HARDWARE CAPABILITIES IDENTIFIED"}
              metricLabel="UNEXPOSED APIs"
              metricValue={String(unexposedCount)}
              accentColor={unexposedCount > 0 ? "#f59e0b" : "#10b981"}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">Local Browser Security Model</p>
                <p className="text-slate-400 leading-relaxed">
                  Modern web browsers sandbox hardware access to prevent user tracking while exposing essential metrics for responsive WebGL & media rendering.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Why Test Device Capabilities?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Knowing viewport sizes, DPR, CPU concurrency, and WebGL support allows developers to optimize client-side bundle sizes, adapt 3D rendering scale, and debug mobile responsiveness.
              </p>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Web Application & Frontend Performance"
          serviceSlug="app-care"
          serviceDescription="Building complex web interfaces, responsive visual components, or client-side web apps? Snow crafts high-performance, cross-browser software."
          careCategorySlug="app-care"
        />
      </Container>
    </ToolShell>
  );
}
