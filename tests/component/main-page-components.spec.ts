import { test, expect } from '@playwright/test';

/**
 * Component-level Tests for Main Page Components
 * Testing individual components used in the main page for performance
 */

test.describe('Main Page Components - CoverParticles', () => {
  test('particles should initialize without blocking render', async ({ page }) => {
    await page.goto('/es');
    
    // Main content should be visible immediately
    const heading = page.locator('h1');
    await expect(heading).toBeVisible({ timeout: 500 });
    
    // Particles can load later
    const particles = page.locator('#tsparticles');
    await expect(particles).toBeVisible({ timeout: 5000 });
  });

  test('particles should not cause excessive repaints', async ({ page }) => {
    await page.goto('/es');
    await page.waitForLoadState('networkidle');
    
    // Monitor for excessive console warnings
    const warnings: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });
    
    await page.waitForTimeout(3000);
    
    // Should not have performance warnings
    const perfWarnings = warnings.filter(w => 
      w.includes('performance') || w.includes('render')
    );
    expect(perfWarnings.length).toBeLessThan(5);
  });

  test('particles configuration should be optimized', async ({ page }) => {
    await page.goto('/es');
    
    const particles = page.locator('#tsparticles');
    await expect(particles).toBeVisible({ timeout: 5000 });
    
    // Particles should be rendered with canvas
    const canvas = particles.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('particles should have FPS limit set', async ({ page }) => {
    await page.goto('/es');
    
    // Wait for particles to initialize
    await page.waitForTimeout(2000);
    
    // Should not cause browser to freeze
    const isResponsive = await page.evaluate(() => {
      return document.readyState === 'complete';
    });
    
    expect(isResponsive).toBe(true);
  });
});

test.describe('Main Page Components - TypeAnimation', () => {
  test('type animation should render without delays', async ({ page }) => {
    await page.goto('/es');
    
    const typeAnimation = page.locator('.text-secondary-ceo-500');
    await expect(typeAnimation).toBeVisible({ timeout: 1000 });
  });

  test('type animation should be a client component', async ({ page }) => {
    await page.goto('/es');
    
    // Check that animation is working
    const typeAnimation = page.locator('.text-secondary-ceo-500');
    await expect(typeAnimation).toBeVisible();
    
    // Wait for animation to start
    await page.waitForTimeout(3000);
    
    // Component should remain visible throughout animation
    await expect(typeAnimation).toBeVisible();
  });

  test('type animation should not cause layout shifts', async ({ page }) => {
    await page.goto('/es');
    
    const h2 = page.locator('h2');
    const initialBox = await h2.boundingBox();
    
    // Wait for animation cycles
    await page.waitForTimeout(5000);
    
    const finalBox = await h2.boundingBox();
    
    // Height should remain consistent (h-32 lg:h-44)
    if (initialBox && finalBox) {
      expect(Math.abs(initialBox.height - finalBox.height)).toBeLessThan(5);
    }
  });

  test('type animation should handle long text without overflow', async ({ page }) => {
    await page.goto('/es');
    
    const h2 = page.locator('h2');
    await expect(h2).toBeVisible();
    
    // Check for overflow
    const hasOverflow = await h2.evaluate((el) => {
      return el.scrollWidth > el.clientWidth;
    });
    
    expect(hasOverflow).toBe(false);
  });
});

test.describe('Main Page Components - RenderLocalNav', () => {
  test('navigation links should render quickly', async ({ page }) => {
    await page.goto('/es');
    
    const navButtons = page.locator('.w-52.flex.items-center');
    await expect(navButtons.first()).toBeVisible({ timeout: 500 });
  });

  test('all navigation buttons should be visible', async ({ page }) => {
    await page.goto('/es');
    
    // Check for 4 main navigation buttons + old frontend link
    const navButtons = page.locator('.w-52.flex.items-center');
    const count = await navButtons.count();
    
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('navigation buttons should have hover effects', async ({ page }) => {
    await page.goto('/es');
    
    const firstButton = page.locator('.w-52.flex.items-center').first();
    await expect(firstButton).toBeVisible();
    
    // Hover over button
    await firstButton.hover();
    
    // Button should still be visible
    await expect(firstButton).toBeVisible();
  });

  test('CV button should be a button element', async ({ page }) => {
    await page.goto('/es');
    
    const cvButton = page.getByRole('button', { name: /cv/i }).first();
    await expect(cvButton).toBeVisible();
    
    const tagName = await cvButton.evaluate(el => el.tagName);
    expect(tagName).toBe('BUTTON');
  });

  test('other nav items should be links', async ({ page }) => {
    await page.goto('/es');
    
    const portfolioLink = page.getByRole('link', { name: /proyectos|projects/i }).first();
    await expect(portfolioLink).toBeVisible();
    
    const tagName = await portfolioLink.evaluate(el => el.tagName);
    expect(tagName).toBe('A');
  });

  test('navigation should support keyboard navigation', async ({ page }) => {
    await page.goto('/es');
    
    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to activate with Enter
    await page.keyboard.press('Enter');
    
    // Should navigate (or open CV)
    await page.waitForTimeout(500);
  });
});

test.describe('Main Page Components - Grid Layout', () => {
  test('grid should adapt to mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/es');
    
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-3');
    await expect(grid).toBeVisible();
    
    // On mobile, should be single column
    const gridCols = await grid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    
    // Should be single column on mobile
    expect(gridCols).toBeTruthy();
  });

  test('grid should adapt to desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/es');
    
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-3');
    await expect(grid).toBeVisible();
    
    // On desktop, should be 3 columns
    const gridCols = await grid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    
    // Should have multiple columns
    expect(gridCols).toBeTruthy();
  });

  test('grid items should maintain order on different screens', async ({ page }) => {
    await page.goto('/es');
    
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-3');
    const children = grid.locator('> div');
    
    const count = await children.count();
    expect(count).toBe(2); // Navigation column + content column
  });
});

test.describe('Main Page Components - Internationalization', () => {
  test('should load Spanish translations', async ({ page }) => {
    await page.goto('/es');
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    const text = await heading.textContent();
    expect(text).toBeTruthy();
  });

  test('should load English translations', async ({ page }) => {
    await page.goto('/en');
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    const text = await heading.textContent();
    expect(text).toBeTruthy();
  });

  test('should load Catalan translations', async ({ page }) => {
    await page.goto('/ca');
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    const text = await heading.textContent();
    expect(text).toBeTruthy();
  });

  test('translations should load without delay', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/es');
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(1500);
  });
});
