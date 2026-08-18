import assert from "node:assert/strict";
import test from "node:test";

import { GridSpatialIndex } from "./grid-spatial-index.js";

test("queries only points inside the requested bounds", () => {
  const index = new GridSpatialIndex<string>(10);
  index.insert({ id: "a", x: 1, y: 1, value: "A" });
  index.insert({ id: "b", x: 12, y: 12, value: "B" });
  index.insert({ id: "c", x: 8, y: 9, value: "C" });
  assert.deepEqual(index.query({ minX: 0, minY: 0, maxX: 10, maxY: 10 }).map((p) => p.id), ["a", "c"]);
});

test("supports deterministic removal", () => {
  const index = new GridSpatialIndex<number>(5);
  index.insert({ id: "x", x: -1, y: -1, value: 1 });
  assert.equal(index.remove("x"), true);
  assert.equal(index.remove("x"), false);
  assert.equal(index.size, 0);
});

test("rejects duplicates and invalid bounds", () => {
  const index = new GridSpatialIndex<number>(1);
  index.insert({ id: "x", x: 0, y: 0, value: 1 });
  assert.throws(() => index.insert({ id: "x", x: 1, y: 1, value: 2 }), /duplicate/);
  assert.throws(() => index.query({ minX: 2, minY: 0, maxX: 1, maxY: 1 }), RangeError);
});
