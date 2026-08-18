import assert from "node:assert/strict";
import test from "node:test";

import { CommandBus, type CommandCatalog } from "./command-bus.js";

interface AppCommands extends CommandCatalog {
  sum: { input: { a: number; b: number }; output: number };
  greet: { input: { name: string }; output: string };
}

test("dispatches typed commands to registered handlers", async () => {
  const bus = new CommandBus<AppCommands>();
  bus.register("sum", ({ a, b }) => a + b);
  bus.register("greet", async ({ name }) => `Hello, ${name}`);

  assert.equal(await bus.execute("sum", { a: 2, b: 5 }), 7);
  assert.equal(await bus.execute("greet", { name: "TypeScript" }), "Hello, TypeScript");
});

test("supports unregistering handlers", async () => {
  const bus = new CommandBus<AppCommands>();
  const unregister = bus.register("sum", ({ a, b }) => a + b);
  unregister();

  await assert.rejects(bus.execute("sum", { a: 1, b: 2 }));
});

test("rejects duplicate handlers", () => {
  const bus = new CommandBus<AppCommands>();
  bus.register("sum", ({ a, b }) => a + b);

  assert.throws(() => bus.register("sum", ({ a, b }) => a * b));
});
