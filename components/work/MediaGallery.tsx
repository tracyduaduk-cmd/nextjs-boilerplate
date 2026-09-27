"use client";

import React, { useState } from "react";
import { ProjectMediaRecord } from "@/lib/projects/types";
import { SpatialMedia } from "@/components/spatial/SpatialMedia";
import { Tilt } from "@/components/spatial/Tilt";

interface MediaGalleryProps {
  mediaItems: ProjectMediaRecord[];
  projectTitle: string;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ mediaItems, projectTitle }) => {
  const [selectedMedia, setSelectedMedia] = useState<ProjectMediaRecord | null>(null);

  if (!mediaItems || mediaItems.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {mediaItems.map((item) => {
          const isMobile =
            item.sort_order === 3 ||
            item.title?.toLowerCase().includes("mobile") ||
            item.url.includes("mobile");
          const isDesktop =
            item.sort_order === 2 ||
            item.title?.toLowerCase().includes("desktop") ||
            item.url.includes("desktop");
          const isHero =
            item.sort_order === 1 ||
            item.title?.toLowerCase().includes("hero") ||
            item.url.includes("hero");

          const roleLabel = isHero
            ? "HERO VIEW"
            : isDesktop
            ? "DESKTOP VIEW"
            : isMobile
            ? "MOBILE VIEW"
            : item.media_type.toUpperCase();

          const aspectRatio = isMobile ? "portrait" : "video";

          return (
            <Tilt key={item.id} maxRotation={5} className="w-full">
              <div
                onClick={() => setSelectedMedia(item)}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden cursor-pointer hover:border-sky-500/50 transition-all duration-300 shadow-xl"
              >
                <SpatialMedia
                  src={item.url}
                  alt={item.alt_text || `${projectTitle} media screenshot`}
                  title={item.title || `${projectTitle} Preview`}
                  caption={item.alt_text}
                  category={roleLabel}
                  aspectRatio={aspectRatio}
                />

                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                  <span className="px-3.5 py-2 rounded-xl bg-slate-950/90 border border-sky-500/40 text-sky-400 text-xs font-mono shadow-2xl backdrop-blur-md">
                    Expand View ↗
                  </span>
                </div>

                {item.title && (
                  <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-xs font-mono text-slate-300 truncate">
                    {item.title}
                  </div>
                )}
              </div>
            </Tilt>
          );
        })}
      </div>

      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">
                {selectedMedia.title || `${projectTitle} Preview`}
              </span>
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-slate-950 flex justify-center max-h-[80vh] overflow-auto">
              <SpatialMedia
                src={selectedMedia.url}
                alt={selectedMedia.alt_text || projectTitle}
                title={selectedMedia.title || projectTitle}
                caption={selectedMedia.alt_text}
                aspectRatio={selectedMedia.sort_order === 3 ? "portrait" : "auto"}
                className="max-h-[75vh] w-auto max-w-full"
                priority={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
