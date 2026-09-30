import { test, expect } from "@playwright/test";

test.describe("Snow Security Lab simulation", () => {
  test("renders the cinematic lab and first-class Security navigation", async ({ page }) => {
    await page.goto("/security");
    await expect(page.locator("h1")).toContainText("controlled");
    await expect(page.getByText("SNOW // SECURITY LAB")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary studio navigation" }).getByRole("link", { name: "Security" })).toBeVisible();
    await expect(page.getByText("NO EXTERNAL NETWORK ACCESS")).toBeVisible();
  });

  test("runs recon, credential, and packet demo commands", async ({ page }) => {
    await page.goto("/security");
    const terminal = page.getByLabel("Type a Security Lab command");

    await terminal.fill("scan --demo");
    await terminal.press("Enter");
    await expect(page.getByText("SCAN COMPLETE // 4 HOSTS // 11 SERVICES // NO EXTERNAL TRAFFIC")).toBeVisible();
    await expect(page.getByText("10.42.0.7").first()).toBeVisible();

    await terminal.fill("password --demo");
    await terminal.press("Enter");
    await expect(page.getByText("MATCH FOUND ... snow-lab-demo")).toBeVisible();
    await expect(page.getByText("DEMO MATCH FOUND / FICTIONAL CREDENTIAL RECOVERED")).toBeVisible();

    await terminal.fill("packets --demo");
    await terminal.press("Enter");
    await expect(page.getByText("8 SYNTHETIC FRAMES OBSERVED")).toBeVisible();
    await expect(page.getByRole("button", { name: "TCP" })).toBeVisible();
    await page.getByRole("button", { name: "TCP" }).click();
    await expect(page.getByText("POST /demo/event")).not.toBeVisible();
  });

  test("inspects a synthetic packet and advances the mission foundation", async ({ page }) => {
    await page.goto("/security");
    const terminal = page.getByLabel("Type a Security Lab command");
    await terminal.fill("scan --demo");
    await terminal.press("Enter");
    await terminal.fill("packets --demo");
    await terminal.press("Enter");
    await page.getByText("12:41:02").first().click();
    await expect(page.getByText("ETHERNET ↓ IP ↓ TCP ↓ PAYLOAD")).toBeVisible();
    await page.getByRole("button", { name: "START MISSION →" }).click();
    await expect(page.getByText("OPERATION 001 // BLACK ICE")).toBeVisible();
  });

  test("has no horizontal overflow at mobile size and supports reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/security");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await expect(page.getByLabel("Type a Security Lab command")).toBeVisible();
    await expect(page.getByText("NO REAL TARGETS")).toBeVisible();
  });
});
