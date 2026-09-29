"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { SpatialLocationMap } from "@/components/tools/SpatialLocationMap";
import { Container } from "@/components/ui/Container";
import {
  LocationStatus,
  RealLocationData,
  SimulatedDeviceData,
  SessionPoint,
  IdentifierType,
  getAccuracyCategory,
  formatCoordinateDMS,
  calculateHaversineDistanceMeters,
  formatDistance,
  validateIdentifier,
  generateSimulatedDeviceResult,
  SIMULATION_PROGRESS_STEPS,
  getGoogleMapsUrl,
} from "@/lib/tools/findDevice";
import {
  Navigation,
  Crosshair,
  Compass,
  Radio,
  Share2,
  Copy,
  RefreshCw,
  AlertCircle,
  Lock,
  Wifi,
  RotateCcw,
  ExternalLink,
  Info,
  Trash2,
  Layers,
  Smartphone,
} from "lucide-react";

export default function FindMyDevicePage() {
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("READY");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [realLocation, setRealLocation] = useState<RealLocationData | null>(null);

  const [identifierType, setIdentifierType] = useState<IdentifierType>("IMEI");
  const [identifierValue, setIdentifierValue] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [simError, setSimError] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStepIndex, setSimStepIndex] = useState(0);
  const [simulatedDevice, setSimulatedDevice] = useState<SimulatedDeviceData | null>(null);

  const [sessionTrail, setSessionTrail] = useState<SessionPoint[]>([]);

  const [ipLocation, setIpLocation] = useState<{
    ip: string;
    city: string;
    region: string;
    country: string;
    org: string;
  } | null>(null);
  const [isIpLoading, setIsIpLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<string>("LOCATION");
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const [deviceSpecs, setDeviceSpecs] = useState<{
    browser: string;
    os: string;
    cpuCores: string;
    deviceMemory: string;
    batteryLevel: string;
    onlineState: string;
    geolocationPermission: string;
  } | null>(null);

  const isMountedRef = useRef(true);
  const activeLocateIdRef = useRef(0);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    let browser = "Browser Native";
    if (ua.includes("Firefox")) browser = "Mozilla Firefox";
    else if (ua.includes("Edg")) browser = "Microsoft Edge";
    else if (ua.includes("Chrome")) browser = "Google Chrome";
    else if (ua.includes("Safari")) browser = "Apple Safari";

    let os = "Unknown OS";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

    const cpuCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency + " Cores" : "Not exposed by this browser";
    const navMem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    const deviceMemory = navMem ? "~" + navMem + " GB" : "Not exposed by this browser";

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" as PermissionName }).then((perm) => {
        if (isMountedRef.current) {
          setDeviceSpecs((prev) => (prev ? { ...prev, geolocationPermission: perm.state } : null));
        }
      }).catch(() => {});
    }
  }, []);

  const fetchIpLocation = useCallback(async () => {
    setIsIpLoading(true);
    try {
      const res = await fetch("https://ipwho.is/", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success !== false) {
          setIpLocation({
            ip: data.ip || "Unknown",
            city: data.city || "Unknown",
            region: data.region || "Unknown",
            country: data.country || "Unknown",
            org: data.connection?.isp || data.org || "Unknown ISP",
          });
        }
      }
    } catch {
      // Fallback
    } finally {
      if (isMountedRef.current) setIsIpLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    fetch("https://ipwho.is/", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data && data.success !== false) {
          setIpLocation({
            ip: data.ip || "Unknown",
            city: data.city || "Unknown",
            region: data.region || "Unknown",
            country: data.country || "Unknown",
            org: data.connection?.isp || data.org || "Unknown ISP",
          });
        }
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus("UNSUPPORTED");
      setErrorMessage("Geolocation API is not supported by your browser.");
      return;
    }

    if (locationStatus === "REQUESTING_PERMISSION" || locationStatus === "LOCATING") {
      return;
    }

    const reqId = ++activeLocateIdRef.current;
    setLocationStatus("REQUESTING_PERMISSION");
    setErrorMessage(null);

    setTimeout(() => {
      if (!isMountedRef.current || reqId !== activeLocateIdRef.current) return;
      setLocationStatus("LOCATING");
    }, 400);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!isMountedRef.current || reqId !== activeLocateIdRef.current) return;

        const coords = position.coords;
        const accuracy = coords.accuracy || 20;
        const category = getAccuracyCategory(accuracy);

        const newLoc: RealLocationData = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy,
          timestamp: position.timestamp || Date.now(),
          altitude: coords.altitude ?? null,
          altitudeAccuracy: coords.altitudeAccuracy ?? null,
          heading: coords.heading ?? null,
          speed: coords.speed ?? null,
          accuracyCategory: category,
        };

        setRealLocation(newLoc);
        setLocationStatus("LOCATED");

        setSessionTrail((prevTrail) => {
          const prevPt = prevTrail[prevTrail.length - 1];
          let dist: number | null = null;
          if (prevPt) {
            dist = calculateHaversineDistanceMeters(prevPt.latitude, prevPt.longitude, newLoc.latitude, newLoc.longitude);
          }
          const newPt: SessionPoint = {
            id: "pt_" + Date.now(),
            latitude: newLoc.latitude,
            longitude: newLoc.longitude,
            accuracy: newLoc.accuracy,
            timestamp: newLoc.timestamp,
            distanceFromPrevMeters: dist,
            label: "Fix #" + (prevTrail.length + 1),
          };
          return [...prevTrail, newPt];
        });
      },
      (error) => {
        if (!isMountedRef.current || reqId !== activeLocateIdRef.current) return;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationStatus("PERMISSION_DENIED");
            setErrorMessage("Location permission denied. Please grant location access in your browser settings.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationStatus("POSITION_UNAVAILABLE");
            setErrorMessage("Device position unavailable. Ensure GPS or network positioning is enabled.");
            break;
          case error.TIMEOUT:
            setLocationStatus("TIMEOUT");
            setErrorMessage("Location request timed out. Please try again.");
            break;
          default:
            setLocationStatus("ERROR");
            setErrorMessage(error.message || "An unknown location error occurred.");
            break;
        }
      },
      options
    );
  }, [locationStatus]);

  const runSimulator = useCallback(() => {
    const validation = validateIdentifier(identifierType, identifierValue);
    if (!validation.isValid) {
      setSimError(validation.error || "Invalid input");
      return;
    }

    setSimError(null);
    setIsSimulating(true);
    setSimStepIndex(0);
    setSimulatedDevice(null);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < SIMULATION_PROGRESS_STEPS.length) {
        if (isMountedRef.current) setSimStepIndex(step);
      } else {
        clearInterval(interval);
        if (isMountedRef.current) {
          const result = generateSimulatedDeviceResult(identifierType, identifierValue, deviceName);
          setSimulatedDevice(result);
          setIsSimulating(false);
        }
      }
    }, 600);
  }, [identifierType, identifierValue, deviceName]);

  const handleCopyCoords = () => {
    const loc = realLocation || simulatedDevice;
    if (!loc) return;
    const text = loc.latitude.toFixed(6) + ", " + loc.longitude.toFixed(6);
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShareLocation = async () => {
    const loc = realLocation || simulatedDevice;
    if (!loc) return;
    const shareData = {
      title: "Snow Spatial Location",
      text: "Coordinates: " + loc.latitude.toFixed(6) + ", " + loc.longitude.toFixed(6),
      url: getGoogleMapsUrl(loc.latitude, loc.longitude),
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch {
        navigator.clipboard.writeText(shareData.url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const clearSessionTrail = () => {
    setSessionTrail([]);
  };

  const resetAll = () => {
    setRealLocation(null);
    setLocationStatus("READY");
    setErrorMessage(null);
    setSimulatedDevice(null);
    setIdentifierValue("");
    setDeviceName("");
    setSessionTrail([]);
  };

  const activeCoords = realLocation
    ? { lat: realLocation.latitude, lng: realLocation.longitude }
    : simulatedDevice
    ? { lat: simulatedDevice.latitude, lng: simulatedDevice.longitude }
    : null;

  const dms = activeCoords ? formatCoordinateDMS(activeCoords.lat, activeCoords.lng) : null;

  return (
    <ToolShell>
      <ToolHeader
        title="Find My Device & Spatial Location Center"
        description="Browser-native GPS geolocation, interactive spatial earth mapping, device recovery simulator, session location trail, and client-side device diagnostic instrumentation."
        category="NETWORK LAYER"
        badge="Spatial / GPS"
        status={
          locationStatus === "LOCATING" || locationStatus === "REQUESTING_PERMISSION"
            ? "scanning"
            : locationStatus === "LOCATED"
            ? "engine-ready"
            : "engine-ready"
        }
        statusMessage={
          locationStatus === "READY"
            ? "Location Engine Ready • Standby"
            : locationStatus === "REQUESTING_PERMISSION"
            ? "Requesting Browser Permission..."
            : locationStatus === "LOCATING"
            ? "Acquiring Spatial GPS Lock..."
            : locationStatus === "LOCATED"
            ? "Live GPS Location Resolved"
            : "Location Status: " + locationStatus
        }
      />
      <ToolCommandNav />

      <Container className="pt-8 pb-16">
        <ProximitySurface className="p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-sky-950/90 border border-sky-800/80 text-sky-400 shrink-0">
                <Navigation className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-100 font-sans">Spatial Location Console</h3>
                  <span
                    className={"px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase " +
                      (locationStatus === "LOCATED"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : "bg-sky-950 text-sky-300 border border-sky-800")}
                  >
                    {locationStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">100% Client-Side • Zero Database Retention</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={requestLocation}
                disabled={locationStatus === "REQUESTING_PERMISSION" || locationStatus === "LOCATING"}
                className="px-4 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-sky-950/50 flex items-center gap-2 disabled:opacity-40"
              >
                <Crosshair
                  className={"w-4 h-4 " +
                    (locationStatus === "LOCATING" || locationStatus === "REQUESTING_PERMISSION" ? "animate-spin" : "")}
                />
                <span>{realLocation ? "REFRESH LOCATION" : "LOCATE MY DEVICE"}</span>
              </button>

              {activeCoords && (
                <>
                  <button
                    type="button"
                    onClick={handleCopyCoords}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{copySuccess ? "Copied!" : "Copy Coords"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareLocation}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{shareSuccess ? "Shared!" : "Share"}</span>
                  </button>

                  <a
                    href={getGoogleMapsUrl(activeCoords.lat, activeCoords.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-xs border border-slate-700 transition-all flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                    <span>Google Maps</span>
                  </a>
                </>
              )}

              <button
                type="button"
                onClick={resetAll}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition-all"
                title="Reset Location Console"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ProximitySurface>

        <div className="mb-12">
          <SpatialLocationMap
            liveLocation={realLocation}
            simulatedLocation={simulatedDevice}
            sessionTrail={sessionTrail}
          />
        </div>

        <div className="mb-6">
          <ToolTabs
            activeTab={activeTab}
            onChange={(tab) => setActiveTab(tab)}
            tabs={[
              { id: "LOCATION", label: "Real GPS Location" },
              { id: "SIMULATOR", label: "Recovery Simulator" },
              { id: "TRAIL", label: "Session Trail (" + sessionTrail.length + ")" },
              { id: "SPECS", label: "Device Specs & Sensors" },
              { id: "IP_VS_GPS", label: "IP vs GPS Location" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8 space-y-6">
            {activeTab === "LOCATION" && (
              <ToolInputPanel
                title="Browser GPS Geolocation Signal"
                badge={realLocation ? realLocation.accuracyCategory : "Ready"}
                actions={
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                    <span>Navigator Geolocation API</span>
                  </span>
                }
              >
                {locationStatus === "READY" && !realLocation ? (
                  <div className="p-8 text-center font-mono space-y-3">
                    <Compass className="w-10 h-10 text-sky-400 mx-auto" />
                    <h4 className="text-slate-100 font-bold text-sm">Real GPS Location Ready</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-sans">
                      Press <strong>LOCATE MY DEVICE</strong> to request browser location permission and resolve exact GPS coordinates.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={requestLocation}
                        className="px-5 py-2.5 rounded-xl bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-sky-950/50"
                      >
                        LOCATE MY DEVICE NOW
                      </button>
                    </div>
                  </div>
                ) : locationStatus === "REQUESTING_PERMISSION" || locationStatus === "LOCATING" ? (
                  <div className="p-12 text-center font-mono text-xs text-sky-400 space-y-3">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-sky-400" />
                    <p className="font-semibold uppercase tracking-wider">
                      {locationStatus === "REQUESTING_PERMISSION"
                        ? "Requesting Browser Permission..."
                        : "Acquiring Satellite & Network GPS Lock..."}
                    </p>
                  </div>
                ) : errorMessage ? (
                  <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-900/60 text-rose-300 space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-rose-400 font-bold uppercase">
                      <AlertCircle className="w-4 h-4" /> Location Request Failed
                    </div>
                    <p className="text-slate-300">{errorMessage}</p>
                    <button
                      type="button"
                      onClick={requestLocation}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-rose-100 border border-rose-700 transition-all text-xs font-semibold"
                    >
                      Retry Location Request
                    </button>
                  </div>
                ) : realLocation ? (
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block font-bold">Accuracy Rating</span>
                        <span className="text-sky-300 text-sm font-bold">{realLocation.accuracyCategory}</span>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-slate-400 text-[10px] uppercase block font-bold">Margin of Error</span>
                        <span className="text-emerald-400 font-bold">±{Math.round(realLocation.accuracy)} m</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] uppercase block">Latitude</span>
                        <span className="text-sky-300 font-bold text-sm">{realLocation.latitude.toFixed(6)}°</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] uppercase block">Longitude</span>
                        <span className="text-sky-300 font-bold text-sm">{realLocation.longitude.toFixed(6)}°</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] uppercase block">Altitude</span>
                        <span className={realLocation.altitude !== null ? "text-slate-200 font-bold" : "text-amber-400/90 italic"}>
                          {realLocation.altitude !== null ? realLocation.altitude.toFixed(1) + " m" : "Not exposed by this browser"}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] uppercase block">Heading / Bearing</span>
                        <span className={realLocation.heading !== null ? "text-slate-200 font-bold" : "text-amber-400/90 italic"}>
                          {realLocation.heading !== null ? realLocation.heading + "°" : "Not exposed by this browser"}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] uppercase block">Speed</span>
                        <span className={realLocation.speed !== null ? "text-slate-200 font-bold" : "text-amber-400/90 italic"}>
                          {realLocation.speed !== null ? realLocation.speed + " m/s" : "Not exposed by this browser"}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] uppercase block">Fix Timestamp</span>
                        <span className="text-slate-200 font-bold">
                          {new Date(realLocation.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {dms && (
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-xs">
                        <span className="text-slate-400 text-[10px] uppercase font-bold">DMS Coordinates</span>
                        <p className="text-slate-300">{dms.latDMS} | {dms.lngDMS}</p>
                      </div>
                    )}
                  </div>
                ) : null}
              </ToolInputPanel>
            )}

            {activeTab === "SIMULATOR" && (
              <ToolInputPanel
                title="Device Recovery Simulator & Demo Mode"
                badge="SIMULATION / DEMO MODE"
              >
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 space-y-1 font-mono text-xs">
                    <div className="flex items-center gap-2 font-bold text-amber-400 uppercase">
                      <AlertCircle className="w-4 h-4" /> SIMULATION / DEMO MODE — DOES NOT ACTUALLY TRACK DEVICES
                    </div>
                    <p className="text-amber-300/80 text-[11px] leading-relaxed font-sans">
                      This utility locally generates fictional spatial demonstration data for test and design verification. Snow does not query telecommunication carriers, private databases, or cellular cell towers.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(["IMEI", "Phone", "Email"] as IdentifierType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setIdentifierType(type);
                            setSimError(null);
                          }}
                          className={"py-2 px-3 rounded-xl font-mono text-xs font-bold border transition-all " +
                            (identifierType === type
                              ? "bg-amber-400 text-slate-950 border-amber-400"
                              : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200")}
                        >
                          {type} Mode
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 uppercase font-bold mb-1">
                          {identifierType} Target Identifier *
                        </label>
                        <input
                          type="text"
                          value={identifierValue}
                          onChange={(e) => setIdentifierValue(e.target.value)}
                          placeholder={
                            identifierType === "IMEI"
                              ? "e.g. 358249091234567"
                              : identifierType === "Phone"
                              ? "e.g. +2347072299463"
                              : "e.g. device@example.com"
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 uppercase font-bold mb-1">
                          Device Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={deviceName}
                          onChange={(e) => setDeviceName(e.target.value)}
                          placeholder="e.g. Snow Testing Handset"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {simError && (
                      <p className="text-xs font-mono text-rose-400">{simError}</p>
                    )}

                    <button
                      type="button"
                      onClick={runSimulator}
                      disabled={isSimulating}
                      className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-mono text-xs font-bold hover:bg-amber-300 transition-all shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>{isSimulating ? "SIMULATING RECOVERY HANDSHAKE..." : "RUN RECOVERY SIMULATION"}</span>
                    </button>
                  </div>

                  {isSimulating && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-amber-400 font-bold uppercase">
                        <span>SIMULATION PROGRESS</span>
                        <span>STEP {simStepIndex + 1} OF {SIMULATION_PROGRESS_STEPS.length}</span>
                      </div>
                      <p className="text-slate-300 font-semibold">{SIMULATION_PROGRESS_STEPS[simStepIndex]?.label}</p>
                      <p className="text-slate-500 text-[11px]">{SIMULATION_PROGRESS_STEPS[simStepIndex]?.description}</p>
                    </div>
                  )}

                  {simulatedDevice && !isSimulating && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-amber-800/80 space-y-4 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-[10px] uppercase text-amber-400 font-bold block">SIMULATED BEACON RESULT</span>
                          <h4 className="text-base font-bold text-slate-100">{simulatedDevice.deviceName}</h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold uppercase">
                          SIMULATED
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">Simulated Coordinates</span>
                          <span className="text-amber-300 font-bold">{simulatedDevice.latitude}° N, {simulatedDevice.longitude}° E</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">Simulated Accuracy</span>
                          <span className="text-emerald-400 font-bold">±{simulatedDevice.accuracyMeters} m (Synthetic)</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">Simulated Carrier</span>
                          <span className="text-slate-200 font-semibold">{simulatedDevice.carrierSimulated}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">Simulated Battery</span>
                          <span className="text-amber-300 font-bold">{simulatedDevice.batteryPercent}% ({simulatedDevice.batteryStatus})</span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        <a
                          href={getGoogleMapsUrl(simulatedDevice.latitude, simulatedDevice.longitude)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-all text-xs flex items-center gap-1.5"
                        >
                          <span>OPEN DEMO LOCATION</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </ToolInputPanel>
            )}

            {activeTab === "TRAIL" && (
              <ToolInputPanel
                title="In-Memory Session Location Trail"
                badge="RAM Only • No Storage"
                actions={
                  sessionTrail.length > 0 && (
                    <button
                      type="button"
                      onClick={clearSessionTrail}
                      className="px-3 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 text-xs font-mono font-bold hover:bg-rose-900 transition-all flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear Session</span>
                    </button>
                  )
                }
              >
                {sessionTrail.length === 0 ? (
                  <div className="p-8 text-center font-mono space-y-2">
                    <Layers className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">No session trail points recorded yet.</p>
                    <p className="text-[11px] text-slate-500">Each location refresh adds a point to this temporary React state trail.</p>
                  </div>
                ) : (
                  <div className="space-y-3 font-mono text-xs">
                    {sessionTrail.map((pt, index) => (
                      <div key={pt.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center font-bold text-[10px]">
                            {index + 1}
                          </span>
                          <div>
                            <span className="text-slate-200 font-bold">{pt.latitude.toFixed(6)}°, {pt.longitude.toFixed(6)}°</span>
                            <span className="text-[10px] text-slate-500 block">{new Date(pt.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <span className="text-emerald-400 font-bold block">±{Math.round(pt.accuracy)} m</span>
                          {pt.distanceFromPrevMeters !== null && (
                            <span className="text-[10px] text-sky-400">+{formatDistance(pt.distanceFromPrevMeters)} from previous</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ToolInputPanel>
            )}

            {activeTab === "SPECS" && (
              <ToolInputPanel
                title="Client Device Hardware & Sensor Capabilities"
                badge="100% Browser Native"
              >
                {deviceSpecs ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase">Browser Engine</span>
                      <span className="text-cyan-300 font-bold">{deviceSpecs.browser}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase">Operating System</span>
                      <span className="text-cyan-300 font-bold">{deviceSpecs.os}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase">CPU Cores</span>
                      <span className="text-slate-200 font-bold">{deviceSpecs.cpuCores}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase">Device Memory</span>
                      <span className="text-slate-200 font-bold">{deviceSpecs.deviceMemory}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase">Online State</span>
                      <span className="text-emerald-400 font-bold">{deviceSpecs.onlineState}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase">Geolocation Permission</span>
                      <span className="text-sky-300 font-bold uppercase">{deviceSpecs.geolocationPermission}</span>
                    </div>
                  </div>
                ) : null}
              </ToolInputPanel>
            )}

            {activeTab === "IP_VS_GPS" && (
              <ToolInputPanel
                title="Public IP Geolocation vs Browser GPS Location"
                badge="Data Source Comparison"
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-slate-950 border border-sky-800/80 space-y-2">
                      <div className="flex items-center gap-2 text-sky-400 font-bold uppercase">
                        <Navigation className="w-4 h-4" /> BROWSER GPS LOCATION
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                        Hardware GPS satellite or Wi-Fi beacon triangulation. Extremely precise (meters radius). Requires explicit user permission.
                      </p>
                      <div className="pt-2 border-t border-slate-800 text-slate-200 font-bold">
                        {realLocation ? realLocation.latitude.toFixed(4) + "°, " + realLocation.longitude.toFixed(4) + "°" : "Not Located Yet"}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-teal-400 font-bold uppercase">
                        <Wifi className="w-4 h-4" /> PUBLIC IP LOCATION
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                        ISP network Autonomous System routing hub. Regional approximation (city-level). Zero browser permission required.
                      </p>
                      <div className="pt-2 border-t border-slate-800 text-slate-200 font-bold">
                        {isIpLoading ? "Loading Public IP..." : ipLocation ? ipLocation.city + ", " + ipLocation.country + " (" + ipLocation.ip + ")" : "IP Unavailable"}
                      </div>
                    </div>
                  </div>
                </div>
              </ToolInputPanel>
            )}

            <ToolOutputPanel
              title="Spatial Location JSON Export"
              badge="Client Local"
              actions={
                <ToolActions
                  copyContent={JSON.stringify({ realLocation, simulatedDevice, sessionTrail }, null, 2)}
                />
              }
            >
              <pre className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto max-h-[200px] select-all">
                {JSON.stringify({ realLocation, simulatedDevice, sessionTrail }, null, 2)}
              </pre>
            </ToolOutputPanel>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300 font-sans">
              <h4 className="font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-400" /> Mandatory Privacy & Non-Tracking Policy
              </h4>
              <p className="leading-relaxed text-slate-400">
                <strong>Zero Database Persistence:</strong> Snow never stores, logs, or transmits your GPS coordinates, IP address, or simulator inputs to any server. All calculations remain strictly in React state memory.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage
              visualType="find"
              mode="services"
              isError={!!errorMessage}
              statusLabel={
                locationStatus === "LOCATED"
                  ? "LIVE GPS LOCK ACQUIRED"
                  : simulatedDevice
                  ? "SIMULATED BEACON ACTIVE"
                  : "SPATIAL ENGINE STANDBY"
              }
              metricLabel="SESSION FIXES"
              metricValue={sessionTrail.length + " FIXES"}
              accentColor={simulatedDevice ? "#f59e0b" : "#38bdf8"}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200 font-mono uppercase text-[11px] tracking-wider">Spatial Coordinate Pipeline</p>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Combines W3C Geolocation API, spatial Three.js globe rendering, and deterministic local device recovery simulations.
                </p>
              </div>
            </ToolVisualStage>

            <ProximitySurface className="p-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-sky-400" /> Console Status Summary
              </h4>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">GPS Engine:</span>
                  <span className="text-sky-300 font-bold">{locationStatus}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Session Trail:</span>
                  <span className="text-emerald-400 font-bold">{sessionTrail.length} Points</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Simulator Mode:</span>
                  <span className={simulatedDevice ? "text-amber-400 font-bold" : "text-slate-500"}>
                    {simulatedDevice ? "ACTIVE DEMO" : "IDLE"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Database Storage:</span>
                  <span className="text-slate-400 italic">Disabled / Local Only</span>
                </div>
              </div>
            </ProximitySurface>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Spatial Web Application Engineering"
          serviceSlug="app-care"
          serviceDescription="Building high-performance spatial interfaces, real-time mapping applications, or custom WebGL components? Snow engineers high-precision web software."
          careCategorySlug="app-care"
        />
      </Container>
    </ToolShell>
  );
}
