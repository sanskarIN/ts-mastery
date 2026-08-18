import assert from "node:assert/strict";
import test from "node:test";

import { isFeatureCollection } from "./feature-collection-guard.js";

test("accepts a valid feature collection", () => {
  const value: unknown = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "A" },
        geometry: { type: "Point", coordinates: [10, 20] },
      },
    ],
  };
  assert.equal(isFeatureCollection(value), true);
});

test("supports null geometry and geometry collections", () => {
  assert.equal(
    isFeatureCollection({
      type: "FeatureCollection",
      features: [
        { type: "Feature", properties: null, geometry: null },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "GeometryCollection",
            geometries: [{ type: "LineString", coordinates: [[0, 0], [1, 1]] }],
          },
        },
      ],
    }),
    true,
  );
});

test("rejects malformed feature collections", () => {
  assert.equal(isFeatureCollection({ type: "FeatureCollection", features: {} }), false);
  assert.equal(
    isFeatureCollection({
      type: "FeatureCollection",
      features: [{ type: "Feature", properties: [], geometry: null }],
    }),
    false,
  );
});
