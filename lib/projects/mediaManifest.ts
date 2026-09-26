export const SUPABASE_PROJECT_REF = "jwetpisuobxyypgofvsd";
export const STORAGE_BUCKET = "snow-media";
export const BASE_STORAGE_URL = `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${STORAGE_BUCKET}`;

export const PORTFOLIO_PROJECT_SLUGS = [
  "aurora-commerce",
  "pulse-health",
  "orbit-finance",
  "nova-ai-assistant",
  "atlas-business-portal",
  "studio-landing",
  "local-services-platform",
  "secure-account-recovery",
] as const;

export type PortfolioProjectSlug = (typeof PORTFOLIO_PROJECT_SLUGS)[number];

export const PORTFOLIO_ASSET_FILENAMES = [
  "hero.webp",
  "desktop.webp",
  "mobile.webp",
] as const;

export type PortfolioAssetFilename = (typeof PORTFOLIO_ASSET_FILENAMES)[number];

export type PortfolioAssetRole = "hero" | "desktop" | "mobile";

export interface PortfolioAssetSource {
  sourceUrl: string | null;
  provider: string | null;
  attribution: string | null;
  licenseNote: string | null;
}

export interface PortfolioAsset extends PortfolioAssetSource {
  projectSlug: PortfolioProjectSlug;
  role: PortfolioAssetRole;
  filename: PortfolioAssetFilename;
  localPath: string;
  storagePath: string;
  publicUrl: string;
}

/**
 * Curated source metadata for the temporary portfolio layer.
 * Keep URLs null until a source has been reviewed and licensed for use.
 */
export const PORTFOLIO_ASSET_SOURCES: Record<
  PortfolioProjectSlug,
  Record<PortfolioAssetFilename, PortfolioAssetSource>
> = Object.fromEntries(
  PORTFOLIO_PROJECT_SLUGS.map((slug) => [
    slug,
    Object.fromEntries(
      PORTFOLIO_ASSET_FILENAMES.map((filename) => [
        filename,
        {
          sourceUrl: null,
          provider: null,
          attribution: null,
          licenseNote: null,
        },
      ]),
    ),
  ]),
) as Record<PortfolioProjectSlug, Record<PortfolioAssetFilename, PortfolioAssetSource>>;

export function isPortfolioProjectSlug(slug: string): slug is PortfolioProjectSlug {
  return (PORTFOLIO_PROJECT_SLUGS as readonly string[]).includes(slug);
}

export function isPortfolioAssetFilename(filename: string): filename is PortfolioAssetFilename {
  return (PORTFOLIO_ASSET_FILENAMES as readonly string[]).includes(filename);
}

export function getStoragePath(slug: string, filename: PortfolioAssetFilename): string {
  return `projects/${slug}/${filename}`;
}

export function getPublicUrl(slug: string, filename: PortfolioAssetFilename): string {
  return `${BASE_STORAGE_URL}/${getStoragePath(slug, filename)}`;
}

export function getLocalPath(slug: string, filename: PortfolioAssetFilename): string {
  return `public/assets/portfolio/${slug}/${filename}`;
}

export function getProjectAssets(slug: PortfolioProjectSlug): PortfolioAsset[] {
  return PORTFOLIO_ASSET_FILENAMES.map((filename) => ({
    projectSlug: slug,
    role: filename.replace(".webp", "") as PortfolioAssetRole,
    filename,
    localPath: getLocalPath(slug, filename),
    storagePath: getStoragePath(slug, filename),
    publicUrl: getPublicUrl(slug, filename),
    ...PORTFOLIO_ASSET_SOURCES[slug][filename],
  }));
}

export function getAllPortfolioAssets(): PortfolioAsset[] {
  return PORTFOLIO_PROJECT_SLUGS.flatMap((slug) => getProjectAssets(slug));
}
