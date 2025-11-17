import { test, expect } from '@playwright/test';

/**
 * Integration Tests for SEO Metadata
 * Testing proper metadata implementation across all pages
 * Based on task 34503: Improve SEO and Accessibility
 */

test.describe('SEO Metadata - Developer Portfolio', () => {
  const locales = ['es', 'en', 'ca', 'de'];
  const keywords = [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    'desarrollador web Barcelona',
    'web developer Barcelona',
    'full stack developer',
    'desarrollador industrial',
    'industrial developer',
    'Barcelona Spain',
    'React developer',
    'Next.js developer',
    'TypeScript developer',
  ];

  test.describe('Home Page Metadata', () => {
    for (const locale of locales) {
      test(`should have proper metadata in ${locale}`, async ({ page }) => {
        await page.goto(`/${locale}`);
        
        // Check title
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(10);
        expect(title.length).toBeLessThan(60); // SEO best practice
        
        // Check meta description
        const description = await page.locator('meta[name="description"]').getAttribute('content');
        expect(description).toBeTruthy();
        expect(description!.length).toBeGreaterThan(50);
        expect(description!.length).toBeLessThan(160); // SEO best practice
        
        // Check keywords meta tag
        const keywordsMeta = await page.locator('meta[name="keywords"]').getAttribute('content');
        expect(keywordsMeta).toBeTruthy();
        
        // Verify some essential keywords are present
        const keywordsLower = keywordsMeta!.toLowerCase();
        expect(keywordsLower).toContain('barcelona');
        expect(keywordsLower.includes('developer') || keywordsLower.includes('desarrollador')).toBe(true);
      });

      test(`should have Open Graph metadata in ${locale}`, async ({ page }) => {
        await page.goto(`/${locale}`);
        
        // Check og:title
        const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
        expect(ogTitle).toBeTruthy();
        
        // Check og:description
        const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
        expect(ogDescription).toBeTruthy();
        
        // Check og:type
        const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
        expect(ogType).toBe('website');
        
        // Check og:url
        const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
        expect(ogUrl).toBeTruthy();
        expect(ogUrl).toContain('dev.desarollador.tech');
        
        // Check og:locale
        const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
        expect(ogLocale).toBeTruthy();
      });

      test(`should have Twitter Card metadata in ${locale}`, async ({ page }) => {
        await page.goto(`/${locale}`);
        
        // Check twitter:card
        const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
        expect(twitterCard).toBeTruthy();
        expect(['summary', 'summary_large_image']).toContain(twitterCard!);
        
        // Check twitter:title
        const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
        expect(twitterTitle).toBeTruthy();
        
        // Check twitter:description
        const twitterDescription = await page.locator('meta[name="twitter:description"]').getAttribute('content');
        expect(twitterDescription).toBeTruthy();
      });
    }

    test('should have canonical URL', async ({ page }) => {
      await page.goto('/es');
      
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toContain('dev.desarollador.tech');
    });

    test('should have alternate language links', async ({ page }) => {
      await page.goto('/es');
      
      const alternates = await page.locator('link[rel="alternate"]').all();
      expect(alternates.length).toBeGreaterThan(0);
      
      // Check that alternate links include different locales
      const hrefs = await Promise.all(alternates.map(link => link.getAttribute('href')));
      const hreflangs = await Promise.all(alternates.map(link => link.getAttribute('hreflang')));
      
      expect(hreflangs).toContain('en');
      expect(hreflangs).toContain('es');
      expect(hreflangs).toContain('ca');
      expect(hreflangs).toContain('de');
    });

    test('should have proper robots meta tag', async ({ page }) => {
      await page.goto('/es');
      
      const robots = await page.locator('meta[name="robots"]').getAttribute('content');
      expect(robots).toBeTruthy();
      expect(robots).toContain('index');
      expect(robots).toContain('follow');
    });

    test('should have author meta tag', async ({ page }) => {
      await page.goto('/es');
      
      const author = await page.locator('meta[name="author"]').getAttribute('content');
      expect(author).toBeTruthy();
      expect(author).toContain('Adan Reh Mañach');
    });

    test('should have location meta tags for Barcelona targeting', async ({ page }) => {
      await page.goto('/es');
      
      // Check geo.region
      const geoRegion = await page.locator('meta[name="geo.region"]').getAttribute('content');
      expect(geoRegion).toBeTruthy();
      expect(geoRegion).toContain('ES');
      
      // Check geo.placename
      const geoPlace = await page.locator('meta[name="geo.placename"]').getAttribute('content');
      expect(geoPlace).toBeTruthy();
      expect(geoPlace).toContain('Barcelona');
    });
  });

  test.describe('Projects Page Metadata', () => {
    test('should have specific metadata for projects page', async ({ page }) => {
      await page.goto('/es/proyectos');
      
      const title = await page.title();
      expect(title).toBeTruthy();
      const titleLower = title.toLowerCase();
      expect(titleLower.includes('proyectos') || titleLower.includes('projects') || titleLower.includes('portfolio')).toBe(true);
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });

    test('should have canonical URL for projects page', async ({ page }) => {
      await page.goto('/es/proyectos');
      
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toContain('proyectos');
    });
  });

  test.describe('Portfolio Page Metadata', () => {
    test('should have specific metadata for portfolio page', async ({ page }) => {
      await page.goto('/es/portafolio');
      
      const title = await page.title();
      expect(title).toBeTruthy();
      const titleLower = title.toLowerCase();
      expect(titleLower.includes('portafolio') || titleLower.includes('portfolio')).toBe(true);
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });
  });

  test.describe('Info/Tech Stack Page Metadata', () => {
    test('should have specific metadata for tech stack page', async ({ page }) => {
      await page.goto('/es/info');
      
      const title = await page.title();
      expect(title).toBeTruthy();
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      const descLower = description!.toLowerCase();
      expect(descLower.includes('tech') || descLower.includes('tecnolog') || descLower.includes('stack') || descLower.includes('habilidades')).toBe(true);
    });
  });

  test.describe('Studies Page Metadata', () => {
    test('should have specific metadata for studies page', async ({ page }) => {
      await page.goto('/es/estudios');
      
      const title = await page.title();
      expect(title).toBeTruthy();
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });
  });
});
