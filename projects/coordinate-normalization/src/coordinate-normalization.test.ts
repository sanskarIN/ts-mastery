import assert from "node:assert/strict";
import test from "node:test";

import { clampLatitude, normalizeCoordinate, normalizeLongitude } from "./coordinate-normalization.js";

test("wraps longitude into the [-180, 180) interval", () => {
  assert.equal(normalizeLongitude(190), -170);
  assert.equal(normalizeLongitude(-190), 170);
  assert.equal(normalizeLongitude(180), -180);
});

test("clamps latitude to valid geographic bounds", () => {
  assert.equal(clampLatitude(100), 90);
  assert.equal(clampLatitude(-100), -90);
  assert.equal(clampLatitude(45), 45);
});

test("normalizes complete coordinates and rejects non-finite values", () => {
  assert.deepEqual(normalizeCoordinate({ longitude: 540, latitude: 95 }), { longitude: -180, latitude: 90 });
  assert.throws(() => normalizeLongitude(Number.NaN), RangeError);
});
