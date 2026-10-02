"use client";

import type { OperationCategory, OperationStatus, SecuritySimulationState } from "@/lib/security/simulation";

interface SecurityMonitorProps {
  state: SecuritySimulationState;
  status: OperationStatus;
}

const CATEGORY_LABELS: Record<OperationCategory, string> = {
  recon: "RANGE RECON",
  credentials: "AUTH ENGINE",
  network: "PACKET LAB",
  web: "WEB SANDBOX",
  exploitation: "SNOWPLOIT",
  forensics: "FORENSICS",
  missions: "MISSION CONTROL",
};

const STREAMS = [
  "01001101 11010001 7F A9 0C 31",
  "AUTH-SRV  SSH/2.0  10.44.0.20:22",
  "SESSION_01  TCP SYN  ACK  NODE_04",
  "0x7FF3A2  PACKET  TRACE  ACCESS",
  "SNOW_RANGE // SYNTHETIC FIXTURE",
  "CREDENTIAL  HASH  DECRYPT  8c6976",
  "PORT:22  PORT:443  PROTOCOL:TCP",
];

function operationLines(state: SecuritySimulationState): string[] {
  if (state.category === "credentials" && state.activeOpId === "brute-force") {
    const s = state.bruteForce.state;
    return [
      "SNOW AUTH ENGINE // ISOLATED DICTIONARY SIMULATION",
      `TARGET: ${state.bruteForce.config.target}`,
      `SERVICE: ${state.bruteForce.config.service} // USER: ${state.bruteForce.config.username}`,
      "[WORKER 01] [WORKER 02] [WORKER 03] [WORKER 04]",
      `ATTEMPT ${String(s.attempts).padStart(5, "0")} // ${s.currentCandidate || "awaiting candidate"}`,
      s.matchFound ? `MATCH CONFIRMED // ${s.matchedCredential}` : `RATE ${s.attemptsPerSec}/s // HASH QUEUE ACTIVE`,
    ];
  }
  if (state.category === "recon") {
    return [
      "RANGE DISCOVERY // SYNTHETIC NETWORK TELEMETRY",
      `TARGET: ${state.recon.config.target}`,
      `PHASE: RANGE // ${state.recon.state.currentPhase.replace("CYBER RANGE ", "")}`,
      `HOSTS ${state.recon.state.hostsFound}/5 // PORTS ${state.recon.state.portsScanned}`,
      "SYN -> ACK // SERVICE BANNERS // NODE DISCOVERY",
    ];
  }
  if (state.category === "network") {
    return ["PACKET INSPECTOR // FRAME STREAM", "TCP UDP DNS HTTP SSH", `CAPTURE: ${state.packetLab.isCapturing ? "ACTIVE" : "STANDBY"}`, "SOURCE 10.44.0.100 -> MONITOR 10.44.0.50", "PAYLOAD ANALYSIS // SAFE FIXTURE DATA"];
  }
  if (state.category === "missions") {
    const mission = state.missions.find((item) => item.id === state.activeMissionId) || state.missions[0];
    return ["MISSION CONTROL // OPERATIONAL BRIEF", `CODENAME: ${mission.codename}`, "OBJECTIVE LOCK // ACTIVE STAGE", `TARGET RANGE: ${mission.targetNetwork}`, "CHAIN STATUS // DETERMINISTIC PROGRESSION"];
  }
  return ["SNOW CYBER WORKSTATION // READY", `MODULE: ${CATEGORY_LABELS[state.category]}`, "SELECT AN OPERATION AND PRESS RUN", "ALL TARGETS ARE FICTIONAL LOCAL FIXTURES", "NO EXTERNAL TRAFFIC // SAFETY ENGINE ONLINE"];
}

export function SecurityMonitor({ state, status }: SecurityMonitorProps) {
  const isActive = status === "running";
  const isSuccess = status === "success" || state.bruteForce.state.matchFound;
  const lines = operationLines(state);
  const progress = state.category === "credentials" && state.activeOpId === "brute-force"
    ? Math.min(100, (state.bruteForce.state.attempts / Math.max(1, state.bruteForce.state.totalCandidates)) * 100)
    : state.category === "recon" ? state.recon.state.progress : isActive ? 62 : 0;

  return (
    <section className={`security-monitor ${isActive ? "is-running" : ""} ${isSuccess ? "is-success" : ""}`} aria-label="Snow cyber workstation main monitor" data-testid="security-monitor">
      <div className="security-monitor-bezel">
        <div className="security-monitor-toolbar">
          <span className="security-monitor-lights"><i /><i /><i /></span>
          <span>SNOW // CYBER WORKSTATION // MAINFRAME-01</span>
          <span className={isActive ? "text-emerald-300" : "text-slate-500"}>{status.toUpperCase()}</span>
        </div>
        <div className="security-monitor-screen">
          <div className="security-monitor-grid" />
          <div className="security-monitor-scanlines" />
          <div className="security-monitor-screen-content">
            <div className="security-monitor-readout">
              <span>OPERATION // {CATEGORY_LABELS[state.category]}</span>
              <span>TARGET // PRIMARY NODE</span>
              <span>SESSION // {state.selectedSessionId || "SESSION-01 / STANDBY"}</span>
            </div>
            <div className="security-monitor-columns">
              <div className="security-monitor-operation" aria-live="polite">
                {lines.map((line, index) => <div key={index} className={index === 0 ? "security-monitor-heading" : index === lines.length - 1 && isSuccess ? "security-monitor-success" : ""}>{line}</div>)}
                <div className="security-monitor-progress-label"><span>ACTIVITY</span><span>{Math.round(progress)}%</span></div>
                <div className="security-monitor-progress"><span style={{ width: `${progress}%` }} /></div>
              </div>
              <div className="security-monitor-code" aria-label="Synthetic Matrix code monitor">
                <div className="security-monitor-heading">MATRIX // DATA STREAM</div>
                {STREAMS.map((stream, index) => <div key={index} className={`security-stream-row stream-${index % 3}`}>{stream}</div>)}
              </div>
            </div>
            <div className="security-monitor-footer"><span>TELEMETRY {isActive ? "LIVE" : "IDLE"}</span><span>EVENTS {state.events.length}</span><span>HOSTS {state.hosts.filter((host) => host.discovered).length}/5</span><span>SAFE MODE // LOCAL ONLY</span></div>
          </div>
        </div>
      </div>
      <div className="security-monitor-caption"><span>CRT DISPLAY // PHOSPHOR GREEN / CYAN TRACE</span><span>TYPE <kbd>RUN</kbd> IN TERMINAL TO OPERATE</span></div>
    </section>
  );
}
