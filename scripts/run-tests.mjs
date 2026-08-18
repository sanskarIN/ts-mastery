import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const dist = join(root, "dist");

async function findTests(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findTests(absolute));
    } else if (entry.isFile() && entry.name.endsWith(".test.js")) {
      files.push(absolute);
    }
  }
  return files;
}

let tests;
try {
  tests = (await findTests(dist)).sort();
} catch (error) {
  console.error("test discovery failed: build output is unavailable");
  console.error(error);
  process.exit(1);
}

if (tests.length === 0) {
  console.error("test discovery failed: no compiled .test.js files were found");
  process.exit(1);
}

console.log(`running ${tests.length} compiled test files`);
const child = spawn(
  process.execPath,
  ["--test", ...tests.map((file) => relative(root, file))],
  { stdio: "inherit", shell: false },
);
child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`test runner terminated by signal ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 1);
});
