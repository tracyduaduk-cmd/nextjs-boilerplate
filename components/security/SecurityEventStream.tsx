import type { SecurityEvent } from "@/lib/security/simulation";

export function SecurityEventStream({ events }: { events: SecurityEvent[] }) {
  return <section className="security-panel min-h-[220px]" aria-labelledby="event-stream-title"><div className="security-panel-heading"><span id="event-stream-title">EVENT STREAM</span><span className="security-live-dot">LIVE</span></div><div className="max-h-[245px] space-y-2 overflow-y-auto pr-1" aria-live="polite">{events.slice(-8).reverse().map((event) => <div key={event.id} className="flex gap-2 font-mono text-[10px] leading-relaxed"><span className="shrink-0 text-slate-600">[{event.timestamp}]</span><span className={`shrink-0 security-severity-${event.severity}`}>{event.type}</span><span className="text-slate-300">{event.message}</span></div>)}</div></section>;
}
