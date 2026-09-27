'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, Menu, X } from 'lucide-react';
import { useCursor } from '@/components/spatial/CursorSystem';

interface GlassNavProps {
  className?: string;
  activeHref?: string;
}

export const GlassNav: React.FC<GlassNavProps> = ({ className = '', activeHref }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setCursorState, resetCursorState } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavLinks = [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/#services' },
    { label: 'Care', href: '/care' },
    { label: 'Tools', href: '/tools' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300 ${className}`}
      >
        <nav
          aria-label="Global Spatial Navigation"
          className={`pointer-events-auto relative w-full max-w-5xl flex items-center justify-between p-2 pl-4 sm:pl-5 rounded-full border transition-all duration-500 ${
            scrolled
              ? 'border-white/20 bg-black/80 backdrop-blur-2xl shadow-2xl shadow-cyan-950/20'
              : 'border-white/10 bg-slate-950/40 backdrop-blur-xl'
          }`}
        >
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              onMouseEnter={() => setCursorState('LINK')}
              onMouseLeave={resetCursorState}
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full"
            >
              <span className="grid place-items-center w-8 h-8 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
                <Sparkles size={15} />
              </span>
              <div className="flex flex-col">
                <span className="font-sans font-black text-xs tracking-widest text-white uppercase flex items-center gap-1.5">
                  SNOW
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </span>
                <span className="font-mono text-[9px] text-neutral-400 tracking-wider">
                  STUDIO
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            {mainNavLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setCursorState('LINK')}
                  onMouseLeave={resetCursorState}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Magnetic Start Project CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/request"
              onMouseEnter={() => setCursorState('MAGNETIC', 'START')}
              onMouseLeave={resetCursorState}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/50 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400 hover:text-black font-mono text-xs font-bold transition-all duration-300 shadow-lg shadow-cyan-950/50 group"
            >
              <span>START PROJECT</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden gap-2">
            <Link
              href="/request"
              className="px-3.5 py-1.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 font-mono text-xs font-bold"
            >
              Start
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Cinematic Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-8 pt-32 md:hidden"
          >
            <div className="flex flex-col space-y-8">
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest border-b border-white/10 pb-4">
                &#47;&#47; NAVIGATION ARCHITECTURE
              </div>

              <nav className="flex flex-col space-y-6">
                {mainNavLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-4xl font-black text-white hover:text-cyan-400 transition-colors flex items-center justify-between group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={28} className="text-neutral-600 group-hover:text-cyan-400 transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="border-t border-white/10 pt-8 space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                <span>STUDIO STATUS:</span>
                <span className="text-cyan-400 font-bold">Q2 ACTIVE</span>
              </div>

              <Link
                href="/request"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-cyan-400 text-black font-mono text-sm font-bold tracking-wider shadow-lg shadow-cyan-500/25 active:scale-98 transition-transform"
              >
                <span>INITIATE PROJECT</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
