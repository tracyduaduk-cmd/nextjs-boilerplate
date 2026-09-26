import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import {
  STORAGE_BUCKET,
  SUPABASE_PROJECT_REF,
  PORTFOLIO_PROJECT_SLUGS,
  PORTFOLIO_ASSET_FILENAMES,
  getAllPortfolioAssets,
  isPortfolioProjectSlug,
  isPortfolioAssetFilename,
  getStoragePath,
  getLocalPath,
} from "../lib/projects/mediaManifest";

const isDryRun = process.argv.includes("--dry-run");

async function runUpload() {
  console.log("=========================================");
  console.log("Snow Portfolio Media Asset Upload Pipeline");
  console.log("=========================================");
  console.log(`Target Supabase Ref: ${SUPABASE_PROJECT_REF}`);
  console.log(`Target Bucket      : ${STORAGE_BUCKET}`);
  console.log(`Mode               : ${isDryRun ? "DRY RUN (No uploads performed)" : "LIVE UPLOAD"}`);
  console.log("-----------------------------------------\n");

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || `https://${SUPABASE_PROJECT_REF}.supabase.co`;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!isDryRun && !serviceRoleKey) {
    console.error("❌ ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable is required for upload.");
    console.error("Please set SUPABASE_SERVICE_ROLE_KEY in your environment or .env file before running this script.");
    console.error("For local validation without credentials, run with: npm run media:upload -- --dry-run");
    process.exit(1);
  }

  const supabase = serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

  const allAssets = getAllPortfolioAssets();
  let foundCount = 0;
  let missingCount = 0;
  let uploadedCount = 0;
  let failedCount = 0;

  const missingAssets: string[] = [];

  for (const slug of PORTFOLIO_PROJECT_SLUGS) {
    console.log(`\n📁 Project: ${slug}`);

    for (const filename of PORTFOLIO_ASSET_FILENAMES) {
      const relLocalPath = getLocalPath(slug, filename);
      const absLocalPath = path.resolve(process.cwd(), relLocalPath);
      const storagePath = getStoragePath(slug, filename);

      if (!isPortfolioProjectSlug(slug)) {
        console.error(`  ✕ [INVALID SLUG] ${slug}`);
        failedCount++;
        continue;
      }

      if (!isPortfolioAssetFilename(filename)) {
        console.error(`  ✕ [INVALID FILENAME] ${filename}`);
        failedCount++;
        continue;
      }

      if (!filename.endsWith(".webp")) {
        console.error(`  ✕ [UNSUPPORTED EXTENSION] ${filename} (must be WebP)`);
        failedCount++;
        continue;
      }

      if (!fs.existsSync(absLocalPath)) {
        console.log(`  ⚠️  [MISSING] ${relLocalPath}`);
        missingCount++;
        missingAssets.push(relLocalPath);
        continue;
      }

      const fileStats = fs.statSync(absLocalPath);
      if (fileStats.size === 0) {
        console.log(`  ⚠️  [EMPTY FILE] ${relLocalPath}`);
        missingCount++;
        missingAssets.push(`${relLocalPath} (empty file)`);
        continue;
      }

      foundCount++;

      if (isDryRun) {
        console.log(`  ✓ [VALIDATED] ${relLocalPath} -> ${storagePath} (${(fileStats.size / 1024).toFixed(1)} KB)`);
        uploadedCount++;
        continue;
      }

      try {
        const fileBuffer = fs.readFileSync(absLocalPath);
        const { error } = await supabase!.storage
          .from(STORAGE_BUCKET)
          .upload(storagePath, fileBuffer, {
            contentType: "image/webp",
            upsert: true,
          });

        if (error) {
          console.error(`  ✕ [UPLOAD FAILED] ${storagePath}: ${error.message}`);
          failedCount++;
        } else {
          console.log(`  ✓ [UPLOADED] ${storagePath}`);
          uploadedCount++;
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`  ✕ [UPLOAD ERROR] ${storagePath}: ${message}`);
        failedCount++;
      }
    }
  }

  console.log("\n=========================================");
  console.log("Summary");
  console.log("=========================================");
  console.log(`Total Expected Assets: ${allAssets.length}`);
  console.log(`Files Present        : ${foundCount}`);
  console.log(`Files Missing        : ${missingCount}`);
  if (isDryRun) {
    console.log(`Simulated Uploads    : ${uploadedCount}`);
  } else {
    console.log(`Successfully Uploaded: ${uploadedCount}`);
  }
  console.log(`Failures/Errors      : ${failedCount}`);

  if (missingAssets.length > 0) {
    console.log("\nMissing Asset Paths:");
    missingAssets.forEach((p) => console.log(`  - ${p}`));
  }

  console.log("=========================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runUpload();
