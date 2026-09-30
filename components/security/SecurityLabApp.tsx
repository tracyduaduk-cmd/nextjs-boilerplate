"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
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
} from "@/lib/security/simulation";

const INITIAL_TERMINAL = [
  "SNOW SECURITY LAB // OPERATOR WORKSTATION v4.0",
  "HIGH-FIDELITY CYBER OPERATIONS SANDBOX ONLINE",
  "DETERMINISTIC SIMULATION ENGINE CONNECTED",
  "Type 'help' or select an operation below to execute.",
  "",
];

type Action =
  | { type: "TICK" }
  | { type: "SET_CATEGORY"; category: OperationCategory }
  | { type: "SET_ACTIVE_OP"; opId: string }
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
  const timestamp = new Date().toISOString().substring(11, 19);
  return {
    ...state,
    events: [
      ...state.events,
      { id: `evt-${state.events.length + 1}`, timestamp, type, severity, source, message },
    ],
  };
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
      const nextState = addEvent(
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
        sessionCreated = [
          ...sessionCreated,
          {
            id: `session-${sessionCreated.length + 1}`,
            target: state.snowploit.target,
            module: state.snowploit.selectedModule,
            status: "active",
            createdAt: new Date().toISOString().substring(11, 19),
          },
        ];
        newLog = `[*] Sending simulated payload...\n[+] Session established: session-${sessionCreated.length} on ${state.snowploit.target}`;
      } else if (cmd === "check") {
        newLog = `[*] Checking vulnerability on ${state.snowploit.target}...\n[+] Target is vulnerable to SNO-2026-001.`;
      } else if (cmd === "target list") {
        newLog = `[1] lab-web-01.snow.local (10.42.0.10)\n[2] lab-auth.snow.local (10.42.0.14)\n[3] lab-api-01.snow.local (10.42.0.12)`;
      } else if (cmd === "vuln scan") {
        newLog = `[*] Scanning ${state.snowploit.target}...\n[+] SNO-2026-001 (Auth Bypass) CRITICAL\n[+] SNO-2026-002 (Boolean SQLi) HIGH`;
      }

      return {
        ...nextState,
        sessions: sessionCreated,
        snowploit: {
          ...state.snowploit,
          activeSession: sessionCreated.length > 0 ? sessionCreated[0].id : undefined,
          commandHistory: [...state.snowploit.commandHistory, action.cmd],
          consoleLogs: [...state.snowploit.consoleLogs, newLog],
        },
      };
    }

    case "SELECT_FORENSIC":
      return { ...state, forensics: { ...state.forensics, selectedArtifactId: action.id } };

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
              progress: 5,
              currentPhase: "HOST DISCOVERY",
              terminalLogs: [
                `Starting Snow Recon Engine v4.0 against ${state.recon.config.target}...`,
                `[+] Host discovered: 10.42.0.1 (lab-gateway.snow.local)`,
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
                workerProgress: [10, 15, 8, 12],
                workerActivities: [
                  { id: 1, user: "operator", status: "AUTHENTICATING", progress: 15 },
                  { id: 2, user: "admin", status: "CONNECTING", progress: 20 },
                  { id: 3, user: "root", status: "RETRY", progress: 10 },
                  { id: 4, user: "snow", status: "AUTHENTICATING", progress: 12 },
                ],
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
        return { ...state, recon: { ...state.recon, state: { ...state.recon.state, status: "paused" } } };
      }
      if (state.category === "credentials") {
        if (state.activeOpId === "brute-force") {
          return { ...state, bruteForce: { ...state.bruteForce, state: { ...state.bruteForce.state, status: "paused" } } };
        }
        if (state.activeOpId === "john-hashcat") {
          return { ...state, johnHashcat: { ...state.johnHashcat, state: { ...state.johnHashcat.state, status: "paused" } } };
        }
        if (state.activeOpId === "medusa-hydra") {
          return { ...state, medusaHydra: { ...state.medusaHydra, state: { ...state.medusaHydra.state, status: "paused" } } };
        }
      }
      return state;
    }

    case "RESUME_OP": {
      if (state.category === "recon") {
        return { ...state, recon: { ...state.recon, state: { ...state.recon.state, status: "running" } } };
      }
      if (state.category === "credentials") {
        if (state.activeOpId === "brute-force") {
          return { ...state, bruteForce: { ...state.bruteForce, state: { ...state.bruteForce.state, status: "running" } } };
        }
        if (state.activeOpId === "john-hashcat") {
          return { ...state, johnHashcat: { ...state.johnHashcat, state: { ...state.johnHashcat.state, status: "running" } } };
        }
        if (state.activeOpId === "medusa-hydra") {
          return { ...state, medusaHydra: { ...state.medusaHydra, state: { ...state.medusaHydra.state, status: "running" } } };
        }
      }
      return state;
    }

    case "STOP_OP": {
      if (state.category === "recon") {
        return { ...state, recon: { ...state.recon, state: { ...state.recon.state, status: "stopped" } } };
      }
      if (state.category === "credentials") {
        if (state.activeOpId === "brute-force") {
          return { ...state, bruteForce: { ...state.bruteForce, state: { ...state.bruteForce.state, status: "stopped", attemptsPerSec: 0 } } };
        }
        if (state.activeOpId === "john-hashcat") {
          return { ...state, johnHashcat: { ...state.johnHashcat, state: { ...state.johnHashcat.state, status: "stopped", hashRate: 0 } } };
        }
        if (state.activeOpId === "medusa-hydra") {
          return { ...state, medusaHydra: { ...state.medusaHydra, state: { ...state.medusaHydra.state, status: "stopped", attemptsPerSec: 0 } } };
        }
      }
      return state;
    }

    case "RESET_OP":
      return initialSimulationState();

    case "TICK": {
      let s = { ...state, clock: state.clock + 1 };

      // DETERMINISTIC RECON TICK PROGRESSION
      if (s.recon.state.status === "running") {
        const nextProgress = Math.min(100, s.recon.state.progress + 20);
        let phase = "PORT ENUMERATION";
        let newLog = "";

        if (nextProgress === 25) {
          phase = "PORT ENUMERATION";
          newLog = "Discovered open ports: 22/tcp (ssh), 80/tcp (http), 443/tcp (https), 8080/tcp (http-proxy)";
        } else if (nextProgress === 45) {
          phase = "SERVICE DETECTION";
          newLog = "Service detection: 22/OpenSSH 9.2p1, 80/nginx 1.24, 443/OpenSSL 3.0";
        } else if (nextProgress === 65) {
          phase = "OS FINGERPRINT";
          newLog = "OS Fingerprint match: Linux 6.1 (Snow Cyber-Range Architecture)";
        } else if (nextProgress >= 100) {
          phase = "COMPLETE";
          newLog = "Host summary complete: 6 hosts discovered, 14 services enumerated.";
        }

        const isDone = nextProgress >= 100;
        if (isDone && s.recon.state.status === "running") {
          s = addEvent(s, "RECON", "success", "NMAP-ENGINE", "Scan completed. lab-gateway.snow.local fully enumerated.");
          s = {
            ...s,
            hosts: s.hosts.map((h) => ({ ...h, discovered: true })),
            mission: updateMissionStage(s.mission, "stage-1", "complete"),
          };
        }

        s = {
          ...s,
          recon: {
            ...s.recon,
            state: {
              ...s.recon.state,
              progress: nextProgress,
              currentPhase: phase,
              hostsFound: nextProgress > 30 ? 6 : 2,
              portsScanned: Math.floor((nextProgress / 100) * 1024),
              elapsedSec: s.recon.state.elapsedSec + 1,
              status: isDone ? "success" : "running",
              terminalLogs: newLog ? [...s.recon.state.terminalLogs, newLog] : s.recon.state.terminalLogs,
            },
          },
        };
      }

      // DETERMINISTIC BRUTE FORCE TICK PROGRESSION
      if (s.bruteForce.state.status === "running") {
        const newAttempts = s.bruteForce.state.attempts + 450;
        const total = s.bruteForce.state.totalCandidates;
        const stepIndex = Math.floor(newAttempts / 500);

        const CANDIDATES = [
          "operator / winter2026",
          "operator / snowflake",
          "operator / snowlab",
          "operator / matrix2026",
          "operator / cyber2026",
          "operator / snow-lab-2025!",
        ];

        const matchFound = newAttempts >= 2700;
        const currentCandidate = matchFound
          ? "operator / snow-lab-2025!"
          : CANDIDATES[stepIndex % (CANDIDATES.length - 1)];

        const isDone = matchFound || newAttempts >= total;

        if (matchFound && !s.bruteForce.state.matchFound) {
          s = addEvent(s, "BRUTE FORCE", "success", "AUTH-ENGINE", "CREDENTIAL MATCH FOUND: operator / snow-lab-2025!");
          s = {
            ...s,
            credentials: s.credentials.map((c) => (c.username === "operator" ? { ...c, status: "cracked", discovered: true } : c)),
            mission: updateMissionStage(s.mission, "stage-2", "complete"),
          };
        }

        s = {
          ...s,
          bruteForce: {
            ...s.bruteForce,
            state: {
              ...s.bruteForce.state,
              attempts: Math.min(total, newAttempts),
              attemptsPerSec: isDone ? 0 : 320,
              currentCandidate,
              matchFound: matchFound || s.bruteForce.state.matchFound,
              matchedCredential: matchFound ? "operator / snow-lab-2025!" : undefined,
              elapsedSec: s.bruteForce.state.elapsedSec + 1,
              status: isDone ? "success" : "running",
            },
          },
        };
      }

      // DETERMINISTIC JOHN / HASHCAT TICK PROGRESSION
      if (s.johnHashcat.state.status === "running") {
        const nextTested = s.johnHashcat.state.candidatesTested + 25000;
        const nextProgress = Math.min(100, Math.floor((nextTested / s.johnHashcat.state.totalCandidates) * 100));
        const match = nextProgress >= 75;

        if (match && !s.johnHashcat.state.matchedResult) {
          s = addEvent(s, "HASHCAT", "success", "GPU-CRACKER", "HASH PLAINTEXT RECOVERED: snow-lab-2025!");
          s = {
            ...s,
            mission: updateMissionStage(s.mission, "stage-3", "complete"),
          };
        }

        s = {
          ...s,
          johnHashcat: {
            ...s.johnHashcat,
            state: {
              ...s.johnHashcat.state,
              candidatesTested: Math.min(s.johnHashcat.state.totalCandidates, nextTested),
              progress: nextProgress,
              hashRate: match ? 0 : 38420,
              matchedResult: match ? "snow-lab-2025!" : undefined,
              elapsedSec: s.johnHashcat.state.elapsedSec + 1,
              status: match ? "success" : "running",
            },
          },
        };
      }

      // DETERMINISTIC MEDUSA / HYDRA TICK PROGRESSION
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

function updateMissionStage(
  mission: SecuritySimulationState["mission"],
  stageId: string,
  status: "complete" | "in-progress" | "locked"
) {
  const stages = mission.stages.map((stg) => (stg.id === stageId ? { ...stg, status } : stg));
  return { ...mission, stages };
}

export function SecurityLabApp() {
  const [state, dispatch] = useReducer(reducer, undefined, initialSimulationState);
  const [terminalLines, setTerminalLines] = useState(INITIAL_TERMINAL);

  // Simulation Tick Loop
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

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
    else if (normalized === "bruteforce") {
      dispatch({ type: "SET_CATEGORY", category: "credentials" });
      dispatch({ type: "SET_ACTIVE_OP", opId: "brute-force" });
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

    const output = commandOutput(cmd);
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
            <p className="security-kicker flex items-center gap-2">
              <span className="security-live-dot" />
              SNOW SECURITY LAB // OPERATOR WORKSTATION
            </p>
            <h1 className="mt-2 text-4xl sm:text-6xl font-extrabold tracking-tight font-mono text-white">
              CYBER <em className="text-emerald-400 not-italic">OPERATIONS</em>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-mono leading-relaxed">
              Execute realistic cyber operations against deterministic Snow sandbox targets. Select an operation, configure parameters, run execution, inspect terminal &amp; packets, and observe network reactions.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase text-slate-400">
              <span className="security-chip">OPERATOR WORKSTATION</span>
              <span className="security-chip">LOCAL SANDBOX</span>
              <span className="security-chip">100% DETERMINISTIC</span>
            </div>
          </div>

          <div className="security-hero-signal flex flex-col items-center justify-center p-4 border border-cyan-400/30 bg-cyan-950/20 rounded-none w-full md:w-48 text-center font-mono">
            <span className="text-[10px] text-cyan-300">CORE WORKSTATION</span>
            <strong className="text-emerald-400 text-lg">ONLINE</strong>
            <small className="text-[8px] text-slate-500 mt-1">SIM CLOCK: #{String(state.clock).padStart(4, "0")}</small>
          </div>
        </section>

        {/* Network Topology & Terminal / Event Grid */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <SecurityNetwork category={state.category} hosts={state.hosts} status={currentOpStatus} activeOpId={state.activeOpId} />
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
