import assert from "node:assert/strict";
import test from "node:test";

import { applyRecordPatch, diffRecord } from "./immutable-diff.js";

test("creates deterministic set and delete operations", () => {
  const patch = diffRecord({ a: 1, b: 2 }, { a: 3, c: 4 });
  assert.deepEqual(patch, [
    { type: "set", key: "a", value: 3 },
    { type: "delete", key: "b" },
    { type: "set", key: "c", value: 4 },
  ]);
});

test("applies patches without mutating the original", () => {
  const original = { a: 1, b: 2 };
  const result = applyRecordPatch(original, [
    { type: "set", key: "a", value: 9 },
    { type: "delete", key: "b" },
  ]);
  assert.deepEqual(result, { a: 9 });
  assert.deepEqual(original, { a: 1, b: 2 });
});

test("unchanged records produce no patch", () => {
  assert.deepEqual(diffRecord({ a: 1 }, { a: 1 }), []);
});
