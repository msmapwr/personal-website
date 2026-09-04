import { expect, test } from "@playwright/test";

test("records the home page performance baseline", async ({ page }) => {
  await page.goto("/#/", { waitUntil: "load" });
  await expect(page.locator("main")).toBeVisible();

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const paints = performance.getEntriesByType("paint");
    const firstContentfulPaint = paints.find((entry) => entry.name === "first-contentful-paint");
    const resources = performance.getEntriesByType("resource");

    return {
      domContentLoaded: navigation?.domContentLoadedEventEnd ?? 0,
      load: navigation?.loadEventEnd ?? 0,
      firstContentfulPaint: firstContentfulPaint?.startTime ?? 0,
      resourceCount: resources.length,
      transferSize: resources.reduce((total, entry) => total + ((entry as PerformanceResourceTiming).transferSize || 0), 0),
    };
  });

  console.log(`PERFORMANCE_BASELINE ${JSON.stringify(metrics)}`);
  expect(metrics.domContentLoaded).toBeGreaterThan(0);
  expect(metrics.resourceCount).toBeGreaterThan(0);
});
