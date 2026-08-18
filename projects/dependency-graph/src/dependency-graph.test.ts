import assert from 'node:assert/strict';
import test from 'node:test';
import { DependencyCycleError, DependencyGraph } from './dependency-graph.js';

test('orders dependencies before dependents', () => {
  const graph = new DependencyGraph();
  graph.addDependency('deploy', 'test');
  graph.addDependency('test', 'build');
  graph.addDependency('build', 'install');

  const order = graph.topologicalOrder();
  assert.ok(order.indexOf('install') < order.indexOf('build'));
  assert.ok(order.indexOf('build') < order.indexOf('test'));
  assert.ok(order.indexOf('test') < order.indexOf('deploy'));
});

test('reports dependency cycles', () => {
  const graph = new DependencyGraph();
  graph.addDependency('a', 'b');
  graph.addDependency('b', 'c');
  graph.addDependency('c', 'a');

  assert.throws(() => graph.topologicalOrder(), DependencyCycleError);
});
