import assert from "node:assert/strict";
import test from "node:test";

import { AdaptiveConcurrencyController } from "./adaptive-concurrency.js";

test("increases the limit after fast successful samples", () => {
  const controller = new AdaptiveConcurrencyController(1, 5, 100, 2);
  assert.equal(controller.observe({ latencyMs: 50, success: true }), 3);
});

test("decreases the limit after failures or high latency", () => {
  const controller = new AdaptiveConcurrencyController(1, 10, 100, 5);
  assert.equal(controller.observe({ latencyMs: 50, success: false }), 4);
  assert.equal(controller.observe({ latencyMs: 150, success: true }), 3);
});

test("stays within configured bounds", () => {
  const controller = new AdaptiveConcurrencyController(2, 3, 100, 2);
  controller.observe({ latencyMs: 10, success: false });
  assert.equal(controller.limit, 2);
  controller.observe({ latencyMs: 10, success: true });
  controller.observe({ latencyMs: 10, success: true });
  assert.equal(controller.limit, 3);
});
