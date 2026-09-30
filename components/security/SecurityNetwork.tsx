"use client";

import { useCursor } from "@/components/spatial/CursorSystem";
import type { SecurityHost, SecuritySession, OperationCategory } from "@/lib/security/simulation";

const CONNECTIONS = [
  ["host-edge", "host-auth"],
  ["host-edge", "host-web"],
  ["host-web", "host-data"],
  ["host-auth", "host-data"],
  ["host-monitor", "host-edge"],
  ["host-monitor", "host-web"],
];

interface SecurityNetworkProps {
  category: OperationCategory;
  hosts: SecurityHost[];
  sessions?: SecuritySession[];
  selectedHostId?: string;
  selectedSessionId?: string;
  status?: string;
  activeOpId?: string;
  onSelectHost?: (hostId: string) => void;
  onSelectSession?: (sessionId: string) => void;
}

export function SecurityNetwork({
  hosts,
  sessions = [],
  selectedHostId,
  selectedSessionId,
  status,
  activeOpId,
  onSelectHost,
  onSelectSession,
}: SecurityNetworkProps) {
  const { setCursorState, resetCursorState } = useCursor();

  const visibleHosts = hosts.filter((host) => host.discovered || host.id === "host-edge" || host.id === "host-monitor");
  const visibleIds = new Set(visibleHosts.map((host) => host.id));
  const isRunning = status === "running";

  const activeHost = hosts.find((h) => h.id === selectedHostId) || visibleHosts[0] || hosts[0];

  return (
    <div
      id="network"
      className="security-network relative flex flex-col justify-between min-h-[460px] overflow-hidden border border-emerald-400/20 bg-[#051113]/90 p-4 sm:p-6"
      aria-label="Simulated cyber range target environment"
    >
      <div className="security-network-grid absolute inset-0" />

      {/* Top Header Status & Cyber Range Network Banner */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${isRunning ? "bg-emerald-400 animate-ping" : "bg-emerald-600"}`} />
          <span className="font-bold text-white">CYBER RANGE TARGET NETWORK</span>
          <span className="text-slate-400">{"// 10.44.0.0/24"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-semibold">
            {visibleHosts.length}/{hosts.length} DISCOVERED
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-300 font-semibold">
            {sessions.length} SESSIONS ESTABLISHED
          </span>
          {activeOpId && (
            <span className="text-slate-400 font-semibold">
              | OP: {activeOpId.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Center Interactive Topology Canvas */}
      <div className="relative my-4 min-h-[260px] w-full flex-1">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full p-6" aria-hidden="true">
          {CONNECTIONS.map(([fromId, toId]) => {
            const from = hosts.find((host) => host.id === fromId);
            const to = hosts.find((host) => host.id === toId);
            if (!from || !to || !visibleIds.has(fromId) || !visibleIds.has(toId)) return null;
            const isTargeted = from.id === selectedHostId || to.id === selectedHostId;
            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={`security-link ${
                  isRunning
                    ? "is-active stroke-emerald-400/80 stroke-[1.5]"
                    : isTargeted
                    ? "stroke-cyan-400/70 stroke-[1.2]"
                    : "stroke-emerald-500/25 stroke-[1]"
                }`}
              />
            );
          })}

          {/* Dynamic Packet Flow Pulses */}
          {isRunning && (
            <>
              <circle cx="28" cy="32" r="1.8" className="fill-cyan-300 animate-ping" />
              <circle cx="48" cy="36" r="1.8" className="fill-emerald-300 animate-pulse" />
              <circle cx="68" cy="42" r="1.5" className="fill-amber-300 animate-ping" />
            </>
          )}
        </svg>

        {/* Host Nodes */}
        {visibleHosts.map((host) => {
          const isSelected = host.id === selectedHostId;
          const hostSession = sessions.find((s) => s.target.includes(host.hostname) || s.target.includes(host.address));
          return (
            <button
              key={host.id}
              type="button"
              onClick={() => onSelectHost?.(host.id)}
              className={`security-node absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
                isSelected ? "scale-110 z-20 border-cyan-400" : "z-10"
              } ${
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
              aria-label={`${host.hostname}, node ${host.status}, address ${host.address}`}
            >
              <span className={`security-node-core ${isSelected ? "bg-cyan-400 shadow-[0_0_12px_#38bdf8]" : ""}`} />
              <span className="security-node-label bg-black/90 p-1 border border-emerald-400/30 text-left font-mono">
                <strong className="text-white block text-[10px]">{host.hostname}</strong>
                <small className="text-slate-300 block text-[9px]">{host.address}</small>
                {hostSession && (
                  <em className="not-italic text-[8px] text-amber-300 font-bold uppercase block">
                    SESSION #{hostSession.id.slice(-3)}
                  </em>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Target Details & Active Session Selector Sub-panel */}
      {activeHost && (
        <div className="relative z-10 border-t border-emerald-400/20 pt-3 mt-2 grid gap-3 sm:grid-cols-2 font-mono text-xs">
          <div className="security-readout space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">SELECTED TARGET NODE</span>
              <span className={`text-[9px] px-1.5 py-0.5 font-bold uppercase ${
                activeHost.discovered ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40" : "bg-slate-900 text-slate-500"
              }`}>
                {activeHost.discovered ? "DISCOVERED" : "LOCKED / RECON REQ"}
              </span>
            </div>
            <div className="text-white font-extrabold text-sm flex items-center gap-2">
              <span>{activeHost.hostname}</span>
              <span className="text-cyan-300 font-normal text-xs">({activeHost.address})</span>
            </div>
            <p className="text-[10px] text-slate-400">{activeHost.role}</p>
            <div className="flex flex-wrap gap-1.5 pt-1 text-[9px]">
              {activeHost.services.map((s) => (
                <span key={s.port} className="border border-emerald-400/20 bg-emerald-950/40 px-1.5 py-0.5 text-emerald-300">
                  {s.port}/{s.service} ({s.state})
                </span>
              ))}
            </div>
          </div>

          <div className="security-readout space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">RANGE SIMULATED SESSIONS</span>
            {sessions.length === 0 ? (
              <div className="text-[10px] text-slate-500 italic py-2">
                No active sessions. Run credential attack or exploit operations to establish access.
              </div>
            ) : (
              <div className="space-y-1 max-h-[80px] overflow-y-auto pr-1">
                {sessions.map((sess) => (
                  <button
                    key={sess.id}
                    type="button"
                    onClick={() => onSelectSession?.(sess.id)}
                    className={`w-full text-left p-1.5 border text-[10px] flex justify-between items-center transition ${
                      selectedSessionId === sess.id
                        ? "border-amber-400 bg-amber-950/40 text-amber-200"
                        : "border-slate-800 bg-black/40 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div>
                      <strong className="text-white block">{sess.id}</strong>
                      <span className="text-[9px] text-slate-400">{sess.target}</span>
                    </div>
                    <span className="px-1.5 py-0.5 text-[8px] bg-amber-500/20 border border-amber-400/30 text-amber-300 font-bold">
                      {sess.privilege}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend & Safety Disclaimer Footer */}
      <div className="relative z-10 mt-3 pt-2 border-t border-emerald-400/10 flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
        <div className="flex gap-3">
          <span className="flex items-center gap-1"><i className="legend-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />ONLINE</span>
          <span className="flex items-center gap-1"><i className="legend-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />DISCOVERED</span>
          <span className="flex items-center gap-1"><i className="legend-dot inline-block h-1.5 w-1.5 rounded-full bg-amber-300" />SESSION</span>
        </div>
        <span className="text-emerald-400/80">SNOW CYBER RANGE SIMULATION // 10.44.0.0/24</span>
      </div>
    </div>
  );
}
