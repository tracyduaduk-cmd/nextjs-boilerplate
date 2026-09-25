import { supabase } from "./supabaseClient";
import { ServiceRecord } from "./types";

export const FALLBACK_SERVICES: ServiceRecord[] = [
  {
    id: "e635fb09-ae26-4183-bd5f-503197b0f0d2",
    slug: "web-development",
    name: "Websites & Web Apps",
    short_description: "Modern, fast websites and custom web applications built around your goals.",
    description:
      "Business websites, dashboards, portals, SaaS products, ecommerce and custom web applications using modern technologies.",
    category: "Build",
    capability_family: "WEB",
    icon: "Globe",
    featured: true,
    sort_order: 10,
    capabilities: [
      "Website Creation & Custom Build",
      "Website Redesign & Modernization",
      "Website Repair & Bug Fixing",
      "E-commerce Development & Payments",
      "Speed & Core Web Vitals Optimization",
      "Technical SEO & Analytics Setup",
      "Landing Pages & Conversion Funnels",
      "API & Third-Party Integrations",
    ],
    what_we_help_with: [
      "Building modern, fast, responsive websites from scratch",
      "Fixing broken features, layout bugs, and slow load speeds",
      "Upgrading outdated tech stacks to modern Next.js/React architectures",
      "Integrating Stripe, Shopify, or custom payment processing",
    ],
    process: ["Discovery & Architecture", "Design & Prototyping", "Engineering & Testing", "Deployment & Optimization"],
  },
  {
    id: "cebe1368-d1f3-47d9-9a9f-6482ad399fbf",
    slug: "mobile-app-development",
    name: "Mobile Apps & Cross-Platform",
    short_description: "iOS, Android and cross-platform applications with polished user experiences.",
    description:
      "Mobile product design and development, API integration, authentication, notifications and app maintenance.",
    category: "Build",
    capability_family: "APPS & SOFTWARE",
    icon: "Smartphone",
    featured: true,
    sort_order: 20,
    capabilities: [
      "Mobile App Development (iOS & Android)",
      "Custom Web Applications & SaaS",
      "Booking & Reservation Systems",
      "Custom CRM & Internal Dashboards",
      "Inventory & Order Management",
      "Progressive Web Apps (PWA)",
      "UI/UX Implementation & Design Systems",
      "Database Architecture & Software Configuration",
    ],
    what_we_help_with: [
      "Designing & building scalable cross-platform mobile apps",
      "Creating internal operational dashboards and admin panels",
      "Refactoring legacy software applications for performance and scale",
      "Architecting database schemas and real-time backend APIs",
    ],
    process: ["Product Requirements", "UI/UX Design Systems", "Full-stack Engineering", "App Store & Cloud Deployment"],
  },
  {
    id: "7d81b5cb-3bea-414b-8497-2224f27c5bbc",
    slug: "website-repair-maintenance",
    name: "Website Repair & Maintenance",
    short_description: "Fix broken, slow, outdated or compromised websites and keep them healthy.",
    description:
      "Bug fixing, redesigns, performance improvements, dependency updates, migrations, backups and ongoing maintenance.",
    category: "Fix",
    capability_family: "WEB",
    icon: "Wrench",
    featured: true,
    sort_order: 30,
    capabilities: [
      "Emergency Website Repair & Bug Fixes",
      "CMS & Framework Security Updates",
      "Database Maintenance & Optimization",
      "Managed Backups & Disaster Recovery",
      "Website Migration & Server Moving",
      "Uptime Monitoring & Performance Audits",
    ],
    what_we_help_with: [
      "Fixing broken layouts, 500 errors, or database connection issues",
      "Updating unmaintained dependencies safely without breaking site functionality",
      "Migrating sites to fast modern hosting infrastructure with zero downtime",
    ],
    process: ["Root Cause Diagnosis", "Sandbox Testing & Fix", "Production Deployment", "Proactive Monitoring"],
  },
  {
    id: "2a164246-4a11-4b9d-a7fb-c84982afb098",
    slug: "ai-solutions",
    name: "AI Solutions & Automation",
    short_description: "Practical AI tools, agents and automations that solve real business problems.",
    description:
      "AI chatbots, internal copilots, workflow automation, document processing, API integrations and AI-powered features.",
    category: "AI",
    capability_family: "AI",
    icon: "Sparkles",
    featured: true,
    sort_order: 40,
    capabilities: [
      "AI Chatbot & Virtual Assistant Implementation",
      "AI Workflow Automation & Agent Development",
      "Custom LLM & RAG Integrations",
      "Document Processing & Extraction Pipelines",
      "AI Consulting & Executive Staff Training",
      "AI-Powered Business Tools & Interfaces",
    ],
    what_we_help_with: [
      "Automating repetitive manual support or administrative workflows",
      "Connecting company knowledge bases to private AI assistants",
      "Integrating OpenAI, Anthropic, or open-source models into applications",
    ],
    process: ["Workflow Analysis", "Prompt & Model Engineering", "Integration & Security Hardening", "Evaluation & Tuning"],
  },
  {
    id: "21f29fbe-1ed1-4a5d-91e4-1cd415ad691e",
    slug: "social-account-recovery",
    name: "Account Recovery & Digital Support",
    short_description: "Guidance for recovering your own compromised or inaccessible online accounts.",
    description:
      "Recovery planning, security hardening, evidence preservation and guidance through official platform recovery processes.",
    category: "Recover",
    capability_family: "SECURITY & RECOVERY",
    icon: "ShieldCheck",
    featured: true,
    sort_order: 50,
    capabilities: [
      "Account Recovery Guidance for Account Owners",
      "Account Security Hardening & MFA Setup",
      "Malware Removal & Compromise Remediation",
      "Device & Endpoint Security Assessment",
      "Vulnerability Scanning & Patching",
      "Disaster Recovery & Backup Strategy",
      "Password & Identity Security Management",
    ],
    what_we_help_with: [
      "Recovering legitimate access to locked or compromised platform accounts",
      "Clearing malware infections from websites, servers, or user devices",
      "Hardening security postures across accounts, domain settings, and endpoints",
    ],
    process: ["Incident Assessment", "Evidence & Access Verification", "Remediation & Cleanup", "Security Hardening"],
  },
  {
    id: "268ffdad-ca8c-44c1-b2bc-066ef4b6bfa1",
    slug: "seo-digital-growth",
    name: "SEO & Digital Growth",
    short_description:
      "Technical foundations and digital improvements that help people find and use your business online.",
    description:
      "Technical SEO, analytics, conversion improvements, content systems, performance and search visibility support.",
    category: "Grow",
    capability_family: "DIGITAL GROWTH",
    icon: "ChartNoAxesCombined",
    featured: false,
    sort_order: 60,
    capabilities: [
      "Technical SEO Audits & On-Page Optimization",
      "Analytics Setup & Conversion Tracking",
      "Google Ads & Search Engine Visibility",
      "Email Marketing & Automation Setup",
      "Branding & Digital Asset Development",
      "Content System Architecture",
    ],
    what_we_help_with: [
      "Improving Google search rankings and fixing crawl/indexing errors",
      "Setting up accurate conversion tracking (GA4, PostHog, custom telemetry)",
      "Designing high-converting sales funnels and digital growth assets",
    ],
    process: ["SEO & Analytics Audit", "Strategy & Keyword Architecture", "Implementation", "Performance Measurement"],
  },
  {
    id: "2f640f82-c91f-4a83-a3ce-f02d2016415f",
    slug: "ui-ux-design",
    name: "UI/UX & Product Design",
    short_description: "Clear interfaces and user journeys designed before and alongside development.",
    description:
      "Wireframes, responsive UI systems, prototypes, design systems and product UX improvements.",
    category: "Design",
    capability_family: "APPS & SOFTWARE",
    icon: "PenTool",
    featured: false,
    sort_order: 70,
    capabilities: [
      "Responsive Interface & Layout Systems",
      "Wireframing & Interactive Prototypes",
      "Component Library & Design System Engineering",
      "Product User Experience Optimization",
      "Design-to-Code Technical Handoff",
    ],
    what_we_help_with: [
      "Transforming rough concepts into polished, intuitive digital interfaces",
      "Establishing cohesive design systems that speed up front-end engineering",
      "Eliminating UX friction points that hurt conversion rates",
    ],
    process: ["User Research & Mapping", "Wireframing & UI Exploration", "Design System Creation", "Front-end Implementation"],
  },
  {
    id: "065d9b73-f3f1-4919-9c08-e11ea9221167",
    slug: "cloud-api-integrations",
    name: "Cloud, APIs & Integrations",
    short_description: "Connect your tools and move your systems into reliable modern infrastructure.",
    description:
      "Third-party APIs, payment systems, databases, cloud deployments, authentication and business-system integrations.",
    category: "Scale",
    capability_family: "INFRASTRUCTURE",
    icon: "Cloud",
    featured: false,
    sort_order: 80,
    capabilities: [
      "Managed Web & Application Hosting",
      "Domain & DNS Infrastructure Management",
      "SSL / TLS Certificate Configuration",
      "Business Email & Workspace Administration",
      "Cloud Server Setup (AWS, GCP, DigitalOcean, Vercel, Netlify)",
      "Continuous Deployment (CI/CD) Pipelines",
    ],
    what_we_help_with: [
      "Connecting disparate business tools and APIs cleanly",
      "Migrating applications to reliable, cost-effective cloud infrastructure",
      "Automating deployment pipelines for effortless software updates",
    ],
    process: ["Architecture Design", "Infrastructure Provisioning", "Data & Code Migration", "Verification & Monitoring"],
  },
  {
    id: "b257034d-3650-428b-ab11-4acf8f457d63",
    slug: "cybersecurity-digital-safety",
    name: "Digital Security & Hardening",
    short_description: "Reduce avoidable security risks across websites, apps and online systems.",
    description:
      "Security reviews, access hardening, backups, dependency hygiene, monitoring and incident-response guidance.",
    category: "Protect",
    capability_family: "SECURITY & RECOVERY",
    icon: "LockKeyhole",
    featured: false,
    sort_order: 90,
    capabilities: [
      "Cybersecurity Assessments & Risk Audits",
      "Access Hardening & Multi-Factor Auth Enforcement",
      "Firewall & Endpoint Protection Setup",
      "Dependency Hygiene & Security Patching",
      "Data Encryption & Backup Strategy",
    ],
    what_we_help_with: [
      "Protecting customer data and business applications against vulnerabilities",
      "Implementing strict access controls and encrypted communication channels",
      "Preparing disaster recovery procedures for operational resilience",
    ],
    process: ["Threat Modeling", "Vulnerability Assessment", "Security Controls Implementation", "Continuous Review"],
  },
  {
    id: "d1100000-0000-0000-0000-000000000100",
    slug: "devices-hardware-support",
    name: "Devices & Hardware Support",
    short_description: "Diagnosis, upgrades, repairs, and network configuration for workstations and hardware.",
    description:
      "Comprehensive technical support for desktop computers, laptops, mobile devices, network peripherals, storage upgrades, and device setups.",
    category: "Support",
    capability_family: "DEVICES & HARDWARE",
    icon: "HardDrive",
    featured: false,
    sort_order: 100,
    capabilities: [
      "Computer & Laptop Repair & Maintenance",
      "Phone & Tablet Diagnostics & Support",
      "RAM, SSD, & Hardware Upgrades",
      "Secure Data Transfer & Migration",
      "New Device & Workstation Configuration",
      "Peripheral & Printer Setup",
      "Network & Device Configuration",
    ],
    what_we_help_with: [
      "Diagnostic and repair for malfunctioning workstations or peripherals",
      "Upgrading hardware storage and memory for peak operational performance",
      "Setting up new employee workstations securely and cleanly",
    ],
    process: ["Hardware Assessment", "Repair & Upgrade Execution", "Data Transfer & Testing", "Final Configuration"],
  },
  {
    id: "b1100000-0000-0000-0000-000000000110",
    slug: "business-it-managed-support",
    name: "Business IT & Remote Support",
    short_description: "Managed IT services, office networking, workspace administration, and technical advisory.",
    description:
      "End-to-end technical support for business operations including Microsoft 365, Google Workspace, office network setup, employee onboarding/offboarding, and IT procurement advice.",
    category: "IT",
    capability_family: "BUSINESS IT",
    icon: "Briefcase",
    featured: false,
    sort_order: 110,
    capabilities: [
      "Managed IT & Help Desk Support",
      "Remote Technical Support & Troubleshooting",
      "Office Network & Wi-Fi Optimization",
      "Microsoft 365 & Google Workspace Administration",
      "Employee Onboarding & Offboarding Technical Setup",
      "IT Strategy & Technology Procurement Advice",
    ],
    what_we_help_with: [
      "Ensuring smooth day-to-day IT operations for your team",
      "Managing identity, email, and cloud workspace permissions securely",
      "Designing robust office Wi-Fi and network infrastructure",
    ],
    process: ["IT Needs Discovery", "Environment Setup & Hardening", "Ongoing Support & Helpdesk", "Strategic Reviews"],
  },
];

export async function fetchServices(): Promise<ServiceRecord[]> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("Supabase query notice, using fallback services data:", error.message);
      return FALLBACK_SERVICES;
    }

    if (data && data.length > 0) {
      return data as ServiceRecord[];
    }

    return FALLBACK_SERVICES;
  } catch (err) {
    console.warn("Error fetching services from Supabase, returning fallback dataset:", err);
    return FALLBACK_SERVICES;
  }
}
