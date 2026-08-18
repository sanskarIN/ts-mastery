import assert from "node:assert/strict";
import test from "node:test";

import { createStrongEtag, matchesIfNoneMatch } from "./etag-helper.js";

test("creates stable quoted strong ETags", () => {
  const first = createStrongEtag("hello");
  const second = createStrongEtag("hello");
  assert.equal(first, second);
  assert.match(first, /^"[A-Za-z0-9_-]+"$/);
});

test("matches lists, wildcard, and weak comparison forms", () => {
  const etag = createStrongEtag("hello");
  assert.equal(matchesIfNoneMatch(`"other", ${etag}`, etag), true);
  assert.equal(matchesIfNoneMatch("*", etag), true);
  assert.equal(matchesIfNoneMatch(`W/${etag}`, etag), true);
});

test("returns false for absent or nonmatching headers", () => {
  const etag = createStrongEtag("hello");
  assert.equal(matchesIfNoneMatch(undefined, etag), false);
  assert.equal(matchesIfNoneMatch('"different"', etag), false);
});
