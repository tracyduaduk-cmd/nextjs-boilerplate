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

-- Allow public read access
CREATE POLICY "Allow public select for site_assets" ON public.site_assets
    FOR SELECT TO public USING (true);
