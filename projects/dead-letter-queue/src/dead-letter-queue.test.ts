import assert from "node:assert/strict";
import test from "node:test";

import { DeadLetterQueue } from "./dead-letter-queue.js";

test("stores failed messages with deterministic metadata", () => {
  const queue = new DeadLetterQueue<{ value: number }>(() => 100);
  const item = queue.enqueue("job-1", { value: 3 }, "timeout", 4);
  assert.deepEqual(item, {
    id: "job-1",
    payload: { value: 3 },
    reason: "timeout",
    attempts: 4,
    failedAt: 100,
  });
});

test("requeue removes and returns the dead letter", () => {
  const queue = new DeadLetterQueue<string>(() => 10);
  queue.enqueue("x", "payload", "bad");
  assert.equal(queue.requeue("x")?.payload, "payload");
  assert.equal(queue.size, 0);
  assert.equal(queue.requeue("missing"), undefined);
});

test("validates identifiers, reasons, and attempts", () => {
  const queue = new DeadLetterQueue<string>();
  assert.throws(() => queue.enqueue("", "x", "reason"), /id/);
  assert.throws(() => queue.enqueue("x", "x", ""), /reason/);
  assert.throws(() => queue.enqueue("x", "x", "reason", 0), RangeError);
});
