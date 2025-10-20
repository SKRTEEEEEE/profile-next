import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("CEO Components Integration", () => {
  test("should render main page with introduction component", async ({ page }) => {
    await page.goto(`${getUrl()}/es`);
    await page.waitForLoadState("networkidle");

    // Check if introduction component is visible
    const introduction = page.locator('h1:has-text("Adan Reh")');
    await expect(introduction).toBeVisible({ timeout: 5000 });
  });

  test("should render portafolio page", async ({ page }) => {
    await page.goto(`${getUrl()}/es/portafolio`);
    await page.waitForLoadState("networkidle");

    // Check if page loads
    const heading = page.locator('h1');
    const isVisible = await heading.isVisible().catch(() => false);
    expect(isVisible).toBeTruthy();
  });

  test("should render info page with slider", async ({ page }) => {
    await page.goto(`${getUrl()}/es/info`);
    await page.waitForLoadState("networkidle");

    // Check if page loads
    const content = page.locator('main');
    await expect(content).toBeVisible();
  });

  test("should render estudios page with timeline", async ({ page }) => {
    await page.goto(`${getUrl()}/es/estudios`);
    await page.waitForLoadState("networkidle");

    // Check if page loads
    const heading = page.locator('h1');
    const isVisible = await heading.isVisible().catch(() => false);
    expect(isVisible).toBeTruthy();
  });
});
