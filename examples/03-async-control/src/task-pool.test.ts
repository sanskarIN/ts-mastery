import assert from 'node:assert/strict';
import test from 'node:test';
import { mapWithConcurrency } from './task-pool.js';

test('preserves input order', async () => {
  const result = await mapWithConcurrency([3, 1, 2], 2, async (value) => {
    await new Promise((resolve) => setTimeout(resolve, value));
    return value * 2;
  });
  assert.deepEqual(result, [6, 2, 4]);
});
