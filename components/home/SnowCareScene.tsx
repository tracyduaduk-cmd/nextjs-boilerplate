'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Server, RefreshCw } from 'lucide-react';
import { KineticText } from '@/components/spatial/KineticText';
import { useCursor } from '@/components/spatial/CursorSystem';

export const SnowCareScene: React.FC = () => {
  const { setCursorState, resetCursorState } = useCursor();

  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-20 bg-slate-900 text-cyan-50 border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-8">
          <div className="space-y-3">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">{"// CONTINUOUS OPERATIONS"}</span>
            <KineticText variant="velocity" className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              SNOW CARE ENGINE
            </KineticText>
          </div>
          <p className="font-mono text-xs text-cyan-300/80 max-w-sm">
            POST-LAUNCH INFRASTRUCTURE MAINTENANCE, UPTIME MONITORING, PERFORMANCE HARDENING, AND EMERGENCIES.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-black/40 border border-cyan-500/30 space-y-4">
            <div className="p-3 rounded-xl bg-cyan-400/10 text-cyan-400 w-fit">
              <Clock size={24} />
            </div>
            <h3 className="font-bold text-xl text-white">Sub-1 Hour Incident SLA</h3>
            <p className="text-sm text-cyan-100/70 leading-relaxed">
              Immediate triage and rapid resolution for production application disruptions and infrastructure vulnerabilities.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-black/40 border border-cyan-500/30 space-y-4">
            <div className="p-3 rounded-xl bg-cyan-400/10 text-cyan-400 w-fit">
              <Server size={24} />
            </div>
            <h3 className="font-bold text-xl text-white">Automated Health Check & Logs</h3>
            <p className="text-sm text-cyan-100/70 leading-relaxed">
              Real-time telemetry, database optimization, SSL certificate renewals, and edge routing audits.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-black/40 border border-cyan-500/30 space-y-4">
            <div className="p-3 rounded-xl bg-cyan-400/10 text-cyan-400 w-fit">
              <RefreshCw size={24} />
            </div>
            <h3 className="font-bold text-xl text-white">Continuous Feature Sprints</h3>
            <p className="text-sm text-cyan-100/70 leading-relaxed">
              Scheduled monthly engineering capacity for new feature iteration, UI improvements, and API expansions.
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Link
            href="/care"
            onMouseEnter={() => setCursorState('MAGNETIC', 'CARE')}
            onMouseLeave={resetCursorState}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-black font-mono font-bold text-sm tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(34,211,238,0.4)] group"
          >
            <span>EXPLORE SNOW CARE TIERS</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
