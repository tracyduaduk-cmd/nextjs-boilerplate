'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, Sparkles, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCursor } from '@/components/spatial/CursorSystem';
import {
  NAVIGATION_GROUPS,
  PRIMARY_NAVIGATION,
  UTILITY_NAVIGATION,
  getNavigationGroup,
  isNavigationPathActive,
} from '@/lib/navigation';

interface GlassNavProps { className?: string; activeHref?: string; }

export const GlassNav: React.FC<GlassNavProps> = ({ className = '', activeHref }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpenGroups, setMobileOpenGroups] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const { setCursorState, resetCursorState } = useCursor();
  const activeGroup = getNavigationGroup(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    firstMobileLink.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
      if (event.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>('#snow-mobile-drawer a, #snow-mobile-drawer button'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKeyDown); };
  }, [mobileMenuOpen]);

  const toggleGroup = (id: string) => setMobileOpenGroups((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const linkClass = (href: string) => isNavigationPathActive(pathname, href) || activeHref === href
    ? 'bg-cyan-400/15 text-cyan-200 border-cyan-400/35'
    : 'text-neutral-300 hover:text-white hover:bg-white/10 border-transparent';

  return (
    <>
      <header className={`fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300 ${className}`}>
        <nav aria-label="Primary studio navigation" className={`pointer-events-auto relative w-full max-w-6xl border transition-all duration-500 ${scrolled ? 'border-white/20 bg-black/85 shadow-2xl shadow-cyan-950/20' : 'border-white/10 bg-slate-950/65'} backdrop-blur-2xl rounded-2xl`}>
          <div className="flex items-center justify-between p-2 pl-4 sm:pl-5">
            <Link href="/" onMouseEnter={() => setCursorState('LINK')} onMouseLeave={resetCursorState} className="flex items-center gap-2.5 rounded-full focus-visible:ring-2 focus-visible:ring-cyan-400">
              <span className="grid place-items-center w-8 h-8 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300"><Sparkles size={15} /></span>
              <span className="flex flex-col"><span className="font-black text-xs tracking-widest text-white uppercase">SNOW <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /></span><span className="font-mono text-[9px] text-neutral-400 tracking-wider">STUDIO</span></span>
            </Link>

            <div className="hidden md:flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
              {PRIMARY_NAVIGATION.map((link) => link.label === 'Tools' ? (
                <div key={link.href} className="relative">
                  <button type="button" onClick={() => setToolsOpen((open) => !open)} aria-expanded={toolsOpen} aria-controls="snow-tools-mega-menu" className={`inline-flex items-center gap-1 rounded-lg border px-4 py-2 font-mono text-xs transition-all ${linkClass(link.href)}`}>
                    Tools <ChevronDown size={13} className={`transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {toolsOpen && <motion.div id="snow-tools-mega-menu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-[calc(100%+12px)] w-[min(760px,calc(100vw-32px))] rounded-2xl border border-white/15 bg-slate-950/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl">
                      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3"><div><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400">TOOLS & UTILITIES</p><p className="mt-1 text-xs text-slate-400">Practical tools for building, checking, and exploring.</p></div><Link href="/tools" className="font-mono text-[11px] text-cyan-300 hover:text-white">Open tools →</Link></div>
                      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">{NAVIGATION_GROUPS.map((group) => { const Icon = group.icon; return <div key={group.id} className="rounded-xl border border-white/8 bg-white/[0.03] p-2"><div className="mb-1 flex items-center gap-2 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-500"><Icon size={13} className="text-cyan-400" />{group.label}</div>{group.items.map((item) => { const ItemIcon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setToolsOpen(false)} className={`group flex items-center gap-2 rounded-lg border px-2 py-2 text-xs transition ${linkClass(item.href)}`}><ItemIcon size={13} className="shrink-0 text-slate-500 group-hover:text-cyan-300" /><span className="truncate">{item.shortLabel || item.label}</span>{item.status === 'live' && <span className="ml-auto text-[9px] text-emerald-300">LIVE</span>}</Link>; })}</div>; })}</div>
                    </motion.div>}
                  </AnimatePresence>
                </div>
              ) : <Link key={link.href} href={link.href} className={`rounded-lg border px-4 py-2 font-mono text-xs transition-all ${linkClass(link.href)}`}>{link.label}</Link>)}
            </div>

            <div className="flex items-center gap-2"><Link href="/request" className="hidden sm:inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-400/10 px-4 py-2 font-mono text-xs font-bold text-cyan-200 hover:bg-cyan-400 hover:text-black transition">START PROJECT <ArrowUpRight size={14} /></Link><button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-controls="snow-mobile-drawer" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden">{mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}</button></div>
          </div>
          {activeGroup && <div className="hidden border-t border-white/8 px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 md:flex md:items-center md:gap-2"><span className="text-cyan-400">{activeGroup.label}</span><ChevronRight size={11} />{activeGroup.items.find((item) => item.href === pathname)?.label || 'Suite'}</div>}
        </nav>
      </header>

      <AnimatePresence>{mobileMenuOpen && <motion.div id="snow-mobile-drawer" role="dialog" aria-modal="true" aria-label="Snow navigation menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="fixed inset-0 z-40 overflow-y-auto bg-slate-950/98 px-5 pb-8 pt-28 backdrop-blur-3xl md:hidden"><div className="mx-auto max-w-lg"><div className="mb-6 border-b border-white/10 pb-4"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400">SNOW STUDIO</p><p className="mt-2 text-sm text-slate-400">Explore the studio, our work, and practical tools.</p></div><nav aria-label="Mobile primary navigation" className="space-y-2"><Link ref={firstMobileLink} href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 font-mono text-sm text-white">Home <ArrowUpRight size={16} /></Link>{PRIMARY_NAVIGATION.filter((link) => link.label !== 'Tools').map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between rounded-xl border px-4 py-3 font-mono text-sm ${linkClass(link.href)}`}>{link.label}<ArrowUpRight size={16} /></Link>)}<div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-3"><div className="mb-2 flex items-center justify-between px-2"><span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">Tools</span><Link href="/tools" onClick={() => setMobileMenuOpen(false)} className="font-mono text-[10px] text-slate-500 hover:text-white">Overview →</Link></div>{NAVIGATION_GROUPS.map((group) => { const Icon = group.icon; const open = mobileOpenGroups.includes(group.id) || activeGroup?.id === group.id; return <div key={group.id} className="border-t border-white/8"><button type="button" onClick={() => toggleGroup(group.id)} aria-expanded={open} aria-controls={`mobile-group-${group.id}`} className="flex w-full items-center justify-between px-2 py-3 text-left font-mono text-xs uppercase tracking-widest text-slate-300"><span className="flex items-center gap-2"><Icon size={14} className="text-cyan-400" />{group.label}</span><ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180 text-cyan-300' : 'text-slate-500'}`} /></button><div id={`mobile-group-${group.id}`} hidden={!open} className="space-y-1 pb-2 pl-3">{group.items.map((item) => { const ItemIcon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm ${linkClass(item.href)}`}><ItemIcon size={15} className="text-slate-500" /><span>{item.label}</span></Link>; })}</div></div>; })}</div>{UTILITY_NAVIGATION.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 font-mono text-sm text-slate-300 hover:text-white">{link.label}<ArrowUpRight size={16} /></Link>)}</nav><div className="mt-8 border-t border-white/10 pt-5"><Link href="/request" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3.5 font-mono text-sm font-bold text-slate-950">START A PROJECT <ArrowUpRight size={16} /></Link></div></div></motion.div>}</AnimatePresence>
    </>
  );
};
