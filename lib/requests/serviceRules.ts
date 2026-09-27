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

  // 9. Snow Care Platform
  "snow-care": {
    serviceSlug: "snow-care",
    category: "Technical Maintenance & Care",
    familyId: "WEB",
    title: "Snow Care Technical Service",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "care_category",
        label: "Which Care category best describes your requirement?",
        type: "select",
        required: true,
        options: [
          { value: "website-care", label: "Website Care", description: "Updates, bug fixes, content & maintenance" },
          { value: "app-care", label: "App Care", description: "Mobile/web application fixes & release support" },
          { value: "security-care", label: "Security Care", description: "Security review, access hardening & recovery" },
          { value: "performance-care", label: "Performance Care", description: "Speed audit, Core Web Vitals & database tuning" },
          { value: "infrastructure-care", label: "Infrastructure Care", description: "Deployments, hosting, databases & DNS" },
          { value: "ongoing-development", label: "Ongoing Development", description: "Continuous feature sprints & iteration" },
        ],
      },
      {
        id: "target_url",
        label: "What is the URL or address of the website or application?",
        type: "url",
        placeholder: "https://yourcompany.com",
        helpText: "Provides immediate context for our engineering team.",
      },
      {
        id: "operational_status",
        label: "What is the current operational status of your system?",
        type: "select",
        required: true,
        options: [
          { value: "down", label: "System Down / Active Incident", description: "Critical outage requiring immediate triage" },
          { value: "degraded", label: "Degraded Performance or Errors", description: "System functional but features failing or slow" },
          { value: "stable", label: "Stable, Requesting Preventative Care", description: "Routine maintenance and updates" },
          { value: "evolution", label: "Seeking Feature Iteration", description: "Continuous improvements and roadmap execution" },
        ],
      },
      {
        id: "care_objectives",
        label: "What are your primary care objectives?",
        type: "multiselect",
        options: [
          { value: "bug_investigation", label: "Bug Triage & Code Fixes" },
          { value: "performance_tuning", label: "Loading Speed & Web Vitals Optimization" },
          { value: "security_hardening", label: "Security Audit & Vulnerability Patching" },
          { value: "dependency_maintenance", label: "Framework & Dependency Upgrades" },
          { value: "hosting_deployment", label: "Hosting, Database & CI/CD Support" },
          { value: "feature_sprints", label: "Continuous Feature Development" },
        ],
      },
    ],
  },
  "website-care": {
    serviceSlug: "website-care",
    category: "Web Infrastructure",
    familyId: "WEB",
    title: "Website Care & Maintenance",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "site_url",
        label: "What is your website URL?",
        type: "url",
        required: true,
        placeholder: "https://yourcompany.com",
      },
      {
        id: "cms_platform",
        label: "What CMS or tech stack is your website built on?",
        type: "select",
        options: [
          { value: "nextjs_react", label: "Next.js / React / Headless" },
          { value: "wordpress", label: "WordPress / Elementor / WooCommerce" },
          { value: "shopify", label: "Shopify / Custom E-Commerce" },
          { value: "custom_html", label: "Custom HTML / CSS / JavaScript" },
          { value: "unknown", label: "Unsure / Need Tech Stack Audit" },
        ],
      },
      {
        id: "website_care_needs",
        label: "What specific care does your site require?",
        type: "multiselect",
        options: [
          { value: "updates", label: "CMS & Plugin Software Updates" },
          { value: "bug_fixes", label: "Fix Broken Layouts & Scripts" },
          { value: "content", label: "Content Publishing & Page Updates" },
          { value: "speed", label: "Performance & Loading Speed Remediation" },
          { value: "backups", label: "Off-site Backup Strategy Setup" },
        ],
      },
    ],
  },
  "app-care": {
    serviceSlug: "app-care",
    category: "Full-Stack Software",
    familyId: "APPS & SOFTWARE",
    title: "App Care & Software Support",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "app_platform",
        label: "What platform is your application target?",
        type: "select",
        required: true,
        options: [
          { value: "web_app", label: "Web Application / SaaS Portal" },
          { value: "mobile_ios_android", label: "Mobile App (iOS & Android)" },
          { value: "cross_platform", label: "Full-Stack Web & Mobile" },
          { value: "backend_api", label: "Backend API & Database" },
        ],
      },
      {
        id: "app_care_needs",
        label: "What app care deliverables do you need?",
        type: "multiselect",
        options: [
          { value: "bug_triage", label: "Application Bug Investigation" },
          { value: "dependency_updates", label: "Runtime & Dependency Upgrades" },
          { value: "feature_patches", label: "Minor Feature Enhancements" },
          { value: "release_support", label: "App Store & Web Publishing Support" },
          { value: "database_tuning", label: "Database Query Tuning" },
        ],
      },
    ],
  },
  "security-care": {
    serviceSlug: "security-care",
    category: "Security & Defense",
    familyId: "SECURITY & RECOVERY",
    title: "Security Care & Hardening",
    pricingQuoteType: "request_estimate",
    securityNotice: "Snow Security Care operates within strictly safe, defensive boundaries. Never share passwords or private API tokens in this intake form.",
    questions: [
      {
        id: "target_system",
        label: "What asset requires security care?",
        type: "select",
        required: true,
        options: [
          { value: "website_security", label: "Public Website / Web Server" },
          { value: "app_auth", label: "Web / Mobile App Authentication" },
          { value: "account_recovery", label: "Platform Account Access Recovery" },
          { value: "infrastructure_hardening", label: "Cloud Server & Domain Security" },
        ],
      },
      {
        id: "security_care_needs",
        label: "Primary security objectives?",
        type: "multiselect",
        options: [
          { value: "security_audit", label: "Defensive Security Posture Audit" },
          { value: "auth_triage", label: "MFA & Authentication Triage" },
          { value: "dependency_patch", label: "Vulnerability & Dependency Patching" },
          { value: "headers_ssl", label: "Security Header & SSL Enforcement" },
          { value: "malware_cleanup", label: "Malware Triage & Site Cleanup" },
        ],
      },
    ],
  },
  "performance-care": {
    serviceSlug: "performance-care",
    category: "Speed & Optimization",
    familyId: "WEB",
    title: "Performance Care & Speed Optimization",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "perf_url",
        label: "What is the URL to optimize?",
        type: "url",
        required: true,
        placeholder: "https://yourcompany.com",
      },
      {
        id: "performance_issues",
        label: "What performance symptoms are you observing?",
        type: "multiselect",
        options: [
          { value: "slow_lcp", label: "Slow Initial Paint (LCP)" },
          { value: "layout_shifts", label: "Layout Shifts & Jumping Content (CLS)" },
          { value: "heavy_assets", label: "Uncompressed Images & Large Asset Bundles" },
          { value: "render_blocking", label: "Render-Blocking JavaScript & Styles" },
          { value: "database_latency", label: "Slow Database / API Response Times" },
        ],
      },
    ],
  },
  "infrastructure-care": {
    serviceSlug: "infrastructure-care",
    category: "Cloud & DevOps",
    familyId: "INFRASTRUCTURE",
    title: "Infrastructure & Deployment Care",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "hosting_environment",
        label: "Where is your infrastructure currently hosted?",
        type: "select",
        options: [
          { value: "vercel_netlify", label: "Vercel / Netlify / Supabase" },
          { value: "aws_gcp_azure", label: "AWS / Google Cloud / Azure" },
          { value: "vps_digitalocean", label: "DigitalOcean / Linode VPS" },
          { value: "cpanel_shared", label: "cPanel / Shared Hosting" },
          { value: "unsure", label: "Unsure / Need Audit" },
        ],
      },
      {
        id: "infra_care_needs",
        label: "What infrastructure deliverables are required?",
        type: "multiselect",
        options: [
          { value: "deploy_fixes", label: "Fix Broken Build or Deployment Pipeline" },
          { value: "database_backup", label: "Database Backup & Storage Config" },
          { value: "dns_ssl", label: "DNS, Domain & SSL Management" },
          { value: "monitoring_alerts", label: "Technical Monitoring & Alert Setup" },
          { value: "server_migration", label: "Server Migration & Setup" },
        ],
      },
    ],
  },
  "ongoing-development": {
    serviceSlug: "ongoing-development",
    category: "Product Engineering",
    familyId: "WEB",
    title: "Ongoing Feature Development",
    pricingQuoteType: "request_estimate",
    questions: [
      {
        id: "dev_sprint_scope",
        label: "What is your primary development goal?",
        type: "select",
        required: true,
        options: [
          { value: "feature_sprints", label: "Regular Feature Development Sprints" },
          { value: "ui_modernization", label: "UI / UX Modernization" },
          { value: "tech_debt", label: "Technical Debt Cleanup & Code Refactoring" },
          { value: "dedicated_retainer", label: "Dedicated Engineering Support Hours" },
        ],
      },
      {
        id: "primary_tech_stack",
        label: "What primary tech stack do you use?",
        type: "text",
        placeholder: "e.g., Next.js, React, Node.js, Python, PostgreSQL...",
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

  // Snow Care patterns
  if (
    text.includes("care") ||
    text.includes("maintenance") ||
    text.includes("maintain") ||
    text.includes("ongoing") ||
    text.includes("patch") ||
    text.includes("snow care")
  ) {
    return {
      detectedFamilyId: "WEB",
      recommendedServiceSlug: "snow-care",
      recommendedServiceName: "Snow Care Technical Service",
      explanation:
        "This sounds like an ongoing maintenance or care service request. Let's gather a few details so our technical team can assist.",
      confidence: "high",
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
