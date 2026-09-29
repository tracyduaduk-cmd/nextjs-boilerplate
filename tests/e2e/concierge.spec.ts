import { test, expect } from "@playwright/test";

test.describe("Snow Intelligent AI Concierge Suite", () => {
  test("Concierge renders header, suggested prompts, and input form on /tools", async ({ page }) => {
    await page.goto("/tools");
    await expect(page.getByText("Need guidance on selecting an instrument?").first()).toBeVisible();
    await expect(
      page.getByPlaceholder("e.g. My website loads slowly and customers are complaining...")
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "My website is slow" })).toBeVisible();
  });

  test("Clicking suggested prompt populates input and triggers intent match card", async ({ page }) => {
    await page.goto("/tools");
    await page.getByRole("button", { name: "My website is slow" }).click();

    // Session transcript user message should appear
    await expect(page.getByText("My website is slow").first()).toBeVisible();

    // Recommendation card should render grounded intent MATCH
    await expect(page.getByText(/GROUNDED INTENT|INTENT MATCH/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("link", { name: /Run Speed Test Now/i })).toBeVisible();
  });

  test("Submitting prompt via form input updates conversation stream", async ({ page }) => {
    await page.goto("/tools");
    const input = page.getByPlaceholder("e.g. My website loads slowly and customers are complaining...");
    await input.fill("I want to build a custom ecommerce shop");
    await page.getByRole("button", { name: "Analyze ↗" }).click();

    await expect(page.getByText("I want to build a custom ecommerce shop").first()).toBeVisible();
    await expect(page.getByText(/Session Transcript/i)).toBeVisible();
    await expect(page.getByText(/Ecommerce/i).first()).toBeVisible({ timeout: 10000 });
  });

  test("Clear conversation resets state to IDLE", async ({ page }) => {
    await page.goto("/tools");
    await page.getByRole("button", { name: "My website is broken" }).click();
    await expect(page.getByText("Session Transcript").first()).toBeVisible({ timeout: 10000 });

    await page.getByRole("button", { name: "Clear Conversation" }).click();
    await expect(page.getByText("Session Transcript")).not.toBeVisible();
  });

  test("Responsive Viewports: 390x844, 412x915, 1280x800, 1440x900", async ({ page }) => {
    const viewports = [
      { width: 390, height: 844 },
      { width: 412, height: 915 },
      { width: 1280, height: 800 },
      { width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto("/tools");
      await expect(page.getByText("Need guidance on selecting an instrument?").first()).toBeVisible();
      await expect(
        page.getByPlaceholder("e.g. My website loads slowly and customers are complaining...")
      ).toBeVisible();
    }
  });
});
