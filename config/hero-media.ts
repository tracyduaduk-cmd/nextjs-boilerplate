/**
 * Hero Visual & Interactive Layer Architecture Configuration
 *
 * Designed as a modular configuration layer for Snow Hero experience.
 * Future phases can bind this directly to Supabase table queries or CMS hooks without modifying spatial interaction logic.
 */

export interface SystemMetric {
  id: string;
  label: string;
  value: string;
  status: "active" | "optimal" | "ready" | "synced";
  codeSnippet: string;
  badge: string;
  accentColor: string; // Tailwind color class or hex
  description: string;
}

export interface InteractiveModeConfig {
  id: "telemetry" | "ai" | "architecture";
  title: string;
  tagline: string;
  metrics: SystemMetric[];
}

export interface HeroMediaConfig {
  eyebrow: {
    statusBadge: string;
    brandName: string;
    roleTag: string;
  };
  headline: string;
  subheadline: string;
  cta: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
  capabilities: string[];
  consoleModes: InteractiveModeConfig[];
}

export const heroMediaConfig: HeroMediaConfig = {
  eyebrow: {
    statusBadge: "SYSTEM ACTIVE",
    brandName: "SNOW",
    roleTag: "Spatial Technology Studio",
  },
  headline: "Engineering High-Performance Digital Products & AI Systems.",
  subheadline:
    "Snow crafts scalable web applications, custom LLM workflows, and resilient digital architectures. Pure technical execution with spatial depth.",
  cta: {
    primary: { text: "Start a Project", href: "#contact" },
    secondary: { text: "Explore Systems", href: "#services" },
  },
  capabilities: [
    "Full-Stack Web Engineering",
    "Autonomous AI Workflows",
    "API & Cloud Infrastructure",
    "Performance Optimization",
  ],
  consoleModes: [
    {
      id: "telemetry",
      title: "Core Infrastructure Telemetry",
      tagline: "High-throughput web applications with sub-100ms standard TTFB.",
      metrics: [
        {
          id: "m1",
          label: "Full-Stack Web Architecture",
          value: "Next.js 16 • React 19 • Supabase",
          status: "optimal",
          codeSnippet: "GET /api/v1/system/health -> 200 OK (14ms)",
          badge: "OPT-100%",
          accentColor: "sky",
          description: "Edge-rendered web applications built for reliability and real-time response.",
        },
        {
          id: "m2",
          label: "Database & Vector Indexing",
          value: "PostgreSQL • PgVector • RLS Policies",
          status: "active",
          codeSnippet: "SELECT * FROM vectors WHERE distance < 0.12 LIMIT 10",
          badge: "CONNECTED",
          accentColor: "indigo",
          description: "Strict tenant isolation with low-latency similarity vector searches.",
        },
        {
          id: "m3",
          label: "Edge Network Distribution",
          value: "Global CDNs • Micro-Caching",
          status: "synced",
          codeSnippet: "CACHE: HIT (Edge-Region: eu-west-1)",
          badge: "ACTIVE",
          accentColor: "emerald",
          description: "Distributed static assets and dynamic functions deployed worldwide.",
        },
      ],
    },
    {
      id: "ai",
      title: "Autonomous AI Execution Engine",
      tagline: "Custom agent pipelines, structured outputs, and LLM automation.",
      metrics: [
        {
          id: "a1",
          label: "Custom Agent Orchestration",
          value: "Multi-Agent Systems • Tool Use",
          status: "active",
          codeSnippet: "agent.executeTask({ model: 'gpt-4o', tools: ['search', 'sql'] })",
          badge: "PIPELINE ACTIVE",
          accentColor: "indigo",
          description: "Task parsing, tool execution, and self-correcting validation loops.",
        },
        {
          id: "a2",
          label: "Structured Knowledge Ingestion",
          value: "Document Parsing • Semantic Chunking",
          status: "optimal",
          codeSnippet: "ingest(documentStream).then(embedAndStore)",
          badge: "PROCESSED",
          accentColor: "sky",
          description: "Converting unstructured business data into actionable vector indices.",
        },
        {
          id: "a3",
          label: "System Automation & Guardrails",
          value: "Type-Safe Outputs • Schema Verification",
          status: "ready",
          codeSnippet: "validateZodSchema(output, BusinessPayloadSchema)",
          badge: "VERIFIED",
          accentColor: "emerald",
          description: "Guaranteed JSON schema output compliance for enterprise software.",
        },
      ],
    },
    {
      id: "architecture",
      title: "Technical Audits & Optimization",
      tagline: "Solving complex software friction and security vulnerabilities.",
      metrics: [
        {
          id: "c1",
          label: "Performance Diagnostics",
          value: "Core Web Vitals • Bundle Minimization",
          status: "optimal",
          codeSnippet: "LCP: 0.6s | CLS: 0.00 | INP: 28ms",
          badge: "GRADE A+",
          accentColor: "emerald",
          description: "Continuous monitoring, code splitting, and asset compression.",
        },
        {
          id: "c2",
          label: "Security & RLS Hardening",
          value: "JWT Verification • Role Policies",
          status: "active",
          codeSnippet: "CREATE POLICY \"Tenant Isolation\" ON data FOR ALL USING...",
          badge: "ENFORCED",
          accentColor: "sky",
          description: "Multi-layered security enforcement across edge endpoints and Postgres databases.",
        },
        {
          id: "c3",
          label: "API Gateway Integration",
          value: "REST • GraphQL • WebSockets",
          status: "synced",
          codeSnippet: "ws.subscribe('events:realtime', handlePayload)",
          badge: "ESTABLISHED",
          accentColor: "indigo",
          description: "High-concurrency streaming channels for immediate client updates.",
        },
      ],
    },
  ],
};
