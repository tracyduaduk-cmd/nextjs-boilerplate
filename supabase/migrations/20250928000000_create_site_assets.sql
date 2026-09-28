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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT site_assets_page_slot_key UNIQUE (page_key, slot_key)
);

-- Index for fast lookup by page and slot
CREATE INDEX IF NOT EXISTS idx_site_assets_page_slot ON public.site_assets(page_key, slot_key);

-- Enable RLS
ALTER TABLE public.site_assets ENABLE ROW LEVEL SECURITY;

-- Drop policy if exists to allow clean re-application
DROP POLICY IF EXISTS "Allow public select for site_assets" ON public.site_assets;

-- Allow public read access (SELECT only)
CREATE POLICY "Allow public select for site_assets" ON public.site_assets
    FOR SELECT TO public USING (true);

-- Seed/Upsert the six known canonical site asset records deterministically
INSERT INTO public.site_assets (
    page_key,
    slot_key,
    title,
    asset_type,
    storage_path,
    public_url,
    alt_text,
    license,
    creator,
    sort_order,
    metadata
) VALUES
(
    'tools_hub',
    'hero_spatial_core',
    'Snow Spatial Core Instrument',
    '3d_spatial',
    'tools/spatial-core.webp',
    'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/tools/spatial-core.webp',
    '3D Spatial Core Technical Visual Stage for Snow Developer Utilities',
    'Proprietary / Snow Design System',
    'Snow Systems',
    0,
    '{"theme": "cyan", "format": "spatial"}'::jsonb
),
(
    'tools_json',
    'visual_stage',
    'JSON Data Transformation Pipeline',
    'technical_diagram',
    'tools/json-pipeline.webp',
    'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/tools/json-pipeline.webp',
    'Raw JSON to Formatted Validated Structure Flow Visual',
    'Proprietary / Snow Design System',
    'Snow Systems',
    0,
    '{"pipeline": "json-format-validate"}'::jsonb
),
(
    'tools_regex',
    'visual_stage',
    'Regex Pattern Matching Pipeline',
    'technical_diagram',
    'tools/regex-pipeline.webp',
    'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/tools/regex-pipeline.webp',
    'Regex Pattern to Matched Text and Capture Groups Diagram',
    'Proprietary / Snow Design System',
    'Snow Systems',
    0,
    '{"pipeline": "regex-engine"}'::jsonb
),
(
    'tools_qr',
    'visual_stage',
    'QR Code Encoding Matrix',
    'ui_composition',
    'tools/qr-matrix.webp',
    'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/tools/qr-matrix.webp',
    'Payload to Scannable QR Matrix Flow Composition',
    'Proprietary / Snow Design System',
    'Snow Systems',
    0,
    '{"pipeline": "qr-matrix"}'::jsonb
),
(
    'network_dns',
    'visual_stage',
    'DNS DoH Resolution Flow',
    'technical_diagram',
    'network/dns-pipeline.webp',
    'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/network/dns-pipeline.webp',
    'Domain to DNS Query and DoH Record Resolution Architecture',
    'Proprietary / Snow Design System',
    'Snow Systems',
    0,
    '{"protocol": "dns-doh"}'::jsonb
),
(
    'telecom_hub',
    'hero_pipeline',
    'NCC Telecom Harmonization System',
    'technical_diagram',
    'telecom/telecom-pipeline.webp',
    'https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/telecom/telecom-pipeline.webp',
    'Mobile Network to USSD SMS and NCC Harmonized Reference Architecture',
    'Proprietary / Snow Design System',
    'Snow Systems',
    0,
    '{"region": "NG"}'::jsonb
)
ON CONFLICT (page_key, slot_key) DO UPDATE SET
    title = EXCLUDED.title,
    asset_type = EXCLUDED.asset_type,
    storage_path = EXCLUDED.storage_path,
    public_url = EXCLUDED.public_url,
    alt_text = EXCLUDED.alt_text,
    license = EXCLUDED.license,
    creator = EXCLUDED.creator,
    sort_order = EXCLUDED.sort_order,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();
