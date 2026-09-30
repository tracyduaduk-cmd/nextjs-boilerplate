"use client";

import { useEffect, useMemo, useState } from "react";
import { SecurityEventStream } from "@/components/security/SecurityEventStream";
import { SecurityNetwork } from "@/components/security/SecurityNetwork";
import { SecurityOperationPanel } from "@/components/security/SecurityOperationPanel";
import { SecurityTerminal } from "@/components/security/SecurityTerminal";
import { COMMAND_ALIASES, CREDENTIAL_OUTPUT, FIREWALL_OUTPUT, INITIAL_EVENTS, PACKET_OUTPUT, RECON_OUTPUT, commandOutput, type SecurityEvent, type SecurityOperation } from "@/lib/security/simulation";

const INITIAL_TERMINAL = ["SNOW SECURITY LAB v0.1", "CONTROLLED DIGITAL ENVIRONMENT // ALL SYSTEMS SIMULATED", "", "snow@lab:~$ help"];

export function SecurityLabApp() {
  const [operation, setOperation] = useState<SecurityOperation>("recon");
  const [terminalLines, setTerminalLines] = useState(INITIAL_TERMINAL);
  const [events, setEvents] = useState<SecurityEvent[]>(INITIAL_EVENTS);
  const [reconComplete, setReconComplete] = useState(false);
  const [credentialComplete, setCredentialComplete] = useState(false);
  const [packetSelected, setPacketSelected] = useState<string | null>(null);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setClock((value) => value + 1), 9000);
    return () => window.clearInterval(timer);
  }, []);

  const missionProgress = useMemo(() => (reconComplete ? 25 : 0) + (packetSelected ? 25 : 0) + (credentialComplete ? 25 : 0) + (operation === "firewall" ? 25 : 0), [credentialComplete, operation, packetSelected, reconComplete]);

  const pushEvent = (type: string, severity: SecurityEvent["severity"], source: string, message: string) => {
    const timestamp = `12:41:${String(8 + events.length).padStart(2, "0")}`;
    setEvents((current) => [...current, { id: `evt-${current.length + 1}`, timestamp, type, severity, source, message }]);
  };

  const handleCommand = (command: string) => {
    const normalized = command.trim().toLowerCase();
    const output = normalized === "scan --demo" || normalized === "recon --demo" ? RECON_OUTPUT : normalized === "password --demo" ? CREDENTIAL_OUTPUT : normalized === "packets --demo" ? PACKET_OUTPUT : normalized === "firewall --demo" ? FIREWALL_OUTPUT : commandOutput(command);
    setTerminalLines((current) => normalized === "clear" ? INITIAL_TERMINAL : [...current, `snow@lab:~$ ${command}`, ...output]);
    const selected = COMMAND_ALIASES[normalized];
    if (!selected) return;
    setOperation(selected);
    if (selected === "recon") { setReconComplete(true); pushEvent("RECON", "success", "SCANNER", "4 SIMULATED HOSTS DISCOVERED / SERVICES ENUMERATED"); }
    if (selected === "credentials") { setCredentialComplete(true); pushEvent("CREDENTIALS", "success", "SANDBOX-AUTH", "DEMO MATCH FOUND / FICTIONAL CREDENTIAL RECOVERED"); }
    if (selected === "packets") { pushEvent("NETWORK", "info", "SENSOR", "SYNTHETIC PACKET STREAM CAPTURED / 8 FRAMES"); }
    if (selected === "firewall") { pushEvent("FIREWALL", "warning", "IDS", "ANOMALY DETECTED / ADMIN → EDGE SSH BLOCKED"); }
    if (selected === "missions") { pushEvent("MISSION", "notice", "BLACK ICE", "OBJECTIVES LOADED / USE THE SIMULATIONS TO PROGRESS"); }
  };

  return <div className="relative z-10"><main id="main-content" className="mx-auto w-full max-w-[1500px] px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-10"><section className="security-hero"><div className="security-hero-copy"><p className="security-kicker"><span className="security-live-dot" />SNOW // SECURITY LAB</p><h1>Enter the <em>controlled</em> unknown.</h1><p className="security-hero-description">Simulated offensive and defensive operations inside a controlled digital environment.</p><div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400"><span className="security-chip">LOCAL RUNTIME</span><span className="security-chip">NO REAL TARGETS</span><span className="security-chip">EDUCATIONAL SIMULATION</span></div></div><div className="security-hero-signal"><div className="security-signal-ring" /><span>CORE<br /><strong>ONLINE</strong></span><small>SIMULATION CLOCK / {String(clock + 1).padStart(2, "0")}</small></div></section><section className="mt-10 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]"><SecurityNetwork operation={operation} discovered={reconComplete} /><div className="grid gap-4"><SecurityTerminal lines={terminalLines} onCommand={handleCommand} /><SecurityEventStream events={events} /></div></section><div className="mt-16"><SecurityOperationPanel operation={operation} onSelect={setOperation} reconComplete={reconComplete} credentialComplete={credentialComplete} packetSelected={packetSelected} onPacketSelect={setPacketSelected} missionProgress={missionProgress} /></div><section className="security-mission-callout mt-16"><div><p className="security-kicker">MISSION FOUNDATION / OPERATION 001</p><h2>BLACK ICE</h2><p>Run recon. Inspect the synthetic stream. Follow the clue. Retrieve the fictional flag.</p></div><button type="button" onClick={() => { setOperation("missions"); handleCommand("mission --list"); }} className="security-command-button">START MISSION →</button></section><p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600">This experience never scans, intercepts, attacks, or transmits data to real systems.</p></main></div>;
}
