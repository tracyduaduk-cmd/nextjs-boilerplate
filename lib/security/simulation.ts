export type OperationCategory =
  | "recon"
  | "credentials"
  | "network"
  | "web"
  | "exploitation"
  | "forensics"
  | "missions";

export type OperationStatus =
  | "idle"
  | "configuring"
  | "queued"
  | "running"
  | "paused"
  | "success"
  | "failed"
  | "stopped";

export type SecurityMode = "red" | "blue";

export interface SecurityHost {
  id: string;
  hostname: string;
  address: string;
  role: string;
  status: "online" | "filtered" | "isolated" | "compromised" | "offline";
  x: number;
  y: number;
  discovered: boolean;
  services: Array<{
    port: number;
    protocol: string;
    service: string;
    version: string;
    state: "open" | "filtered" | "closed";
  }>;
}

export interface SecurityCredential {
  id: string;
  target: string;
  username: string;
  hashType: string;
  hash: string;
  status: "locked" | "cracking" | "cracked";
  recovered?: string;
  discovered: boolean;
}

export interface SecurityVulnerability {
  id: string;
  hostId: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  description: string;
  discovered: boolean;
}

export interface SecurityPacket {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  protocol: "TCP" | "UDP" | "HTTP" | "HTTPS" | "DNS" | "SSH" | "TLS" | "ICMP";
  port: number;
  length: number;
  info: string;
  payload: string;
  status: "observed" | "allowed" | "blocked";
  suspicious?: boolean;
  layers: string[];
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  type: string;
  severity: "critical" | "warning" | "info";
  source: string;
  target: string;
  rule: string;
  response: string;
  resolved: boolean;
}

export interface SecuritySession {
  id: string;
  target: string;
  module: string;
  privilege: "USER" | "ADMIN" | "ROOT";
  status: "active" | "closed";
  createdAt: string;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: "info" | "notice" | "warning" | "success" | "critical";
  source: string;
  message: string;
}

export interface MissionStage {
  id: string;
  label: string;
  description: string;
  status: "locked" | "in-progress" | "complete";
  requiredCategory?: OperationCategory;
}

export interface SecurityMission {
  id: string;
  codename: string;
  title: string;
  briefing: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  targetNetwork: string;
  flag: string;
  stages: MissionStage[];
  status: "available" | "active" | "completed";
}

export interface ForensicsArtifact {
  id: string;
  timestamp: string;
  artifactType: "LOG_ENTRY" | "MEMORY_DUMP" | "NETWORK_SOCKET" | "FILE_HASH" | "TRACE_EVIDENCE";
  title: string;
  description: string;
  analysis: string;
  flagged: boolean;
}

// Config & State interfaces for individual operations
export interface BruteForceConfig {
  target: string;
  service: string;
  protocol: string;
  username: string;
  wordlist: string;
  workers: number;
  mode: string;
  rateLimit: number;
}

export interface BruteForceState {
  status: OperationStatus;
  attempts: number;
  totalCandidates: number;
  attemptsPerSec: number;
  currentCandidate: string;
  matchFound: boolean;
  matchedCredential?: string;
  elapsedSec: number;
}

export interface JohnHashcatConfig {
  hashType: string;
  targetHash: string;
  mode: string;
  wordlist: string;
  rules: string;
  threads: number;
}

export interface JohnHashcatState {
  status: OperationStatus;
  candidatesTested: number;
  totalCandidates: number;
  hashRate: number;
  progress: number;
  matchedResult?: string;
  recoveredPassword?: string;
  elapsedSec: number;
}

export interface MedusaHydraConfig {
  target: string;
  service: string;
  module: string;
  userList: string;
  passList: string;
  workers: number;
  threads: number;
}

export interface MedusaHydraState {
  status: OperationStatus;
  workerProgress: [number, number, number, number];
  workerActivities: Array<{ id: number; user: string; status: string; progress: number }>;
  totalAttempts: number;
  attemptsPerSec: number;
  matchedPair?: { user: string; pass: string };
  elapsedSec: number;
}

export interface ReconConfig {
  target: string;
  command: string;
  scanType: string;
  timing: string;
}

export interface ReconState {
  status: OperationStatus;
  progress: number;
  currentPhase: string;
  hostsFound: number;
  portsScanned: number;
  elapsedSec: number;
  terminalLogs: string[];
}

export interface PacketLabState {
  isCapturing: boolean;
  filter: string;
  selectedPacketId?: string;
}

export interface WebLabState {
  category: string;
  targetUrl: string;
  method: string;
  payload: string;
  intercepted: boolean;
  lastResponse?: {
    status: number;
    headers: Record<string, string>;
    body: string;
    finding: string;
    remediation: string;
  };
}

export interface SnowploitState {
  selectedModule: string;
  target: string;
  commandHistory: string[];
  consoleLogs: string[];
  activeSession?: string;
}

export interface ForensicsState {
  artifacts: ForensicsArtifact[];
  selectedArtifactId?: string;
}

export interface SecuritySimulationState {
  mode: SecurityMode;
  category: OperationCategory;
  activeOpId: string;
  clock: number;
  selectedHostId?: string;
  selectedSessionId?: string;
  activeMissionId: string;
  missions: SecurityMission[];
  hosts: SecurityHost[];
  credentials: SecurityCredential[];
  vulnerabilities: SecurityVulnerability[];
  packets: SecurityPacket[];
  alerts: SecurityAlert[];
  sessions: SecuritySession[];
  events: SecurityEvent[];
  bruteForce: { config: BruteForceConfig; state: BruteForceState };
  johnHashcat: { config: JohnHashcatConfig; state: JohnHashcatState };
  medusaHydra: { config: MedusaHydraConfig; state: MedusaHydraState };
  recon: { config: ReconConfig; state: ReconState };
  packetLab: PacketLabState;
  webLab: WebLabState;
  snowploit: SnowploitState;
  forensics: ForensicsState;
}

// Canonical Cyber Range Targets (10.44.0.0/24)
export const INITIAL_HOSTS: SecurityHost[] = [
  {
    id: "host-edge",
    hostname: "EDGE-GATEWAY",
    address: "10.44.0.10",
    role: "Perimeter Router & Security Gateway",
    status: "online",
    x: 18,
    y: 22,
    discovered: true,
    services: [
      { port: 22, protocol: "TCP", service: "SSH", version: "OpenSSH 9.3p1", state: "open" },
      { port: 443, protocol: "TCP", service: "HTTPS", version: "nginx/1.24.0", state: "open" },
      { port: 53, protocol: "UDP", service: "DNS", version: "Unbound 1.19.0", state: "open" },
    ],
  },
  {
    id: "host-auth",
    hostname: "AUTH-SRV",
    address: "10.44.0.20",
    role: "Identity & Authentication Server",
    status: "online",
    x: 38,
    y: 42,
    discovered: false,
    services: [
      { port: 22, protocol: "TCP", service: "SSH", version: "OpenSSH 8.9p1", state: "open" },
      { port: 8443, protocol: "TCP", service: "AUTH-API", version: "SnowAuth/2.4", state: "open" },
    ],
  },
  {
    id: "host-web",
    hostname: "WEB-NODE",
    address: "10.44.0.30",
    role: "Application Server & Web Portal",
    status: "online",
    x: 58,
    y: 30,
    discovered: false,
    services: [
      { port: 443, protocol: "TCP", service: "HTTPS", version: "SnowWeb/1.8.2", state: "open" },
      { port: 8080, protocol: "TCP", service: "REST-API", version: "Node.js v20.11", state: "open" },
    ],
  },
  {
    id: "host-data",
    hostname: "DATA-NODE",
    address: "10.44.0.40",
    role: "Restricted Vault & Database Service",
    status: "online",
    x: 78,
    y: 55,
    discovered: false,
    services: [
      { port: 5432, protocol: "TCP", service: "PostgreSQL", version: "PostgreSQL 16.2", state: "filtered" },
      { port: 9000, protocol: "TCP", service: "INTERNAL-API", version: "SnowVault/3.0", state: "filtered" },
    ],
  },
  {
    id: "host-monitor",
    hostname: "MONITOR",
    address: "10.44.0.50",
    role: "IDS Sensor & Log Telemetry Collector",
    status: "online",
    x: 50,
    y: 75,
    discovered: false,
    services: [
      { port: 514, protocol: "UDP", service: "SYSLOG", version: "rsyslog 8.2310", state: "open" },
      { port: 9100, protocol: "TCP", service: "METRICS", version: "Prometheus Exporter", state: "open" },
    ],
  },
];

export const INITIAL_CREDENTIALS: SecurityCredential[] = [
  {
    id: "cred-01",
    target: "AUTH-SRV (10.44.0.20:22)",
    username: "operator",
    hashType: "bcrypt",
    hash: "$2b$12$e83b38c290a1841e0a29b0f49a184e1a0123456789abcdef",
    status: "locked",
    discovered: true,
  },
  {
    id: "cred-02",
    target: "WEB-NODE (10.44.0.30:443)",
    username: "admin",
    hashType: "sha256",
    hash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    status: "locked",
    discovered: false,
  },
];

export const INITIAL_VULNERABILITIES: SecurityVulnerability[] = [
  {
    id: "vuln-01",
    hostId: "host-web",
    title: "SQL Injection on Auth Endpoint",
    severity: "CRITICAL",
    description: "Parameter 'username' in POST /api/login allows arbitrary boolean SQL payload injection.",
    discovered: false,
  },
  {
    id: "vuln-02",
    hostId: "host-auth",
    title: "Weak Password Policy & Unthrottled SSH",
    severity: "HIGH",
    description: "SSH daemon permits password authentication without fail2ban rate limiting.",
    discovered: false,
  },
];

export const INITIAL_PACKETS: SecurityPacket[] = [
  {
    id: "pkt-001",
    timestamp: "10:00:01.120",
    source: "10.44.0.100",
    destination: "10.44.0.10",
    protocol: "DNS",
    port: 53,
    length: 74,
    info: "Standard query 0x1a2b A EDGE-GATEWAY.snow.local",
    payload: "0000 00 01 01 00 00 01 00 00 00 00 00 00 0c 45 44 47 45",
    status: "observed",
    layers: ["Ethernet II", "IPv4", "UDP", "DNS"],
  },
  {
    id: "pkt-002",
    timestamp: "10:00:01.125",
    source: "10.44.0.10",
    destination: "10.44.0.100",
    protocol: "DNS",
    port: 53,
    length: 90,
    info: "Standard query response 0x1a2b A 10.44.0.10",
    payload: "0000 00 01 81 80 00 01 00 01 00 00 00 00 0c 45 44 47 45",
    status: "allowed",
    layers: ["Ethernet II", "IPv4", "UDP", "DNS"],
  },
  {
    id: "pkt-003",
    timestamp: "10:00:02.400",
    source: "10.44.0.100",
    destination: "10.44.0.20",
    protocol: "SSH",
    port: 22,
    length: 118,
    info: "Client: SSH-2.0-OpenSSH_9.3p1 SnowLabTester",
    payload: "53 53 48 2d 32 2e 30 2d 4f 70 65 6e 53 53 48 5f 39 2e 33",
    status: "observed",
    layers: ["Ethernet II", "IPv4", "TCP", "SSH"],
  },
];

export function formatSimulationTimestamp(seconds: number): string {
  const base = new Date(2026, 2, 28, 10, 0, 0);
  base.setSeconds(base.getSeconds() + seconds);
  const h = String(base.getHours()).padStart(2, "0");
  const m = String(base.getMinutes()).padStart(2, "0");
  const s = String(base.getSeconds()).padStart(2, "0");
  const ms = String(Math.floor((seconds % 1) * 1000)).padStart(3, "0");
  return `${h}:${m}:${s}.${ms}`;
}

export const INITIAL_EVENTS: SecurityEvent[] = [
  { id: "evt-001", timestamp: formatSimulationTimestamp(0), type: "SYSTEM", severity: "info", source: "OPERATIONS CORE", message: "SNOW WORKSTATION INITIALIZED // CYBER RANGE 10.44.0.0/24 ONLINE" },
  { id: "evt-002", timestamp: formatSimulationTimestamp(2), type: "POLICY", severity: "notice", source: "SAFETY ENGINE", message: "ISOLATED DETERMINISTIC SANDBOX ACTIVE // MOCK TARGET FIXTURES LOADED" },
  { id: "evt-003", timestamp: formatSimulationTimestamp(5), type: "NETWORK", severity: "info", source: "PACKET SENSOR", message: "MONITORING SENSOR ACTIVE ON 10.44.0.50 // PACKET CAPTURE READY" },
];

export const MISSIONS_LIST: SecurityMission[] = [
  {
    id: "black-ice",
    codename: "BLACK ICE",
    title: "OPERATION BLACK ICE",
    briefing: "Execute full multi-stage pentest against Black Ice cyber range (10.44.0.0/24). Progress from perimeter network discovery to credential exploitation, web injection, session establishment, and data extraction.",
    difficulty: "INTERMEDIATE",
    targetNetwork: "10.44.0.0/24",
    flag: "SNOW{BLACK_ICE_OPERATIONAL_COMPLETE}",
    status: "active",
    stages: [
      { id: "stage-1", label: "Stage 01: Reconnaissance", description: "Run RECON to discover 10.44.0.0/24 cyber range hosts and services.", status: "in-progress", requiredCategory: "recon" },
      { id: "stage-2", label: "Stage 02: Access & Credentials", description: "Execute Brute Force against AUTH-SRV (10.44.0.20:22) to recover operator credential.", status: "locked", requiredCategory: "credentials" },
      { id: "stage-3", label: "Stage 03: Web Security", description: "Interrogate WEB-NODE (10.44.0.30) using Web Security Sandbox SQL Injection.", status: "locked", requiredCategory: "web" },
      { id: "stage-4", label: "Stage 04: Session Establishment", description: "Establish an active privilege session on WEB-NODE or AUTH-SRV.", status: "locked", requiredCategory: "exploitation" },
      { id: "stage-5", label: "Stage 05: Vault Extraction", description: "Execute Snowploit vault extraction on DATA-NODE (10.44.0.40) and verify flag.", status: "locked", requiredCategory: "exploitation" },
    ],
  },
  {
    id: "ghost-protocol",
    codename: "GHOST PROTOCOL",
    title: "OPERATION GHOST PROTOCOL",
    briefing: "Investigate covert network telemetry and rogue activity across perimeter router EDGE-GATEWAY and MONITOR node. Inspect packets, isolate rogue sessions, and analyze memory forensic artifacts.",
    difficulty: "ADVANCED",
    targetNetwork: "10.44.0.0/24",
    flag: "SNOW{GHOST_PROTOCOL_TRACE_SUCCESS}",
    status: "available",
    stages: [
      { id: "stage-1", label: "Stage 01: DNS & Recon Discovery", description: "Run network scan on EDGE-GATEWAY (10.44.0.10) to map perimeter DNS.", status: "in-progress", requiredCategory: "recon" },
      { id: "stage-2", label: "Stage 02: Packet Traffic Analysis", description: "Analyze DNS & SSH packet frames in Packet Lab to isolate anomaly.", status: "locked", requiredCategory: "network" },
      { id: "stage-3", label: "Stage 03: Session Identification", description: "Identify rogue session established on MONITOR (10.44.0.50).", status: "locked", requiredCategory: "exploitation" },
      { id: "stage-4", label: "Stage 04: Digital Forensics Trace", description: "Inspect memory dumps and log timeline in Digital Forensics Station.", status: "locked", requiredCategory: "forensics" },
    ],
  },
  {
    id: "dark-packet",
    codename: "DARK PACKET",
    title: "OPERATION DARK PACKET",
    briefing: "Deep packet inspection and protocol analysis mission focused on decrypted TLS payloads and IDS telemetry.",
    difficulty: "BEGINNER",
    targetNetwork: "10.44.0.0/24",
    flag: "SNOW{DARK_PACKET_INSPECTED}",
    status: "available",
    stages: [
      { id: "dp-1", label: "Stage 01: Capture Stream", description: "Start Packet Lab stream filter for TLS traffic.", status: "in-progress", requiredCategory: "network" },
      { id: "dp-2", label: "Stage 02: Payload Inspection", description: "Select suspicious packet frame and verify layers.", status: "locked", requiredCategory: "network" },
    ],
  },
  {
    id: "zero-day",
    codename: "ZERO DAY",
    title: "OPERATION ZERO DAY",
    briefing: "Simulated zero-day vulnerability discovery and response workflow across DATA-NODE microservices.",
    difficulty: "EXPERT",
    targetNetwork: "10.44.0.0/24",
    flag: "SNOW{ZERO_DAY_PATCHED}",
    status: "available",
    stages: [
      { id: "zd-1", label: "Stage 01: Vuln Identification", description: "Scan DATA-NODE for unpatched internal API endpoints.", status: "in-progress", requiredCategory: "recon" },
      { id: "zd-2", label: "Stage 02: Exploit Proof", description: "Run Snowploit advisory test against port 9000.", status: "locked", requiredCategory: "exploitation" },
    ],
  },
];

export const INITIAL_FORENSICS: ForensicsArtifact[] = [
  { id: "art-1", timestamp: "10:00:14", artifactType: "LOG_ENTRY", title: "/var/log/auth.log", description: "Repeated SSH authentication attempts from 10.44.0.100 targeting user 'operator' on 10.44.0.20.", analysis: "Automated dictionary attack detected targeting auth gateway.", flagged: true },
  { id: "art-2", timestamp: "10:01:02", artifactType: "MEMORY_DUMP", title: "Memory Buffer 0x7fff4a20", description: "Extracted process buffer: 'SNOW_AUTH_TOKEN=snow-lab-2025!'", analysis: "Plaintext credential artifact recovered in process memory.", flagged: true },
  { id: "art-3", timestamp: "10:02:15", artifactType: "NETWORK_SOCKET", title: "Active Socket 10.44.0.30:443 -> 10.44.0.40:5432", description: "Established PostgreSQL socket connection transporting query payloads.", analysis: "Standard microservice database connection.", flagged: false },
  { id: "art-4", timestamp: "10:03:00", artifactType: "FILE_HASH", title: "/bin/snow-daemon SHA-256", description: "Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", analysis: "File hash matches canonical release build.", flagged: false },
  { id: "art-5", timestamp: "10:04:10", artifactType: "TRACE_EVIDENCE", title: "GHOST PROTOCOL Telemetry Trace", description: "Covert DNS query trail discovered targeting host 10.44.0.50 (MONITOR).", analysis: "Ghost Protocol evidence chain verified.", flagged: true },
];

export function initialSimulationState(): SecuritySimulationState {
  return {
    mode: "red",
    category: "recon",
    activeOpId: "nmap-recon",
    clock: 0,
    selectedHostId: "host-edge",
    selectedSessionId: undefined,
    activeMissionId: "black-ice",
    missions: JSON.parse(JSON.stringify(MISSIONS_LIST)),
    hosts: JSON.parse(JSON.stringify(INITIAL_HOSTS)),
    credentials: JSON.parse(JSON.stringify(INITIAL_CREDENTIALS)),
    vulnerabilities: JSON.parse(JSON.stringify(INITIAL_VULNERABILITIES)),
    packets: JSON.parse(JSON.stringify(INITIAL_PACKETS)),
    alerts: [],
    sessions: [],
    events: JSON.parse(JSON.stringify(INITIAL_EVENTS)),

    bruteForce: {
      config: {
        target: "AUTH-SRV (10.44.0.20:22)",
        service: "SSH",
        protocol: "SSH",
        username: "operator",
        wordlist: "snow-common.txt",
        workers: 4,
        mode: "dictionary",
        rateLimit: 320,
      },
      state: {
        status: "idle",
        attempts: 0,
        totalCandidates: 2700,
        attemptsPerSec: 0,
        currentCandidate: "---",
        matchFound: false,
        elapsedSec: 0,
      },
    },

    johnHashcat: {
      config: {
        hashType: "bcrypt",
        targetHash: "$2b$12$e83b38c290a1841e0a29b0f49a184e1a0123456789abcdef",
        mode: "DICTIONARY",
        wordlist: "snow-rockyou.txt",
        rules: "best64",
        threads: 4,
      },
      state: {
        status: "idle",
        candidatesTested: 0,
        totalCandidates: 100000,
        hashRate: 0,
        progress: 0,
        elapsedSec: 0,
      },
    },

    medusaHydra: {
      config: {
        target: "AUTH-SRV (10.44.0.20:22)",
        service: "SSH",
        module: "ssh",
        userList: "snow-users.txt",
        passList: "snow-common.txt",
        workers: 8,
        threads: 8,
      },
      state: {
        status: "idle",
        workerProgress: [0, 0, 0, 0],
        workerActivities: [
          { id: 1, user: "operator", status: "IDLE", progress: 0 },
          { id: 2, user: "admin", status: "IDLE", progress: 0 },
          { id: 3, user: "root", status: "IDLE", progress: 0 },
          { id: 4, user: "snow", status: "IDLE", progress: 0 },
        ],
        totalAttempts: 0,
        attemptsPerSec: 0,
        elapsedSec: 0,
      },
    },

    recon: {
      config: {
        target: "10.44.0.0/24 Range",
        command: "nmap -sV -O 10.44.0.0/24",
        scanType: "Range Service Discovery",
        timing: "T3 Normal",
      },
      state: {
        status: "idle",
        progress: 0,
        currentPhase: "STANDBY",
        hostsFound: 1,
        portsScanned: 0,
        elapsedSec: 0,
        terminalLogs: [],
      },
    },

    packetLab: {
      isCapturing: true,
      filter: "ALL",
      selectedPacketId: "pkt-001",
    },

    webLab: {
      category: "SQL INJECTION",
      targetUrl: "https://10.44.0.30/login",
      method: "POST",
      payload: "' OR '1'='1",
      intercepted: false,
      lastResponse: {
        status: 200,
        headers: { "content-type": "application/json", "server": "nginx/1.24 (snow-web)" },
        body: '{"status":"success","user":"admin","role":"administrator","flag":"SNOW{SQLI_BYPASS_SUCCESS}"}',
        finding: "Boolean SQL Injection confirmed on parameter 'username' at 10.44.0.30.",
        remediation: "Use parameterized queries (PDO / Prepared Statements) and sanitize input.",
      },
    },

    snowploit: {
      selectedModule: "exploit/web/sno_2026_001_auth_bypass",
      target: "WEB-NODE (10.44.0.30)",
      commandHistory: ["help"],
      consoleLogs: ["snowploit > framework ready // cyber range context initialized"],
    },

    forensics: {
      artifacts: JSON.parse(JSON.stringify(INITIAL_FORENSICS)),
      selectedArtifactId: "art-1",
    },
  };
}

export const CATEGORY_OPS: Record<
  OperationCategory,
  Array<{ id: string; name: string; subtitle: string; icon: string }>
> = {
  recon: [
    { id: "nmap-recon", name: "Network Recon Engine", subtitle: "Nmap-Style Range Port & Service Discovery", icon: "RADAR" },
  ],
  credentials: [
    { id: "brute-force", name: "Brute Force Auth Engine", subtitle: "Targeted Credential Attack Simulation", icon: "KEY" },
    { id: "john-hashcat", name: "Hash Cracker Workstation", subtitle: "John / Hashcat High-Speed Cracker", icon: "CPU" },
    { id: "medusa-hydra", name: "Multi-Threaded Auth Tester", subtitle: "Medusa / Hydra Parallel Worker Engine", icon: "LAYERS" },
  ],
  network: [
    { id: "wireshark-packets", name: "Wireshark Packet Lab", subtitle: "Synthetic Frame Inspector & Live Stream", icon: "ACTIVITY" },
  ],
  web: [
    { id: "web-interceptor", name: "Web Security Sandbox", subtitle: "SQLi, XSS, JWT & Interceptor Lab", icon: "GLOBE" },
  ],
  exploitation: [
    { id: "snowploit-console", name: "Snowploit Console", subtitle: "Interactive Exploitation Terminal Framework", icon: "TERMINAL" },
  ],
  forensics: [
    { id: "forensics-investigator", name: "Digital Forensics Station", subtitle: "Artifacts, Memory Dumps & Log Timeline", icon: "SHIELD" },
  ],
  missions: [
    { id: "black-ice-mission", name: "Operation Black Ice", subtitle: "Multi-Stage Cyber Range Operation", icon: "CROSSHAIR" },
    { id: "ghost-protocol-mission", name: "Operation Ghost Protocol", subtitle: "Covert Telemetry & Forensic Investigation", icon: "SHIELD" },
  ],
};

export const HELP_COMMANDS = [
  "help                            list available workstation commands",
  "status                          print operator workstation state",
  "targets                         list active Snow cyber range targets",
  "sessions                        list active simulated sessions",
  "run                             run active operation",
  "pause                           pause active operation",
  "resume                          resume active operation",
  "stop                            stop active operation",
  "reset                           reset simulation state",
  "recon                           open Network Recon Engine",
  "scan --demo                     execute quick demo network scan",
  "bruteforce                      open Brute Force Auth Engine",
  "bruteforce --demo               execute quick demo credential attack",
  "crack / hashcat                 open Hash Cracker Workstation",
  "medusa / hydra                  open Multi-Threaded Auth Tester",
  "packets / wireshark             open Wireshark Packet Lab",
  "web                             open Web Security Sandbox",
  "snowploit                       open Snowploit Console",
  "forensics                       open Digital Forensics Station",
  "mission / mission --list        list cyber range missions",
  "mission --start <id>            start mission (e.g. black-ice, ghost-protocol)",
  "mission --status                show active mission stage progress",
  "clear                           clear terminal screen",
];

export function commandOutput(command: string, state?: SecuritySimulationState): string[] {
  const parts = command.trim().toLowerCase().split(/\s+/);
  const main = parts[0];
  const arg = parts[1];

  if (main === "help") return ["AVAILABLE WORKSTATION COMMANDS", ...HELP_COMMANDS];
  if (main === "status")
    return [
      "WORKSTATION STATUS",
      "MODE ............ ISOLATED CONTROLLED SIMULATION",
      "RANGE ........... SNOW CYBER RANGE 10.44.0.0/24",
      "SAFETY .......... LOCAL SYNTHETIC FIXTURES ONLY",
      `ACTIVE MISSION .. ${state?.activeMissionId.toUpperCase() || "BLACK-ICE"}`,
      `SESSIONS ........ ${state?.sessions.length || 0} ACTIVE`,
      "MATRIX ATMOSPHERE ONLINE",
    ];
  if (main === "targets") {
    const hosts = state?.hosts || INITIAL_HOSTS;
    return [
      "ACTIVE CYBER RANGE TARGETS (10.44.0.0/24):",
      ...hosts.map((h) =>
        `${h.address.padEnd(12)} ${h.hostname.padEnd(14)} ${h.status.toUpperCase().padEnd(12)} [${h.discovered ? "DISCOVERED" : "LOCKED"}] ${h.role}`
      ),
    ];
  }
  if (main === "sessions") {
    const sessions = state?.sessions || [];
    if (sessions.length === 0) return ["NO ACTIVE SIMULATED SESSIONS", "Run credential or exploit operations to establish sessions."];
    return [
      "ACTIVE SIMULATED SESSIONS:",
      ...sessions.map((s) => `${s.id} | TARGET: ${s.target} | MODULE: ${s.module} | PRIVILEGE: ${s.privilege} | STATUS: ${s.status.toUpperCase()}`),
    ];
  }
  if (main === "mission" || main === "missions") {
    if (arg === "--list" || !arg) {
      const missions = state?.missions || MISSIONS_LIST;
      return [
        "CYBER RANGE MISSIONS:",
        ...missions.map((m) => `[${m.id}] ${m.title} (${m.difficulty}) - ${m.status.toUpperCase()}`),
        "Use 'mission --start <id>' to switch mission.",
      ];
    }
    if (arg === "--status") {
      const activeMission = state?.missions.find((m) => m.id === state.activeMissionId) || MISSIONS_LIST[0];
      return [
        `ACTIVE MISSION: ${activeMission.title}`,
        `BRIEFING: ${activeMission.briefing}`,
        "STAGES:",
        ...activeMission.stages.map((s) => `  [${s.status.toUpperCase().padEnd(11)}] ${s.label}: ${s.description}`),
      ];
    }
    if (arg === "--start" && parts[2]) {
      const targetId = parts[2].toLowerCase();
      const exists = (state?.missions || MISSIONS_LIST).some((m) => m.id === targetId);
      if (exists) return [`SWITCHING MISSION TO '${targetId.toUpperCase()}'`, "Dispatching mission context to workstation..."];
      return [`UNKNOWN MISSION ID '${targetId}'`, "Available: black-ice, ghost-protocol, dark-packet, zero-day"];
    }
  }
  if (main === "clear") return [];

  return [
    `EXECUTED COMMAND: ${command}`,
    "Command dispatched to active operation state machine.",
  ];
}
