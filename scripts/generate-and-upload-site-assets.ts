import fs from "fs";
import path from "path";
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_REF = "jwetpisuobxyypgofvsd";
const STORAGE_BUCKET = "snow-media";
const SUPABASE_URL = `https://${SUPABASE_PROJECT_REF}.supabase.co`;
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZXRwaXN1b2J4eXlwZ29mdnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNTU5ODYsImV4cCI6MjEwNTczMTk4Nn0.Tk51IJg7Kufg4P9EvtK5f39ywa2E7wswgrzoEwlUQGE";

const supabase = createClient(SUPABASE_URL, ANON_KEY);

interface AssetConfig {
  pageKey: string;
  slotKey: string;
  title: string;
  assetType: "3d_spatial" | "technical_diagram" | "ui_composition" | "screenshot" | "svg_vector";
  storagePath: string;
  altText: string;
  metadata: Record<string, unknown>;
  html: string;
}

const ASSET_DEFINITIONS: AssetConfig[] = [
  {
    pageKey: "tools_hub",
    slotKey: "hero_spatial_core",
    title: "Snow Spatial Core Instrument",
    assetType: "3d_spatial",
    storagePath: "tools/spatial-core.webp",
    altText: "3D Spatial Core Technical Visual Stage for Snow Developer Utilities",
    metadata: { theme: "cyan", format: "spatial" },
    html: `
      <div style="width: 1200px; height: 675px; background: #030712; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; position: relative; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 70%);"></div>
        <div style="position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px;"></div>

        <div style="z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 24px; text-align: center;">
          <div style="padding: 8px 16px; border-radius: 9999px; background: rgba(8, 47, 73, 0.8); border: 1px solid rgba(56, 189, 248, 0.6); color: #38bdf8; font-size: 14px; letter-spacing: 2px;">
            ✦ SNOW SPATIAL INSTRUMENT V3.4
          </div>
          <div style="position: relative; width: 220px; height: 220px; border-radius: 50%; border: 2px dashed #0891b2; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 50px rgba(6, 182, 212, 0.3);">
            <div style="width: 140px; height: 140px; border-radius: 24px; background: linear-gradient(135deg, #0284c7, #0d9488); transform: rotate(45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(56, 189, 248, 0.5);">
              <div style="transform: rotate(-45deg); color: #ffffff; font-size: 28px; font-weight: bold;">SNOW</div>
            </div>
          </div>
          <div style="color: #f8fafc; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">ISOLATED CLIENT CRYPTO ENGINE</div>
          <div style="color: #94a3b8; font-size: 16px; max-width: 600px; line-height: 1.5;">Browser-executed client privacy pipeline with zero telemetry and instant state synchronization.</div>
        </div>
      </div>
    `,
  },
  {
    pageKey: "tools_json",
    slotKey: "visual_stage",
    title: "JSON Data Transformation Pipeline",
    assetType: "technical_diagram",
    storagePath: "tools/json-pipeline.webp",
    altText: "Raw JSON to Formatted Validated Structure Flow Visual",
    metadata: { pipeline: "json-format-validate" },
    html: `
      <div style="width: 1200px; height: 675px; background: #020617; display: flex; align-items: center; justify-content: center; font-family: monospace; position: relative;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 70%);"></div>
        <div style="display: flex; items-center; gap: 20px; z-index: 10;">
          <div style="width: 240px; padding: 20px; background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; color: #94a3b8; font-size: 13px; line-height: 1.6;">
            <div style="color: #38bdf8; font-weight: bold; margin-bottom: 8px;">1. RAW JSON</div>
            <div>{"user": "snow", "active": true, "id": 1048}</div>
          </div>
          <div style="color: #38bdf8; font-size: 24px; font-weight: bold;">➔</div>
          <div style="width: 200px; padding: 20px; background: #0369a1; border: 1px solid #0284c7; border-radius: 16px; color: #ffffff; text-align: center; font-weight: bold;">
            <div style="font-size: 16px;">2. PARSE</div>
            <div style="font-size: 11px; opacity: 0.8; margin-top: 4px;">AST Tokenizer</div>
          </div>
          <div style="color: #38bdf8; font-size: 24px; font-weight: bold;">➔</div>
          <div style="width: 200px; padding: 20px; background: #0d9488; border: 1px solid #14b8a6; border-radius: 16px; color: #ffffff; text-align: center; font-weight: bold;">
            <div style="font-size: 16px;">3. VALIDATE</div>
            <div style="font-size: 11px; opacity: 0.8; margin-top: 4px;">Schema Check</div>
          </div>
          <div style="color: #38bdf8; font-size: 24px; font-weight: bold;">➔</div>
          <div style="width: 260px; padding: 20px; background: #0f172a; border: 1px solid #10b981; border-radius: 16px; color: #34d399; font-size: 13px; line-height: 1.6;">
            <div style="color: #10b981; font-weight: bold; margin-bottom: 8px;">4. STRUCTURED</div>
            <pre style="margin: 0; font-family: monospace;">{\n  "active": true,\n  "id": 1048,\n  "user": "snow"\n}</pre>
          </div>
        </div>
      </div>
    `,
  },
  {
    pageKey: "tools_regex",
    slotKey: "visual_stage",
    title: "Regex Pattern Matching Pipeline",
    assetType: "technical_diagram",
    storagePath: "tools/regex-pipeline.webp",
    altText: "Regex Pattern to Matched Text and Capture Groups Diagram",
    metadata: { pipeline: "regex-engine" },
    html: `
      <div style="width: 1200px; height: 675px; background: #020617; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; position: relative;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.12) 0%, transparent 70%);"></div>
        <div style="z-index: 10; display: flex; flex-direction: column; gap: 30px; align-items: center;">
          <div style="padding: 16px 32px; background: #1e1b4b; border: 1px solid #4338ca; border-radius: 16px; color: #a5b4fc; font-size: 20px; font-weight: bold;">
            PATTERN: <span style="color: #f472b6;">/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})/g</span>
          </div>
          <div style="display: flex; items-center; gap: 24px;">
            <div style="padding: 20px; background: #0f172a; border: 1px solid #334155; border-radius: 12px; color: #e2e8f0; font-size: 16px;">
              INPUT: "Contact us at <span style="background: rgba(236, 72, 153, 0.3); color: #f472b6; padding: 2px 6px; border-radius: 4px;">dev@snow.systems</span> today"
            </div>
            <div style="color: #c084fc; font-size: 24px; font-weight: bold;">➔</div>
            <div style="padding: 20px; background: #0f172a; border: 1px solid #10b981; border-radius: 12px; color: #34d399; font-size: 14px; line-height: 1.5;">
              <div style="font-weight: bold; color: #10b981; margin-bottom: 6px;">MATCH ENGINE OUTPUT</div>
              <div>Match[0]: dev@snow.systems</div>
              <div>Group[1]: dev</div>
              <div>Group[2]: snow</div>
              <div>Group[3]: systems</div>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    pageKey: "tools_qr",
    slotKey: "visual_stage",
    title: "QR Code Encoding Matrix",
    assetType: "ui_composition",
    storagePath: "tools/qr-matrix.webp",
    altText: "Payload to Scannable QR Matrix Flow Composition",
    metadata: { pipeline: "qr-matrix" },
    html: `
      <div style="width: 1200px; height: 675px; background: #020617; display: flex; align-items: center; justify-content: center; font-family: monospace; position: relative;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 70%);"></div>
        <div style="display: flex; align-items: center; gap: 40px; z-index: 10;">
          <div style="width: 320px; padding: 24px; background: #0f172a; border: 1px solid #1e293b; border-radius: 20px; color: #f8fafc;">
            <div style="color: #38bdf8; font-size: 12px; font-weight: bold; margin-bottom: 12px;">INPUT DATA PAYLOAD</div>
            <div style="background: #020617; padding: 12px; border-radius: 8px; color: #94a3b8; font-size: 13px;">https://snow.systems/request</div>
            <div style="margin-top: 16px; font-size: 11px; color: #64748b; line-height: 1.6;">
              • Error Correction: Level M (15%)<br/>
              • Encoding: Byte Mode<br/>
              • Mask Pattern: Auto Optimized
            </div>
          </div>
          <div style="color: #38bdf8; font-size: 32px; font-weight: bold;">➔</div>
          <div style="width: 240px; height: 240px; background: #ffffff; padding: 16px; border-radius: 20px; display: flex; items-center; justify-content: center; box-shadow: 0 0 40px rgba(56, 189, 248, 0.4);">
            <div style="width: 100%; height: 100%; background: #000; position: relative;">
              <div style="position: absolute; top: 0; left: 0; width: 50px; height: 50px; border: 10px solid #000; background: #fff;"></div>
              <div style="position: absolute; top: 0; right: 0; width: 50px; height: 50px; border: 10px solid #000; background: #fff;"></div>
              <div style="position: absolute; bottom: 0; left: 0; width: 50px; height: 50px; border: 10px solid #000; background: #fff;"></div>
              <div style="position: absolute; top: 70px; left: 70px; width: 60px; height: 60px; background: #38bdf8;"></div>
              <div style="position: absolute; bottom: 40px; right: 40px; width: 50px; height: 50px; background: #000;"></div>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    pageKey: "network_dns",
    slotKey: "visual_stage",
    title: "DNS DoH Resolution Flow",
    assetType: "technical_diagram",
    storagePath: "network/dns-pipeline.webp",
    altText: "Domain to DNS Query and DoH Record Resolution Architecture",
    metadata: { protocol: "dns-doh" },
    html: `
      <div style="width: 1200px; height: 675px; background: #020617; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; position: relative;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 70%);"></div>
        <div style="z-index: 10; display: flex; align-items: center; gap: 24px;">
          <div style="padding: 20px; background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; color: #f8fafc; text-align: center;">
            <div style="color: #34d399; font-weight: bold; font-size: 16px;">snow.systems</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">QUERY: A / AAAA / TXT</div>
          </div>
          <div style="color: #10b981; font-size: 24px; font-weight: bold;">➔</div>
          <div style="padding: 20px; background: #064e3b; border: 1px solid #059669; border-radius: 16px; color: #ffffff; text-align: center;">
            <div style="font-weight: bold; font-size: 16px;">DNS over HTTPS (DoH)</div>
            <div style="font-size: 11px; opacity: 0.8; margin-top: 4px;">Cloudflare 1.1.1.1</div>
          </div>
          <div style="color: #10b981; font-size: 24px; font-weight: bold;">➔</div>
          <div style="padding: 20px; background: #0f172a; border: 1px solid #10b981; border-radius: 16px; color: #34d399; line-height: 1.6; font-size: 13px;">
            <div style="color: #10b981; font-weight: bold;">RESOLVED RECORDS</div>
            <div>A: 104.21.48.12</div>
            <div>AAAA: 2606:4700:3038::6815:300c</div>
            <div>TTL: 300s (SECURE)</div>
          </div>
        </div>
      </div>
    `,
  },
  {
    pageKey: "telecom_hub",
    slotKey: "hero_pipeline",
    title: "NCC Telecom Harmonization System",
    assetType: "technical_diagram",
    storagePath: "telecom/telecom-pipeline.webp",
    altText: "Mobile Network to USSD SMS and NCC Harmonized Reference Architecture",
    metadata: { region: "NG" },
    html: `
      <div style="width: 1200px; height: 675px; background: #020617; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; position: relative;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.12) 0%, transparent 70%);"></div>
        <div style="z-index: 10; display: flex; align-items: center; gap: 24px;">
          <div style="padding: 20px; background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; color: #f8fafc; text-align: center;">
            <div style="color: #fbbf24; font-weight: bold; font-size: 16px;">SUBSCRIBER DEVICE</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">MTN / Airtel / Glo / 9mobile</div>
          </div>
          <div style="color: #f59e0b; font-size: 24px; font-weight: bold;">➔</div>
          <div style="padding: 20px; background: #78350f; border: 1px solid #b45309; border-radius: 16px; color: #ffffff; text-align: center;">
            <div style="font-weight: bold; font-size: 16px;">NCC HARMONIZED USSD</div>
            <div style="font-size: 11px; opacity: 0.8; margin-top: 4px;">*310# Balance | *312# Data</div>
          </div>
          <div style="color: #f59e0b; font-size: 24px; font-weight: bold;">➔</div>
          <div style="padding: 20px; background: #0f172a; border: 1px solid #f59e0b; border-radius: 16px; color: #fbbf24; line-height: 1.6; font-size: 13px;">
            <div style="color: #f59e0b; font-weight: bold;">SERVICE GATEWAY</div>
            <div>Status: 200 OK</div>
            <div>Latched Cell ID: 64012</div>
            <div>Regulator Standard: Compliant</div>
          </div>
        </div>
      </div>
    `,
  },
];

async function generateAndUploadAll() {
  console.log("=========================================");
  console.log("Snow Site Assets Generator & Storage Upload");
  console.log("=========================================");

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 675 });

  for (const asset of ASSET_DEFINITIONS) {
    console.log(`\n📷 Generating asset: ${asset.storagePath}`);
    await page.setContent(asset.html, { waitUntil: "networkidle" });
    const imageBuffer = await page.screenshot({ type: "webp", quality: 90 });

    console.log(`⬆ Uploading to storage path: ${asset.storagePath}`);
    const { data: storageData, error: storageError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(asset.storagePath, imageBuffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (storageError) {
      console.error(`❌ Storage upload failed for ${asset.storagePath}:`, storageError);
      process.exit(1);
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${asset.storagePath}`;
    console.log(`✓ Uploaded successfully. Public URL: ${publicUrl}`);

    console.log(`💾 Inserting record into public.site_assets...`);
    const { error: dbError } = await supabase.from("site_assets").upsert(
      {
        page_key: asset.pageKey,
        slot_key: asset.slotKey,
        title: asset.title,
        asset_type: asset.assetType,
        storage_path: asset.storagePath,
        public_url: publicUrl,
        alt_text: asset.altText,
        metadata: asset.metadata,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_key,slot_key" }
    );

    if (dbError) {
      console.error(`❌ DB Insert failed for ${asset.pageKey}/${asset.slotKey}:`, dbError);
      process.exit(1);
    }
    console.log(`✓ DB record inserted for (${asset.pageKey}, ${asset.slotKey})`);
  }

  await browser.close();
  console.log("\n=========================================");
  console.log("All Assets Successfully Generated & Uploaded!");
  console.log("=========================================\n");
}

generateAndUploadAll().catch((err) => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
