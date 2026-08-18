import assert from "node:assert/strict";
import test from "node:test";

import { TypedRouter } from "./typed-router.js";

test("dispatches a registered route with typed context", async () => {
  const router = new TypedRouter<{ user: string }>();
  router.register("GET", "/me", (_request, context) => ({
    status: 200,
    body: { user: context.user },
  }));
  const response = await router.dispatch({ method: "GET", path: "/me", body: undefined }, { user: "Ada" });
  assert.deepEqual(response, { status: 200, body: { user: "Ada" } });
});

test("returns a stable not-found response", async () => {
  const router = new TypedRouter<undefined>();
  const response = await router.dispatch({ method: "GET", path: "/missing", body: undefined }, undefined);
  assert.equal(response.status, 404);
});

test("rejects duplicate and invalid route definitions", () => {
  const router = new TypedRouter<undefined>();
  router.register("GET", "/x", () => ({ status: 200, body: null }));
  assert.throws(() => router.register("GET", "/x", () => ({ status: 200, body: null })), /already registered/);
  assert.throws(() => router.register("GET", "x", () => ({ status: 200, body: null })), /start with/);
});
