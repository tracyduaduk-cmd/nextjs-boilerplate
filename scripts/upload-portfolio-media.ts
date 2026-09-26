import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import {
  PORTFOLIO_MEDIA_MANIFEST,
  STORAGE_BUCKET,
  STORAGE_BASE_URL,
  getStoragePath,
} from "../lib/projects/mediaManifest";
import { PORTFOLIO_PROJECT_SLUGS } from "../lib/projects/types";

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run") || args.includes("-d");

  console.log("=== Snow Portfolio Media Asset Pipeline ===");
  if (isDryRun) {
    console.log("Mode: DRY RUN / VALIDATION ONLY");
  } else {
    console.log("Mode: LIVE UPLOAD");
  }
  console.log(`Bucket Target: ${STORAGE_BUCKET}`);
  console.log(`Base URL: ${STORAGE_BASE_URL}\n`);

  const rootDir = process.cwd();
  const portfolioAssetsDir = path.join(rootDir, "public", "assets", "portfolio");

  // Step 1: Validate directory structure & manifest files locally
  let missingCount = 0;
  let validCount = 0;

  console.log("--- 1. Local Asset File Validation ---");

  for (const item of PORTFOLIO_MEDIA_MANIFEST) {
    const fullPath = path.join(rootDir, item.relativePath);
    const exists = fs.existsSync(fullPath);

    if (!exists) {
      console.error(`❌ MISSING: ${item.relativePath}`);
      missingCount++;
    } else {
      const stats = fs.statSync(fullPath);
      console.log(`✓ FOUND: ${item.relativePath} (${(stats.size / 1024).toFixed(1)} KB)`);
      validCount++;
    }
  }

  console.log(`\nValidation Summary: ${validCount} files present, ${missingCount} files missing.`);

  if (missingCount > 0) {
    console.error(`\n⚠️  ERROR: ${missingCount} required portfolio asset(s) are missing from public/assets/portfolio/`);
    console.error(`Expected structure: public/assets/portfolio/<project-slug>/{hero.webp,desktop.webp,mobile.webp}`);
    if (!isDryRun) {
      process.exit(1);
    }
  }

  if (isDryRun) {
    console.log("\n✓ Dry-run completed successfully.");
    return;
  }

  // Step 2: Upload to Supabase Storage
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jwetpisuobxyypgofvsd.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!serviceRoleKey) {
    console.error("\n❌ ERROR: SUPABASE_SERVICE_ROLE_KEY is required to upload assets to Supabase Storage.");
    console.error("Please set SUPABASE_SERVICE_ROLE_KEY in your environment or run with --dry-run.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log("\n--- 2. Uploading Assets to Supabase Storage ---");

  let uploadedCount = 0;
  let failedCount = 0;

  for (const item of PORTFOLIO_MEDIA_MANIFEST) {
    const fullPath = path.join(rootDir, item.relativePath);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ SKIPPING MISSING FILE: ${item.relativePath}`);
      failedCount++;
      continue;
    }

    const fileBuffer = fs.readFileSync(fullPath);
    const storagePath = getStoragePath(item.projectSlug, item.filename);

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (error) {
      console.error(`❌ FAILED UPLOAD: ${storagePath} -> ${error.message}`);
      failedCount++;
    } else {
      console.log(`✓ UPLOADED: ${storagePath} (${item.publicUrl})`);
      uploadedCount++;
    }
  }

  console.log(`\n--- Upload Summary ---`);
  console.log(`Total Assets Processed: ${PORTFOLIO_MEDIA_MANIFEST.length}`);
  console.log(`Successfully Uploaded: ${uploadedCount}`);
  console.log(`Failed: ${failedCount}`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unexpected error in upload script:", err);
  process.exit(1);
});
