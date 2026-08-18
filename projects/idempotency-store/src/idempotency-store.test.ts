import assert from "node:assert/strict";
import test from "node:test";

import { IdempotencyStore } from "./idempotency-store.js";

test("runs one operation for repeated keys", async () => {
  const store = new IdempotencyStore<number>();
  let calls = 0;

  const operation = async () => {
    calls += 1;
    return 42;
  };

  const [first, second] = await Promise.all([
    store.run("request-1", operation),
    store.run("request-1", operation),
  ]);

  assert.equal(first, 42);
  assert.equal(second, 42);
  assert.equal(calls, 1);
});

test("removes failed operations so callers can retry", async () => {
  const store = new IdempotencyStore<string>();
  let calls = 0;

  await assert.rejects(
    store.run("retryable", () => {
      calls += 1;
      throw new Error("temporary failure");
    }),
  );

  const result = await store.run("retryable", () => {
    calls += 1;
    return "ok";
  });

  assert.equal(result, "ok");
  assert.equal(calls, 2);
});

test("rejects blank keys", async () => {
  const store = new IdempotencyStore<number>();
  await assert.rejects(store.run("   ", () => 1));
});
