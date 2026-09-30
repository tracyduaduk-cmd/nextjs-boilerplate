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
  onMode: (mode: "red" | "blue") => void;
}

const CATEGORY_NAMES: Array<{ id: OperationCategory; label: string; count: number }> = [
  { id: "recon", label: "RECON", count: 1 },
  { id: "credentials", label: "CREDENTIALS", count: 3 },
  { id: "network", label: "NETWORK", count: 1 },
  { id: "web", label: "WEB", count: 1 },
  { id: "exploitation", label: "EXPLOITATION", count: 1 },
  { id: "forensics", label: "FORENSICS", count: 1 },
  { id: "missions", label: "MISSIONS", count: 1 },
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
  onUpdateRecon,
  onSelectPacket,
  onFilterPackets,
  onUpdateWebLab,
  onExecuteSnowploit,
  onSelectForensicArtifact,
  onMode,
}: SecurityOperationPanelProps) {
  const currentOp = getActiveOpStatus(state);
  const isRunning = currentOp.status === "running";
  const isPaused = currentOp.status === "paused";

  return (
    <section className="security-panel rounded-none border border-emerald-400/20 bg-[#040f11]/90 p-4 sm:p-6">
      {/* Top Bar: Red Team / Blue Team & Operation Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-400/15 pb-4">
        <div>
          <p className="security-kicker">OPERATOR CONTROL STATION</p>
          <h2 className="text-lg font-mono font-bold text-slate-100 tracking-wider">
            {state.category.toUpperCase()} {"//"} WORKSTATION SUITE
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex border border-emerald-400/30 font-mono text-[10px]">
            <button
              type="button"
              onClick={() => onMode("red")}
              className={`px-3 py-1.5 font-semibold transition ${
                state.mode === "red" ? "bg-red-500/20 text-red-300 border-r border-red-500/40" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              RED TEAM
            </button>
            <button
              type="button"
              onClick={() => onMode("blue")}
              className={`px-3 py-1.5 font-semibold transition ${
                state.mode === "blue" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              BLUE TEAM
            </button>
          </div>

          <span className="font-mono text-[10px] uppercase border border-emerald-400/20 px-2.5 py-1 text-emerald-300/80 bg-emerald-950/30">
            STATUS: <strong className={isRunning ? "text-emerald-400 animate-pulse" : "text-amber-300"}>{currentOp.status.toUpperCase()}</strong>
          </span>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="mt-4 flex flex-wrap gap-1 border-b border-emerald-400/15 pb-2">
        {CATEGORY_NAMES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-2 font-mono text-[11px] font-bold tracking-wider transition ${
              state.category === cat.id
                ? "border-b-2 border-emerald-400 text-emerald-300 bg-emerald-400/10"
                : "text-slate-400 hover:text-slate-200 hover:bg-emerald-950/20"
            }`}
          >
            {cat.label} [{cat.count}]
          </button>
        ))}
      </div>

      {/* Sub-Operation Selection (e.g., Credentials sub-tools) */}
      {state.category === "credentials" && (
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { id: "brute-force", label: "Brute Force Auth Engine" },
            { id: "john-hashcat", label: "John / Hashcat Cracker" },
            { id: "medusa-hydra", label: "Medusa / Hydra Parallel Tester" },
          ].map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => onSelectOp(sub.id)}
              className={`px-2.5 py-1 font-mono text-[10px] border transition ${
                state.activeOpId === sub.id
                  ? "border-cyan-400 text-cyan-300 bg-cyan-950/40"
                  : "border-slate-800 text-slate-400 hover:border-slate-600"
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Operation Execution & Control Workspace */}
      <div className="mt-6">
        {/* RECON WORKSPACE */}
        {state.category === "recon" && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3 font-mono text-xs">
              <div className="security-readout">
                <span>TARGET SCOPE</span>
                <strong className="text-cyan-300">{state.recon.config.target}</strong>
              </div>
              <div className="security-readout">
                <span>SCAN TYPE</span>
                <select
                  value={state.recon.config.scanType}
                  onChange={(e) => onUpdateRecon({ scanType: e.target.value as ReconConfig["scanType"] })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 font-mono text-xs outline-none"
                >
                  <option value="Host Discovery">Host Discovery</option>
                  <option value="Port Scan">Port Scan</option>
                  <option value="Service Detection">Service Detection</option>
                  <option value="Deep Recon">Deep Recon</option>
                </select>
              </div>
              <div className="security-readout">
                <span>TIMING TEMPLATE</span>
                <select
                  value={state.recon.config.timing}
                  onChange={(e) => onUpdateRecon({ timing: e.target.value as ReconConfig["timing"] })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 font-mono text-xs outline-none"
                >
                  <option value="Quiet">Quiet (T1 / Stealth)</option>
                  <option value="Normal">Normal (T3)</option>
                  <option value="Aggressive">Aggressive (T4)</option>
                </select>
              </div>
            </div>

            {/* Scan Execution Metrics */}
            <div className="grid gap-3 sm:grid-cols-4 font-mono text-xs">
              <div className="security-readout">
                <span>PHASE</span>
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

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>NMAP RECON ENGINE PROGRESS</span>
                <span>{state.recon.state.progress}%</span>
              </div>
              <div className="security-meter">
                <span style={{ width: `${state.recon.state.progress}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* BRUTE FORCE WORKSPACE */}
        {state.category === "credentials" && state.activeOpId === "brute-force" && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-4 font-mono text-xs">
              <div className="security-readout">
                <span>TARGET NODE</span>
                <select
                  value={state.bruteForce.config.target}
                  onChange={(e) => onUpdateBruteForce({ target: e.target.value })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs"
                >
                  <option value="SNOW-AUTH-01">SNOW-AUTH-01 (10.42.0.14)</option>
                  <option value="SNOW-WEB-01">SNOW-WEB-01 (10.42.0.10)</option>
                  <option value="SNOW-GW-01">SNOW-GW-01 (10.42.0.1)</option>
                </select>
              </div>
              <div className="security-readout">
                <span>PROTOCOL</span>
                <select
                  value={state.bruteForce.config.protocol}
                  onChange={(e) => onUpdateBruteForce({ protocol: e.target.value as BruteForceConfig["protocol"] })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs"
                >
                  <option value="SSH">SSH (Port 22)</option>
                  <option value="HTTP">HTTP (Port 80/443)</option>
                  <option value="FTP">FTP (Port 21)</option>
                  <option value="SMTP">SMTP (Port 25)</option>
                </select>
              </div>
              <div className="security-readout">
                <span>TARGET USERNAME</span>
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
                <select
                  value={state.bruteForce.config.wordlist}
                  onChange={(e) => onUpdateBruteForce({ wordlist: e.target.value as BruteForceConfig["wordlist"] })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1 text-xs"
                >
                  <option value="Snow Common">Snow Common (10,000)</option>
                  <option value="Top 1000">Top 1000 Passwords</option>
                  <option value="Custom Snow Dictionary">Custom Snow Dictionary</option>
                </select>
              </div>
            </div>

            {/* Live Progress & Metrics */}
            <div className="grid gap-3 sm:grid-cols-4 font-mono text-xs">
              <div className="security-readout">
                <span>ATTEMPTS</span>
                <strong className="text-cyan-300">{state.bruteForce.state.attempts.toLocaleString()}</strong>
              </div>
              <div className="security-readout">
                <span>ATTEMPTS / SEC</span>
                <strong className="text-emerald-400">{state.bruteForce.state.attemptsPerSec} req/s</strong>
              </div>
              <div className="security-readout">
                <span>TESTING CANDIDATE</span>
                <strong className="text-amber-300 truncate">{state.bruteForce.state.currentCandidate}</strong>
              </div>
              <div className="security-readout">
                <span>RESULT</span>
                <strong className={state.bruteForce.state.matchFound ? "text-emerald-300" : "text-slate-400"}>
                  {state.bruteForce.state.matchFound
                    ? `MATCH: ${state.bruteForce.state.matchedCredential}`
                    : state.bruteForce.state.status === "stopped"
                    ? "STOPPED"
                    : "TESTING..."}
                </strong>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>BRUTE FORCE ENGINE PROGRESS</span>
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
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="security-readout">
                <span>ALGORITHM</span>
                <select
                  value={state.johnHashcat.config.hashType}
                  onChange={(e) => onUpdateJohnHashcat({ hashType: e.target.value as JohnHashcatConfig["hashType"] })}
                  disabled={isRunning}
                  className="mt-1 w-full bg-slate-900 text-emerald-300 border border-emerald-400/30 p-1"
                >
                  <option value="SHA-256">SHA-256</option>
                  <option value="MD5">MD5</option>
                  <option value="Bcrypt-Sim">Bcrypt (Simulated)</option>
                </select>
              </div>
              <div className="security-readout sm:col-span-2">
                <span>TARGET HASH</span>
                <input
                  type="text"
                  value={state.johnHashcat.config.targetHash}
                  readOnly
                  className="mt-1 w-full bg-slate-900 text-cyan-300 border border-emerald-400/30 p-1 text-[11px]"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              <div className="security-readout">
                <span>CANDIDATES TESTED</span>
                <strong>{state.johnHashcat.state.candidatesTested.toLocaleString()}</strong>
              </div>
              <div className="security-readout">
                <span>HASH RATE</span>
                <strong className="text-emerald-400">{state.johnHashcat.state.hashRate.toLocaleString()} H/s</strong>
              </div>
              <div className="security-readout">
                <span>THREADS</span>
                <strong>{state.johnHashcat.config.threads} Workers</strong>
              </div>
              <div className="security-readout">
                <span>RECOVERED PLAINTEXT</span>
                <strong className={state.johnHashcat.state.matchedResult ? "text-emerald-300" : "text-slate-500"}>
                  {state.johnHashcat.state.matchedResult || "RECOVERING..."}
                </strong>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>HASHCAT GPU ACCELERATION STREAM</span>
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
            <div className="grid gap-3 sm:grid-cols-4">
              {state.medusaHydra.state.workerProgress.map((p, i) => (
                <div key={i} className="security-readout">
                  <span>WORKER-{String(i + 1).padStart(2, "0")}</span>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="security-meter flex-1">
                      <span style={{ width: `${p}%` }} />
                    </div>
                    <strong className="text-[10px]">{p}%</strong>
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
                <span>FOUND PAIR</span>
                <strong className={state.medusaHydra.state.matchedPair ? "text-emerald-300" : "text-slate-500"}>
                  {state.medusaHydra.state.matchedPair
                    ? `${state.medusaHydra.state.matchedPair.user}:${state.medusaHydra.state.matchedPair.pass}`
                    : "AUTHENTICATING..."}
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
                {(["ALL", "TCP", "UDP", "HTTP", "HTTPS", "DNS", "SSH", "TLS"] as const).map((proto) => (
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
              <span className="text-[10px] text-slate-400">SYNTHETIC CAPTURE ENGINE {"//"} NO HARDWARE INTERACTION</span>
            </div>

            {/* Packet Table Stream */}
            <div className="max-h-[160px] overflow-x-auto overflow-y-auto border border-emerald-400/15 bg-black/60">
              <table className="security-packet-table">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>TIME</th>
                    <th>SOURCE</th>
                    <th>DEST</th>
                    <th>PROTO</th>
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
                        <td className="truncate max-w-[200px]">{pkt.info}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Packet Inspector Panel */}
            {state.packets.find((p) => p.id === state.packetLab.selectedPacketId) && (
              <div className="border border-emerald-400/20 bg-slate-950/80 p-3 space-y-2">
                <div className="text-[10px] font-bold text-emerald-300">
                  PACKET FRAME INSPECTOR {"//"} {state.packetLab.selectedPacketId}
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
                <div className="bg-black/80 p-2 font-mono text-[11px] text-emerald-400/90 break-all border border-emerald-400/10">
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
                  className={`px-2.5 py-1 text-[10px] border transition ${
                    state.webLab.category === cat
                      ? "border-emerald-400 text-emerald-300 bg-emerald-950/40"
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

            <div className="flex flex-wrap gap-2">
              {["check", "exploit", "sessions", "use exploit/web/demo-auth-bypass", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => onExecuteSnowploit(cmd)}
                  className="px-2.5 py-1 text-[10px] border border-cyan-400/30 text-cyan-300 bg-cyan-950/20 hover:bg-cyan-900/40"
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
                <p className="text-[10px] text-slate-400">Complete stages by interacting with simulation tooling.</p>
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
