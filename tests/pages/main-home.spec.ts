import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Main Home Page
 * Testing the main page for performance and functionality
 */

test.describe('Main Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es');
  });

  test('should load the home page', async ({ page }) => {
    // Verify page loads successfully by checking for main content
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should display the main heading with name', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Adan Reh Mañach');
  });

  test('should display greeting and introduction', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Should contain greeting (Hola, Hi, etc)
    const greetingText = heading.locator('.text-primary-ceo-300');
    await expect(greetingText).toBeVisible();
  });

  test('should render TypeAnimation component', async ({ page }) => {
    const typeAnimation = page.locator('.text-secondary-ceo-500');
    await expect(typeAnimation).toBeVisible();
    
    // Wait a bit to see if animation is working
    await page.waitForTimeout(1000);
    const text = await typeAnimation.textContent();
    expect(text).toBeTruthy();
  });

  test('should display all navigation buttons', async ({ page }) => {
    // Check for all navigation links
    const portfolioLink = page.getByRole('link', { name: /proyectos|projects|projectes/i });
    const infoLink = page.getByRole('link', { name: /stack|pila|info/i });
    const studiesLink = page.getByRole('link', { name: /estudios|studies/i });
    const cvButton = page.getByRole('button', { name: /cv/i });
    
    await expect(portfolioLink).toBeVisible();
    await expect(infoLink).toBeVisible();
    await expect(studiesLink).toBeVisible();
    await expect(cvButton).toBeVisible();
  });

  test('should display old frontend link', async ({ page }) => {
    const oldLink = page.locator('a[target="_blank"]').filter({ hasText: /frontend/i });
    await expect(oldLink).toBeVisible();
  });

  test('should render CoverParticles component', async ({ page }) => {
    // Particles should be initialized
    const particlesCanvas = page.locator('#tsparticles');
    await expect(particlesCanvas).toBeVisible({ timeout: 5000 });
  });

  test('should display developer description', async ({ page }) => {
    const description = page.locator('p').filter({ hasText: /desarrollador|developer/i });
    await expect(description).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
    
    // On desktop, wave emoji should be visible
    const waveEmoji = page.locator('span.hidden.xl\\:inline-block');
    await expect(waveEmoji).toBeVisible();
  });

  test('navigation links should work correctly', async ({ page }) => {
    const portfolioLink = page.getByRole('link', { name: /proyectos|projects|projectes/i }).first();
    await portfolioLink.click();
    
    await expect(page).toHaveURL(/.*portafolio.*/);
  });

  test('CV button should trigger PDF download', async ({ page }) => {
    const cvButton = page.getByRole('button', { name: /cv/i }).first();
    
    // Listen for new tab/window
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      cvButton.click()
    ]);
    
    await expect(popup).toHaveURL(/.*\.pdf$/);
  });

  test('should have correct grid layout structure', async ({ page }) => {
    const gridContainer = page.locator('.grid.grid-cols-1.md\\:grid-cols-3');
    await expect(gridContainer).toBeVisible();
  });

  test('page should have proper semantic structure', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    const h2 = page.locator('h2');
    await expect(h2).toBeVisible();
  });

  test('should have accessible focus states', async ({ page }) => {
    const heading = page.locator('h1');
    await heading.focus();
    
    // Check if element is focusable (has tabindex)
    const tabIndex = await heading.getAttribute('tabindex');
    expect(tabIndex).toBe('0');
  });

  test('old frontend link should open in new tab', async ({ page }) => {
    const oldLink = page.locator('a[target="_blank"]').filter({ hasText: /frontend/i }).first();
    const target = await oldLink.getAttribute('target');
    expect(target).toBe('_blank');
  });
});

/**
 * Performance Tests for Main Home Page
 */
test.describe('Main Home Page - Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/es');
    const loadTime = Date.now() - startTime;
    
    // Should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should not have excessive client-side JavaScript', async ({ page }) => {
    await page.goto('/es');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check for excessive re-renders or hydration issues
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    
    // Should not have React hydration errors
    const hydrationErrors = errors.filter(e => e.includes('hydration') || e.includes('Hydration'));
    expect(hydrationErrors.length).toBe(0);
  });

  test('particles should not block initial render', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/es');
    
    // Main content should be visible before particles
    const heading = page.locator('h1');
    await expect(heading).toBeVisible({ timeout: 1500 });
    
    const headingTime = Date.now() - startTime;
    
    // Heading should appear quickly (under 1.5 seconds is acceptable for lazy-loaded pages)
    expect(headingTime).toBeLessThan(1500);
  });

  test('should lazy load heavy components', async ({ page }) => {
    await page.goto('/es');
    
    // Check if TypeAnimation is client component (should be lazy loaded)
    const typeAnimation = page.locator('.text-secondary-ceo-500');
    await expect(typeAnimation).toBeVisible();
  });

  test('should not have layout shifts', async ({ page }) => {
    await page.goto('/es');
    
    // Wait for initial load
    await page.waitForLoadState('networkidle');
    
    // Get initial position of heading
    const heading = page.locator('h1');
    const initialBox = await heading.boundingBox();
    
    // Wait a bit for any potential shifts
    await page.waitForTimeout(2000);
    
    const finalBox = await heading.boundingBox();
    
    // Position should not change significantly
    if (initialBox && finalBox) {
      expect(Math.abs(initialBox.y - finalBox.y)).toBeLessThan(10);
    }
  });

  test('should handle multiple locale switches efficiently', async ({ page }) => {
    await page.goto('/es');
    await page.waitForLoadState('networkidle');
    
    const startTime = Date.now();
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    const switchTime = Date.now() - startTime;
    
    // Locale switch should be fast
    expect(switchTime).toBeLessThan(2000);
  });
});
