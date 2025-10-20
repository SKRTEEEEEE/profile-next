import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("ModeToggle Component Performance", () => {
  test("should render and interact efficiently", async ({ page }) => {
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");

    // Find the theme toggle button
    const themeToggle = page.locator('button[aria-haspopup="menu"]').first();
    
    // Measure initial render time
    const startTime = Date.now();
    await expect(themeToggle).toBeVisible();
    const renderTime = Date.now() - startTime;
    
    console.log(`ModeToggle render time: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(1000);

    // Measure interaction performance
    const interactionStart = Date.now();
    await themeToggle.click();
    await page.waitForSelector('[role="menu"]', { state: "visible" });
    const interactionTime = Date.now() - interactionStart;
    
    console.log(`ModeToggle interaction time: ${interactionTime}ms`);
    expect(interactionTime).toBeLessThan(500);

    // Check that menu items are present
    const lightOption = page.getByText("Light");
    const darkOption = page.getByText("Dark");
    
    await expect(lightOption).toBeVisible();
    await expect(darkOption).toBeVisible();
  });

  test("should switch themes without performance degradation", async ({ page }) => {
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");

    const themeToggle = page.locator('button[aria-haspopup="menu"]').first();
    
    // Test theme switching performance
    await themeToggle.click();
    const darkOption = page.getByText("Dark");
    
    const switchStart = Date.now();
    await darkOption.click();
    await page.waitForTimeout(100); // Allow theme to apply
    const switchTime = Date.now() - switchStart;
    
    console.log(`Theme switch time: ${switchTime}ms`);
    expect(switchTime).toBeLessThan(300);
  });
});
