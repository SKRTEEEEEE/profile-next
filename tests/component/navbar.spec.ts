import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("Navbar Component Performance", () => {
  test("should render navbar efficiently on home page", async ({ page }) => {
    const startTime = Date.now();
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");

    // Check if navbar is rendered
    const navbar = page.locator('nav[data-orientation="horizontal"]').first();
    await expect(navbar).toBeVisible();
    
    const renderTime = Date.now() - startTime;
    console.log(`Navbar render time on home: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(2000);
  });

  test("should render navigation menu items without delay", async ({ page }) => {
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");

    // Test navigation menu visibility
    const navList = page.locator('ul[data-orientation="horizontal"]').first();
    await expect(navList).toBeVisible();

    // Count navigation items
    const navItems = navList.locator('li[data-orientation="horizontal"]');
    const count = await navItems.count();
    
    console.log(`Navbar items count: ${count}`);
    expect(count).toBeGreaterThan(0);
  });

  test("should handle navigation menu interactions efficiently", async ({ page }) => {
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");

    // Find a trigger that opens a submenu
    const menuTrigger = page.locator('[data-state="closed"][data-radix-collection-item]').first();
    
    if (await menuTrigger.count() > 0) {
      const interactionStart = Date.now();
      await menuTrigger.click();
      await page.waitForTimeout(200); // Allow animation
      const interactionTime = Date.now() - interactionStart;
      
      console.log(`Navigation menu interaction time: ${interactionTime}ms`);
      expect(interactionTime).toBeLessThan(500);
    }
  });

  test("should not cause layout shifts", async ({ page }) => {
    await page.goto(getUrl());
    
    // Measure CLS for navbar area
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value || 0;
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
        
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 3000);
      });
    });
    
    console.log(`Navbar CLS: ${cls}`);
    expect(cls).toBeLessThan(0.1);
  });
});
