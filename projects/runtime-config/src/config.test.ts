import assert from 'node:assert/strict';
import test from 'node:test';
import { loadConfig } from './config.js';

test('loads defaults', () => {
  assert.deepEqual(loadConfig({}), {
    environment: 'development',
    port: 3000,
    logLevel: 'info',
  });
});

test('rejects an invalid port', () => {
  assert.throws(() => loadConfig({ PORT: '99999' }), /PORT/);
});
