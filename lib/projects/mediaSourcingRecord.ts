import { PORTFOLIO_PROJECT_SLUGS, PortfolioProjectSlug, PortfolioAssetRole, getPublicUrl } from "./mediaManifest";

export interface SourcingRecordEntry {
  projectSlug: PortfolioProjectSlug;
  role: PortfolioAssetRole;
  filename: string;
  publicUrl: string;
  source: string;
  license: string;
  dateCreated: string;
  usageNote: string;
}

export const MEDIA_SOURCING_RECORDS: SourcingRecordEntry[] = PORTFOLIO_PROJECT_SLUGS.flatMap((slug) => {
  const roles: PortfolioAssetRole[] = ["hero", "desktop", "mobile"];
  return roles.map((role) => {
    const filename = `${role}.webp` as const;
    return {
      projectSlug: slug,
      role,
      filename,
      publicUrl: getPublicUrl(slug, filename),
      source: "Snow — Original Concept Interface",
      license: "Original fictional interface created by Snow for portfolio demonstration. Not represented as a third-party client deliverable.",
      dateCreated: "2026-09-27",
      usageNote: "Original Snow concept interface — generated internally for portfolio demonstration.",
    };
  });
});
