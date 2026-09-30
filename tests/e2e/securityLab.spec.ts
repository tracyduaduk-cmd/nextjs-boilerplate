import { test, expect } from "@playwright/test";

test.describe("Snow Security Lab Phase 2 simulation", () => {
  test("renders the shared cyber range and first-class Security navigation", async ({ page }) => {
    await page.goto("/security");
    await expect(page.locator("h1")).toContainText("controlled");
    await expect(page.getByText("SNOW // SECURITY LAB")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary studio navigation" }).getByRole("link", { name: "Security" })).toBeVisible();
    await expect(page.getByText("LOCAL SYNTHETIC GRAPH")).toBeVisible();
    await expect(page.getByRole("button", { name: /RED TEAM/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /BLUE TEAM/ })).toBeVisible();
  });

  test("terminal commands and recon update the shared topology", async ({ page }) => {
    await page.goto("/security");
    const terminal = page.getByLabel("Type a Security Lab command");
    await terminal.fill("scan --demo");
    await terminal.press("Enter");
    await expect(page.getByText("SCAN COMPLETE // 6 HOSTS / 14 SERVICES / NO EXTERNAL TRAFFIC")).toBeVisible();
    await expect(page.getByText("7 / 7 discovered")).toBeVisible();
    await expect(page.getByText("WEB-01").first()).toBeVisible();
  });

  test("credential and auth simulations feed IDS alerts", async ({ page }) => {
    await page.goto("/security");
    await page.getByRole("button", { name: /CREDENTIALS Fictional hash lab/ }).click();
    await page.getByRole("button", { name: "DICTIONARY" }).click();
    await expect(page.getByText("MATCH FOUND // snow-lab-demo — fictional fixture only")).toBeVisible();
    await page.getByRole("button", { name: /AUTH ATTACK Protocol attempt stream/ }).click();
    await page.getByRole("button", { name: /SSH → SIMULATE/ }).click();
    await expect(page.getByText("IDS ALERT // RATE LIMIT + ACCOUNT LOCK SIMULATED")).toBeVisible();
    await page.getByRole("button", { name: /IDS Alert triage & response/ }).click();
    await expect(page.getByText("AUTH FAILURE")).toBeVisible();
  });

  test("packet filtering, web sandbox, exploit console, and defense controls work", async ({ page }) => {
    await page.goto("/security");
    await page.getByRole("button", { name: /PACKETS Synthetic inspection/ }).click();
    await page.getByRole("button", { name: "TCP" }).click();
    await expect(page.getByText("SYN · session negotiation")).toBeVisible();
    await expect(page.getByText("A sandbox.snow.lab")).not.toBeVisible();
    await page.getByRole("button", { name: /WEB LAB Controlled app sandbox/ }).click();
    await page.getByRole("button", { name: "HEADERS" }).click();
    await expect(page.getByText("CSP")).toBeVisible();
    await page.getByRole("button", { name: /EXPLOIT Snowploit console/ }).click();
    await page.getByRole("button", { name: "check" }).click();
    await expect(page.getByText("TARGET VULNERABLE (SIMULATION)")).toBeVisible();
    await page.getByRole("button", { name: /FIREWALL Contain synthetic traffic/ }).click();
    await page.getByRole("button", { name: "BLOCK IP" }).click();
    await expect(page.getByText("1", { exact: true }).first()).toBeVisible();
  });

  test("Black Ice mission and Red Team / Blue Team mode are connected", async ({ page }) => {
    await page.goto("/security");
    await page.getByRole("button", { name: /BLUE TEAM/ }).click();
    await expect(page.getByText("BLUE TEAM").first()).toBeVisible();
    await page.getByRole("button", { name: /MISSIONS Black Ice progression/ }).click();
    await expect(page.getByText("BLACK ICE // MISSION CONTROL")).toBeVisible();
    await expect(page.getByText(/Mission stages react to recon/)).toBeVisible();
  });

  test("mobile layout has no horizontal overflow and reduced motion remains usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/security");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await expect(page.getByLabel("Type a Security Lab command")).toBeVisible();
    await expect(page.getByText("NO REAL TARGETS")).toBeVisible();
  });
});
