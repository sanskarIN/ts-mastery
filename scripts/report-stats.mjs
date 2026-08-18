import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function directories(path) {
  return readdirSync(path, { withFileTypes: true }).filter((entry) => entry.isDirectory());
}

function countTests(rootDir) {
  let count = 0;
  for (const entry of readdirSync(rootDir, { withFileTypes: true })) {
    const absolute = join(rootDir, entry.name);
    if (entry.isDirectory()) {
      count += countTests(absolute);
    } else if (entry.isFile() && entry.name.endsWith(".test.ts")) {
      count += 1;
    }
  }
  return count;
}

const catalog = JSON.parse(readFileSync(join(root, "docs", "code-catalog.json"), "utf8"));
const stats = {
  parts: directories(join(root, "parts")).length,
  projects: directories(join(root, "projects")).length,
  examples: directories(join(root, "examples")).length,
  runnableGroups: Array.isArray(catalog.runnableGroups) ? catalog.runnableGroups.length : 0,
  testFiles: countTests(join(root, "projects")) + countTests(join(root, "examples")),
  expectedTestCases: catalog.validation?.expectedRepositoryTestCount ?? null,
};

console.log(JSON.stringify(stats, null, 2));
