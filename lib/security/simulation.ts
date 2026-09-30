export type SecurityOperation = "recon" | "credentials" | "packets" | "firewall" | "web" | "forensics" | "missions";
export type SecuritySeverity = "info" | "notice" | "warning" | "critical" | "success";

export type SimulatedHost = {
  id: string;
  address: string;
  hostname: string;
  services: string[];
  status: "online" | "offline" | "filtered";
  x: number;
  y: number;
};

export type SecurityEvent = {
  id: string;
  timestamp: string;
  type: string;
  severity: SecuritySeverity;
  source: string;
  message: string;
};

export type SimulatedPacket = {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  protocol: "TCP" | "TLS" | "HTTP" | "DNS" | "ICMP" | "SSH";
  port?: number;
  size: number;
  payload: string;
  status: "observed" | "allowed" | "blocked";
};

export const SIMULATED_HOSTS: SimulatedHost[] = [
  { id: "internet", address: "10.42.0.254", hostname: "INTERNET", services: ["ROUTE"], status: "online", x: 50, y: 10 },
  { id: "edge", address: "10.42.0.1", hostname: "EDGE", services: ["443 HTTPS", "53 DNS"], status: "online", x: 50, y: 29 },
  { id: "web", address: "10.42.0.7", hostname: "WEB-01", services: ["22 SSH", "80 HTTP", "443 HTTPS"], status: "online", x: 26, y: 51 },
  { id: "api", address: "10.42.0.12", hostname: "API-01", services: ["443 HTTPS", "8080 API"], status: "online", x: 74, y: 51 },
  { id: "db", address: "10.42.0.19", hostname: "DB-01", services: ["3306 MYSQL"], status: "filtered", x: 74, y: 78 },
  { id: "admin", address: "10.42.0.25", hostname: "ADMIN", services: ["22 SSH"], status: "offline", x: 26, y: 78 },
];

export const SIMULATED_PACKETS: SimulatedPacket[] = [
  { id: "pkt-001", timestamp: "12:41:02", source: "WEB-01", destination: "API-01", protocol: "TCP", port: 443, size: 1280, payload: "GET /demo/telemetry", status: "observed" },
  { id: "pkt-002", timestamp: "12:41:02", source: "API-01", destination: "DB-01", protocol: "TLS", port: 3306, size: 840, payload: "SELECT simulation_state", status: "allowed" },
  { id: "pkt-003", timestamp: "12:41:03", source: "EDGE", destination: "WEB-01", protocol: "HTTP", port: 80, size: 512, payload: "GET /lab/entry", status: "observed" },
  { id: "pkt-004", timestamp: "12:41:04", source: "WEB-01", destination: "API-01", protocol: "TCP", port: 8080, size: 1460, payload: "POST /demo/event", status: "observed" },
  { id: "pkt-005", timestamp: "12:41:05", source: "EDGE", destination: "API-01", protocol: "DNS", port: 53, size: 164, payload: "A sandbox.snow.lab", status: "allowed" },
  { id: "pkt-006", timestamp: "12:41:06", source: "ADMIN", destination: "EDGE", protocol: "SSH", port: 22, size: 320, payload: "SSH handshake / synthetic", status: "blocked" },
  { id: "pkt-007", timestamp: "12:41:07", source: "API-01", destination: "DB-01", protocol: "ICMP", size: 96, payload: "echo request / demo", status: "observed" },
  { id: "pkt-008", timestamp: "12:41:08", source: "WEB-01", destination: "EDGE", protocol: "TLS", port: 443, size: 2048, payload: "TLS application data / synthetic", status: "allowed" },
];

export const INITIAL_EVENTS: SecurityEvent[] = [
  { id: "evt-001", timestamp: "12:40:58", type: "SYSTEM", severity: "success", source: "CORE", message: "LAB INITIALIZED / SANDBOX DATA LOADED" },
  { id: "evt-002", timestamp: "12:41:01", type: "POLICY", severity: "notice", source: "GUARDRAIL", message: "EXTERNAL TARGETS DISABLED / LOCAL SIMULATION ONLY" },
  { id: "evt-003", timestamp: "12:41:04", type: "NETWORK", severity: "info", source: "SENSOR", message: "SYNTHETIC PACKET STREAM STANDING BY" },
  { id: "evt-004", timestamp: "12:41:07", type: "MISSION", severity: "info", source: "BLACK ICE", message: "OBJECTIVES AVAILABLE / OPERATION 001" },
];

export const OPERATION_META: Array<{ id: SecurityOperation; number: string; label: string; description: string; available: boolean }> = [
  { id: "recon", number: "01", label: "RECON", description: "Network discovery", available: true },
  { id: "credentials", number: "02", label: "CREDENTIALS", description: "Password attack simulation", available: true },
  { id: "packets", number: "03", label: "PACKETS", description: "Packet inspection", available: true },
  { id: "firewall", number: "04", label: "FIREWALL", description: "Defensive traffic simulation", available: true },
  { id: "web", number: "05", label: "WEB", description: "Web attack laboratory", available: false },
  { id: "forensics", number: "06", label: "FORENSICS", description: "Digital investigation", available: false },
  { id: "missions", number: "07", label: "MISSIONS", description: "Multi-stage operations", available: true },
];

export const HELP_LINES = [
  "help                 list available sandbox operations",
  "scan --demo          discover fictional hosts and services",
  "recon --demo         open the recon operation",
  "password --demo      run a simulated credential lab",
  "packets --demo       inspect a synthetic packet stream",
  "firewall --demo      trigger defensive traffic simulation",
  "mission --list       show Operation 001 objectives",
  "status               print local simulation status",
  "whoami               identify the demo operator",
  "clear                clear terminal output",
];

export const COMMAND_ALIASES: Record<string, SecurityOperation> = {
  "scan --demo": "recon",
  "recon --demo": "recon",
  "password --demo": "credentials",
  "packets --demo": "packets",
  "firewall --demo": "firewall",
  "mission --list": "missions",
};

export function commandOutput(command: string): string[] {
  const normalized = command.trim().toLowerCase();
  if (normalized === "help") return ["AVAILABLE OPERATIONS", ...HELP_LINES];
  if (normalized === "status") return ["SIMULATION STATUS", "MODE ........ CONTROLLED DEMO", "TARGET ...... SNOW-GENERATED DATA", "NETWORK ..... ISOLATED", "TELEMETRY ... DISABLED"];
  if (normalized === "whoami") return ["OPERATOR ID . SNOW / VISITOR", "CLEARANCE ... DEMO ONLY", "SCOPE ....... FICTIONAL LAB ENVIRONMENT"];
  if (normalized === "clear") return [];
  if (COMMAND_ALIASES[normalized]) return [`OPERATION QUEUED // ${COMMAND_ALIASES[normalized].toUpperCase()}`, "SIMULATION CLOCK SYNCHRONIZED"];
  return [`UNKNOWN COMMAND: ${command}`, "TYPE 'help' FOR AVAILABLE SANDBOX OPERATIONS"];
}

export const RECON_OUTPUT = [
  "DISCOVERY STARTED // SIMULATED NETWORK",
  "10.42.0.1    EDGE       ONLINE",
  "10.42.0.7    WEB-01     ONLINE",
  "10.42.0.12   API-01     ONLINE",
  "10.42.0.19   DB-01      FILTERED",
  "PORTS  22 SSH  ·  80 HTTP  ·  443 HTTPS  ·  3306 MYSQL",
  "SCAN COMPLETE // 4 HOSTS // 11 SERVICES // NO EXTERNAL TRAFFIC",
];

export const CREDENTIAL_OUTPUT = [
  "CREDENTIAL LAB // SANDBOX-AUTH",
  "HASH .......... SIMULATED",
  "ENGINE ........ WORDLIST / DEMO",
  "ATTEMPTS ...... 000124 · 000125 · 000126",
  "RATE .......... 148,221 H/s (CINEMATIC METRIC)",
  "MATCH FOUND ... snow-lab-demo",
  "NO REAL PASSWORD ACCEPTED OR TRANSMITTED",
];

export const PACKET_OUTPUT = [
  "CAPTURE // SIMULATED ETH0",
  "SOURCE ........ SNOW-GENERATED PACKET STREAM",
  "FILTER ........ NONE",
  "8 SYNTHETIC FRAMES OBSERVED",
  "PAYLOADS ...... REDACTED / FICTIONAL",
];

export const FIREWALL_OUTPUT = [
  "DEFENSE LOOP STARTED // SIMULATED TRAFFIC",
  "IDS ........... ANOMALY SIGNATURE DETECTED",
  "FIREWALL ...... BLOCKED ADMIN → EDGE / SSH",
  "COUNTERS ...... 07 ALLOWED · 01 BLOCKED",
  "DEFENSE LOOP COMPLETE // NO REAL TRAFFIC INSPECTED",
];
