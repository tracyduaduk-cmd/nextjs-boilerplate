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
  onSelectMission?: (missionId: string) => void;
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
  { id: "recon", label: "RECON", count: 1, desc: "Range & Service Discovery" },
  { id: "credentials", label: "CREDENTIALS", count: 3, desc: "Brute Force & Hash Cracking" },
  { id: "network", label: "NETWORK", count: 1, desc: "Wireshark Packet Inspector" },
  { id: "web", label: "WEB", count: 1, desc: "Application Security Sandbox" },
  { id: "exploitation", label: "EXPLOITATION", count: 1, desc: "Snowploit Framework" },
  { id: "forensics", label: "FORENSICS", count: 1, desc: "Evidence & Memory Inspector" },
  { id: "missions", label: "MISSIONS", count: 4, desc: "Cinematic Cyber Range" },
];

export function SecurityOperationPanel({
  state,
  onSelectCategory,
  onSelectOp,
  onSelectMission,
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

  const activeMission = state.missions.find((m) => m.id === state.activeMissionId) || state.missions[0];

  return (
    <section className="security-op-panel border border-emerald-400/20 bg-[#040f11]/90 p-4 sm:p-6" id="operations">
      {/* Category Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-400/20 pb-4">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {CATEGORY_NAMES.map((cat) => {
            const isActive = state.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                data-category={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative px-3 py-1.5 transition font-bold ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span>{cat.label}</span>
                <small className="ml-1.5 text-[9px] opacity-60">({cat.count})</small>
              </button>
            );
          })}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase">
          <span className="text-slate-400">OPERATION STATUS:</span>
          <span
            className={`font-bold px-2 py-0.5 border ${
              currentOp.status === "running"
                ? "border-emerald-400 bg-emerald-950 text-emerald-300 animate-pulse"
                : currentOp.status === "paused"
                ? "border-amber-400 bg-amber-950 text-amber-300"
                : currentOp.status === "success"
                ? "border-cyan-400 bg-cyan-950 text-cyan-300"
                : "border-slate-700 bg-slate-900 text-slate-400"
            }`}
          >
            {currentOp.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Active Workspace Content */}
      <div className="mt-6">
        {/* RECON WORKSPACE */}
        {state.category === "recon" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase block">Target Network Range</label>
                <input
                  type="text"
                  value={state.recon.config.target}
                  onChange={(e) => onUpdateRecon({ target: e.target.value })}
                  disabled={isRunning}
                  className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase block">Scan Profile</label>
                <select
                  value={state.recon.config.scanType}
                  onChange={(e) => onUpdateRecon({ scanType: e.target.value })}
                  disabled={isRunning}
                  className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-400"
                >
                  <option value="Range Service Discovery">Range Service Discovery (-sV -O)</option>
                  <option value="Fast SYN Stealth Scan">Fast SYN Stealth Scan (-sS -F)</option>
                  <option value="Aggressive Range Audit">Aggressive Range Audit (-A -T4)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase block">Timing Template</label>
                <select
                  value={state.recon.config.timing}
                  onChange={(e) => onUpdateRecon({ timing: e.target.value })}
                  disabled={isRunning}
                  className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-400"
                >
                  <option value="T3 Normal">T3 Normal (Default)</option>
                  <option value="T4 Aggressive">T4 Aggressive</option>
                  <option value="T2 Polite">T2 Polite</option>
                </select>
              </div>
            </div>

            {/* Scan Telemetry Readout */}
            <div className="grid gap-3 sm:grid-cols-4 pt-2">
              <div className="security-readout">
                <span>PHASE</span>
                <strong className="text-cyan-300">{state.recon.state.currentPhase}</strong>
              </div>
              <div className="security-readout">
                <span>PROGRESS</span>
                <strong className="text-emerald-300">{state.recon.state.progress}%</strong>
              </div>
              <div className="security-readout">
                <span>HOSTS DISCOVERED</span>
                <strong className="text-amber-300">{state.recon.state.hostsFound} / 5 NODES</strong>
              </div>
              <div className="security-readout">
                <span>PORTS ENUMERATED</span>
                <strong className="text-slate-300">{state.recon.state.portsScanned} PORTS</strong>
              </div>
            </div>

            {/* Terminal Live Output Stream */}
            <div className="border border-emerald-400/20 bg-black/90 p-3 max-h-[140px] overflow-y-auto font-mono text-[11px] text-emerald-400 space-y-1">
              {state.recon.state.terminalLogs.length === 0 ? (
                <div className="text-slate-500 italic">Ready to initiate range reconnaissance scan...</div>
              ) : (
                state.recon.state.terminalLogs.map((log, idx) => <div key={idx}>{log}</div>)
              )}
            </div>
          </div>
        )}

        {/* CREDENTIALS WORKSPACE */}
        {state.category === "credentials" && (
          <div className="space-y-4 font-mono text-xs">
            {/* Op Selector Sub-tabs */}
            <div className="flex gap-2 border-b border-emerald-400/15 pb-3">
              {[
                { id: "brute-force", label: "Brute Force Auth Engine" },
                { id: "john-hashcat", label: "John / Hashcat Cracker" },
                { id: "medusa-hydra", label: "Medusa / Hydra Parallel" },
              ].map((op) => (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => onSelectOp(op.id)}
                  className={`px-3 py-1 text-[11px] font-bold transition ${
                    state.activeOpId === op.id
                      ? "bg-emerald-500/20 text-emerald-300 border-b-2 border-emerald-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>

            {/* Brute Force Sub-Panel */}
            {state.activeOpId === "brute-force" && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Target Host</label>
                    <input
                      type="text"
                      value={state.bruteForce.config.target}
                      onChange={(e) => onUpdateBruteForce({ target: e.target.value })}
                      disabled={isRunning}
                      className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Target User</label>
                    <input
                      type="text"
                      value={state.bruteForce.config.username}
                      onChange={(e) => onUpdateBruteForce({ username: e.target.value })}
                      disabled={isRunning}
                      className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Wordlist</label>
                    <select
                      value={state.bruteForce.config.wordlist}
                      onChange={(e) => onUpdateBruteForce({ wordlist: e.target.value })}
                      disabled={isRunning}
                      className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs"
                    >
                      <option value="snow-common.txt">snow-common.txt (2,700 words)</option>
                      <option value="rockyou-subset.txt">rockyou-subset.txt (10,000 words)</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-4">
                  <div className="security-readout">
                    <span>ATTEMPTS</span>
                    <strong className="text-cyan-300">{state.bruteForce.state.attempts}</strong>
                  </div>
                  <div className="security-readout">
                    <span>RATE</span>
                    <strong className="text-emerald-300">{state.bruteForce.state.attemptsPerSec} /s</strong>
                  </div>
                  <div className="security-readout">
                    <span>CURRENT CANDIDATE</span>
                    <strong className="text-amber-300 truncate">{state.bruteForce.state.currentCandidate}</strong>
                  </div>
                  <div className="security-readout">
                    <span>MATCH STATUS</span>
                    <strong className={state.bruteForce.state.matchFound ? "text-emerald-400 font-bold" : "text-slate-400"}>
                      {state.bruteForce.state.matchFound ? "MATCH DISCOVERED" : "TESTING..."}
                    </strong>
                  </div>
                </div>

                {state.bruteForce.state.matchedCredential && (
                  <div className="p-3 border border-emerald-400 bg-emerald-950/40 text-emerald-300 font-bold text-center">
                    CREDENTIAL MATCH FOUND: {state.bruteForce.state.matchedCredential}
                  </div>
                )}
              </div>
            )}

            {/* John Hashcat Sub-Panel */}
            {state.activeOpId === "john-hashcat" && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Target Bcrypt Hash</label>
                    <input
                      type="text"
                      value={state.johnHashcat.config.targetHash}
                      onChange={(e) => onUpdateJohnHashcat({ targetHash: e.target.value })}
                      disabled={isRunning}
                      className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs truncate"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Ruleset</label>
                    <select
                      value={state.johnHashcat.config.rules}
                      onChange={(e) => onUpdateJohnHashcat({ rules: e.target.value })}
                      disabled={isRunning}
                      className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs"
                    >
                      <option value="best64">best64 (Standard Transformations)</option>
                      <option value="d3ad30">d3ad30 (Deep Rule Matrix)</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="security-readout">
                    <span>HASH RATE</span>
                    <strong className="text-cyan-300">{state.johnHashcat.state.hashRate.toLocaleString()} H/s</strong>
                  </div>
                  <div className="security-readout">
                    <span>PROGRESS</span>
                    <strong className="text-emerald-300">{state.johnHashcat.state.progress}%</strong>
                  </div>
                  <div className="security-readout">
                    <span>RECOVERED PLAINTEXT</span>
                    <strong className="text-amber-300">{state.johnHashcat.state.recoveredPassword || "---"}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Medusa Hydra Sub-Panel */}
            {state.activeOpId === "medusa-hydra" && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  {state.medusaHydra.state.workerActivities.map((w) => (
                    <div key={w.id} className="security-readout space-y-1">
                      <span className="text-[9px]">WORKER #{w.id} ({w.user})</span>
                      <strong className={w.status === "SUCCESS" ? "text-emerald-400" : "text-cyan-300"}>{w.status}</strong>
                      <div className="w-full bg-slate-900 h-1 mt-1 overflow-hidden">
                        <div className="bg-emerald-400 h-full transition-all" style={{ width: `${w.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* NETWORK PACKET LAB WORKSPACE */}
        {state.category === "network" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-emerald-400/15 pb-2">
              <span className="text-cyan-300 font-bold">SYNTHETIC PACKET STREAM</span>
              <div className="flex gap-2">
                {["ALL", "TCP", "SSH", "DNS", "HTTP"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => onFilterPackets(f)}
                    className={`px-2 py-0.5 text-[10px] border ${
                      state.packetLab.filter === f ? "border-cyan-400 bg-cyan-950 text-cyan-300" : "border-slate-800 text-slate-500"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1 max-h-[180px] overflow-y-auto pr-1">
                {state.packets
                  .filter((p) => state.packetLab.filter === "ALL" || p.protocol === state.packetLab.filter)
                  .map((pkt) => (
                    <button
                      key={pkt.id}
                      type="button"
                      onClick={() => onSelectPacket(pkt.id)}
                      className={`w-full text-left p-2 border text-[10px] flex justify-between items-center transition ${
                        state.packetLab.selectedPacketId === pkt.id
                          ? "border-emerald-400 bg-emerald-950/40 text-emerald-200"
                          : "border-slate-800 bg-black/40 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <div>
                        <strong className="text-white block">{pkt.timestamp} [{pkt.protocol}]</strong>
                        <span className="text-[9px] text-slate-400">{pkt.source} -&gt; {pkt.destination}</span>
                      </div>
                      <span className="text-[9px] text-emerald-400">{pkt.length}B</span>
                    </button>
                  ))}
              </div>

              {/* Packet Details */}
              {state.packets.find((p) => p.id === state.packetLab.selectedPacketId) && (
                <div className="security-readout space-y-2">
                  <span className="text-cyan-300 font-bold">FRAME LAYER INSPECTOR</span>
                  <div className="text-[10px] text-slate-300">
                    <strong>LAYERS:</strong> {state.packets.find((p) => p.id === state.packetLab.selectedPacketId)?.layers.join(" > ")}
                  </div>
                  <div className="text-[10px] text-emerald-300 break-all font-mono bg-slate-950 p-2 border border-emerald-400/20">
                    {state.packets.find((p) => p.id === state.packetLab.selectedPacketId)?.payload}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* WEB SECURITY WORKSPACE */}
        {state.category === "web" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase block">Target Web URL</label>
              <input
                type="text"
                value={state.webLab.targetUrl}
                onChange={(e) => onUpdateWebLab({ targetUrl: e.target.value })}
                className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase block">Payload Injection String</label>
              <input
                type="text"
                value={state.webLab.payload}
                onChange={(e) => onUpdateWebLab({ payload: e.target.value })}
                className="w-full bg-slate-950 border border-emerald-400/30 p-2 text-emerald-300 font-mono text-xs"
              />
            </div>

            {state.webLab.lastResponse && (
              <div className="border border-emerald-400/20 bg-black/80 p-3 space-y-2">
                <div className="flex justify-between text-[10px] text-cyan-300 font-bold">
                  <span>RESPONSE HTTP {state.webLab.lastResponse.status} OK</span>
                  <span>nginx/1.24 (snow-web)</span>
                </div>
                <div className="bg-slate-950 p-2 text-[11px] text-emerald-400 break-all font-mono">
                  {state.webLab.lastResponse.body}
                </div>
                <div className="text-[10px] text-amber-300">
                  <strong>SECURITY FINDING:</strong> {state.webLab.lastResponse.finding}
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
                <span>MODULE</span>
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

            <div className="border border-emerald-400/20 bg-black/90 p-3 max-h-[140px] overflow-y-auto space-y-1 font-mono text-[11px] text-emerald-400">
              {state.snowploit.consoleLogs.map((log, i) => (
                <div key={i} className="whitespace-pre-wrap">{log}</div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["check", "exploit", "extract", "vuln scan", "target list"].map((cmd) => (
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
            {/* Mission Selector Sub-tabs */}
            <div className="flex flex-wrap gap-2 border-b border-emerald-400/15 pb-3">
              {state.missions.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onSelectMission?.(m.id)}
                  className={`px-3 py-1.5 text-[11px] font-bold border transition ${
                    state.activeMissionId === m.id
                      ? "border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                      : "border-slate-800 bg-black/40 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {m.codename} <small className="text-[9px] opacity-70">({m.difficulty})</small>
                </button>
              ))}
            </div>

            {/* Selected Mission Header & Briefing */}
            <div className="border border-emerald-400/20 bg-emerald-950/20 p-3 space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-emerald-300">{activeMission.title} {"//"} CYBER RANGE</h3>
                <span className="text-cyan-300 font-bold text-[11px]">
                  {activeMission.stages.filter((s) => s.status === "complete").length} / {activeMission.stages.length} STAGES COMPLETE
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{activeMission.briefing}</p>
            </div>

            {/* Mission Stage List */}
            <div className="grid gap-2 sm:grid-cols-2">
              {activeMission.stages.map((stage) => (
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

            {activeMission.stages.every((s) => s.status === "complete") && (
              <div className="p-3 border border-emerald-400 bg-emerald-950/50 text-center font-bold text-emerald-300">
                MISSION ACCOMPLISHED {"//"} FLAG: {activeMission.flag}
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
