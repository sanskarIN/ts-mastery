import assert from "node:assert/strict";
import test from "node:test";

import { lonLatToTile, tileBounds } from "./tile-coordinates.js";

test("maps the origin to the expected slippy-map tile", () => {
  assert.deepEqual(lonLatToTile(0, 0, 1), { x: 1, y: 1, z: 1 });
});

test("returns geographic bounds for the world tile", () => {
  const bounds = tileBounds({ x: 0, y: 0, z: 0 });
  assert.equal(bounds.west, -180);
  assert.equal(bounds.east, 180);
  assert.ok(bounds.north > 85 && bounds.south < -85);
});

test("validates zoom and tile ranges", () => {
  assert.throws(() => lonLatToTile(0, 0, -1), RangeError);
  assert.throws(() => tileBounds({ x: 2, y: 0, z: 1 }), RangeError);
});
