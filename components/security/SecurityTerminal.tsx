"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

interface SecurityTerminalProps {
  lines: string[];
  onCommand: (command: string) => void;
  activeOpId?: string;
  status?: string;
}

export function SecurityTerminal({ lines, onCommand, activeOpId, status }: SecurityTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed) {
        setHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
        onCommand(trimmed);
        setInput("");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex] || "");
        }
      }
    }
  };

  return (
    <section className="security-terminal rounded-none border border-emerald-400/20 bg-[#040e0b]/90 shadow-2xl">
      <div className="security-terminal-bar flex items-center justify-between border-b border-emerald-400/15 px-3 py-2 text-[10px] font-mono tracking-widest text-emerald-300/80">
        <div className="flex items-center gap-2">
          <div className="security-terminal-lights flex gap-1.5">
            <i className="h-2 w-2 rounded-full bg-red-500/80" />
            <i className="h-2 w-2 rounded-full bg-amber-500/80" />
            <i className="h-2 w-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 uppercase font-semibold">SNOW OPERATOR TERMINAL // {activeOpId || "CORE"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-cyan-400/80 uppercase">{status || "ONLINE"}</span>
          <span className="text-[9px] text-slate-500">TTY: /dev/pts/0</span>
        </div>
      </div>

      <div className="security-terminal-output flex-1 max-h-[220px] sm:max-h-[280px] overflow-y-auto p-3 font-mono text-[11px] leading-relaxed text-emerald-300/90 selection:bg-emerald-500 selection:text-black">
        {lines.map((line, idx) => {
          const isCommand = line.startsWith("snow@lab:~$ ");
          const isError = line.includes("UNKNOWN") || line.includes("FAILED") || line.includes("ERROR");
          const isSuccess = line.includes("MATCH") || line.includes("SUCCESS") || line.includes("COMPLETE") || line.includes("ONLINE");
          return (
            <div
              key={idx}
              className={`${
                isCommand
                  ? "text-cyan-300 font-semibold mt-1"
                  : isError
                  ? "text-red-400"
                  : isSuccess
                  ? "text-emerald-300"
                  : "text-emerald-400/80"
              }`}
            >
              {line}
            </div>
          );
        })}
        <div ref={outputEndRef} />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="security-terminal-form border-t border-emerald-400/15 bg-[#020806] px-3 py-2">
        <span className="text-emerald-400 font-mono text-[11px] font-bold shrink-0">snow@lab:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command or 'help' (e.g. bruteforce, crack, recon)..."
          className="w-full bg-transparent text-emerald-200 font-mono text-[11px] outline-none placeholder:text-emerald-700/60"
          aria-label="Type a Security Lab command"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </section>
  );
}
