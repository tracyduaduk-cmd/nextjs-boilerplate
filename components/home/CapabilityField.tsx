'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { KineticText } from '@/components/spatial/KineticText';
import { useCursor } from '@/components/spatial/CursorSystem';
import { Cpu, ShieldCheck, Zap, Globe, Database, Smartphone } from 'lucide-react';

const capabilities = [
  {
    icon: Globe,
    code: '01_WEB',
    title: 'High-Scale Web Systems',
    desc: 'Next.js 16, SSR, spatial interactions, sub-100ms LCP, custom design systems.',
  },
  {
    icon: Smartphone,
    code: '02_APPS',
    title: 'Cross-Platform Applications',
    desc: 'React Native, PWAs, offline-first sync engine, touch-native motion.',
  },
  {
    icon: Cpu,
    code: '03_AI',
    title: 'Custom AI & Workflow Agents',
    desc: 'LLM agents, vector search, automatic prompt chains, serverless AI integration.',
  },
  {
    icon: ShieldCheck,
    code: '04_DEFENSE',
    title: 'Zero-Trust Security & Recovery',
    desc: 'Security header triage, incident response, cryptographically signed logs.',
  },
  {
    icon: Database,
    code: '05_INFRA',
    title: 'Cloud & Database Pipelines',
    desc: 'Supabase Postgres, real-time channels, edge functions, CDN routing.',
  },
  {
    icon: Zap,
    code: '06_MOTION',
    title: 'Interactive WebGL & Graphics',
    desc: 'Three.js, GLSL shaders, camera choreography, pointer physics.',
  },
];

export const CapabilityField: React.FC = () => {
  const { setCursorState, resetCursorState } = useCursor();

  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-20 bg-slate-950 text-white overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">{"// CAPABILITY ARCHITECTURE"}</span>
            <KineticText variant="character" className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              ENGINEERING MATRIX
            </KineticText>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-sm">
            PRECISION ENGINEERING CAPABILITIES ACROSS FRONTEND, BACKEND, GRAPHICS, AND ARTIFICIAL INTELLIGENCE.
          </p>
        </div>

        {/* Spatial Grid Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onMouseEnter={() => setCursorState('MAGNETIC', cap.code)}
                onMouseLeave={resetCursorState}
                className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <span className="font-mono text-xs text-neutral-500 group-hover:text-cyan-400 transition-colors">
                    {cap.code}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-xl text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {cap.title}
                </h3>

                <p className="font-sans text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-200 transition-colors">
                  {cap.desc}
                </p>

                {/* Subtle corner light indicator */}
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400 transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
