import { CapabilityFamilyMeta, ProblemOption } from "./types";

export const CAPABILITY_FAMILIES: CapabilityFamilyMeta[] = [
  {
    id: "WEB",
    name: "Web Systems & Commerce",
    tagline: "Digital experiences, commerce, and web infrastructure",
    description:
      "Modern, fast, and secure web applications built on cutting-edge frameworks, robust ecommerce engines, and optimized performance foundations.",
    iconName: "Globe",
    colorAccent: "sky",
    badge: "CORE WEB",
  },
  {
    id: "APPS & SOFTWARE",
    name: "Apps & Software Systems",
    tagline: "Custom web applications, mobile platforms, and software tools",
    description:
      "Tailored software solutions designed around your operational logic, from native iOS/Android applications to custom dashboards and API architectures.",
    iconName: "Smartphone",
    colorAccent: "indigo",
    badge: "SOFTWARE",
  },
  {
    id: "INFRASTRUCTURE",
    name: "Cloud & Infrastructure",
    tagline: "Reliable cloud deployments, domain systems, and hosting",
    description:
      "High-availability server setup, managed web hosting, domain security, SSL certificates, and automated deployment pipelines.",
    iconName: "Cloud",
    colorAccent: "teal",
    badge: "CLOUD & DEPLOY",
  },
  {
    id: "SECURITY & RECOVERY",
    name: "Security & Recovery",
    tagline: "Legitimate account recovery, security audits, and risk hardening",
    description:
      "Professional guidance for recovering compromised platform accounts, clearing malware, performing security audits, and establishing disaster backups.",
    iconName: "ShieldCheck",
    colorAccent: "emerald",
    badge: "PROTECTION",
  },
  {
    id: "AI",
    name: "AI & Intelligent Automation",
    tagline: "AI agents, automated workflows, and practical integrations",
    description:
      "Custom AI assistants, automated document processing, LLM integrations, and intelligent workflow pipelines that eliminate manual operational bottlenecks.",
    iconName: "Sparkles",
    colorAccent: "violet",
    badge: "AI & AUTOMATION",
  },
  {
    id: "DEVICES & HARDWARE",
    name: "Devices & Hardware Support",
    tagline: "Workstation repair, hardware upgrades, and network setups",
    description:
      "On-site and remote hardware troubleshooting, laptop/desktop repairs, SSD/RAM performance upgrades, and workstation deployments.",
    iconName: "HardDrive",
    colorAccent: "amber",
    badge: "HARDWARE",
  },
  {
    id: "BUSINESS IT",
    name: "Business IT & Managed Support",
    tagline: "Managed IT services, office networking, and workspace admin",
    description:
      "End-to-end technical support for organizations including Microsoft 365, Google Workspace, office Wi-Fi optimization, and employee onboarding.",
    iconName: "Briefcase",
    colorAccent: "cyan",
    badge: "MANAGED IT",
  },
  {
    id: "DIGITAL GROWTH",
    name: "Digital Growth & Analytics",
    tagline: "Technical SEO, telemetry setup, and digital performance",
    description:
      "Data-driven technical foundations, search engine optimization, conversion tracking setup, and search visibility support.",
    iconName: "ChartNoAxesCombined",
    colorAccent: "rose",
    badge: "GROWTH",
  },
];

export const PROBLEM_DIAGNOSTIC_OPTIONS: ProblemOption[] = [
  {
    id: "need-website",
    title: "I need a new website or redesign",
    subtitle: "High-performance marketing, web app, or modern storefront.",
    capabilityFamily: "WEB",
    recommendedSlug: "web-development",
    badge: "WEB DEVELOPMENT",
  },
  {
    id: "website-broken",
    title: "My website is broken or slow",
    subtitle: "Errors, bugs, slow load times, or compromised security.",
    capabilityFamily: "WEB",
    recommendedSlug: "website-repair-maintenance",
    badge: "REPAIR & MAINTENANCE",
  },
  {
    id: "need-app",
    title: "I need a mobile or web application",
    subtitle: "Custom iOS/Android app, dashboard, CRM, or booking portal.",
    capabilityFamily: "APPS & SOFTWARE",
    recommendedSlug: "mobile-app-development",
    badge: "SOFTWARE ENGINEERING",
  },
  {
    id: "security-account",
    title: "I need help with security or account recovery",
    subtitle: "Account access issues, malware cleanup, or security hardening.",
    capabilityFamily: "SECURITY & RECOVERY",
    recommendedSlug: "social-account-recovery",
    badge: "SECURITY & RECOVERY",
  },
  {
    id: "ai-automation",
    title: "I need AI automation or workflow integration",
    subtitle: "Custom AI chatbot, agent, knowledge base, or auto pipeline.",
    capabilityFamily: "AI",
    recommendedSlug: "ai-solutions",
    badge: "AI AUTOMATION",
  },
  {
    id: "technical-support",
    title: "I need technical support for my team or hardware",
    subtitle: "Managed IT, workstation upgrades, network, or M365/Google.",
    capabilityFamily: "BUSINESS IT",
    recommendedSlug: "business-it-managed-support",
    badge: "BUSINESS IT",
  },
  {
    id: "hosting-infrastructure",
    title: "I need hosting or infrastructure setup",
    subtitle: "Cloud server setup, domain/DNS, deployment, or API connections.",
    capabilityFamily: "INFRASTRUCTURE",
    recommendedSlug: "cloud-api-integrations",
    badge: "INFRASTRUCTURE",
  },
  {
    id: "not-sure",
    title: "I'm not sure — I have a technical problem",
    subtitle: "Explore our full technical capability system or talk to us.",
    capabilityFamily: "WEB",
    recommendedSlug: "web-development",
    badge: "EXPLORE ALL",
  },
];
