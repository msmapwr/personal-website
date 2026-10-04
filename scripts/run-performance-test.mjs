import { spawn } from "node:child_process";

const port = process.env.PERFORMANCE_PORT ?? "4183";
const env = { ...process.env, PERFORMANCE_TEST: "1", PERFORMANCE_PORT: port };
// Playwright owns one preview server and stops it after the selected test batch.
const specs = process.argv.slice(2);
const test = spawn(process.execPath, ["node_modules/@playwright/test/cli.js", "test",
  ...(specs.length ? specs : ["tests/performance-baseline.spec.ts"]),
], { env, stdio: "inherit" });
test.on("error", (error) => { console.error(error); process.exitCode = 1; });
test.on("close", (code) => { process.exitCode = code ?? 1; });
