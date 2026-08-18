import assert from "node:assert/strict";
import test from "node:test";

import { decidePolicy } from "./policy-engine.js";

test("uses the highest-priority matching rule", () => {
  const decision = decidePolicy(
    { role: "admin" },
    [
      { id: "allow-admin", priority: 10, effect: "allow", matches: (ctx) => ctx.role === "admin" },
      { id: "deny-all", priority: 1, effect: "deny", matches: () => true },
    ],
  );
  assert.deepEqual(decision, { allowed: true, matchedRule: "allow-admin", effect: "allow" });
});

test("deny wins a priority tie", () => {
  const decision = decidePolicy(
    {},
    [
      { id: "allow", priority: 5, effect: "allow", matches: () => true },
      { id: "deny", priority: 5, effect: "deny", matches: () => true },
    ],
  );
  assert.equal(decision.allowed, false);
  assert.equal(decision.matchedRule, "deny");
});

test("defaults to deny when no rule matches", () => {
  assert.deepEqual(decidePolicy({}, []), { allowed: false, effect: "deny" });
});
