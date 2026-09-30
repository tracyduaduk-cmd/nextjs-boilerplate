"use client";
import { useCursor } from "@/components/spatial/CursorSystem";
import type { SecurityHost, SecurityOperation } from "@/lib/security/simulation";
const CONNECTIONS = [["gateway", "web-01"], ["gateway", "api-01"], ["api-01", "db-01"], ["web-01", "auth-01"], ["api-01", "auth-01"], ["ids", "gateway"]];
export function SecurityNetwork({ operation, hosts }: { operation: SecurityOperation; hosts: SecurityHost[] }) {
  const { setCursorState, resetCursorState } = useCursor();
  const visibleHosts = hosts.filter((host) => host.discovered || host.id === "gateway" || host.id === "ids");
  const visibleIds = new Set(visibleHosts.map((host) => host.id));
  const active = operation === "packets" || operation === "auth" || operation === "exploit" || operation === "defense";
  return <div id="network" className="security-network relative min-h-[340px] overflow-hidden border border-emerald-400/15 bg-[#071014]/80 p-4 sm:min-h-[470px] sm:p-6" aria-label="Simulated network topology">
    <div className="security-network-grid absolute inset-0" />
    <div className="relative z-10 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.24em] text-emerald-300/60"><span>TOPOLOGY / SHARED STATE</span><span>{visibleHosts.length} NODES / {active ? "ACTIVE TRAFFIC" : "STANDBY"}</span></div>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full p-10" aria-hidden="true">
      {CONNECTIONS.map(([fromId, toId]) => { const from = hosts.find((host) => host.id === fromId); const to = hosts.find((host) => host.id === toId); if (!from || !to || !visibleIds.has(fromId) || !visibleIds.has(toId)) return null; return <line key={`${fromId}-${toId}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={`security-link ${active ? "is-active" : ""}`} />; })}
      {active && <><circle cx="50" cy="42" r="2" className="packet-dot packet-dot-a" /><circle cx="50" cy="42" r="2" className="packet-dot packet-dot-b" /></>}
    </svg>
    {visibleHosts.map((host) => <button key={host.id} type="button" className={`security-node absolute -translate-x-1/2 -translate-y-1/2 ${host.status === "filtered" ? "is-filtered" : ""} ${host.status === "offline" ? "is-offline" : ""} ${host.status === "isolated" ? "is-isolated" : ""} ${host.status === "compromised" ? "is-compromised" : ""}`} style={{ left: `${host.x}%`, top: `${host.y}%` }} onMouseEnter={() => setCursorState("SYSTEM", "TARGET")} onMouseLeave={resetCursorState} onFocus={() => setCursorState("SYSTEM", "TARGET")} onBlur={resetCursorState} aria-label={`${host.hostname}, simulated node, ${host.status}, ${host.address}`}>
      <span className="security-node-core" /><span className="security-node-label"><strong>{host.hostname}</strong><small>{host.address}</small><em>{host.status.toUpperCase()}</em></span>
    </button>)}
    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:bottom-5 sm:left-6 sm:right-6"><span><i className="legend-dot bg-emerald-400" />ONLINE</span><span><i className="legend-dot bg-amber-300" />FILTERED</span><span><i className="legend-dot bg-red-400" />COMPROMISED</span><span className="ml-auto text-emerald-300/70">LOCAL SYNTHETIC GRAPH</span></div>
  </div>;
}
