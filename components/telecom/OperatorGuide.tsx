"use client";

import React, { useState } from "react";
import { ExternalLink, ShieldAlert, Phone, Mail, Globe, Check, Copy } from "lucide-react";
import { OPERATOR_LIST, OperatorInfo, NetworkId } from "@/lib/telecom";

export const OperatorGuide: React.FC = () => {
  const [selectedOperatorId, setSelectedOperatorId] = useState<NetworkId>("mtn");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeOperator: OperatorInfo =
    OPERATOR_LIST.find((op) => op.id === selectedOperatorId) || OPERATOR_LIST[0];

  const handleCopy = (codeText: string, id: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold font-sans text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            NETWORK-SPECIFIC GUIDANCE
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Select an official Nigerian mobile network operator to review verified short codes & support channels.
          </p>
        </div>

        <div className="text-[11px] font-mono text-slate-500">
          LAST VERIFIED: <strong className="text-slate-300">{activeOperator.lastVerified}</strong>
        </div>
      </div>

      {/* Operator Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {OPERATOR_LIST.map((op) => {
          const active = op.id === selectedOperatorId;
          return (
            <button
              key={op.id}
              type="button"
              onClick={() => setSelectedOperatorId(op.id)}
              style={{
                borderColor: active ? op.accentColor : undefined,
                backgroundColor: active ? op.bgColor : undefined,
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-2 ${
                active
                  ? "shadow-lg"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-base font-black font-mono ${op.textColor}`}>
                  {op.name}
                </span>
                {active && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: op.accentColor }}
                  />
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-400 truncate">
                {op.fullName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Operator Detail View */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-6 shadow-xl">
        {/* Operator Header & Support Details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                style={{ backgroundColor: activeOperator.bgColor, color: activeOperator.accentColor }}
              >
                OFFICIAL OPERATOR
              </span>
              <span className="text-xs font-mono text-slate-400">NCC REGISTERED</span>
            </div>
            <h3 className="text-2xl font-black text-slate-100 font-sans">
              {activeOperator.fullName}
            </h3>
          </div>

          {/* Official Contact Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <a
              href={`tel:${activeOperator.supportPhone}`}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call {activeOperator.supportPhone}</span>
            </a>

            {activeOperator.supportEmail && (
              <a
                href={`mailto:${activeOperator.supportEmail}`}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Support Email</span>
              </a>
            )}

            <a
              href={activeOperator.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Website</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Verified Operator Codes List */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            VERIFIED CODES & SERVICES FOR {activeOperator.name}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeOperator.verifiedCodes.map((codeItem) => {
              const isCopied = copiedId === codeItem.id;
              return (
                <div
                  key={codeItem.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 group hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-sans text-slate-200">
                        {codeItem.service}
                      </span>
                      {codeItem.isHarmonized ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950 border border-cyan-800 text-cyan-300">
                          HARMONIZED
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-950 border border-amber-800 text-amber-300">
                          NETWORK-SPECIFIC
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-black font-mono text-cyan-300">
                      {codeItem.displayCode}
                    </div>
                    <p className="text-[11px] font-sans text-slate-400">
                      {codeItem.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(codeItem.displayCode, codeItem.id)}
                    className={`p-2 rounded-lg border font-mono text-xs font-bold transition-all shrink-0 ${
                      isCopied
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300"
                    }`}
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unverified Notice / Fallback */}
        {activeOperator.unverifiedNotes && (
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs font-sans flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold font-mono uppercase text-amber-300">
                HARMONIZATION COMPLIANCE NOTE
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeOperator.unverifiedNotes} If an unverified network-specific code is encountered, please rely on the official NCC harmonized code (*310# for balance, *312# for data, *311* for recharge).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
