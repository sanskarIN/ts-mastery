import assert from 'node:assert/strict';
import test from 'node:test';
import { CircuitBreaker, CircuitOpenError } from './circuit-breaker.js';

test('opens after the configured failure threshold', async () => {
  const breaker = new CircuitBreaker(2, 1_000, () => 0);
  const fail = async (): Promise<string> => { throw new Error('down'); };

  await assert.rejects(breaker.execute(fail));
  assert.equal(breaker.state, 'closed');
  await assert.rejects(breaker.execute(fail));
  assert.equal(breaker.state, 'open');
  await assert.rejects(breaker.execute(async () => 'blocked'), CircuitOpenError);
});

test('moves through half-open and closes after a successful probe', async () => {
  let now = 0;
  const breaker = new CircuitBreaker(1, 100, () => now);
  await assert.rejects(breaker.execute(async () => { throw new Error('down'); }));

  now = 100;
  assert.equal(breaker.state, 'half-open');
  assert.equal(await breaker.execute(async () => 'healthy'), 'healthy');
  assert.equal(breaker.state, 'closed');
});
