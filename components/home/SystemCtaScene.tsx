'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { KineticText } from '@/components/spatial/KineticText';
import { useCursor } from '@/components/spatial/CursorSystem';

export const SystemCtaScene: React.FC = () => {
  const { setCursorState, resetCursorState } = useCursor();

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 bg-black text-white border-t border-white/10 overflow-hidden text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto space-y-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 font-mono text-xs text-cyan-300">
          <Sparkles size={14} />
          <span>INITIATE SYSTEM ENGAGEMENT</span>
        </div>

        <KineticText variant="velocity" className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          READY TO BUILD SOMETHING EXTRAORDINARY?
        </KineticText>

        <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          Tell us about your project vision, engineering requirements, or system challenges. Our studio responds within 24 hours.
        </p>

        <div className="pt-4">
          <Link
            href="/request"
            onMouseEnter={() => setCursorState('MAGNETIC', 'START')}
            onMouseLeave={resetCursorState}
            className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-cyan-400 text-black font-mono font-bold text-sm sm:text-base tracking-widest hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.5)] group"
          >
            <span>START A PROJECT FLOW</span>
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
