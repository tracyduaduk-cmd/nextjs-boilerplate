"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProjectMediaRecord } from "@/lib/projects/types";

interface ProjectMediaDisplayProps {
  media: ProjectMediaRecord;
  priority?: boolean;
  aspectRatio?: "video" | "square" | "wide" | "portrait" | "auto";
  className?: string;
  showCaption?: boolean;
}

export const ProjectMediaDisplay: React.FC<ProjectMediaDisplayProps> = ({
  media,
  priority = false,
  aspectRatio = "wide",
  className = "",
  showCaption = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "video":
        return "aspect-video";
      case "square":
        return "aspect-square";
      case "portrait":
        return "aspect-[3/4]";
      case "wide":
        return "aspect-[16/10]";
      case "auto":
        return "h-auto";
      default:
        return "aspect-[16/10]";
    }
  };

  const isVideo = media.media_type === "video";

  return (
    <figure className={`group relative w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-sky-500/30 ${className}`}>
      <div className={`relative w-full overflow-hidden ${getAspectClass()}`}>
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -inset-1 z-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-violet-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        {/* Loading Spinner Skeleton */}
        {isLoading && !imageError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/80">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
          </div>
        )}

        {/* Video / Image Render */}
        {isVideo ? (
          <video
            src={media.url}
            controls
            poster={media.thumbnail_url || undefined}
            className="relative z-10 h-full w-full object-cover"
            onLoadedData={() => setIsLoading(false)}
          />
        ) : (
          <Image
            src={imageError ? "https://placehold.co/1200x800/0f172a/38bdf8.png?text=Snow+Preview" : media.url}
            alt={media.alt_text || media.title || "Snow Project Media"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            unoptimized={media.url.startsWith("http") && !media.url.includes("supabase")}
            className={`relative z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
              isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"
            }`}
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
          />
        )}

        {/* Screen scanlines overlay for high-tech aesthetic */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-40 mix-blend-overlay" />
      </div>

      {showCaption && (media.title || media.alt_text) && (
        <figcaption className="border-t border-white/5 bg-slate-950/60 px-4 py-2.5 text-xs text-slate-400 font-mono flex items-center justify-between">
          <span>{media.title || "Project Display"}</span>
          <span className="text-slate-600 uppercase tracking-widest">{media.media_type}</span>
        </figcaption>
      )}
    </figure>
  );
};
