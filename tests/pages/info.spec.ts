import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Info Page
 * Testing the info/about page that displays skills and tech slider
 */

test.describe('Info Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/info');
  });

  test('should load the info page', async ({ page }) => {
    await expect(page).toHaveTitle(/.*profile.*/i);
  });

  test('should display skills section', async ({ page }) => {
    const skillsSection = page.locator('section').first();
    await expect(skillsSection).toBeVisible();
  });

  test('should display tech stack information', async ({ page }) => {
    // Check for Fullstack web JS
    const webStack = page.locator('text=Fullstack web JS');
    await expect(webStack).toBeVisible();
    
    // Check for Fullstack dApp EVM
    const dappStack = page.locator('text=Fullstack dApp');
    await expect(dappStack).toBeVisible();
  });

  test('should load SliderTechs component with data', async ({ page }) => {
    // Wait for tech data to load
    const response = page.waitForResponse(
      (resp) => resp.url().includes('/tech/flatten') && resp.status() === 200
    );
    
    await page.goto('/es/info');
    
    const apiResponse = await response;
    expect(apiResponse.ok()).toBeTruthy();
    
    const data = await apiResponse.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBeTruthy();
  });

  test('should display action buttons', async ({ page }) => {
    const buttons = page.locator('button');
    await expect(buttons).toHaveCount(2); // Tech button and Admin button
  });

  test('should render without TransitionPage/TransitionImage', async ({ page }) => {
    // Ensure no framer-motion components
    const transitionElements = page.locator('[class*="transition-page"], [class*="transition-image"]');
    await expect(transitionElements).toHaveCount(0);
  });

  test('should not display decorative images wrapped in TransitionImage', async ({ page }) => {
    // Check that images are not wrapped in motion components
    const images = page.locator('img');
    const count = await images.count();
    
    // We should have images, but they shouldn't be wrapped in TransitionImage
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const parent = images.nth(i).locator('..');
        const classList = await parent.getAttribute('class') || '';
        expect(classList).not.toContain('transition-image');
        expect(classList).not.toContain('motion');
      }
    }
  });

  test('page should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
  });

  test('page should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
  });

  test('should display heading with correct structure', async ({ page }) => {
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('should handle error state when tech API fails', async ({ page }) => {
    // Intercept and fail the API call
    await page.route('**/tech/flatten', (route) => {
      route.abort();
    });
    
    await page.goto('/es/info');
    
    // Page should still render, possibly showing building message
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
