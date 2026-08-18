import assert from 'node:assert/strict';
import test from 'node:test';
import { TtlCache } from './ttl-cache.js';

test('returns values before expiry and removes them after expiry', () => {
  let now = 1_000;
  const cache = new TtlCache<string, number>(() => now);
  cache.set('answer', 42, 100);

  assert.equal(cache.get('answer'), 42);
  now = 1_100;
  assert.equal(cache.get('answer'), undefined);
  assert.equal(cache.size, 0);
});

test('sweep removes all expired entries', () => {
  let now = 0;
  const cache = new TtlCache<string, string>(() => now);
  cache.set('short', 'a', 10);
  cache.set('long', 'b', 100);

  now = 20;
  assert.equal(cache.sweep(), 1);
  assert.equal(cache.get('long'), 'b');
});

test('rejects invalid TTL values', () => {
  const cache = new TtlCache<string, string>(() => 0);
  assert.throws(() => cache.set('x', 'y', 0), RangeError);
});
