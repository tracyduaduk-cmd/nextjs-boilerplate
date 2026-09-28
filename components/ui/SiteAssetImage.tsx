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
}

export const SiteAssetImage: React.FC<SiteAssetImageProps> = ({
  pageKey,
  slotKey,
  fallbackComponent,
  className = "",
  priority = false,
}) => {
  const [asset, setAsset] = useState<SiteAssetRecord | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchSiteAsset(pageKey, slotKey).then((res) => {
      if (mounted) {
        if (res) {
          setAsset(res);
        } else {
          setHasError(true);
        }
        setIsLoading(false);
      }
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
      <div className={`w-full h-48 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse flex items-center justify-center ${className}`}>
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          Loading Visual Asset...
        </span>
      </div>
    );
  }

  if (!asset) return <>{fallbackComponent || null}</>;

  return (
    <div className={`relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950 group ${className}`}>
      <Image
        src={asset.public_url}
        alt={asset.alt_text || asset.title}
        width={1200}
        height={675}
        unoptimized
        priority={priority}
        onError={() => setHasError(true)}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800/60 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] font-mono text-slate-300 truncate">{asset.title}</span>
        <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded uppercase shrink-0">
          {asset.asset_type.replace("_", " ")}
        </span>
      </div>
    </div>
  );
};
