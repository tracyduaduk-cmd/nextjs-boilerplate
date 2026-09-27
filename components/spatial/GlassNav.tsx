"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const mainNavLinks = [
  { label: "Services", href: "/#capabilities", section: "capabilities" },
  { label: "Work", href: "/work", section: "work" },
  { label: "Care", href: "/care", section: "care" },
  { label: "Tools", href: "/tools", section: "tools" },
];

export const GlassNav: React.FC<{ className?: string; activeHref?: string }> = ({ className = "", activeHref }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState(activeHref?.replace("/#", "").replace("/", "") || "intro");

  useEffect(() => {
    let previousY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > previousY && currentY > 120 && !mobileMenuOpen);
      previousY = currentY;
      const sections = ["capabilities", "work", "care"];
      const current = sections.reverse().find((id) => {
        const node = document.getElementById(id);
        return node && node.getBoundingClientRect().top < window.innerHeight * 0.45;
      });
      setActiveSection(current ?? "intro");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`snow-nav ${hidden ? "snow-nav-hidden" : ""} ${className}`}>
        <nav aria-label="Global navigation" className="snow-nav-inner">
          <Link href="/" className="snow-brand" aria-label="Snow home">
            <span className="snow-brand-mark">S</span>
            <span><strong>SNOW</strong><small>TECHNOLOGY STUDIO</small></span>
          </Link>
          <div className="snow-nav-links">
            {mainNavLinks.map((link) => <Link key={link.href} href={link.href} className={activeSection === link.section ? "is-active" : ""}>{link.label}</Link>)}
          </div>
          <div className="snow-nav-actions">
            <span className="snow-availability"><i /> Accepting selected projects</span>
            <Link href="/request" className="snow-start">Start <ArrowUpRight size={14} /></Link>
          </div>
          <div className="snow-mobile-actions">
            <Link href="/request" className="snow-start">Start</Link>
            <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} className="snow-menu-button">{mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </nav>
      </header>
      {mobileMenuOpen && <div className="snow-mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="snow-mobile-menu-top"><span>SNOW / 01</span><span>INTERACTIVE STUDIO</span></div>
        <nav>{mainNavLinks.map((link, index) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}><span>0{index + 1}</span><strong>{link.label}</strong><ArrowUpRight size={20} /></Link>)}</nav>
        <div className="snow-mobile-menu-bottom"><span>Available for considered work</span><Link href="/request" onClick={() => setMobileMenuOpen(false)}>Start a project <ArrowUpRight size={16} /></Link></div>
      </div>}
    </>
  );
};
