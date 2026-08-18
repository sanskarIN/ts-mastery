import assert from "node:assert/strict";
import test from "node:test";

import {
  decodeCursor,
  encodeCursor,
  paginate,
} from "./cursor-pagination.js";

test("encodes and decodes cursor offsets", () => {
  const cursor = encodeCursor(12);
  assert.equal(decodeCursor(cursor), 12);
});

test("paginates forward from an end cursor", () => {
  const items = ["a", "b", "c", "d", "e"];
  const first = paginate(items, { first: 2 });
  const second = paginate(items, {
    first: 2,
    after: first.pageInfo.endCursor ?? undefined,
  });

  assert.deepEqual(first.edges.map((edge) => edge.node), ["a", "b"]);
  assert.deepEqual(second.edges.map((edge) => edge.node), ["c", "d"]);
  assert.equal(first.pageInfo.hasNextPage, true);
  assert.equal(second.pageInfo.hasNextPage, true);
});

test("rejects malformed cursors and page sizes", () => {
  assert.throws(() => decodeCursor("not-a-valid-cursor"));
  assert.throws(() => paginate([1, 2], { first: 0 }), RangeError);
});
