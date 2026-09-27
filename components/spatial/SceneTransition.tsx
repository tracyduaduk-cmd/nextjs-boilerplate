"use client";

import React, { ReactNode } from "react";

interface SceneTransitionProps {
  children: ReactNode;
  className?: string;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({ children, className = "" }) => {
  return (
    <div className={`transition-all duration-700 cubic-bezier(0.16,1,0.3,1) ${className}`}>
      {children}
    </div>
  );
};
