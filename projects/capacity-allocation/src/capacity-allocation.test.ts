import assert from "node:assert/strict";
import test from "node:test";

import { allocateCapacity } from "./capacity-allocation.js";

test("satisfies minimums then distributes remaining capacity by weight", () => {
  const result = allocateCapacity(100, [
    { id: "a", minimum: 20, desired: 80, weight: 1 },
    { id: "b", minimum: 20, desired: 80, weight: 3 },
  ]);
  assert.ok(Math.abs(result[0]!.allocated - 35) < 1e-9);
  assert.ok(Math.abs(result[1]!.allocated - 65) < 1e-9);
});

test("redistributes unused share when one request reaches its desired cap", () => {
  const result = allocateCapacity(100, [
    { id: "a", minimum: 0, desired: 10, weight: 1 },
    { id: "b", minimum: 0, desired: 100, weight: 1 },
  ]);
  assert.ok(Math.abs(result[0]!.allocated - 10) < 1e-9);
  assert.ok(Math.abs(result[1]!.allocated - 90) < 1e-9);
});

test("rejects impossible minimums and duplicate ids", () => {
  assert.throws(
    () => allocateCapacity(5, [{ id: "a", minimum: 10, desired: 10, weight: 1 }]),
    /minimum/,
  );
  assert.throws(
    () => allocateCapacity(10, [
      { id: "a", minimum: 0, desired: 5, weight: 1 },
      { id: "a", minimum: 0, desired: 5, weight: 1 },
    ]),
    /unique/,
  );
});
