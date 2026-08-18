import assert from "node:assert/strict";
import test from "node:test";

import { LruCache } from "./lru-cache.js";

test("evicts the least recently used entry", () => {
  const cache = new LruCache<string, number>(2);
  cache.set("a", 1);
  cache.set("b", 2);
  cache.get("a");
  cache.set("c", 3);

  assert.equal(cache.has("a"), true);
  assert.equal(cache.has("b"), false);
  assert.equal(cache.get("c"), 3);
});

test("updating an entry refreshes recency", () => {
  const cache = new LruCache<string, number>(2);
  cache.set("a", 1);
  cache.set("b", 2);
  cache.set("a", 10);
  cache.set("c", 3);

  assert.equal(cache.get("a"), 10);
  assert.equal(cache.has("b"), false);
});

test("rejects invalid capacities", () => {
  assert.throws(() => new LruCache(0), RangeError);
});
