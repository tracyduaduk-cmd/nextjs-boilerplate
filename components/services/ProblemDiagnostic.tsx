"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { SplitText } from "@/components/spatial/SplitText";
import { Tilt } from "@/components/spatial/Tilt";
import { PROBLEM_DIAGNOSTIC_OPTIONS } from "@/lib/services/capabilityFamilies";
import { ProblemOption } from "@/lib/services/types";
import {
  Globe,
  Wrench,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Briefcase,
  Cloud,
  HelpCircle,
  ArrowRight,
  HelpCircle as QuestionIcon,
} from "lucide-react";

interface ProblemDiagnosticProps {
  onSelectOption: (option: ProblemOption) => void;
  activeOptionId?: string | null;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  "need-website": Globe,
  "website-broken": Wrench,
  "need-app": Smartphone,
  "security-account": ShieldCheck,
  "ai-automation": Sparkles,
  "technical-support": Briefcase,
  "hosting-infrastructure": Cloud,
  "not-sure": QuestionIcon,
};

export const ProblemDiagnostic: React.FC<ProblemDiagnosticProps> = ({
  onSelectOption,
  activeOptionId = null,
  className = "",
}) => {
  return (
    <section
      id="problem-diagnostic"
      className={`relative py-16 sm:py-24 bg-slate-950 border-b border-slate-900 text-slate-100 ${className}`}
    >
      {/* Background Spatial Atmosphere */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(56,189,248,0.08),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header & Central Product Principle */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300 w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>PROBLEM DIAGNOSTIC</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">ENTRY POINT</span>
            </div>
          </Reveal>

          <SplitText
            text="What are you trying to solve?"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight font-sans justify-center"
            delay={0.15}
          />

          {/* Central Product Philosophy Badge */}
          <Reveal direction="up" delay={0.25}>
            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/90 to-slate-900/90 border border-slate-800/80 shadow-xl max-w-2xl mx-auto backdrop-blur-md">
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed italic font-medium">
                &ldquo;Bring us the technology problem. We can help you understand it, solve it, build it, or maintain it.&rdquo;
              </p>
              <div className="mt-2 text-[11px] font-mono text-sky-400 font-semibold tracking-wider uppercase">
                — SNOW PRINCIPLE
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.35}>
            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl mx-auto pt-2">
              Select your immediate technical challenge below to navigate directly to the relevant capability family and engineering team.
            </p>
          </Reveal>
        </div>

        {/* Diagnostic Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PROBLEM_DIAGNOSTIC_OPTIONS.map((option, index) => {
            const IconComponent = iconMap[option.id] || HelpCircle;
            const isSelected = activeOptionId === option.id;

            return (
              <Reveal key={option.id} direction="up" delay={0.1 + index * 0.05}>
                <Tilt maxRotation={5} scaleOnHover={1.02} glare={true} className="h-full">
                  <button
                    type="button"
                    onClick={() => onSelectOption(option)}
                    className={`w-full h-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isSelected
                        ? "bg-slate-900 border-sky-500/60 shadow-lg shadow-sky-950/40 ring-1 ring-sky-500/30"
                        : "bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700/80"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div>
                      {/* Top Header: Badge & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-2.5 rounded-xl border transition-colors ${
                            isSelected
                              ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                              : "bg-slate-900 text-slate-300 border-slate-800 group-hover:border-sky-500/30 group-hover:text-sky-400"
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>

                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 group-hover:border-slate-700">
                          {option.badge}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-base font-bold text-slate-100 font-sans group-hover:text-sky-300 transition-colors leading-snug">
                        {option.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-400 font-sans leading-relaxed">
                        {option.subtitle}
                      </p>
                    </div>

                    {/* Footer Action Indicator */}
                    <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                        Explore Capability
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
