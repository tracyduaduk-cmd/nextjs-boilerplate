"use client";

import React from "react";

interface OrbitalObjectProps {
  size?: number;
  className?: string;
  glowColor?: string;
}

export const OrbitalObject: React.FC<OrbitalObjectProps> = ({
  size = 200,
  className = "",
  glowColor = "#67e8f9",
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Central Glass Sphere */}
      <div className="glass-orb w-full h-full">
        <span className="orb-shine" />
        <span className="orb-ring" style={{ borderColor: `${glowColor}66` }} />
      </div>
    </div>
  );
};
