import assert from "node:assert/strict";
import test from "node:test";

import {
  contains,
  createBoundingBox,
  expand,
  fromPoints,
  intersects,
} from "./bounding-box.js";

test("checks containment including boundary points", () => {
  const box = createBoundingBox(0, 0, 10, 10);
  assert.equal(contains(box, { x: 5, y: 5 }), true);
  assert.equal(contains(box, { x: 10, y: 10 }), true);
  assert.equal(contains(box, { x: 11, y: 5 }), false);
});

test("detects intersections and expands bounds", () => {
  const a = createBoundingBox(0, 0, 2, 2);
  const b = createBoundingBox(2, 2, 4, 4);
  const c = createBoundingBox(5, 5, 6, 6);

  assert.equal(intersects(a, b), true);
  assert.equal(intersects(a, c), false);
  assert.deepEqual(expand(a, { x: -2, y: 3 }), {
    minX: -2,
    minY: 0,
    maxX: 2,
    maxY: 3,
  });
});

test("builds bounds from points and rejects invalid inputs", () => {
  assert.deepEqual(fromPoints([{ x: 2, y: 3 }, { x: -1, y: 8 }]), {
    minX: -1,
    minY: 3,
    maxX: 2,
    maxY: 8,
  });
  assert.throws(() => fromPoints([]));
  assert.throws(() => createBoundingBox(2, 0, 1, 1), RangeError);
});
