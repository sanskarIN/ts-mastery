import assert from "node:assert/strict";
import test from "node:test";

import { TypedStore } from "./typed-store.js";

test("notifies subscribers with current and previous values", () => {
  const store = new TypedStore(1);
  const seen: Array<[number, number]> = [];
  store.subscribe((value, previous) => seen.push([value, previous]));
  store.set(2);
  assert.deepEqual(seen, [[2, 1]]);
});

test("supports functional updates", () => {
  const store = new TypedStore({ count: 1 });
  store.update((current) => ({ count: current.count + 1 }));
  assert.deepEqual(store.value, { count: 2 });
});

test("unsubscribe stops notifications and equal values are ignored", () => {
  const store = new TypedStore("a");
  let calls = 0;
  const unsubscribe = store.subscribe(() => { calls += 1; });
  store.set("a");
  unsubscribe();
  store.set("b");
  assert.equal(calls, 0);
  assert.equal(store.subscriberCount, 0);
});
