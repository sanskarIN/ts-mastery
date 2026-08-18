import assert from "node:assert/strict";
import test from "node:test";

import { planMigrations } from "./schema-migration-planner.js";

test("plans contiguous forward migrations in version order", () => {
  const plan = planMigrations(1, 3, [
    { version: 3, name: "add-index" },
    { version: 2, name: "add-email" },
  ]);
  assert.deepEqual(plan.map((item) => item.version), [2, 3]);
});

test("fails when a required migration is missing", () => {
  assert.throws(
    () => planMigrations(1, 3, [{ version: 3, name: "v3" }]),
    /missing migration version: 2/,
  );
});

test("rejects duplicates and downgrades", () => {
  assert.throws(
    () => planMigrations(0, 1, [{ version: 1, name: "a" }, { version: 1, name: "b" }]),
    /duplicate migration version/,
  );
  assert.throws(() => planMigrations(2, 1, []), /downgrade/);
});
