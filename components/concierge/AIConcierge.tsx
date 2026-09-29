"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { DepthLayer } from "@/components/spatial/DepthLayer";
import { Tilt } from "@/components/spatial/Tilt";
import { Reveal } from "@/components/spatial/Reveal";
import { PointerGlow } from "@/components/spatial/PointerGlow";

export type ConciergeIntent =
  | "build"
  | "repair"
  | "grow"
  | "automate"
  | "protect"
  | "operate"
  | "diagnose"
  | "unknown";

export interface ConciergeRecommendation {
  intent: ConciergeIntent;
  title: string;
  summary: string;
  primaryService: { name: string; slug: string; capabilityFamily: string };
  recommendedTool?: { name: string; href: string };
  recommendedCare?: { name: string; href: string };
  actionLink: { label: string; href: string };
  relevantCapabilityFamilies: string[];
}

export type ConciergeState = "IDLE" | "SUBMITTING" | "STREAMING" | "COMPLETE" | "ERROR";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendation?: ConciergeRecommendation | null;
  isError?: boolean;
}

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

const AI_CONCIERGE_ASSET_URL =
  "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-ai-concierge.png";

export function determineIntentAndRecommendation(input: string): ConciergeRecommendation {
  const query = input.toLowerCase().trim();

  if (query.includes("slow") || query.includes("speed") || query.includes("performance") || query.includes("lag")) {
    return {
      intent: "diagnose",
      title: "Performance Diagnostic & Speed Optimization",
      summary: "Your load times directly impact visitor retention and conversion rates. We recommend running our diagnostic speed check first.",
      primaryService: { name: "Performance Optimization", slug: "performance-optimization", capabilityFamily: "WEB" },
      recommendedTool: { name: "Run Speed Diagnostic", href: "/tools/speed" },
      recommendedCare: { name: "Business Care Plan", href: "/care#care-plans" },
      actionLink: { label: "Run Speed Test Now", href: "/tools/speed" },
      relevantCapabilityFamilies: ["WEB", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("broken") || query.includes("fix") || query.includes("repair") || query.includes("error") || query.includes("crash")) {
    return {
      intent: "repair",
      title: "Website & Application Emergency Repair",
      summary: "Snow provides rapid triage and fix operations for broken sites, server errors, and integration failures.",
      primaryService: { name: "Website Repair", slug: "website-repair", capabilityFamily: "SECURITY & RECOVERY" },
      recommendedTool: { name: "Website Health Check", href: "/tools/website-health" },
      recommendedCare: { name: "Essential Care", href: "/care" },
      actionLink: { label: "Request Emergency Repair", href: "/request" },
      relevantCapabilityFamilies: ["SECURITY & RECOVERY", "WEB", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("store") || query.includes("ecommerce") || query.includes("shop") || query.includes("checkout") || query.includes("payment")) {
    return {
      intent: "build",
      title: "High-Conversion Ecommerce Architecture",
      summary: "We design and build modern online stores with secure checkout, automated inventory sync, and localized payment options.",
      primaryService: { name: "Ecommerce Systems", slug: "ecommerce-systems", capabilityFamily: "WEB" },
      recommendedTool: { name: "Run Security Check", href: "/tools/security" },
      recommendedCare: { name: "Continuous Care", href: "/care" },
      actionLink: { label: "Request Store Development", href: "/request" },
      relevantCapabilityFamilies: ["WEB", "SECURITY & RECOVERY"],
    };
  }

  if (query.includes("app") || query.includes("mobile") || query.includes("software") || query.includes("platform") || query.includes("saas")) {
    return {
      intent: "build",
      title: "Custom Application & Platform Development",
      summary: "Tailored full-stack Web and Mobile applications built with resilient databases, responsive UX, and scalable architecture.",
      primaryService: { name: "Web Applications", slug: "web-applications", capabilityFamily: "APPS & SOFTWARE" },
      recommendedTool: { name: "AI Readiness Check", href: "/tools/ai-readiness" },
      recommendedCare: { name: "Continuous Care", href: "/care" },
      actionLink: { label: "Start Application Request", href: "/request" },
      relevantCapabilityFamilies: ["APPS & SOFTWARE", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("automate") || query.includes("ai") || query.includes("bot") || query.includes("workflow") || query.includes("process")) {
    return {
      intent: "automate",
      title: "AI Solutions & Workflow Automation",
      summary: "Automate repetitive customer queries, document parsing, and business operations using intelligent LLM workflows.",
      primaryService: { name: "AI Solutions & Automation", slug: "ai-solutions-automation", capabilityFamily: "AI" },
      recommendedTool: { name: "Evaluate AI Readiness", href: "/tools/ai-readiness" },
      recommendedCare: { name: "Continuous Care", href: "/care" },
      actionLink: { label: "Explore AI Automation", href: "/request" },
      relevantCapabilityFamilies: ["AI", "BUSINESS IT"],
    };
  }

  if (query.includes("google") || query.includes("seo") || query.includes("traffic") || query.includes("visibility") || query.includes("growth")) {
    return {
      intent: "grow",
      title: "Technical SEO & Search Visibility Foundation",
      summary: "Clean semantic markup, schema structured data, and performance architecture to earn organic Google positioning.",
      primaryService: { name: "SEO & Digital Growth", slug: "seo-digital-growth", capabilityFamily: "DIGITAL GROWTH" },
      recommendedTool: { name: "Run SEO Check", href: "/tools/seo" },
      recommendedCare: { name: "Business Care", href: "/care" },
      actionLink: { label: "Run Free SEO Check", href: "/tools/seo" },
      relevantCapabilityFamilies: ["DIGITAL GROWTH", "WEB"],
    };
  }

  if (query.includes("compromised") || query.includes("hack") || query.includes("security") || query.includes("recovery") || query.includes("account")) {
    return {
      intent: "protect",
      title: "Security & Account Recovery Assistance",
      summary: "Ethical security audits, header hardening, and legitimate recovery guidance for compromised digital accounts.",
      primaryService: { name: "Account Recovery Assistance", slug: "account-recovery-assistance", capabilityFamily: "SECURITY & RECOVERY" },
      recommendedTool: { name: "Security Check", href: "/tools/security" },
      recommendedCare: { name: "Essential Care", href: "/care" },
      actionLink: { label: "Request Recovery Assistance", href: "/request" },
      relevantCapabilityFamilies: ["SECURITY & RECOVERY", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("new website") || query.includes("redesign") || query.includes("build") || query.includes("site")) {
    return {
      intent: "build",
      title: "Bespoke Website Development",
      summary: "Cinematic, fast, and responsive web presences engineered to establish technical authority and convert clients.",
      primaryService: { name: "Website Development", slug: "website-development", capabilityFamily: "WEB" },
      recommendedTool: { name: "Website Health Check", href: "/tools/website-health" },
      recommendedCare: { name: "Essential Care", href: "/care" },
      actionLink: { label: "Request Website Build", href: "/request" },
      relevantCapabilityFamilies: ["WEB", "DIGITAL GROWTH"],
    };
  }

  return {
    intent: "diagnose",
    title: "Snow Guided Technology Assessment",
    summary: "Tell us about your goals or challenges. We will guide you through a diagnostic check or match you with the exact capability family.",
    primaryService: { name: "Technology Consulting", slug: "technology-consulting", capabilityFamily: "BUSINESS IT" },
    recommendedTool: { name: "Explore All Diagnostic Tools", href: "/tools" },
    recommendedCare: { name: "Explore Snow Care", href: "/care" },
    actionLink: { label: "Request a Direct Consultation", href: "/request" },
    relevantCapabilityFamilies: ["WEB", "AI", "SECURITY & RECOVERY", "BUSINESS IT"],
  };
}

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
  const [status, setStatus] = useState<ConciergeState>("IDLE");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messageCounterRef = useRef<number>(0);
  const inputId = useId();

  // Clean up abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus("COMPLETE");
  };

  const executeChat = async (userText: string) => {
    const text = userText.trim();
    if (!text) return;

    setErrorMessage(null);
    setStatus("SUBMITTING");

    const rec = determineIntentAndRecommendation(text);

    messageCounterRef.current += 1;
    const currentCount = messageCounterRef.current;

    const userMsg: ChatMessage = {
      id: `user-msg-${currentCount}`,
      role: "user",
      content: text,
    };

    const assistantMsgId = `assistant-msg-${currentCount}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      recommendation: rec,
    };

    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, initialAssistantMsg]);
    setQuery("");

    setTimeout(scrollToBottom, 50);

    const apiPayload = newMessages.concat(userMsg).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiPayload }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        let errJson: { error?: string } = {};
        try {
          errJson = await res.json();
        } catch {
          // empty body
        }

        const fallbackContent =
          errJson.error ||
          `Snow AI Gateway key is offline or unavailable. Here is our grounded recommendation for "${text}":\n\n**${rec.title}**\n${rec.summary}`;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content: fallbackContent,
                  isError: true,
                }
              : msg
          )
        );
        setStatus("ERROR");
        setErrorMessage(fallbackContent);
        return;
      }

      setStatus("STREAMING");

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error("No response body reader returned.");
      }

      const decoder = new TextDecoder();
      let streamedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedContent = `${streamedContent}${chunk}`;

        const nextContent = streamedContent;

        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, content: nextContent } : msg))
        );
        scrollToBottom();
      }

      setStatus("COMPLETE");
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setStatus("COMPLETE");
        return;
      }

      const fallbackContent = `Snow AI Concierge operates in offline mode when the AI Gateway is unreachable. Grounded recommendation for "${text}":\n\n**${rec.title}**\n${rec.summary}`;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: msg.content || fallbackContent,
                isError: true,
              }
            : msg
        )
      );
      setStatus("ERROR");
      setErrorMessage("System communication error. Showing grounded fallback recommendations.");
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (status === "SUBMITTING" || status === "STREAMING") return;
    executeChat(query);
  };

  const handleSelectPrompt = (prompt: string) => {
    if (status === "SUBMITTING" || status === "STREAMING") return;
    executeChat(prompt);
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMessage) {
      executeChat(lastUserMessage.content);
    }
  };

  const handleClearHistory = () => {
    if (status === "SUBMITTING" || status === "STREAMING") {
      handleStop();
    }
    setMessages([]);
    setStatus("IDLE");
    setErrorMessage(null);
  };

  const latestAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");
  const activeRecommendation = latestAssistantMessage?.recommendation;

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 p-4 sm:p-8 ${className}`}>
      <PointerGlow color="rgba(56, 189, 248, 0.15)" size={500} />

      <PerspectiveContainer perspective={1000} className="relative z-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
          <div className="md:col-span-8 text-center md:text-left">
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/60 uppercase mb-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === "STREAMING" || status === "SUBMITTING"
                      ? "bg-amber-400 animate-ping"
                      : status === "ERROR"
                      ? "bg-rose-400"
                      : "bg-sky-400 animate-pulse"
                  }`}
                />
                {status === "SUBMITTING"
                  ? "SYSTEM THINKING"
                  : status === "STREAMING"
                  ? "STREAMING RESPONSE"
                  : status === "ERROR"
                  ? "SYSTEM FALLBACK"
                  : "SYSTEM READY"}
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-2">{title}</h2>
              <p className="text-sm sm:text-base text-slate-400">{subtitle}</p>
            </Reveal>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[200px] aspect-[4/3] rounded-2xl overflow-hidden border border-sky-500/30 shadow-lg shadow-sky-950/50">
              <Image
                src={AI_CONCIERGE_ASSET_URL}
                alt="Snow Intelligent AI Concierge Visual Stage"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>
          </div>
        </div>

        {/* Conversation Stream Container */}
        {messages.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Session Transcript ({messages.length} message{messages.length === 1 ? "" : "s"})
              </span>
              <button
                type="button"
                onClick={handleClearHistory}
                className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear Conversation
              </button>
            </div>

            <div
              ref={chatContainerRef}
              aria-live="polite"
              className="max-h-[360px] overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner scrollbar-thin scrollbar-thumb-slate-700"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      {msg.role === "user" ? "You" : "Snow Concierge AI"}
                    </span>
                  </div>

                  <div
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-sm sm:text-base leading-relaxed ${
                      msg.role === "user"
                        ? "bg-sky-600/20 text-sky-100 border border-sky-500/30 rounded-tr-none"
                        : msg.isError
                        ? "bg-rose-950/30 text-rose-200 border border-rose-800/60 rounded-tl-none"
                        : "bg-slate-950/90 text-slate-200 border border-slate-800 rounded-tl-none"
                    }`}
                  >
                    {msg.role === "assistant" && !msg.content && (status === "SUBMITTING" || status === "STREAMING") ? (
                      <div className="flex items-center gap-2 text-sky-400 font-mono text-xs animate-pulse py-1">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
                        Generating grounded intelligence response...
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <Reveal direction="up" delay={100}>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative flex items-center">
              <label htmlFor={inputId} className="sr-only">
                What do you need help with?
              </label>
              <input
                id={inputId}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. My website loads slowly and customers are complaining..."
                disabled={status === "SUBMITTING" || status === "STREAMING"}
                className="w-full py-3.5 sm:py-4 pl-4 sm:pl-5 pr-32 sm:pr-36 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner disabled:opacity-60"
              />
              <div className="absolute right-2 flex items-center gap-1">
                {status === "STREAMING" || status === "SUBMITTING" ? (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-xs transition-all"
                  >
                    Stop 🛑
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!query.trim()}
                    className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analyze ↗
                  </button>
                )}
              </div>
            </div>
          </form>
        </Reveal>

        {/* Suggested Prompts */}
        <Reveal direction="up" delay={150}>
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
              Suggested Prompts:
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSelectPrompt(prompt)}
                  disabled={status === "SUBMITTING" || status === "STREAMING"}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-800 hover:border-sky-800/60 transition-all text-left disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Error State Banner */}
        {status === "ERROR" && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <p className="text-xs font-mono text-rose-300">
                {errorMessage || "AI Service notice. Operating in offline diagnostic mode."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="px-3.5 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-rose-100 font-mono text-xs border border-rose-700/60 transition-all"
            >
              Retry AI Query ↻
            </button>
          </div>
        )}

        {/* Deterministic Recommendation Card Output */}
        {activeRecommendation && (
          <Reveal direction="up" delay={200}>
            <Tilt maxRotation={4}>
              <div className="p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-sky-950/30 border border-sky-800/60 shadow-2xl relative">
                <DepthLayer depth={10}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono font-semibold tracking-wider text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800/80 uppercase">
                      GROUNDED INTENT: {activeRecommendation.intent.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {activeRecommendation.relevantCapabilityFamilies.map((fam) => (
                        <span key={fam} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {fam}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">{activeRecommendation.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">{activeRecommendation.summary}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800/80 pt-6 mb-6">
                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Recommended Service</span>
                      <p className="text-sm font-semibold text-slate-100">{activeRecommendation.primaryService.name}</p>
                    </div>

                    {activeRecommendation.recommendedTool && (
                      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
                        <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Diagnostic Tool</span>
                        <Link href={activeRecommendation.recommendedTool.href} className="text-sm font-semibold text-sky-400 hover:underline">
                          {activeRecommendation.recommendedTool.name} ↗
                        </Link>
                      </div>
                    )}

                    {activeRecommendation.recommendedCare && (
                      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
                        <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Long-term Care</span>
                        <Link href={activeRecommendation.recommendedCare.href} className="text-sm font-semibold text-emerald-400 hover:underline">
                          {activeRecommendation.recommendedCare.name} ↗
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                      href={activeRecommendation.actionLink.href}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all text-center shadow-md shadow-sky-950"
                    >
                      {activeRecommendation.actionLink.label}
                    </Link>
                    <span className="text-xs text-slate-500 font-mono">
                      Connected to Snow Intelligent Service Engine
                    </span>
                  </div>
                </DepthLayer>
              </div>
            </Tilt>
          </Reveal>
        )}
      </PerspectiveContainer>
    </div>
  );
};
