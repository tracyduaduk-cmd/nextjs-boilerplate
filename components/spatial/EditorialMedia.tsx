"use client";

import React from "react";
import Image from "next/image";

interface EditorialMediaProps {
  src: string;
  alt: string;
  caption?: string;
  kicker?: string;
  aspect?: "wide" | "tall" | "square";
  className?: string;
}

export const EditorialMedia: React.FC<EditorialMediaProps> = ({
  src,
  alt,
  caption,
  kicker = "EDITORIAL COMPOSITION",
  aspect = "wide",
  className = "",
}) => {
  const aspectClass = {
    wide: "aspect-[21/9]",
    tall: "aspect-[3/4]",
    square: "aspect-square",
  }[aspect];

  return (
    <div className={`relative group/edit overflow-hidden rounded-xl border border-slate-800 bg-slate-950 ${className}`}>
      <div className={`relative w-full ${aspectClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover filter contrast-[1.08] saturate-90 transition-transform duration-700 ease-out group-hover/edit:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] text-slate-300">
        <div>
          <span className="text-cyan-300 tracking-widest uppercase block mb-1">{kicker}</span>
          {caption && <span className="text-slate-400 font-sans text-xs">{caption}</span>}
        </div>
        <span className="text-slate-500 uppercase">SNOW / STUDIO</span>
      </div>
    </div>
  );
};
