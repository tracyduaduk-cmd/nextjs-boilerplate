"use client";

import React, { ReactNode } from "react";

interface DepthPlaneProps {
  children: ReactNode;
  depth?: number; // -100 to 100
  rotateX?: number;
  rotateY?: number;
  className?: string;
}

export const DepthPlane: React.FC<DepthPlaneProps> = ({
  children,
  depth = 0,
  rotateX = 0,
  rotateY = 0,
  className = "",
}) => {
  return (
    <div
      className={`transition-transform duration-700 ease-out ${className}`}
      style={{
        transform: `translateZ(${depth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};
