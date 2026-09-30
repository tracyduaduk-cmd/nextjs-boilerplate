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
  service: "SSH" | "HTTPS" | "AUTH";
  protocol?: "SSH" | "HTTPS" | "AUTH" | "FTP" | "SMTP";
  username: string;
  wordlist: string;
  workers: number;
  mode: "dictionary" | "hybrid" | "brute-force";
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
  hashType: "bcrypt" | "SHA-256" | "MD5" | "Bcrypt-Sim";
  targetHash: string;
  mode: "DICTIONARY" | "MASK" | "HYBRID";
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
  elapsedSec: number;
}

export interface MedusaHydraConfig {
  target: string;
  service?: "SSH" | "FTP" | "HTTP-POST" | "SMB";
  module: "ssh" | "https" | "ftp" | "smb";
  userList: string;
  passList: string;
  workers: number;
  threads?: number;
}

export interface WorkerActivity {
  id: number;
  user: string;
  status: "CONNECTING" | "AUTHENTICATING" | "RETRY" | "LOCKOUT" | "SUCCESS" | "IDLE";
  progress: number;
}

export interface MedusaHydraState {
  status: OperationStatus;
  workerProgress: [number, number, number, number];
  workerActivities: WorkerActivity[];
  totalAttempts: number;
  attemptsPerSec: number;
  matchedPair?: { user: string; pass: string };
  elapsedSec: number;
}

export interface ReconConfig {
  target: string;
  command: string;
  scanType: "Host Discovery" | "Port Scan" | "Service Detection" | "OS Fingerprint" | "Deep Recon";
  timing: "T1 Stealth" | "Quiet" | "T3 Normal" | "Normal" | "T4 Aggressive" | "Aggressive";
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

export interface PacketLabConfig {
  isCapturing: boolean;
  filter: "ALL" | "TCP" | "UDP" | "HTTP" | "HTTPS" | "DNS" | "SSH" | "TLS" | "ICMP";
  selectedPacketId?: string;
}

export interface WebLabConfig {
  category: "SQL INJECTION" | "XSS" | "AUTHENTICATION" | "JWT" | "HEADERS" | "REQUEST INTERCEPTION";
  targetUrl: string;
  method: "POST" | "GET" | "PUT";
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

export interface SnowploitConfig {
  selectedModule: string;
  target: string;
  commandHistory: string[];
  activeSession?: string;
  consoleLogs: string[];
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
  mode?: SecurityMode;
  category: OperationCategory;
  activeOpId: string;
  clock: number;
  hosts: SecurityHost[];
  credentials: SecurityCredential[];
  vulnerabilities: SecurityVulnerability[];
  packets: SecurityPacket[];
  alerts: SecurityAlert[];
  sessions: SecuritySession[];
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

// Initial Mock Data (Fictional Snow Lab Fixtures)
export const INITIAL_HOSTS: SecurityHost[] = [
  {
    id: "gateway",
    hostname: "lab-gateway.snow.local",
    address: "10.42.0.1",
    role: "Gateway Router & Firewalled Ingress",
    status: "online",
    x: 15,
    y: 50,
    discovered: true,
    services: [
      { port: 53, protocol: "UDP", service: "dns", version: "Unbound Sim 1.12", state: "open" },
      { port: 80, protocol: "TCP", service: "http", version: "nginx/1.24 (snow-lab)", state: "open" },
      { port: 443, protocol: "TCP", service: "https", version: "OpenSSL 3.0", state: "open" },
    ],
  },
  {
    id: "web-01",
    hostname: "lab-web-01.snow.local",
    address: "10.42.0.10",
    role: "Web Application Server (snow-lab.local)",
    status: "online",
    x: 40,
    y: 25,
    discovered: true,
    services: [
      { port: 80, protocol: "TCP", service: "http", version: "nginx/1.24 (snow-lab)", state: "open" },
      { port: 443, protocol: "TCP", service: "https", version: "TLS 1.3 / OpenSSL", state: "open" },
    ],
  },
  {
    id: "api-01",
    hostname: "lab-api-01.snow.local",
    address: "10.42.0.12",
    role: "Internal Microservices Gateway",
    status: "online",
    x: 65,
    y: 30,
    discovered: false,
    services: [
      { port: 8080, protocol: "TCP", service: "http-proxy", version: "Express / Node.js", state: "open" },
    ],
  },
  {
    id: "auth-01",
    hostname: "lab-auth.snow.local",
    address: "10.42.0.14",
    role: "Authentication Gateway & Identity Vault",
    status: "online",
    x: 45,
    y: 75,
    discovered: true,
    services: [
      { port: 22, protocol: "TCP", service: "ssh", version: "OpenSSH 9.2p1", state: "open" },
      { port: 389, protocol: "TCP", service: "ldap", version: "OpenLDAP Sim", state: "open" },
    ],
  },
  {
    id: "db-01",
    hostname: "lab-db-01.snow.local",
    address: "10.42.0.19",
    role: "Isolated Database Cluster",
    status: "filtered",
    x: 85,
    y: 60,
    discovered: false,
    services: [
      { port: 5432, protocol: "TCP", service: "postgresql", version: "PostgreSQL 16.1", state: "filtered" },
    ],
  },
  {
    id: "ids",
    hostname: "lab-ids-sensor.snow.local",
    address: "10.42.0.254",
    role: "Network Intrusion Sensor",
    status: "online",
    x: 20,
    y: 80,
    discovered: true,
    services: [
      { port: 514, protocol: "UDP", service: "syslog", version: "Snow Sensor Core", state: "open" },
    ],
  },
];

export const INITIAL_CREDENTIALS: SecurityCredential[] = [
  {
    id: "cred-01",
    target: "lab-auth.snow.local",
    username: "operator",
    hashType: "bcrypt",
    hash: "$2b$12$e83b38c290a1841e0a29b0f49a184e1a0123456789abcdef",
    status: "locked",
    recovered: "snow-lab-2025!",
    discovered: false,
  },
  {
    id: "cred-02",
    target: "lab-web-01.snow.local",
    username: "admin",
    hashType: "SHA-256",
    hash: "7f3a2c89e10123456789abcdef0123456789abcdef0123456789abcdef012345",
    status: "locked",
    recovered: "matrix2026!",
    discovered: false,
  },
  {
    id: "cred-03",
    target: "lab-db-01.snow.local",
    username: "dbadmin",
    hashType: "MD5",
    hash: "5d41402abc4b2a76b9719d911017c592",
    status: "locked",
    recovered: "rootpass_snow",
    discovered: false,
  },
];

export const INITIAL_VULNERABILITIES: SecurityVulnerability[] = [
  { id: "vuln-ssh-brute", hostId: "auth-01", title: "SSH Weak Credential Policy", severity: "HIGH", description: "SSH daemon permits continuous rapid authentication attempts on lab-auth.snow.local.", discovered: true },
  { id: "vuln-web-sqli", hostId: "web-01", title: "SQL Injection in Search Form", severity: "CRITICAL", description: "Parameter 'q' on snow-lab.local/login is susceptible to Boolean SQLi.", discovered: true },
  { id: "vuln-api-jwt", hostId: "api-01", title: "Weak JWT Signing Secret", severity: "MEDIUM", description: "API token signature relies on known dictionary word 'snowsecret'.", discovered: false },
  { id: "vuln-db-exposure", hostId: "db-01", title: "Filtered Database Port", severity: "LOW", description: "PostgreSQL port is visible via deep service enumeration.", discovered: false },
];

export const INITIAL_PACKETS: SecurityPacket[] = [
  { id: "pkt-001", timestamp: "10:42:01.104", source: "10.42.0.12", destination: "10.42.0.1", protocol: "TCP", port: 443, length: 74, info: "SYN · session negotiation", payload: "Flags: SYN | Window: 64240 | MSS: 1460", status: "observed", layers: ["Frame 1", "Ethernet II", "IPv4", "TCP"] },
  { id: "pkt-002", timestamp: "10:42:01.109", source: "10.42.0.1", destination: "10.42.0.12", protocol: "TCP", port: 443, length: 74, info: "SYN, ACK · session accepted", payload: "Flags: SYN, ACK | Window: 65160 | MSS: 1460", status: "allowed", layers: ["Frame 2", "Ethernet II", "IPv4", "TCP"] },
  { id: "pkt-003", timestamp: "10:42:02.112", source: "10.42.0.12", destination: "10.42.0.1", protocol: "TLS", port: 443, length: 512, info: "Client Hello · TLS 1.3 Handshake", payload: "Handshake Protocol: Client Hello | Version: TLS 1.3", status: "allowed", layers: ["Frame 3", "Ethernet II", "IPv4", "TCP", "TLS"] },
  { id: "pkt-004", timestamp: "10:42:03.015", source: "10.42.0.18", destination: "10.42.0.10", protocol: "HTTP", port: 80, length: 824, info: "GET /login HTTP/1.1", payload: "GET /login HTTP/1.1\r\nHost: snow-lab.local\r\nUser-Agent: SnowOperator/4.0", status: "observed", layers: ["Frame 4", "Ethernet II", "IPv4", "TCP", "HTTP"] },
  { id: "pkt-005", timestamp: "10:42:03.042", source: "10.42.0.10", destination: "10.42.0.18", protocol: "HTTP", port: 80, length: 1240, info: "HTTP/1.1 200 OK (text/html)", payload: "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nServer: nginx/1.24 (snow-lab)", status: "allowed", layers: ["Frame 5", "Ethernet II", "IPv4", "TCP", "HTTP"] },
  { id: "pkt-006", timestamp: "10:42:04.201", source: "10.42.0.1", destination: "10.42.0.10", protocol: "DNS", port: 53, length: 164, info: "Standard query 0x1a2b A snow-lab.local", payload: "Query: snow-lab.local · Answer: 10.42.0.10", status: "allowed", layers: ["Frame 6", "Ethernet II", "IPv4", "UDP", "DNS"] },
  { id: "pkt-007", timestamp: "10:42:05.882", source: "10.42.0.27", destination: "10.42.0.14", protocol: "SSH", port: 22, length: 320, info: "SSH-2.0-OpenSSH_9.2p1 AUTH ATTEMPT operator", payload: "Client: SSH-2.0-OpenSSH_9.2p1 · User: operator", status: "blocked", suspicious: true, layers: ["Frame 7", "Ethernet II", "IPv4", "TCP", "SSH"] },
  { id: "pkt-008", timestamp: "10:42:06.901", source: "10.42.0.10", destination: "10.42.0.19", protocol: "TLS", port: 5432, length: 618, info: "Encrypted PostgreSQL Query Session", payload: "Application Data: [Encrypted PostgreSQL Query Payload]", status: "observed", layers: ["Frame 8", "Ethernet II", "IPv4", "TCP", "TLS"] },
];

export const INITIAL_EVENTS: SecurityEvent[] = [
  { id: "evt-001", timestamp: "10:42:00", type: "SYSTEM", severity: "success", source: "OPERATIONS CORE", message: "SNOW WORKSTATION INITIALIZED / DETERMINISTIC SANDBOX CONNECTED" },
  { id: "evt-002", timestamp: "10:42:02", type: "POLICY", severity: "notice", source: "SAFETY ENGINE", message: "EXTERNAL RECON DISABLED / SANDBOX OPERATES ON LOCAL SYNTHETIC FIXTURES" },
  { id: "evt-003", timestamp: "10:42:05", type: "NETWORK", severity: "info", source: "PACKET SENSOR", message: "SYNTHETIC PACKET STREAM ONLINE / DISPLAY FILTERS READY" },
];

export const INITIAL_MISSION: SecurityMission = {
  id: "black-ice-001",
  title: "BLACK ICE",
  flag: "SNOW{BLACK_ICE_OPERATIONAL_COMPLETE}",
  stages: [
    { id: "stage-1", label: "Stage 01: Reconnaissance", description: "Enumerate lab-gateway.snow.local ports and services.", status: "in-progress" },
    { id: "stage-2", label: "Stage 02: Access & Credentials", description: "Run Brute Force attack on lab-auth.snow.local (SSH).", status: "locked" },
    { id: "stage-3", label: "Stage 03: Hash Cracking", description: "Crack target bcrypt hash with John/Hashcat workstation.", status: "locked" },
    { id: "stage-4", label: "Stage 04: Packet Inspection", description: "Analyze HTTP/TLS synthetic traffic in Wireshark Packet Lab.", status: "locked" },
    { id: "stage-5", label: "Stage 05: Web Security", description: "Simulate SQL Injection against snow-lab.local/login.", status: "locked" },
    { id: "stage-6", label: "Stage 06: Exploitation & Flag", description: "Establish Snowploit session and retrieve target flag.", status: "locked" },
  ],
};

export const INITIAL_FORENSICS: ForensicsArtifact[] = [
  { id: "art-1", timestamp: "10:38:14", artifactType: "LOG_ENTRY", title: "/var/log/auth.log", description: "Repeated failed SSH authentication attempts from IP 10.42.0.27 targeting user 'operator'.", analysis: "Indicates automated dictionary brute-force spray against operator account.", flagged: true },
  { id: "art-2", timestamp: "10:39:01", artifactType: "MEMORY_DUMP", title: "Memory Region 0x7fff4a20", description: "Extracted process string: 'SNOW_AUTH_SECRET_TOKEN=snow-lab-2025!'", analysis: "Plaintext credential artifact residing in memory buffer.", flagged: true },
  { id: "art-3", timestamp: "10:39:45", artifactType: "NETWORK_SOCKET", title: "Established Socket 10.42.0.10:443 -> 10.42.0.19:5432", description: "Active DB connection carrying sanitized queries.", analysis: "Standard app-to-database communication pipeline.", flagged: false },
  { id: "art-4", timestamp: "10:40:10", artifactType: "FILE_HASH", title: "/bin/snow-daemon SHA-256", description: "Hash match: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", analysis: "Verified binary integrity matching canonical release.", flagged: false },
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
    mission: JSON.parse(JSON.stringify(INITIAL_MISSION)),
    events: JSON.parse(JSON.stringify(INITIAL_EVENTS)),

    bruteForce: {
      config: {
        target: "lab-auth.snow.local",
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
        totalCandidates: 10000,
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
        target: "lab-auth.snow.local",
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
        target: "lab-gateway.snow.local",
        command: "nmap -sV -O lab-gateway.snow.local",
        scanType: "Service Detection",
        timing: "T3 Normal",
      },
      state: {
        status: "idle",
        progress: 0,
        currentPhase: "STANDBY",
        hostsFound: 2,
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
      targetUrl: "https://snow-lab.local/login",
      method: "POST",
      payload: "' OR '1'='1",
      intercepted: false,
      lastResponse: {
        status: 200,
        headers: { "content-type": "application/json", "server": "nginx/1.24 (snow-lab)" },
        body: '{"status":"success","user":"admin","role":"administrator","flag":"SNOW{SQLI_BYPASS_SUCCESS}"}',
        finding: "Boolean SQL Injection confirmed on parameter 'q' / 'username'.",
        remediation: "Use parameterized queries (PDO / Prepared Statements) and sanitize input.",
      },
    },

    snowploit: {
      selectedModule: "exploit/web/sno_2026_001_auth_bypass",
      target: "lab-web-01.snow.local",
      commandHistory: ["help"],
      consoleLogs: ["snowploit > ready"],
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
  "help                 list available workstation commands",
  "status               print operator workstation state",
  "run                  run active operation",
  "pause                pause active operation",
  "resume               resume active operation",
  "stop                 stop active operation",
  "reset                reset workstation simulation state",
  "recon                open Network Recon Engine",
  "bruteforce           open Brute Force Auth Engine",
  "crack / hashcat      open Hash Cracker Workstation",
  "medusa / hydra       open Multi-Threaded Auth Tester",
  "packets / wireshark  open Wireshark Packet Lab",
  "web                  open Web Security Sandbox",
  "snowploit            open Snowploit Console",
  "forensics            open Digital Forensics Station",
  "mission / blackice   open Operation Black Ice",
  "targets              list active Snow sandbox targets",
  "clear                clear terminal screen",
];

export function commandOutput(command: string): string[] {
  const normalized = command.trim().toLowerCase();
  if (normalized === "help") return ["AVAILABLE WORKSTATION COMMANDS", ...HELP_COMMANDS];
  if (normalized === "status")
    return [
      "WORKSTATION STATUS",
      "MODE ........ ISOLATED CONTROLLED SIMULATION",
      "TARGETS ..... FICTIONAL SNOW MOCK SUITE",
      "SAFETY ...... ISOLATED / NO EXTERNAL NETWORK ATTEMPTS",
      "MATRIX ENGINE ONLINE",
    ];
  if (normalized === "targets")
    return [
      "ACTIVE SANDBOX TARGETS:",
      "10.42.0.1   lab-gateway.snow.local   Gateway Router (DNS, HTTP, HTTPS)",
      "10.42.0.10  lab-web-01.snow.local    Web Application Server (snow-lab.local)",
      "10.42.0.12  lab-api-01.snow.local    Internal Microservices Gateway",
      "10.42.0.14  lab-auth.snow.local      Authentication Gateway (SSH 22)",
      "10.42.0.19  lab-db-01.snow.local     PostgreSQL Database Cluster",
    ];
  if (normalized === "clear") return [];

  return [
    `EXECUTED COMMAND: ${command}`,
    "Command dispatched to active operation state machine.",
  ];
}
