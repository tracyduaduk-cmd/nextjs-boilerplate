"use client";

import React, { useRef, useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { DepthLayer } from "@/components/spatial/DepthLayer";
import { Tilt } from "@/components/spatial/Tilt";
import { Reveal } from "@/components/spatial/Reveal";
import { PointerGlow } from "@/components/spatial/PointerGlow";
import {
  determineIntentAndRecommendation,
  type ConciergeRecommendation,
} from "@/lib/ai/recommendations";

export { determineIntentAndRecommendation } from "@/lib/ai/recommendations";
export type { ConciergeIntent, ConciergeRecommendation } from "@/lib/ai/recommendations";

const SUGGESTED_PROMPTS = [
  "My website is broken",
  "I need a new website",
  "I want an online store",
  "I need an app",
  "I want to automate my business",
  "My website is slow",
  "I need better Google visibility",
  "I think my account was compromised",
  "I need help choosing the right technology",
  "I'm not sure what I need",
];

const AI_CONCIERGE_ASSET_URL = "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-ai-concierge.png";
type ChatMessage = { role: "user" | "assistant"; content: string };
type ConciergeStatus = "idle" | "submitting" | "streaming" | "complete" | "error";

export interface AIConciergeProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const AIConcierge: React.FC<AIConciergeProps> = ({
  className = "",
  title = "Snow Intelligent Concierge",
  subtitle = "Describe your business challenge or goal in plain language.",
}) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ConciergeStatus>("idle");
  const [recommendation, setRecommendation] = useState<ConciergeRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortController = useRef<AbortController | null>(null);
  const inputId = useId();
  const isBusy = status === "submitting" || status === "streaming";

  const submitMessage = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || isBusy) return;

    abortController.current?.abort();
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setQuery("");
    setError(null);
    setRecommendation(determineIntentAndRecommendation(trimmed));
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setStatus("submitting");

    const controller = new AbortController();
    abortController.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(payload?.error || "Snow Concierge could not complete that request.");
      }
      if (!response.body) throw new Error("Snow Concierge returned an empty response.");

      setStatus("streaming");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages([...nextMessages, { role: "assistant", content: assistantText }]);
      }
      assistantText += decoder.decode();
      setMessages([...nextMessages, { role: "assistant", content: assistantText }]);
      setStatus("complete");
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") return;
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Snow Concierge is temporarily unavailable.");
      setMessages(nextMessages);
    } finally {
      abortController.current = null;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void submitMessage(query);
  };

  const statusLabel = status === "streaming" ? "STREAMING" : status === "submitting" ? "THINKING" : status === "error" ? "ERROR" : status === "complete" ? "COMPLETE" : "SYSTEM READY";

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 p-4 sm:p-8 ${className}`}>
      <PointerGlow color="rgba(56, 189, 248, 0.15)" size={500} />
      <PerspectiveContainer perspective={1000} className="relative z-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
          <div className="md:col-span-8 text-center md:text-left">
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/60 uppercase mb-3">
                <span className={`w-2 h-2 rounded-full bg-sky-400 ${isBusy ? "animate-ping" : ""}`} />
                {statusLabel} · Snow Concierge
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-2">{title}</h2>
              <p className="text-sm sm:text-base text-slate-400">{subtitle}</p>
            </Reveal>
          </div>
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[200px] aspect-[4/3] rounded-2xl overflow-hidden border border-sky-500/30 shadow-lg shadow-sky-950/50">
              <Image src={AI_CONCIERGE_ASSET_URL} alt="Snow Intelligent AI Concierge Visual Stage" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 200px" />
            </div>
          </div>
        </div>

        <Reveal direction="up" delay={100}>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative flex items-center">
              <label htmlFor={inputId} className="sr-only">What do you need help with?</label>
              <input id={inputId} type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. My website loads slowly and customers are complaining..." maxLength={4000} disabled={isBusy} className="w-full py-3.5 sm:py-4 pl-4 sm:pl-5 pr-28 sm:pr-32 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner disabled:opacity-60" />
              <button type="submit" disabled={isBusy || !query.trim()} className="absolute right-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {isBusy ? "Working..." : "Ask Snow ↗"}
              </button>
            </div>
          </form>
        </Reveal>

        <Reveal direction="up" delay={150}>
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">Suggested Prompts:</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {SUGGESTED_PROMPTS.map((prompt) => <button key={prompt} type="button" onClick={() => void submitMessage(prompt)} disabled={isBusy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-800 hover:border-sky-800/60 transition-all text-left disabled:opacity-50">{prompt}</button>)}
            </div>
          </div>
        </Reveal>

        {error && (
          <div role="alert" className="mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-rose-900/70 bg-rose-950/30 p-4 text-sm text-rose-200">
            <span>{error}</span>
            <button type="button" onClick={() => void submitMessage(messages.findLast((message) => message.role === "user")?.content || "")} className="shrink-0 rounded-lg border border-rose-800 px-3 py-1.5 text-xs font-semibold hover:bg-rose-900/40">Retry</button>
          </div>
        )}

        {messages.length > 0 && (
          <div aria-live="polite" aria-busy={isBusy} className="space-y-3 mb-6" aria-label="Snow Concierge conversation">
            {messages.map((message, index) => message.content || (message.role === "assistant" && isBusy) ? (
              <div key={`${message.role}-${index}`} className={`rounded-2xl border p-4 ${message.role === "user" ? "ml-4 sm:ml-16 border-slate-700 bg-slate-900/80 text-slate-200" : "mr-4 sm:mr-16 border-sky-900/70 bg-sky-950/25 text-slate-200"}`}>
                <div className="mb-1 text-[10px] font-mono uppercase tracking-widest text-sky-400">{message.role === "user" ? "YOU" : isBusy && index === messages.length - 1 ? "SNOW · STREAMING" : "SNOW CONCIERGE"}</div>
                {message.content ? <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p> : <span className="inline-flex gap-1" aria-label="Snow is thinking"><span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce" /><span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:120ms]" /><span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:240ms]" /></span>}
              </div>
            ) : null)}
          </div>
        )}

        {recommendation && (
          <Reveal direction="up" delay={100}>
            <Tilt maxRotation={4}>
              <div className="p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-sky-950/30 border border-sky-800/60 shadow-2xl relative">
                <DepthLayer depth={10}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono font-semibold tracking-wider text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800/80 uppercase">INTENT MATCH: {recommendation.intent}</span>
                    <div className="flex flex-wrap items-center gap-1.5">{recommendation.relevantCapabilityFamilies.map((family) => <span key={family} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{family}</span>)}</div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">{recommendation.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">{recommendation.summary}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800/80 pt-6 mb-6">
                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60"><span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Recommended Service</span><p className="text-sm font-semibold text-slate-100">{recommendation.primaryService.name}</p></div>
                    {recommendation.recommendedTool && <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60"><span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Diagnostic Tool</span><Link href={recommendation.recommendedTool.href} className="text-sm font-semibold text-sky-400 hover:underline">{recommendation.recommendedTool.name} ↗</Link></div>}
                    {recommendation.recommendedCare && <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60"><span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Long-term Care</span><Link href={recommendation.recommendedCare.href} className="text-sm font-semibold text-emerald-400 hover:underline">{recommendation.recommendedCare.name} ↗</Link></div>}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4"><Link href={recommendation.actionLink.href} className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all text-center shadow-md shadow-sky-950">{recommendation.actionLink.label}</Link><span className="text-xs text-slate-500 font-mono">Grounded Snow capability mapping</span></div>
                </DepthLayer>
              </div>
            </Tilt>
          </Reveal>
        )}
        <p className="mt-5 text-center text-[11px] font-mono text-slate-600">TEXT ONLY · SESSION-ONLY CONVERSATION · NO PROMPTS OR RESPONSES STORED</p>
      </PerspectiveContainer>
    </div>
  );
};
