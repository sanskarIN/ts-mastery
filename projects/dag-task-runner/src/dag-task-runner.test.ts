import assert from "node:assert/strict";
import test from "node:test";

import { runDag } from "./dag-task-runner.js";

test("runs dependency layers and exposes completed results", async () => {
  const results = await runDag<number>([
    { id: "a", run: () => 2 },
    { id: "b", run: () => 3 },
    {
      id: "sum",
      dependsOn: ["a", "b"],
      run: (completed) => (completed.get("a") ?? 0) + (completed.get("b") ?? 0),
    },
  ]);

  assert.equal(results.get("sum"), 5);
  assert.deepEqual([...results.keys()], ["a", "b", "sum"]);
});

test("rejects missing dependencies", async () => {
  await assert.rejects(
    runDag([{ id: "a", dependsOn: ["missing"], run: () => 1 }]),
    /missing task/,
  );
});

test("detects dependency cycles", async () => {
  await assert.rejects(
    runDag([
      { id: "a", dependsOn: ["b"], run: () => 1 },
      { id: "b", dependsOn: ["a"], run: () => 2 },
    ]),
    /cycle/,
  );
});
