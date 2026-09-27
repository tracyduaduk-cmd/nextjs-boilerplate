"use client";

import React from "react";
import { GlassNav } from "@/components/spatial/GlassNav";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  return <GlassNav className={className} />;
};
