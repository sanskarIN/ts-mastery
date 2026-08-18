import assert from "node:assert/strict";
import test from "node:test";

import { selectRegion } from "./multi-region-router.js";

test("selects the lowest-latency healthy region with capacity", () => {
  const selected = selectRegion([
    { name: "west", healthy: true, latencyMs: 80, availableCapacity: 10 },
    { name: "east", healthy: true, latencyMs: 40, availableCapacity: 5 },
  ]);
  assert.equal(selected.name, "east");
});

test("uses capacity and name as deterministic tie breakers", () => {
  const selected = selectRegion([
    { name: "b", healthy: true, latencyMs: 50, availableCapacity: 2 },
    { name: "a", healthy: true, latencyMs: 50, availableCapacity: 5 },
  ]);
  assert.equal(selected.name, "a");
});

test("rejects when all regions are unavailable", () => {
  assert.throws(
    () => selectRegion([{ name: "x", healthy: false, latencyMs: 1, availableCapacity: 1 }]),
    /no healthy region/,
  );
});
