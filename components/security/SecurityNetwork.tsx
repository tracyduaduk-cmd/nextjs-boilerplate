"use client";

import { useCursor } from "@/components/spatial/CursorSystem";
import type { SecurityHost, OperationCategory } from "@/lib/security/simulation";

const CONNECTIONS = [
  ["gateway", "web-01"],
  ["gateway", "api-01"],
  ["api-01", "db-01"],
  ["web-01", "auth-01"],
  ["api-01", "auth-01"],
  ["ids", "gateway"],
];

interface SecurityNetworkProps {
  category: OperationCategory;
  hosts: SecurityHost[];
  status?: string;
  activeOpId?: string;
}

export function SecurityNetwork({ hosts, status, activeOpId }: SecurityNetworkProps) {
  const { setCursorState, resetCursorState } = useCursor();

  const visibleHosts = hosts.filter((host) => host.discovered || host.id === "gateway" || host.id === "ids");
  const visibleIds = new Set(visibleHosts.map((host) => host.id));
  const isRunning = status === "running";

  return (
    <div
      id="network"
      className="security-network relative min-h-[340px] overflow-hidden border border-emerald-400/20 bg-[#051113]/85 p-4 sm:min-h-[460px] sm:p-6"
      aria-label="Simulated network topology"
    >
      <div className="security-network-grid absolute inset-0" />

      {/* Topology Header Status */}
      <div className="relative z-10 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.24em] text-emerald-300/70">
        <span className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${isRunning ? "bg-emerald-400 animate-ping" : "bg-emerald-600"}`} />
          NETWORK TOPOLOGY // 10.42.0.0/24
        </span>
        <span>
          {visibleHosts.length} ACTIVE NODES / {isRunning ? `OP: ${activeOpId?.toUpperCase()}` : "STANDBY"}
        </span>
      </div>

      {/* SVG Connection Lines & Pulses */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full p-8" aria-hidden="true">
        {CONNECTIONS.map(([fromId, toId]) => {
          const from = hosts.find((host) => host.id === fromId);
          const to = hosts.find((host) => host.id === toId);
          if (!from || !to || !visibleIds.has(fromId) || !visibleIds.has(toId)) return null;
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className={`security-link ${isRunning ? "is-active stroke-emerald-400/60" : "stroke-emerald-400/20"}`}
            />
          );
        })}

        {/* Animated Data Packets / Pulses when running */}
        {isRunning && (
          <>
            <circle cx="40" cy="25" r="1.8" className="fill-cyan-300 animate-pulse" />
            <circle cx="45" cy="75" r="1.8" className="fill-emerald-300 animate-bounce" />
            <circle cx="65" cy="30" r="1.5" className="fill-amber-300 animate-ping" />
          </>
        )}
      </svg>

      {/* Host Nodes */}
      {visibleHosts.map((host) => (
        <button
          key={host.id}
          type="button"
          className={`security-node absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
            host.status === "filtered"
              ? "is-filtered"
              : host.status === "offline"
              ? "is-offline"
              : host.status === "isolated"
              ? "is-isolated"
              : host.status === "compromised"
              ? "is-compromised"
              : ""
          }`}
          style={{ left: `${host.x}%`, top: `${host.y}%` }}
          onMouseEnter={() => setCursorState("SYSTEM", "TARGET")}
          onMouseLeave={resetCursorState}
          onFocus={() => setCursorState("SYSTEM", "TARGET")}
          onBlur={resetCursorState}
          aria-label={`${host.hostname}, node ${host.status}, ${host.address}`}
        >
          <span className="security-node-core" />
          <span className="security-node-label">
            <strong>{host.hostname}</strong>
            <small>{host.address}</small>
            <em>{host.status.toUpperCase()}</em>
          </span>
        </button>
      ))}

      {/* Legend & Safety Disclaimer Footer */}
      <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:bottom-4 sm:left-6 sm:right-6">
        <div className="flex gap-3">
          <span className="flex items-center gap-1"><i className="legend-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />ONLINE</span>
          <span className="flex items-center gap-1"><i className="legend-dot inline-block h-1.5 w-1.5 rounded-full bg-amber-300" />FILTERED</span>
          <span className="flex items-center gap-1"><i className="legend-dot inline-block h-1.5 w-1.5 rounded-full bg-red-400" />COMPROMISED</span>
        </div>
        <span className="text-emerald-400/80">ISOLATED SYNTHETIC GRAPH</span>
      </div>
    </div>
  );
}
