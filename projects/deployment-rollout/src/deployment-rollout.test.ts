import assert from "node:assert/strict";
import test from "node:test";

import { DeploymentRollout } from "./deployment-rollout.js";

const phases = [
  { name: "canary", percent: 5 },
  { name: "regional", percent: 25 },
  { name: "full", percent: 100 },
] as const;

test("advances only when the health gate passes", () => {
  const rollout = new DeploymentRollout(phases);
  assert.equal(rollout.advance(false).phase.name, "canary");
  assert.equal(rollout.advance(true).phase.name, "regional");
});

test("rollback moves back one phase and never below the first", () => {
  const rollout = new DeploymentRollout(phases);
  rollout.advance(true);
  assert.equal(rollout.rollback().phase.name, "canary");
  assert.equal(rollout.rollback().phase.name, "canary");
});

test("requires strictly increasing phases ending at 100%", () => {
  assert.throws(() => new DeploymentRollout([{ name: "half", percent: 50 }]), /100%/);
  assert.throws(
    () => new DeploymentRollout([{ name: "a", percent: 50 }, { name: "b", percent: 40 }, { name: "c", percent: 100 }]),
    /strictly increasing/,
  );
});
