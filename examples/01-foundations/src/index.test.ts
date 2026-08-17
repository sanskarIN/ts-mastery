import assert from 'node:assert/strict';
import test from 'node:test';
import { greet } from './index.js';

test('greet normalizes a name', () => {
  assert.equal(greet('  Ram  '), 'Hello, Ram!');
});

test('greet has a safe fallback', () => {
  assert.equal(greet('   '), 'Hello, TypeScript learner!');
});
