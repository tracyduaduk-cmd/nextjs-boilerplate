"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { SecurityEventStream } from "@/components/security/SecurityEventStream";
import { SecurityMatrix } from "@/components/security/SecurityMatrix";
import { SecurityNetwork } from "@/components/security/SecurityNetwork";
import { SecurityOperationPanel } from "@/components/security/SecurityOperationPanel";
import { SecurityTerminal } from "@/components/security/SecurityTerminal";
import {
  initialSimulationState,
  commandOutput,
  type OperationCategory,
  type OperationStatus,
  type SecurityEvent,
  type SecuritySimulationState,
  formatSimulationTimestamp,
  type SecuritySession,
} from "@/lib/security/simulation";

const INITIAL_TERMINAL = [
  "SNOW SECURITY LAB // OPERATOR WORKSTATION v6.0",
  "CYBER RANGE 10.44.0.0/24 CONNECTED // ISOLATED SIMULATION",
  "DETERMINISTIC EVENT ENGINE ONLINE",
  "Type 'help' or select an operation below to execute.",
  "",
];

type Action =
  | { type: "TICK" }
  | { type: "SET_CATEGORY"; category: OperationCategory }
  | { type: "SET_ACTIVE_OP"; opId: string }
  | { type: "SELECT_HOST"; hostId: string }
  | { type: "SELECT_SESSION"; sessionId: string }
  | { type: "SELECT_MISSION"; missionId: string }
  | { type: "START_OP" }
  | { type: "PAUSE_OP" }
  | { type: "RESUME_OP" }
  | { type: "STOP_OP" }
  | { type: "RESET_OP" }
  | { type: "UPDATE_BRUTE_FORCE"; config: Partial<SecuritySimulationState["bruteForce"]["config"]> }
  | { type: "UPDATE_JOHN_HASHCAT"; config: Partial<SecuritySimulationState["johnHashcat"]["config"]> }
  | { type: "UPDATE_MEDUSA_HYDRA"; config: Partial<SecuritySimulationState["medusaHydra"]["config"]> }
  | { type: "UPDATE_RECON"; config: Partial<SecuritySimulationState["recon"]["config"]> }
  | { type: "FILTER_PACKETS"; filter: SecuritySimulationState["packetLab"]["filter"] }
  | { type: "SELECT_PACKET"; packetId: string }
  | { type: "UPDATE_WEB_LAB"; update: Partial<SecuritySimulationState["webLab"]> }
  | { type: "EXECUTE_SNOWPLOIT"; cmd: string }
  | { type: "SELECT_FORENSIC"; id: string }
  | { type: "ADD_EVENT"; event: Omit<SecurityEvent, "id"> };

function addEvent(
  state: SecuritySimulationState,
  type: string,
  severity: SecurityEvent["severity"],
  source: string,
  message: string
): SecuritySimulationState {
  const timestamp = formatSimulationTimestamp(state.clock);
  return {
    ...state,
    events: [
      ...state.events,
      { id: `evt-${state.events.length + 1}`, timestamp, type, severity, source, message },
    ],
  };
}

function updateActiveMissionStage(
  state: SecuritySimulationState,
  stageIndex: number,
  status: "complete" | "in-progress" | "locked"
): SecuritySimulationState {
  const missions = state.missions.map((m) => {
    if (m.id !== state.activeMissionId) return m;
    const stages = m.stages.map((stg, idx) => {
      if (idx === stageIndex) return { ...stg, status };
      if (idx === stageIndex + 1 && status === "complete" && stg.status === "locked") {
        return { ...stg, status: "in-progress" as const };
      }
      return stg;
    });
    const allComplete = stages.every((s) => s.status === "complete");
    return { ...m, stages, status: allComplete ? ("completed" as const) : m.status };
  });
  return { ...state, missions };
}

function reducer(state: SecuritySimulationState, action: Action): SecuritySimulationState {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.category,
        activeOpId:
          action.category === "recon"
            ? "nmap-recon"
            : action.category === "credentials"
            ? "brute-force"
            : action.category === "network"
            ? "wireshark-packets"
            : action.category === "web"
            ? "web-interceptor"
            : action.category === "exploitation"
            ? "snowploit-console"
            : action.category === "forensics"
            ? "forensics-investigator"
            : "black-ice-mission",
      };

    case "SET_ACTIVE_OP":
      return { ...state, activeOpId: action.opId };

    case "SELECT_HOST":
      return { ...state, selectedHostId: action.hostId };

    case "SELECT_SESSION":
      return { ...state, selectedSessionId: action.sessionId };

    case "SELECT_MISSION":
      return { ...state, activeMissionId: action.missionId };

    case "UPDATE_BRUTE_FORCE":
      return {
        ...state,
        bruteForce: { ...state.bruteForce, config: { ...state.bruteForce.config, ...action.config } },
      };

    case "UPDATE_JOHN_HASHCAT":
      return {
        ...state,
        johnHashcat: { ...state.johnHashcat, config: { ...state.johnHashcat.config, ...action.config } },
      };

    case "UPDATE_MEDUSA_HYDRA":
      return {
        ...state,
        medusaHydra: { ...state.medusaHydra, config: { ...state.medusaHydra.config, ...action.config } },
      };

    case "UPDATE_RECON":
      return {
        ...state,
        recon: { ...state.recon, config: { ...state.recon.config, ...action.config } },
      };

    case "FILTER_PACKETS":
      return { ...state, packetLab: { ...state.packetLab, filter: action.filter } };

    case "SELECT_PACKET":
      return { ...state, packetLab: { ...state.packetLab, selectedPacketId: action.packetId } };

    case "UPDATE_WEB_LAB":
      return { ...state, webLab: { ...state.webLab, ...action.update } };

    case "EXECUTE_SNOWPLOIT": {
      let nextState = addEvent(
        state,
        "SNOWPLOIT",
        "info",
        "CONSOLE",
        `Executed command: snowploit > ${action.cmd}`
      );
      let sessionCreated = nextState.sessions;
      const cmd = action.cmd.trim().toLowerCase();
      let newLog = `snowploit > ${action.cmd}`;

      if (cmd === "exploit" || cmd === "run") {
        const newSess: SecuritySession = {
          id: `session-0${sessionCreated.length + 1}`,
          target: state.snowploit.target,
          module: state.snowploit.selectedModule,
          privilege: "ADMIN",
          status: "active",
          createdAt: formatSimulationTimestamp(state.clock),
        };
        sessionCreated = [...sessionCreated, newSess];
        newLog = `[*] Sending simulated payload...\n[+] Session established: ${newSess.id} (${newSess.privilege}) on ${state.snowploit.target}`;

        // Interconnect: advance mission stage 4 for Black Ice or stage 3 for Ghost Protocol
        if (state.activeMissionId === "black-ice") {
          nextState = updateActiveMissionStage(nextState, 3, "complete");
        } else if (state.activeMissionId === "ghost-protocol") {
          nextState = updateActiveMissionStage(nextState, 2, "complete");
        }
      } else if (cmd === "vault extract" || cmd === "extract") {
        newLog = `[*] Extracting vault secrets from DATA-NODE (10.44.0.40)...\n[+] VAULT UNLOCKED // FLAG RECORDED: ${state.missions[0].flag}`;
        if (state.activeMissionId === "black-ice") {
          nextState = updateActiveMissionStage(nextState, 4, "complete");
        }
      } else if (cmd === "check") {
        newLog = `[*] Checking vulnerability on ${state.snowploit.target}...\n[+] Target is vulnerable to SNO-2026-001.`;
      } else if (cmd === "target list") {
        newLog = `[1] EDGE-GATEWAY (10.44.0.10)\n[2] AUTH-SRV (10.44.0.20)\n[3] WEB-NODE (10.44.0.30)\n[4] DATA-NODE (10.44.0.40)\n[5] MONITOR (10.44.0.50)`;
      } else if (cmd === "vuln scan") {
        newLog = `[*] Scanning ${state.snowploit.target}...\n[+] SNO-2026-001 (Auth Bypass) CRITICAL\n[+] SNO-2026-002 (Boolean SQLi) HIGH`;
      }

      return {
        ...nextState,
        sessions: sessionCreated,
        selectedSessionId: sessionCreated.length > 0 ? sessionCreated[sessionCreated.length - 1].id : undefined,
        snowploit: {
          ...state.snowploit,
          activeSession: sessionCreated.length > 0 ? sessionCreated[sessionCreated.length - 1].id : undefined,
          commandHistory: [...state.snowploit.commandHistory, action.cmd],
          consoleLogs: [...state.snowploit.consoleLogs, newLog],
        },
      };
    }

    case "SELECT_FORENSIC": {
      let nextState: SecuritySimulationState = { ...state, forensics: { ...state.forensics, selectedArtifactId: action.id } };
      if (state.activeMissionId === "ghost-protocol" && action.id === "art-5") {
        nextState = updateActiveMissionStage(nextState, 3, "complete");
      }
      return nextState;
    }

    case "START_OP": {
      if (state.category === "recon") {
        const s = addEvent(
          state,
          "RECON",
          "notice",
          "NMAP-ENGINE",
          `Scan initiated: nmap -sV -O ${state.recon.config.target}`
        );
        return {
          ...s,
          recon: {
            ...s.recon,
            state: {
              ...s.recon.state,
              status: "running",
              progress: 10,
              currentPhase: "CYBER RANGE HOST DISCOVERY",
              terminalLogs: [
                `Starting Snow Cyber Range Recon Engine v6.0 against ${state.recon.config.target}...`,
                `[+] Target subnet: 10.44.0.0/24`,
              ],
            },
          },
        };
      }
      if (state.category === "credentials") {
        if (state.activeOpId === "brute-force") {
          const s = addEvent(
            state,
            "BRUTE FORCE",
            "warning",
            "AUTH-ENGINE",
            `Starting SSH dictionary attack against ${state.bruteForce.config.target} (user: ${state.bruteForce.config.username})`
          );
          return {
            ...s,
            bruteForce: {
              ...s.bruteForce,
              state: {
                ...s.bruteForce.state,
                status: "running",
                attempts: 0,
                attemptsPerSec: 320,
                currentCandidate: `${state.bruteForce.config.username} / winter2026`,
                matchFound: false,
                matchedCredential: undefined,
              },
            },
          };
        }
        if (state.activeOpId === "john-hashcat") {
          const s = addEvent(
            state,
            "HASHCAT",
            "notice",
            "GPU-CRACKER",
            `Engine launched (bcrypt). Target Hash: ${state.johnHashcat.config.targetHash.substring(0, 16)}...`
          );
          return {
            ...s,
            johnHashcat: {
              ...s.johnHashcat,
              state: {
                ...s.johnHashcat.state,
                status: "running",
                progress: 0,
                candidatesTested: 0,
                hashRate: 38420,
                matchedResult: undefined,
              },
            },
          };
        }
        if (state.activeOpId === "medusa-hydra") {
          const s = addEvent(
            state,
            "MEDUSA",
            "notice",
            "PARALLEL-WORKERS",
            `${state.medusaHydra.config.workers} Worker threads dispatched to ${state.medusaHydra.config.target} (${state.medusaHydra.config.module})`
          );
          return {
            ...s,
            medusaHydra: {
              ...s.medusaHydra,
              state: {
                ...s.medusaHydra.state,
                status: "running",
                workerProgress: [0, 0, 0, 0],
                totalAttempts: 0,
                attemptsPerSec: 240,
                matchedPair: undefined,
              },
            },
          };
        }
      }
      return state;
    }

    case "PAUSE_OP": {
      if (state.category === "recon") {
        return {
          ...state,
          recon: { ...state.recon, state: { ...state.recon.state, status: "paused" } },
        };
      }
      if (state.category === "credentials") {
        if (state.activeOpId === "brute-force") {
          return {
            ...state,
            bruteForce: { ...state.bruteForce, state: { ...state.bruteForce.state, status: "paused", attemptsPerSec: 0 } },
          };
        }
        if (state.activeOpId === "john-hashcat") {
          return {
            ...state,
            johnHashcat: { ...state.johnHashcat, state: { ...state.johnHashcat.state, status: "paused", hashRate: 0 } },
          };
        }
        if (state.activeOpId === "medusa-hydra") {
          return {
            ...state,
            medusaHydra: { ...state.medusaHydra, state: { ...state.medusaHydra.state, status: "paused", attemptsPerSec: 0 } },
          };
        }
      }
      return state;
    }

    case "RESUME_OP": {
      if (state.category === "recon") {
        return {
          ...state,
          recon: { ...state.recon, state: { ...state.recon.state, status: "running" } },
        };
      }
      if (state.category === "credentials") {
        if (state.activeOpId === "brute-force") {
          return {
            ...state,
            bruteForce: { ...state.bruteForce, state: { ...state.bruteForce.state, status: "running", attemptsPerSec: 320 } },
          };
        }
        if (state.activeOpId === "john-hashcat") {
          return {
            ...state,
            johnHashcat: { ...state.johnHashcat, state: { ...state.johnHashcat.state, status: "running", hashRate: 38420 } },
          };
        }
        if (state.activeOpId === "medusa-hydra") {
          return {
            ...state,
            medusaHydra: { ...state.medusaHydra, state: { ...state.medusaHydra.state, status: "running", attemptsPerSec: 240 } },
          };
        }
      }
      return state;
    }

    case "STOP_OP": {
      if (state.category === "recon") {
        return {
          ...state,
          recon: { ...state.recon, state: { ...state.recon.state, status: "stopped" } },
        };
      }
      if (state.category === "credentials") {
        if (state.activeOpId === "brute-force") {
          return {
            ...state,
            bruteForce: { ...state.bruteForce, state: { ...state.bruteForce.state, status: "stopped", attemptsPerSec: 0 } },
          };
        }
        if (state.activeOpId === "john-hashcat") {
          return {
            ...state,
            johnHashcat: { ...state.johnHashcat, state: { ...state.johnHashcat.state, status: "stopped", hashRate: 0 } },
          };
        }
        if (state.activeOpId === "medusa-hydra") {
          return {
            ...state,
            medusaHydra: { ...state.medusaHydra, state: { ...state.medusaHydra.state, status: "stopped", attemptsPerSec: 0 } },
          };
        }
      }
      return state;
    }

    case "RESET_OP": {
      return initialSimulationState();
    }

    case "TICK": {
      let s = { ...state, clock: state.clock + 1 };

      // 1. RECON Tick
      if (s.recon.state.status === "running") {
        const nextProgress = Math.min(100, s.recon.state.progress + 20);
        const isDone = nextProgress >= 100;

        // Reveal hosts as recon advances
        const updatedHosts = s.hosts.map((h) => {
          if (nextProgress >= 30 && h.id === "host-auth") return { ...h, discovered: true };
          if (nextProgress >= 60 && h.id === "host-web") return { ...h, discovered: true };
          if (nextProgress >= 80 && h.id === "host-data") return { ...h, discovered: true };
          return h;
        });

        // Add generated packets
        const newPackets = [...s.packets];
        if (nextProgress === 20) {
          newPackets.push({
            id: `pkt-${newPackets.length + 1}`,
            timestamp: formatSimulationTimestamp(s.clock),
            source: "10.44.0.100",
            destination: "10.44.0.10",
            protocol: "TCP",
            port: 22,
            length: 64,
            info: "TCP SYN [SYN] Seq=0 Win=64240 Len=0",
            payload: "0000 00 02 45 00 00 3c 1a 2b 40 00 40 06",
            status: "observed",
            layers: ["Ethernet II", "IPv4", "TCP"],
          });
        }

        if (isDone && s.recon.state.status === "running") {
          s = addEvent(s, "RECON", "success", "NMAP-ENGINE", "RANGE RECONNAISSANCE COMPLETE // ALL 5 CYBER RANGE HOSTS MAPPED");
          // Interconnect: advance Stage 01 of active mission
          if (s.activeMissionId === "black-ice") {
            s = updateActiveMissionStage(s, 0, "complete");
          } else if (s.activeMissionId === "ghost-protocol") {
            s = updateActiveMissionStage(s, 0, "complete");
          }
        }

        s = {
          ...s,
          hosts: updatedHosts,
          packets: newPackets,
          recon: {
            ...s.recon,
            state: {
              ...s.recon.state,
              progress: nextProgress,
              hostsFound: updatedHosts.filter((h) => h.discovered).length,
              portsScanned: s.recon.state.portsScanned + 18,
              elapsedSec: s.recon.state.elapsedSec + 1,
              status: isDone ? "success" : "running",
              currentPhase: isDone ? "SCAN COMPLETE" : "ENUMERATING PORTS & SERVICES",
              terminalLogs: [
                ...s.recon.state.terminalLogs,
                `[${formatSimulationTimestamp(s.clock)}] Scanned subnet segment (${nextProgress}%)...`,
              ],
            },
          },
        };
      }

      // 2. BRUTE FORCE Tick
      if (s.bruteForce.state.status === "running") {
        const candidates = [
          "operator / winter2026",
          "operator / snowflake",
          "operator / snowlab",
          "operator / matrix2026",
          "operator / cyber2026",
          "operator / snow-lab-2025!",
        ];
        const nextIndex = Math.min(candidates.length - 1, Math.floor(s.bruteForce.state.attempts / 100));
        const currentCandidate = candidates[nextIndex];
        const matchFound = currentCandidate === "operator / snow-lab-2025!";

        let sessions = s.sessions;
        if (matchFound && !s.bruteForce.state.matchFound) {
          s = addEvent(s, "BRUTE FORCE", "success", "AUTH-ENGINE", "CREDENTIAL MATCH FOUND: operator / snow-lab-2025!");
          // Create session upon credential match
          const newSess: SecuritySession = {
            id: `session-0${sessions.length + 1}`,
            target: "AUTH-SRV (10.44.0.20:22)",
            module: "ssh_bruteforce",
            privilege: "USER",
            status: "active",
            createdAt: formatSimulationTimestamp(s.clock),
          };
          sessions = [...sessions, newSess];

          // Interconnect: advance Stage 02 of Black Ice
          if (s.activeMissionId === "black-ice") {
            s = updateActiveMissionStage(s, 1, "complete");
          }
        }

        s = {
          ...s,
          sessions,
          selectedSessionId: sessions.length > 0 ? sessions[sessions.length - 1].id : undefined,
          bruteForce: {
            ...s.bruteForce,
            state: {
              ...s.bruteForce.state,
              attempts: s.bruteForce.state.attempts + 100,
              currentCandidate,
              matchFound,
              matchedCredential: matchFound ? "operator / snow-lab-2025!" : undefined,
              status: matchFound ? "success" : "running",
              elapsedSec: s.bruteForce.state.elapsedSec + 1,
            },
          },
        };
      }

      // 3. JOHN / HASHCAT Tick
      if (s.johnHashcat.state.status === "running") {
        const nextProgress = Math.min(100, s.johnHashcat.state.progress + 25);
        const isDone = nextProgress >= 100;

        if (isDone && s.johnHashcat.state.status === "running") {
          s = addEvent(s, "HASHCAT", "success", "GPU-CRACKER", "HASH CRACKED // RECOVERED: snow-lab-2025!");
        }

        s = {
          ...s,
          johnHashcat: {
            ...s.johnHashcat,
            state: {
              ...s.johnHashcat.state,
              progress: nextProgress,
              candidatesTested: s.johnHashcat.state.candidatesTested + 25000,
              status: isDone ? "success" : "running",
              matchedResult: isDone ? "snow-lab-2025!" : undefined,
              recoveredPassword: isDone ? "snow-lab-2025!" : undefined,
              elapsedSec: s.johnHashcat.state.elapsedSec + 1,
            },
          },
        };
      }

      // 4. MEDUSA / HYDRA Tick
      if (s.medusaHydra.state.status === "running") {
        const nextWorkers: [number, number, number, number] = [
          Math.min(100, s.medusaHydra.state.workerProgress[0] + 25),
          Math.min(100, s.medusaHydra.state.workerProgress[1] + 20),
          Math.min(100, s.medusaHydra.state.workerProgress[2] + 25),
          Math.min(100, s.medusaHydra.state.workerProgress[3] + 20),
        ];

        const allDone = nextWorkers.every((w) => w >= 100);

        const updatedActivities: typeof s.medusaHydra.state.workerActivities = [
          { id: 1, user: "operator", status: nextWorkers[0] >= 100 ? "SUCCESS" : "AUTHENTICATING", progress: nextWorkers[0] },
          { id: 2, user: "admin", status: nextWorkers[1] >= 100 ? "LOCKOUT" : "CONNECTING", progress: nextWorkers[1] },
          { id: 3, user: "root", status: nextWorkers[2] >= 100 ? "LOCKOUT" : "RETRY", progress: nextWorkers[2] },
          { id: 4, user: "snow", status: nextWorkers[3] >= 100 ? "LOCKOUT" : "AUTHENTICATING", progress: nextWorkers[3] },
        ];

        if (allDone && s.medusaHydra.state.status === "running") {
          s = addEvent(s, "MEDUSA", "success", "WORKERS", "AUTHENTICATION MATCH DISCOVERED: operator:snow-lab-2025!");
        }

        s = {
          ...s,
          medusaHydra: {
            ...s.medusaHydra,
            state: {
              ...s.medusaHydra.state,
              workerProgress: nextWorkers,
              workerActivities: updatedActivities,
              totalAttempts: s.medusaHydra.state.totalAttempts + 160,
              attemptsPerSec: allDone ? 0 : 240,
              matchedPair: allDone ? { user: "operator", pass: "snow-lab-2025!" } : undefined,
              elapsedSec: s.medusaHydra.state.elapsedSec + 1,
              status: allDone ? "success" : "running",
            },
          },
        };
      }

      return s;
    }

    default:
      return state;
  }
}

export function SecurityLabApp() {
  const [state, dispatch] = useReducer(reducer, undefined, initialSimulationState);
  const [terminalLines, setTerminalLines] = useState(INITIAL_TERMINAL);
  const previousEventCount = useRef(state.events.length);

  // Simulation Tick Loop
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const previousCount = previousEventCount.current;
    if (state.events.length < previousCount) {
      setTerminalLines(INITIAL_TERMINAL);
    } else if (state.events.length > previousCount) {
      const newEvents = state.events.slice(previousCount);
      setTerminalLines((prev) => [
        ...prev,
        ...newEvents.map((event) => `[${event.timestamp}] ${event.type}: ${event.message}`),
      ]);
    }
    previousEventCount.current = state.events.length;
  }, [state.events]);

  const handleCommand = (cmd: string) => {
    const normalized = cmd.trim().toLowerCase();
    if (normalized === "clear") {
      setTerminalLines(INITIAL_TERMINAL);
      return;
    }

    if (normalized === "run") dispatch({ type: "START_OP" });
    else if (normalized === "pause") dispatch({ type: "PAUSE_OP" });
    else if (normalized === "resume") dispatch({ type: "RESUME_OP" });
    else if (normalized === "stop") dispatch({ type: "STOP_OP" });
    else if (normalized === "reset") dispatch({ type: "RESET_OP" });
    else if (normalized === "recon") dispatch({ type: "SET_CATEGORY", category: "recon" });
    else if (normalized === "scan --demo") {
      dispatch({ type: "SET_CATEGORY", category: "recon" });
      dispatch({ type: "START_OP" });
    } else if (normalized === "bruteforce" || normalized === "auth --demo") {
      dispatch({ type: "SET_CATEGORY", category: "credentials" });
      dispatch({ type: "SET_ACTIVE_OP", opId: "brute-force" });
    } else if (normalized === "bruteforce --demo") {
      dispatch({ type: "SET_CATEGORY", category: "credentials" });
      dispatch({ type: "SET_ACTIVE_OP", opId: "brute-force" });
      dispatch({ type: "START_OP" });
    } else if (normalized === "crack" || normalized === "hashcat") {
      dispatch({ type: "SET_CATEGORY", category: "credentials" });
      dispatch({ type: "SET_ACTIVE_OP", opId: "john-hashcat" });
    } else if (normalized === "medusa" || normalized === "hydra") {
      dispatch({ type: "SET_CATEGORY", category: "credentials" });
      dispatch({ type: "SET_ACTIVE_OP", opId: "medusa-hydra" });
    } else if (normalized === "packets" || normalized === "wireshark") {
      dispatch({ type: "SET_CATEGORY", category: "network" });
    } else if (normalized === "web") dispatch({ type: "SET_CATEGORY", category: "web" });
    else if (normalized === "snowploit") dispatch({ type: "SET_CATEGORY", category: "exploitation" });
    else if (normalized === "forensics") dispatch({ type: "SET_CATEGORY", category: "forensics" });
    else if (normalized === "mission" || normalized === "blackice") dispatch({ type: "SET_CATEGORY", category: "missions" });
    else if (normalized.startsWith("mission --start")) {
      const parts = normalized.split(/\s+/);
      if (parts[2]) {
        dispatch({ type: "SELECT_MISSION", missionId: parts[2] });
        dispatch({ type: "SET_CATEGORY", category: "missions" });
      }
    }

    const output = commandOutput(cmd, state);
    setTerminalLines((prev) => [...prev, `snow@lab:~$ ${cmd}`, ...output]);
  };

  const currentOpStatus = useMemo(() => {
    if (state.category === "recon") return state.recon.state.status;
    if (state.category === "credentials") {
      if (state.activeOpId === "john-hashcat") return state.johnHashcat.state.status;
      if (state.activeOpId === "medusa-hydra") return state.medusaHydra.state.status;
      return state.bruteForce.state.status;
    }
    return "idle" as OperationStatus;
  }, [state]);

  return (
    <div className="relative min-h-screen bg-[#030c0f] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Background Matrix & CRT Scanline Layer */}
      <SecurityMatrix category={state.category} status={currentOpStatus} />

      <main id="main-content" className="relative z-10 mx-auto w-full max-w-[1550px] px-4 pb-24 pt-28 sm:px-6 lg:px-10">
        {/* Header Hero Section */}
        <section className="security-hero flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-emerald-400/20 pb-8">
          <div className="max-w-2xl">
            <p className="security-kicker flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider">
              <span className="security-live-dot h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              SNOW SECURITY LAB // OPERATOR WORKSTATION
            </p>
            <h1 className="mt-2 text-4xl sm:text-6xl font-extrabold tracking-tight font-mono text-white">
              CYBER <em className="text-emerald-400 not-italic">RANGE</em>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-mono leading-relaxed">
              Step into an authentic hacker workstation targeting the local <strong>10.44.0.0/24 cyber range</strong>. Execute deterministic operations, establish active sessions, capture traffic, analyze forensic traces, and complete cinematic missions.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase text-slate-400">
              <span className="security-chip border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-emerald-300">RANGE: 10.44.0.0/24</span>
              <span className="security-chip border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 text-cyan-300">MOCK TARGETS</span>
              <span className="security-chip border border-slate-700 bg-slate-900 px-2 py-0.5 text-slate-300">100% DETERMINISTIC</span>
            </div>
          </div>

          <div className="security-hero-signal flex flex-col items-center justify-center p-4 border border-cyan-400/30 bg-cyan-950/20 rounded-none w-full md:w-52 text-center font-mono">
            <span className="text-[10px] text-cyan-300">ACTIVE WORKSTATION</span>
            <strong className="text-emerald-400 text-lg">CYBER RANGE ONLINE</strong>
            <small className="text-[9px] text-slate-400 mt-1">
              MISSION: {state.missions.find((m) => m.id === state.activeMissionId)?.codename || "BLACK ICE"}
            </small>
            <small className="text-[8px] text-slate-500">SIM CLOCK: #{String(state.clock).padStart(4, "0")}</small>
          </div>
        </section>

        {/* Network Topology & Terminal / Event Grid */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <SecurityNetwork
            category={state.category}
            hosts={state.hosts}
            sessions={state.sessions}
            selectedHostId={state.selectedHostId}
            selectedSessionId={state.selectedSessionId}
            status={currentOpStatus}
            activeOpId={state.activeOpId}
            onSelectHost={(hostId) => dispatch({ type: "SELECT_HOST", hostId })}
            onSelectSession={(sessionId) => dispatch({ type: "SELECT_SESSION", sessionId })}
          />
          <div className="grid gap-6">
            <SecurityTerminal lines={terminalLines} onCommand={handleCommand} activeOpId={state.activeOpId} status={currentOpStatus} />
            <SecurityEventStream events={state.events} />
          </div>
        </section>

        {/* Primary Interactive Operation Panel */}
        <div className="mt-10">
          <SecurityOperationPanel
            state={state}
            onSelectCategory={(category) => dispatch({ type: "SET_CATEGORY", category })}
            onSelectOp={(opId) => dispatch({ type: "SET_ACTIVE_OP", opId })}
            onSelectMission={(missionId) => dispatch({ type: "SELECT_MISSION", missionId })}
            onRunOperation={() => dispatch({ type: "START_OP" })}
            onPauseOperation={() => dispatch({ type: "PAUSE_OP" })}
            onResumeOperation={() => dispatch({ type: "RESUME_OP" })}
            onStopOperation={() => dispatch({ type: "STOP_OP" })}
            onResetOperation={() => dispatch({ type: "RESET_OP" })}
            onUpdateBruteForce={(config) => dispatch({ type: "UPDATE_BRUTE_FORCE", config })}
            onUpdateJohnHashcat={(config) => dispatch({ type: "UPDATE_JOHN_HASHCAT", config })}
            onUpdateMedusaHydra={(config) => dispatch({ type: "UPDATE_MEDUSA_HYDRA", config })}
            onUpdateRecon={(config) => dispatch({ type: "UPDATE_RECON", config })}
            onSelectPacket={(packetId) => dispatch({ type: "SELECT_PACKET", packetId })}
            onFilterPackets={(filter) => dispatch({ type: "FILTER_PACKETS", filter })}
            onUpdateWebLab={(update) => dispatch({ type: "UPDATE_WEB_LAB", update })}
            onExecuteSnowploit={(cmd) => dispatch({ type: "EXECUTE_SNOWPLOIT", cmd })}
            onSelectForensicArtifact={(id) => dispatch({ type: "SELECT_FORENSIC", id })}
          />
        </div>

        {/* Bottom Safety Banner */}
        <p className="mt-12 text-center font-mono text-[10px] uppercase tracking-widest text-slate-500">
          Snow Security Lab operates exclusively against local, synthetic mock fixtures. No external network requests or offensive binaries are executed.
        </p>
      </main>
    </div>
  );
}
