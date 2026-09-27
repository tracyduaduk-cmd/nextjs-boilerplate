'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { CapabilityFamilyId } from '@/lib/services/types';
import { CAPABILITY_FAMILIES } from '@/lib/services/capabilityFamilies';
import { KineticText } from '@/components/spatial/KineticText';
import { useCursor } from '@/components/spatial/CursorSystem';

interface ServiceExplorerProps {
  className?: string;
}

export const ServiceExplorer: React.FC<ServiceExplorerProps> = ({ className = '' }) => {
  const router = useRouter();
  const { setCursorState, resetCursorState } = useCursor();
  const [activeFamilyId, setActiveFamilyId] = useState<CapabilityFamilyId>('WEB');
  const [activeServiceIndex, setActiveServiceIndex] = useState<number>(0);

  const familyList = CAPABILITY_FAMILIES;
  const activeFamily = familyList.find((f) => f.id === activeFamilyId) || familyList[0];

  const servicesByFamily: Record<CapabilityFamilyId, Array<{ name: string; tag: string; desc: string; tech: string[] }>> = {
    'WEB': [
      { name: 'Spatial Web Applications', tag: 'WEB-01', desc: 'Custom Next.js applications featuring WebGL, 3D CSS layering, sub-100ms LCP, and real-time state sync.', tech: ['Next.js 16', 'Three.js', 'Tailwind', 'TypeScript'] },
      { name: 'E-Commerce Platforms', tag: 'WEB-02', desc: 'High-converting headless storefronts with instant global search and automated checkout pipelines.', tech: ['Shopify Headless', 'Stripe', 'GraphQL', 'Next.js'] },
      { name: 'Editorial Design Systems', tag: 'WEB-03', desc: 'Bespoke UI component libraries engineered for magazine-grade typography and kinetic interactions.', tech: ['Framer Motion', 'GSAP', 'CSS Modules', 'Radix'] },
    ],
    'APPS & SOFTWARE': [
      { name: 'Cross-Platform Mobile Apps', tag: 'APP-01', desc: 'Native-feel iOS and Android applications built with React Native and offline-first database sync.', tech: ['React Native', 'Expo', 'SQLite', 'WebSockets'] },
      { name: 'PWA Web Software', tag: 'APP-02', desc: 'Progressive Web Apps with background sync, push notifications, and instant install capability.', tech: ['PWA', 'Workbox', 'Service Workers', 'IndexedDB'] },
    ],
    'AI': [
      { name: 'Autonomous AI Agents', tag: 'AI-01', desc: 'LLM agents integrated into customer support, internal search, and automated data entry workflows.', tech: ['OpenAI', 'LangChain', 'Pinecone', 'Python'] },
      { name: 'RAG & Vector Search Systems', tag: 'AI-02', desc: 'High-density document ingestion pipelines for contextual enterprise search.', tech: ['pgvector', 'Supabase', 'Embeddings', 'TypeScript'] },
    ],
    'SECURITY & RECOVERY': [
      { name: 'Security Header & Triage Audit', tag: 'SEC-01', desc: 'Defensive security analysis, vulnerability scans, and CSP hardening for web applications.', tech: ['OWASP', 'CSP Hardening', 'JWT Audit', 'SSL/TLS'] },
      { name: 'Account Recovery Guidance', tag: 'SEC-02', desc: 'Guided forensic analysis and cryptographically signed incident reports for compromise recovery.', tech: ['Cryptography', 'Evidence Logs', 'MFA Enforcement', 'DNS SEC'] },
    ],
    'INFRASTRUCTURE': [
      { name: 'Supabase Postgres Pipelines', tag: 'INF-01', desc: 'Database migration, row-level security policy design, and real-time channel setup.', tech: ['PostgreSQL', 'RLS', 'Edge Functions', 'Storage'] },
      { name: 'Global Edge & CDN Routing', tag: 'INF-02', desc: 'Sub-second global content routing, DNS optimization, and automated Netlify/Vercel deployments.', tech: ['Vercel Edge', 'Netlify', 'Cloudflare', 'DNS'] },
    ],
    'DIGITAL GROWTH': [
      { name: 'Performance & Speed Tuning', tag: 'GRW-01', desc: 'Rigorous bundle size reduction, image optimization, and Core Web Vitals score maxing.', tech: ['Lighthouse', 'Bundle Analyzer', 'Web Workers', 'Edge Caching'] },
      { name: 'Technical SEO & Metadata', tag: 'GRW-02', desc: 'JSON-LD schema structured data, automated sitemaps, and search index optimization.', tech: ['Schema.org', 'OpenGraph', 'Next.js Metadata API'] },
    ],
    'DEVICES & HARDWARE': [
      { name: 'Hardware & Peripheral Integration', tag: 'DEV-01', desc: 'Web Bluetooth and Web Serial API bridges connecting web apps directly to physical hardware.', tech: ['Web Bluetooth', 'Web Serial', 'IoT', 'WebSockets'] },
    ],
    'BUSINESS IT': [
      { name: 'Enterprise Workflow Automation', tag: 'BUS-01', desc: 'Webhook orchestration, email infrastructure, and automated multi-service pipelines.', tech: ['Zapier', 'Make', 'REST API', 'Node.js'] },
    ],
  };

  const currentServices = servicesByFamily[activeFamilyId] || servicesByFamily['WEB'];
  const activeService = currentServices[activeServiceIndex] || currentServices[0];

  return (
    <section className={`relative py-32 px-6 md:px-12 lg:px-20 bg-slate-950 text-white overflow-hidden border-t border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">// CAPABILITY UNIVERSE</span>
            <KineticText variant="velocity" className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              SERVICE ARCHITECTURE
            </KineticText>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-sm">
            SELECT A CAPABILITY FAMILY TO REVEAL SPATIAL SERVICE SPECIFICATIONS AND ENGINEERING DETAILS.
          </p>
        </div>

        {/* Capability Families Universe Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {familyList.map((fam, idx) => {
            const isActive = fam.id === activeFamilyId;
            return (
              <button
                key={fam.id}
                onClick={() => {
                  setActiveFamilyId(fam.id);
                  setActiveServiceIndex(0);
                }}
                onMouseEnter={() => setCursorState('LINK')}
                onMouseLeave={resetCursorState}
                className={`p-4 rounded-xl border text-left transition-all duration-300 font-mono text-xs flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] font-bold scale-105'
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:border-cyan-400/50 hover:bg-white/10'
                }`}
              >
                <span className="text-[10px] opacity-70">// 0{idx + 1}</span>
                <span className="uppercase tracking-tight leading-snug">{fam.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Active Family & Service Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-2xl">
          {/* Sub-services Selector Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/30">
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider block">
                {activeFamily.name} // DOMAIN
              </span>
              <p className="text-xs text-neutral-300 mt-1">{activeFamily.description}</p>
            </div>

            <div className="space-y-3">
              {currentServices.map((srv, idx) => {
                const selected = idx === activeServiceIndex;
                return (
                  <button
                    key={srv.tag}
                    onClick={() => setActiveServiceIndex(idx)}
                    onMouseEnter={() => setCursorState('LINK')}
                    onMouseLeave={resetCursorState}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                      selected
                        ? 'bg-white/10 border-cyan-400 text-white shadow-md'
                        : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] text-cyan-400 block">{srv.tag}</span>
                      <span className="font-sans font-bold text-sm">{srv.name}</span>
                    </div>
                    <ArrowUpRight size={16} className={selected ? 'text-cyan-400' : 'text-neutral-600'} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Service Spatial Detail Display */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30">
                {activeService.tag}
              </span>
              <span className="font-mono text-xs text-neutral-500">SPECIFICATION READY</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">{activeService.name}</h3>

            <p className="text-neutral-300 leading-relaxed text-base">{activeService.desc}</p>

            <div className="space-y-3">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">STACK & TECHNOLOGIES</span>
              <div className="flex flex-wrap gap-2">
                {activeService.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-xs text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => router.push(`/request?service=${encodeURIComponent(activeService.name)}`)}
                onMouseEnter={() => setCursorState('MAGNETIC', 'REQUEST')}
                onMouseLeave={resetCursorState}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-cyan-400 text-black font-mono font-bold text-sm tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                <span>REQUEST THIS CAPABILITY</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
