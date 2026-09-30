"use client";

import type {
  OperationCategory,
  OperationStatus,
  SecuritySimulationState,
  ForensicsArtifact,
  BruteForceConfig,
  JohnHashcatConfig,
  ReconConfig,
} from "@/lib/security/simulation";

interface SecurityOperationPanelProps {
  state: SecuritySimulationState;
  onSelectCategory: (category: OperationCategory) => void;
  onSelectOp: (opId: string) => void;
  onRunOperation: () => void;
  onPauseOperation: () => void;
  onResumeOperation: () => void;
  onStopOperation: () => void;
  onResetOperation: () => void;
  onUpdateBruteForce: (update: Partial<BruteForceConfig>) => void;
  onUpdateJohnHashcat: (update: Partial<JohnHashcatConfig>) => void;
  onUpdateMedusaHydra: (update: Partial<SecuritySimulationState["medusaHydra"]["config"]>) => void;
  onUpdateRecon: (update: Partial<ReconConfig>) => void;
  onSelectPacket: (packetId: string) => void;
  onFilterPackets: (filter: SecuritySimulationState["packetLab"]["filter"]) => void;
  onUpdateWebLab: (update: Partial<SecuritySimulationState["webLab"]>) => void;
  onExecuteSnowploit: (cmd: string) => void;
  onSelectForensicArtifact: (id: string) => void;
}

const CATEGORY_NAMES: Array<{ id: OperationCategory; label: string; count: number; desc: string }> = [
  { id: "recon", label: "RECON", count: 1, desc: "Network & Service Discovery" },
  { id: "credentials", label: "CREDENTIALS", count: 3, desc: "Brute Force & Hash Cracking" },
  { id: "network", label: "NETWORK", count: 1, desc: "Wireshark Packet Analysis" },
  { id: "web", label: "WEB", count: 1, desc: "Application Security Sandbox" },
  { id: "exploitation", label: "EXPLOITATION", count: 1, desc: "Snowploit Framework" },
  { id: "forensics", label: "FORENSICS", count: 1, desc: "Evidence & Memory Inspector" },
  { id: "missions", label: "MISSIONS", count: 1, desc: "Black Ice Cyber Range" },
];

export function SecurityOperationPanel({
  state,
  onSelectCategory,
  onSelectOp,
  onRunOperation,
  onPauseOperation,
  onResumeOperation,
  onStopOperation,
  onResetOperation,
  onUpdateBruteForce,
  onUpdateJohnHashcat,
  onUpdateMedusaHydra,
  onUpdateRecon,
  onSelectPacket,
  onFilterPackets,
  onUpdateWebLab,
  onExecuteSnowploit,
  onSelectForensicArtifact,
}: SecurityOperationPanelProps) {
  const currentOp = getActiveOpStatus(state);
  const isRunning = currentOp.status === "running";
  const isPaused = currentOp.status === "paused";

  return (
    <section className="security-panel rounded-none border border-emerald-400/20 bg-[#040f11]/90 p-4 sm:p-6">
      {/* Top Bar: Operator Control Station & Operation Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-400/15 pb-4">
        <div>
          <p className="security-kicker">OPERATOR CONTROL STATION</p>
          <h2 className="text-lg font-mono font-bold text-slate-100 tracking-wider">
            {state.category.toUpperCase()} {"//"} WORKSTATION SUITE
          </h2>
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="border border-emerald-400/20 px-3 py-1 text-emerald-300/80 bg-emerald-950/30 uppercase">
            STATUS:{" "}
            <strong className={isRunning ? "text-emerald-400 animate-pulse" : isPaused ? "text-amber-300" : "text-cyan-300"}>
              {currentOp.status.toUpperCase()}
            </strong>
          </span>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1 border-b border-emerald-400/15 pb-3">
        {CATEGORY_NAMES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            data-category={cat.id}
            aria-label={`Select ${cat.label} category`}
            onClick={() => onSelectCategory(cat.id)}
            className={`p-2.5 text-left font-mono transition border ${
              state.category === cat.id
                ? "border-emerald-400 text-emerald-300 bg-emerald-400/10 shadow-[inset_0_-2px_0_#34d399]"
                : "border-emerald-400/10 text-slate-400 hover:text-slate-200 hover:bg-emerald-950/20"
            }`}
          >
            <span className="block text-[11px] font-bold tracking-wider">{cat.label}</span>
            <small className="block text-[9px] text-slate-500 truncate mt-0.5">{cat.desc}</small>
          </button>
        ))}
      </div>

      {/* Sub-Operation Selection (Credentials sub-tools) */}
      {state.category === "credentials" && (
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { id: "brute-force", label: "Brute Force Auth Engine", desc: "Flagship SSH / HTTP Attack" },
            { id: "john-hashcat", label: "John / Hashcat Cracker", desc: "GPU Hash Cracker Workstation" },
            { id: "medusa-hydra", label: "Medusa / Hydra Parallel Tester", desc: "Multi-Threaded Auth Engine" },
          ].map((sub) => (
            <button
              key={sub.id}
              type="button"
              data-op={sub.id}
              onClick={() => onSelectOp(sub.id)}
              className={`px-3 py-1.5 font-mono text-[10px] border transition ${
                state.activeOpId === sub.id
                  ? "border-cyan-400 text-cyan-300 bg-cyan-950/40"
                  : "border-slate-800 text-slate-400 hover:border-slate-600"
              }`}
            >
              <strong>{sub.label}</strong>
              <span className="block text-[8px] text-slate-500">{sub.desc}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Operation Execution & Control Workspace */}
      <div className="mt-6">
        {/* RECON WORKSPACE */}
        {state.category === "recon" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="security-readout">
                <span>TARGET SCOPE</span>
                <input
                  type="text"
                  value={state.recon.config.target}
                  onChange={(e) => onUpdateRecon({ target: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs outline-none"
                />
              </div>
              <div className="security-readout">
                <span>COMMAND</span>
                <input
                  type="text"
                  value={state.recon.config.command}
                  onChange={(e) => onUpdateRecon({ command: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-cyan-300 border border-emerald-400/30 p-1 text-xs outline-none"
                />
              </div>
              <div className="security-readout">
                <span>TIMING TEMPLATE</span>
                <select
                  value={state.recon.config.timing}
                  onChange={(e) => onUpdateRecon({ timing: e.target.value as ReconConfig["timing"] })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs outline-none"
                >
                  <option value="T1 Stealth">T1 Stealth</option>
                  <option value="T3 Normal">T3 Normal</option>
                  <option value="T4 Aggressive">T4 Aggressive</option>
                </select>
              </div>
            </div>

            {/* Scan Execution Metrics */}
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="security-readout">
                <span>CURRENT PHASE</span>
                <strong className="text-emerald-400">{state.recon.state.currentPhase}</strong>
              </div>
              <div className="security-readout">
                <span>DISCOVERED HOSTS</span>
                <strong>{state.recon.state.hostsFound} / 6</strong>
              </div>
              <div className="security-readout">
                <span>PORTS ENUMERATED</span>
                <strong>{state.recon.state.portsScanned}</strong>
              </div>
              <div className="security-readout">
                <span>ELAPSED TIME</span>
                <strong>{state.recon.state.elapsedSec}s</strong>
              </div>
            </div>

            {/* Terminal Discovery Log */}
            {state.recon.state.terminalLogs.length > 0 && (
              <div className="border border-emerald-400/20 bg-black/80 p-3 space-y-1 max-h-[120px] overflow-y-auto text-[11px] text-emerald-400">
                {state.recon.state.terminalLogs.map((log, i) => (
                  <div key={i}>&gt; {log}</div>
                ))}
              </div>
            )}

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>NMAP RECON ENGINE PROGRESS</span>
                <span>{state.recon.state.progress}%</span>
              </div>
              <div className="security-meter">
                <span style={{ width: `${state.recon.state.progress}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* BRUTE FORCE WORKSPACE (FLAGSHIP OPERATION) */}
        {state.category === "credentials" && state.activeOpId === "brute-force" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <div className="security-readout">
                <span>TARGET NODE</span>
                <input
                  type="text"
                  value={state.bruteForce.config.target}
                  onChange={(e) => onUpdateBruteForce({ target: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs"
                />
              </div>
              <div className="security-readout">
                <span>SERVICE / PROTOCOL</span>
                <select
                  value={state.bruteForce.config.service}
                  onChange={(e) => onUpdateBruteForce({ service: e.target.value as BruteForceConfig["service"] })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs"
                >
                  <option value="SSH">SSH (Port 22)</option>
                  <option value="HTTPS">HTTPS (Port 443)</option>
                  <option value="AUTH">AUTH Gateway</option>
                </select>
              </div>
              <div className="security-readout">
                <span>USERNAME</span>
                <input
                  type="text"
                  value={state.bruteForce.config.username}
                  onChange={(e) => onUpdateBruteForce({ username: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs"
                />
              </div>
              <div className="security-readout">
                <span>WORDLIST</span>
                <input
                  type="text"
                  value={state.bruteForce.config.wordlist}
                  onChange={(e) => onUpdateBruteForce({ wordlist: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs"
                />
              </div>
              <div className="security-readout">
                <span>WORKERS</span>
                <input
                  type="number"
                  value={state.bruteForce.config.workers}
                  onChange={(e) => onUpdateBruteForce({ workers: Number(e.target.value) })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs"
                />
              </div>
              <div className="security-readout">
                <span>MODE</span>
                <select
                  value={state.bruteForce.config.mode}
                  onChange={(e) => onUpdateBruteForce({ mode: e.target.value as BruteForceConfig["mode"] })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs"
                >
                  <option value="dictionary">Dictionary Attack</option>
                  <option value="hybrid">Hybrid Mode</option>
                  <option value="brute-force">Brute-Force Spray</option>
                </select>
              </div>
            </div>

            {/* Live Progress & Metrics */}
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="security-readout">
                <span>ATTEMPTS</span>
                <strong className="text-cyan-300">{state.bruteForce.state.attempts.toLocaleString()}</strong>
              </div>
              <div className="security-readout">
                <span>RATE (SIMULATED)</span>
                <strong className="text-emerald-400">{state.bruteForce.state.attemptsPerSec} req/s</strong>
              </div>
              <div className="security-readout">
                <span>CURRENT CANDIDATE</span>
                <strong className="text-amber-300 truncate">{state.bruteForce.state.currentCandidate}</strong>
              </div>
              <div className="security-readout">
                <span>TARGET RESPONSE</span>
                <strong className={state.bruteForce.state.matchFound ? "text-emerald-300" : "text-red-400"}>
                  {state.bruteForce.state.matchFound
                    ? `CREDENTIAL MATCH: ${state.bruteForce.state.matchedCredential}`
                    : state.bruteForce.state.status === "running"
                    ? "AUTH FAILURE (RETRYING)"
                    : state.bruteForce.state.status === "stopped"
                    ? "STOPPED"
                    : "STANDBY"}
                </strong>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>BRUTE FORCE AUTH ENGINE PROGRESS</span>
                <span>
                  {Math.min(100, Math.floor((state.bruteForce.state.attempts / state.bruteForce.state.totalCandidates) * 100))}%
                </span>
              </div>
              <div className="security-meter">
                <span
                  style={{
                    width: `${Math.min(
                      100,
                      Math.floor((state.bruteForce.state.attempts / state.bruteForce.state.totalCandidates) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* JOHN / HASHCAT WORKSPACE */}
        {state.category === "credentials" && state.activeOpId === "john-hashcat" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="security-readout">
                <span>HASH TYPE</span>
                <select
                  value={state.johnHashcat.config.hashType}
                  onChange={(e) => onUpdateJohnHashcat({ hashType: e.target.value as JohnHashcatConfig["hashType"] })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1"
                >
                  <option value="bcrypt">bcrypt ($2b$12$...)</option>
                  <option value="SHA-256">SHA-256</option>
                  <option value="MD5">MD5</option>
                </select>
              </div>
              <div className="security-readout">
                <span>WORDLIST</span>
                <input
                  type="text"
                  value={state.johnHashcat.config.wordlist}
                  onChange={(e) => onUpdateJohnHashcat({ wordlist: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1"
                />
              </div>
              <div className="security-readout">
                <span>RULES</span>
                <input
                  type="text"
                  value={state.johnHashcat.config.rules}
                  onChange={(e) => onUpdateJohnHashcat({ rules: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1"
                />
              </div>
              <div className="security-readout">
                <span>THREADS / WORKERS</span>
                <input
                  type="number"
                  value={state.johnHashcat.config.threads}
                  onChange={(e) => onUpdateJohnHashcat({ threads: Number(e.target.value) })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1"
                />
              </div>
            </div>

            <div className="security-readout">
              <span>TARGET HASH</span>
              <input
                type="text"
                value={state.johnHashcat.config.targetHash}
                readOnly
                className="mt-1 w-full bg-slate-900 text-cyan-300 border border-emerald-400/30 p-1 text-[11px]"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              <div className="security-readout">
                <span>CANDIDATES TESTED</span>
                <strong>{state.johnHashcat.state.candidatesTested.toLocaleString()}</strong>
              </div>
              <div className="security-readout">
                <span>CRACKING RATE</span>
                <strong className="text-emerald-400">{state.johnHashcat.state.hashRate.toLocaleString()} H/s</strong>
              </div>
              <div className="security-readout">
                <span>ETA (SIMULATED)</span>
                <strong>{isRunning ? "< 5s" : "0s"}</strong>
              </div>
              <div className="security-readout">
                <span>RECOVERED PLAINTEXT</span>
                <strong className={state.johnHashcat.state.matchedResult ? "text-emerald-300" : "text-slate-500"}>
                  {state.johnHashcat.state.matchedResult || "RECOVERING..."}
                </strong>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>JOHN / HASHCAT WORKSTATION PROGRESS</span>
                <span>{state.johnHashcat.state.progress}%</span>
              </div>
              <div className="security-meter">
                <span style={{ width: `${state.johnHashcat.state.progress}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* MEDUSA / HYDRA WORKSPACE */}
        {state.category === "credentials" && state.activeOpId === "medusa-hydra" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="security-readout">
                <span>TARGET</span>
                <input
                  type="text"
                  value={state.medusaHydra.config.target}
                  onChange={(e) => onUpdateMedusaHydra({ target: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1"
                />
              </div>
              <div className="security-readout">
                <span>MODULE</span>
                <input
                  type="text"
                  value={state.medusaHydra.config.module}
                  onChange={(e) => onUpdateMedusaHydra({ module: e.target.value as "ssh" | "https" | "ftp" | "smb" })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 uppercase"
                />
              </div>
              <div className="security-readout">
                <span>USER LIST</span>
                <input
                  type="text"
                  value={state.medusaHydra.config.userList}
                  onChange={(e) => onUpdateMedusaHydra({ userList: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1"
                />
              </div>
              <div className="security-readout">
                <span>WORKERS</span>
                <input
                  type="number"
                  value={state.medusaHydra.config.workers}
                  onChange={(e) => onUpdateMedusaHydra({ workers: Number(e.target.value) })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1"
                />
              </div>
            </div>

            {/* Worker Activities Stream */}
            <div className="grid gap-3 sm:grid-cols-4">
              {state.medusaHydra.state.workerActivities.map((w) => (
                <div key={w.id} className="security-readout">
                  <div className="flex justify-between items-center">
                    <span>WORKER {String(w.id).padStart(2, "0")}</span>
                    <strong className="text-[10px] text-cyan-300">{w.user}</strong>
                  </div>
                  <strong className={w.status === "SUCCESS" ? "text-emerald-300" : w.status === "LOCKOUT" ? "text-amber-400" : "text-emerald-400"}>
                    {w.status}
                  </strong>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="security-meter flex-1">
                      <span style={{ width: `${w.progress}%` }} />
                    </div>
                    <small className="text-[9px]">{w.progress}%</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="security-readout">
                <span>PARALLEL ATTEMPTS</span>
                <strong>{state.medusaHydra.state.totalAttempts.toLocaleString()}</strong>
              </div>
              <div className="security-readout">
                <span>ATTEMPT RATE</span>
                <strong className="text-cyan-300">{state.medusaHydra.state.attemptsPerSec} / sec</strong>
              </div>
              <div className="security-readout">
                <span>MATCH DISCOVERED</span>
                <strong className={state.medusaHydra.state.matchedPair ? "text-emerald-300" : "text-slate-500"}>
                  {state.medusaHydra.state.matchedPair
                    ? `${state.medusaHydra.state.matchedPair.user}:${state.medusaHydra.state.matchedPair.pass}`
                    : "TESTING..."}
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* NETWORK PACKET LAB WORKSPACE */}
        {state.category === "network" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1">
                {(["ALL", "TCP", "UDP", "HTTP", "HTTPS", "DNS", "SSH", "TLS", "ICMP"] as const).map((proto) => (
                  <button
                    key={proto}
                    type="button"
                    onClick={() => onFilterPackets(proto)}
                    className={`security-filter ${state.packetLab.filter === proto ? "is-active" : ""}`}
                  >
                    {proto}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-400">SYNTHETIC PACKET STREAM {"//"} WIRESHARK INSPECTOR</span>
            </div>

            {/* Packet Table Stream */}
            <div className="max-h-[180px] overflow-x-auto overflow-y-auto border border-emerald-400/15 bg-black/70">
              <table className="security-packet-table">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>TIME</th>
                    <th>SOURCE</th>
                    <th>DESTINATION</th>
                    <th>PROTOCOL</th>
                    <th>LENGTH</th>
                    <th>INFO</th>
                  </tr>
                </thead>
                <tbody>
                  {state.packets
                    .filter((p) => state.packetLab.filter === "ALL" || p.protocol === state.packetLab.filter)
                    .map((pkt) => (
                      <tr
                        key={pkt.id}
                        onClick={() => onSelectPacket(pkt.id)}
                        className={`cursor-pointer ${state.packetLab.selectedPacketId === pkt.id ? "is-selected" : ""}`}
                      >
                        <td>{pkt.id}</td>
                        <td className="text-slate-500">{pkt.timestamp}</td>
                        <td>{pkt.source}</td>
                        <td>{pkt.destination}</td>
                        <td className="text-cyan-300">{pkt.protocol}</td>
                        <td>{pkt.length}</td>
                        <td className="truncate max-w-[220px]">{pkt.info}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Packet Inspector Panel */}
            {state.packets.find((p) => p.id === state.packetLab.selectedPacketId) && (
              <div className="border border-emerald-400/20 bg-slate-950/80 p-3 space-y-2">
                <div className="text-[10px] font-bold text-emerald-300">
                  FRAME INSPECTION PANEL {"//"} PACKET {state.packetLab.selectedPacketId}
                </div>
                <div className="flex flex-wrap gap-2 text-[10px]">
                  {state.packets
                    .find((p) => p.id === state.packetLab.selectedPacketId)
                    ?.layers.map((layer) => (
                      <span key={layer} className="border border-cyan-400/30 px-2 py-0.5 text-cyan-300 bg-cyan-950/30">
                        {layer}
                      </span>
                    ))}
                </div>
                <div className="bg-black/80 p-2.5 font-mono text-[11px] text-emerald-400/90 break-all border border-emerald-400/10">
                  {state.packets.find((p) => p.id === state.packetLab.selectedPacketId)?.payload}
                </div>
              </div>
            )}
          </div>
        )}

        {/* WEB SECURITY LAB WORKSPACE */}
        {state.category === "web" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex flex-wrap gap-2">
              {(["SQL INJECTION", "XSS", "AUTHENTICATION", "JWT", "HEADERS", "REQUEST INTERCEPTION"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onUpdateWebLab({ category: cat })}
                  className={`px-3 py-1.5 text-[10px] border transition ${
                    state.webLab.category === cat
                      ? "border-emerald-400 text-emerald-300 bg-emerald-950/40 font-bold"
                      : "border-slate-800 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="security-readout sm:col-span-2">
                <span>SIMULATED TARGET URL</span>
                <input
                  type="text"
                  value={state.webLab.targetUrl}
                  readOnly
                  className="mt-1 w-full bg-slate-900 text-cyan-300 border border-emerald-400/30 p-1 text-xs"
                />
              </div>
              <div className="security-readout">
                <span>INTERCEPT STATE</span>
                <strong className={state.webLab.intercepted ? "text-amber-300" : "text-emerald-400"}>
                  {state.webLab.intercepted ? "REQUEST INTERCEPTED" : "FORWARDING PASS-THROUGH"}
                </strong>
              </div>
            </div>

            <div className="security-readout">
              <span>TEST PAYLOAD</span>
              <input
                type="text"
                value={state.webLab.payload}
                onChange={(e) => onUpdateWebLab({ payload: e.target.value })}
                className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1.5 text-xs outline-none"
              />
            </div>

            {/* Response & Findings */}
            {state.webLab.lastResponse && (
              <div className="border border-emerald-400/20 bg-black/80 p-3 space-y-2">
                <div className="flex justify-between text-[10px] text-cyan-300 font-bold">
                  <span>RESPONSE HTTP {state.webLab.lastResponse.status} OK</span>
                  <span>nginx/1.24 (snow-lab)</span>
                </div>
                <div className="bg-slate-950 p-2 text-[11px] text-emerald-400 break-all font-mono">
                  {state.webLab.lastResponse.body}
                </div>
                <div className="text-[10px] text-amber-300">
                  <strong>SECURITY FINDING:</strong> {state.webLab.lastResponse.finding}
                </div>
                <div className="text-[10px] text-emerald-400">
                  <strong>REMEDIATION HINT:</strong> {state.webLab.lastResponse.remediation}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SNOWPLOIT EXPLOITATION WORKSPACE */}
        {state.category === "exploitation" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="security-readout">
                <span>SELECTED MODULE</span>
                <strong className="text-cyan-300">{state.snowploit.selectedModule}</strong>
              </div>
              <div className="security-readout">
                <span>TARGET NODE</span>
                <strong className="text-emerald-300">{state.snowploit.target}</strong>
              </div>
              <div className="security-readout">
                <span>ACTIVE SESSION</span>
                <strong className={state.snowploit.activeSession ? "text-emerald-400" : "text-slate-500"}>
                  {state.snowploit.activeSession || "NO ACTIVE SESSIONS"}
                </strong>
              </div>
            </div>

            {/* Console Log Terminal Output */}
            <div className="border border-emerald-400/20 bg-black/90 p-3 max-h-[140px] overflow-y-auto space-y-1 font-mono text-[11px] text-emerald-400">
              {state.snowploit.consoleLogs.map((log, i) => (
                <div key={i} className="whitespace-pre-wrap">{log}</div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["check", "exploit", "vuln scan", "target list"].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => onExecuteSnowploit(cmd)}
                  className="px-3 py-1.5 text-[10px] border border-cyan-400/30 text-cyan-300 bg-cyan-950/20 hover:bg-cyan-900/40"
                >
                  snowploit &gt; {cmd}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FORENSICS WORKSPACE */}
        {state.category === "forensics" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400">ARTIFACT EVIDENCE LOGS</span>
                <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                  {state.forensics.artifacts.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => onSelectForensicArtifact(art.id)}
                      className={`w-full text-left p-2 border text-[11px] transition ${
                        state.forensics.selectedArtifactId === art.id
                          ? "border-emerald-400 bg-emerald-950/40 text-emerald-200"
                          : "border-emerald-400/10 bg-black/40 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex justify-between text-[9px] text-slate-500">
                        <span>{art.timestamp}</span>
                        <span className={art.flagged ? "text-red-400 font-bold" : "text-emerald-500"}>
                          {art.artifactType}
                        </span>
                      </div>
                      <div className="font-semibold text-slate-200 truncate">{art.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Forensic Details */}
              {getSelectedArtifact(state) && (
                <div className="security-readout space-y-2">
                  <span className="text-cyan-300 font-bold">ANALYSIS FINDINGS {"//"} {getSelectedArtifact(state)?.id}</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {getSelectedArtifact(state)?.description}
                  </p>
                  <div className="border-t border-emerald-400/15 pt-2 text-emerald-400 text-[10px]">
                    <strong>INTERPRETATION:</strong> {getSelectedArtifact(state)?.analysis}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MISSIONS WORKSPACE */}
        {state.category === "missions" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-emerald-400/15 pb-2">
              <div>
                <h3 className="text-sm font-bold text-emerald-300">{state.mission.title} {"//"} CYBER RANGE</h3>
                <p className="text-[10px] text-slate-400">Complete stages by executing operations in the workstation.</p>
              </div>
              <span className="text-cyan-300 font-bold text-[11px]">
                {state.mission.stages.filter((s) => s.status === "complete").length} / {state.mission.stages.length} COMPLETE
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {state.mission.stages.map((stage) => (
                <div
                  key={stage.id}
                  className={`p-2.5 border text-xs flex items-center justify-between ${
                    stage.status === "complete"
                      ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-300"
                      : stage.status === "in-progress"
                      ? "border-cyan-500/40 bg-cyan-950/30 text-cyan-200"
                      : "border-slate-800 bg-black/40 text-slate-600"
                  }`}
                >
                  <div>
                    <strong className="block text-[11px]">{stage.label}</strong>
                    <span className="text-[9px] text-slate-400">{stage.description}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase">{stage.status}</span>
                </div>
              ))}
            </div>

            {state.mission.stages.every((s) => s.status === "complete") && (
              <div className="p-3 border border-emerald-400 bg-emerald-950/50 text-center font-bold text-emerald-300">
                MISSION ACCOMPLISHED {"//"} FLAG: {state.mission.flag}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Universal Operation Control Buttons (RUN / PAUSE / RESUME / STOP / RESET) */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-emerald-400/15 pt-4">
        {!isRunning && !isPaused && (
          <button
            type="button"
            onClick={onRunOperation}
            className="border border-emerald-400 bg-emerald-500/20 px-5 py-2 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-400 hover:text-black transition"
          >
            ▶ RUN OPERATION
          </button>
        )}

        {isRunning && (
          <button
            type="button"
            onClick={onPauseOperation}
            className="border border-amber-400 bg-amber-500/20 px-5 py-2 font-mono text-xs font-bold text-amber-300 hover:bg-amber-400 hover:text-black transition"
          >
            ⏸ PAUSE
          </button>
        )}

        {isPaused && (
          <button
            type="button"
            onClick={onResumeOperation}
            className="border border-cyan-400 bg-cyan-500/20 px-5 py-2 font-mono text-xs font-bold text-cyan-300 hover:bg-cyan-400 hover:text-black transition"
          >
            ▶ RESUME
          </button>
        )}

        {(isRunning || isPaused) && (
          <button
            type="button"
            onClick={onStopOperation}
            className="border border-red-500 bg-red-500/20 px-5 py-2 font-mono text-xs font-bold text-red-300 hover:bg-red-500 hover:text-white transition"
          >
            ⏹ STOP
          </button>
        )}

        <button
          type="button"
          onClick={onResetOperation}
          className="border border-slate-700 bg-slate-900/80 px-4 py-2 font-mono text-xs text-slate-300 hover:border-slate-500 hover:text-white transition ml-auto"
        >
          🔄 RESET STATE
        </button>
      </div>
    </section>
  );
}

function getActiveOpStatus(state: SecuritySimulationState): { status: OperationStatus } {
  if (state.category === "recon") return { status: state.recon.state.status };
  if (state.category === "credentials") {
    if (state.activeOpId === "john-hashcat") return { status: state.johnHashcat.state.status };
    if (state.activeOpId === "medusa-hydra") return { status: state.medusaHydra.state.status };
    return { status: state.bruteForce.state.status };
  }
  return { status: "idle" };
}

function getSelectedArtifact(state: SecuritySimulationState): ForensicsArtifact | undefined {
  return state.forensics.artifacts.find((a) => a.id === state.forensics.selectedArtifactId);
}
