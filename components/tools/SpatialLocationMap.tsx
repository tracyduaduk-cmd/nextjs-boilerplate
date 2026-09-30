"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  RealLocationData,
  SimulatedDeviceData,
  SessionPoint,
  getGoogleMapsUrl,
  formatCoordinateDMS,
} from "@/lib/tools/findDevice";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";
import {
  Globe,
  Navigation,
  Target,
  ExternalLink,
  Maximize2,
} from "lucide-react";

export type MapDisplayMode = "MAP" | "SATELLITE" | "TERRAIN" | "EARTH";

interface SpatialLocationMapProps {
  liveLocation?: RealLocationData | null;
  simulatedLocation?: SimulatedDeviceData | null;
  sessionTrail?: SessionPoint[];
  initialMode?: MapDisplayMode;
  onModeChange?: (mode: MapDisplayMode) => void;
  className?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const getWin = () => (typeof window !== "undefined" ? (window as any) : {});

export function SpatialLocationMap({
  liveLocation = null,
  simulatedLocation = null,
  sessionTrail = [],
  initialMode = "MAP",
  onModeChange,
  className = "",
}: SpatialLocationMapProps) {
  const [mapMode, setMapMode] = useState<MapDisplayMode>(initialMode);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const googleMapContainerRef = useRef<HTMLDivElement>(null);
  const googleMapInstanceRef = useRef<any>(null);

  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const activeLocation = liveLocation || simulatedLocation;
  const isSimulated = !liveLocation && !!simulatedLocation;

  const handleModeSwitch = (mode: MapDisplayMode) => {
    setMapMode(mode);
    if (onModeChange) onModeChange(mode);
  };

  useEffect(() => {
    if (!googleApiKey || mapMode === "EARTH") return;

    if (getWin().google && getWin().google.maps) {
      setTimeout(() => setGoogleMapsLoaded(true), 0);
      return;
    }

    const scriptId = "google-maps-js-sdk";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + googleApiKey;
    script.async = true;
    script.onload = () => setGoogleMapsLoaded(true);
    document.head.appendChild(script);
  }, [googleApiKey, mapMode]);

  useEffect(() => {
    if (!googleMapsLoaded || !googleMapContainerRef.current || mapMode === "EARTH" || !activeLocation) {
      return;
    }

    try {
      const center = { lat: activeLocation.latitude, lng: activeLocation.longitude };
      let mapTypeId = "roadmap";
      if (mapMode === "SATELLITE") mapTypeId = "hybrid";
      if (mapMode === "TERRAIN") mapTypeId = "terrain";

      if (!googleMapInstanceRef.current) {
        googleMapInstanceRef.current = new (getWin().google).maps.Map(googleMapContainerRef.current, {
          center,
          zoom: 14,
          mapTypeId,
          disableDefaultUI: true,
        });
      } else {
        googleMapInstanceRef.current.setCenter(center);
        googleMapInstanceRef.current.setMapTypeId(mapTypeId);
      }
    } catch {
      // Fallback
    }
  }, [googleMapsLoaded, mapMode, activeLocation]);

  useEffect(() => {
    if (googleApiKey && googleMapsLoaded && mapMode !== "EARTH") return;
    if (!canvasRef.current || mapMode === "EARTH") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let pulse = 0;

    const drawSpatialMap = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 400);

      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      const gridSize = 40;
      ctx.strokeStyle = mapMode === "SATELLITE" ? "#0f2942" : "#0f172a";
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const centerX = width / 2;
      const centerY = height / 2;

      for (let r = 60; r <= 280; r += 60) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (sessionTrail.length > 1) {
        ctx.beginPath();
        sessionTrail.forEach((pt, i) => {
          const offsetX = (i - sessionTrail.length / 2) * 30;
          const offsetY = (i - sessionTrail.length / 2) * 20;
          const px = centerX + offsetX;
          const py = centerY + offsetY;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (activeLocation) {
        const accuracyRadius = Math.min(
          120,
          Math.max(30, (liveLocation ? liveLocation.accuracy : simulatedLocation?.accuracyMeters || 25) * 1.5)
        );

        ctx.beginPath();
        ctx.arc(centerX, centerY, accuracyRadius, 0, Math.PI * 2);
        ctx.fillStyle = isSimulated ? "rgba(245, 158, 11, 0.12)" : "rgba(56, 189, 248, 0.12)";
        ctx.fill();
        ctx.strokeStyle = isSimulated ? "rgba(245, 158, 11, 0.6)" : "rgba(56, 189, 248, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        pulse = (pulse + 0.03) % (Math.PI * 2);
        const waveRadius = accuracyRadius + Math.sin(pulse) * 15;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(10, waveRadius), 0, Math.PI * 2);
        ctx.strokeStyle = isSimulated
          ? "rgba(245, 158, 11, " + (0.8 - Math.sin(pulse) * 0.4) + ")"
          : "rgba(56, 189, 248, " + (0.8 - Math.sin(pulse) * 0.4) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.strokeStyle = isSimulated ? "#f59e0b" : "#38bdf8";
        ctx.lineWidth = 2;
        const cross = 18;
        ctx.beginPath();
        ctx.moveTo(centerX - cross, centerY);
        ctx.lineTo(centerX + cross, centerY);
        ctx.moveTo(centerX, centerY - cross);
        ctx.lineTo(centerX, centerY + cross);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = isSimulated ? "#f59e0b" : "#38bdf8";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animFrame = requestAnimationFrame(drawSpatialMap);
    };

    drawSpatialMap();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [mapMode, activeLocation, sessionTrail, liveLocation, simulatedLocation, googleApiKey, googleMapsLoaded, isSimulated]);

  const activeLat = activeLocation?.latitude || 9.8965;
  const activeLng = activeLocation?.longitude || 8.8583;
  const dms = formatCoordinateDMS(activeLat, activeLng);

  return (
    <div
      className={"relative w-full rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl transition-all " +
        (isFullscreen ? "fixed inset-4 z-50 h-[calc(100vh-2rem)]" : "h-[440px] sm:h-[500px]") + " " + className}
    >
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md font-mono text-xs shadow-lg">
          {liveLocation ? (
            <span className="flex items-center gap-1.5 text-sky-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              LIVE BROWSER GPS
            </span>
          ) : simulatedLocation ? (
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              SIMULATED DEMO DEVICE
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-slate-400 font-bold">
              <Target className="w-3.5 h-3.5 text-slate-500" />
              READY TO LOCATE
            </span>
          )}
        </div>

        <div className="pointer-events-auto flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-md">
          {(["MAP", "SATELLITE", "TERRAIN", "EARTH"] as MapDisplayMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => handleModeSwitch(mode)}
              className={"px-3 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all " +
                (mapMode === mode
                  ? "bg-sky-400 text-slate-950 shadow-md shadow-sky-950/50"
                  : "text-slate-400 hover:text-slate-200")}
            >
              {mode === "EARTH" ? "GLOBE" : mode}
            </button>
          ))}
        </div>
      </div>

      {mapMode === "EARTH" ? (
        <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
          <SpatialInstrument
            mode="home"
            badgeLabel="SNOW SPATIAL EARTH GLOBE"
            accentColor={isSimulated ? "#f59e0b" : "#38bdf8"}
            scale={1.2}
          />
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md font-mono text-xs">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: "10s" }} />
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Spatial globe view</span>
                <span className="text-slate-100 font-bold">{dms.latDMS} / {dms.lngDMS}</span>
              </div>
            </div>
            {isSimulated && (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold uppercase">
                DEMO DATA GLOBE
              </span>
            )}
          </div>
        </div>
      ) : googleApiKey && googleMapsLoaded ? (
        <div ref={googleMapContainerRef} className="w-full h-full" aria-label="Interactive Map View" />
      ) : (
        <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full block" aria-label="Spatial Vector Map Stage" />
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto p-3 rounded-2xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md space-y-1 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-200 font-bold">
              {activeLat.toFixed(6)}°, {activeLng.toFixed(6)}°
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            {dms.latDMS} | {dms.lngDMS}
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {activeLocation && (
            <a
              href={getGoogleMapsUrl(activeLat, activeLng)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-sky-400 hover:text-slate-950 text-sky-300 font-mono text-xs font-bold border border-slate-800 backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 backdrop-blur-md transition-all shadow-lg"
            title="Expand map"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
