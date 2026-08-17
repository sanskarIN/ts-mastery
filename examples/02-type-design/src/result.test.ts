import assert from 'node:assert/strict';
import test from 'node:test';
import { parsePositiveInteger } from './result.js';

test('accepts a positive integer', () => {
  assert.deepEqual(parsePositiveInteger(7), { ok: true, value: 7 });
});

test('rejects non-numeric input', () => {
  assert.deepEqual(parsePositiveInteger('7'), { ok: false, error: 'not-a-number' });
});
