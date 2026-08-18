import assert from 'node:assert/strict';
import test from 'node:test';
import { TokenBucket } from './token-bucket.js';

test('limits requests when the bucket is empty', () => {
  let now = 0;
  const bucket = new TokenBucket(2, 1, () => now);

  assert.equal(bucket.consume(), true);
  assert.equal(bucket.consume(), true);
  assert.equal(bucket.consume(), false);

  now = 1_000;
  assert.equal(bucket.consume(), true);
  assert.equal(bucket.consume(), false);
});

test('never refills above capacity', () => {
  let now = 0;
  const bucket = new TokenBucket(3, 10, () => now);
  bucket.consume(2);
  now = 10_000;
  assert.equal(bucket.available(), 3);
});

test('rejects invalid consume amounts', () => {
  const bucket = new TokenBucket(1, 1, () => 0);
  assert.throws(() => bucket.consume(0), RangeError);
});
