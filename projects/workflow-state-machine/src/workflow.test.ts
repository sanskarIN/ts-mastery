import assert from 'node:assert/strict';
import test from 'node:test';
import { transition, type WorkflowState } from './workflow.js';

test('runs to success', () => {
  let state: WorkflowState = { type: 'pending' };
  state = transition(state, { type: 'start', at: 10 });
  state = transition(state, { type: 'succeed', at: 20 });
  assert.deepEqual(state, { type: 'succeeded', finishedAt: 20 });
});
