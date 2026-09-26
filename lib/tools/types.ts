export type ToolType =
  | "website-health"
  | "speed"
  | "seo"
  | "security"
  | "ai-readiness";

export interface ToolMeta {
  id: ToolType;
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  purpose: string;
  whatItChecks: string[];
  expectedOutput: string;
  accentColor: "emerald" | "sky" | "amber" | "rose" | "teal";
}

export interface DiagnosticCategoryResult {
  category: string;
  scoreLabel: string;
  status: "pass" | "warning" | "attention";
  findings: string[];
}

export interface ToolResultData {
  urlOrTarget?: string;
  overallStatus: "Ready for Deep Scan" | "Baseline Passed" | "Requires Attention" | "Requires Optimization";
  categories: DiagnosticCategoryResult[];
  recommendedService: {
    name: string;
    slug: string;
    description: string;
  };
  recommendedCarePlan?: {
    name: string;
    href: string;
  };
}
