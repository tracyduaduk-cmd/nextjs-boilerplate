import { test, expect } from "@playwright/test";

test.describe("Snow Find My Device & Spatial Location Suite", () => {
  test("Location Console renders header, controls, and initial READY state", async ({ page }) => {
    await page.goto("/network/find");
    await expect(page.locator("h1")).toContainText("Find your place in the world.");
    await expect(page.getByText("Your location, in focus")).toBeVisible();
    await expect(page.getByRole("button", { name: "LOCATE MY DEVICE", exact: true })).toBeVisible();
    await expect(page.getByText("Location Engine Ready • Standby")).toBeVisible();
  });

  test("Mode switching toggles MAP, SATELLITE, TERRAIN, and EARTH view", async ({ page }) => {
    await page.goto("/network/find");
    await page.getByRole("button", { name: "SATELLITE" }).click();
    await page.getByRole("button", { name: "TERRAIN" }).click();
    await page.getByRole("button", { name: "EARTH" }).click();
    await expect(page.getByText("Photographic Earth · NASA Blue Marble")).toBeVisible();
  });

  test("Browser GPS Geolocation trigger resolves mock position", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ latitude: 9.8965, longitude: 8.8583, accuracy: 12 });

    await page.goto("/network/find");
    await page.getByRole("button", { name: "LOCATE MY DEVICE", exact: true }).click();

    await expect(page.getByText("9.896500°").first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("8.858300°").first()).toBeVisible();
  });

  test("Device Recovery Simulator executes with mandatory demo disclaimer", async ({ page }) => {
    await page.goto("/network/find");
    await page.getByRole("tab", { name: "Recovery Simulator" }).click();

    await expect(page.getByText("SIMULATION / DEMO MODE — DOES NOT ACTUALLY TRACK DEVICES")).toBeVisible();

    await page.fill("input[placeholder*='358249091234567']", "358249091234567");
    await page.getByRole("button", { name: /RUN RECOVERY SIMULATION/i }).click();

    await expect(page.getByText("SIMULATED BEACON RESULT")).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("link", { name: /OPEN DEMO LOCATION/i })).toBeVisible();
  });

  test("Session Trail updates and clear action works", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ latitude: 9.8965, longitude: 8.8583, accuracy: 15 });

    await page.goto("/network/find");
    await page.getByRole("button", { name: "LOCATE MY DEVICE", exact: true }).click();

    await page.getByRole("tab", { name: /Session Trail/i }).click();
    await expect(page.getByText("Fix #1")).toBeVisible({ timeout: 10000 });

    await page.getByRole("button", { name: /Clear Session/i }).click();
    await expect(page.getByText("No session trail points recorded yet.")).toBeVisible();
  });

  test("Mobile Viewport 390x844 layout check", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/network/find");
    await expect(page.locator("h1")).toContainText("Find your place in the world.");
    await expect(page.getByRole("button", { name: "LOCATE MY DEVICE", exact: true })).toBeVisible();
  });
});
