import assert from "node:assert/strict";
import test from "node:test";

import { PriorityTaskQueue } from "./priority-task-queue.js";

test("dequeues higher priority entries first", () => {
  const queue = new PriorityTaskQueue<string>();
  queue.enqueue("low", 1);
  queue.enqueue("high", 10);
  queue.enqueue("medium", 5);

  assert.equal(queue.dequeue(), "high");
  assert.equal(queue.dequeue(), "medium");
  assert.equal(queue.dequeue(), "low");
});

test("preserves insertion order for equal priority", () => {
  const queue = new PriorityTaskQueue<string>();
  queue.enqueue("first", 3);
  queue.enqueue("second", 3);

  assert.equal(queue.dequeue(), "first");
  assert.equal(queue.dequeue(), "second");
});

test("rejects non-finite priorities", () => {
  const queue = new PriorityTaskQueue<string>();
  assert.throws(() => queue.enqueue("bad", Number.POSITIVE_INFINITY), TypeError);
});
