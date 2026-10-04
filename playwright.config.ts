import { defineConfig, devices } from "@playwright/test";

const port = process.env.PERFORMANCE_PORT ?? "4173";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "on-first-retry",
  },
  webServer: {
    command: process.env.PERFORMANCE_TEST
      ? `npm run preview -- --host 127.0.0.1 --port ${port} --strictPort`
      : `npm run dev -- --host 127.0.0.1 --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: {
    ...devices["Desktop Chrome"],
    ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
  } }],
});
