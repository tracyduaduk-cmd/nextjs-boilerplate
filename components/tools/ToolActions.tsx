"use client";

import React, { useState } from "react";
import { Copy, Check, Trash2, Download, RefreshCw, FileCode } from "lucide-react";

export interface ToolActionsProps {
  onCopy?: () => void;
  onClear?: () => void;
  onDownload?: () => void;
  onSampleData?: () => void;
  onSwap?: () => void;
  copyContent?: string;
  isCopied?: boolean;
  sampleLabel?: string;
  className?: string;
}

export const ToolActions: React.FC<ToolActionsProps> = ({
  onCopy,
  onClear,
  onDownload,
  onSampleData,
  onSwap,
  copyContent,
  isCopied: externalCopied,
  sampleLabel = "Load Sample",
  className = "",
}) => {
  const [internalCopied, setInternalCopied] = useState(false);
  const copied = externalCopied !== undefined ? externalCopied : internalCopied;

  const handleCopy = async () => {
    if (onCopy) {
      onCopy();
      setInternalCopied(true);
      setTimeout(() => setInternalCopied(false), 2000);
      return;
    }

    if (copyContent) {
      try {
        await navigator.clipboard.writeText(copyContent);
        setInternalCopied(true);
        setTimeout(() => setInternalCopied(false), 2000);
      } catch (e) {
        console.error("Copy failed", e);
      }
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {onSampleData && (
        <button
          type="button"
          onClick={onSampleData}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
        >
          <FileCode className="w-3.5 h-3.5 text-sky-400" />
          <span>{sampleLabel}</span>
        </button>
      )}

      {onSwap && (
        <button
          type="button"
          onClick={onSwap}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
          <span>Swap</span>
        </button>
      )}

      {(onCopy || copyContent) && (
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
            copied
              ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
              : "bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 border border-sky-800/80"
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      )}

      {onDownload && (
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Download</span>
        </button>
      )}

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800/60 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      )}
    </div>
  );
};
