"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  secondaryNavLinks?: NavLink[];
  ctaLink: NavLink;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  navLinks,
  secondaryNavLinks = [],
  ctaLink,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation-menu"
      className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-950/95 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Mobile Nav Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-20 border-b border-slate-800/80">
        <Logo href="/" size="md" />

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-lg text-slate-300 hover:text-slate-100 hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile Nav Body */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
        <div>
          <nav className="flex flex-col space-y-4" aria-label="Mobile Primary Navigation Links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-xl font-semibold text-slate-200 hover:text-sky-400 transition-colors py-2 border-b border-slate-800/50 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-600 text-base">→</span>
              </Link>
            ))}
          </nav>

          {secondaryNavLinks.length > 0 && (
            <nav className="flex flex-wrap gap-4 pt-6" aria-label="Mobile Secondary Navigation Links">
              {secondaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col space-y-4">
          <Button
            href={ctaLink.href}
            variant="primary"
            size="lg"
            className="w-full justify-center"
            onClick={onClose}
          >
            {ctaLink.label}
          </Button>

          <p className="text-xs text-slate-500 text-center pt-2">
            Snow Technology Studio • Kwang, Jos, Plateau State, Nigeria
          </p>
        </div>
      </div>
    </div>
  );
};
