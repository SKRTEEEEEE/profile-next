import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Portafolio Page
 * Testing the portfolio page that displays example projects
 */

test.describe('Portafolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/portafolio');
  });

  test('should load the portafolio page', async ({ page }) => {
    await expect(page).toHaveTitle(/.*profile.*/i);
  });

  test('should display the main heading', async ({ page }) => {
    // Look for heading elements containing portfolio-related text
    const headings = page.locator('h1');
    await expect(headings.first()).toBeVisible();
  });

  test('should display TabsSectionPortafolio component', async ({ page }) => {
    // Check for tabs or project list
    const projectContainer = page.locator('[role="tablist"], section, article').first();
    await expect(projectContainer).toBeVisible({ timeout: 10000 });
  });

  test('should load projects from backend', async ({ page }) => {
    // Wait for network request to complete
    const response = page.waitForResponse(
      (resp) => resp.url().includes('/project') && resp.status() === 200
    );
    
    await page.goto('/es/portafolio');
    
    const apiResponse = await response;
    expect(apiResponse.ok()).toBeTruthy();
    
    const data = await apiResponse.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBeTruthy();
  });

  test('should render without TransitionPage component', async ({ page }) => {
    // Ensure no framer-motion TransitionPage is used
    const transitionElements = page.locator('[class*="transition-page"]');
    await expect(transitionElements).toHaveCount(0);
  });

  test('page should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
  });

  test('page should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
  });

  test('page should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
  });
});
