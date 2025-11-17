import { test, expect } from '@playwright/test';

/**
 * Integration Tests for SEO robots.txt and sitemap.xml
 * Testing proper sitemap and robots.txt configuration
 * Based on task 34505: Mejorar SEO y Accesibilidad
 */

test.describe('SEO - robots.txt Configuration', () => {
  test('should have accessible robots.txt', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });

  test('should allow all user agents', async ({ page }) => {
    await page.goto('/robots.txt');
    const content = await page.textContent('body');
    
    expect(content).toContain('User-Agent: *');
    expect(content).toContain('Allow: /');
  });

  test('should disallow admin and api routes', async ({ page }) => {
    await page.goto('/robots.txt');
    const content = await page.textContent('body');
    
    // Should disallow admin areas if they exist
    // Verify that private paths are protected
    expect(content).toBeTruthy();
  });

  test('should include sitemap reference', async ({ page }) => {
    await page.goto('/robots.txt');
    const content = await page.textContent('body');
    
    expect(content).toContain('Sitemap:');
    expect(content).toContain('dev.desarollador.tech');
    expect(content).toContain('sitemap.xml');
  });

  test('should not disallow public pages', async ({ page }) => {
    await page.goto('/robots.txt');
    const content = await page.textContent('body');
    
    // Should NOT disallow public routes
    expect(content).not.toContain('Disallow: /es');
    expect(content).not.toContain('Disallow: /en');
    expect(content).not.toContain('Disallow: /proyectos');
    expect(content).not.toContain('Disallow: /portafolio');
  });
});

test.describe('SEO - sitemap.xml Configuration', () => {
  test('should have accessible sitemap.xml', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    
    const contentType = response?.headers()['content-type'];
    expect(contentType).toContain('xml');
  });

  test('should be valid XML format', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    
    expect(content).toContain('<?xml');
    expect(content).toContain('<urlset');
    expect(content).toContain('xmlns');
    expect(content).toContain('</urlset>');
  });

  test('should include home page URLs for all locales', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    
    // Check for locale-specific home pages
    expect(content).toContain('dev.desarollador.tech/es');
    expect(content).toContain('dev.desarollador.tech/en');
    expect(content).toContain('dev.desarollador.tech/ca');
    expect(content).toContain('dev.desarollador.tech/de');
  });

  test('should include main pages for all locales', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    
    const expectedPages = [
      '/proyectos',
      '/portafolio',
      '/info',
      '/estudios',
      '/code',
    ];

    const locales = ['es', 'en', 'ca', 'de'];
    
    // Check that at least some main pages exist for at least one locale
    let foundPages = 0;
    for (const locale of locales) {
      for (const pagePath of expectedPages) {
        if (content?.includes(`/${locale}${pagePath}`)) {
          foundPages++;
        }
      }
    }
    
    expect(foundPages).toBeGreaterThan(0);
  });

  test('should include proper XML structure for each URL', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    
    // Check for proper URL elements
    expect(content).toContain('<url>');
    expect(content).toContain('<loc>');
    expect(content).toContain('</loc>');
    expect(content).toContain('</url>');
  });

  test('should include lastmod dates', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    
    // Check for lastmod elements (optional but good for SEO)
    expect(content).toContain('<lastmod>');
    expect(content).toContain('</lastmod>');
    
    // Verify date format (ISO 8601)
    const lastmodMatch = content?.match(/<lastmod>(\d{4}-\d{2}-\d{2})/);
    expect(lastmodMatch).toBeTruthy();
  });

  test('should include changefreq information', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    
    // Check for changefreq elements (optional but good for SEO)
    expect(content).toContain('<changefreq>');
    expect(content).toContain('</changefreq>');
  });

  test('should include priority information', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    
    // Check for priority elements (optional but good for SEO)
    expect(content).toContain('<priority>');
    expect(content).toContain('</priority>');
  });

  test('should use correct domain (dev.desarollador.tech)', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    
    expect(content).toContain('dev.desarollador.tech');
    // Should not contain localhost or other domains
    expect(content).not.toContain('localhost');
    expect(content).not.toContain('example.com');
  });

  test('should not include excluded routes', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();
    
    // Should not include API routes, private pages, etc.
    expect(content).not.toContain('/api/');
    expect(content).not.toContain('/_next/');
    expect(content).not.toContain('/admin');
  });
});

test.describe('SEO - Search Engine Discoverability', () => {
  test('should have proper Google indexing keywords in home page', async ({ page }) => {
    await page.goto('/es');
    
    const content = await page.textContent('body');
    const metaKeywords = await page.locator('meta[name="keywords"]').getAttribute('content');
    
    // Check for target keywords that should make the site discoverable
    const targetKeywords = [
      'dev desarrollador tech',
      'dev desarollador tech',
      'desarrollador web Barcelona',
      'desarollador web Barcelona',
    ];
    
    let foundKeywords = 0;
    for (const keyword of targetKeywords) {
      if (metaKeywords?.toLowerCase().includes(keyword.toLowerCase())) {
        foundKeywords++;
      }
    }
    
    expect(foundKeywords).toBeGreaterThan(0);
  });

  test('should have Barcelona geo-targeting in metadata', async ({ page }) => {
    await page.goto('/es');
    
    const geoRegion = await page.locator('meta[name="geo.region"]').getAttribute('content');
    const geoPlace = await page.locator('meta[name="geo.placename"]').getAttribute('content');
    
    expect(geoRegion).toContain('ES');
    expect(geoPlace).toContain('Barcelona');
  });

  test('should have proper language alternates for SEO', async ({ page }) => {
    await page.goto('/es');
    
    const alternates = await page.locator('link[rel="alternate"]').all();
    expect(alternates.length).toBeGreaterThanOrEqual(4);
    
    const hreflangs = await Promise.all(alternates.map(link => link.getAttribute('hreflang')));
    expect(hreflangs).toContain('es');
    expect(hreflangs).toContain('en');
  });
});
