"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tilt } from "@/components/spatial/Tilt";
import { SpatialMediaPlane } from "@/components/spatial/SpatialMediaPlane";

export type DeviceFrameType = "desktop" | "browser" | "mobile" | "phone";
interface PortfolioDeviceFrameProps {
  type?: DeviceFrameType;
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  className?: string;
  interactive?: boolean;
  priority?: boolean;
  showUrlBar?: boolean;
  urlText?: string;
  aspectRatio?: "video" | "portrait" | "auto";
}

export function PortfolioDeviceFrame({ type = "desktop", src, alt, title, caption, className = "", interactive = true, priority = false, showUrlBar = false, urlText }: PortfolioDeviceFrameProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const phone = type === "mobile" || type === "phone";
  const ratio = phone ? "aspect-[9/18.8]" : "aspect-[16/10]";
  return <Tilt maxRotation={interactive ? (phone ? 6 : 3) : 0} className={`w-full ${phone ? "mx-auto max-w-[320px]" : ""} ${className}`}>
    <SpatialMediaPlane className="group/spatial-plane" intensity={phone ? 1.5 : 1.25} disabled={!interactive}>
      <div className={`relative overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,.2)] ${phone ? "rounded-[2.25rem] border-[6px] border-slate-900 bg-slate-900 p-2" : "rounded-[1.15rem] border border-slate-300/80 bg-white"}`}>
      {phone ? <div className="absolute left-1/2 top-2 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-slate-900" /> : <div className="flex h-9 items-center gap-2 border-b border-slate-200 bg-slate-50 px-3"><span className="h-2.5 w-2.5 rounded-full bg-[#ff776d]" /><span className="h-2.5 w-2.5 rounded-full bg-[#f7c94c]" /><span className="h-2.5 w-2.5 rounded-full bg-[#54c878]" />{showUrlBar && <span className="ml-3 min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-center font-mono text-[9px] text-slate-400">{urlText || "snow / project"}</span>}{title && <span className="hidden truncate pl-3 font-mono text-[9px] uppercase tracking-[.14em] text-slate-400 sm:block">{title}</span>}</div>}
      <div className={`relative ${ratio} overflow-hidden bg-slate-100 ${phone ? "rounded-[1.7rem]" : ""}`}>
        {!error ? <Image src={src} alt={alt} fill priority={priority} loading={priority ? "eager" : "lazy"} sizes={phone ? "(max-width: 768px) 35vw, 320px" : "(max-width: 1024px) 90vw, 850px"} className={`object-cover object-top transition duration-700 ${loaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setLoaded(true)} onError={() => setError(true)} /> : <div className="flex h-full items-center justify-center p-6 text-center font-mono text-xs text-slate-500">{alt}</div>}
        {!loaded && !error && <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-slate-200" />}
      </div>
      {phone && <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-1 w-20 -translate-x-1/2 rounded-full bg-white/70" />}
      {caption && <div className="border-t border-slate-200 px-3 py-2 font-mono text-[10px] text-slate-500">{caption}</div>}
      </div>
    </SpatialMediaPlane>
  </Tilt>;
}
