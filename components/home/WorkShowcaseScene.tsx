'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { KineticText } from '@/components/spatial/KineticText';
import { InteractiveMedia } from '@/components/spatial/InteractiveMedia';
import { getPublicUrl } from '@/lib/projects/mediaManifest';
import { useCursor } from '@/components/spatial/CursorSystem';

const showcaseProjects = [
  {
    slug: 'aurora-commerce',
    title: 'AURORA COMMERCE',
    category: 'E-Commerce / Spatial Web',
    summary: 'Next-generation luxury audio brand experience with 3D spatial product previews and real-time inventory.',
    heroMedia: getPublicUrl('aurora-commerce', 'hero.webp'),
    aspect: 'aspect-[16/9]',
  },
  {
    slug: 'pulse-health',
    title: 'PULSE HEALTH OS',
    category: 'Healthcare / Mobile App',
    summary: 'Clinical telemetry dashboard with real-time biometric tracking and offline-first mobile synchronization.',
    heroMedia: getPublicUrl('pulse-health', 'desktop.webp'),
    aspect: 'aspect-[4/3]',
  },
  {
    slug: 'orbit-finance',
    title: 'ORBIT FINANCE',
    category: 'Fintech / Web Platform',
    summary: 'Global capital flow analytics and algorithmic trading portal with custom WebGL charts.',
    heroMedia: getPublicUrl('orbit-finance', 'hero.webp'),
    aspect: 'aspect-[16/9]',
  },
];

export const WorkShowcaseScene: React.FC = () => {
  const { setCursorState, resetCursorState } = useCursor();

  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-20 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">{"// SELECTED PRODUCTIONS"}</span>
            <KineticText variant="velocity" className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
              FEATURED WORK
            </KineticText>
          </div>
          <Link
            href="/work"
            onMouseEnter={() => setCursorState('LINK')}
            onMouseLeave={resetCursorState}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 hover:text-white transition-colors"
          >
            <span>VIEW ALL PRODUCTIONS</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Editorial Asymmetric Project Sequence */}
        <div className="space-y-24">
          {showcaseProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={project.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                <div className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}>
                  <Link href={`/work/${project.slug}`}>
                    <InteractiveMedia
                      src={project.heroMedia}
                      alt={project.title}
                      aspectRatio={project.aspect}
                      cursorLabel="EXPLORE"
                    />
                  </Link>
                </div>

                <div className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:col-start-1'}`}>
                  <span className="font-mono text-xs text-cyan-400 tracking-wider">
                    PRODUCTION // 0{idx + 1} — {project.category}
                  </span>

                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
                    {project.title}
                  </h3>

                  <p className="text-neutral-300 text-base leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="pt-4">
                    <Link
                      href={`/work/${project.slug}`}
                      onMouseEnter={() => setCursorState('MAGNETIC', 'CASE STUDY')}
                      onMouseLeave={resetCursorState}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-mono text-xs font-bold hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all group"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
