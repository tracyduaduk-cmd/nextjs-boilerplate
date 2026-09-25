import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: "Website Design & Development", href: "#services" },
    { label: "Web Application Development", href: "#services" },
    { label: "Maintenance & Technical Support", href: "#services" },
    { label: "AI Integrations & Applications", href: "#services" },
    { label: "Business Automation & APIs", href: "#services" },
    { label: "Performance & Optimization", href: "#services" },
  ];

  const quickLinks = [
    { label: "Services", href: "#services" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Approach", href: "#approach" },
    { label: "Get in Touch", href: "#contact" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 font-sans">
      {/* Footer Contact Callout */}
      <div className="border-b border-slate-900 bg-slate-950/60 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-slate-900/60 border border-slate-800 p-8 sm:p-12 rounded-2xl">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2 block">
                Ready to elevate your technology?
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                Let&apos;s build a faster, clearer, and more capable digital foundation.
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-400">
                Whether you need a new web application, AI-powered automation, or urgent technical fixes, Snow is ready to partner with you.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button href="#contact" variant="primary" size="lg">
                Start a Conversation
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <Logo size="md" />
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Snow is a modern technology services company building high-performance web applications, intelligent AI workflows, and resilient digital infrastructure.
              </p>
              <div className="pt-2 text-xs text-slate-500">
                <span>Precision Engineering</span> • <span>Modern Stack</span> • <span>Capable Execution</span>
              </div>
            </div>

            {/* Service Capabilities Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200">
                Capabilities
              </h4>
              <ul className="space-y-2.5 text-sm">
                {services.map((s, idx) => (
                  <li key={idx}>
                    <Link
                      href={s.href}
                      className="hover:text-sky-400 transition-colors text-slate-400"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Navigation Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm">
                {quickLinks.map((l, idx) => (
                  <li key={idx}>
                    <Link
                      href={l.href}
                      className="hover:text-sky-400 transition-colors text-slate-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Info Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200">
                Direct Contact
              </h4>
              <p className="text-sm text-slate-400">
                Interested in starting a project or need technical support?
              </p>
              <div className="pt-1">
                <a
                  href="mailto:hello@snow.dev"
                  className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>hello@snow.dev</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Sub-footer */}
          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {currentYear} SNOW Technology Services. All rights reserved.</p>
            <p>Built for performance, precision, and clarity.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};
