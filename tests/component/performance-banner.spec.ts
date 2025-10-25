import { test, expect } from '@playwright/test';

test.describe('PerformanceBanner Component', () => {
  const locales = ['en', 'es', 'ca', 'de'];
  
  for (const locale of locales) {
    test(`should render banner correctly in ${locale}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/${locale}/perf`);
      
      const banner = page.locator('[data-testid="performance-banner"]');
      await expect(banner).toBeVisible();
    });

    test(`should have translated content in ${locale}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/${locale}/perf`);
      
      const banner = page.locator('[data-testid="performance-banner"]');
      const text = await banner.textContent();
      
      // Banner should have meaningful text content
      expect(text).toBeTruthy();
      expect(text!.length).toBeGreaterThan(10);
      
      // Should contain localized text (not placeholder keys)
      expect(text).not.toContain('perf.banner');
    });

    test(`should have working link to original page in ${locale}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/${locale}/perf`);
      
      const banner = page.locator('[data-testid="performance-banner"]');
      const link = banner.locator('a');
      
      await expect(link).toBeVisible();
      
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      
      // Link should point to non-perf version
      expect(href).not.toContain('/perf');
      
      // Link should maintain locale
      expect(href).toContain(`/${locale}`);
    });

    test(`should be dismissible (if implemented) in ${locale}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/${locale}/perf`);
      
      const banner = page.locator('[data-testid="performance-banner"]');
      await expect(banner).toBeVisible();
      
      // Check if there's a close button
      const closeButton = banner.locator('[data-testid="banner-close"]');
      const hasCloseButton = await closeButton.count() > 0;
      
      if (hasCloseButton) {
        await closeButton.click();
        
        // Banner should be hidden after clicking close
        await expect(banner).not.toBeVisible();
      }
    });

    test(`should have proper styling in ${locale}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/${locale}/perf`);
      
      const banner = page.locator('[data-testid="performance-banner"]');
      
      // Check banner has background color
      const backgroundColor = await banner.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      expect(backgroundColor).toBeTruthy();
      expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
    });

    test(`should be keyboard accessible in ${locale}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/${locale}/perf`);
      
      const banner = page.locator('[data-testid="performance-banner"]');
      const link = banner.locator('a');
      
      // Focus on the link
      await link.focus();
      
      // Check if link is focused
      const isFocused = await link.evaluate((el) => {
        return document.activeElement === el;
      });
      
      expect(isFocused).toBe(true);
    });
  }

  test('should render consistently across all perf pages', async ({ page }) => {
    const perfPages = ['/perf', '/portafolio/perf', '/info/perf'];
    
    for (const perfPage of perfPages) {
      await page.goto(`http://localhost:3000/es${perfPage}`);
      
      const banner = page.locator('[data-testid="performance-banner"]');
      await expect(banner).toBeVisible();
      
      // Banner should have consistent structure
      const link = banner.locator('a');
      await expect(link).toBeVisible();
    }
  });
});
