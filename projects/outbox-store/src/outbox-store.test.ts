import assert from "node:assert/strict";
import test from "node:test";

import { InMemoryOutbox } from "./outbox-store.js";

test("returns unpublished records in deterministic order", () => {
  let now = 100;
  const outbox = new InMemoryOutbox<string>(() => now++);
  outbox.enqueue("b", "second");
  outbox.enqueue("a", "first");

  assert.deepEqual(outbox.pending().map((record) => record.id), ["b", "a"]);
});

test("marks selected records as published", () => {
  let now = 10;
  const outbox = new InMemoryOutbox<{ type: string }>(() => now++);
  outbox.enqueue("1", { type: "created" });
  outbox.enqueue("2", { type: "updated" });

  assert.equal(outbox.markPublished(["1", "missing"]), 1);
  assert.deepEqual(outbox.pending().map((record) => record.id), ["2"]);
  assert.notEqual(outbox.get("1")?.publishedAt, null);
});

test("rejects duplicate ids and invalid limits", () => {
  const outbox = new InMemoryOutbox<string>();
  outbox.enqueue("id", "event");

  assert.throws(() => outbox.enqueue("id", "again"));
  assert.throws(() => outbox.pending(0), RangeError);
});
