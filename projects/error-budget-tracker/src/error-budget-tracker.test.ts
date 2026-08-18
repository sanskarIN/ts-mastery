import assert from "node:assert/strict";
import test from "node:test";

import { ErrorBudgetTracker } from "./error-budget-tracker.js";

test("tracks failure rate and remaining budget", () => {
  const tracker = new ErrorBudgetTracker(0.9, 10);
  for (let i = 0; i < 9; i += 1) tracker.record(true);
  const status = tracker.record(false);
  assert.equal(status.samples, 10);
  assert.equal(status.failures, 1);
  assert.ok(Math.abs(status.observedFailureRate - 0.1) < 1e-12);
  assert.equal(status.exhausted, true);
});

test("maintains a rolling fixed-size window", () => {
  const tracker = new ErrorBudgetTracker(0.8, 2);
  tracker.record(false);
  tracker.record(true);
  const status = tracker.record(true);
  assert.equal(status.samples, 2);
  assert.equal(status.failures, 0);
  assert.equal(status.remainingFraction, 1);
});

test("validates availability and window configuration", () => {
  assert.throws(() => new ErrorBudgetTracker(1, 10), RangeError);
  assert.throws(() => new ErrorBudgetTracker(0.9, 0), RangeError);
});
