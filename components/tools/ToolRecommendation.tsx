"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

export interface ToolRecommendationProps {
  serviceName: string;
  serviceSlug: string;
  serviceDescription: string;
  carePlanName?: string;
  carePlanHref?: string;
  targetUrl?: string;
  overallStatus?: string;
  careCategorySlug?: string;
}

export const ToolRecommendation: React.FC<ToolRecommendationProps> = ({
  serviceName,
  serviceSlug,
  serviceDescription,
  carePlanName,
  carePlanHref,
  targetUrl,
  overallStatus,
  careCategorySlug,
}) => {
  let categorySlug = careCategorySlug;
  if (!categorySlug) {
    if (serviceSlug.includes("speed") || serviceSlug.includes("performance")) {
      categorySlug = "performance-care";
    } else if (serviceSlug.includes("security") || serviceSlug.includes("recovery")) {
      categorySlug = "security-care";
    } else if (serviceSlug.includes("cloud") || serviceSlug.includes("api") || serviceSlug.includes("infrastructure")) {
      categorySlug = "infrastructure-care";
    } else if (serviceSlug.includes("app") || serviceSlug.includes("software")) {
      categorySlug = "app-care";
    } else {
      categorySlug = "website-care";
    }
  }

  const problemContext = targetUrl
    ? `Diagnostic check for ${targetUrl} resulted in ${overallStatus || "findings requiring attention"}`
    : `Diagnostic result: ${serviceName} findings requiring attention`;

  const careRequestUrl = `/request?service=snow-care&category=${categorySlug}&problem=${encodeURIComponent(problemContext)}`;
  const directRequestUrl = `/request?service=${serviceSlug}&problem=${encodeURIComponent(problemContext)}`;

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-800/60 shadow-xl my-8 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60 inline-flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5" />
          Recommended Next Steps
        </span>
        <span className="text-xs font-mono text-slate-500">DIAGNOSTIC HANDOFF</span>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-100 mb-2 font-sans">
          Recommended Solution: {serviceName}
        </h3>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          {serviceDescription}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        <Link
          href={careRequestUrl}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
        >
          <span>REQUEST SNOW CARE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href={directRequestUrl}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all text-center flex items-center justify-center gap-2"
        >
          <span>Request Expert Service</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {carePlanName && carePlanHref && (
          <Link
            href={carePlanHref}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-semibold text-sm border border-emerald-800/60 transition-all text-center"
          >
            Explore {carePlanName} ↗
          </Link>
        )}
      </div>
    </div>
  );
};
