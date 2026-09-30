"use client";

import { useCursor } from "@/components/spatial/CursorSystem";
import { SIMULATED_HOSTS, type SecurityOperation } from "@/lib/security/simulation";

const CONNECTIONS = [["internet", "edge"], ["edge", "web"], ["edge", "api"], ["api", "db"], ["web", "admin"]];

export function SecurityNetwork({ operation, discovered }: { operation: SecurityOperation; discovered: boolean }) {
  const { setCursorState, resetCursorState } = useCursor();
  const visibleHosts = discovered || operation === "packets" || operation === "firewall" ? SIMULATED_HOSTS : SIMULATED_HOSTS.slice(0, 2);
  const visibleIds = new Set(visibleHosts.map((host) => host.id));

  return (
    <div className="security-network relative min-h-[340px] overflow-hidden border border-emerald-400/15 bg-[#071014]/80 p-4 sm:min-h-[470px] sm:p-6" aria-label="Simulated network topology">
      <div className="security-network-grid absolute inset-0" />
      <div className="relative z-10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-emerald-300/60">
        <span>TOPOLOGY / SIMULATED</span><span>{visibleHosts.length} NODES ONLINE</span>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full p-10" aria-hidden="true">
        {CONNECTIONS.map(([fromId, toId]) => {
          const from = SIMULATED_HOSTS.find((host) => host.id === fromId);
          const to = SIMULATED_HOSTS.find((host) => host.id === toId);
          if (!from || !to || !visibleIds.has(fromId) || !visibleIds.has(toId)) return null;
          return <line key={`${fromId}-${toId}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="security-link" />;
        })}
        {(operation === "packets" || operation === "firewall") && <><circle cx="50" cy="42" r="2" className="packet-dot packet-dot-a" /><circle cx="50" cy="42" r="2" className="packet-dot packet-dot-b" /></>}
      </svg>
      {visibleHosts.map((host) => (
        <button
          key={host.id}
          type="button"
          className={`security-node absolute -translate-x-1/2 -translate-y-1/2 ${host.status === "filtered" ? "is-filtered" : ""} ${host.status === "offline" ? "is-offline" : ""}`}
          style={{ left: `${host.x}%`, top: `${host.y}%` }}
          onMouseEnter={() => setCursorState("SYSTEM", "TARGET")}
          onMouseLeave={resetCursorState}
          onFocus={() => setCursorState("SYSTEM", "TARGET")}
          onBlur={resetCursorState}
          aria-label={`${host.hostname}, simulated node, ${host.status}, ${host.address}`}
        >
          <span className="security-node-core" />
          <span className="security-node-label"><strong>{host.hostname}</strong><small>{host.address}</small><em>{host.status.toUpperCase()}</em></span>
        </button>
      ))}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:bottom-5 sm:left-6 sm:right-6"><span><i className="legend-dot bg-emerald-400" />ONLINE</span><span><i className="legend-dot bg-amber-300" />FILTERED</span><span><i className="legend-dot bg-slate-600" />OFFLINE</span><span className="ml-auto text-emerald-300/70">NO EXTERNAL NETWORK ACCESS</span></div>
    </div>
  );
}
