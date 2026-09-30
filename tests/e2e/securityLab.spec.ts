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

test.describe("Snow Security Lab Phase 4 Realism, Matrix Immersion & Operator UX Polish", () => {
  test("renders operator workstation and category navigation without Red/Blue primary dominance", async ({ page }) => {
    await page.goto("/security");
    await expect(page.locator("h1")).toContainText("OPERATIONS");
    await expect(page.getByText("SNOW SECURITY LAB // OPERATOR WORKSTATION", { exact: true })).toBeVisible();

    // Verify categories exist
    await expect(page.locator('button[data-category="recon"]')).toBeVisible();
    await expect(page.locator('button[data-category="credentials"]')).toBeVisible();
    await expect(page.locator('button[data-category="network"]')).toBeVisible();
    await expect(page.locator('button[data-category="web"]')).toBeVisible();
    await expect(page.locator('button[data-category="exploitation"]')).toBeVisible();
    await expect(page.locator('button[data-category="forensics"]')).toBeVisible();
    await expect(page.locator('button[data-category="missions"]')).toBeVisible();

    // Verify Red Team / Blue Team buttons are not in primary control bar
    await expect(page.getByRole("button", { name: "RED TEAM" })).not.toBeVisible();
    await expect(page.getByRole("button", { name: "BLUE TEAM" })).not.toBeVisible();
  });

  test("runs recon operation and updates state progressively", async ({ page }) => {
    await page.goto("/security");
    await page.locator('button[data-category="recon"]').click();
    await page.getByRole("button", { name: "▶ RUN OPERATION" }).click();
    await expect(page.getByText("RUNNING", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("PORT ENUMERATION")).toBeVisible({ timeout: 5000 });
  });

  test("runs flagship brute force auth engine operation with full control lifecycle", async ({ page }) => {
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

  test("brute force reaches deterministic completion and reports the result", async ({ page }) => {
    await page.goto("/security");
    await page.locator('button[data-category="credentials"]').click();
    await page.getByRole("button", { name: "▶ RUN OPERATION" }).click();

    await expect(page.getByText("CREDENTIAL MATCH: operator / snow-lab-2025!", { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("100%", { exact: true })).toBeVisible();
    await expect(page.getByText("SUCCESS", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("CREDENTIAL MATCH FOUND: operator / snow-lab-2025!", { exact: true })).toBeVisible();
    await expect(page.locator(".security-terminal-output").getByText(/CREDENTIAL MATCH FOUND: operator \/ snow-lab-2025!/)).toBeVisible();
  });

  test("mounts the Matrix atmosphere in normal and reduced-motion modes", async ({ page }) => {
    await page.goto("/security");
    await expect(page.getByTestId("security-matrix").first()).toBeVisible();
    await expect(page.getByTestId("security-matrix").first().locator("canvas")).toBeVisible();

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(page.getByTestId("security-matrix").first()).toBeVisible();
    await expect(page.getByLabel("Type a Security Lab command")).toBeVisible();
  });

  test("terminal command execution connects to workstation state and shows output", async ({ page }) => {
    await page.goto("/security");
    const input = page.getByLabel("Type a Security Lab command");
    await input.fill("bruteforce");
    await input.press("Enter");
    await expect(page.locator('button[data-op="brute-force"]')).toBeVisible();

    await input.fill("help");
    await input.press("Enter");
    await expect(page.getByText("AVAILABLE WORKSTATION COMMANDS", { exact: true })).toBeVisible();

    await input.fill("targets");
    await input.press("Enter");
    await expect(page.locator(".security-terminal-output").getByText("lab-gateway.snow.local")).toBeVisible();
  });

  test("wireshark packet lab filtering and inspector panel work", async ({ page }) => {
    await page.goto("/security");
    await page.locator('button[data-category="network"]').click();
    await page.getByRole("button", { name: "TCP", exact: true }).click();
    await expect(page.getByText("SYN · session negotiation")).toBeVisible();
    await expect(page.getByText("FRAME INSPECTION PANEL")).toBeVisible();
  });

  test("web security sandbox displays request, payload, response, and findings", async ({ page }) => {
    await page.goto("/security");
    await page.locator('button[data-category="web"]').click();
    await expect(page.getByText("SIMULATED TARGET URL")).toBeVisible();
    await expect(page.getByText("SECURITY FINDING:")).toBeVisible();
    await expect(page.getByText("Boolean SQL Injection confirmed")).toBeVisible();
  });

  test("snowploit framework console executes interactive commands", async ({ page }) => {
    await page.goto("/security");
    await page.locator('button[data-category="exploitation"]').click();
    await page.getByRole("button", { name: "snowploit > check" }).click();
    await expect(page.getByText("Checking vulnerability on lab-web-01.snow.local")).toBeVisible();
  });

  test("mobile layout has no horizontal page overflow and reduced motion functions cleanly", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/security");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await expect(page.getByLabel("Type a Security Lab command")).toBeVisible();
  });
});
