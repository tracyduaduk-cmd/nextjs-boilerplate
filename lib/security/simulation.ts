export type SecurityMode = "red" | "blue";
export type SecurityOperation = "recon" | "credentials" | "auth" | "packets" | "web" | "exploit" | "defense" | "ids" | "missions";
export type SecuritySeverity = "info" | "notice" | "warning" | "critical" | "success";
export type HostStatus = "online" | "offline" | "filtered" | "compromised" | "isolated";
export type PacketProtocol = "TCP" | "TLS" | "HTTP" | "DNS" | "ICMP" | "SSH";

export type SecurityService = { port: number; protocol: string; name: string; state: "open" | "filtered" | "closed" };
export type SecurityHost = { id: string; address: string; hostname: string; role: string; status: HostStatus; x: number; y: number; services: SecurityService[]; discovered: boolean };
export type SecurityCredential = { id: string; target: string; username: string; hashType: string; hash: string; candidateCount: number; discovered: boolean };
export type SecurityVulnerability = { id: string; hostId: string; title: string; severity: "LOW" | "MEDIUM" | "HIGH"; description: string; discovered: boolean };
export type SecurityPacket = { id: string; timestamp: string; source: string; destination: string; protocol: PacketProtocol; port?: number; length: number; info: string; payload: string; status: "observed" | "allowed" | "blocked"; suspicious?: boolean; layers: string[] };
export type SecurityAlert = { id: string; timestamp: string; type: string; severity: SecuritySeverity; source: string; target: string; rule: string; response: string; resolved: boolean };
export type SecuritySession = { id: string; target: string; module: string; status: "active" | "background" | "closed"; createdAt: string };
export type SecurityAttack = { id: string; kind: string; target: string; strategy: string; progress: number; status: "ready" | "running" | "success" | "blocked"; detected: boolean };
export type SecurityDefense = { blockedHosts: string[]; isolatedHosts: string[]; lockedAccounts: string[]; rateLimited: string[]; quarantinedServices: string[] };
export type SecurityMission = { id: string; title: string; stages: Array<{ id: string; label: string; status: "locked" | "in-progress" | "complete" }>; flag: string };
export type SecurityEvent = { id: string; timestamp: string; type: string; severity: SecuritySeverity; source: string; message: string };

export type SecuritySimulationState = {
  mode: SecurityMode;
  operation: SecurityOperation;
  hosts: SecurityHost[];
  credentials: SecurityCredential[];
  vulnerabilities: SecurityVulnerability[];
  packets: SecurityPacket[];
  alerts: SecurityAlert[];
  sessions: SecuritySession[];
  attacks: SecurityAttack[];
  defense: SecurityDefense;
  mission: SecurityMission;
  events: SecurityEvent[];
  scanProgress: number;
  clock: number;
};

const SERVICES: SecurityService[] = [
  { port: 22, protocol: "SSH", name: "Secure Shell", state: "open" }, { port: 53, protocol: "DNS", name: "Name Service", state: "open" },
  { port: 80, protocol: "HTTP", name: "Web Gateway", state: "open" }, { port: 443, protocol: "HTTPS", name: "TLS Web", state: "open" }, { port: 5432, protocol: "PostgreSQL", name: "Data Store", state: "filtered" },
];
export const INITIAL_HOSTS: SecurityHost[] = [
  { id: "gateway", address: "10.42.0.1", hostname: "GATEWAY", role: "edge router", status: "online", x: 50, y: 10, services: SERVICES.slice(1, 2), discovered: true },
  { id: "web-01", address: "10.42.0.10", hostname: "WEB-01", role: "application edge", status: "online", x: 24, y: 42, services: [SERVICES[0], SERVICES[2], SERVICES[3]], discovered: false },
  { id: "api-01", address: "10.42.0.12", hostname: "API-01", role: "service mesh", status: "online", x: 76, y: 42, services: [SERVICES[3], { port: 8080, protocol: "API", name: "Control API", state: "open" }], discovered: false },
  { id: "auth-01", address: "10.42.0.14", hostname: "AUTH-01", role: "identity service", status: "online", x: 24, y: 75, services: [SERVICES[0], SERVICES[3]], discovered: false },
  { id: "db-01", address: "10.42.0.19", hostname: "DB-01", role: "data store", status: "filtered", x: 76, y: 75, services: [SERVICES[4]], discovered: false },
  { id: "workstation-01", address: "10.42.0.27", hostname: "WORKSTATION-01", role: "operator node", status: "offline", x: 50, y: 92, services: [SERVICES[0]], discovered: false },
  { id: "ids", address: "10.42.0.250", hostname: "IDS-SENSOR", role: "defensive sensor", status: "online", x: 88, y: 12, services: [{ port: 9001, protocol: "SENSOR", name: "Event bus", state: "open" }], discovered: true },
];
export const INITIAL_CREDENTIALS: SecurityCredential[] = [
  { id: "cred-auth", target: "AUTH-01", username: "snow", hashType: "bcrypt", hash: "$2b$12$SNOW.SIM.AUTH.001", candidateCount: 48192, discovered: false },
  { id: "cred-web", target: "WEB-01", username: "operator", hashType: "sha256", hash: "SNOW-SHA256-DEMO-7A", candidateCount: 12000, discovered: false },
  { id: "cred-db", target: "DATABASE", username: "snow_reader", hashType: "argon2id", hash: "SNOW-ARGON-DEMO-19", candidateCount: 6400, discovered: false },
];
export const INITIAL_VULNERABILITIES: SecurityVulnerability[] = [
  { id: "vuln-web-auth", hostId: "web-01", title: "Demo auth bypass", severity: "HIGH", description: "Fictional login flow accepts the lab's safe bypass fixture.", discovered: false },
  { id: "vuln-api-rate", hostId: "api-01", title: "Missing rate limit", severity: "MEDIUM", description: "Synthetic API can trigger a defensive alert in the sandbox.", discovered: false },
  { id: "vuln-db-exposure", hostId: "db-01", title: "Filtered database service", severity: "LOW", description: "PostgreSQL is visible only as a filtered service in the lab.", discovered: false },
];
export const INITIAL_PACKETS: SecurityPacket[] = [
  { id: "pkt-001", timestamp: "10:42:18.104", source: "10.42.0.12", destination: "10.42.0.10", protocol: "TCP", port: 443, length: 512, info: "SYN · session negotiation", payload: "Flags: SYN | Window: 64240", status: "observed", layers: ["FRAME", "ETHERNET", "IP", "TCP"] },
  { id: "pkt-002", timestamp: "10:42:18.109", source: "10.42.0.10", destination: "10.42.0.12", protocol: "TCP", port: 443, length: 512, info: "SYN, ACK · session accepted", payload: "Flags: SYN, ACK | Window: 65160", status: "allowed", layers: ["FRAME", "ETHERNET", "IP", "TCP"] },
  { id: "pkt-003", timestamp: "10:42:18.310", source: "10.42.0.10", destination: "10.42.0.12", protocol: "HTTP", port: 8080, length: 824, info: "POST /demo/event", payload: "POST /demo/event HTTP/1.1 · synthetic", status: "observed", layers: ["FRAME", "ETHERNET", "IP", "TCP", "APPLICATION"] },
  { id: "pkt-004", timestamp: "10:42:18.441", source: "10.42.0.1", destination: "10.42.0.10", protocol: "DNS", port: 53, length: 164, info: "A sandbox.snow.lab", payload: "Query: sandbox.snow.lab · Answer: 10.42.0.10", status: "allowed", layers: ["FRAME", "ETHERNET", "IP", "UDP", "APPLICATION"] },
  { id: "pkt-005", timestamp: "10:42:19.021", source: "10.42.0.10", destination: "10.42.0.12", protocol: "TLS", port: 443, length: 1240, info: "Client Hello · TLS 1.3", payload: "SNI: api.snow.lab · cipher: TLS_AES_256_GCM_SHA384", status: "allowed", layers: ["FRAME", "ETHERNET", "IP", "TCP", "APPLICATION"] },
  { id: "pkt-006", timestamp: "10:42:19.882", source: "10.42.0.27", destination: "10.42.0.14", protocol: "SSH", port: 22, length: 320, info: "AUTH ATTEMPT · IDS MARKER", payload: "Username set: admin, operator, snow · synthetic", status: "blocked", suspicious: true, layers: ["FRAME", "ETHERNET", "IP", "TCP", "APPLICATION"] },
  { id: "pkt-007", timestamp: "10:42:20.130", source: "10.42.0.12", destination: "10.42.0.19", protocol: "TLS", port: 5432, length: 840, info: "Encrypted database traffic", payload: "Application data redacted · simulation only", status: "allowed", layers: ["FRAME", "ETHERNET", "IP", "TCP", "APPLICATION"] },
  { id: "pkt-008", timestamp: "10:42:20.901", source: "10.42.0.10", destination: "10.42.0.1", protocol: "HTTP", port: 80, length: 618, info: "GET /lab/entry · IDS MARKER", payload: "GET /lab/entry HTTP/1.1 · referrer: snow.lab", status: "observed", suspicious: true, layers: ["FRAME", "ETHERNET", "IP", "TCP", "APPLICATION"] },
];
export const INITIAL_EVENTS: SecurityEvent[] = [
  { id: "evt-001", timestamp: "10:42:00", type: "SYSTEM", severity: "success", source: "CORE", message: "LAB INITIALIZED / DETERMINISTIC SANDBOX DATA LOADED" },
  { id: "evt-002", timestamp: "10:42:01", type: "POLICY", severity: "notice", source: "GUARDRAIL", message: "EXTERNAL TARGETS DISABLED / LOCAL SIMULATION ONLY" },
  { id: "evt-003", timestamp: "10:42:04", type: "NETWORK", severity: "info", source: "SENSOR", message: "SYNTHETIC PACKET STREAM STANDING BY" },
];
export const INITIAL_MISSION: SecurityMission = { id: "black-ice-001", title: "BLACK ICE", flag: "SNOW{BLACK_ICE_SIMULATION}", stages: [
  { id: "recon", label: "Discover exposed services", status: "in-progress" }, { id: "enumerate", label: "Identify the vulnerable service", status: "locked" }, { id: "access", label: "Simulate initial access", status: "locked" }, { id: "detect", label: "Avoid IDS detection", status: "locked" }, { id: "defense", label: "Respond and contain the event", status: "locked" }, { id: "extract", label: "Extract the simulated flag", status: "locked" },
]};
export const OPERATION_META: Array<{ id: SecurityOperation; number: string; label: string; description: string; group: "LIVE SIMULATION" | "DEFENSIVE SIMULATION" | "MISSION" }> = [
  { id: "recon", number: "01", label: "RECON", description: "Host & service discovery", group: "LIVE SIMULATION" }, { id: "credentials", number: "02", label: "CREDENTIALS", description: "Fictional hash lab", group: "LIVE SIMULATION" }, { id: "auth", number: "03", label: "AUTH ATTACK", description: "Protocol attempt stream", group: "LIVE SIMULATION" }, { id: "packets", number: "04", label: "PACKETS", description: "Synthetic inspection", group: "LIVE SIMULATION" }, { id: "web", number: "05", label: "WEB LAB", description: "Controlled app sandbox", group: "LIVE SIMULATION" }, { id: "exploit", number: "06", label: "EXPLOIT", description: "Snowploit console", group: "LIVE SIMULATION" }, { id: "defense", number: "07", label: "FIREWALL", description: "Contain synthetic traffic", group: "DEFENSIVE SIMULATION" }, { id: "ids", number: "08", label: "IDS", description: "Alert triage & response", group: "DEFENSIVE SIMULATION" }, { id: "missions", number: "09", label: "MISSIONS", description: "Black Ice progression", group: "MISSION" },
];
export const initialSimulationState = (): SecuritySimulationState => ({ mode: "red", operation: "recon", hosts: INITIAL_HOSTS.map((host) => ({ ...host, services: host.services.map((service) => ({ ...service })) })), credentials: INITIAL_CREDENTIALS.map((credential) => ({ ...credential })), vulnerabilities: INITIAL_VULNERABILITIES.map((vulnerability) => ({ ...vulnerability })), packets: INITIAL_PACKETS.map((packet) => ({ ...packet, layers: [...packet.layers] })), alerts: [], sessions: [], attacks: [], defense: { blockedHosts: [], isolatedHosts: [], lockedAccounts: [], rateLimited: [], quarantinedServices: [] }, mission: JSON.parse(JSON.stringify(INITIAL_MISSION)) as SecurityMission, events: [...INITIAL_EVENTS], scanProgress: 0, clock: 1 });
export const HELP_LINES = ["help                 list available sandbox operations", "status               print local simulation status", "network              print the fictional topology", "hosts                list discovered hosts", "scan --demo          run the deterministic recon simulation", "ports web-01         inspect fictional services", "credentials          open the credential simulator", "attack --demo        run the auth attack simulator", "packets --filter tcp inspect synthetic packets", "web --demo           open the web security sandbox", "exploit --demo       open the Snowploit console", "firewall             open defensive controls", "alerts               open IDS alerts", "mission --status     show Black Ice progression", "redteam / blueteam   switch operating mode", "clear                clear terminal output"];
export const COMMAND_ALIASES: Record<string, SecurityOperation> = { "scan --demo": "recon", "recon --demo": "recon", "ports web-01": "recon", credentials: "credentials", "password --demo": "credentials", "attack --demo": "auth", auth: "auth", packets: "packets", "packets --demo": "packets", web: "web", "web --demo": "web", exploit: "exploit", "exploit --demo": "exploit", firewall: "defense", alerts: "ids", ids: "ids", mission: "missions", "mission --list": "missions", "mission --status": "missions" };
export function commandOutput(command: string): string[] {
  const normalized = command.trim().toLowerCase();
  if (normalized === "help") return ["AVAILABLE OPERATIONS", ...HELP_LINES];
  if (normalized === "status") return ["SIMULATION STATUS", "MODE ........ CONTROLLED DEMO", "TARGET ...... SNOW-GENERATED DATA", "NETWORK ..... ISOLATED", "TELEMETRY ... DISABLED", "EVENT BUS ... LOCAL ONLY"];
  if (normalized === "network") return ["SNOW SIMULATION / 10.42.0.0/24", "GATEWAY → WEB-01 → API-01 → DB-01", "          ↘ AUTH-01", "IDS + FIREWALL / DEFENSIVE CONTROL PLANE"];
  if (normalized === "hosts") return INITIAL_HOSTS.filter((host) => host.discovered).map((host) => `${host.address.padEnd(14)} ${host.hostname.padEnd(16)} ${host.status.toUpperCase()}`);
  if (normalized === "clear") return [];
  if (normalized === "redteam") return ["MODE SWITCHED // RED TEAM / ATTACK SIMULATION"];
  if (normalized === "blueteam") return ["MODE SWITCHED // BLUE TEAM / DEFENSE RESPONSE"];
  if (normalized === "firewall") return ["DEFENSE CONTROL // SELECT AN ACTION IN THE BLUE TEAM PANEL"];
  if (COMMAND_ALIASES[normalized]) return [`OPERATION QUEUED // ${COMMAND_ALIASES[normalized].toUpperCase()}`, "SIMULATION CLOCK SYNCHRONIZED", "ALL OUTPUT IS FICTIONAL / LOCAL / DETERMINISTIC"];
  return [`UNKNOWN COMMAND: ${command}`, "TYPE 'help' FOR AVAILABLE SANDBOX OPERATIONS"];
}
export const RECON_OUTPUT = ["RECON ENGINE // SNOWMAP-SIM", "TARGET 10.42.0.0/24 / FICTIONAL SCOPE", "DISCOVERY 10.42.0.10 WEB-01 UP", "DISCOVERY 10.42.0.12 API-01 UP", "DISCOVERY 10.42.0.14 AUTH-01 UP", "DISCOVERY 10.42.0.19 DB-01 FILTERED", "PORT 22 SSH · 80 HTTP · 443 HTTPS · 5432 POSTGRESQL", "OS FINGERPRINT // SNOW LINUX SIM 2.4 / CONFIDENCE 94%", "SCAN COMPLETE // 6 HOSTS / 14 SERVICES / NO EXTERNAL TRAFFIC"];
export const CREDENTIAL_OUTPUT = ["HASHCORE-SIM // SANDBOX AUTH", "TARGET AUTH-01 / USER snow", "MODE DICTIONARY + RULES / CANDIDATES 48,192", "PROGRESS 71.4% / RATE 18,420 candidates/s", "MATCH FOUND // snow-lab-demo", "NO REAL PASSWORD ACCEPTED OR TRANSMITTED"];
export const AUTH_OUTPUT = ["AUTHSTREAM-SIM // AUTH-01", "PROTOCOL SSH / THREADS 8 / ATTEMPTS 124 / 640", "admin ........ FAILURE", "operator ..... FAILURE", "snow ......... MATCHED FIXTURE", "IDS ALERT // RATE LIMIT + ACCOUNT LOCK SIMULATED"];
export const PACKET_OUTPUT = ["PACKET LAB // SYNTHETIC SENSOR 01", "8 SYNTHETIC FRAMES OBSERVED / DISPLAY FILTER READY", "TCP · HTTP · DNS · TLS · SSH / PAYLOADS FICTIONAL", "IDS MARKERS PRESENT ON 2 FRAMES / NO CAPTURE DEVICE ACCESS"];
export const FIREWALL_OUTPUT = ["DEFENSE LOOP // LOCAL POLICY ENGINE", "IDS SIGNATURE MATCH / AUTH ATTACK", "RESPONSE AVAILABLE // BLOCK SOURCE / ISOLATE HOST / RATE LIMIT", "NO REAL TRAFFIC INSPECTED OR MODIFIED"];
