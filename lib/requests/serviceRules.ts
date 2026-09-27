import {
  ServiceRulesConfig,
  DiagnosticResult,
  PricingRule,
  TimelineOption,
  BudgetOption,
} from "./types";

export const TIMELINE_OPTIONS: { value: TimelineOption; label: string; description: string }[] = [
  { value: "exploring", label: "Exploring / Early Planning", description: "Evaluating options for an upcoming project" },
  { value: "no_fixed_deadline", label: "No Fixed Deadline", description: "Flexible timing when ready" },
  { value: "within_month", label: "Within a Month", description: "Targeting launch or start within 30 days" },
  { value: "within_two_weeks", label: "Within Two Weeks", description: "High priority requirement" },
  { value: "urgent", label: "Urgent", description: "Immediate attention required" },
  { value: "system_down", label: "Site / System Currently Down", description: "Critical incident needing instant triage" },
];

export const BUDGET_OPTIONS: { value: BudgetOption; label: string; description: string }[] = [
  { value: "not_sure", label: "Not sure yet", description: "Will discuss scope during initial estimate" },
  { value: "under_100k", label: "Under ₦100,000", description: "Approximate project budget indicator" },
  { value: "100k_250k", label: "₦100,000 – ₦250,000", description: "Approximate project budget indicator" },
  { value: "250k_500k", label: "₦250,000 – ₦500,000", description: "Approximate project budget indicator" },
  { value: "500k_1m", label: "₦500,000 – ₦1,000,000", description: "Approximate project budget indicator" },
  { value: "1m_plus", label: "₦1,000,000+", description: "Approximate project budget indicator" },
  { value: "prefer_not_to_say", label: "Prefer not to say", description: "Keep budget discussion confidential for now" },
];

export const SERVICE_RULES_CONFIGS: Record<string, ServiceRulesConfig> = {
  // 1. Website Development
  "web-development": {
    serviceSlug: "web-development",
    category: "Web & Digital",
    familyId: "WEB",
    title: "Web Engineering & Design",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "site_status",
        label: "Is this a new website or an existing website?",
        type: "select",
        required: true,
        options: [
          { value: "new", label: "New Website", description: "Building a brand new web presence from scratch" },
          { value: "existing_redesign", label: "Existing Website (Redesign/Rebuild)", description: "Updating or rebuilding a current site" },
          { value: "existing_addition", label: "Existing Website (Add Features)", description: "Adding new capabilities to an active site" },
        ],
      },
      {
        id: "existing_url",
        label: "If existing, what is the current website URL?",
        type: "url",
        placeholder: "https://example.com",
        helpText: "Provides immediate context for our engineering team.",
      },
      {
        id: "website_type",
        label: "What type of website do you need?",
        type: "select",
        required: true,
        options: [
          { value: "corporate", label: "Corporate / Business Site", description: "Professional brand showcase and client lead capture" },
          { value: "portfolio", label: "Portfolio / Creative Site", description: "High-impact visual showcase" },
          { value: "landing", label: "Campaign / Product Landing Page", description: "High-converting focused landing page" },
          { value: "web_app", label: "Interactive Web Application", description: "Dynamic dashboard, portal, or custom software" },
          { value: "other", label: "Other / Custom", description: "Tailored web experience" },
        ],
      },
      {
        id: "page_count",
        label: "Approximate number of pages or views?",
        type: "select",
        options: [
          { value: "1_3", label: "1 to 3 pages" },
          { value: "4_10", label: "4 to 10 pages" },
          { value: "10_25", label: "10 to 25 pages" },
          { value: "25_plus", label: "25+ pages" },
        ],
      },
      {
        id: "ecommerce_needed",
        label: "Do you need e-commerce or payment functionality?",
        type: "select",
        options: [
          { value: "yes_full", label: "Yes, full online store with catalog & cart" },
          { value: "yes_simple", label: "Yes, simple payment gateway / checkout link" },
          { value: "no", label: "No e-commerce needed" },
        ],
      },
      {
        id: "integrations",
        label: "Do you need third-party integrations?",
        type: "multiselect",
        options: [
          { value: "crm", label: "CRM (HubSpot, Salesforce, Zoho)" },
          { value: "email_marketing", label: "Email Marketing (Mailchimp, Brevo)" },
          { value: "booking", label: "Booking / Scheduling Calendar" },
          { value: "custom_api", label: "Custom API / Database Sync" },
          { value: "analytics", label: "Analytics & Tracking Pixels" },
        ],
      },
      {
        id: "ongoing_maintenance",
        label: "Do you require ongoing technical support & maintenance?",
        type: "select",
        options: [
          { value: "yes_managed", label: "Yes, fully managed hosting and updates" },
          { value: "yes_on_demand", label: "Yes, on-demand support as needed" },
          { value: "no", label: "No, internal team will maintain" },
        ],
      },
    ],
  },

  // 2. Website Repair / Troubleshooting
  "website-repair": {
    serviceSlug: "website-repair",
    category: "Web & Digital",
    familyId: "WEB",
    title: "Website Repair & Troubleshooting",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "issue_nature",
        label: "What is wrong with the website?",
        type: "select",
        required: true,
        options: [
          { value: "blank_screen", label: "White screen / Blank page error", description: "Site loads completely white or 500 error" },
          { value: "broken_layout", label: "Broken layout / Mobile display issue", description: "Design or CSS formatting is displaced" },
          { value: "slow_loading", label: "Extremely slow performance", description: "High latency, hanging or timing out" },
          { value: "hacked_malware", label: "Suspected malware / Security compromise", description: "Unwanted redirects or spam warnings" },
          { value: "form_payment_broken", label: "Forms or checkout failing", description: "Submissions or payments not processing" },
          { value: "other", label: "Other technical error", description: "Other unexpected behavior" },
        ],
      },
      {
        id: "is_completely_down",
        label: "Is the website completely down right now?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes, site is inaccessible to visitors" },
          { value: "intermittent", label: "Intermittent / Down periodically" },
          { value: "no", label: "No, site is accessible but broken" },
        ],
      },
      {
        id: "website_url",
        label: "Affected Website URL",
        type: "url",
        required: true,
        placeholder: "https://example.com",
      },
      {
        id: "platform",
        label: "What platform is the website running on?",
        type: "select",
        options: [
          { value: "wordpress", label: "WordPress" },
          { value: "shopify", label: "Shopify" },
          { value: "nextjs_react", label: "Next.js / React" },
          { value: "laravel_php", label: "Laravel / Custom PHP" },
          { value: "wix_squarespace", label: "Wix / Squarespace / Webflow" },
          { value: "unknown", label: "Not sure / Need help identifying" },
        ],
      },
      {
        id: "when_started",
        label: "When did the issue begin?",
        type: "select",
        options: [
          { value: "today", label: "Today / Just recently" },
          { value: "few_days", label: "In the last few days" },
          { value: "after_update", label: "Right after a recent update or plugin change" },
          { value: "persistent", label: "Ongoing issue over weeks" },
        ],
      },
    ],
  },

  // 3. E-Commerce Solutions
  "e-commerce": {
    serviceSlug: "e-commerce",
    category: "Web & Digital",
    familyId: "WEB",
    title: "E-Commerce Engineering",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "store_type",
        label: "What type of online store are you building?",
        type: "select",
        required: true,
        options: [
          { value: "new_store", label: "New E-Commerce Store", description: "First online store build" },
          { value: "platform_migration", label: "Platform Migration", description: "Moving to Shopify, WooCommerce, or custom" },
          { value: "store_fix_optimization", label: "Optimization / Feature Upgrade", description: "Payment, checkout, or performance fix" },
        ],
      },
      {
        id: "product_count",
        label: "Approximate number of products?",
        type: "select",
        options: [
          { value: "1_20", label: "1 - 20 products" },
          { value: "21_100", label: "21 - 100 products" },
          { value: "100_1000", label: "100 - 1,000 products" },
          { value: "1000_plus", label: "1,000+ enterprise catalog" },
        ],
      },
      {
        id: "payment_providers",
        label: "Which payment gateways do you plan to use?",
        type: "multiselect",
        options: [
          { value: "paystack", label: "Paystack / Flutterwave (Nigeria/Africa)" },
          { value: "stripe", label: "Stripe" },
          { value: "paypal", label: "PayPal" },
          { value: "bank_transfer", label: "Direct Bank Transfer / USSD" },
        ],
      },
    ],
  },

  // 4. App Development
  "app-development": {
    serviceSlug: "app-development",
    category: "Software & Mobile",
    familyId: "APPS & SOFTWARE",
    title: "Application Development",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "platforms",
        label: "Which platforms are you targeting?",
        type: "multiselect",
        required: true,
        options: [
          { value: "ios", label: "iOS (Apple App Store)" },
          { value: "android", label: "Android (Google Play Store)" },
          { value: "web_app", label: "Web Application (Browser)" },
          { value: "desktop", label: "Desktop App (Mac/Windows)" },
        ],
      },
      {
        id: "app_status",
        label: "Is this a new application or existing software?",
        type: "select",
        required: true,
        options: [
          { value: "new", label: "New Application", description: "Building from concept" },
          { value: "existing_upgrade", label: "Existing App", description: "Adding features, fixing bugs, or modernizing" },
        ],
      },
      {
        id: "designs_ready",
        label: "Do you already have UI/UX designs?",
        type: "select",
        options: [
          { value: "yes_complete", label: "Yes, full Figma / wireframes ready" },
          { value: "partial", label: "Partial sketches or reference apps" },
          { value: "no_need_design", label: "No, need Snow to handle UI/UX design" },
        ],
      },
      {
        id: "key_features",
        label: "Which capabilities will the app require?",
        type: "multiselect",
        options: [
          { value: "user_auth", label: "User Accounts & Authentication" },
          { value: "payments", label: "In-app Payments / Subscriptions" },
          { value: "push_notifications", label: "Push Notifications" },
          { value: "gps_location", label: "GPS / Location Services" },
          { value: "api_backend", label: "Custom Backend API & Database" },
          { value: "offline_sync", label: "Offline Mode & Local Storage" },
        ],
      },
    ],
  },

  // 5. AI & Automation
  "ai-automation": {
    serviceSlug: "ai-automation",
    category: "AI & Data",
    familyId: "AI",
    title: "AI Integration & Automation",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "ai_objective",
        label: "What should the AI system perform?",
        type: "multiselect",
        required: true,
        options: [
          { value: "website_chatbot", label: "Website Customer Support Chatbot" },
          { value: "internal_automation", label: "Internal Workflow Automation" },
          { value: "ai_agent", label: "Autonomous AI Agent / Assistant" },
          { value: "content_workflow", label: "Content Generation & Summarization" },
          { value: "data_processing", label: "Document / Data Extraction & Analytics" },
          { value: "custom_rag", label: "Custom Knowledge Base Search (RAG)" },
        ],
      },
      {
        id: "existing_systems",
        label: "What existing tools or platforms need integration?",
        type: "text",
        placeholder: "e.g., WhatsApp, Supabase, CRM, Google Drive, Slack...",
        helpText: "List tools that the AI should interact with or pull data from.",
      },
    ],
  },

  // 6. Security & Account Recovery
  "security-recovery": {
    serviceSlug: "security-recovery",
    category: "Security & Defense",
    familyId: "SECURITY & RECOVERY",
    title: "Security & Account Recovery",
    pricingQuoteType: "request_estimate",
    securityNotice:
      "Important Notice: Snow assists verified account and system owners in securing, hardening, and recovering access to their legitimate business assets. Never send passwords, recovery codes, authentication tokens, or private keys through this form.",
    questions: [
      {
        id: "security_target",
        label: "What are you trying to secure or recover access to?",
        type: "select",
        required: true,
        options: [
          { value: "website_domain", label: "Website or Domain Name" },
          { value: "business_account", label: "Business Account (Email, Cloud, Social)" },
          { value: "device_workstation", label: "Device or Workstation Security" },
          { value: "business_network", label: "Business System or Server Infrastructure" },
          { value: "other", label: "Other Asset" },
        ],
      },
      {
        id: "ownership_confirmation",
        label: "Are you the legal owner or authorized representative of this asset?",
        type: "select",
        required: true,
        options: [
          { value: "yes_owner", label: "Yes, I am the legal owner / administrator" },
          { value: "authorized_rep", label: "Yes, authorized on behalf of my organization" },
        ],
      },
      {
        id: "incident_type",
        label: "What is the primary incident or requirement?",
        type: "select",
        options: [
          { value: "locked_out", label: "Account lockout or credential displacement" },
          { value: "compromise_hack", label: "Suspected account compromise or unauthorized access" },
          { value: "hardening_audit", label: "Preventative security audit & MFA setup" },
          { value: "phishing_remediation", label: "Phishing / Security breach cleanup" },
        ],
      },
    ],
  },

  // 7. Business IT & Infrastructure
  "business-it": {
    serviceSlug: "business-it",
    category: "Infrastructure & IT",
    familyId: "BUSINESS IT",
    title: "Business IT & Operations",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "organization_size",
        label: "How many active users or devices in your organization?",
        type: "select",
        required: true,
        options: [
          { value: "1_5", label: "1 to 5 users/devices" },
          { value: "6_20", label: "6 to 20 users/devices" },
          { value: "21_50", label: "21 to 50 users/devices" },
          { value: "50_plus", label: "50+ enterprise users" },
        ],
      },
      {
        id: "cloud_environment",
        label: "What is your primary workspace environment?",
        type: "select",
        options: [
          { value: "m365", label: "Microsoft 365 / Azure AD" },
          { value: "google_workspace", label: "Google Workspace" },
          { value: "hybrid_onprem", label: "Hybrid / On-Premise Server" },
          { value: "none_setting_up", label: "None / Need setup from scratch" },
        ],
      },
      {
        id: "support_type",
        label: "What type of support do you require?",
        type: "multiselect",
        options: [
          { value: "ongoing_helpdesk", label: "Ongoing IT Helpdesk Support" },
          { value: "wifi_network", label: "Office Network & Wi-Fi Setup" },
          { value: "device_procurement", label: "Device Procurement & Configuration" },
          { value: "data_backup", label: "Data Backup & Recovery Systems" },
        ],
      },
    ],
  },

  // 8. Infrastructure & Cloud
  "cloud-infrastructure": {
    serviceSlug: "cloud-infrastructure",
    category: "Cloud & Devops",
    familyId: "INFRASTRUCTURE",
    title: "Cloud Infrastructure & DevOps",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "infra_goal",
        label: "What is your primary infrastructure objective?",
        type: "select",
        required: true,
        options: [
          { value: "migration", label: "Cloud Migration / Hosting Setup" },
          { value: "scaling", label: "Performance Scaling & Optimization" },
          { value: "devops_cicd", label: "CI/CD Deployment Automation" },
          { value: "cost_optimization", label: "Cloud Cost Optimization" },
        ],
      },
      {
        id: "cloud_provider",
        label: "Target or current cloud provider?",
        type: "multiselect",
        options: [
          { value: "aws", label: "AWS (Amazon Web Services)" },
          { value: "gcp", label: "Google Cloud Platform" },
          { value: "azure", label: "Microsoft Azure" },
          { value: "supabase_vercel", label: "Supabase / Vercel / Netlify" },
          { value: "vps", label: "DigitalOcean / Linode VPS" },
        ],
      },
    ],
  },
};

export const DEFAULT_SERVICE_RULE: ServiceRulesConfig = {
  serviceSlug: "custom-technical-request",
  category: "Technical Advisory",
  familyId: "WEB",
  title: "Technical Advisory & Engineering Request",
  pricingQuoteType: "request_estimate",
  questions: [
    {
      id: "scope_summary",
      label: "What specific assistance or deliverables do you need?",
      type: "textarea",
      required: true,
      placeholder: "Provide any additional context or specific requirements...",
    },
  ],
};

/**
 * Deterministic problem description classifier.
 * Analyzes natural text to recommend category/service without claiming AI diagnosis.
 */
export function classifyProblemDescription(description: string): DiagnosticResult {
  const text = description.toLowerCase().trim();

  if (!text) {
    return {
      detectedFamilyId: "WEB",
      recommendedServiceSlug: "web-development",
      recommendedServiceName: "Web Engineering",
      explanation: "Let's gather details about your technical project so our engineering team can assist.",
      confidence: "low",
    };
  }

  // Website repair / troubleshooting patterns
  if (
    text.includes("white screen") ||
    text.includes("blank screen") ||
    text.includes("broken") ||
    text.includes("crash") ||
    text.includes("error 500") ||
    text.includes("down") ||
    text.includes("slow") ||
    text.includes("bug") ||
    text.includes("not working") ||
    text.includes("fix")
  ) {
    return {
      detectedFamilyId: "WEB",
      recommendedServiceSlug: "website-repair",
      recommendedServiceName: "Website Repair & Troubleshooting",
      explanation:
        "This sounds like a website troubleshooting or repair request. Let's gather a few key details so the team can investigate.",
      confidence: "high",
    };
  }

  // App development patterns
  if (
    text.includes("app") ||
    text.includes("mobile") ||
    text.includes("ios") ||
    text.includes("android") ||
    text.includes("flutter") ||
    text.includes("react native") ||
    text.includes("play store") ||
    text.includes("app store")
  ) {
    return {
      detectedFamilyId: "APPS & SOFTWARE",
      recommendedServiceSlug: "app-development",
      recommendedServiceName: "Application Development",
      explanation:
        "This sounds like a custom application or mobile software project. Let's define the scope and platform requirements.",
      confidence: "high",
    };
  }

  // E-commerce patterns
  if (
    text.includes("store") ||
    text.includes("shop") ||
    text.includes("ecommerce") ||
    text.includes("e-commerce") ||
    text.includes("payment") ||
    text.includes("checkout") ||
    text.includes("shopify") ||
    text.includes("cart")
  ) {
    return {
      detectedFamilyId: "WEB",
      recommendedServiceSlug: "e-commerce",
      recommendedServiceName: "E-Commerce Engineering",
      explanation:
        "This sounds like an e-commerce or online payments project. Let's outline your store requirements.",
      confidence: "high",
    };
  }

  // AI & Automation patterns
  if (
    text.includes("ai") ||
    text.includes("chatbot") ||
    text.includes("automation") ||
    text.includes("agent") ||
    text.includes("gpt") ||
    text.includes("llm") ||
    text.includes("bot")
  ) {
    return {
      detectedFamilyId: "AI",
      recommendedServiceSlug: "ai-automation",
      recommendedServiceName: "AI Integration & Automation",
      explanation:
        "This sounds like an AI integration or workflow automation initiative. Let's clarify the target automation workflow.",
      confidence: "high",
    };
  }

  // Security & Account recovery patterns
  if (
    text.includes("secure") ||
    text.includes("security") ||
    text.includes("hack") ||
    text.includes("compromise") ||
    text.includes("recover") ||
    text.includes("locked out") ||
    text.includes("password") ||
    text.includes("mfa") ||
    text.includes("account")
  ) {
    return {
      detectedFamilyId: "SECURITY & RECOVERY",
      recommendedServiceSlug: "security-recovery",
      recommendedServiceName: "Security & Account Recovery",
      explanation:
        "This relates to security or account access recovery. Let's gather non-sensitive incident context so our security team can advise.",
      confidence: "high",
    };
  }

  // Business IT patterns
  if (
    text.includes("office") ||
    text.includes("wifi") ||
    text.includes("network") ||
    text.includes("microsoft 365") ||
    text.includes("google workspace") ||
    text.includes("helpdesk") ||
    text.includes("support") ||
    text.includes("laptop") ||
    text.includes("device")
  ) {
    return {
      detectedFamilyId: "BUSINESS IT",
      recommendedServiceSlug: "business-it",
      recommendedServiceName: "Business IT & Operations",
      explanation:
        "This looks like an IT operations or infrastructure support request. Let's capture your organizational setup.",
      confidence: "medium",
    };
  }

  // Cloud / Infrastructure patterns
  if (
    text.includes("cloud") ||
    text.includes("server") ||
    text.includes("aws") ||
    text.includes("vps") ||
    text.includes("hosting") ||
    text.includes("docker") ||
    text.includes("ci/cd") ||
    text.includes("deployment")
  ) {
    return {
      detectedFamilyId: "INFRASTRUCTURE",
      recommendedServiceSlug: "cloud-infrastructure",
      recommendedServiceName: "Cloud Infrastructure & DevOps",
      explanation:
        "This sounds like a cloud infrastructure or server deployment project. Let's review your environment requirements.",
      confidence: "medium",
    };
  }

  // Default web site engineering
  return {
    detectedFamilyId: "WEB",
    recommendedServiceSlug: "web-development",
    recommendedServiceName: "Web Engineering & Design",
    explanation:
      "This request will be categorized under Web Engineering. Let's gather a few details to specify the project scope.",
    confidence: "medium",
  };
}

/**
 * Pricing rule lookup architecture.
 * Strictly configured with NO invented pricing.
 */
export function getPricingRule(serviceSlug: string): PricingRule {
  return {
    id: `rule-${serviceSlug}`,
    serviceSlug,
    currency: "NGN",
    isInstantQuoteAvailable: false,
    notes: "Requires scope estimation by Snow engineering team.",
  };
}
