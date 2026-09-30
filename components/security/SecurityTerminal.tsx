"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export function SecurityTerminal({ lines, onCommand }: { lines: string[]; onCommand: (command: string) => void }) {
  const [command, setCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => { terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight }); }, [lines]);
  const submit = (event: FormEvent) => { event.preventDefault(); const value = command.trim(); if (!value) return; onCommand(value); setCommand(""); };
  return <section className="security-terminal" aria-labelledby="terminal-title"><div className="security-terminal-bar"><span id="terminal-title">SNOW SECURITY LAB v0.1</span><span className="hidden sm:inline">LOCAL / SIMULATION</span><span className="security-terminal-lights"><i /><i /><i /></span></div><div ref={terminalRef} className="security-terminal-output" aria-live="polite">{lines.map((line, index) => <div key={`${index}-${line}`} className={line.startsWith("snow@") ? "text-cyan-200" : line.includes("UNKNOWN") ? "text-red-300" : "text-emerald-300/90"}>{line || "\u00a0"}</div>)}</div><form onSubmit={submit} className="security-terminal-form"><label htmlFor="security-command" className="sr-only">Type a Security Lab command</label><span className="text-cyan-300">snow@lab:~$</span><input ref={inputRef} id="security-command" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="type help" autoComplete="off" spellCheck={false} /><button type="submit" className="sr-only">Run command</button></form></section>;
}
