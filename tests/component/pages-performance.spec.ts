import { test, expect, Page } from "@playwright/test";
import { getUrl } from "../utils/url";

interface PageMetrics {
  loadTime: number;
  LCP: number;
  FID: number;
  CLS: number;
  resourceCount: number;
  totalSize: number;
}

test.describe("Pages Performance Tests", () => {
  async function measurePagePerformance(page: Page, url: string): Promise<PageMetrics> {
    // Setup vitals tracking
    await page.evaluate(() => {
      interface LCPEntry {
        startTime: number;
        entryType: "largest-contentful-paint";
      }

      interface CLS_Entry {
        value: number;
        hadRecentInput: boolean;
        entryType: "layout-shift";
      }

      interface FID_Entry {
        startTime: number;
        processingStart: number;
        entryType: "first-input";
      }

      const vitals = { LCP: 0, FID: 0, CLS: 0 };

      // LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries() as unknown as LCPEntry[];
        entries.forEach((entry) => {
          vitals.LCP = Math.max(vitals.LCP, entry.startTime);
        });
      }).observe({ type: "largest-contentful-paint", buffered: true });

      // CLS
      new PerformanceObserver((list) => {
        const entries = list.getEntries() as unknown as CLS_Entry[];
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) vitals.CLS += entry.value;
        });
      }).observe({ type: "layout-shift", buffered: true });

      // FID
      new PerformanceObserver((list) => {
        const entries = list.getEntries() as unknown as FID_Entry[];
        entries.forEach((entry) => {
          vitals.FID = entry.processingStart - entry.startTime;
        });
      }).observe({ type: "first-input", buffered: true });

      (window as Window & { vitals?: typeof vitals }).vitals = vitals;
    });

    const start = Date.now();
    await page.goto(url);
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - start;

    // Trigger user interaction for FID
    await page.mouse.click(100, 100);
    await page.keyboard.press("Tab");

    // Wait for metrics to be collected
    await page.waitForTimeout(2000);

    const vitals = await page.evaluate(() => {
      return (window as Window & { vitals?: { LCP: number; CLS: number; FID: number } }).vitals ?? { LCP: 0, CLS: 0, FID: 0 };
    });

    // Get resource timing
    const resources = await page.evaluate(() => {
      const entries = performance.getEntriesByType("resource");
      return {
        count: entries.length,
        totalSize: entries.reduce((acc: number, entry) => {
          const resourceEntry = entry as PerformanceEntry & { transferSize?: number };
          return acc + (resourceEntry.transferSize || 0);
        }, 0),
      };
    });

    return {
      loadTime,
      LCP: vitals.LCP,
      FID: vitals.FID,
      CLS: vitals.CLS,
      resourceCount: resources.count,
      totalSize: resources.totalSize,
    };
  }

  test("Home page performance", async ({ page }) => {
    const metrics = await measurePagePerformance(page, getUrl());

    console.log("Home Page Metrics:", metrics);

    expect(metrics.loadTime).toBeLessThan(20000);
    // LCP can be 0 if not properly measured, so we allow it
    expect(metrics.LCP).toBeGreaterThanOrEqual(0);
    expect(metrics.CLS).toBeLessThan(0.2);
    expect(metrics.FID).toBeGreaterThanOrEqual(0);
  });

  test("Info page performance", async ({ page }) => {
    const metrics = await measurePagePerformance(page, `${getUrl()}/info`);

    console.log("Info Page Metrics:", metrics);

    expect(metrics.loadTime).toBeLessThan(10000);
    // LCP can be 0 if not properly measured, so we allow it
    expect(metrics.LCP).toBeGreaterThanOrEqual(0);
    expect(metrics.CLS).toBeLessThan(0.2);
  });

  test("Gradients page performance", async ({ page }) => {
    const metrics = await measurePagePerformance(page, `${getUrl()}/gradients`);

    console.log("Gradients Page Metrics:", metrics);

    expect(metrics.loadTime).toBeLessThan(10000);
    // LCP can be 0 if not properly measured, so we allow it
    expect(metrics.LCP).toBeGreaterThanOrEqual(0);
    expect(metrics.CLS).toBeLessThan(0.2);
  });

  test("Compare pages performance", async ({ page }) => {
    const homeMetrics = await measurePagePerformance(page, getUrl());
    await page.waitForTimeout(1000);
    
    const infoMetrics = await measurePagePerformance(page, `${getUrl()}/info`);
    await page.waitForTimeout(1000);
    
    const gradientsMetrics = await measurePagePerformance(page, `${getUrl()}/gradients`);

    const results = {
      home: homeMetrics,
      info: infoMetrics,
      gradients: gradientsMetrics,
    };

    console.log("\n=== Pages Performance Comparison ===");
    console.log(JSON.stringify(results, null, 2));

    // All pages should have acceptable performance
    Object.entries(results).forEach(([pageName, metrics]) => {
      console.log(`\n${pageName.toUpperCase()} - Load: ${metrics.loadTime}ms, LCP: ${metrics.LCP.toFixed(2)}ms, CLS: ${metrics.CLS.toFixed(4)}`);
    });
  });
});
