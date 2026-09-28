"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { ProximitySurface } from "@/components/spatial/ProximitySurface";
import { SystemBadge } from "@/components/spatial/SystemBadge";
import { ChevronDown } from "lucide-react";

const careFaqs = [
  {
    code: "QUERY 01",
    q: "Can Snow maintain a website or application built by someone else?",
    a: "Yes. Before embarking on ongoing care, we conduct an Assess & Stabilize phase to review the codebase, security setup, hosting environment, and dependency health. Once baseline stability is verified, we integrate it into Snow Care.",
  },
  {
    code: "QUERY 02",
    q: "Does maintenance include web hosting?",
    a: "Snow Care covers technical management, server configuration monitoring, and hosting administration. While cloud server provider fees are billed directly to your account or bundled, Snow manages the environment on your behalf.",
  },
  {
    code: "QUERY 03",
    q: "Does maintenance include regular content updates?",
    a: "Yes. All Snow Care levels include support for routine content updates such as publishing articles, updating product info, changing team bios, or modifying textual copy.",
  },
  {
    code: "QUERY 04",
    q: "Can Snow maintain custom ecommerce systems?",
    a: "Absolutely. Ecommerce platforms require specialized attention to verify payment integration health, checkout flows, database performance, and transaction security.",
  },
  {
    code: "QUERY 05",
    q: "Can Snow help if my website suddenly breaks?",
    a: "Yes. We offer rapid emergency repair and diagnostic assistance. You can start with a targeted one-time repair service before transitioning into preventative ongoing Care.",
  },
  {
    code: "QUERY 06",
    q: "Can maintenance include security monitoring and patching?",
    a: "Yes. Security review is an essential component of Snow Care. We monitor SSL certificates, review security headers, update vulnerable dependencies, and apply safety patches.",
  },
  {
    code: "QUERY 07",
    q: "Can I start with a one-time repair or audit before committing to ongoing care?",
    a: "Yes. Many client relationships begin with a targeted technical repair or diagnostic health audit. Once your system is stabilized, ongoing Care plans keep it optimized.",
  },
  {
    code: "QUERY 08",
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
    <section className="py-20 bg-slate-950/80 border-b border-slate-800/80 relative overflow-hidden">
      <Container>
        <div className="max-w-3xl mb-12">
          <Reveal direction="up">
            <SystemBadge variant="neutral" pulse={false} className="mb-4">
              CARE // KNOWLEDGE BASE
            </SystemBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-sans">
              Frequently Asked Questions.
            </h2>
          </Reveal>
        </div>

        <div className="max-w-4xl space-y-3.5">
          {careFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={faq.q} direction="up" delay={index * 30}>
                <ProximitySurface
                  glowColor="rgba(56, 189, 248, 0.12)"
                  borderColor={isOpen ? "rgba(16, 185, 129, 0.5)" : "rgba(255, 255, 255, 0.08)"}
                  className="bg-slate-900/60 border border-slate-800/80 transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[11px] font-mono font-bold text-emerald-400/90 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                        {faq.code}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-100 font-sans group-hover:text-emerald-300 transition-colors">
                        {faq.q}
                      </span>
                    </div>
                    <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-300 border-t border-slate-800/80 pt-4 leading-relaxed font-sans">
                      {faq.a}
                    </div>
                  )}
                </ProximitySurface>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
