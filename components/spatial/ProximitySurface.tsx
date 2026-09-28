"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export interface ProximitySurfaceProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderColor?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProximitySurface: React.FC<ProximitySurfaceProps> = ({
  children,
  className = "",
  glowColor = "rgba(165, 243, 252, 0.18)",
  borderColor = "rgba(165, 243, 252, 0.4)",
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave?.();
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl transition-colors duration-300 ${className}`}
    >
      {/* Radial Pointer Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Dynamic Border Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl border transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          borderColor: borderColor,
          boxShadow: `inset 0 0 20px ${glowColor}`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
