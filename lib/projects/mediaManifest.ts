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
 * Curated source metadata for the temporary, conceptual portfolio layer.
 * Each treatment is derived from the same approved Pexels master for its project.
 */
const CURATED_PEXELS_LICENSE = "Pexels License: https://www.pexels.com/license/";

const CURATED_SOURCE_BY_PROJECT: Record<PortfolioProjectSlug, PortfolioAssetSource> = {
  "aurora-commerce": {
    sourceUrl: "https://www.pexels.com/photo/headphones-near-laptop-20024582/",
    provider: "Pexels",
    attribution: "wutthichai charoenburi via Pexels",
    licenseNote: CURATED_PEXELS_LICENSE,
  },
  "pulse-health": {
    sourceUrl: "https://www.pexels.com/photo/modern-fitness-tracking-smartwatch-and-smartphone-32977239/",
    provider: "Pexels",
    attribution: "Andrey Matveev via Pexels",
    licenseNote: CURATED_PEXELS_LICENSE,
  },
  "orbit-finance": {
    sourceUrl: "https://www.pexels.com/photo/graph-displayed-on-laptop-screen-7567486/",
    provider: "Pexels",
    attribution: "Pexels source image; photographer credited on source page",
    licenseNote: CURATED_PEXELS_LICENSE,
  },
  "nova-ai-assistant": {
    sourceUrl: "https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-storage-of-collected-data-in-ai-it-was-created-by-wes-cockx-as-part-of-the-visualising-ai-project-launched-17486100/",
    provider: "Pexels",
    attribution: "Google DeepMind via Pexels; artwork by Wes Cockx",
    licenseNote: CURATED_PEXELS_LICENSE,
  },
  "atlas-business-portal": {
    sourceUrl: "https://www.pexels.com/photo/people-working-on-computers-in-an-office-12903173/",
    provider: "Pexels",
    attribution: "Mizuno K via Pexels",
    licenseNote: CURATED_PEXELS_LICENSE,
  },
  "studio-landing": {
    sourceUrl: "https://www.pexels.com/photo/architectural-design-studio-wall-with-blueprints-36809500/",
    provider: "Pexels",
    attribution: "Pexels source image; photographer credited on source page",
    licenseNote: CURATED_PEXELS_LICENSE,
  },
  "local-services-platform": {
    sourceUrl: "https://www.pexels.com/photo/navigating-the-city-with-the-phone-15949908/",
    provider: "Pexels",
    attribution: "Pexels source image; photographer credited on source page",
    licenseNote: CURATED_PEXELS_LICENSE,
  },
  "secure-account-recovery": {
    sourceUrl: "https://www.pexels.com/photo/a-laptop-over-a-round-table-4973899/",
    provider: "Pexels",
    attribution: "Dan Nelson via Pexels",
    licenseNote: CURATED_PEXELS_LICENSE,
  },
};

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
