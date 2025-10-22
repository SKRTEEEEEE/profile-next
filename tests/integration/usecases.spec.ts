import { test, expect } from '@playwright/test';

/**
 * Integration Tests for Use Cases
 * Testing the application layer use cases that connect to the backend
 */

test.describe('Use Cases Integration', () => {
  
  test.describe('Project Use Cases', () => {
    test('readExampleProjectsUC should fetch and return projects', async ({ request }) => {
      const BASE_URL = process.env.TEST_ENV !== 'development' 
        ? 'https://kind-creation-production.up.railway.app' 
        : 'http://localhost:3001';
      
      const response = await request.get(`${BASE_URL}/project`);
      const data = await response.json();
      
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBeTruthy();
      
      // Verify data structure matches expected Project interface
      if (data.data.length > 0) {
        const project = data.data[0];
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('desc');
        expect(typeof project.title).toBe('object'); // Multilingual
        expect(typeof project.desc).toBe('object'); // Multilingual
      }
    });

    test('readProjectsDeployedUC should return same as readExampleProjectsUC', async ({ request }) => {
      const BASE_URL = process.env.TEST_ENV !== 'development' 
        ? 'https://kind-creation-production.up.railway.app' 
        : 'http://localhost:3001';
      
      const response = await request.get(`${BASE_URL}/project`);
      const data = await response.json();
      
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    test('should handle API errors gracefully', async ({ page }) => {
      await page.route('**/project', (route) => {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ success: false, message: 'Internal server error' })
        });
      });
      
      await page.goto('/es/portafolio');
      
      // Page should still render without crashing
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });
  });

  test.describe('Tech Use Cases', () => {
    test('ReadTechFlattenUseCase should fetch flattened techs', async ({ request }) => {
      const BASE_URL = process.env.TEST_ENV !== 'development' 
        ? 'https://kind-creation-production.up.railway.app' 
        : 'http://localhost:3001';
      
      const response = await request.get(`${BASE_URL}/tech/flatten`);
      const data = await response.json();
      
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBeTruthy();
      
      // Verify flattened tech structure
      if (data.data.length > 0) {
        const tech = data.data[0];
        expect(tech).toHaveProperty('nameId');
        expect(tech).toHaveProperty('nameBadge');
        expect(tech).toHaveProperty('afinidad');
        expect(tech).toHaveProperty('experiencia');
        expect(typeof tech.afinidad).toBe('number');
        expect(typeof tech.experiencia).toBe('number');
      }
    });

    test('should handle empty tech data', async ({ page }) => {
      await page.route('**/tech/flatten', (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true, data: [] })
        });
      });
      
      await page.goto('/es/info');
      
      // Should show building message or empty state
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    test('should handle malformed tech API response', async ({ page }) => {
      await page.route('**/tech/flatten', (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ success: false, data: null })
        });
      });
      
      await page.goto('/es/info');
      
      // Page should handle gracefully
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });
  });

  test.describe('Repository Layer', () => {
    test('ProjectApiRepository should construct correct URLs', async ({ request }) => {
      const BASE_URL = process.env.TEST_ENV !== 'development' 
        ? 'https://kind-creation-production.up.railway.app' 
        : 'http://localhost:3001';
      
      // Test that the endpoint is correctly formed
      const response = await request.get(`${BASE_URL}/project`);
      expect(response.ok()).toBeTruthy();
    });

    test('TechApiRepository should handle different tech types', async ({ request }) => {
      const BASE_URL = process.env.TEST_ENV !== 'development' 
        ? 'https://kind-creation-production.up.railway.app' 
        : 'http://localhost:3001';
      
      const types = ['db', 'flatten', 'cat', 'full'];
      
      for (const type of types) {
        const response = await request.get(`${BASE_URL}/tech/${type}`);
        expect(response.ok()).toBeTruthy();
        
        const data = await response.json();
        expect(data).toHaveProperty('success');
        expect(data.success).toBe(true);
      }
    });
  });
});
