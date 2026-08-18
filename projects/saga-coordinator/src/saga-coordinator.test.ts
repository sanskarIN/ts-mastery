import assert from "node:assert/strict";
import test from "node:test";

import { runSaga, type SagaStep } from "./saga-coordinator.js";

test("executes all saga steps in order", async () => {
  const log: string[] = [];
  const steps: SagaStep<string[]>[] = [
    { name: "one", execute: (ctx) => { ctx.push("one"); }, compensate: () => {} },
    { name: "two", execute: (ctx) => { ctx.push("two"); }, compensate: () => {} },
  ];
  const result = await runSaga(log, steps);
  assert.deepEqual(result, { ok: true, completed: ["one", "two"] });
  assert.deepEqual(log, ["one", "two"]);
});

test("compensates completed steps in reverse order", async () => {
  const log: string[] = [];
  const steps: SagaStep<string[]>[] = [
    { name: "one", execute: () => {}, compensate: (ctx) => { ctx.push("undo-one"); } },
    { name: "two", execute: () => {}, compensate: (ctx) => { ctx.push("undo-two"); } },
    { name: "three", execute: () => { throw new Error("boom"); }, compensate: () => {} },
  ];
  const result = await runSaga(log, steps);
  assert.equal(result.ok, false);
  assert.deepEqual(log, ["undo-two", "undo-one"]);
});

test("captures compensation failures without hiding the original failure", async () => {
  const steps: SagaStep<undefined>[] = [
    { name: "one", execute: () => {}, compensate: () => { throw new Error("undo failed"); } },
    { name: "two", execute: () => { throw new Error("execute failed"); }, compensate: () => {} },
  ];
  const result = await runSaga(undefined, steps);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.failedStep, "two");
    assert.equal(result.compensationErrors.length, 1);
  }
});
