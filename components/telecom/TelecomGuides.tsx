"use client";

import React, { useState } from "react";
import { MessageSquare, ShieldCheck, ArrowRightLeft, Lock, Copy, Check, ExternalLink, AlertTriangle } from "lucide-react";
import { DND_COMMANDS } from "@/lib/telecom";

export const TelecomGuides: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="w-full space-y-12">
      {/* 1. DND (DO-NOT-DISTURB) SECTION */}
      <section id="dnd" className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-teal-500/20 text-teal-300 border border-teal-500/40">
                NCC 2442 DIRECTIVE
              </span>
              <span className="text-xs font-mono text-slate-400">SMS PROTOCOL</span>
            </div>
            <h2 className="text-2xl font-black font-sans text-slate-100 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-teal-400" />
              DO-NOT-DISTURB (DND) MANAGEMENT
            </h2>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
            <span className="text-[9px] text-slate-500 uppercase block">HARMONIZED DND SHORT CODE</span>
            <span className="text-2xl font-black text-teal-300">2442</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-200 font-sans">
              How the 2442 DND System Works
            </h3>
            <p className="leading-relaxed text-slate-300">
              The Nigerian Communications Commission (NCC) mandated short code <strong className="text-teal-300 font-mono">2442</strong> enables subscribers to stop receiving unsolicited marketing SMS messages and promotional robocalls across all mobile networks.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1 font-mono text-slate-400">
              <span className="text-teal-400 font-bold block">IMPORTANT PROTOCOL NOTE:</span>
              DND operations work strictly via <strong className="text-slate-200">SMS</strong>. They are not USSD code prompts.
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-200 font-sans">
              Full DND vs. Partial DND
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside font-sans">
              <li>
                <strong className="text-slate-100">Full DND:</strong> Completely blocks all promotional and marketing broadcasts from third-party services.
              </li>
              <li>
                <strong className="text-slate-100">Partial DND:</strong> Allows selective delivery of critical categories like banking alerts, education, or health notices while blocking spam.
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive DND SMS Commands Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            OFFICIAL DND SMS INSTRUCTIONS (SEND TO 2442)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DND_COMMANDS.map((cmd) => {
              const isCopied = copiedCmd === cmd.command;
              return (
                <div
                  key={cmd.command}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 font-mono">
                        {cmd.purpose}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">To 2442</span>
                    </div>
                    <div className="text-xl font-black font-mono text-teal-300">
                      {cmd.command}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {cmd.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(cmd.command, cmd.command)}
                    className={`w-full py-1.5 px-2 rounded-lg font-mono text-[11px] font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      isCopied
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-teal-500/20 hover:text-teal-300"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Command Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SMS Command</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. SIM / NIN LINKAGE SECTION */}
      <section id="nin" className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-6 shadow-2xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-violet-500/20 text-violet-300 border border-violet-500/40">
                NIMC & NCC MANDATE
              </span>
              <span className="text-xs font-mono text-slate-400">HARMONIZED *996#</span>
            </div>
            <h2 className="text-2xl font-black font-sans text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-violet-400" />
              SIM REGISTRATION & NIN LINKAGE
            </h2>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
            <span className="text-[9px] text-slate-500 uppercase block">HARMONIZED NIN CODE</span>
            <span className="text-2xl font-black text-violet-300">*996#</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-200 font-sans">
              Understanding *996# Harmonized Service
            </h3>
            <p className="leading-relaxed">
              In accordance with national security directives and the National Identity Management Commission (NIMC) framework, all active mobile subscriber SIM cards in Nigeria must be linked to a valid National Identification Number (NIN).
            </p>
            <p className="text-xs text-slate-400">
              Dialing <strong className="text-violet-300 font-mono">*996#</strong> replaces all legacy network-specific codes (such as MTN *785# or Airtel *121*1#) with a single unified portal.
            </p>
          </div>

          {/* Privacy & Zero Data Guarantee */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-violet-500/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-violet-300 font-bold">
              <Lock className="w-4 h-4 text-violet-400" />
              <span>ZERO DATA COLLECTION GUARANTEE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Snow is an open telecom reference utility. Snow <strong className="text-white">never requests, collects, processes, or stores</strong> your phone number, National Identification Number (NIN), BVN, OTPs, or identity documents.
            </p>
            <div className="text-[10px] font-mono text-slate-400">
              All USSD interactions occur directly between your device and your mobile network operator.
            </div>
          </div>
        </div>
      </section>

      {/* 3. MOBILE NUMBER PORTABILITY (MNP) SECTION */}
      <section id="porting" className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40">
                NCC MNP FRAMEWORK
              </span>
              <span className="text-xs font-mono text-slate-400">SMS CODE 3232</span>
            </div>
            <h2 className="text-2xl font-black font-sans text-slate-100 flex items-center gap-2">
              <ArrowRightLeft className="w-6 h-6 text-fuchsia-400" />
              MOBILE NUMBER PORTABILITY (MNP)
            </h2>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
            <span className="text-[9px] text-slate-500 uppercase block">HARMONIZED PORTING CODE</span>
            <span className="text-2xl font-black text-fuchsia-300">3232</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-fuchsia-400 font-bold">1. PHYSICAL IN-PERSON VISIT</span>
            <p className="text-slate-300 font-sans text-xs">
              Visit a customer service center of the operator you wish to switch to (Recipient Operator) with valid photo identification and your active SIM.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-fuchsia-400 font-bold">2. SMS INITIATION TO 3232</span>
            <p className="text-slate-300 font-sans text-xs">
              Send SMS command <strong className="text-fuchsia-300 font-mono">PORT</strong> to short code <strong className="text-fuchsia-300 font-mono">3232</strong> as instructed by the customer care representative.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-fuchsia-400 font-bold">3. 90-DAY RESTRICTION</span>
            <p className="text-slate-300 font-sans text-xs">
              Once ported, NCC regulations require subscribers to remain on the new network for a minimum 90-day window before porting again.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono pt-2">
          <a
            href="https://www.ncc.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Read official NCC MNP documentation</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Trust & Verification Disclaimer Footer */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs font-sans text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-mono text-amber-300 uppercase block">
            REGULATORY VERIFICATION DISCLAIMER
          </strong>
          <p className="text-slate-300 leading-relaxed">
            Telecom codes and operator services are subject to regulatory updates by the Nigerian Communications Commission (NCC) and individual mobile network operators. Verify details with your service provider or the official NCC portal (<a href="https://www.ncc.gov.ng" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">ncc.gov.ng</a>) before relying on them.
          </p>
        </div>
      </div>
    </div>
  );
};
