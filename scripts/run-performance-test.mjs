import { spawn } from "node:child_process";

const port = process.env.PERFORMANCE_PORT ?? "4183";
const env = { ...process.env, PERFORMANCE_TEST: "1", PERFORMANCE_PORT: port };
const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", port, "--strictPort"], {
  env,
  stdio: "inherit",
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) break;
    } catch {
      // Preview server is still starting.
    }
    await sleep(250);
  }

  const test = spawn(process.execPath, ["node_modules/@playwright/test/cli.js", "test", "tests/performance-baseline.spec.ts"], {
    env,
    stdio: "inherit",
  });
  const exitCode = await new Promise((resolve) => test.on("close", resolve));
  process.exitCode = exitCode ?? 1;
} finally {
  server.kill();
}
