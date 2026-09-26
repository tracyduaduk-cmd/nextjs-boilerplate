# Snow portfolio media ingestion

The Work experience consumes media from the existing Supabase `projects` and `project_media` tables. No second media table or component-level image collection is used.

## Stable asset contract

- Bucket: `snow-media`
- Storage prefix: `projects/<project-slug>/`
- Files per project: `hero.webp`, `desktop.webp`, `mobile.webp`
- Total target: 8 projects x 3 files = 24 WebP assets
- Public URL shape: `https://<supabase-project-ref>.supabase.co/storage/v1/object/public/snow-media/projects/<project-slug>/<filename>`
- Database rows: each uploaded asset must have a matching `project_media` row with the owning project's `project_id`, the public URL, an appropriate `media_type`, `title`, `alt_text`, `provider`, and `sort_order`.

The canonical slug and path list lives in `lib/projects/mediaManifest.ts`. `PORTFOLIO_ASSET_SOURCES` is the reusable curation manifest. It intentionally starts with null source metadata: populate `sourceUrl`, `provider`, `attribution`, and `licenseNote` only after each temporary asset has been reviewed and licensed. Do not add unreviewed hotlinks.

## Asset preparation

1. Curate or create one licensed image for each manifest entry.
2. Convert and optimize each image to WebP while preserving the intended aspect ratio.
3. Place files under `public/assets/portfolio/<project-slug>/<filename>`.
4. Update the corresponding source metadata in `PORTFOLIO_ASSET_SOURCES`:
   - `sourceUrl`: original source page or asset URL
   - `provider`: photographer, library, or generation source
   - `attribution`: required credit text, or `null` when not required
   - `licenseNote`: license name and relevant usage note
5. Validate the local set without credentials:

```bash
npm run media:upload -- --dry-run
```

6. For the actual upload, configure the server-only Supabase secret in the project environment (never commit it or paste it into source/chat), then run:

```bash
npm run media:upload
```

The script uploads only the manifest's 24 expected paths to `snow-media`. It does not create tables or seed database records. After upload, add or update the matching `project_media` rows through the existing Supabase data workflow, using the generated public URLs and preserving project relationships/RLS.

## Replacement with final visuals

When temporary assets are replaced, keep the same slugs, roles, filenames, storage paths, and `project_media` relationships. Update source metadata to describe the final asset origin; the Work UI and spatial components should not need to change.

## Verification checklist

- `npm run media:upload -- --dry-run` reports all 24 local files.
- Every `project_media.url` points to a `snow-media/projects/<slug>/<filename>` path.
- `/work` and `/work/<slug>` render through `fetchProjects()` and the existing spatial media components.
- Missing rows or broken URLs continue to use the existing fallback behavior.
- No Supabase schema or RLS changes are needed for this contract.
