"use client";

import React from "react";
import { motion } from "framer-motion";

export interface TabOption<T extends string> {
  id: T;
  label: string;
  badge?: string | number;
}

export interface ToolTabsProps<T extends string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  className?: string;
}

export function ToolTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: ToolTabsProps<T>) {
  return (
    <div
      role="tablist"
      className={`relative flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl overflow-x-auto scrollbar-none ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              isActive ? "text-slate-950" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-xl bg-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`relative z-10 px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  isActive
                    ? "bg-slate-950/20 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
