"use client";

import React, { useState } from "react";
import { ProjectMediaRecord } from "@/lib/projects/types";

interface MediaGalleryProps {
  mediaItems: ProjectMediaRecord[];
  projectTitle: string;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ mediaItems, projectTitle }) => {
  const [selectedMedia, setSelectedMedia] = useState<ProjectMediaRecord | null>(null);

  if (!mediaItems || mediaItems.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden cursor-pointer hover:border-sky-500/50 transition-all duration-300 shadow-lg"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950 relative">
              <img
                src={item.url}
                alt={item.alt_text || `${projectTitle} media screenshot`}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-sky-400 text-xs font-mono">
                  Expand View ↗
                </span>
              </div>
            </div>
            {item.title && (
              <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-xs font-mono text-slate-300 truncate">
                {item.title}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <span className="text-xs font-mono text-slate-300">
                {selectedMedia.title || `${projectTitle} Preview`}
              </span>
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="p-2 sm:p-4 bg-slate-950 flex justify-center">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.alt_text || projectTitle}
                className="max-h-[80vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
