"use client";

import React, { ReactNode } from "react";

interface SpatialStageProps {
  children: ReactNode;
  theme?: "dark" | "light";
  className?: string;
  gridOverlay?: boolean;
}

export const SpatialStage: React.FC<SpatialStageProps> = ({
  children,
  theme = "dark",
  className = "",
  gridOverlay = true,
}) => {
  return (
    <section
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        theme === "light"
          ? "bg-[#f5f5f7] text-[#09090b]"
          : "bg-[#08090b] text-[#f8fafc]"
      } ${className}`}
    >
      {gridOverlay && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none ${
            theme === "light" ? "opacity-10" : "opacity-25"
          }`}
          style={{
            backgroundImage:
              theme === "light"
                ? "linear-gradient(rgba(9,9,11,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(9,9,11,0.08) 1px, transparent 1px)"
                : "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(circle at center, black 50%, transparent 90%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
};
