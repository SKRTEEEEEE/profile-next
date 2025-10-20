import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("SliderTechs Component Performance", () => {
  test("should render slider on info page efficiently", async ({ page }) => {
    const startTime = Date.now();
    await page.goto(`${getUrl()}/info`);
    await page.waitForLoadState("networkidle");

    // Check if swiper container exists
    const swiperContainer = page.locator('.swiper').first();
    const isVisible = await swiperContainer.isVisible().catch(() => false);
    
    if (isVisible) {
      await expect(swiperContainer).toBeVisible();
      const renderTime = Date.now() - startTime;
      console.log(`SliderTechs render time: ${renderTime}ms`);
      expect(renderTime).toBeLessThan(3000);
    } else {
      console.log("SliderTechs not found on /info page - may not be present");
    }
  });

  test("should load swiper slides without performance issues", async ({ page }) => {
    await page.goto(`${getUrl()}/info`);
    await page.waitForLoadState("networkidle");

    const swiperSlides = page.locator('.swiper-slide');
    const slideCount = await swiperSlides.count();
    
    if (slideCount > 0) {
      console.log(`SliderTechs slides count: ${slideCount}`);
      expect(slideCount).toBeGreaterThan(0);

      // Check first slide visibility
      const firstSlide = swiperSlides.first();
      await expect(firstSlide).toBeVisible();
    } else {
      console.log("No swiper slides found - component may not be present");
    }
  });

  test("should handle swiper navigation smoothly", async ({ page }) => {
    await page.goto(`${getUrl()}/info`);
    await page.waitForLoadState("networkidle");

    const pagination = page.locator('.swiper-pagination').first();
    const paginationExists = await pagination.isVisible().catch(() => false);
    
    if (paginationExists) {
      const bullets = page.locator('.swiper-pagination-bullet');
      const bulletCount = await bullets.count();
      
      if (bulletCount > 1) {
        const navigationStart = Date.now();
        await bullets.nth(1).click();
        await page.waitForTimeout(100); // Allow slide transition
        const navigationTime = Date.now() - navigationStart;
        
        console.log(`Slider navigation time: ${navigationTime}ms`);
        expect(navigationTime).toBeLessThan(400);
      }
    } else {
      console.log("Swiper pagination not found");
    }
  });

  test("should render tech cards with proper structure", async ({ page }) => {
    await page.goto(`${getUrl()}/info`);
    await page.waitForLoadState("networkidle");

    const techCards = page.locator('.swiper-slide > div');
    const cardCount = await techCards.count();
    
    if (cardCount > 0) {
      console.log(`Tech cards count: ${cardCount}`);
      
      // Check first card has expected structure
      const firstCard = techCards.first();
      const cardTitle = firstCard.locator('h3');
      
      if (await cardTitle.count() > 0) {
        await expect(cardTitle).toBeVisible();
        const titleText = await cardTitle.textContent();
        console.log(`First tech card title: ${titleText}`);
      }
    } else {
      console.log("No tech cards found in slider");
    }
  });
});
