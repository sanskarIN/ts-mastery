import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, normalize, resolve, sep } from "node:path";

const root = process.cwd();
const ignored = new Set([".git", "dist", "node_modules"]);
const markdownFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(absolute);
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".md") {
      markdownFiles.push(absolute);
    }
  }
}

function isExternal(target) {
  return /^(?:[a-z]+:|\/\/)/i.test(target) || target.startsWith("#");
}

function localPath(fromFile, target) {
  const withoutAnchor = target.split("#", 1)[0]?.split("?", 1)[0] ?? "";
  const decoded = decodeURIComponent(withoutAnchor);
  return resolve(dirname(fromFile), decoded || ".");
}

function withinRoot(path) {
  const normalizedRoot = normalize(root + sep);
  const normalizedPath = normalize(path);
  return normalizedPath === normalize(root) || normalizedPath.startsWith(normalizedRoot);
}

await walk(root);
const failures = [];

const linkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;
for (const file of markdownFiles.sort()) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(linkPattern)) {
    let target = match[1]?.trim();
    if (!target) continue;
    if (target.startsWith("<") && target.endsWith(">")) {
      target = target.slice(1, -1);
    }
    if (isExternal(target)) continue;

    const targetPath = localPath(file, target);
    if (!withinRoot(targetPath)) {
      failures.push(`${file}: local link escapes repository: ${target}`);
      continue;
    }

    try {
      await stat(targetPath);
    } catch {
      failures.push(`${file}: broken local link: ${target}`);
    }
  }
}

if (failures.length > 0) {
  console.error("documentation link verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`documentation link verification passed: ${markdownFiles.length} Markdown files checked`);
