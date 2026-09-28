"use client";

import React from "react";
import { SpatialInstrument, SpatialInstrumentMode } from "@/components/spatial/SpatialInstrument";
import { SiteAssetImage } from "@/components/ui/SiteAssetImage";
import {
  Braces,
  Search,
  QrCode,
  Globe,
  ArrowRight,
  Radio,
} from "lucide-react";

export interface ToolVisualStageProps {
  pageKey?: string;
  slotKey?: string;
  visualType?:
    | "json"
    | "encode"
    | "uuid"
    | "hash"
    | "regex"
    | "markdown"
    | "color"
    | "qr"
    | "telecom"
    | "dns"
    | "ip"
    | "device"
    | "speed"
    | "network";
  mode?: SpatialInstrumentMode;
  statusLabel?: string;
  metricLabel?: string;
  metricValue?: string;
  accentColor?: string;
  isError?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ToolVisualStage: React.FC<ToolVisualStageProps> = ({
  pageKey,
  slotKey,
  visualType = "json",
  mode = "home",
  statusLabel = "SYSTEM ONLINE",
  metricLabel = "OPERATIONS",
  metricValue = "READY",
  accentColor = "#38bdf8",
  isError = false,
  className = "",
  children,
}) => {
  const renderPipelineDiagram = () => {
    switch (visualType) {
      case "json":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Braces className="w-3.5 h-3.5" /> DATA PIPELINE</span>
              <span>PARSER ENGINE</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1 truncate">
                RAW JSON
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold truncate">
                PARSE / MINIFY
              </div>
              <ArrowRight className={`w-3 h-3 shrink-0 ${isError ? "text-rose-400" : "text-sky-400"}`} />
              <div className={`p-1.5 rounded border font-mono text-center flex-1 truncate ${
                isError
                  ? "bg-rose-950/80 border-rose-800 text-rose-300"
                  : "bg-emerald-950 border-emerald-800 text-emerald-300"
              }`}>
                {isError ? "INVALID" : "STRUCTURED"}
              </div>
            </div>
          </div>
        );

      case "regex":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> REGEX MATCH ENGINE</span>
              <span>ECMAScript</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1 truncate">
                PATTERN
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold truncate">
                MATCH ENGINE
              </div>
              <ArrowRight className={`w-3 h-3 shrink-0 ${isError ? "text-rose-400" : "text-sky-400"}`} />
              <div className={`p-1.5 rounded border font-mono text-center flex-1 truncate ${
                isError
                  ? "bg-rose-950/80 border-rose-800 text-rose-300"
                  : "bg-emerald-950 border-emerald-800 text-emerald-300"
              }`}>
                {isError ? "NO MATCH" : "GROUPS"}
              </div>
            </div>
          </div>
        );

      case "qr":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><QrCode className="w-3.5 h-3.5" /> QR ENCODING MATRIX</span>
              <span>CANVAS SVG</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1 truncate">
                PAYLOAD
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold truncate">
                ENCODER
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-center flex-1 font-bold truncate">
                MATRIX
              </div>
            </div>
          </div>
        );

      case "dns":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> DNS RESOLUTION PIPELINE</span>
              <span>DOH RESOLVER</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1 truncate">
                DOMAIN
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold truncate">
                {isError ? "DNS QUERY" : "DNS RESOLUTION"}
              </div>
              <ArrowRight className={`w-3 h-3 shrink-0 ${isError ? "text-rose-400" : "text-sky-400"}`} />
              <div className={`p-1.5 rounded border font-mono text-center flex-1 truncate ${
                isError
                  ? "bg-rose-950/80 border-rose-800 text-rose-300"
                  : "bg-emerald-950 border-emerald-800 text-emerald-300"
              }`}>
                {isError ? "NO RESPONSE" : "RECORDS"}
              </div>
            </div>
          </div>
        );

      case "telecom":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Radio className="w-3.5 h-3.5" /> TELECOM HARMONIZATION</span>
              <span>NCC DIRECTORY</span>
            </div>
            <div className="grid grid-cols-4 gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center truncate">
                NETWORK
              </div>
              <div className="p-1.5 rounded bg-amber-950 border border-amber-800/80 text-amber-300 font-mono text-center font-bold truncate">
                USSD / SMS
              </div>
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-amber-300 font-mono text-center truncate">
                SERVICE
              </div>
              <div className="p-1.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-center font-bold truncate">
                VERIFIED
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800/80 pb-2.5">
        <span className={`flex items-center gap-2 font-semibold ${isError ? "text-rose-400" : "text-sky-400"}`}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${isError ? "bg-rose-400" : "bg-sky-400"}`} />
          {statusLabel}
        </span>
        <span className="text-slate-500">CLIENT-SIDE SECURE</span>
      </div>

      {/* Interactive 3D Spatial Instrument Stage (Preserved) */}
      <div className="w-full h-[120px] sm:h-[150px] relative flex items-center justify-center touch-pan-y">
        <SpatialInstrument mode={mode} scale={0.8} accentColor={isError ? "#f43f5e" : accentColor} />
      </div>

      {/* Supplementary Site Asset Reference Banner (If available) */}
      {pageKey && slotKey && (
        <SiteAssetImage
          pageKey={pageKey}
          slotKey={slotKey}
        />
      )}

      {renderPipelineDiagram()}

      {children}

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>{metricLabel}: <strong className="text-slate-200">{metricValue}</strong></span>
        <span>ZERO TRANSMISSION</span>
      </div>
    </div>
  );
};
