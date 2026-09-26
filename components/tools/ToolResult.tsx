"use client";

import React from "react";
import { ToolFinding } from "./ToolFinding";
import { ToolRecommendation } from "./ToolRecommendation";
import { ToolResultData } from "@/lib/tools/types";

export interface ToolResultProps {
  data: ToolResultData;
}

export const ToolResult: React.FC<ToolResultProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto my-10 space-y-8 animate-in fade-in duration-500">
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-slate-400 uppercase">Target Analyzed</p>
          <p className="text-base font-bold text-slate-100">{data.urlOrTarget || "Demonstration Baseline"}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono text-slate-400 uppercase">Overall Assessment</p>
          <span className="text-sm font-semibold text-emerald-400">{data.overallStatus}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.categories.map((cat, index) => (
          <ToolFinding
            key={index}
            category={cat.category}
            status={cat.status}
            scoreLabel={cat.scoreLabel}
            findings={cat.findings}
          />
        ))}
      </div>

      <ToolRecommendation
        serviceName={data.recommendedService.name}
        serviceSlug={data.recommendedService.slug}
        serviceDescription={data.recommendedService.description}
        carePlanName={data.recommendedCarePlan?.name}
        carePlanHref={data.recommendedCarePlan?.href}
      />
    </div>
  );
};
