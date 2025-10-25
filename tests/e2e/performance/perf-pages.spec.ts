import { test, expect } from '@playwright/test';

const locales = ['en', 'es', 'ca', 'de'];
const perfPages = [
  '/perf',
  '/portafolio/perf',
  '/info/perf',
  '/estudios/perf',
  '/code/perf',
  '/gradients/perf'
];

test.describe('Performance Pages (/perf routes)', () => {
  
  for (const locale of locales) {
    test.describe(`Locale: ${locale}`, () => {
      
      for (const perfPage of perfPages) {
        test(`should render ${perfPage} page successfully`, async ({ page }) => {
          const url = `http://localhost:3000/${locale}${perfPage}`;
          
          const response = await page.goto(url);
          expect(response?.status()).toBe(200);
          
          // Verify page loads without critical errors
          await expect(page.locator('body')).toBeVisible();
        });

        test(`should display performance banner on ${perfPage}`, async ({ page }) => {
          const url = `http://localhost:3000/${locale}${perfPage}`;
          
          await page.goto(url);
          
          // Check for performance banner presence
          const banner = page.locator('[data-testid="performance-banner"]');
          await expect(banner).toBeVisible();
          
          // Check banner contains link to original page
          const linkToOriginal = banner.locator('a');
          await expect(linkToOriginal).toBeVisible();
          
          // Verify link points to non-perf version
          const href = await linkToOriginal.getAttribute('href');
          expect(href).not.toContain('/perf');
        });

        test(`should have i18n translations on banner for ${perfPage}`, async ({ page }) => {
          const url = `http://localhost:3000/${locale}${perfPage}`;
          
          await page.goto(url);
          
          const banner = page.locator('[data-testid="performance-banner"]');
          await expect(banner).toBeVisible();
          
          // Banner should have translated text (not empty)
          const bannerText = await banner.textContent();
          expect(bannerText).toBeTruthy();
          expect(bannerText!.length).toBeGreaterThan(0);
        });

        test(`should have minimal external dependencies on ${perfPage}`, async ({ page }) => {
          const url = `http://localhost:3000/${locale}${perfPage}`;
          
          // Track network requests
          const externalRequests: string[] = [];
          
          page.on('request', request => {
            const url = request.url();
            // Track external CDN or heavy library requests
            if (url.includes('cdn') || url.includes('unpkg') || url.includes('jsdelivr')) {
              externalRequests.push(url);
            }
          });
          
          await page.goto(url);
          
          // Performance pages should minimize external dependencies
          // Allow some flexibility but keep it minimal
          expect(externalRequests.length).toBeLessThanOrEqual(5);
        });

        test(`should load quickly on ${perfPage}`, async ({ page }) => {
          const url = `http://localhost:3000/${locale}${perfPage}`;
          
          const startTime = Date.now();
          await page.goto(url);
          const loadTime = Date.now() - startTime;
          
          // Should load in less than 3 seconds on localhost
          expect(loadTime).toBeLessThan(3000);
        });

        test(`should have proper accessibility attributes on ${perfPage}`, async ({ page }) => {
          const url = `http://localhost:3000/${locale}${perfPage}`;
          
          await page.goto(url);
          
          // Check for main landmark
          const main = page.locator('main');
          await expect(main).toBeVisible();
          
          // Check all images have alt text
          const images = page.locator('img');
          const imageCount = await images.count();
          
          for (let i = 0; i < imageCount; i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            expect(alt).toBeTruthy();
          }
        });
      }
    });
  }

  test('should have all perf pages listed in lighthouserc.json', async () => {
    const fs = await import('fs');
    const path = await import('path');
    
    const lighthouseConfigPath = path.resolve(process.cwd(), 'lighthouserc.json');
    const config = JSON.parse(fs.readFileSync(lighthouseConfigPath, 'utf-8'));
    
    const urls: string[] = config.ci.collect.url;
    
    // Check that perf pages are included in lighthouse config
    for (const locale of locales) {
      for (const perfPage of perfPages) {
        const expectedUrl = `http://localhost:3000/${locale}${perfPage}`;
        const hasUrl = urls.some(url => url === expectedUrl);
        
        expect(hasUrl).toBe(true);
      }
    }
  });
});
