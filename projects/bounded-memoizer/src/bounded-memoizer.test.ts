import assert from "node:assert/strict";
import test from "node:test";

import { BoundedMemoizer } from "./bounded-memoizer.js";

test("computes once for a cached key", () => {
  const memo = new BoundedMemoizer<string, number>(2);
  let calls = 0;
  assert.equal(memo.getOrCompute("a", () => ++calls), 1);
  assert.equal(memo.getOrCompute("a", () => ++calls), 1);
  assert.equal(calls, 1);
});

test("evicts the least recently used key", () => {
  const memo = new BoundedMemoizer<string, number>(2);
  memo.getOrCompute("a", () => 1);
  memo.getOrCompute("b", () => 2);
  memo.getOrCompute("a", () => 9);
  memo.getOrCompute("c", () => 3);
  assert.equal(memo.has("a"), true);
  assert.equal(memo.has("b"), false);
  assert.equal(memo.has("c"), true);
});

test("supports cached undefined values", () => {
  const memo = new BoundedMemoizer<string, undefined>(1);
  let calls = 0;
  memo.getOrCompute("x", () => { calls += 1; return undefined; });
  memo.getOrCompute("x", () => { calls += 1; return undefined; });
  assert.equal(calls, 1);
});
