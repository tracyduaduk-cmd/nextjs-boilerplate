'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Command } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NAVIGATION_GROUPS, getNavigationGroup, getNavigationItem, isNavigationPathActive } from '@/lib/navigation';

export const ToolCommandNav: React.FC = () => {
  const pathname = usePathname();
  const activeGroup = getNavigationGroup(pathname);
  const activeItem = getNavigationItem(pathname);

  return (
    <nav aria-label="Snow tool hierarchy" className="border-y border-slate-800/80 bg-slate-950/90 py-3 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">
          <Link href="/tools" className="inline-flex items-center gap-2 rounded-lg border border-cyan-800/60 bg-cyan-950/60 px-3 py-2 text-cyan-300 hover:border-cyan-400/60"><Command size={13} />SNOW TOOLS</Link>
          {activeGroup && <><ChevronRight size={12} /><span className="text-slate-400">{activeGroup.label}</span>{activeItem && <><ChevronRight size={12} /><span className="text-cyan-300">{activeItem.shortLabel || activeItem.label}</span></>}</>}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {NAVIGATION_GROUPS.map((group) => {
            const isCurrent = activeGroup?.id === group.id;
            return <details key={group.id} open={isCurrent || undefined} className={`group rounded-xl border ${isCurrent ? 'border-cyan-700/60 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/50'}`}>
              <summary className="cursor-pointer list-none px-3 py-2 text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-300 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"><span className="flex items-center justify-between gap-2"><span>{group.label}</span><span className="text-slate-600 group-open:rotate-180">⌄</span></span></summary>
              <div className="space-y-1 border-t border-slate-800/80 p-2">
                {group.items.map((item) => { const Icon = item.icon; const active = isNavigationPathActive(pathname, item.href); return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-[11px] font-mono transition ${active ? 'border-cyan-500/70 bg-cyan-400 text-slate-950 font-bold' : 'border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-100'}`}><Icon size={13} className="shrink-0" /><span className="truncate">{item.shortLabel || item.label}</span></Link>; })}
              </div>
            </details>;
          })}
        </div>
      </div>
    </nav>
  );
};

export { NAVIGATION_GROUPS };
