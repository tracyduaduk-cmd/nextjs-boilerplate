"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { Container } from "@/components/ui/Container";

interface Question {
  id: string;
  dimension: "Data" | "Workflow" | "Customer Experience" | "Technology" | "Governance";
  question: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: "data-org",
    dimension: "Data",
    question: "How organized and accessible is your core business information?",
    options: [
      { label: "Scattered in emails, paper files, or unorganized spreadsheets", score: 1 },
      { label: "Stored in digital cloud folders, but not standardized or indexed", score: 2 },
      { label: "Structured cleanly in databases, CRMs, or structured docs", score: 3 },
    ],
  },
  {
    id: "workflow-doc",
    dimension: "Workflow",
    question: "Are your repetitive manual operational tasks identified and documented?",
    options: [
      { label: "Tasks live only in employees' heads without written steps", score: 1 },
      { label: "Some SOPs exist, but workflows still require manual intervention", score: 2 },
      { label: "Step-by-step SOPs and repetitive workflows are fully mapped out", score: 3 },
    ],
  },
  {
    id: "cx-faq",
    dimension: "Customer Experience",
    question: "How consistently are customer enquiries and support questions handled?",
    options: [
      { label: "Enquiries answered ad-hoc with high variation in response quality", score: 1 },
      { label: "Common FAQs exist, but team manually copies and pastes answers", score: 2 },
      { label: "Documented knowledge base and structured response guidelines in place", score: 3 },
    ],
  },
  {
    id: "tech-api",
    dimension: "Technology",
    question: "Are your key software tools and databases connected via APIs?",
    options: [
      { label: "Tools operate as isolated silos with manual data re-entry", score: 1 },
      { label: "A few Zapier or basic webhooks connect isolated tools", score: 2 },
      { label: "Modern cloud stack with REST/GraphQL APIs and automated data sync", score: 3 },
    ],
  },
  {
    id: "gov-human",
    dimension: "Governance",
    question: "Are privacy rules and human approval points defined for automated actions?",
    options: [
      { label: "No formal guidelines on data handling or AI approval gates", score: 1 },
      { label: "Basic privacy considerations exist, but approval workflows are informal", score: 2 },
      { label: "Clear data privacy policies and human-in-the-loop signoff protocols defined", score: 3 },
    ],
  },
];

export default function AiReadinessPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const calculateTier = () => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

    if (totalScore <= 7) {
      return {
        tier: "FOUNDATION",
        title: "Foundation Phase",
        description: "Your business has significant potential for AI, but requires foundational data organizing and workflow documentation before deploying automated LLM agents.",
        recommendation: "Focus on digitizing unstructured documents and standardizing customer FAQs into a clean knowledge base.",
        service: "Technology Consulting & Business IT",
      };
    }
    if (totalScore <= 10) {
      return {
        tier: "READY",
        title: "AI Ready",
        description: "Your business operates with clean digital workflows and is well-positioned to implement targeted AI automation in customer support or internal document processing.",
        recommendation: "Start with an AI Customer Concierge or automated enquiry routing workflow.",
        service: "AI Solutions & Automation",
      };
    }
    if (totalScore <= 13) {
      return {
        tier: "OPPORTUNITY",
        title: "High Opportunity",
        description: "Your data structures and connected software APIs make your business an exceptional candidate for multi-system LLM workflows and automated operations.",
        recommendation: "Deploy custom AI agents connected to your CRM, database, and messaging channels.",
        service: "AI Solutions & Web Applications",
      };
    }
    return {
      tier: "ADVANCED",
      title: "Advanced System Maturity",
      description: "Your operational technology, API connectivity, and governance protocols are fully prepared for autonomous AI workflows, RAG knowledge retrieval, and custom model tuning.",
      recommendation: "Engineer custom retrieval-augmented AI systems and multi-step autonomous workflow automation.",
      service: "AI Solutions & Custom Infrastructure",
    };
  };

  const isComplete = Object.keys(answers).length === questions.length;
  const result = submitted ? calculateTier() : null;

  return (
    <ToolShell>
      <ToolHero
        badge="Snow AI Framework"
        title="AI Readiness Assessment"
        description="Is your business ready to use AI properly? Evaluate your data, workflows, customer experience, technology stack, and governance protocols."
        status={submitted ? "completed" : "engine-ready"}
        statusMessage={submitted ? "Assessment Matrix Computed" : "Framework Ready"}
      />

      <Container className="py-12">
        {!submitted ? (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300">
              <p className="font-semibold text-slate-100 mb-1">Snow AI Evaluation Framework</p>
              <p className="text-slate-400">
                Answer the 5 brief questions below to evaluate your operational maturity across Data, Workflow, Customer Experience, Technology, and Governance.
              </p>
            </div>

            {questions.map((q, qIndex) => (
              <div key={q.id} className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800/80">
                    Dimension 0{qIndex + 1}: {q.dimension}
                  </span>
                  <span className="text-xs font-mono text-slate-500">Question {qIndex + 1} of 5</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100">{q.question}</h3>

                <div className="space-y-3 pt-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.score)}
                        className={`w-full text-left p-4 rounded-xl text-sm transition-all border flex items-center justify-between gap-4 ${
                          isSelected
                            ? "bg-teal-950/80 border-teal-400 text-slate-100 shadow-md"
                            : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300"
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className={`w-4 h-4 rounded-full border shrink-0 ${isSelected ? "bg-teal-400 border-teal-400" : "border-slate-700"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button
                type="button"
                disabled={!isComplete}
                onClick={() => setSubmitted(true)}
                className="px-8 py-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-teal-950/50"
              >
                Calculate AI Readiness Tier ↗
              </button>
              {!isComplete && (
                <p className="text-xs font-mono text-slate-500 mt-2">
                  Please answer all 5 questions to generate your assessment.
                </p>
              )}
            </div>
          </div>
        ) : (
          result && (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-teal-800/60 text-center shadow-2xl">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400 bg-teal-950 px-4 py-1.5 rounded-full border border-teal-800/80 inline-block mb-4">
                  MATURITY TIER: {result.tier}
                </span>

                <h2 className="text-3xl font-extrabold text-slate-100 mb-4">{result.title}</h2>
                <p className="text-base text-slate-300 leading-relaxed mb-6">{result.description}</p>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-sm text-slate-300 mb-8 space-y-2">
                  <p className="text-xs font-mono text-teal-400 uppercase font-semibold">Recommended Next Step:</p>
                  <p>{result.recommendation}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/request"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm transition-all"
                  >
                    Request {result.service} ↗
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setAnswers({});
                    }}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700 transition-all"
                  >
                    Retake Assessment
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400">
                <p className="font-mono text-slate-300 mb-1">Snow AI Evaluation Framework</p>
                <p>This assessment represents Snow&apos;s technology operational readiness model for small &amp; growing enterprises.</p>
              </div>
            </div>
          )
        )}

        <ToolCTA />
      </Container>
    </ToolShell>
  );
}
