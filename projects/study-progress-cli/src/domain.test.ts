import assert from 'node:assert/strict';
import test from 'node:test';
import { createSnapshot, percentage } from './domain.js';

test('normalizes and calculates progress', () => {
  const snapshot = createSnapshot([3, 1, 1, 121, 2]);
  assert.deepEqual(snapshot.completed, [1, 2, 3]);
  assert.equal(percentage(snapshot), 3);
});
