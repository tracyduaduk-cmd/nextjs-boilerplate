import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const ROUTES = [
  "/",
  "/tools",
  "/care",
  "/work",
  "/request",
  "/telecom",
  "/network",
  "/tools/json",
  "/tools/regex",
  "/tools/qr",
  "/network/dns",
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-412", width: 412, height: 915 },
];

async function verifyPages() {
  console.log("=========================================");
  console.log("Snow Visual & Layout Verification Suite");
  console.log("=========================================");

  const outputDir = path.join(process.cwd(), "verification-screenshots");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Listen for console errors & failed requests
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error(`  ⚠️ Page Console Error: ${msg.text()}`);
    }
  });

  page.on("requestfailed", (request) => {
    console.error(`  ❌ Request Failed: ${request.url()} (${request.failure()?.errorText})`);
  });

  for (const vp of VIEWPORTS) {
    console.log(`\n📱 Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    await page.setViewportSize({ width: vp.width, height: vp.height });

    for (const route of ROUTES) {
      const targetUrl = `http://localhost:3000${route}`;
      try {
        await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 15000 });
        const cleanRoute = route === "/" ? "home" : route.replace(/\//g, "_").slice(1);
        const screenshotPath = path.join(outputDir, `${cleanRoute}_${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`  ✓ Rendered & captured: ${route} -> ${path.basename(screenshotPath)}`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  ✕ Error navigating to ${targetUrl}: ${msg}`);
      }
    }
  }

  await browser.close();
  console.log("\n=========================================");
  console.log("Visual Verification Complete!");
  console.log("=========================================\n");
}

verifyPages().catch((err) => {
  console.error("Verification suite failed:", err);
});
