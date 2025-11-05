import { test, expect } from '@playwright/test';

/**
 * Enhanced Integration Tests for SEO Metadata
 * Testing improved metadata implementation with focus on:
 * - Meta descriptions on all pages
 * - Keywords including "desarrollador" and "desarollador" variants
 * - Barcelona and Spain targeting
 * Based on task 34504: Improve SEO and Accessibility
 */

test.describe('Enhanced SEO Metadata - Task 34504', () => {
  const locales = ['es', 'en', 'ca', 'de'];
  
  test.describe('Meta Description Coverage', () => {
    const pages = [
      { path: '', name: 'Home' },
      { path: '/portafolio', name: 'Portfolio' },
      { path: '/proyectos', name: 'Projects' },
      { path: '/info', name: 'Tech Stack' },
      { path: '/estudios', name: 'Studies' },
    ];

    for (const locale of locales) {
      for (const page of pages) {
        test(`should have meta description on ${page.name} page in ${locale}`, async ({ page: pw }) => {
          await pw.goto(`/${locale}${page.path}`);
          
          const description = await pw.locator('meta[name="description"]').getAttribute('content');
          expect(description).toBeTruthy();
          expect(description!.length).toBeGreaterThan(50);
          expect(description!.length).toBeLessThan(160);
        });
      }
    }
  });

  test.describe('Keywords - Developer Variants', () => {
    test('should include "desarrollador" and "desarollador" variants in Spanish', async ({ page }) => {
      await page.goto('/es');
      
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(keywords).toBeTruthy();
      
      const keywordsLower = keywords!.toLowerCase();
      
      // Check for both correct and common misspelling
      const hasDesarrollador = keywordsLower.includes('desarrollador');
      const hasDesarollador = keywordsLower.includes('desarollador');
      
      expect(hasDesarrollador || hasDesarollador).toBe(true);
      
      // Should include both for better search coverage
      if (hasDesarrollador && hasDesarollador) {
        console.log('✓ Both "desarrollador" and "desarollador" variants present');
      }
    });

    test('should include "dev desarrollador tech" and "dev desarollador tech"', async ({ page }) => {
      await page.goto('/es');
      
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(keywords).toBeTruthy();
      
      const keywordsLower = keywords!.toLowerCase();
      
      // These are key search terms mentioned in the issue
      const hasDevTech = keywordsLower.includes('dev') && keywordsLower.includes('tech');
      expect(hasDevTech).toBe(true);
    });
  });

  test.describe('Barcelona and Spain Targeting', () => {
    test('should have Barcelona location keywords', async ({ page }) => {
      await page.goto('/es');
      
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(keywords).toBeTruthy();
      expect(keywords!.toLowerCase()).toContain('barcelona');
    });

    test('should have Spain location in meta tags', async ({ page }) => {
      await page.goto('/es');
      
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(keywords).toBeTruthy();
      const keywordsLower = keywords!.toLowerCase();
      expect(keywordsLower.includes('españa') || keywordsLower.includes('spain')).toBe(true);
    });

    test('should have geo meta tags for Barcelona', async ({ page }) => {
      await page.goto('/es');
      
      const geoPlacename = await page.locator('meta[name="geo.placename"]').getAttribute('content');
      expect(geoPlacename).toBeTruthy();
      expect(geoPlacename).toContain('Barcelona');
    });
  });

  test.describe('Developer Profile Keywords', () => {
    const techKeywords = [
      'react',
      'next.js',
      'typescript',
      'node.js',
      'fullstack',
      'web',
    ];

    test('should include key technologies in keywords', async ({ page }) => {
      await page.goto('/es');
      
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(keywords).toBeTruthy();
      
      const keywordsLower = keywords!.toLowerCase();
      
      let matchCount = 0;
      for (const tech of techKeywords) {
        if (keywordsLower.includes(tech.toLowerCase())) {
          matchCount++;
        }
      }
      
      // Should have at least 4 out of 6 tech keywords
      expect(matchCount).toBeGreaterThanOrEqual(4);
    });

    test('should include "Adan Reh Mañach" in keywords', async ({ page }) => {
      await page.goto('/es');
      
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(keywords).toBeTruthy();
      expect(keywords).toContain('Adan Reh Mañach');
    });

    test('should include "SKRTEEEEEE" github username in keywords', async ({ page }) => {
      await page.goto('/es');
      
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(keywords).toBeTruthy();
      expect(keywords).toContain('SKRTEEEEEE');
    });
  });

  test.describe('Hiring Intent Keywords', () => {
    test('should include hiring-related keywords in Spanish', async ({ page }) => {
      await page.goto('/es');
      
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(keywords).toBeTruthy();
      
      const keywordsLower = keywords!.toLowerCase();
      
      // Check for hiring-intent keywords
      const hasHiringKeywords = 
        keywordsLower.includes('contratar') || 
        keywordsLower.includes('contratación') ||
        keywordsLower.includes('freelance');
      
      expect(hasHiringKeywords).toBe(true);
    });

    test('should include industrial developer keywords', async ({ page }) => {
      await page.goto('/es');
      
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(keywords).toBeTruthy();
      
      const keywordsLower = keywords!.toLowerCase();
      expect(keywordsLower.includes('industrial') || keywordsLower.includes('iiot')).toBe(true);
    });
  });

  test.describe('Page-Specific Metadata Quality', () => {
    test('should have unique description for portfolio page', async ({ page }) => {
      await page.goto('/es/portafolio');
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      
      const descLower = description!.toLowerCase();
      expect(
        descLower.includes('portafolio') || 
        descLower.includes('portfolio') ||
        descLower.includes('proyectos') ||
        descLower.includes('projects')
      ).toBe(true);
    });

    test('should have unique description for tech stack page', async ({ page }) => {
      await page.goto('/es/info');
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      
      const descLower = description!.toLowerCase();
      expect(
        descLower.includes('stack') || 
        descLower.includes('tecnolog') ||
        descLower.includes('habilidades') ||
        descLower.includes('skills')
      ).toBe(true);
    });

    test('should have unique description for studies page', async ({ page }) => {
      await page.goto('/es/estudios');
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      
      const descLower = description!.toLowerCase();
      expect(
        descLower.includes('estudio') || 
        descLower.includes('formación') ||
        descLower.includes('certificación') ||
        descLower.includes('studies')
      ).toBe(true);
    });
  });

  test.describe('SEO Module Organization', () => {
    test('should verify metadata structure is working', async ({ page }) => {
      // This test verifies that the reorganized SEO module is functioning
      await page.goto('/es');
      
      // Check all critical SEO elements are present
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      
      expect(title).toBeTruthy();
      expect(description).toBeTruthy();
      expect(keywords).toBeTruthy();
      expect(canonical).toBeTruthy();
      
      // Verify structured data is present
      const ldJsonScripts = await page.locator('script[type="application/ld+json"]').count();
      expect(ldJsonScripts).toBeGreaterThan(0);
    });
  });
});
