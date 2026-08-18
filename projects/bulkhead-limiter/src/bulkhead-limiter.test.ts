import assert from "node:assert/strict";
import test from "node:test";

import { BulkheadLimiter } from "./bulkhead-limiter.js";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

test("limits concurrent work and starts queued work after completion", async () => {
  const limiter = new BulkheadLimiter(1, 2);
  const first = deferred<number>();
  let secondStarted = false;

  const firstRun = limiter.run(() => first.promise);
  const secondRun = limiter.run(() => {
    secondStarted = true;
    return 2;
  });

  assert.equal(limiter.active, 1);
  assert.equal(limiter.queued, 1);
  assert.equal(secondStarted, false);

  first.resolve(1);
  assert.equal(await firstRun, 1);
  assert.equal(await secondRun, 2);
  assert.equal(secondStarted, true);
  assert.equal(limiter.active, 0);
});

test("rejects work when the queue is full", async () => {
  const limiter = new BulkheadLimiter(1, 1);
  const first = deferred<void>();

  const running = limiter.run(() => first.promise);
  const queued = limiter.run(() => "queued");
  await assert.rejects(limiter.run(() => "overflow"), /queue is full/);

  first.resolve();
  await running;
  assert.equal(await queued, "queued");
});

test("validates concurrency and queue sizes", () => {
  assert.throws(() => new BulkheadLimiter(0), RangeError);
  assert.throws(() => new BulkheadLimiter(1, -1), RangeError);
});
