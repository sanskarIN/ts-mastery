import assert from "node:assert/strict";
import test from "node:test";

import { RequestContextStore } from "./request-context-store.js";

test("preserves context across asynchronous work", async () => {
  const store = new RequestContextStore();
  const value = await store.run({ correlationId: "corr-1", requestId: "req-1" }, async () => {
    await Promise.resolve();
    return store.current();
  });
  assert.deepEqual(value, { correlationId: "corr-1", requestId: "req-1" });
});

test("nested contexts restore the outer value", () => {
  const store = new RequestContextStore();
  store.run({ correlationId: "outer" }, () => {
    store.run({ correlationId: "inner" }, () => {
      assert.equal(store.current().correlationId, "inner");
    });
    assert.equal(store.current().correlationId, "outer");
  });
});

test("current throws outside a context", () => {
  const store = new RequestContextStore();
  assert.equal(store.optional(), undefined);
  assert.throws(() => store.current(), /not available/);
});
