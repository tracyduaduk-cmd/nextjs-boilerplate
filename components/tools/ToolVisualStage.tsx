"use client";

import React from "react";
import { SpatialInstrument, SpatialInstrumentMode } from "@/components/spatial/SpatialInstrument";
import {
  ArrowRight,
  FileCode,
  Search,
  ShieldCheck,
  Palette,
  QrCode,
  FileText,
  Binary,
  Hash,
  Globe,
  Wifi,
  Laptop,
  Gauge,
  Activity,
  AlertTriangle,
  Radio,
} from "lucide-react";

export type ToolVisualType =
  | "json"
  | "regex"
  | "hash"
  | "color"
  | "qr"
  | "markdown"
  | "encode"
  | "uuid"
  | "telecom"
  | "dns"
  | "ip"
  | "device"
  | "speed"
  | "network"
  | "generic";

export interface ToolVisualStageProps {
  mode?: SpatialInstrumentMode;
  visualType?: ToolVisualType;
  statusLabel?: string;
  metricLabel?: string;
  metricValue?: string;
  accentColor?: string;
  isError?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const ToolVisualStage: React.FC<ToolVisualStageProps> = ({
  mode = "home",
  visualType = "generic",
  statusLabel = "SYSTEM PROCESSING ACTIVE",
  metricLabel = "DATA MODE",
  metricValue = "LOCAL BROWSER",
  accentColor = "#38bdf8",
  isError = false,
  children,
  className = "",
}) => {
  const renderPipelineDiagram = () => {
    switch (visualType) {
      case "json":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><FileCode className="w-3.5 h-3.5" /> RAW JSON INPUT</span>
              <span>SYNTAX PIPELINE</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1">
                Parse & AST
              </div>
              <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
              <div className="p-1.5 rounded bg-cyan-950 border border-cyan-800/80 text-cyan-300 font-mono text-center flex-1 font-bold">
                Schema Check
              </div>
              <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
              <div className="p-1.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-center flex-1">
                Pretty Output
              </div>
            </div>
          </div>
        );

      case "regex":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> REGEX SCANNER</span>
              <span>MATCH ENGINE</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1">
                /Pattern/g
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold">
                Loop Scan
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-mono text-center flex-1">
                Capture Groups
              </div>
            </div>
          </div>
        );

      case "hash":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> CRYPTO DIGEST</span>
              <span>SUBTLE API</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1">
                String Input
              </div>
              <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
              <div className="p-1.5 rounded bg-emerald-950 border border-emerald-800/80 text-emerald-300 font-mono text-center flex-1 font-bold">
                SHA Digest
              </div>
              <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-center flex-1 truncate">
                1-Way Hex
              </div>
            </div>
          </div>
        );

      case "color":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Palette className="w-3.5 h-3.5" /> CONTRAST MATRIX</span>
              <span>WCAG 2.1</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1">
                FG / BG Colors
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold">
                Luminance
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-center flex-1">
                AA/AAA Verdict
              </div>
            </div>
          </div>
        );

      case "qr":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><QrCode className="w-3.5 h-3.5" /> QR ENCODER</span>
              <span>CANVAS MATRIX</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1">
                URL Payload
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold">
                Reed-Solomon
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-sky-300 font-mono text-center flex-1">
                2D Matrix
              </div>
            </div>
          </div>
        );

      case "markdown":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> MARKDOWN PARSER</span>
              <span>GFM AST</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1">
                GFM Source
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold">
                Sanitizer
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-center flex-1">
                Rendered DOM
              </div>
            </div>
          </div>
        );

      case "encode":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Binary className="w-3.5 h-3.5" /> DATA TRANSCODER</span>
              <span>UTF-8 SAFE</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1">
                Plain Text
              </div>
              <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
              <div className="p-1.5 rounded bg-emerald-950 border border-emerald-800/80 text-emerald-300 font-mono text-center flex-1 font-bold">
                Byte Array
              </div>
              <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-center flex-1">
                Base64/URL
              </div>
            </div>
          </div>
        );

      case "uuid":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Hash className="w-3.5 h-3.5" /> ENTROPY ENGINE</span>
              <span>UUID V4</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1">
                HW Entropy
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold">
                122-Bit Rand
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-center flex-1 truncate">
                UUID v4
              </div>
            </div>
          </div>
        );

      case "telecom":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Radio className="w-3.5 h-3.5" /> TELECOM PIPELINE</span>
              <span>NCC HARMONIZED</span>
            </div>
            <div className="grid grid-cols-4 gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center truncate">
                MOBILE NETWORK
              </div>
              <div className="p-1.5 rounded bg-cyan-950 border border-cyan-800/80 text-cyan-300 font-mono text-center font-bold truncate">
                USSD / SMS
              </div>
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-amber-300 font-mono text-center truncate">
                SERVICE
              </div>
              <div className="p-1.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-center font-bold truncate">
                NCC VERIFIED
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
                {isError ? "NO RESPONSE / ERROR" : "RECORDS"}
              </div>
            </div>
          </div>
        );

      case "ip":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5" /> IP & NETWORK ROUTE</span>
              <span>NETWORK LAYER</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1 truncate">
                CONNECTION
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold truncate">
                PUBLIC NETWORK
              </div>
              <ArrowRight className={`w-3 h-3 shrink-0 ${isError ? "text-rose-400" : "text-sky-400"}`} />
              <div className={`p-1.5 rounded border font-mono text-center flex-1 truncate ${
                isError
                  ? "bg-rose-950/80 border-rose-800 text-rose-300"
                  : "bg-emerald-950 border-emerald-800 text-emerald-300"
              }`}>
                {isError ? "OFFLINE / BLOCKED" : "IP / REGION / ASN"}
              </div>
            </div>
          </div>
        );

      case "device":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5" /> DEVICE CAPABILITY MAP</span>
              <span>CLIENT BROWSER</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1 truncate">
                DEVICE
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold truncate">
                CAPABILITIES
              </div>
              <ArrowRight className={`w-3 h-3 shrink-0 ${isError ? "text-amber-400" : "text-sky-400"}`} />
              <div className={`p-1.5 rounded border font-mono text-center flex-1 truncate ${
                isError
                  ? "bg-amber-950/80 border-amber-800 text-amber-300"
                  : "bg-emerald-950 border-emerald-800 text-emerald-300"
              }`}>
                {isError ? "NOT EXPOSED" : "DIAGNOSTIC MAP"}
              </div>
            </div>
          </div>
        );

      case "speed":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5" /> SPEED & LATENCY DIAGNOSTIC</span>
              <span>MEASUREMENT ENGINE</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-center flex-1 truncate">
                CONNECTION
              </div>
              <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
              <div className="p-1.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-mono text-center flex-1 font-bold truncate">
                LATENCY / TRANSFER
              </div>
              <ArrowRight className={`w-3 h-3 shrink-0 ${isError ? "text-rose-400" : "text-sky-400"}`} />
              <div className={`p-1.5 rounded border font-mono text-center flex-1 truncate ${
                isError
                  ? "bg-rose-950/80 border-rose-800 text-rose-300"
                  : "bg-emerald-950 border-emerald-800 text-emerald-300"
              }`}>
                {isError ? "PING TIMEOUT" : "CONNECTION PROFILE"}
              </div>
            </div>
          </div>
        );

      case "network":
        return (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-sky-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> DIAGNOSTIC SYSTEM FLOW</span>
              <span>NETWORK LAYER</span>
            </div>
            <div className="grid grid-cols-5 gap-1 text-[9px] text-center">
              <div className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono truncate">
                CONNECTION
              </div>
              <div className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono truncate">
                DNS
              </div>
              <div className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono truncate">
                NETWORK
              </div>
              <div className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono truncate">
                DEVICE
              </div>
              <div className="p-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono font-bold truncate">
                RESULT
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800/80 pb-2.5">
        <span className={`flex items-center gap-2 font-semibold ${isError ? "text-rose-400" : "text-sky-400"}`}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${isError ? "bg-rose-400" : "bg-sky-400"}`} />
          {statusLabel}
        </span>
        <span className="text-slate-500">CLIENT-SIDE SECURE</span>
      </div>

      <div className="w-full h-[160px] sm:h-[190px] relative flex items-center justify-center touch-pan-y">
        <SpatialInstrument mode={mode} scale={0.8} accentColor={isError ? "#f43f5e" : accentColor} />
      </div>

      {renderPipelineDiagram()}

      {children}

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>{metricLabel}: <strong className="text-slate-200">{metricValue}</strong></span>
        <span>ZERO TRANSMISSION</span>
      </div>
    </div>
  );
};
