"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CAPABILITY_FAMILIES } from "@/lib/services/capabilityFamilies";
import { CapabilityFamilyId } from "@/lib/services/types";
import {
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  Sparkles,
  HardDrive,
  Briefcase,
  ChartNoAxesCombined,
} from "lucide-react";

interface CapabilityFamilyNavProps {
  selectedFamilyId: CapabilityFamilyId;
  onSelectFamily: (familyId: CapabilityFamilyId) => void;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  Sparkles,
  HardDrive,
  Briefcase,
  ChartNoAxesCombined,
};

export const CapabilityFamilyNav: React.FC<CapabilityFamilyNavProps> = ({
  selectedFamilyId,
  onSelectFamily,
  className = "",
}) => {
  const navRef = useRef<HTMLDivElement>(null);

  // Keyboard arrow navigation across tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % CAPABILITY_FAMILIES.length;
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + CAPABILITY_FAMILIES.length) % CAPABILITY_FAMILIES.length;
      e.preventDefault();
    } else if (e.key === "Home") {
      nextIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      nextIndex = CAPABILITY_FAMILIES.length - 1;
      e.preventDefault();
    }

    if (nextIndex !== index) {
      onSelectFamily(CAPABILITY_FAMILIES[nextIndex].id);
      const buttons = navRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  return (
    <div className={`w-full overflow-x-auto pb-2 scrollbar-none ${className}`}>
      <div
        ref={navRef}
        role="tablist"
        aria-label="Capability Families"
        className="flex items-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-md min-w-max"
      >
        {CAPABILITY_FAMILIES.map((family, idx) => {
          const isSelected = selectedFamilyId === family.id;
          const IconComponent = iconMap[family.iconName] || Globe;

          return (
            <button
              key={family.id}
              role="tab"
              id={`tab-${family.id.replace(/\s+/g, "-")}`}
              aria-selected={isSelected}
              aria-controls={`panel-${family.id.replace(/\s+/g, "-")}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelectFamily(family.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`relative px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                isSelected
                  ? "text-slate-100 font-semibold shadow-md shadow-sky-950/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeFamilyHighlight"
                  className="absolute inset-0 rounded-xl bg-slate-800 border border-sky-500/40"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <IconComponent
                  className={`w-4 h-4 transition-colors ${
                    isSelected ? "text-sky-400" : "text-slate-400"
                  }`}
                />
                <span>{family.name}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
