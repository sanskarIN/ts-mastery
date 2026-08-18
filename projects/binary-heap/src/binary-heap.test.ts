import assert from "node:assert/strict";
import test from "node:test";

import { BinaryHeap } from "./binary-heap.js";

test("acts as a min heap with an ascending comparator", () => {
  const heap = new BinaryHeap<number>((a, b) => a - b);
  for (const value of [5, 1, 4, 2, 3]) heap.push(value);
  assert.deepEqual([heap.pop(), heap.pop(), heap.pop(), heap.pop(), heap.pop()], [1, 2, 3, 4, 5]);
});

test("supports custom object priorities", () => {
  const heap = new BinaryHeap<{ id: string; priority: number }>((a, b) => a.priority - b.priority);
  heap.push({ id: "low", priority: 10 });
  heap.push({ id: "high", priority: 1 });
  assert.equal(heap.peek()?.id, "high");
});

test("empty heap operations are safe", () => {
  const heap = new BinaryHeap<number>((a, b) => a - b);
  assert.equal(heap.peek(), undefined);
  assert.equal(heap.pop(), undefined);
  assert.equal(heap.size, 0);
});
