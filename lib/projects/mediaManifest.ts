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

/** Canonical roles for project media. The current storage set implements the first three;
 * later roles can be added without changing consumers or URL conventions. */
export const PORTFOLIO_MEDIA_ROLES = [
  "hero",
  "desktop",
  "mobile",
  "browser",
  "phone",
  "interface",
  "detail",
  "architecture",
  "gallery",
] as const;

export type PortfolioAssetRole = (typeof PORTFOLIO_MEDIA_ROLES)[number];

/** Files already present in the repository and mirrored by the upload script. */
export const PORTFOLIO_ASSET_FILENAMES = ["hero.webp", "desktop.webp", "mobile.webp"] as const;
export type PortfolioAssetFilename = (typeof PORTFOLIO_ASSET_FILENAMES)[number];

const ROLE_BY_FILENAME: Record<PortfolioAssetFilename, PortfolioAssetRole> = {
  "hero.webp": "hero",
  "desktop.webp": "desktop",
  "mobile.webp": "mobile",
};

export interface PortfolioAssetSource {
  sourceUrl?: string | null;
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

export const MEDIA_TAXONOMY = {
  project: ["hero", "desktop", "mobile", "browser", "phone", "detail", "interface", "architecture"],
  services: ["web-development", "digital-products", "ui-ux", "mobile", "ai", "saas", "e-commerce", "experimental"],
  capabilities: ["spatial-webgl", "data-tools", "network", "website-lab", "ai-concierge", "care", "telecom"],
  editorial: ["technology", "devices", "interface-closeups", "abstract-technical", "studio-atmospheric"],
} as const;

export type MediaTaxonomyGroup = keyof typeof MEDIA_TAXONOMY;
export type MediaTaxonomyTag = (typeof MEDIA_TAXONOMY)[MediaTaxonomyGroup][number];

const SNOW_CONCEPT_LICENSE =
  "Original fictional interface created by Snow for portfolio demonstration. Not represented as a third-party client deliverable.";

const CURATED_SOURCE_BY_PROJECT: Record<PortfolioProjectSlug, PortfolioAssetSource> = Object.fromEntries(
  PORTFOLIO_PROJECT_SLUGS.map((slug) => [
    slug,
    {
      sourceUrl: null,
      provider: "Snow Original Concept Interface",
      attribution: "Original Snow concept interface created for portfolio demonstration.",
      licenseNote: SNOW_CONCEPT_LICENSE,
    },
  ]),
) as Record<PortfolioProjectSlug, PortfolioAssetSource>;

export const PORTFOLIO_ASSET_SOURCES: Record<
  PortfolioProjectSlug,
  Record<PortfolioAssetFilename, PortfolioAssetSource>
> = Object.fromEntries(
  PORTFOLIO_PROJECT_SLUGS.map((slug) => [
    slug,
    Object.fromEntries(
      PORTFOLIO_ASSET_FILENAMES.map((filename) => [filename, CURATED_SOURCE_BY_PROJECT[slug]]),
    ),
  ]),
) as Record<PortfolioProjectSlug, Record<PortfolioAssetFilename, PortfolioAssetSource>>;

export function isPortfolioProjectSlug(slug: string): slug is PortfolioProjectSlug {
  return (PORTFOLIO_PROJECT_SLUGS as readonly string[]).includes(slug);
}

export function isPortfolioAssetFilename(filename: string): filename is PortfolioAssetFilename {
  return (PORTFOLIO_ASSET_FILENAMES as readonly string[]).includes(filename);
}

export function getRoleForFilename(filename: PortfolioAssetFilename): PortfolioAssetRole {
  return ROLE_BY_FILENAME[filename];
}

export function getStoragePath(slug: string, filename: PortfolioAssetFilename): string {
  return `projects/${slug}/${filename}`;
}

export function getPublicUrl(slug: string, filename: PortfolioAssetFilename): string {
  return `${BASE_STORAGE_URL}/${getStoragePath(slug, filename)}`;
}

export function getLocalPublicUrl(slug: string, filename: PortfolioAssetFilename): string {
  return `/${getLocalPath(slug, filename).replace(/^public\//, "")}`;
}

export function getLocalPath(slug: string, filename: PortfolioAssetFilename): string {
  return `public/assets/portfolio/${slug}/${filename}`;
}

export function getProjectAssets(slug: PortfolioProjectSlug): PortfolioAsset[] {
  return PORTFOLIO_ASSET_FILENAMES.map((filename) => ({
    projectSlug: slug,
    role: getRoleForFilename(filename),
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
