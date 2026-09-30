"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchSiteAsset, SiteAssetRecord } from "@/lib/siteAssets";

interface SiteAssetImageProps {
  pageKey: string;
  slotKey: string;
  fallbackComponent?: React.ReactNode;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
  objectPosition?: string;
  showCaption?: boolean;
}

export const SiteAssetImage: React.FC<SiteAssetImageProps> = ({
  pageKey,
  slotKey,
  fallbackComponent,
  className = "",
  priority = false,
  aspectRatio = "aspect-video",
  sizes = "(max-width: 768px) 100vw, 50vw",
  objectPosition = "center",
  showCaption = true,
}) => {
  const [asset, setAsset] = useState<SiteAssetRecord | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchSiteAsset(pageKey, slotKey).then((res) => {
      if (!mounted) return;
      if (res) setAsset(res);
      else setHasError(true);
      setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [pageKey, slotKey]);

  if (hasError || (!asset && !isLoading)) {
    return <>{fallbackComponent || null}</>;
  }

  if (isLoading) {
    return (
      <div
        aria-hidden="true"
        className={`w-full ${aspectRatio} rounded-xl bg-slate-900/60 border border-slate-800/80 animate-pulse flex items-center justify-center ${className}`}
      >
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Loading Visual Asset...</span>
      </div>
    );
  }

  if (!asset) return <>{fallbackComponent || null}</>;

  return (
    <figure className={`relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950 group ${className}`}>
      <div className={`relative w-full ${aspectRatio} overflow-hidden`}>
        <Image
          src={asset.public_url}
          alt={asset.alt_text || asset.title}
          fill
          sizes={sizes}
          unoptimized
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          onError={() => setHasError(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ objectPosition }}
        />
      </div>

      {showCaption && (
        <figcaption className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800/80 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="text-[10px] font-mono text-slate-200 truncate">{asset.title}</span>
          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/90 px-1.5 py-0.5 rounded border border-cyan-800/60 uppercase shrink-0 ml-2">
            {asset.asset_type.replace(/_/g, " ")}
          </span>
        </figcaption>
      )}
    </figure>
  );
};
