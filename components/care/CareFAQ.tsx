"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";

const careFaqs = [
  {
    q: "Can Snow maintain a website or application built by someone else?",
    a: "Yes. Before embarking on ongoing care, we conduct an Assess & Stabilize phase to review the codebase, security setup, hosting environment, and dependency health. Once baseline stability is verified, we integrate it into Snow Care.",
  },
  {
    q: "Does maintenance include web hosting?",
    a: "Snow Care covers technical management, server configuration monitoring, and hosting administration. While cloud server provider fees are billed directly to your account or bundled, Snow manages the environment on your behalf.",
  },
  {
    q: "Does maintenance include regular content updates?",
    a: "Yes. All Snow Care levels include support for routine content updates such as publishing articles, updating product info, changing team bios, or modifying textual copy.",
  },
  {
    q: "Can Snow maintain custom ecommerce systems?",
    a: "Absolutely. Ecommerce platforms require specialized attention to verify payment integration health, checkout flows, database performance, and transaction security.",
  },
  {
    q: "Can Snow help if my website suddenly breaks?",
    a: "Yes. We offer rapid emergency repair and diagnostic assistance. You can start with a targeted one-time repair service before transitioning into preventative ongoing Care.",
  },
  {
    q: "Can maintenance include security monitoring and patching?",
    a: "Yes. Security review is an essential component of Snow Care. We monitor SSL certificates, review security headers, update vulnerable dependencies, and apply safety patches.",
  },
  {
    q: "Can I start with a one-time repair or audit before committing to ongoing care?",
    a: "Yes. Many client relationships begin with a targeted technical repair or diagnostic health audit. Once your system is stabilized, ongoing Care plans keep it optimized.",
  },
  {
    q: "What happens before a Care plan officially starts?",
    a: "We conduct an onboarding audit to inspect access credentials, server logs, dependency trees, and backup procedures. We then present a baseline report and recommend the ideal Care tier.",
  },
];

export const CareFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 bg-slate-950/60 border-b border-slate-800/60">
      <Container>
        <div className="max-w-3xl mb-12">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2 block">Clarifications</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
              Frequently Asked Questions.
            </h2>
          </Reveal>
        </div>

        <div className="max-w-4xl space-y-4">
          {careFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={faq.q} direction="up" delay={index * 30}>
                <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-hidden transition-colors">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-semibold text-slate-100">{faq.q}</span>
                    <span className="text-emerald-400 font-mono text-xl shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-slate-300 border-t border-slate-800/60 pt-4 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
