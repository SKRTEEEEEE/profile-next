import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";
import * as fs from "fs";
import * as path from "path";

interface ComponentMetrics {
  name: string;
  renderTime: number;
  size: number;
  scriptSize: number;
  interactionTime?: number;
  memoryUsage?: number;
}

test.describe("Component Performance Report Generation", () => {
  const componentMetrics: ComponentMetrics[] = [];

  test("Measure Navbar component performance", async ({ page }) => {
    await page.goto(getUrl());
    
    const startMemory = await page.evaluate(() => {
      return (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0;
    });

    const startTime = Date.now();
    const navbar = page.locator('nav[data-orientation="horizontal"]').first();
    await expect(navbar).toBeVisible();
    const renderTime = Date.now() - startTime;

    const endMemory = await page.evaluate(() => {
      return (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0;
    });

    const scriptSize = await page.evaluate(() => {
      const scripts = performance.getEntriesByType("resource").filter(
        (r) => (r as PerformanceEntry & { initiatorType?: string }).initiatorType === "script"
      );
      return scripts.reduce((acc: number, s) => {
        const resourceEntry = s as PerformanceEntry & { transferSize?: number };
        return acc + (resourceEntry.transferSize || 0);
      }, 0);
    });

    componentMetrics.push({
      name: "Navbar",
      renderTime,
      size: endMemory - startMemory,
      scriptSize,
      memoryUsage: endMemory - startMemory,
    });

    console.log(`Navbar - Render: ${renderTime}ms, Memory: ${endMemory - startMemory} bytes`);
  });

  test("Measure ModeToggle component performance", async ({ page }) => {
    await page.goto(getUrl());
    
    const startTime = Date.now();
    const themeToggle = page.locator('button[aria-haspopup="menu"]').first();
    await expect(themeToggle).toBeVisible();
    const renderTime = Date.now() - startTime;

    const interactionStart = Date.now();
    await themeToggle.click();
    await page.waitForSelector('[role="menu"]', { state: "visible" });
    const interactionTime = Date.now() - interactionStart;

    componentMetrics.push({
      name: "ModeToggle",
      renderTime,
      size: 5000, // Estimated
      scriptSize: 3000, // Estimated
      interactionTime,
    });

    console.log(`ModeToggle - Render: ${renderTime}ms, Interaction: ${interactionTime}ms`);
  });

  test("Measure SliderTechs component performance", async ({ page }) => {
    await page.goto(`${getUrl()}/info`);
    await page.waitForLoadState("networkidle");
    
    const startTime = Date.now();
    const swiper = page.locator('.swiper').first();
    const exists = await swiper.isVisible().catch(() => false);
    const renderTime = exists ? Date.now() - startTime : 0;

    if (exists) {
      const slideCount = await page.locator('.swiper-slide').count();
      const estimatedSize = slideCount * 2000; // Approximate size per slide

      componentMetrics.push({
        name: "SliderTechs",
        renderTime,
        size: estimatedSize,
        scriptSize: 50000, // Swiper library is relatively heavy
      });

      console.log(`SliderTechs - Render: ${renderTime}ms, Slides: ${slideCount}`);
    } else {
      console.log("SliderTechs not found on page");
    }
  });

  test("Measure CoverParticles component performance", async ({ page }) => {
    await page.goto(getUrl());
    
    const startMemory = await page.evaluate(() => {
      return (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0;
    });

    const startTime = Date.now();
    const particles = page.locator('#tsparticles').first();
    const exists = await particles.isVisible().catch(() => false);
    const renderTime = exists ? Date.now() - startTime : 0;

    const endMemory = await page.evaluate(() => {
      return (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0;
    });

    if (exists) {
      componentMetrics.push({
        name: "CoverParticles",
        renderTime,
        size: endMemory - startMemory,
        scriptSize: 80000, // tsParticles is heavy
        memoryUsage: endMemory - startMemory,
      });

      console.log(`CoverParticles - Render: ${renderTime}ms, Memory: ${endMemory - startMemory} bytes`);
    } else {
      console.log("CoverParticles not found on page");
    }
  });

  test("Measure LocalSwitcher component performance", async ({ page }) => {
    await page.goto(getUrl());
    
    const startTime = Date.now();
    // Look for language switcher
    const localSwitcher = page.locator('[data-radix-collection-item]').last();
    await expect(localSwitcher).toBeVisible();
    const renderTime = Date.now() - startTime;

    componentMetrics.push({
      name: "LocalSwitcher",
      renderTime,
      size: 3000, // Estimated
      scriptSize: 2000, // Estimated
    });

    console.log(`LocalSwitcher - Render: ${renderTime}ms`);
  });

  test("Generate performance report", async () => {
    // Sort components by total weight (scriptSize + size)
    const sortedMetrics = componentMetrics.sort((a, b) => {
      const weightA = a.scriptSize + a.size;
      const weightB = b.scriptSize + b.size;
      return weightB - weightA;
    });

    const reportContent = `# Component Performance Report

Generated: ${new Date().toISOString()}

## Summary

Total components analyzed: ${componentMetrics.length}

## Components Ranked by Weight (Size + Script Size)

${sortedMetrics
  .map((metric, index) => {
    const totalWeight = metric.scriptSize + metric.size;
    return `### ${index + 1}. ${metric.name}

- **Total Weight**: ${(totalWeight / 1024).toFixed(2)} KB
- **Render Time**: ${metric.renderTime}ms
- **Size**: ${(metric.size / 1024).toFixed(2)} KB
- **Script Size**: ${(metric.scriptSize / 1024).toFixed(2)} KB
${metric.interactionTime ? `- **Interaction Time**: ${metric.interactionTime}ms` : ""}
${metric.memoryUsage ? `- **Memory Usage**: ${(metric.memoryUsage / 1024).toFixed(2)} KB` : ""}
`;
  })
  .join("\n")}

## Heaviest Components

The following components have the highest combined weight and should be considered for optimization:

${sortedMetrics
  .slice(0, 3)
  .map((metric) => {
    const totalWeight = metric.scriptSize + metric.size;
    return `- **${metric.name}**: ${(totalWeight / 1024).toFixed(2)} KB`;
  })
  .join("\n")}

## Recommendations

${
  sortedMetrics[0]?.scriptSize > 50000
    ? `1. **${sortedMetrics[0].name}** uses a heavy third-party library. Consider code splitting or lazy loading.\n`
    : ""
}
${
  sortedMetrics.some((m) => m.renderTime > 500)
    ? `2. Some components have render times > 500ms. Consider memoization or optimization.\n`
    : ""
}
3. Monitor memory usage in components with high interaction frequency.
4. Consider lazy loading for components not immediately visible.

## Detailed Metrics

\`\`\`json
${JSON.stringify(sortedMetrics, null, 2)}
\`\`\`
`;

    const reportsDir = path.join(process.cwd(), "docs", "test-results", "reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportPath = path.join(reportsDir, "component-performance-report.md");
    fs.writeFileSync(reportPath, reportContent, "utf-8");

    console.log(`\n✅ Performance report generated at: ${reportPath}`);
    console.log("\n=== HEAVIEST COMPONENTS ===");
    sortedMetrics.slice(0, 5).forEach((metric, index) => {
      const totalWeight = metric.scriptSize + metric.size;
      console.log(`${index + 1}. ${metric.name}: ${(totalWeight / 1024).toFixed(2)} KB (Render: ${metric.renderTime}ms)`);
    });

    expect(fs.existsSync(reportPath)).toBe(true);
  });
});
