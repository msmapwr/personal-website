import { expect, test } from "@playwright/test";

test("home page exposes the featured project", async ({ page }) => {
  await page.goto("/#/");
  await expect(page.locator("main")).toContainText("The Second Oasis");
  await expect(page.locator("main")).toContainText("Featured project");
});

test("projects can be searched and cleared", async ({ page }) => {
  await page.goto("/#/projects");
  const search = page.getByRole("textbox").first();
  await search.fill("Create: Stratosphere");
  await expect(page.locator("main")).toContainText("Create: Stratosphere");
  await search.fill("不存在的项目");
  await expect(page.locator("main")).toContainText("No matching projects");
  await page.getByRole("button", { name: /清除筛选|Clear filters/i }).click();
  await expect(page.locator("main")).toContainText("The Second Oasis");
});

test("missing routes provide recovery actions", async ({ page }) => {
  await page.goto("/#/projects/not-found");
  await expect(page.locator("main")).toContainText("404");
  await expect(page.getByRole("link", { name: /返回首页|Back home/i })).toBeVisible();
  await expect(page.getByLabel("404").getByRole("link", { name: /项目|Projects/i })).toBeVisible();
});

test("blog detail renders rich text content", async ({ page }) => {
  await page.goto("/#/blog");
  await page.locator("main a").first().click();
  await expect(page.locator("main")).toContainText(/网站|site/i);
});
