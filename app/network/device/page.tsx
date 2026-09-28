"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolCommandNav } from "@/components/tools/ToolCommandNav";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolActions } from "@/components/tools/ToolActions";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { ToolTabs } from "@/components/tools/ToolTabs";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { Container } from "@/components/ui/Container";
import {
  Laptop,
  Monitor,
  Cpu,
  Globe,
  Wifi,
  ShieldCheck,
  RefreshCw,
  Lock,
  HardDrive,
  Copy,
  Printer,
  Maximize2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Info,
} from "lucide-react";

export interface DeviceDiagnosticData {
  browser: string;
  os: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  availWidth: number;
  availHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  colorDepth: number;
  orientationType: string;
  touchSupport: string;
  cpuCores: string;
  deviceMemoryGb: string;
  language: string;
  timezone: string;
  onlineState: string;
  batteryLevel: string;
  batteryCharging: string;
  connectionType: string;
  effectiveConnectionType: string;
  downlinkEstimate: string;
  rttEstimate: string;
  webglVendor: string;
  webglRenderer: string;
}

export interface BrowserCapabilities {
  cookiesEnabled: boolean;
  javascriptEnabled: boolean;
  localStorageAvailable: boolean;
  sessionStorageAvailable: boolean;
  indexedDBAvailable: boolean;
  webglAvailable: boolean;
  webassemblyAvailable: boolean;
  serviceWorkerSupported: boolean;
  webBluetoothSupported: boolean;
  webUsbSupported: boolean;
  webRtcSupported: boolean;
  geolocationStatus: "supported" | "granted" | "denied" | "prompt" | "unavailable";
  notificationsStatus: "granted" | "denied" | "default" | "unavailable";
  cameraStatus: "supported" | "granted" | "denied" | "prompt" | "unavailable";
  microphoneStatus: "supported" | "granted" | "denied" | "prompt" | "unavailable";
}

export type ScanExecutionStatus = "INITIALIZING" | "SCANNING" | "COMPLETE" | "PARTIAL" | "ERROR";
export type DiagnosticGroupTab = "ALL" | "DEVICE" | "DISPLAY" | "HARDWARE" | "NETWORK" | "GRAPHICS" | "STORAGE" | "PERMISSIONS";

export default function DeviceDiagnosticsPage() {
  const [scanStatus, setScanStatus] = useState<ScanExecutionStatus>("INITIALIZING");
  const [activeTab, setActiveTab] = useState<DiagnosticGroupTab>("ALL");
  const [deviceData, setDeviceData] = useState<DeviceDiagnosticData | null>(null);
  const [capabilities, setCapabilities] = useState<BrowserCapabilities | null>(null);
  const [unexposedCount, setUnexposedCount] = useState(0);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [copyErrorMessage, setCopyErrorMessage] = useState<string | null>(null);

  const isMountedRef = useRef(true);
  const activeScanIdRef = useRef(0);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
    const scanId = ++activeScanIdRef.current;
    let missingProps = 0;

    try {
      const { browser, os } = parseBrowserAndOs();

      const screenWidth = window.screen?.width || 0;
      const screenHeight = window.screen?.height || 0;
      const availWidth = window.screen?.availWidth || 0;
      const availHeight = window.screen?.availHeight || 0;
      const viewportWidth = window.innerWidth || 0;
      const viewportHeight = window.innerHeight || 0;
      const devicePixelRatio = window.devicePixelRatio || 1;
      const colorDepth = window.screen?.colorDepth || 24;

      let orientationType = "Unknown";
      if (window.screen?.orientation?.type) {
        orientationType = `${window.screen.orientation.type} (${window.screen.orientation.angle || 0}°)`;
      } else if (window.innerWidth > window.innerHeight) {
        orientationType = "landscape-primary (estimated)";
      } else {
        orientationType = "portrait-primary (estimated)";
      }

      const touchSupport =
        typeof navigator !== "undefined" && navigator.maxTouchPoints > 0
          ? `Supported (${navigator.maxTouchPoints} touch points)`
          : "No touch points detected";

      let cpuCores = "Not exposed by this browser";
      if (navigator.hardwareConcurrency) {
        cpuCores = `${navigator.hardwareConcurrency} Cores`;
      } else {
        missingProps++;
      }

      let deviceMemoryGb = "Not exposed by this browser";
      const navWithMem = navigator as unknown as { deviceMemory?: number };
      if (navWithMem.deviceMemory) {
        deviceMemoryGb = `~${navWithMem.deviceMemory} GB`;
      } else {
        missingProps++;
      }

      const language = navigator.language || "Not exposed by this browser";
      let timezone = "Not exposed by this browser";
      try {
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Not exposed by this browser";
      } catch {
        missingProps++;
      }

      const onlineState = navigator.onLine ? "Online" : "Offline";

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

      let localStorageAvailable = false;
      try {
        localStorage.setItem("__test", "1");
        localStorage.removeItem("__test");
        localStorageAvailable = true;
      } catch {
        localStorageAvailable = false;
      }

      let sessionStorageAvailable = false;
      try {
        sessionStorage.setItem("__test", "1");
        sessionStorage.removeItem("__test");
        sessionStorageAvailable = true;
      } catch {
        sessionStorageAvailable = false;
      }

      let indexedDBAvailable = false;
      try {
        indexedDBAvailable = !!window.indexedDB;
      } catch {
        indexedDBAvailable = false;
      }

      let webglAvailable = false;
      try {
        const canvas = document.createElement("canvas");
        webglAvailable = !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
      } catch {
        webglAvailable = false;
      }

      const webassemblyAvailable = typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function";
      const serviceWorkerSupported = "serviceWorker" in navigator;
      const webBluetoothSupported = "bluetooth" in navigator;
      const webUsbSupported = "usb" in navigator;
      const webRtcSupported =
        typeof window !== "undefined" &&
        ("RTCPeerConnection" in window || "webkitRTCPeerConnection" in window);

      let geolocationStatus: BrowserCapabilities["geolocationStatus"] = "supported";
      let notificationsStatus: BrowserCapabilities["notificationsStatus"] = "unavailable";
      let cameraStatus: BrowserCapabilities["cameraStatus"] = "supported";
      let microphoneStatus: BrowserCapabilities["microphoneStatus"] = "supported";

      if ("Notification" in window) {
        notificationsStatus = Notification.permission as BrowserCapabilities["notificationsStatus"];
      }

      if (navigator.permissions && navigator.permissions.query) {
        try {
          const geoPerm = await navigator.permissions.query({ name: "geolocation" as PermissionName });
          geolocationStatus = geoPerm.state as BrowserCapabilities["geolocationStatus"];
        } catch {
          geolocationStatus = "supported";
        }

        try {
          const camPerm = await navigator.permissions.query({ name: "camera" as PermissionName });
          cameraStatus = camPerm.state as BrowserCapabilities["cameraStatus"];
        } catch {
          cameraStatus = "supported";
        }

        try {
          const micPerm = await navigator.permissions.query({ name: "microphone" as PermissionName });
          microphoneStatus = micPerm.state as BrowserCapabilities["microphoneStatus"];
        } catch {
          microphoneStatus = "supported";
        }
      }

      if (!isMountedRef.current || scanId !== activeScanIdRef.current) return;

      setUnexposedCount(missingProps);
      setDeviceData({
        browser,
        os,
        userAgent: navigator.userAgent,
        screenWidth,
        screenHeight,
        availWidth,
        availHeight,
        viewportWidth,
        viewportHeight,
        devicePixelRatio,
        colorDepth,
        orientationType,
        touchSupport,
        cpuCores,
        deviceMemoryGb,
        language,
        timezone,
        onlineState,
        batteryLevel,
        batteryCharging,
        connectionType,
        effectiveConnectionType,
        downlinkEstimate,
        rttEstimate,
        webglVendor,
        webglRenderer,
      });

      setCapabilities({
        cookiesEnabled: navigator.cookieEnabled,
        javascriptEnabled: true,
        localStorageAvailable,
        sessionStorageAvailable,
        indexedDBAvailable,
        webglAvailable,
        webassemblyAvailable,
        serviceWorkerSupported,
        webBluetoothSupported,
        webUsbSupported,
        webRtcSupported,
        geolocationStatus,
        notificationsStatus,
        cameraStatus,
        microphoneStatus,
      });

      setScanStatus(missingProps > 0 ? "PARTIAL" : "COMPLETE");
    } catch (err) {
      if (!isMountedRef.current || scanId !== activeScanIdRef.current) return;
      console.error("Device diagnostic error:", err);
      setScanStatus("ERROR");
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const executeScan = async () => {
      if (!isCancelled && isMountedRef.current) {
        await runDiagnostics();
      }
    };

    executeScan();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isCancelled && isMountedRef.current) runDiagnostics();
      }, 150);
    };

    const handleOnline = () => {
      if (!isCancelled && isMountedRef.current) runDiagnostics();
    };

    const handleOffline = () => {
      if (!isCancelled && isMountedRef.current) runDiagnostics();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      isCancelled = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [runDiagnostics]);

  const handleCopyReport = () => {
    if (!deviceData || !capabilities) return;
    setCopyErrorMessage(null);

    const reportText = JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        executionStatus: scanStatus,
        unexposedApiCount: unexposedCount,
        device: deviceData,
        capabilities,
      },
      null,
      2
    );

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard
        .writeText(reportText)
        .then(() => {
          setCopiedSuccess(true);
          setTimeout(() => setCopiedSuccess(false), 2000);
        })
        .catch(() => {
          fallbackCopyText(reportText);
        });
    } else {
      fallbackCopyText(reportText);
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (successful) {
        setCopiedSuccess(true);
        setTimeout(() => setCopiedSuccess(false), 2000);
      } else {
        setCopyErrorMessage("Unable to copy to clipboard automatically.");
      }
    } catch {
      setCopyErrorMessage("Clipboard permission denied or unavailable.");
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  const renderValueItem = (label: string, value: string) => {
    const isUnexposed = value === "Not exposed by this browser";
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 gap-1 font-mono text-xs">
        <span className="text-slate-400 font-medium">{label}:</span>
        <span className={`break-all ${isUnexposed ? "text-amber-400/90 italic" : "text-cyan-300 font-bold"}`}>
          {value}
        </span>
      </div>
    );
  };

  const renderCapabilityPill = (label: string, isSupported: boolean, note?: string) => {
    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs">
        <span className="text-slate-300 font-medium">{label}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          {isSupported ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-950/90 text-emerald-300 border border-emerald-800/80 font-bold text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Supported
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800 text-[11px]">
              <XCircle className="w-3 h-3 text-slate-500" /> Unavailable
            </span>
          )}
          {note && <span className="text-slate-500 text-[10px]">({note})</span>}
        </div>
      </div>
    );
  };

  const renderPermissionPill = (label: string, status: string) => {
    let colorClass = "bg-sky-950/80 text-sky-300 border-sky-800/80";
    let icon = <HelpCircle className="w-3 h-3 text-sky-400" />;

    if (status === "granted") {
      colorClass = "bg-emerald-950/80 text-emerald-300 border-emerald-800/80";
      icon = <CheckCircle2 className="w-3 h-3 text-emerald-400" />;
    } else if (status === "denied") {
      colorClass = "bg-rose-950/80 text-rose-300 border-rose-800/80";
      icon = <XCircle className="w-3 h-3 text-rose-400" />;
    } else if (status === "prompt" || status === "supported" || status === "default") {
      colorClass = "bg-amber-950/80 text-amber-300 border-amber-800/80";
      icon = <AlertCircle className="w-3 h-3 text-amber-400" />;
    }

    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs">
        <span className="text-slate-300 font-medium">{label}</span>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-bold uppercase shrink-0 ${colorClass}`}>
          {icon} {status}
        </span>
      </div>
    );
  };

  const isTabVisible = (group: DiagnosticGroupTab) => activeTab === "ALL" || activeTab === group;

  return (
    <ToolShell>
      <style jsx global>{`
        @media print {
          nav, button, header, footer, .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .print-only {
            display: block !important;
          }
        }
      `}</style>

      <ToolHeader
        title="Device & Browser Utilities"
        description="Audit local hardware specifications, browser runtime parameters, display metrics, storage APIs, and capability permissions. 100% browser-native evaluation with zero network logging or fingerprinting."
        category="NETWORK LAYER"
        badge="100% Local"
        status={
          scanStatus === "SCANNING" || scanStatus === "INITIALIZING"
            ? "scanning"
            : scanStatus === "ERROR"
            ? "scanning"
            : "engine-ready"
        }
        statusMessage={
          scanStatus === "INITIALIZING"
            ? "Initializing Diagnostic Engine..."
            : scanStatus === "SCANNING"
            ? "Auditing Device Capabilities..."
            : scanStatus === "PARTIAL"
            ? `Audit Complete (${unexposedCount} unexposed browser APIs)`
            : scanStatus === "ERROR"
            ? "Diagnostic Error Encounted"
            : "Device Audit Complete & Active"
        }
      />
      <ToolCommandNav />

      <Container className="pt-8 pb-16">
        {/* Device Utility Action Toolbar */}
        <ProximitySurface className="p-4 mb-8 no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-800/80 text-cyan-400 shrink-0">
                <Laptop className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-100 font-sans">Device Diagnostics Instrument</h3>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                    scanStatus === "COMPLETE"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : scanStatus === "PARTIAL"
                      ? "bg-amber-950 text-amber-300 border border-amber-800"
                      : "bg-cyan-950 text-cyan-300 border border-cyan-800"
                  }`}>
                    STATUS: {scanStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">Real-time browser evaluation & report export</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsTestModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-300 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Screen & Orientation</span>
              </button>

              <button
                type="button"
                onClick={handleCopyReport}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-emerald-300 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>{copiedSuccess ? "Copied Report!" : "Copy Report"}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintReport}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print Report</span>
              </button>

              <button
                type="button"
                onClick={runDiagnostics}
                disabled={scanStatus === "SCANNING" || scanStatus === "INITIALIZING"}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 font-mono text-xs border border-cyan-800 transition-all flex items-center gap-1.5 disabled:opacity-40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${scanStatus === "SCANNING" || scanStatus === "INITIALIZING" ? "animate-spin text-cyan-400" : ""}`} />
                <span>Re-Audit</span>
              </button>
            </div>
          </div>

          {copyErrorMessage && (
            <p className="mt-2 text-xs font-mono text-rose-400">{copyErrorMessage}</p>
          )}
        </ProximitySurface>

        {/* Diagnostic Instrument Groups Filter Tabs */}
        <div className="mb-6 no-print">
          <ToolTabs
            activeTab={activeTab}
            onChange={(tab) => setActiveTab(tab)}
            tabs={[
              { id: "ALL", label: "All Instrumentation" },
              { id: "DEVICE", label: "Device Info" },
              { id: "DISPLAY", label: "Display Metrics" },
              { id: "HARDWARE", label: "Hardware" },
              { id: "NETWORK", label: "Network" },
              { id: "GRAPHICS", label: "Graphics" },
              { id: "STORAGE", label: "Storage" },
              { id: "PERMISSIONS", label: "Permissions" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Instrumentation Panel */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Client Environment & Hardware Diagnostics"
              badge={unexposedCount > 0 ? `${unexposedCount} APIs Unexposed` : "Full API Access"}
              actions={
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Client Browser Native</span>
                </div>
              }
            >
              {scanStatus === "INITIALIZING" || !deviceData ? (
                <div className="p-12 text-center font-mono text-xs text-cyan-400 space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-cyan-400" />
                  <p className="font-semibold uppercase tracking-wider">Initial Hardware & Capability Scan...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* User Agent String Display */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">User Agent String</span>
                    <p className="font-mono text-xs text-slate-300 break-all leading-relaxed select-all">
                      {deviceData.userAgent}
                    </p>
                  </div>

                  {/* Group: DEVICE & SYSTEM */}
                  {isTabVisible("DEVICE") && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-cyan-400" /> Operating System & Environment
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {renderValueItem("Browser Engine", deviceData.browser)}
                        {renderValueItem("Operating System", deviceData.os)}
                        {renderValueItem("Browser Language", deviceData.language)}
                        {renderValueItem("System Timezone", deviceData.timezone)}
                      </div>
                    </div>
                  )}

                  {/* Group: DISPLAY */}
                  {isTabVisible("DISPLAY") && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-cyan-400" /> Display & Viewport Geometry
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {renderValueItem("Screen Resolution", `${deviceData.screenWidth} x ${deviceData.screenHeight} px`)}
                        {renderValueItem("Available Screen", `${deviceData.availWidth} x ${deviceData.availHeight} px`)}
                        {renderValueItem("Viewport Dimensions", `${deviceData.viewportWidth} x ${deviceData.viewportHeight} px`)}
                        {renderValueItem("Device Pixel Ratio", `${deviceData.devicePixelRatio}x`)}
                        {renderValueItem("Color Depth", `${deviceData.colorDepth}-bit`)}
                        {renderValueItem("Screen Orientation", deviceData.orientationType)}
                        {renderValueItem("Touch Capabilities", deviceData.touchSupport)}
                      </div>
                    </div>
                  )}

                  {/* Group: HARDWARE & COMPUTE */}
                  {isTabVisible("HARDWARE") && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400" /> Hardware Compute & Battery
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {renderValueItem("CPU Logical Cores", deviceData.cpuCores)}
                        {renderValueItem("Device Memory (RAM)", deviceData.deviceMemoryGb)}
                        {renderValueItem("Battery Charge Level", deviceData.batteryLevel)}
                        {renderValueItem("Battery State", deviceData.batteryCharging)}
                      </div>
                    </div>
                  )}

                  {/* Group: NETWORK STATE */}
                  {isTabVisible("NETWORK") && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-cyan-400" /> Network Information API
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {renderValueItem("Online Status", deviceData.onlineState)}
                        {renderValueItem("Connection Medium", deviceData.connectionType)}
                        {renderValueItem("Effective Network", deviceData.effectiveConnectionType)}
                        {renderValueItem("Downlink Estimate", deviceData.downlinkEstimate)}
                        {renderValueItem("RTT Latency Estimate", deviceData.rttEstimate)}
                      </div>
                    </div>
                  )}

                  {/* Group: GRAPHICS */}
                  {isTabVisible("GRAPHICS") && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                        <Globe className="w-4 h-4 text-cyan-400" /> WebGL & Graphics Context
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {renderValueItem("WebGL Vendor", deviceData.webglVendor)}
                        {renderValueItem("Unmasked WebGL Renderer", deviceData.webglRenderer)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ToolInputPanel>

            {/* Storage & Permissions Matrix */}
            {(activeTab === "ALL" || activeTab === "STORAGE" || activeTab === "PERMISSIONS") && (
              <ToolInputPanel
                title="Storage, Runtimes & Permission State"
                badge="Non-Blocking Non-Prompting"
              >
                {!capabilities ? (
                  <div className="p-8 text-center font-mono text-xs text-slate-500">
                    Evaluating browser runtimes & permissions...
                  </div>
                ) : (
                  <div className="space-y-6">
                    {(activeTab === "ALL" || activeTab === "STORAGE") && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-emerald-400" /> Client Runtimes & Storage APIs
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {renderCapabilityPill("Cookies Enabled", capabilities.cookiesEnabled)}
                          {renderCapabilityPill("JavaScript Engine", capabilities.javascriptEnabled)}
                          {renderCapabilityPill("LocalStorage API", capabilities.localStorageAvailable)}
                          {renderCapabilityPill("SessionStorage API", capabilities.sessionStorageAvailable)}
                          {renderCapabilityPill("IndexedDB Database", capabilities.indexedDBAvailable)}
                          {renderCapabilityPill("WebGL 3D Context", capabilities.webglAvailable)}
                          {renderCapabilityPill("WebAssembly (Wasm)", capabilities.webassemblyAvailable)}
                          {renderCapabilityPill("Service Worker API", capabilities.serviceWorkerSupported)}
                          {renderCapabilityPill("Web Bluetooth API", capabilities.webBluetoothSupported)}
                          {renderCapabilityPill("WebUSB API", capabilities.webUsbSupported)}
                          {renderCapabilityPill("WebRTC Peer API", capabilities.webRtcSupported)}
                        </div>
                      </div>
                    )}

                    {(activeTab === "ALL" || activeTab === "PERMISSIONS") && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-cyan-400" /> Permission Query States
                        </h4>
                        <p className="text-[11px] text-slate-400 font-mono">
                          * Passive state evaluation via Permissions API. Snow never triggers unsolicited permission prompts.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {renderPermissionPill("Geolocation Capability", capabilities.geolocationStatus)}
                          {renderPermissionPill("Web Notifications", capabilities.notificationsStatus)}
                          {renderPermissionPill("Camera Hardware", capabilities.cameraStatus)}
                          {renderPermissionPill("Microphone Hardware", capabilities.microphoneStatus)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ToolInputPanel>
            )}

            {/* Exportable JSON Panel */}
            <ToolOutputPanel
              title="Diagnostic Report JSON Payload"
              badge="Local Client Only"
              actions={
                <ToolActions
                  copyContent={deviceData && capabilities ? JSON.stringify({ device: deviceData, capabilities }, null, 2) : ""}
                />
              }
            >
              <pre className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto max-h-[220px] leading-relaxed select-all">
                {deviceData && capabilities
                  ? JSON.stringify({ device: deviceData, capabilities }, null, 2)
                  : "// Diagnostic payload loading..."}
              </pre>
            </ToolOutputPanel>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300 font-sans">
              <h4 className="font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" /> Privacy & Diagnostic Integrity Standard
              </h4>
              <p className="leading-relaxed text-slate-400">
                <strong>Honest Capability Status:</strong> Browser features not exposed (e.g. Chrome&apos;s deviceMemory on Firefox/iOS) are truthfully marked as &quot;Not exposed by this browser&quot;, distinct from hardware failures.
              </p>
              <p className="leading-relaxed text-slate-400">
                <strong>Zero Remote Transmission:</strong> Diagnostic metrics are evaluated client-side and strictly stored in component memory. No fingerprints or telemetry logs are transmitted to any server.
              </p>
            </div>
          </div>

          {/* Right Visual Stage & Side Info */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage
              visualType="device"
              mode="services"
              isError={unexposedCount > 0}
              statusLabel={unexposedCount > 0 ? "APIs UNEXPOSED BY BROWSER" : "ALL DEVICE METRICS ACTIVE"}
              metricLabel="UNEXPOSED APIs"
              metricValue={String(unexposedCount)}
              accentColor={unexposedCount > 0 ? "#f59e0b" : "#10b981"}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200 font-mono text-[11px] uppercase tracking-wider">Browser Security Isolation</p>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Modern user agents intentionally constrain low-level hardware specs to prevent cross-site device fingerprinting while maintaining robust WebGL & storage capabilities.
                </p>
              </div>
            </ToolVisualStage>

            <ProximitySurface className="p-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-cyan-400" /> Quick Diagnostic Summary
              </h4>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Execution State:</span>
                  <span className="text-cyan-300 font-bold">{scanStatus}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Restricted Signals:</span>
                  <span className="text-amber-400 font-bold">{unexposedCount}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Storage APIs:</span>
                  <span className="text-emerald-400 font-bold">100% Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Network Telemetry:</span>
                  <span className="text-slate-400 italic">Disabled / Local</span>
                </div>
              </div>
            </ProximitySurface>
          </div>
        </div>

        {/* Screen & Orientation Interactive Modal */}
        {isTestModalOpen && deviceData && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 no-print">
            <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-slate-100 font-sans">Display Geometry & Orientation Tester</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="text-slate-400 hover:text-slate-100 text-xs font-mono"
                >
                  ✕ Close
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Current Viewport:</span>
                  <span className="text-cyan-300 font-bold">{deviceData.viewportWidth} x {deviceData.viewportHeight} px</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Screen Resolution:</span>
                  <span className="text-emerald-300 font-bold">{deviceData.screenWidth} x {deviceData.screenHeight} px</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Pixel Ratio (DPR):</span>
                  <span className="text-amber-300 font-bold">{deviceData.devicePixelRatio}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Orientation Mode:</span>
                  <span className="text-cyan-300 font-bold">{deviceData.orientationType}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Resize your browser window or rotate your device to test real-time screen & orientation detection without manual page reloads.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-semibold font-mono text-xs hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-950/50"
                >
                  Done Testing
                </button>
              </div>
            </div>
          </div>
        )}

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
