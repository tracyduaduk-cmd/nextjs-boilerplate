import { test, expect } from "@playwright/test";

test.describe("Website Lab E2E Suite", () => {
  test("Website Lab Hub renders core tools", async ({ page }) => {
    await page.goto("/tools/website");
    await expect(page.locator("h1")).toContainText("WEBSITE LAB");
    await expect(page.getByText("Website Screenshot Generator")).toBeVisible();
    await expect(page.getByText("Website PDF Converter")).toBeVisible();
    await expect(page.getByText("Website Inspector & Meta Diagnostic")).toBeVisible();
  });

  test("Screenshot page blocks SSRF localhost target", async ({ page }) => {
    await page.goto("/tools/website/screenshot");
    await page.fill("#target-url-input", "http://localhost:3000");
    await page.click("button[type='submit']");
    await expect(page.getByText("LOCALHOST_REJECTED")).toBeVisible();
    await expect(page.getByText("prohibited")).toBeVisible();
  });

  test("PDF page blocks SSRF metadata target", async ({ page }) => {
    await page.goto("/tools/website/pdf");
    await page.fill("#target-url-input-pdf", "http://169.254.169.254");
    await page.click("button[type='submit']");
    await expect(page.getByText("CLOUD_METADATA_REJECTED")).toBeVisible();
  });

  test("Inspector page inspects public domain", async ({ page }) => {
    await page.goto("/tools/website/inspect");
    await page.fill("#target-url-input-inspect", "https://example.com");
    await page.click("button[type='submit']");
    await expect(page.getByText("200 OK").first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("Security Response Headers Audit")).toBeVisible();
  });
});
