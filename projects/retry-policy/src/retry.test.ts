import assert from 'node:assert/strict';
import test from 'node:test';
import { retry } from './retry.js';

test('retries failed operations and uses exponential delays', async () => {
  const delays: number[] = [];
  let calls = 0;

  const result = await retry(async () => {
    calls += 1;
    if (calls < 3) throw new Error('temporary');
    return 'ok';
  }, {
    maxAttempts: 4,
    baseDelayMs: 10,
    sleep: async (delayMs) => { delays.push(delayMs); },
  });

  assert.equal(result, 'ok');
  assert.equal(calls, 3);
  assert.deepEqual(delays, [10, 20]);
});

test('stops when the retry predicate rejects an error', async () => {
  let calls = 0;
  await assert.rejects(
    retry(async () => {
      calls += 1;
      throw new TypeError('fatal');
    }, {
      maxAttempts: 5,
      shouldRetry: (error) => !(error instanceof TypeError),
      sleep: async () => undefined,
    }),
    TypeError,
  );
  assert.equal(calls, 1);
});
