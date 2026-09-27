"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProjectWithMedia } from "@/lib/projects/types";
import { Tilt } from "@/components/spatial/Tilt";
import { PointerGlow } from "@/components/spatial/PointerGlow";
import { SpatialMedia } from "@/components/spatial/SpatialMedia";

interface WebsitePreviewProps {
  project: ProjectWithMedia;
  className?: string;
  interactive?: boolean;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  project,
  className = "",
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const previewImage =
    project.hero_media?.url ||
    project.media?.[0]?.url ||
    "";

  const altText = project.hero_media?.alt_text || `${project.title} interface preview`;

  return (
    <Tilt maxRotation={interactive ? 6 : 0} className={`w-full relative ${className}`}>
      <PointerGlow color="rgba(56, 189, 248, 0.15)" className="rounded-2xl" />
      <div
        className="group relative rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden transition-all duration-300 hover:border-sky-500/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Browser Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800/80 font-mono text-xs z-20 relative">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="hidden sm:flex items-center justify-center max-w-md w-full px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-400 text-xs truncate">
            <svg
              className="w-3.5 h-3.5 mr-2 text-slate-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="truncate">https://snow.dev/work/{project.slug}</span>
          </div>

          <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold font-mono">
            {project.category} {project.year ? `• ${project.year}` : ""}
          </div>
        </div>

        {/* Spatial Media Container */}
        <div className="relative w-full overflow-hidden bg-slate-950">
          <SpatialMedia
            src={previewImage}
            alt={altText}
            title={project.title}
            caption={project.summary}
            category={project.category}
            aspectRatio="video"
            showOverlay={!isHovered}
          />

          {/* Hover Overlay with Metadata */}
          <div
            className={`absolute inset-0 z-20 bg-slate-950/85 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 ${
              isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-1">
                  System Record #{project.sort_order.toString().padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-bold text-slate-100 font-sans tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 line-clamp-2 max-w-lg font-sans leading-relaxed">
                  {project.summary}
                </p>
              </div>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-mono hover:bg-sky-500/30 transition-colors flex items-center gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Visit Live</span>
                  <span>↗</span>
                </a>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/90 text-slate-300 border border-slate-700/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  {project.client_name ? (
                    <span className="text-xs font-mono text-slate-400">
                      Client: <strong className="text-slate-200 font-normal">{project.client_name}</strong>
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-slate-500">Archive record</span>
                  )}

                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center text-xs font-semibold text-sky-400 hover:text-sky-300 gap-1 font-mono"
                >
                  <span>View Case Study</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};
