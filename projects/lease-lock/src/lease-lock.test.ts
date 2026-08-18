import assert from "node:assert/strict";
import test from "node:test";

import { LeaseLock } from "./lease-lock.js";

test("allows one owner and blocks a competing owner", () => {
  let now = 0;
  const lock = new LeaseLock(() => now);
  assert.equal(lock.tryAcquire("a", 100), true);
  assert.equal(lock.tryAcquire("b", 100), false);
  assert.equal(lock.snapshot()?.owner, "a");
});

test("expired leases can be acquired by another owner", () => {
  let now = 0;
  const lock = new LeaseLock(() => now);
  lock.tryAcquire("a", 10);
  now = 10;
  assert.equal(lock.tryAcquire("b", 10), true);
  assert.equal(lock.snapshot()?.owner, "b");
});

test("renew and release require the current owner", () => {
  let now = 0;
  const lock = new LeaseLock(() => now);
  lock.tryAcquire("a", 10);
  now = 5;
  assert.equal(lock.renew("b", 20), false);
  assert.equal(lock.renew("a", 20), true);
  assert.equal(lock.release("b"), false);
  assert.equal(lock.release("a"), true);
});
