import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

test.skip(!process.env.PERFORMANCE_TEST, "Service Worker is only registered in production builds");

async function ready(page: Page) {
  await page.goto("/#/");
  await expect(page.locator("main")).toContainText("The Second Oasis");
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => undefined));
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
}

test("versioned startup cache preserves unrelated origin caches", async ({ page }) => {
  await page.goto("/manifest.json");
  await page.evaluate(async () => {
    await caches.open("another-app-cache");
    await caches.open("personal-website-v2");
  });
  await ready(page);
  const { version } = JSON.parse(readFileSync("package.json", "utf8"));
  const keys = await page.evaluate(() => caches.keys());
  expect(keys).toContain(`personal-website-${version}`);
  expect(keys).toContain("another-app-cache");
  expect(keys).not.toContain("personal-website-v2");
  const paths = await page.evaluate(async () => {
    const keys = await caches.keys();
    const cache = await caches.open(keys.find(key => key.startsWith("personal-website-"))!);
    return (await cache.keys()).map(request => new URL(request.url).pathname);
  });
  expect(paths.some(path => /Home-.*\.js$/.test(path))).toBe(true);
  expect(paths.some(path => /BlogPost-.*\.js$/.test(path))).toBe(false);
});

test("visited routes reload offline and reconnect clears the notice", async ({ page, context }) => {
  await ready(page);
  await page.goto("/#/projects");
  // Reload while online so the controlled page caches its route resources and
  // assertions target the settled page rather than the outgoing animation tree.
  await page.reload();
  await expect(page.locator("main")).toContainText("AsciiStudio");
  const screenshot = page.locator('img[src="images/ascii-studio/ascii-studio.png"]');
  await screenshot.scrollIntoViewIfNeeded();
  await expect(screenshot).toBeVisible();
  await expect(screenshot).toHaveAttribute("width", "1862");
  await expect(screenshot).toHaveAttribute("height", "1079");
  await expect.poll(() => screenshot.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  expect(await screenshot.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(/ascii-studio-(640|1024)\.avif$/);
  await page.waitForLoadState("networkidle");
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator("main")).toContainText("AsciiStudio");
  await expect(page.getByRole("status")).toContainText("You are offline");
  await context.setOffline(false);
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("uncached lazy pages show recovery and retry after reconnection", async ({ page, context }) => {
  await ready(page);
  await context.setOffline(true);
  await page.goto("/#/skills");
  await expect(page.getByRole("alert")).toContainText("Page could not be loaded");
  await context.setOffline(false);
  await page.getByRole("alert").getByRole("button", { name: "Retry" }).click();
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(page.locator("main")).toContainText("C#");
});

test("offline feeds stay XML and missing static assets never receive HTML", async ({ page, context }) => {
  await ready(page);
  await page.evaluate(() => fetch("./feed.xml").then(response => response.text()));
  await context.setOffline(true);
  const results = await page.evaluate(async () => {
    const feed = await fetch("./feed.xml");
    const missing = await Promise.all(["./images/not-cached.png", "./assets/not-cached.js"].map(async path => {
      try { const response = await fetch(path); return (await response.text()).includes("<html"); }
      catch { return false; }
    }));
    return { feed: await feed.text(), missing };
  });
  expect(results.feed).toContain("<rss");
  expect(results.missing).toEqual([false, false]);
});
