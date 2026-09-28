"use client";

import React, { useState, useMemo } from "react";
import { Search, Copy, Check, ExternalLink, ShieldCheck, Info } from "lucide-react";
import { NetworkId, ShortCodeEntry, filterShortCodes } from "@/lib/telecom";

interface ShortCodeDirectoryProps {
  initialQuery?: string;
  initialNetwork?: NetworkId;
  onSelectCode?: (code: ShortCodeEntry) => void;
}

export const ShortCodeDirectory: React.FC<ShortCodeDirectoryProps> = ({
  initialQuery = "",
  initialNetwork = "all",
  onSelectCode,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkId>(initialNetwork);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const filteredCodes = useMemo(() => {
    return filterShortCodes(searchQuery, selectedNetwork);
  }, [searchQuery, selectedNetwork]);

  const handleCopy = (codeText: string, id: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    const msg = `Copied code ${codeText} to clipboard`;
    setAnnouncement(msg);
    setTimeout(() => {
      setCopiedId(null);
      setAnnouncement("");
    }, 2500);
  };

  const networks: { id: NetworkId; label: string; colorClass: string }[] = [
    { id: "all", label: "All Networks", colorClass: "hover:text-cyan-300" },
    { id: "mtn", label: "MTN", colorClass: "hover:text-amber-400" },
    { id: "airtel", label: "Airtel", colorClass: "hover:text-red-400" },
    { id: "glo", label: "Glo", colorClass: "hover:text-emerald-400" },
    { id: "9mobile", label: "9mobile", colorClass: "hover:text-teal-400" },
  ];

  const quickFilterPills = [
    { label: "Balance", query: "balance" },
    { label: "Data", query: "data" },
    { label: "Recharge", query: "recharge" },
    { label: "Borrow", query: "borrow" },
    { label: "DND", query: "dnd" },
    { label: "NIN / SIM", query: "nin" },
    { label: "Porting", query: "porting" },
    { label: "Support", query: "300" },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Screen Reader Live Announcement */}
      <div className="sr-only" aria-live="polite" role="status">
        {announcement}
      </div>

      {/* Directory Search & Filter Controls */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search USSD codes (e.g. balance, data, recharge, 310, DND)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono"
              aria-label="Search short codes by keyword or service"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Network Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {networks.map((net) => {
              const active = selectedNetwork === net.id;
              return (
                <button
                  key={net.id}
                  type="button"
                  onClick={() => setSelectedNetwork(net.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                    active
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                      : "bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  {net.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Keyword Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-800/80 text-xs font-mono">
          <span className="text-slate-500 mr-1">QUICK FILTERS:</span>
          {quickFilterPills.map((pill) => {
            const isSelected = searchQuery.toLowerCase() === pill.query.toLowerCase();
            return (
              <button
                key={pill.label}
                type="button"
                onClick={() => setSearchQuery(isSelected ? "" : pill.query)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  isSelected
                    ? "bg-cyan-400 text-slate-950 font-bold"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <span>
          FOUND <strong className="text-cyan-400">{filteredCodes.length}</strong> AUTHORITATIVE SHORT CODES
        </span>
        <span className="hidden sm:inline-block text-slate-500">
          HARMONIZED BY NCC DIRECTIVE
        </span>
      </div>

      {/* Codes Directory Grid */}
      {filteredCodes.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
          <Info className="w-8 h-8 text-slate-500 mx-auto" />
          <p className="text-sm font-mono text-slate-300">
            No official short codes found matching &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedNetwork("all");
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-500/30 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCodes.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectCode?.(item)}
                className="group relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-lg hover:shadow-cyan-950/20 cursor-pointer"
              >
                {/* Header: Service Name & Protocol Tag */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {item.isHarmonized ? "NCC HARMONIZED" : "OPERATOR CODE"}
                    </span>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {item.service}
                    </h3>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 border border-slate-700 text-slate-300 shrink-0">
                    {item.protocol}
                  </span>
                </div>

                {/* Main Prominent Code Box */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 group-hover:border-cyan-500/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-slate-500 uppercase">OFFICIAL SHORT CODE</span>
                    <span className="text-2xl font-black font-mono tracking-widest text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                      {item.displayCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.displayCode, item.id);
                    }}
                    aria-label={`Copy ${item.service} code ${item.displayCode}`}
                    className={`p-2.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isCopied
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Description & How to Use */}
                <div className="space-y-2 text-xs text-slate-300 font-sans">
                  <p className="leading-relaxed">{item.description}</p>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 text-[11px] font-mono text-slate-400">
                    <strong className="text-slate-200">How to use:</strong> {item.howToUse}
                  </div>
                </div>

                {/* Footer: Applicable Networks & Verified Source */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">NETWORKS:</span>
                    <span className="font-bold text-slate-200">
                      {item.applicableNetworks.join(", ")}
                    </span>
                  </div>

                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
                    title={`Verified against ${item.sourceName} on ${item.lastVerified}`}
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span className="truncate max-w-[100px]">{item.sourceName}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
