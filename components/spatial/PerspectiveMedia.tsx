"use client";

import React, { ReactNode } from "react";

interface PerspectiveMediaProps {
  children: ReactNode;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  className?: string;
}

export const PerspectiveMedia: React.FC<PerspectiveMediaProps> = ({
  children,
  rotateX = 12,
  rotateY = -15,
  rotateZ = 2,
  className = "",
}) => {
  return (
    <div
      className={`perspective-[1200px] group/persp ${className}`}
    >
      <div
        className="transition-transform duration-700 ease-out group-hover/persp:rotate-x-0 group-hover/persp:rotate-y-0 group-hover/persp:rotate-z-0 group-hover/persp:scale-[1.02]"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
};
