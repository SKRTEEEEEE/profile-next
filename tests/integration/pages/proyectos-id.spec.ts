import { test, expect } from "@playwright/test";

/**
 * Integration Tests for Project Detail Page (/proyectos/[id])
 * These tests verify the project detail page functionality
 */
test.describe("Project Detail Page - /proyectos/[id]", () => {
  test.beforeEach(async ({ page }) => {
    // Note: This assumes the backend is running on localhost:3001
    // and contains test data
  });

  test("should display project detail page structure", async ({ page }) => {
    // Navigate to a test project (using a known ID from test data)
    // We'll use a placeholder for now - this should be updated with actual test data
    await page.goto("/es/proyectos");
    
    // Wait for projects list to load
    await page.waitForSelector("h1");
    
    // Get the first project link
    const firstProjectLink = page.locator('a[href*="/proyectos/"]').first();
    
    if (await firstProjectLink.isVisible()) {
      await firstProjectLink.click();
      
      // Wait for navigation
      await page.waitForURL(/.*\/proyectos\/.+/);
      
      // Verify page elements
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("article")).toBeVisible();
    }
  });

  test("should show project title and description", async ({ page }) => {
    await page.goto("/es/proyectos");
    await page.waitForSelector("h1");
    
    const firstProjectLink = page.locator('a[href*="/proyectos/"]').first();
    
    if (await firstProjectLink.isVisible()) {
      await firstProjectLink.click();
      await page.waitForURL(/.*\/proyectos\/.+/);
      
      // Check for project title
      const title = page.locator("h1");
      await expect(title).toBeVisible();
      
      // Check for description
      const description = page.locator("p");
      await expect(description.first()).toBeVisible();
    }
  });

  test("should display tech sections when available", async ({ page }) => {
    await page.goto("/es/proyectos");
    await page.waitForSelector("h1");
    
    const firstProjectLink = page.locator('a[href*="/proyectos/"]').first();
    
    if (await firstProjectLink.isVisible()) {
      await firstProjectLink.click();
      await page.waitForURL(/.*\/proyectos\/.+/);
      
      // Wait for page to fully load
      await page.waitForLoadState("networkidle");
      
      // Tech sections should be visible if project has techs
      // Use .first() to avoid strict mode violation (multiple sections may exist)
      const section = page.locator("section").first();
      await expect(section).toBeVisible();
    }
  });

  test("should have back button to projects list", async ({ page }) => {
    await page.goto("/es/proyectos");
    await page.waitForSelector("h1");
    
    const firstProjectLink = page.locator('a[href*="/proyectos/"]').first();
    
    if (await firstProjectLink.isVisible()) {
      await firstProjectLink.click();
      await page.waitForURL(/.*\/proyectos\/.+/);
      
      // Look for back button
      const backButton = page.locator('a[href*="/proyectos"]').filter({ hasText: /⬅️|volver|back/i });
      await expect(backButton.first()).toBeVisible();
    }
  });

  test("should show 404 or error message for invalid project id", async ({ page }) => {
    // Navigate to an invalid project ID
    await page.goto("/es/proyectos/invalid-project-id-999");
    
    // Should show some error message or "not found" text
    const errorText = page.getByText(/no se encontró|not found|no se pudo|error/i);
    await expect(errorText.first()).toBeVisible({ timeout: 10000 });
  });
});
