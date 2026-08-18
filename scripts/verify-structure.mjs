import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const partsDir = join(root, "parts");
const projectsDir = join(root, "projects");
const catalogPath = join(root, "docs", "code-catalog.json");

function fail(message) {
  console.error(`structure verification failed: ${message}`);
  process.exitCode = 1;
}

const partFolders = readdirSync(partsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (partFolders.length !== 120) {
  fail(`expected 120 part folders, found ${partFolders.length}`);
}

for (let part = 1; part <= 120; part += 1) {
  const prefix = `part-${String(part).padStart(3, "0")}-`;
  const matches = partFolders.filter((name) => name.startsWith(prefix));
  if (matches.length !== 1) {
    fail(`expected exactly one folder for Part ${part}, found ${matches.length}`);
    continue;
  }

  if (!existsSync(join(partsDir, matches[0], "README.md"))) {
    fail(`missing README.md for Part ${part}`);
  }
}

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
if (!Array.isArray(catalog.runnableGroups)) {
  fail("docs/code-catalog.json runnableGroups must be an array");
} else {
  for (const group of catalog.runnableGroups) {
    if (typeof group?.path !== "string" || !group.path) {
      fail("catalog contains a runnable group without a valid path");
      continue;
    }

    const absolute = join(root, group.path);
    if (!existsSync(absolute)) {
      fail(`catalog path does not exist: ${group.path}`);
    }
  }
}

const projectFolders = readdirSync(projectsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const project of projectFolders) {
  const projectRoot = join(projectsDir, project);
  if (!existsSync(join(projectRoot, "README.md"))) {
    fail(`project is missing README.md: ${project}`);
  }
  if (!existsSync(join(projectRoot, "src"))) {
    fail(`project is missing src/: ${project}`);
  }
}

if (!process.exitCode) {
  console.log(`structure verification passed: ${partFolders.length} parts, ${projectFolders.length} projects, ${catalog.runnableGroups.length} runnable groups`);
}
