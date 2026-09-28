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

// Fallback registry for static or initial server render
const STATIC_FALLBACK_ASSETS: Record<string, Partial<SiteAssetRecord>> = {
  "tools_hub:hero_spatial_core": {
    page_key: "tools_hub",
    slot_key: "hero_spatial_core",
    title: "Snow Spatial Core Instrument",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/tools/spatial-core.webp",
    alt_text: "3D Spatial Core Technical Visual Stage for Snow Developer Utilities",
    asset_type: "3d_spatial",
  },
  "tools_json:visual_stage": {
    page_key: "tools_json",
    slot_key: "visual_stage",
    title: "JSON Data Transformation Pipeline",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/tools/json-pipeline.webp",
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
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/tools/qr-matrix.webp",
    alt_text: "Payload to Scannable QR Matrix Flow Composition",
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
  "telecom_hub:hero_pipeline": {
    page_key: "telecom_hub",
    slot_key: "hero_pipeline",
    title: "NCC Telecom Harmonization System",
    public_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/telecom/telecom-pipeline.webp",
    alt_text: "Mobile Network to USSD SMS and NCC Harmonized Reference Architecture",
    asset_type: "technical_diagram",
  },
};

export async function fetchSiteAsset(pageKey: string, slotKey: string): Promise<SiteAssetRecord | null> {
  try {
    const { data, error } = await supabase
      .from("site_assets")
      .select("*")
      .eq("page_key", pageKey)
      .eq("slot_key", slotKey)
      .single();

    if (error || !data) {
      const staticFallback = STATIC_FALLBACK_ASSETS[`${pageKey}:${slotKey}`];
      if (staticFallback) {
        return staticFallback as SiteAssetRecord;
      }
      return null;
    }

    return data as SiteAssetRecord;
  } catch (err) {
    console.warn(`Failed to fetch site asset for ${pageKey}:${slotKey}`, err);
    const staticFallback = STATIC_FALLBACK_ASSETS[`${pageKey}:${slotKey}`];
    return (staticFallback as SiteAssetRecord) || null;
  }
}
