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

export default function DeviceDiagnosticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [deviceData, setDeviceData] = useState<DeviceDiagnosticData | null>(null);
  const [capabilities, setCapabilities] = useState<BrowserCapabilities | null>(null);
  const [unexposedCount, setUnexposedCount] = useState(0);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

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
    const webRtcSupported = typeof window !== "undefined" && ("RTCPeerConnection" in window || "webkitRTCPeerConnection" in window);

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

  const handleCopyReport = () => {
    if (!deviceData || !capabilities) return;
    const reportText = JSON.stringify({ device: deviceData, capabilities }, null, 2);
    navigator.clipboard.writeText(reportText);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  const handlePrintReport = () => {
    window.print();
  };

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

  const renderCapabilityPill = (label: string, isSupported: boolean, note?: string) => {
    return (
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs">
        <span className="text-slate-300 font-medium">{label}</span>
        <div className="flex items-center gap-1.5">
          {isSupported ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 font-bold text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Supported
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[11px]">
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
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs">
        <span className="text-slate-300 font-medium">{label}</span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-bold uppercase ${colorClass}`}>
          {icon} {status}
        </span>
      </div>
    );
  };

  return (
    <ToolShell>
      <ToolHeader
        title="Device & Browser Utilities"
        description="Audit local hardware specifications, browser execution parameters, display metrics, storage APIs, and capability permissions. 100% browser-native evaluation with zero network logging or fingerprinting."
        category="NETWORK LAYER"
        badge="100% Local"
        status={isLoading ? "scanning" : "engine-ready"}
        statusMessage={isLoading ? "Auditing Client Device & Capabilities..." : "Client Capabilities & Utilities Active"}
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="p-4 mb-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-sky-950 border border-sky-800/80 text-sky-400">
              <Laptop className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-100 font-sans">Device Utilities Toolbar</h3>
              <p className="text-xs text-slate-400 font-mono">Real-time local actions & export tools</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsTestModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Screen / Orientation Test</span>
            </button>

            <button
              type="button"
              onClick={handleCopyReport}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-400" />
              <span>{copiedSuccess ? "Copied Report!" : "Copy Device Info"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintReport}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Export Report / Print</span>
            </button>

            <button
              type="button"
              onClick={runDiagnostics}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-xl bg-sky-950 hover:bg-sky-900 text-sky-300 font-mono text-xs border border-sky-800 transition-all flex items-center gap-1.5 disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-sky-400" : ""}`} />
              <span>Re-Audit</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Device Hardware & Display Audit"
              badge={`${unexposedCount} Restricted APIs`}
              actions={
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Window Monitor</span>
                </div>
              }
            >
              {isLoading || !deviceData ? (
                <div className="p-12 text-center font-mono text-xs text-sky-400 space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-sky-400" />
                  <p className="font-semibold uppercase tracking-wider">Auditing Hardware & Display Parameters...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-sky-400" /> Platform & Display Metrics
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {renderValueItem("Browser Engine", deviceData.browser)}
                      {renderValueItem("Operating System", deviceData.os)}
                      {renderValueItem("Screen Resolution", `${deviceData.screenWidth} x ${deviceData.screenHeight} px`)}
                      {renderValueItem("Available Dimensions", `${deviceData.availWidth} x ${deviceData.availHeight} px`)}
                      {renderValueItem("Viewport Dimensions", `${deviceData.viewportWidth} x ${deviceData.viewportHeight} px`)}
                      {renderValueItem("Device Pixel Ratio", `${deviceData.devicePixelRatio}x`)}
                      {renderValueItem("Color Depth", `${deviceData.colorDepth}-bit`)}
                      {renderValueItem("Screen Orientation", deviceData.orientationType)}
                      {renderValueItem("Touch Support", deviceData.touchSupport)}
                      {renderValueItem("System Timezone", deviceData.timezone)}
                      {renderValueItem("Browser Language", deviceData.language)}
                      {renderValueItem("Network State", deviceData.onlineState)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-sky-400" /> Hardware & Compute Parameters
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {renderValueItem("CPU Logical Cores", deviceData.cpuCores)}
                      {renderValueItem("Device Memory (RAM)", deviceData.deviceMemoryGb)}
                      {renderValueItem("Battery Level", deviceData.batteryLevel)}
                      {renderValueItem("Charging State", deviceData.batteryCharging)}
                    </div>
                  </div>

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

            <ToolInputPanel
              title="Browser Capabilities & Permission Matrix"
              badge="Safe Probing (No Prompts)"
            >
              {!capabilities ? (
                <div className="p-8 text-center font-mono text-xs text-slate-500">
                  Loading browser capability detectors...
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-emerald-400" /> Web Storage & Runtime Engine
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

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-sky-400" /> Capability & Permission Status
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">
                      * Evaluated safely using non-blocking browser state queries. Snow never automatically triggers permission prompt popups.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {renderPermissionPill("Geolocation Capability", capabilities.geolocationStatus)}
                      {renderPermissionPill("Web Notifications", capabilities.notificationsStatus)}
                      {renderPermissionPill("Camera Hardware", capabilities.cameraStatus)}
                      {renderPermissionPill("Microphone Hardware", capabilities.microphoneStatus)}
                    </div>
                  </div>
                </div>
              )}
            </ToolInputPanel>

            <ToolOutputPanel
              title="Exportable Device Diagnostic JSON"
              badge="Local Memory Only"
              actions={
                <ToolActions
                  copyContent={deviceData && capabilities ? JSON.stringify({ device: deviceData, capabilities }, null, 2) : ""}
                />
              }
            >
              <pre className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto max-h-[240px] leading-relaxed">
                {deviceData && capabilities
                  ? JSON.stringify({ device: deviceData, capabilities }, null, 2)
                  : "// Diagnostic payload..."}
              </pre>
            </ToolOutputPanel>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300 font-sans">
              <h4 className="font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-400" /> Privacy-First Architecture & Honest Reporting
              </h4>
              <p className="leading-relaxed text-slate-400">
                <strong>No Automatic Permission Prompts:</strong> Capabilities like location, camera, or microphone are checked using passive browser permission queries. We do not prompt or request access to sensitive user hardware.
              </p>
              <p className="leading-relaxed text-slate-400">
                <strong>Zero Backend Logging or Fingerprinting:</strong> This report is generated strictly inside your browser instance. Snow does not persist, aggregate, or build user fingerprint profiles from device characteristics.
              </p>
            </div>
          </div>

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
                <p className="font-semibold text-slate-200">Browser Security & Isolation</p>
                <p className="text-slate-400 leading-relaxed">
                  Modern web engines sandbox hardware metrics to prevent cross-site fingerprinting while providing standard APIs for responsive WebGL rendering & client application storage.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Why Audit Device Specs?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Knowing viewport sizes, DPR, CPU cores, and WebGL support helps engineers optimize bundle delivery, scale client-side canvas rendering, and debug responsive Web application layouts.
              </p>
            </div>
          </div>
        </div>

        {isTestModalOpen && deviceData && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-sky-400" />
                  <h3 className="text-base font-bold text-slate-100 font-sans">Interactive Display & Orientation Tester</h3>
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
                  <span className="text-sky-300 font-bold">{deviceData.viewportWidth} x {deviceData.viewportHeight} px</span>
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
                  <span className="text-sky-300 font-bold">{deviceData.orientationType}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Resize your browser window or rotate your mobile device to test how display parameters dynamically update in real time.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-sky-400 text-slate-950 font-semibold font-mono text-xs hover:bg-sky-300 transition-all"
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
