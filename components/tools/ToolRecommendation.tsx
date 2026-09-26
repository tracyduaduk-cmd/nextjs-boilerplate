"use client";

import React from "react";
import Link from "next/link";

export interface ToolRecommendationProps {
  serviceName: string;
  serviceSlug: string;
  serviceDescription: string;
  carePlanName?: string;
  carePlanHref?: string;
}

export const ToolRecommendation: React.FC<ToolRecommendationProps> = ({
  serviceName,
  serviceDescription,
  carePlanName,
  carePlanHref,
}) => {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-sky-800/60 shadow-xl my-8">
      <span className="text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800/60 inline-block mb-4">
        Snow Recommended Path
      </span>
      <h3 className="text-2xl font-bold text-slate-100 mb-2">Recommended Solution: {serviceName}</h3>
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">{serviceDescription}</p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href={`/request`}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold text-sm transition-all text-center"
        >
          Request {serviceName} ↗
        </Link>

        {carePlanName && carePlanHref && (
          <Link
            href={carePlanHref}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-sm border border-slate-700/80 transition-all text-center"
          >
            Explore {carePlanName} ↗
          </Link>
        )}
      </div>
    </div>
  );
};
