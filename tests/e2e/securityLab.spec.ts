import { test, expect } from "@playwright/test";

test.describe("Snow Security Lab Phase 3 Realistic Operations Experience", () => {
  test("renders the hacker workstation and category navigation", async ({ page }) => {
    await page.goto("/security");
    await expect(page.locator("h1")).toContainText("HACKER");
    await expect(page.getByText("SNOW SECURITY LAB // PHASE 3 OPERATIONS")).toBeVisible();
    await expect(page.getByRole("button", { name: "RECON [1]" })).toBeVisible();
    await expect(page.getByRole("button", { name: "CREDENTIALS [3]" })).toBeVisible();
    await expect(page.getByRole("button", { name: "NETWORK [1]" })).toBeVisible();
    await expect(page.getByRole("button", { name: "WEB [1]" })).toBeVisible();
    await expect(page.getByRole("button", { name: "EXPLOITATION [1]" })).toBeVisible();
    await expect(page.getByRole("button", { name: "FORENSICS [1]" })).toBeVisible();
    await expect(page.getByRole("button", { name: "MISSIONS [1]" })).toBeVisible();
  });

  test("runs recon operation and updates state asynchronously", async ({ page }) => {
    await page.goto("/security");
    await page.getByRole("button", { name: "RECON [1]" }).click();
    await page.getByRole("button", { name: "▶ RUN OPERATION" }).click();
    await expect(page.getByText("RUNNING", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("PORT ENUMERATION")).toBeVisible({ timeout: 5000 });
  });

  test("runs brute force auth engine operation with controls", async ({ page }) => {
    await page.goto("/security");
    await page.getByRole("button", { name: "CREDENTIALS [3]" }).click();
    await page.getByRole("button", { name: "▶ RUN OPERATION" }).click();
    await expect(page.getByText("RUNNING", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "⏸ PAUSE" })).toBeVisible();
    await page.getByRole("button", { name: "⏸ PAUSE" }).click();
    await expect(page.getByText("PAUSED", { exact: true }).first()).toBeVisible();
    await page.getByRole("button", { name: "▶ RESUME" }).click();
    await expect(page.getByText("RUNNING", { exact: true }).first()).toBeVisible();
    await page.getByRole("button", { name: "⏹ STOP" }).click();
    await expect(page.getByText("STOPPED", { exact: true }).first()).toBeVisible();
  });

  test("terminal command execution connects to workstation state", async ({ page }) => {
    await page.goto("/security");
    const input = page.getByLabel("Type a Security Lab command");
    await input.fill("bruteforce");
    await input.press("Enter");
    await expect(page.getByText("Brute Force Auth Engine")).toBeVisible();
    await input.fill("help");
    await input.press("Enter");
    await expect(page.getByText("AVAILABLE WORKSTATION COMMANDS")).toBeVisible();
  });

  test("packet lab filtering and details inspector work", async ({ page }) => {
    await page.goto("/security");
    await page.getByRole("button", { name: "NETWORK [1]" }).click();
    await page.getByRole("button", { name: "TCP", exact: true }).click();
    await expect(page.getByText("SYN · session negotiation")).toBeVisible();
  });

  test("mobile layout has no horizontal overflow and reduced motion remains usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/security");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await expect(page.getByLabel("Type a Security Lab command")).toBeVisible();
  });
});
