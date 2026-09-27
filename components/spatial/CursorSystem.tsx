'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export type CursorType = 'DEFAULT' | 'LINK' | 'MAGNETIC' | 'MEDIA' | 'PROJECT' | 'DRAG';

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
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics spring for cursor motion
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch capability
    const touchCheck = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    if (touchCheck()) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  const setCursorState = (type: CursorType, label: string = '') => {
    setCursorType(type);
    setCursorLabel(label);
  };

  const resetCursorState = () => {
    setCursorType('DEFAULT');
    setCursorLabel('');
  };

  if (isTouchDevice) {
    return <CursorContext.Provider value={{ setCursorState, resetCursorState }}>{children}</CursorContext.Provider>;
  }

  // Dynamic visual sizing and styling based on cursorType
  const getCursorStyle = () => {
    switch (cursorType) {
      case 'LINK':
        return 'w-8 h-8 bg-cyan-400/30 border border-cyan-400 backdrop-blur-xs scale-125';
      case 'MAGNETIC':
        return 'w-10 h-10 bg-cyan-400/40 border border-white scale-150 shadow-[0_0_20px_rgba(34,211,238,0.5)]';
      case 'MEDIA':
      case 'PROJECT':
        return 'w-20 h-20 bg-cyan-500/90 text-black font-mono font-bold text-xs uppercase border border-white/40 scale-100 flex items-center justify-center text-center p-2 rounded-full shadow-[0_0_25px_rgba(6,182,212,0.6)]';
      case 'DRAG':
        return 'w-16 h-16 bg-white text-black font-mono font-bold text-xs uppercase border border-cyan-400/50 flex items-center justify-center rounded-full shadow-lg';
      case 'DEFAULT':
      default:
        return 'w-3 h-3 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]';
    }
  };

  return (
    <CursorContext.Provider value={{ setCursorState, resetCursorState }}>
      {children}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference flex items-center justify-center rounded-full transition-all duration-200 ease-out"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className={`rounded-full transition-all duration-300 ease-out ${getCursorStyle()}`}>
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
