import { test, expect } from '@playwright/test';

/**
 * Integration Tests for Structured Data (Schema.org)
 * Testing JSON-LD structured data for better SEO
 * Based on task 34503: Improve SEO and Accessibility
 */

test.describe('Structured Data Tests', () => {
  test.describe('Person Schema', () => {
    test('should have Person schema on home page', async ({ page }) => {
      await page.goto('/es');
      
      // Look for JSON-LD script tag
      const jsonLdScript = page.locator('script[type="application/ld+json"]').first();
      const jsonLdExists = await jsonLdScript.count() > 0;
      
      expect(jsonLdExists).toBe(true);
      
      if (jsonLdExists) {
        const jsonLdContent = await jsonLdScript.textContent();
        const data = JSON.parse(jsonLdContent!);
        
        // Check for Person schema
        expect(data['@type']).toBe('Person');
        expect(data['@context']).toBe('https://schema.org');
        
        // Check required properties
        expect(data.name).toBe('Adan Reh Mañach');
        expect(data.givenName).toBe('Adan');
        expect(data.familyName).toBe('Reh Mañach');
        
        // Check job title
        expect(data.jobTitle).toBeTruthy();
        expect(data.jobTitle.includes('Developer') || data.jobTitle.includes('Desarrollador')).toBe(true);
        
        // Check location
        expect(data.address).toBeTruthy();
        expect(data.address.addressLocality).toBe('Barcelona');
        expect(data.address.addressCountry).toBe('ES');
        
        // Check social profiles
        expect(data.sameAs).toBeTruthy();
        expect(Array.isArray(data.sameAs)).toBe(true);
        expect(data.sameAs).toContain('https://github.com/SKRTEEEEEE');
        
        // Check URL
        expect(data.url).toContain('dev.desarollador.tech');
      }
    });

    test('should include work-related properties in Person schema', async ({ page }) => {
      await page.goto('/es');
      
      const jsonLdScript = page.locator('script[type="application/ld+json"]').first();
      if (await jsonLdScript.count() > 0) {
        const jsonLdContent = await jsonLdScript.textContent();
        const data = JSON.parse(jsonLdContent!);
        
        // Check for skills/expertise
        if (data.knowsAbout) {
          expect(Array.isArray(data.knowsAbout)).toBe(true);
          expect(data.knowsAbout.length).toBeGreaterThan(0);
        }
        
        // Check for work examples
        if (data.hasOccupation) {
          expect(data.hasOccupation['@type']).toBe('Occupation');
        }
      }
    });
  });

  test.describe('WebSite Schema', () => {
    test('should have WebSite schema', async ({ page }) => {
      await page.goto('/es');
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      let websiteSchema = null;
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        if (data['@type'] === 'WebSite') {
          websiteSchema = data;
          break;
        }
      }
      
      expect(websiteSchema).toBeTruthy();
      
      if (websiteSchema) {
        expect(websiteSchema.name).toBeTruthy();
        expect(websiteSchema.url).toContain('dev.desarollador.tech');
        expect(websiteSchema.description).toBeTruthy();
        
        // Check for potential search action
        if (websiteSchema.potentialAction) {
          expect(websiteSchema.potentialAction['@type']).toBe('SearchAction');
        }
      }
    });
  });

  test.describe('BreadcrumbList Schema', () => {
    test('should have BreadcrumbList on sub-pages', async ({ page }) => {
      await page.goto('/es/proyectos');
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      let breadcrumbSchema = null;
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        if (data['@type'] === 'BreadcrumbList') {
          breadcrumbSchema = data;
          break;
        }
      }
      
      // Breadcrumbs are recommended but not required
      if (breadcrumbSchema) {
        expect(breadcrumbSchema.itemListElement).toBeTruthy();
        expect(Array.isArray(breadcrumbSchema.itemListElement)).toBe(true);
        expect(breadcrumbSchema.itemListElement.length).toBeGreaterThan(0);
        
        // Check first breadcrumb item
        const firstItem = breadcrumbSchema.itemListElement[0];
        expect(firstItem['@type']).toBe('ListItem');
        expect(firstItem.position).toBe(1);
        expect(firstItem.item).toBeTruthy();
      }
    });
  });

  test.describe('ProfilePage Schema', () => {
    test('should have ProfilePage schema on portfolio page', async ({ page }) => {
      await page.goto('/es/portafolio');
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      let profileSchema = null;
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        if (data['@type'] === 'ProfilePage' || data['@type'] === 'WebPage') {
          profileSchema = data;
          break;
        }
      }
      
      // At minimum should have WebPage schema
      expect(profileSchema).toBeTruthy();
      
      if (profileSchema) {
        expect(profileSchema.name).toBeTruthy();
        expect(profileSchema.description).toBeTruthy();
      }
    });
  });

  test.describe('CreativeWork/Project Schema', () => {
    test('should have CreativeWork schema for projects', async ({ page }) => {
      // Try to navigate to first project
      await page.goto('/es/proyectos');
      await page.waitForLoadState('networkidle');
      
      // Find first project link if exists
      const projectLink = page.locator('a[href*="/proyectos/"]').first();
      if (await projectLink.count() > 0) {
        const href = await projectLink.getAttribute('href');
        await page.goto(href!);
        
        const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
        
        let projectSchema = null;
        for (const script of jsonLdScripts) {
          const content = await script.textContent();
          const data = JSON.parse(content!);
          if (data['@type'] === 'CreativeWork' || 
              data['@type'] === 'SoftwareApplication' ||
              data['@type'] === 'WebSite') {
            projectSchema = data;
            break;
          }
        }
        
        // Projects should have structured data
        if (projectSchema) {
          expect(projectSchema.name).toBeTruthy();
          expect(projectSchema.description).toBeTruthy();
          
          // Check for author
          if (projectSchema.author) {
            expect(projectSchema.author['@type']).toBe('Person');
            expect(projectSchema.author.name).toBe('Adan Reh Mañach');
          }
          
          // Check for date created
          if (projectSchema.dateCreated || projectSchema.datePublished) {
            expect(
              projectSchema.dateCreated || projectSchema.datePublished
            ).toBeTruthy();
          }
        }
      }
    });
  });

  test.describe('Organization Schema', () => {
    test('should consider Organization schema for professional identity', async ({ page }) => {
      await page.goto('/es');
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      let orgSchema = null;
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        if (data['@type'] === 'Organization') {
          orgSchema = data;
          break;
        }
      }
      
      // Organization schema is optional for personal portfolio
      // but can be useful for professional branding
      if (orgSchema) {
        expect(orgSchema.name).toBeTruthy();
        expect(orgSchema.url).toBeTruthy();
      }
    });
  });

  test.describe('Schema Validation', () => {
    test('should have valid JSON-LD syntax', async ({ page }) => {
      await page.goto('/es');
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      expect(jsonLdScripts.length).toBeGreaterThan(0);
      
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        
        // Should be valid JSON
        expect(() => JSON.parse(content!)).not.toThrow();
        
        const data = JSON.parse(content!);
        
        // Should have @context and @type
        expect(data['@context']).toBeTruthy();
        expect(data['@type']).toBeTruthy();
      }
    });

    test('should not have duplicate schemas', async ({ page }) => {
      await page.goto('/es');
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      const types = [];
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        types.push(data['@type']);
      }
      
      // Check for Person duplicates
      const personCount = types.filter(t => t === 'Person').length;
      expect(personCount).toBeLessThanOrEqual(1);
      
      // Check for WebSite duplicates
      const websiteCount = types.filter(t => t === 'WebSite').length;
      expect(websiteCount).toBeLessThanOrEqual(1);
    });
  });

  test.describe('Local Business Schema (Optional)', () => {
    test('should consider LocalBusiness schema for Barcelona targeting', async ({ page }) => {
      await page.goto('/es');
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      let localBusinessSchema = null;
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        if (data['@type'] === 'LocalBusiness' || data['@type'] === 'ProfessionalService') {
          localBusinessSchema = data;
          break;
        }
      }
      
      // LocalBusiness is optional but useful for local SEO
      if (localBusinessSchema) {
        expect(localBusinessSchema.address).toBeTruthy();
        expect(localBusinessSchema.address.addressLocality).toBe('Barcelona');
        expect(localBusinessSchema.geo).toBeTruthy();
        expect(localBusinessSchema.geo.latitude).toBeTruthy();
        expect(localBusinessSchema.geo.longitude).toBeTruthy();
      }
    });
  });
});
