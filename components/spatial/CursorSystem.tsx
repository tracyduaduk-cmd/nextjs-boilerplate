'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export type CursorType = 'DEFAULT' | 'LINK' | 'MAGNETIC' | 'MEDIA' | 'PROJECT' | 'DRAG' | 'TOOL' | 'SYSTEM' | 'VIEW';

interface CursorContextType {
  setCursorState: (type: CursorType, label?: string) => void;
  resetCursorState: () => void;
}

const CursorContext = createContext<CursorContextType>({
  setCursorState: () => {},
  resetCursorState: () => {},
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorType>('DEFAULT');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isTouchDevice] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined' || isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isTouchDevice]);

  const setCursorState = useCallback((type: CursorType, label: string = '') => {
    setCursorType(type);
    setCursorLabel(label);
  }, []);

  const resetCursorState = useCallback(() => {
    setCursorType('DEFAULT');
    setCursorLabel('');
  }, []);

  return (
    <CursorContext.Provider value={{ setCursorState, resetCursorState }}>
      {children}
      {!isTouchDevice && isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center rounded-full transition-all duration-200 ease-out"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className={`rounded-full transition-all duration-300 ease-out ${getCursorStyle(cursorType)}`}>
            {cursorLabel && (
              <span className="tracking-widest select-none leading-none">
                {cursorLabel}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </CursorContext.Provider>
  );
}

function getCursorStyle(type: CursorType) {
  switch (type) {
    case 'LINK':
      return 'w-8 h-8 bg-cyan-400/30 border border-cyan-400 backdrop-blur-xs scale-125';
    case 'MAGNETIC':
      return 'w-10 h-10 bg-cyan-400/40 border border-white scale-150 shadow-[0_0_20px_rgba(34,211,238,0.5)]';
    case 'MEDIA':
    case 'PROJECT':
      return 'w-20 h-20 bg-cyan-500/90 text-black font-mono font-bold text-xs uppercase border border-white/40 scale-100 flex items-center justify-center text-center p-2 rounded-full shadow-[0_0_25px_rgba(6,182,212,0.6)]';
    case 'DRAG':
      return 'w-16 h-16 bg-white text-black font-mono font-bold text-xs uppercase border border-cyan-400/50 flex items-center justify-center rounded-full shadow-lg';
    case 'TOOL':
      return 'w-14 h-14 bg-cyan-950/80 text-cyan-300 font-mono font-bold text-[10px] tracking-widest uppercase border border-cyan-400/60 flex items-center justify-center text-center p-1 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)]';
    case 'SYSTEM':
      return 'w-12 h-12 bg-slate-900/90 text-emerald-400 font-mono font-bold text-[9px] uppercase border border-emerald-500/60 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]';
    case 'VIEW':
      return 'w-16 h-16 bg-white/90 text-slate-950 font-mono font-bold text-[10px] tracking-widest uppercase border border-white flex items-center justify-center rounded-full shadow-2xl';
    case 'DEFAULT':
    default:
      return 'w-3 h-3 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]';
  }
}
