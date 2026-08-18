import assert from 'node:assert/strict';
import test from 'node:test';
import { FeatureFlags } from './feature-flags.js';

test('honors disabled, zero-rollout, and full-rollout flags', () => {
  const flags = new FeatureFlags([
    { key: 'off', enabled: false },
    { key: 'zero', enabled: true, rolloutPercentage: 0 },
    { key: 'all', enabled: true, rolloutPercentage: 100 },
  ]);

  assert.equal(flags.isEnabled('off', 'user-1'), false);
  assert.equal(flags.isEnabled('zero', 'user-1'), false);
  assert.equal(flags.isEnabled('all', 'user-1'), true);
});

test('percentage rollout is deterministic for the same subject', () => {
  const flags = new FeatureFlags([{ key: 'beta', enabled: true, rolloutPercentage: 37 }]);
  const first = flags.isEnabled('beta', 'reader-42');
  const second = flags.isEnabled('beta', 'reader-42');
  assert.equal(first, second);
});

test('rejects invalid rollout percentages', () => {
  assert.throws(
    () => new FeatureFlags([{ key: 'bad', enabled: true, rolloutPercentage: 101 }]),
    RangeError,
  );
});
