import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_REF = "jwetpisuobxyypgofvsd";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || `https://${SUPABASE_PROJECT_REF}.supabase.co`;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZXRwaXN1b2J4eXlwZ29mdnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNTU5ODYsImV4cCI6MjEwNTczMTk4Nn0.Tk51IJg7Kufg4P9EvtK5f39ywa2E7wswgrzoEwlUQGE";

export const supabase = createClient(SUPABASE_URL, ANON_KEY);

export interface SiteAssetRecord {
  id: string;
  page_key: string;
  slot_key: string;
  title: string;
  asset_type: "3d_spatial" | "technical_diagram" | "ui_composition" | "screenshot" | "svg_vector";
  storage_path: string | null;
  public_url: string;
  alt_text: string;
  source_url: string | null;
  license: string;
  creator: string;
  sort_order: number;
  metadata: Record<string, unknown>;
}

// Comprehensive registry mapping verified Supabase Storage assets (General & snow-media buckets)
const STATIC_FALLBACK_ASSETS: Record<string, Partial<SiteAssetRecord>> = {
  // Tools Hub & Concierge
  "tools_hub:hero_spatial_core": {
    page_key: "tools_hub",
    slot_key: "hero_spatial_core",
    title: "Snow Spatial Core Instrument",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/tools/spatial-core.webp",
    alt_text: "3D Spatial Core Technical Visual Stage for Snow Developer Utilities",
    asset_type: "3d_spatial",
  },
  "tools_hub:ai_concierge": {
    page_key: "tools_hub",
    slot_key: "ai_concierge",
    title: "Snow AI Concierge Intent Engine",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-ai-concierge.png",
    alt_text: "Snow Intelligent Concierge Intent Matching Interface Visual",
    asset_type: "ui_composition",
  },

  // Individual Tools
  "tools_json:visual_stage": {
    page_key: "tools_json",
    slot_key: "visual_stage",
    title: "JSON Data Transformation Pipeline",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-code.png",
    alt_text: "Raw JSON to Formatted Validated Structure Flow Visual",
    asset_type: "technical_diagram",
  },
  "tools_regex:visual_stage": {
    page_key: "tools_regex",
    slot_key: "visual_stage",
    title: "Regex Pattern Matching Pipeline",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/tools/regex-pipeline.webp",
    alt_text: "Regex Pattern to Matched Text and Capture Groups Diagram",
    asset_type: "technical_diagram",
  },
  "tools_qr:visual_stage": {
    page_key: "tools_qr",
    slot_key: "visual_stage",
    title: "QR Code Encoding Matrix",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-design-tools.png",
    alt_text: "Payload to Scannable QR Matrix Flow Composition",
    asset_type: "ui_composition",
  },
  "tools_hash:visual_stage": {
    page_key: "tools_hash",
    slot_key: "visual_stage",
    title: "Web Crypto Hash Calculator",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-code.png",
    alt_text: "Cryptographic SHA-256 Hash Verification Stage",
    asset_type: "technical_diagram",
  },
  "tools_uuid:visual_stage": {
    page_key: "tools_uuid",
    slot_key: "visual_stage",
    title: "UUID CSPRNG Generator",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-code.png",
    alt_text: "CSPRNG Unique Identifiers Visual Stage",
    asset_type: "technical_diagram",
  },
  "tools_markdown:visual_stage": {
    page_key: "tools_markdown",
    slot_key: "visual_stage",
    title: "Markdown Live Engine",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-code.png",
    alt_text: "Markdown to HTML Live Render Pipeline",
    asset_type: "technical_diagram",
  },
  "tools_color:visual_stage": {
    page_key: "tools_color",
    slot_key: "visual_stage",
    title: "Color Matrix & WCAG Inspector",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-design-tools.png",
    alt_text: "WCAG Accessibility and Color Matrix Composition",
    asset_type: "ui_composition",
  },
  "tools_encode:visual_stage": {
    page_key: "tools_encode",
    slot_key: "visual_stage",
    title: "Base64 & String Encoder",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-code.png",
    alt_text: "UTF-8 to Base64 String Encoding Flow Visual",
    asset_type: "technical_diagram",
  },

  // Website Lab
  "website_lab:hero_website": {
    page_key: "website_lab",
    slot_key: "hero_website",
    title: "Cloudflare Edge Website Engine",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-web-dev-responsive.png",
    alt_text: "Responsive Web Development & Cloudflare Edge Browser Visual",
    asset_type: "ui_composition",
  },
  "website_screenshot:visual_stage": {
    page_key: "website_screenshot",
    slot_key: "visual_stage",
    title: "Website Full-Page Screenshot Capture",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-web-dev-responsive.png",
    alt_text: "Multi-viewport full page WebP screenshot engine",
    asset_type: "screenshot",
  },
  "website_pdf:visual_stage": {
    page_key: "website_pdf",
    slot_key: "visual_stage",
    title: "Website PDF Converter",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-web-dev-responsive.png",
    alt_text: "Web Document to Print PDF Converter",
    asset_type: "technical_diagram",
  },
  "website_inspect:visual_stage": {
    page_key: "website_inspect",
    slot_key: "visual_stage",
    title: "Website DOM & Security Header Inspector",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-website-builder.png",
    alt_text: "Security Response Headers and Meta Tags Audit Engine",
    asset_type: "technical_diagram",
  },

  // Network Suite
  "network_hub:hero_network": {
    page_key: "network_hub",
    slot_key: "hero_network",
    title: "Snow Network Diagnostics Suite",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-network-diagnostics.png",
    alt_text: "Network Diagnostics and Infrastructure Monitoring Interface",
    asset_type: "ui_composition",
  },
  "network_dns:visual_stage": {
    page_key: "network_dns",
    slot_key: "visual_stage",
    title: "DNS DoH Resolution Flow",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/network/dns-pipeline.webp",
    alt_text: "Domain to DNS Query and DoH Record Resolution Architecture",
    asset_type: "technical_diagram",
  },
  "network_ip:visual_stage": {
    page_key: "network_ip",
    slot_key: "visual_stage",
    title: "Public IP & BGP Route Inspector",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-network-diagnostics.png",
    alt_text: "Public IP Address and ASN Routing Architecture",
    asset_type: "technical_diagram",
  },
  "network_device:visual_stage": {
    page_key: "network_device",
    slot_key: "visual_stage",
    title: "Hardware & GPU Browser Inspector",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-mobile-app.png",
    alt_text: "Client Hardware, Cores, and WebGL Context Diagnostics",
    asset_type: "ui_composition",
  },
  "network_speed:visual_stage": {
    page_key: "network_speed",
    slot_key: "visual_stage",
    title: "Latency & Throughput Speed Diagnostic",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-network-diagnostics.png",
    alt_text: "Round-trip Latency and Download Speed Monitor",
    asset_type: "technical_diagram",
  },
  "network_find:visual_stage": {
    page_key: "network_find",
    slot_key: "visual_stage",
    title: "Spatial Location & Device Recovery",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-mobile-app.png",
    alt_text: "GPS Geolocation and Spatial Location Engine Interface",
    asset_type: "ui_composition",
  },

  // Telecom Hub
  "telecom_hub:hero_pipeline": {
    page_key: "telecom_hub",
    slot_key: "hero_pipeline",
    title: "NCC Telecom Harmonization System",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-tech-monitor.png",
    alt_text: "Mobile Network to USSD SMS and NCC Harmonized Reference Architecture",
    asset_type: "technical_diagram",
  },

  // Care Suite
  "care_hub:hero_care": {
    page_key: "care_hub",
    slot_key: "hero_care",
    title: "Snow Continuous Technical Care Studio",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-digital-design.png",
    alt_text: "Continuous Engineering Operations and System Maintenance Visual",
    asset_type: "ui_composition",
  },

  // Work / Portfolio
  "work_hub:hero_work": {
    page_key: "work_hub",
    slot_key: "hero_work",
    title: "Snow Software & Web Engineering Portfolio",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/snow-developer.png",
    alt_text: "Full-Stack Web Development and Custom Software Showcase",
    asset_type: "ui_composition",
  },

  // Request Service Flow
  "request_hub:hero_request": {
    page_key: "request_hub",
    slot_key: "hero_request",
    title: "Structured Technical Request Flow",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/General/website-development-process-full-guide-1-fb.jpg",
    alt_text: "Snow Engineering Intake and Project Architecture Process",
    asset_type: "technical_diagram",
  },
};

export async function fetchSiteAsset(pageKey: string, slotKey: string): Promise<SiteAssetRecord | null> {
  const fallbackKey = `${pageKey}:${slotKey}`;
  const staticFallback = STATIC_FALLBACK_ASSETS[fallbackKey];

  try {
    const { data, error } = await supabase
      .from("site_assets")
      .select("*")
      .eq("page_key", pageKey)
      .eq("slot_key", slotKey)
      .single();

    if (!error && data) {
      return data as SiteAssetRecord;
    }
  } catch (err) {
    console.warn(`Failed to query site_assets for ${fallbackKey}, using static fallback`, err);
  }

  if (staticFallback) {
    return {
      id: fallbackKey,
      page_key: pageKey,
      slot_key: slotKey,
      title: staticFallback.title || "Snow Technical Asset",
      asset_type: staticFallback.asset_type || "ui_composition",
      storage_path: null,
      public_url: staticFallback.public_url!,
      alt_text: staticFallback.alt_text || "Snow Visual Asset",
      source_url: null,
      license: "Proprietary",
      creator: "Snow Technology Studio",
      sort_order: 1,
      metadata: {},
    };
  }

  return null;
}
