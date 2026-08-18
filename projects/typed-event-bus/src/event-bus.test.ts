import assert from 'node:assert/strict';
import test from 'node:test';
import { TypedEventBus } from './event-bus.js';

type Events = {
  progress: { part: number; completed: boolean };
  message: string;
};

test('emits typed payloads and unsubscribes listeners', () => {
  const bus = new TypedEventBus<Events>();
  const received: number[] = [];
  const unsubscribe = bus.on('progress', ({ part }) => received.push(part));

  assert.equal(bus.emit('progress', { part: 42, completed: true }), 1);
  unsubscribe();
  assert.equal(bus.emit('progress', { part: 43, completed: false }), 0);
  assert.deepEqual(received, [42]);
});

test('once listeners run exactly once', () => {
  const bus = new TypedEventBus<Events>();
  const received: string[] = [];
  bus.once('message', (message) => received.push(message));

  bus.emit('message', 'first');
  bus.emit('message', 'second');
  assert.deepEqual(received, ['first']);
});
