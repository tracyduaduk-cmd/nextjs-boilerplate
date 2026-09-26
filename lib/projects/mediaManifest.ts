import { PORTFOLIO_PROJECT_SLUGS, PortfolioProjectSlug } from "./types";

export interface PortfolioAssetManifestItem {
  projectSlug: PortfolioProjectSlug;
  filename: "hero.webp" | "desktop.webp" | "mobile.webp";
  mediaType: "image" | "screenshot";
  title: string;
  sortOrder: number;
  relativePath: string;
  storagePath: string;
  publicUrl: string;
}

export const STORAGE_BUCKET = "snow-media";
export const SUPABASE_PROJECT_REF = "jwetpisuobxyypgofvsd";
export const STORAGE_BASE_URL = `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${STORAGE_BUCKET}`;

export const ALLOWED_FILENAMES = ["hero.webp", "desktop.webp", "mobile.webp"] as const;
export type AllowedFilename = (typeof ALLOWED_FILENAMES)[number];

export function getStoragePath(projectSlug: string, filename: string): string {
  return `projects/${projectSlug}/${filename}`;
}

export function getPublicMediaUrl(projectSlug: string, filename: string): string {
  return `${STORAGE_BASE_URL}/${getStoragePath(projectSlug, filename)}`;
}

export const PORTFOLIO_MEDIA_MANIFEST: PortfolioAssetManifestItem[] = PORTFOLIO_PROJECT_SLUGS.flatMap(
  (slug) => [
    {
      projectSlug: slug,
      filename: "hero.webp",
      mediaType: "image",
      title: "Hero preview",
      sortOrder: 1,
      relativePath: `public/assets/portfolio/${slug}/hero.webp`,
      storagePath: getStoragePath(slug, "hero.webp"),
      publicUrl: getPublicMediaUrl(slug, "hero.webp"),
    },
    {
      projectSlug: slug,
      filename: "desktop.webp",
      mediaType: "screenshot",
      title: "Desktop interface preview",
      sortOrder: 2,
      relativePath: `public/assets/portfolio/${slug}/desktop.webp`,
      storagePath: getStoragePath(slug, "desktop.webp"),
      publicUrl: getPublicMediaUrl(slug, "desktop.webp"),
    },
    {
      projectSlug: slug,
      filename: "mobile.webp",
      mediaType: "screenshot",
      title: "Mobile interface preview",
      sortOrder: 3,
      relativePath: `public/assets/portfolio/${slug}/mobile.webp`,
      storagePath: getStoragePath(slug, "mobile.webp"),
      publicUrl: getPublicMediaUrl(slug, "mobile.webp"),
    },
  ]
);
