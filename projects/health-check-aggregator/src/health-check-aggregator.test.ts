import assert from "node:assert/strict";
import test from "node:test";

import { HealthCheckAggregator } from "./health-check-aggregator.js";

test("returns down when any check is down", async () => {
  const health = new HealthCheckAggregator();
  health.register("database", () => ({ status: "up", detail: null }));
  health.register("queue", () => ({ status: "down", detail: "unreachable" }));

  const report = await health.evaluate();
  assert.equal(report.status, "down");
  assert.deepEqual(report.checks.map((check) => check.name), ["database", "queue"]);
});

test("turns thrown check failures into down results", async () => {
  const health = new HealthCheckAggregator();
  health.register("dependency", async () => {
    throw new Error("timeout");
  });

  const report = await health.evaluate();
  assert.equal(report.status, "down");
  assert.equal(report.checks[0]?.detail, "timeout");
});

test("supports degraded state, unregistering, and duplicate protection", async () => {
  const health = new HealthCheckAggregator();
  const unregister = health.register("cache", () => ({ status: "degraded", detail: "cold" }));
  assert.throws(() => health.register("cache", () => ({ status: "up", detail: null })));
  assert.equal((await health.evaluate()).status, "degraded");

  unregister();
  assert.equal((await health.evaluate()).status, "up");
});
