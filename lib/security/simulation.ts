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
  protocol: "TCP" | "UDP" | "HTTP" | "HTTPS" | "DNS" | "SSH" | "TLS";
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
  status: "active" | "closed";
  createdAt: string;
}

export interface SecurityAttack {
  id: string;
  kind: "credential" | "auth" | "recon" | "exploit" | "web";
  target: string;
  strategy: string;
  progress: number;
  status: "queued" | "running" | "success" | "failed" | "stopped";
  detected: boolean;
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
}

export interface SecurityMission {
  id: string;
  title: string;
  flag: string;
  stages: MissionStage[];
}

// Config & State interfaces for individual operations
export interface BruteForceConfig {
  target: string;
  protocol: "SSH" | "HTTP" | "FTP" | "SMTP";
  username: string;
  wordlist: "Snow Common" | "Top 1000" | "Custom Snow Dictionary";
  mode: "Sequential" | "Dictionary" | "Hybrid";
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
  hashType: "SHA-256" | "MD5" | "Bcrypt-Sim";
  targetHash: string;
  mode: "DICTIONARY" | "MASK" | "HYBRID";
  wordlist: string;
  threads: number;
}

export interface JohnHashcatState {
  status: OperationStatus;
  candidatesTested: number;
  totalCandidates: number;
  hashRate: number;
  progress: number;
  matchedResult?: string;
  elapsedSec: number;
}

export interface MedusaHydraConfig {
  target: string;
  service: "SSH" | "FTP" | "HTTP-POST" | "SMB";
  userList: string;
  passList: string;
  threads: number;
}

export interface MedusaHydraState {
  status: OperationStatus;
  workerProgress: [number, number, number, number];
  totalAttempts: number;
  attemptsPerSec: number;
  matchedPair?: { user: string; pass: string };
  elapsedSec: number;
}

export interface ReconConfig {
  target: string;
  scanType: "Host Discovery" | "Port Scan" | "Service Detection" | "Deep Recon";
  timing: "Quiet" | "Normal" | "Aggressive";
}

export interface ReconState {
  status: OperationStatus;
  progress: number;
  currentPhase: string;
  hostsFound: number;
  portsScanned: number;
  elapsedSec: number;
}

export interface PacketLabConfig {
  isCapturing: boolean;
  filter: "ALL" | "TCP" | "UDP" | "HTTP" | "HTTPS" | "DNS" | "SSH" | "TLS";
  selectedPacketId?: string;
}

export interface WebLabConfig {
  category: "SQL INJECTION" | "XSS" | "AUTHENTICATION" | "JWT" | "HEADERS" | "REQUEST INTERCEPTION";
  targetUrl: string;
  payload: string;
  intercepted: boolean;
}

export interface SnowploitConfig {
  selectedModule: string;
  target: string;
  commandHistory: string[];
  activeSession?: string;
}

export interface ForensicsArtifact {
  id: string;
  timestamp: string;
  artifactType: "LOG_ENTRY" | "MEMORY_DUMP" | "FILE_HASH" | "NETWORK_SOCKET";
  title: string;
  description: string;
  analysis: string;
  flagged: boolean;
}

export interface SecuritySimulationState {
  mode: SecurityMode;
  category: OperationCategory;
  activeOpId: string;
  clock: number;
  hosts: SecurityHost[];
  credentials: SecurityCredential[];
  vulnerabilities: SecurityVulnerability[];
  packets: SecurityPacket[];
  alerts: SecurityAlert[];
  sessions: SecuritySession[];
  attacks: SecurityAttack[];
  defense: {
    blockedHosts: string[];
    isolatedHosts: string[];
    lockedAccounts: string[];
    rateLimited: string[];
    quarantinedServices: string[];
  };
  mission: SecurityMission;
  events: SecurityEvent[];

  // Specific Operation Engines
  bruteForce: { config: BruteForceConfig; state: BruteForceState };
  johnHashcat: { config: JohnHashcatConfig; state: JohnHashcatState };
  medusaHydra: { config: MedusaHydraConfig; state: MedusaHydraState };
  recon: { config: ReconConfig; state: ReconState };
  packetLab: PacketLabConfig;
  webLab: WebLabConfig;
  snowploit: SnowploitConfig;
  forensics: { artifacts: ForensicsArtifact[]; selectedArtifactId?: string };
}

// Initial Mock Data
export const INITIAL_HOSTS: SecurityHost[] = [
  {
    id: "gateway",
    hostname: "SNOW-GW-01",
    address: "10.42.0.1",
    role: "Gateway Router",
    status: "online",
    x: 15,
    y: 50,
    discovered: true,
    services: [
      { port: 53, protocol: "UDP", service: "DNS", version: "Unbound Sim 1.12", state: "open" },
      { port: 80, protocol: "TCP", service: "HTTP", version: "gateway-auth 1.0", state: "open" },
    ],
  },
  {
    id: "web-01",
    hostname: "SNOW-WEB-01",
    address: "10.42.0.10",
    role: "Web Application Server",
    status: "online",
    x: 40,
    y: 25,
    discovered: true,
    services: [
      { port: 80, protocol: "TCP", service: "HTTP", version: "nginx/1.24 (snow-lab)", state: "open" },
      { port: 443, protocol: "TCP", service: "HTTPS", version: "TLS 1.3 / OpenSSL", state: "open" },
    ],
  },
  {
    id: "api-01",
    hostname: "SNOW-API-01",
    address: "10.42.0.12",
    role: "Internal REST Service",
    status: "online",
    x: 65,
    y: 30,
    discovered: false,
    services: [
      { port: 8080, protocol: "TCP", service: "HTTP-ALT", version: "Node.js Express", state: "open" },
    ],
  },
  {
    id: "auth-01",
    hostname: "SNOW-AUTH-01",
    address: "10.42.0.14",
    role: "Authentication Gateway",
    status: "online",
    x: 45,
    y: 75,
    discovered: true,
    services: [
      { port: 22, protocol: "TCP", service: "SSH", version: "OpenSSH 9.2p1", state: "open" },
      { port: 389, protocol: "TCP", service: "LDAP", version: "OpenLDAP Sim", state: "open" },
    ],
  },
  {
    id: "db-01",
    hostname: "SNOW-DB-01",
    address: "10.42.0.19",
    role: "Isolated Database Cluster",
    status: "filtered",
    x: 85,
    y: 60,
    discovered: false,
    services: [
      { port: 5432, protocol: "TCP", service: "POSTGRESQL", version: "PostgreSQL 16.1", state: "filtered" },
    ],
  },
  {
    id: "ids",
    hostname: "SNOW-IDS-SENSOR",
    address: "10.42.0.254",
    role: "Network Intrusion Detection",
    status: "online",
    x: 20,
    y: 80,
    discovered: true,
    services: [
      { port: 514, protocol: "UDP", service: "SYSLOG", version: "Snow Sensor Core", state: "open" },
    ],
  },
];

export const INITIAL_CREDENTIALS: SecurityCredential[] = [
  {
    id: "cred-01",
    target: "SNOW-AUTH-01",
    username: "admin",
    hashType: "SHA-256",
    hash: "7f3a2c89e10123456789abcdef0123456789abcdef0123456789abcdef012345",
    status: "locked",
    recovered: "snow-lab-2025!",
    discovered: false,
  },
  {
    id: "cred-02",
    target: "SNOW-WEB-01",
    username: "operator",
    hashType: "MD5",
    hash: "5d41402abc4b2a76b9719d911017c592",
    status: "locked",
    recovered: "matrix123",
    discovered: false,
  },
  {
    id: "cred-03",
    target: "SNOW-DB-01",
    username: "dbadmin",
    hashType: "SHA-256",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    status: "locked",
    recovered: "rootpass_snow",
    discovered: false,
  },
];

export const INITIAL_VULNERABILITIES: SecurityVulnerability[] = [
  { id: "vuln-ssh-brute", hostId: "auth-01", title: "SSH Weak Credential Policy", severity: "HIGH", description: "SSH daemon permits continuous rapid authentication attempts.", discovered: true },
  { id: "vuln-web-sqli", hostId: "web-01", title: "SQL Injection in Search Form", severity: "CRITICAL", description: "Parameter 'q' on lab.snow.local/login is susceptible to Boolean SQLi.", discovered: true },
  { id: "vuln-api-jwt", hostId: "api-01", title: "Weak JWT Signing Secret", severity: "MEDIUM", description: "API token signature relies on known dictionary word 'snowsecret'.", discovered: false },
  { id: "vuln-db-exposure", hostId: "db-01", title: "Filtered Database Port", severity: "LOW", description: "PostgreSQL port is visible via deep service enumeration.", discovered: false },
];

export const INITIAL_PACKETS: SecurityPacket[] = [
  { id: "pkt-001", timestamp: "12:31:02.104", source: "10.42.0.12", destination: "10.42.0.10", protocol: "TCP", port: 443, length: 512, info: "SYN · session negotiation", payload: "Flags: SYN | Window: 64240", status: "observed", layers: ["FRAME", "ETHERNET", "IP", "TCP"] },
  { id: "pkt-002", timestamp: "12:31:02.109", source: "10.42.0.10", destination: "10.42.0.12", protocol: "TCP", port: 443, length: 512, info: "SYN ACK · session accepted", payload: "Flags: SYN, ACK | Window: 65160", status: "allowed", layers: ["FRAME", "ETHERNET", "IP", "TCP"] },
  { id: "pkt-003", timestamp: "12:31:02.112", source: "10.42.0.12", destination: "10.42.0.10", protocol: "TCP", port: 443, length: 64, info: "ACK · handshake established", payload: "Flags: ACK | Seq: 1 | Ack: 1", status: "allowed", layers: ["FRAME", "ETHERNET", "IP", "TCP"] },
  { id: "pkt-004", timestamp: "12:31:03.015", source: "10.42.0.18", destination: "10.42.0.12", protocol: "HTTP", port: 80, length: 824, info: "GET / HTTP/1.1", payload: "GET / HTTP/1.1\r\nHost: lab.snow.local\r\nUser-Agent: SnowLab/3.0", status: "observed", layers: ["FRAME", "ETHERNET", "IP", "TCP", "APPLICATION"] },
  { id: "pkt-005", timestamp: "12:31:03.042", source: "10.42.0.12", destination: "10.42.0.18", protocol: "HTTP", port: 80, length: 1240, info: "HTTP/1.1 200 OK", payload: "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nServer: SnowWeb/1.0", status: "allowed", layers: ["FRAME", "ETHERNET", "IP", "TCP", "APPLICATION"] },
  { id: "pkt-006", timestamp: "12:31:04.201", source: "10.42.0.1", destination: "10.42.0.10", protocol: "DNS", port: 53, length: 164, info: "A lab.snow.local", payload: "Query: lab.snow.local · Answer: 10.42.0.10", status: "allowed", layers: ["FRAME", "ETHERNET", "IP", "UDP", "APPLICATION"] },
  { id: "pkt-007", timestamp: "12:31:05.882", source: "10.42.0.27", destination: "10.42.0.14", protocol: "SSH", port: 22, length: 320, info: "AUTH ATTEMPT · admin", payload: "Client: SSH-2.0-OpenSSH_9.2p1 · User: admin", status: "blocked", suspicious: true, layers: ["FRAME", "ETHERNET", "IP", "TCP", "APPLICATION"] },
  { id: "pkt-008", timestamp: "12:31:06.901", source: "10.42.0.10", destination: "10.42.0.19", protocol: "TLS", port: 5432, length: 618, info: "Encrypted PostgreSQL Session", payload: "Application Data: [Encrypted Payload - Snow Simulation]", status: "observed", layers: ["FRAME", "ETHERNET", "IP", "TCP", "APPLICATION"] },
];

export const INITIAL_EVENTS: SecurityEvent[] = [
  { id: "evt-001", timestamp: "12:30:00", type: "SYSTEM", severity: "success", source: "OPERATIONS CORE", message: "SNOW WORKSTATION INITIALIZED / ALL TARGETS DETERMINISTIC & ISOLATED" },
  { id: "evt-002", timestamp: "12:30:02", type: "POLICY", severity: "notice", source: "SAFETY ENGINE", message: "EXTERNAL RECON DISABLED / SANDBOX OPERATES ON LOCAL SYNTHETIC MOCK SCOPE" },
  { id: "evt-003", timestamp: "12:30:05", type: "NETWORK", severity: "info", source: "PACKET SENSOR", message: "SYNTHETIC PACKET STREAM ONLINE / DISPLAY FILTERS READY" },
];

export const INITIAL_MISSION: SecurityMission = {
  id: "black-ice-001",
  title: "BLACK ICE",
  flag: "SNOW{BLACK_ICE_OPERATIONAL_COMPLETE}",
  stages: [
    { id: "stage-1", label: "Stage 01: Reconnaissance", description: "Scan and enumerate SNOW-LAB-NET targets.", status: "in-progress" },
    { id: "stage-2", label: "Stage 02: Service Discovery", description: "Identify SSH on AUTH-01 and Web on WEB-01.", status: "locked" },
    { id: "stage-3", label: "Stage 03: Credential Simulation", description: "Execute Brute Force or Hash Crack simulation against AUTH-01.", status: "locked" },
    { id: "stage-4", label: "Stage 04: Web Entry", description: "Simulate SQL Injection against lab.snow.local.", status: "locked" },
    { id: "stage-5", label: "Stage 05: Session Acquisition", description: "Establish an active Snowploit session.", status: "locked" },
    { id: "stage-6", label: "Stage 06: Evidence & Flag", description: "Examine forensic artifacts and retrieve target flag.", status: "locked" },
  ],
};

export const INITIAL_FORENSICS: ForensicsArtifact[] = [
  { id: "art-1", timestamp: "12:28:14", artifactType: "LOG_ENTRY", title: "/var/log/auth.log", description: "Repeated failed SSH authentication attempts from IP 10.42.0.27", analysis: "Indicates automated brute-force spray against admin account.", flagged: true },
  { id: "art-2", timestamp: "12:29:01", artifactType: "MEMORY_DUMP", title: "Memory Region 0x7fff4a20", description: "Extracted process string: 'SNOW_AUTH_SECRET_TOKEN=snow-lab-2025!'", analysis: "Plaintext credential artifact residing in memory buffer.", flagged: true },
  { id: "art-3", timestamp: "12:29:45", artifactType: "NETWORK_SOCKET", title: "Established Socket 10.42.0.10:443 -> 10.42.0.19:5432", description: "Active DB connection carrying sanitized queries.", analysis: "Standard app-to-database communication pipeline.", flagged: false },
  { id: "art-4", timestamp: "12:30:10", artifactType: "FILE_HASH", title: "/bin/snow-daemon SHA-256", description: "Hash match: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", analysis: "Verified binary integrity matching canonical release.", flagged: false },
];

export function initialSimulationState(): SecuritySimulationState {
  return {
    mode: "red",
    category: "recon",
    activeOpId: "nmap-recon",
    clock: 1,
    hosts: JSON.parse(JSON.stringify(INITIAL_HOSTS)),
    credentials: JSON.parse(JSON.stringify(INITIAL_CREDENTIALS)),
    vulnerabilities: JSON.parse(JSON.stringify(INITIAL_VULNERABILITIES)),
    packets: JSON.parse(JSON.stringify(INITIAL_PACKETS)),
    alerts: [],
    sessions: [],
    attacks: [],
    defense: {
      blockedHosts: [],
      isolatedHosts: [],
      lockedAccounts: [],
      rateLimited: [],
      quarantinedServices: [],
    },
    mission: JSON.parse(JSON.stringify(INITIAL_MISSION)),
    events: JSON.parse(JSON.stringify(INITIAL_EVENTS)),

    bruteForce: {
      config: {
        target: "SNOW-AUTH-01",
        protocol: "SSH",
        username: "admin",
        wordlist: "Snow Common",
        mode: "Dictionary",
        rateLimit: 250,
      },
      state: {
        status: "idle",
        attempts: 0,
        totalCandidates: 10000,
        attemptsPerSec: 0,
        currentCandidate: "---",
        matchFound: false,
        elapsedSec: 0,
      },
    },

    johnHashcat: {
      config: {
        hashType: "SHA-256",
        targetHash: "7f3a2c89e10123456789abcdef0123456789abcdef0123456789abcdef012345",
        mode: "DICTIONARY",
        wordlist: "Top 1000",
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
        target: "SNOW-AUTH-01",
        service: "SSH",
        userList: "admin, operator, root, snow",
        passList: "Top 1000 Snow Passwords",
        threads: 4,
      },
      state: {
        status: "idle",
        workerProgress: [0, 0, 0, 0],
        totalAttempts: 0,
        attemptsPerSec: 0,
        elapsedSec: 0,
      },
    },

    recon: {
      config: {
        target: "SNOW-LAB-NET (10.42.0.0/24)",
        scanType: "Service Detection",
        timing: "Normal",
      },
      state: {
        status: "idle",
        progress: 0,
        currentPhase: "STANDBY",
        hostsFound: 2,
        portsScanned: 0,
        elapsedSec: 0,
      },
    },

    packetLab: {
      isCapturing: true,
      filter: "ALL",
      selectedPacketId: "pkt-001",
    },

    webLab: {
      category: "SQL INJECTION",
      targetUrl: "https://lab.snow.local/login",
      payload: "' OR '1'='1",
      intercepted: false,
    },

    snowploit: {
      selectedModule: "exploit/web/demo-auth-bypass",
      target: "SNOW-WEB-01",
      commandHistory: ["help"],
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
    { id: "nmap-recon", name: "Network Recon Engine", subtitle: "Nmap-Style Port & Service Discovery", icon: "RADAR" },
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
    { id: "black-ice-mission", name: "Operation Black Ice", subtitle: "Multi-Stage Simulated Cyber Range", icon: "CROSSHAIR" },
  ],
};

export const HELP_COMMANDS = [
  "help                 list available sandbox operations",
  "status               print operator workstation state",
  "recon                open Network Recon Engine",
  "bruteforce           open Brute Force Auth Engine",
  "crack                open Hash Cracker Workstation",
  "medusa               open Multi-Threaded Auth Tester",
  "packets              open Wireshark Packet Lab",
  "web                  open Web Security Sandbox",
  "snowploit            open Snowploit Console",
  "forensics            open Digital Forensics Station",
  "missions             open Operation Black Ice",
  "targets              list active Snow sandbox targets",
  "redteam / blueteam   switch operating mode",
  "clear                clear terminal screen",
];

export function commandOutput(command: string): string[] {
  const normalized = command.trim().toLowerCase();
  if (normalized === "help") return ["AVAILABLE WORKSTATION COMMANDS", ...HELP_COMMANDS];
  if (normalized === "status")
    return [
      "WORKSTATION STATUS",
      "MODE ........ CONTROLLED DEMO / LOCAL SANDBOX",
      "TARGETS ..... FICTIONAL SNOW MOCK SUITE",
      "SAFETY ...... ISOLATED / NO EXTERNAL API ATTEMPTS",
      "MATRIX ENGINE ONLINE",
    ];
  if (normalized === "targets")
    return [
      "ACTIVE SANDBOX TARGETS:",
      "10.42.0.1   SNOW-GW-01   Gateway Router",
      "10.42.0.10  SNOW-WEB-01  Web App Server (lab.snow.local)",
      "10.42.0.12  SNOW-API-01  Internal REST Service",
      "10.42.0.14  SNOW-AUTH-01 Authentication Gateway (SSH)",
      "10.42.0.19  SNOW-DB-01   PostgreSQL DB Cluster",
    ];
  if (normalized === "clear") return [];
  if (normalized === "redteam") return ["OPERATING MODE: RED TEAM (OFFENSIVE OPERATIONS)"];
  if (normalized === "blueteam") return ["OPERATING MODE: BLUE TEAM (DEFENSIVE MONITORING)"];

  return [
    `EXCECUTED COMMAND: ${command}`,
    "Command dispatched to active operation state machine.",
  ];
}
