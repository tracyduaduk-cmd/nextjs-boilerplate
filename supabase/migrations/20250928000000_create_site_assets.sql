-- Migration: Create public.site_assets table for central visual population management
CREATE TABLE IF NOT EXISTS public.site_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_key TEXT NOT NULL,
    slot_key TEXT NOT NULL,
    title TEXT NOT NULL,
    asset_type TEXT NOT NULL CHECK (asset_type IN ('3d_spatial', 'technical_diagram', 'ui_composition', 'screenshot', 'svg_vector')),
    storage_path TEXT,
    public_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    source_url TEXT,
    license TEXT DEFAULT 'Proprietary / Snow Design System',
    creator TEXT DEFAULT 'Snow Systems',
    sort_order INT DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by page and slot
CREATE INDEX IF NOT EXISTS idx_site_assets_page_slot ON public.site_assets(page_key, slot_key);

-- Seed initial records for visual population
INSERT INTO public.site_assets (page_key, slot_key, title, asset_type, public_url, alt_text, metadata)
VALUES
  ('tools_hub', 'hero_spatial_core', 'Snow Spatial Core Instrument', '3d_spatial', 'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/spatial-core.webp', '3D Spatial Core Instrument Visualization', '{"accent": "#38bdf8"}'::jsonb),
  ('tools_json', 'visual_stage', 'JSON Data Transformation Pipeline', 'technical_diagram', 'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/json-pipeline.webp', 'Raw JSON to Formatted Validated Structure Flow', '{"format": "json"}'::jsonb),
  ('tools_regex', 'visual_stage', 'Regex Pattern Matching Pipeline', 'technical_diagram', 'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/regex-pipeline.webp', 'Regex Pattern to Matched Text and Capture Groups', '{"format": "regex"}'::jsonb),
  ('tools_qr', 'visual_stage', 'QR Code Encoding Matrix', 'ui_composition', 'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/qr-matrix.webp', 'Payload to Scannable QR Matrix Flow', '{"format": "qr"}'::jsonb),
  ('network_dns', 'visual_stage', 'DNS DoH Resolution Flow', 'technical_diagram', 'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/dns-pipeline.webp', 'Domain to DNS Query and DoH Record Resolution', '{"protocol": "doh"}'::jsonb),
  ('telecom_hub', 'hero_pipeline', 'NCC Telecom Harmonization System', 'technical_diagram', 'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/telecom-pipeline.webp', 'Mobile Network to USSD/SMS and NCC Harmonized Reference', '{"region": "NG"}'::jsonb)
ON CONFLICT (id) DO NOTHING;
