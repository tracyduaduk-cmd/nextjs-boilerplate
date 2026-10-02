"use client";

import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import { RealLocationData, SimulatedDeviceData, SessionPoint, getGoogleMapsUrl, formatCoordinateDMS } from "@/lib/tools/findDevice";
import { CinematicGlobe } from "@/components/tools/CinematicGlobe";
import { Navigation, Target, ExternalLink, Maximize2 } from "lucide-react";
import type { Map as LeafletMap, Layer, TileLayer } from "leaflet";

export type MapDisplayMode = "MAP" | "SATELLITE" | "TERRAIN" | "EARTH";
type LeafletModule = typeof import("leaflet");

interface SpatialLocationMapProps {
  liveLocation?: RealLocationData | null;
  simulatedLocation?: SimulatedDeviceData | null;
  sessionTrail?: SessionPoint[];
  initialMode?: MapDisplayMode;
  onModeChange?: (mode: MapDisplayMode) => void;
  className?: string;
}

const DEFAULT_CENTER: [number, number] = [9.8965, 8.8583];
const TILE_CONFIG: Record<Exclude<MapDisplayMode, "EARTH">, { url: string; attribution: string; label: string }> = {
  MAP: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    label: "Cartographic map",
  },
  SATELLITE: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank" rel="noreferrer">Esri</a>, Maxar, Earthstar Geographics, and the GIS User Community',
    label: "Satellite imagery",
  },
  TERRAIN: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank" rel="noreferrer">Esri</a>, USGS, NOAA, and the GIS User Community',
    label: "Topographic terrain",
  },
};

export function SpatialLocationMap({ liveLocation = null, simulatedLocation = null, sessionTrail = [], initialMode = "MAP", onModeChange, className = "" }: SpatialLocationMapProps) {
  const [mapMode, setMapMode] = useState<MapDisplayMode>(initialMode);
  const [mapReady, setMapReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tileError, setTileError] = useState(false);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);
  const tileLayerRef = useRef<TileLayer | null>(null);
  const overlayLayerRef = useRef<Layer | null>(null);
  const activeLocation = liveLocation || simulatedLocation;
  const isSimulated = !liveLocation && !!simulatedLocation;
  const activeLat = activeLocation?.latitude ?? DEFAULT_CENTER[0];
  const activeLng = activeLocation?.longitude ?? DEFAULT_CENTER[1];
  const dms = formatCoordinateDMS(activeLat, activeLng);

  useEffect(() => {
    if (mapMode === "EARTH" || !mapElementRef.current || mapRef.current) return;
    let cancelled = false;
    void import("leaflet").then((L) => {
      if (cancelled || !mapElementRef.current || mapRef.current) return;
      leafletRef.current = L;
      const map = L.map(mapElementRef.current, { center: [activeLat, activeLng], zoom: activeLocation ? 14 : 5, zoomControl: false, attributionControl: true, preferCanvas: true, maxZoom: 19 });
      L.control.zoom({ position: "bottomright" }).addTo(map);
      mapRef.current = map;
      setMapReady(true);
      map.on("tileerror", () => setTileError(true));
      map.whenReady(() => map.invalidateSize());
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      setMapReady(false);
      leafletRef.current = null;
      tileLayerRef.current = null;
      overlayLayerRef.current = null;
    };
    // The map is intentionally created once for each geographic view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapMode === "EARTH"]);

  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L || mapMode === "EARTH") return;
    const config = TILE_CONFIG[mapMode];
    tileLayerRef.current?.removeFrom(map);
    const layer = L.tileLayer(config.url, { attribution: config.attribution, subdomains: ["a"], crossOrigin: true, maxNativeZoom: 18, updateWhenIdle: true, keepBuffer: 2 });
    layer.on("tileerror", () => setTileError(true));
    layer.addTo(map);
    tileLayerRef.current = layer;
    setTileError(false);
    map.invalidateSize();
  }, [mapMode, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L || mapMode === "EARTH") return;
    const center: [number, number] = [activeLat, activeLng];
    map.setView(center, activeLocation ? 14 : map.getZoom(), { animate: true });
    overlayLayerRef.current?.removeFrom(map);
    const overlay = L.layerGroup();
    const accent = isSimulated ? "#f59e0b" : "#38bdf8";
    const markerIcon = L.divIcon({ className: "snow-location-marker", html: '<span class="snow-location-marker__halo"></span><span class="snow-location-marker__core"></span><span class="snow-location-marker__crosshair"></span>', iconSize: [46, 46], iconAnchor: [23, 23] });
    const points = sessionTrail.map((point) => [point.latitude, point.longitude] as [number, number]);
    if (points.length > 1) {
      L.polyline(points, { color: accent, weight: 3, opacity: 0.82, dashArray: "8 7", lineCap: "round" }).addTo(overlay);
      points.slice(0, -1).forEach((point) => L.circleMarker(point, { radius: 4, color: accent, weight: 1, fillColor: accent, fillOpacity: 0.9 }).addTo(overlay));
    }
    if (activeLocation) {
      const accuracy = liveLocation?.accuracy ?? simulatedLocation?.accuracyMeters ?? 25;
      L.circle(center, { radius: accuracy, color: accent, weight: 2, opacity: 0.9, fillColor: accent, fillOpacity: 0.14 }).addTo(overlay);
      L.marker(center, { icon: markerIcon, keyboard: true, title: "Current location" }).addTo(overlay);
    }
    overlay.addTo(map);
    overlayLayerRef.current = overlay;
    return () => { overlay.removeFrom(map); };
  }, [activeLat, activeLng, activeLocation, isSimulated, liveLocation?.accuracy, mapMode, mapReady, sessionTrail, simulatedLocation?.accuracyMeters]);

  useEffect(() => {
    if (mapRef.current) window.setTimeout(() => mapRef.current?.invalidateSize(), 50);
  }, [isFullscreen]);

  return (
    <div className={`relative w-full ${isFullscreen ? "fixed inset-4 z-50 h-[calc(100vh-2rem)]" : ""} ${className}`}>
      <div className="sticky top-4 z-40 mb-3 flex items-center justify-between gap-3 rounded-2xl border border-sky-400/25 bg-slate-950/95 p-2 shadow-[0_12px_35px_rgba(2,8,23,.45)] backdrop-blur-xl" aria-label="Map display modes">
        <span className="hidden pl-2 text-[10px] font-mono font-bold uppercase tracking-[.18em] text-sky-300 sm:inline">Spatial display</span>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-1 overflow-x-auto">
          {(["MAP", "SATELLITE", "TERRAIN", "EARTH"] as MapDisplayMode[]).map((mode) => <button key={mode} type="button" onClick={() => { setMapMode(mode); setTileError(false); onModeChange?.(mode); }} aria-pressed={mapMode === mode} aria-label={mode === "EARTH" ? "EARTH" : mode} className={`min-h-[44px] shrink-0 rounded-xl px-3 text-[10px] font-mono font-bold transition-all sm:px-4 sm:text-xs ${mapMode === mode ? "bg-sky-400 text-slate-950 shadow-md shadow-sky-950/50" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"}`}>{mode === "EARTH" ? "GLOBE" : mode}</button>)}
        </div>
      </div>
      <div className={`relative w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl transition-all ${isFullscreen ? "h-full" : "h-[440px] sm:h-[500px]"}`}>
      <div className="pointer-events-none absolute left-4 right-4 top-4 z-20 flex flex-wrap items-center justify-between gap-3">
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-slate-800/90 bg-slate-950/90 px-3 py-1.5 font-mono text-xs shadow-lg backdrop-blur-md">
          {liveLocation ? <span className="flex items-center gap-1.5 font-bold text-sky-400"><span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />LIVE BROWSER GPS</span> : simulatedLocation ? <span className="flex items-center gap-1.5 font-bold text-amber-400"><span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />SIMULATED DEMO DEVICE</span> : <span className="flex items-center gap-1.5 font-bold text-slate-400"><Target className="h-3.5 w-3.5 text-slate-500" />READY TO LOCATE</span>}
        </div>
      </div>
      {mapMode === "EARTH" ? <CinematicGlobe liveLocation={liveLocation} simulatedLocation={simulatedLocation} sessionTrail={sessionTrail} /> : <div ref={mapElementRef} className="h-full w-full" aria-label={`${TILE_CONFIG[mapMode].label} centered on the selected location`} />}
      {tileError && mapMode !== "EARTH" && <div className="pointer-events-none absolute left-1/2 top-24 z-10 -translate-x-1/2 rounded-xl border border-amber-700/70 bg-slate-950/90 px-3 py-2 text-center font-mono text-[10px] text-amber-200 shadow-lg backdrop-blur-md">Map imagery is temporarily unavailable. Location controls remain active.</div>}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="pointer-events-auto space-y-1 rounded-2xl border border-slate-800 bg-slate-950/90 p-3 font-mono text-xs backdrop-blur-md"><div className="flex items-center gap-2"><Navigation className="h-3.5 w-3.5 text-sky-400" /><span className="font-bold text-slate-200">{activeLat.toFixed(6)}°, {activeLng.toFixed(6)}°</span></div><div className="text-[10px] text-slate-400">{dms.latDMS} | {dms.lngDMS}</div></div>
        <div className="pointer-events-auto flex items-center gap-2">{activeLocation && <a href={getGoogleMapsUrl(activeLat, activeLng)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2 font-mono text-xs font-bold text-sky-300 shadow-lg backdrop-blur-md transition-all hover:bg-sky-400 hover:text-slate-950"><span>Open in Google Maps</span><ExternalLink className="h-3.5 w-3.5" /></a>}<button type="button" onClick={() => setIsFullscreen((value) => !value)} aria-label={isFullscreen ? "Exit fullscreen map" : "Expand map"} className="rounded-xl border border-slate-800 bg-slate-900/90 p-2 text-slate-300 shadow-lg backdrop-blur-md transition-all hover:bg-slate-800"><Maximize2 className="h-4 w-4" /></button></div>
      </div>
    </div>
    </div>
  );
}
