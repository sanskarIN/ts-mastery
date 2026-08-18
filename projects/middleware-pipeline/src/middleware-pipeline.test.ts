import assert from "node:assert/strict";
import test from "node:test";

import { composeMiddleware, type Middleware } from "./middleware-pipeline.js";

interface Context {
  trace: string[];
}

test("composes middleware in onion order", async () => {
  const first: Middleware<Context> = async (context, next) => {
    context.trace.push("first:before");
    await next();
    context.trace.push("first:after");
  };
  const second: Middleware<Context> = async (context, next) => {
    context.trace.push("second:before");
    await next();
    context.trace.push("second:after");
  };

  const context: Context = { trace: [] };
  await composeMiddleware([first, second])(context);

  assert.deepEqual(context.trace, [
    "first:before",
    "second:before",
    "second:after",
    "first:after",
  ]);
});

test("rejects middleware that calls next more than once", async () => {
  const invalid: Middleware<Context> = async (_context, next) => {
    await next();
    await next();
  };

  await assert.rejects(composeMiddleware([invalid])({ trace: [] }), /multiple times/);
});

test("supports an empty pipeline", async () => {
  const context: Context = { trace: [] };
  await composeMiddleware<Context>([])(context);
  assert.deepEqual(context.trace, []);
});
