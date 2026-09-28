"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { label: "Services", href: "/#services" },
    { label: "Work Portfolio", href: "/work" },
    { label: "Snow Care", href: "/care" },
    { label: "Network Diagnostics", href: "/network" },
    { label: "Developer Tools", href: "/tools" },
    { label: "Editorial Insights", href: "/insights" },
    { label: "Request a Service", href: "/request" },
  ];

  const toolsLinks = [
    { label: "Network Diagnostics Hub", href: "/network" },
    { label: "DNS Lookup Utility", href: "/network/dns" },
    { label: "Public IP & Network Info", href: "/network/ip" },
    { label: "Device & Browser Diag", href: "/network/device" },
    { label: "Connection Speed Test", href: "/network/speed" },
    { label: "Website Health Check", href: "/tools/website-health" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 font-sans">
      {/* Footer Callout */}
      <div className="border-b border-slate-900 bg-slate-950/60 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-slate-900/60 border border-slate-800 p-8 sm:p-12 rounded-2xl">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2 block">
                Connected Product Ecosystem
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                Understand your system. Build with precision. Maintain with Care.
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
                Whether you need a new web application, AI-powered automation, diagnostic checks, or long-term system Care, Snow provides end-to-end technical stewardship.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button href="/request" variant="primary" size="lg">
                Request a Service ↗
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
                Snow is a modern technology studio engineering high-performance web applications, intelligent AI workflows, Care maintenance, and resilient digital infrastructure.
              </p>
              <div className="pt-2 text-xs text-slate-500 space-y-1 font-mono">
                <p>Location: {siteConfig.contact.location}</p>
                <p>Email: {siteConfig.contact.email}</p>
                <p>Phone: {siteConfig.contact.phone}</p>
              </div>
            </div>

            {/* Platform Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200">
                Platform Ecosystem
              </h4>
              <ul className="space-y-2.5 text-sm">
                {platformLinks.map((s, idx) => (
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

            {/* Diagnostic Suite Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200">
                Diagnostic Suite
              </h4>
              <ul className="space-y-2.5 text-sm">
                {toolsLinks.map((l, idx) => (
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
                Need emergency repair or a custom technology recommendation?
              </p>
              <div className="pt-2 space-y-2 text-sm">
                <div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="inline-flex items-center gap-2 font-medium text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <span>✉ {siteConfig.contact.email}</span>
                  </a>
                </div>
                <div>
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>💬 WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Sub-footer */}
          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {currentYear} SNOW Technology Studio. All rights reserved.</p>
            <p>Based in Kwang, Jos, Plateau State, Nigeria.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};
