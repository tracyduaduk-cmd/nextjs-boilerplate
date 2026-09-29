export type ConciergeIntent =
  | "build"
  | "repair"
  | "grow"
  | "automate"
  | "protect"
  | "operate"
  | "diagnose"
  | "unknown";

export interface ConciergeRecommendation {
  intent: ConciergeIntent;
  title: string;
  summary: string;
  primaryService: { name: string; slug: string; capabilityFamily: string };
  recommendedTool?: { name: string; href: string };
  recommendedCare?: { name: string; href: string };
  actionLink: { label: string; href: string };
  relevantCapabilityFamilies: string[];
}

export function determineIntentAndRecommendation(input: string): ConciergeRecommendation {
  const query = input.toLowerCase().trim();

  if (query.includes("slow") || query.includes("speed") || query.includes("performance") || query.includes("lag")) {
    return {
      intent: "diagnose",
      title: "Performance Diagnostic & Speed Optimization",
      summary: "Your load times directly impact visitor retention and conversion rates. We recommend running our diagnostic speed check first.",
      primaryService: { name: "Performance Optimization", slug: "performance-optimization", capabilityFamily: "WEB" },
      recommendedTool: { name: "Run Speed Diagnostic", href: "/tools/speed" },
      recommendedCare: { name: "Business Care Plan", href: "/care#care-plans" },
      actionLink: { label: "Run Speed Test Now", href: "/tools/speed" },
      relevantCapabilityFamilies: ["WEB", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("broken") || query.includes("fix") || query.includes("repair") || query.includes("error") || query.includes("crash")) {
    return {
      intent: "repair",
      title: "Website & Application Emergency Repair",
      summary: "Snow provides rapid triage and fix operations for broken sites, server errors, and integration failures.",
      primaryService: { name: "Website Repair", slug: "website-repair", capabilityFamily: "SECURITY & RECOVERY" },
      recommendedTool: { name: "Website Health Check", href: "/tools/website-health" },
      recommendedCare: { name: "Essential Care", href: "/care" },
      actionLink: { label: "Request Emergency Repair", href: "/request" },
      relevantCapabilityFamilies: ["SECURITY & RECOVERY", "WEB", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("store") || query.includes("ecommerce") || query.includes("shop") || query.includes("checkout") || query.includes("payment")) {
    return {
      intent: "build",
      title: "High-Conversion Ecommerce Architecture",
      summary: "We design and build modern online stores with secure checkout, automated inventory sync, and localized payment options.",
      primaryService: { name: "Ecommerce Systems", slug: "ecommerce-systems", capabilityFamily: "WEB" },
      recommendedTool: { name: "Run Security Check", href: "/tools/security" },
      recommendedCare: { name: "Continuous Care", href: "/care" },
      actionLink: { label: "Request Store Development", href: "/request" },
      relevantCapabilityFamilies: ["WEB", "SECURITY & RECOVERY"],
    };
  }

  if (query.includes("app") || query.includes("mobile") || query.includes("software") || query.includes("platform") || query.includes("saas")) {
    return {
      intent: "build",
      title: "Custom Application & Platform Development",
      summary: "Tailored full-stack Web and Mobile applications built with resilient databases, responsive UX, and scalable architecture.",
      primaryService: { name: "Web Applications", slug: "web-applications", capabilityFamily: "APPS & SOFTWARE" },
      recommendedTool: { name: "AI Readiness Check", href: "/tools/ai-readiness" },
      recommendedCare: { name: "Continuous Care", href: "/care" },
      actionLink: { label: "Start Application Request", href: "/request" },
      relevantCapabilityFamilies: ["APPS & SOFTWARE", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("automate") || query.includes("ai") || query.includes("bot") || query.includes("workflow") || query.includes("process")) {
    return {
      intent: "automate",
      title: "AI Solutions & Workflow Automation",
      summary: "Automate repetitive customer queries, document parsing, and business operations using intelligent LLM workflows.",
      primaryService: { name: "AI Solutions & Automation", slug: "ai-solutions-automation", capabilityFamily: "AI" },
      recommendedTool: { name: "Evaluate AI Readiness", href: "/tools/ai-readiness" },
      recommendedCare: { name: "Continuous Care", href: "/care" },
      actionLink: { label: "Explore AI Automation", href: "/request" },
      relevantCapabilityFamilies: ["AI", "BUSINESS IT"],
    };
  }

  if (query.includes("google") || query.includes("seo") || query.includes("traffic") || query.includes("visibility") || query.includes("growth")) {
    return {
      intent: "grow",
      title: "Technical SEO & Search Visibility Foundation",
      summary: "Clean semantic markup, schema structured data, and performance architecture to earn organic Google positioning.",
      primaryService: { name: "SEO & Digital Growth", slug: "seo-digital-growth", capabilityFamily: "DIGITAL GROWTH" },
      recommendedTool: { name: "Run SEO Check", href: "/tools/seo" },
      recommendedCare: { name: "Business Care", href: "/care" },
      actionLink: { label: "Run Free SEO Check", href: "/tools/seo" },
      relevantCapabilityFamilies: ["DIGITAL GROWTH", "WEB"],
    };
  }

  if (query.includes("compromised") || query.includes("hack") || query.includes("security") || query.includes("recovery") || query.includes("account")) {
    return {
      intent: "protect",
      title: "Security & Account Recovery Assistance",
      summary: "Ethical security audits, header hardening, and legitimate recovery guidance for compromised digital accounts.",
      primaryService: { name: "Account Recovery Assistance", slug: "account-recovery-assistance", capabilityFamily: "SECURITY & RECOVERY" },
      recommendedTool: { name: "Security Check", href: "/tools/security" },
      recommendedCare: { name: "Essential Care", href: "/care" },
      actionLink: { label: "Request Recovery Assistance", href: "/request" },
      relevantCapabilityFamilies: ["SECURITY & RECOVERY", "INFRASTRUCTURE"],
    };
  }

  if (query.includes("new website") || query.includes("redesign") || query.includes("build") || query.includes("site")) {
    return {
      intent: "build",
      title: "Bespoke Website Development",
      summary: "Cinematic, fast, and responsive web presences engineered to establish technical authority and convert clients.",
      primaryService: { name: "Website Development", slug: "website-development", capabilityFamily: "WEB" },
      recommendedTool: { name: "Website Health Check", href: "/tools/website-health" },
      recommendedCare: { name: "Essential Care", href: "/care" },
      actionLink: { label: "Request Website Build", href: "/request" },
      relevantCapabilityFamilies: ["WEB", "DIGITAL GROWTH"],
    };
  }

  return {
    intent: "diagnose",
    title: "Snow Guided Technology Assessment",
    summary: "Tell us about your goals or challenges. We will guide you through a diagnostic check or match you with the exact capability family.",
    primaryService: { name: "Technology Consulting", slug: "technology-consulting", capabilityFamily: "BUSINESS IT" },
    recommendedTool: { name: "Explore All Diagnostic Tools", href: "/tools" },
    recommendedCare: { name: "Explore Snow Care", href: "/care" },
    actionLink: { label: "Request a Direct Consultation", href: "/request" },
    relevantCapabilityFamilies: ["WEB", "AI", "SECURITY & RECOVERY", "BUSINESS IT"],
  };
}

export function formatRecommendationContext(recommendation: ConciergeRecommendation): string {
  const links = [
    recommendation.recommendedTool ? `${recommendation.recommendedTool.name}: ${recommendation.recommendedTool.href}` : null,
    recommendation.recommendedCare ? `${recommendation.recommendedCare.name}: ${recommendation.recommendedCare.href}` : null,
    `${recommendation.actionLink.label}: ${recommendation.actionLink.href}`,
  ]
    .filter((link): link is string => Boolean(link))
    .join("; ");
  return `Grounded Snow mapping: ${recommendation.title}. Service: ${recommendation.primaryService.name}. Known links: ${links}. Capability families: ${recommendation.relevantCapabilityFamilies.join(", ")}.`;
}
