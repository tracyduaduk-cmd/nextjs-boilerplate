"use client";

import React, { ReactNode } from "react";

export interface PerspectiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  perspective?: number; // e.g. 1000px
  perspectiveOrigin?: string; // e.g. "50% 50%"
  className?: string;
}

/**
 * PerspectiveContainer establishes a 3D CSS perspective viewport context for child spatial elements.
 */
export const PerspectiveContainer: React.FC<PerspectiveContainerProps> = ({
  children,
  perspective = 1200,
  perspectiveOrigin = "50% 50%",
  className = "",
  ...props
}) => {
  return (
    <div
      {...props}
      className={`relative ${className}`}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};
