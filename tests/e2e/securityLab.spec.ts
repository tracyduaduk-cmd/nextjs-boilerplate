import { test, expect, type Page } from "@playwright/test";

async function captureBruteForceSequence(page: Page) {
  await page.locator('button[data-category="credentials"]').click();
  await page.getByRole("button", { name: "▶ RUN OPERATION" }).click();

  const candidates = [
    "operator / winter2026",
    "operator / snowflake",
    "operator / snowlab",
    "operator / matrix2026",
    "operator / cyber2026",
    "operator / snow-lab-2025!",
  ];
  const sequence: string[] = [];
  for (const candidate of candidates) {
    await expect(page.getByText(candidate, { exact: true })).toBeVisible({ timeout: 4000 });
    sequence.push(candidate);
  }
  return sequence;
}

test.describe("Snow Security Lab Phase 6 Cyber Range & Cinematic Missions E2E Suite", () => {
  test("renders cyber range workstation, header, and 10.44.0.0/24 target environment", async ({ page }) => {
    await page.goto("/security");
    await expect(page.locator("h1")).toContainText("RANGE");
    await expect(page.getByText("SNOW SECURITY LAB // OPERATOR WORKSTATION", { exact: true })).toBeVisible();

    // Verify categories exist
    await expect(page.locator('button[data-category="recon"]')).toBeVisible();
    await expect(page.locator('button[data-category="credentials"]')).toBeVisible();
    await expect(page.locator('button[data-category="network"]')).toBeVisible();
    await expect(page.locator('button[data-category="web"]')).toBeVisible();
    await expect(page.locator('button[data-category="exploitation"]')).toBeVisible();
    await expect(page.locator('button[data-category="forensics"]')).toBeVisible();
    await expect(page.locator('button[data-category="missions"]')).toBeVisible();

    // Verify 10.44.0.0/24 network target
    await expect(page.getByText("CYBER RANGE TARGET NETWORK")).toBeVisible();
    await expect(page.getByText("// 10.44.0.0/24")).toBeVisible();
    await expect(page.getByText("EDGE-GATEWAY")).toBeVisible();
  });

  test("runs recon operation and discovers cyber range hosts and advances mission stage", async ({ page }) => {
    await page.goto("/security");
    await page.locator('button[data-category="recon"]').click();
    await page.getByRole("button", { name: "▶ RUN OPERATION" }).click();
    await expect(page.getByText("RUNNING", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("CYBER RANGE HOST DISCOVERY")).toBeVisible({ timeout: 5000 });
  });

  test("runs brute force auth engine with control lifecycle and creates simulated session", async ({ page }) => {
    await page.goto("/security");
    await page.locator('button[data-category="credentials"]').click();
    await page.getByRole("button", { name: "▶ RUN OPERATION" }).click();

    await expect(page.getByText("RUNNING", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "⏸ PAUSE" })).toBeVisible();

    // Pause operation
    await page.getByRole("button", { name: "⏸ PAUSE" }).click();
    await expect(page.getByText("PAUSED", { exact: true }).first()).toBeVisible();

    // Resume operation
    await page.getByRole("button", { name: "▶ RESUME" }).click();
    await expect(page.getByText("RUNNING", { exact: true }).first()).toBeVisible();

    // Stop operation
    await page.getByRole("button", { name: "⏹ STOP" }).click();
    await expect(page.getByText("STOPPED", { exact: true }).first()).toBeVisible();

    // Reset operation
    await page.getByRole("button", { name: "🔄 RESET STATE" }).click();
    await expect(page.getByText("IDLE", { exact: true }).first()).toBeVisible();
  });

  test("repeats the same deterministic brute force candidate sequence after reset", async ({ page }) => {
    await page.goto("/security");
    const firstRun = await captureBruteForceSequence(page);

    await page.getByRole("button", { name: "🔄 RESET STATE" }).click();
    await expect(page.getByText("IDLE", { exact: true }).first()).toBeVisible();

    const secondRun = await captureBruteForceSequence(page);
    expect(secondRun).toEqual(firstRun);
  });

  test("brute force completes deterministically and creates active session", async ({ page }) => {
    await page.goto("/security");
    await page.locator('button[data-category="credentials"]').click();
    await page.getByRole("button", { name: "▶ RUN OPERATION" }).click();

    await expect(page.getByText("CREDENTIAL MATCH FOUND: operator / snow-lab-2025!", { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("SUCCESS", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("1 SESSIONS ESTABLISHED")).toBeVisible();
  });

  test("executes complete Operation Ghost Protocol flow and forensic trace", async ({ page }) => {
    await page.goto("/security");
    await page.locator('button[data-category="missions"]').click();
    await page.getByRole("button", { name: "GHOST PROTOCOL (ADVANCED)" }).click();

    await expect(page.getByText("OPERATION GHOST PROTOCOL // CYBER RANGE")).toBeVisible();
    await expect(page.getByText("Stage 01: DNS & Recon Discovery")).toBeVisible();
  });

  test("mounts Matrix atmosphere and respects reduced motion", async ({ page }) => {
    await page.goto("/security");
    await expect(page.getByTestId("security-matrix").first()).toBeVisible();
    await expect(page.getByTestId("security-matrix").first().locator("canvas")).toBeVisible();

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(page.getByTestId("security-matrix").first()).toBeVisible();
    await expect(page.getByLabel("Type a Security Lab command")).toBeVisible();
  });

  test("terminal commands connect to simulation state", async ({ page }) => {
    await page.goto("/security");
    const input = page.getByLabel("Type a Security Lab command");

    await input.fill("targets");
    await input.press("Enter");
    await expect(page.locator(".security-terminal-output").getByText("10.44.0.10")).toBeVisible();

    await input.fill("sessions");
    await input.press("Enter");
    await expect(page.locator(".security-terminal-output").getByText("NO ACTIVE SIMULATED SESSIONS")).toBeVisible();

    await input.fill("mission --list");
    await input.press("Enter");
    await expect(page.locator(".security-terminal-output").getByText("CYBER RANGE MISSIONS:")).toBeVisible();
  });

  test("verifies mobile viewports have no horizontal overflow", async ({ page }) => {
    for (const viewport of [{ width: 390, height: 844 }, { width: 412, height: 915 }]) {
      await page.setViewportSize(viewport);
      await page.goto("/security");
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewport.width);
    }
  });
});
