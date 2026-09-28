"use client";

import React, { useState } from "react";
import { Copy, Check, Smartphone, MessageSquare, Phone } from "lucide-react";
import { QUICK_ACTIONS, QuickActionItem } from "@/lib/telecom";

interface QuickActionGridProps {
  onSelectAction?: (action: QuickActionItem) => void;
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({ onSelectAction }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (codeText: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getProtocolIcon = (protocol: string) => {
    switch (protocol) {
      case "USSD":
        return <Smartphone className="w-3.5 h-3.5 text-cyan-400" />;
      case "SMS":
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />;
      case "VOICE":
        return <Phone className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Smartphone className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-sans text-slate-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          UNIVERSAL QUICK ACTIONS
        </h2>
        <span className="text-xs font-mono text-slate-400">
          CORE HARMONIZED CODES
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {QUICK_ACTIONS.map((action) => {
          const isCopied = copiedId === action.id;
          return (
            <div
              key={action.id}
              onClick={() => onSelectAction?.(action)}
              className="group p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer hover:shadow-lg hover:shadow-cyan-950/20 active:scale-[0.98]"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-300">
                  {getProtocolIcon(action.protocol)}
                  {action.protocol}
                </span>
                <span className="text-cyan-400 font-bold">*{action.code}</span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold font-mono text-slate-300 group-hover:text-cyan-300 transition-colors">
                  {action.title}
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {action.displayCode}
                </div>
              </div>

              <p className="text-[11px] font-sans text-slate-400 line-clamp-2 leading-tight">
                {action.description}
              </p>

              <button
                type="button"
                onClick={(e) => handleCopy(action.displayCode, action.id, e)}
                aria-label={`Copy code ${action.displayCode} for ${action.title}`}
                className={`w-full py-1.5 px-2 rounded-lg font-mono text-[11px] font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  isCopied
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40"
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
