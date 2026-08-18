import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const partsDir = join(root, "parts");
const projectsDir = join(root, "projects");
const examplesDir = join(root, "examples");
const catalogPath = join(root, "docs", "code-catalog.json");
const failures = [];

function fail(message) {
  failures.push(message);
}

function directories(path) {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function tsFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".ts"))
    .map((entry) => entry.name);
}

const requiredFiles = [
  "README.md",
  "LICENSE",
  "BOOK_CONTENT_LICENSE.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "SUPPORT.md",
  "docs/README.md",
  "docs/GETTING_STARTED.md",
  "docs/ARCHITECTURE.md",
  "docs/API_REFERENCE.md",
  "docs/BUILD_AND_RUN.md",
  "docs/TROUBLESHOOTING.md",
  "docs/QUALITY_GATES.md",
  "docs/RELEASE_CHECKLIST.md",
  "docs/code-catalog.json",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) fail(`missing required repository file: ${file}`);
}

const partFolders = directories(partsDir);
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

let catalog;
try {
  catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
} catch (error) {
  fail(`docs/code-catalog.json is invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
  catalog = {};
}

if (catalog.totalParts !== 120) {
  fail(`catalog totalParts must equal 120, found ${String(catalog.totalParts)}`);
}

const runnableGroups = Array.isArray(catalog.runnableGroups) ? catalog.runnableGroups : [];
if (!Array.isArray(catalog.runnableGroups)) {
  fail("docs/code-catalog.json runnableGroups must be an array");
}

const catalogPaths = [];
for (const group of runnableGroups) {
  if (typeof group?.path !== "string" || !group.path) {
    fail("catalog contains a runnable group without a valid path");
    continue;
  }
  if (!(group.path.startsWith("projects/") || group.path.startsWith("examples/"))) {
    fail(`catalog runnable group must live under projects/ or examples/: ${group.path}`);
  }
  catalogPaths.push(group.path);
  if (!existsSync(join(root, group.path))) {
    fail(`catalog path does not exist: ${group.path}`);
  }
}

for (const path of new Set(catalogPaths)) {
  const count = catalogPaths.filter((value) => value === path).length;
  if (count !== 1) fail(`catalog path appears ${count} times: ${path}`);
}

const projectFolders = directories(projectsDir);
const exampleFolders = directories(examplesDir);
const actualRunnablePaths = [
  ...projectFolders.map((name) => `projects/${name}`),
  ...exampleFolders.map((name) => `examples/${name}`),
].sort();

for (const project of projectFolders) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project)) {
    fail(`project directory must use kebab-case: ${project}`);
  }
}

for (const relativePath of actualRunnablePaths) {
  const groupRoot = join(root, relativePath);
  const sourceRoot = join(groupRoot, "src");
  if (!existsSync(join(groupRoot, "README.md"))) {
    fail(`runnable group is missing README.md: ${relativePath}`);
  }
  if (!existsSync(sourceRoot)) {
    fail(`runnable group is missing src/: ${relativePath}`);
    continue;
  }
  const files = tsFiles(sourceRoot);
  const implementation = files.filter((name) => !name.endsWith(".test.ts"));
  const tests = files.filter((name) => name.endsWith(".test.ts"));
  if (implementation.length === 0) fail(`runnable group has no implementation .ts file: ${relativePath}`);
  if (tests.length === 0) fail(`runnable group has no .test.ts file: ${relativePath}`);
}

const catalogSet = new Set(catalogPaths);
const actualSet = new Set(actualRunnablePaths);
for (const path of actualRunnablePaths) {
  if (!catalogSet.has(path)) fail(`runnable group is missing from catalog: ${path}`);
}
for (const path of catalogPaths) {
  if (!actualSet.has(path)) fail(`catalog contains a non-runnable or stale path: ${path}`);
}

if (failures.length > 0) {
  console.error("structure verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `structure verification passed: ${partFolders.length} parts, ${projectFolders.length} projects, ${exampleFolders.length} examples, ${runnableGroups.length} runnable groups`,
);
