import assert from 'node:assert/strict';
import test from 'node:test';
import { isPointFeature, parsePointFeature, pointDistanceSquared } from './geojson-guard.js';

test('accepts valid GeoJSON Point Features', () => {
  const input: unknown = {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [77.209, 28.6139] },
    properties: { name: 'Delhi' },
  };

  assert.equal(isPointFeature(input), true);
  const feature = parsePointFeature(input);
  assert.equal(feature.properties?.name, 'Delhi');
});

test('rejects invalid coordinate ranges', () => {
  const invalid = {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [181, 20] },
    properties: null,
  };
  assert.equal(isPointFeature(invalid), false);
  assert.throws(() => parsePointFeature(invalid), TypeError);
});

test('computes deterministic squared point distance', () => {
  const a = parsePointFeature({ type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] }, properties: null });
  const b = parsePointFeature({ type: 'Feature', geometry: { type: 'Point', coordinates: [3, 4] }, properties: null });
  assert.equal(pointDistanceSquared(a, b), 25);
});
