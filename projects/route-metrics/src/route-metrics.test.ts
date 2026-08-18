import assert from "node:assert/strict";
import test from "node:test";

import { haversineDistanceKm, routeDistanceKm, segmentDistancesKm } from "./route-metrics.js";

test("returns zero for identical points", () => {
  assert.equal(
    haversineDistanceKm({ longitude: 0, latitude: 0 }, { longitude: 0, latitude: 0 }),
    0,
  );
});

test("approximates one degree of longitude at the equator", () => {
  const distance = haversineDistanceKm(
    { longitude: 0, latitude: 0 },
    { longitude: 1, latitude: 0 },
  );
  assert.ok(distance > 111 && distance < 112);
});

test("calculates segment and total route distances", () => {
  const route = [
    { longitude: 0, latitude: 0 },
    { longitude: 1, latitude: 0 },
    { longitude: 2, latitude: 0 },
  ];
  const segments = segmentDistancesKm(route);
  assert.equal(segments.length, 2);
  assert.ok(Math.abs(routeDistanceKm(route) - (segments[0]! + segments[1]!)) < 1e-12);
});
