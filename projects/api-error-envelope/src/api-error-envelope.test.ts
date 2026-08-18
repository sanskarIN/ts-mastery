import assert from "node:assert/strict";
import test from "node:test";

import { AppError, toErrorEnvelope } from "./api-error-envelope.js";

test("maps application errors with typed details", () => {
  const envelope = toErrorEnvelope(
    new AppError("INVALID_INPUT", "Input failed validation", 400, { field: "email" }),
    "req-1",
  );
  assert.deepEqual(envelope.error, {
    code: "INVALID_INPUT",
    message: "Input failed validation",
    requestId: "req-1",
    details: { field: "email" },
  });
});

test("hides unexpected internal error details", () => {
  const envelope = toErrorEnvelope(new Error("database password leaked"), "req-2");
  assert.equal(envelope.error.code, "INTERNAL_ERROR");
  assert.equal(envelope.error.message.includes("password"), false);
});

test("validates status codes and request identifiers", () => {
  assert.throws(() => new AppError("X", "bad", 200), RangeError);
  assert.throws(() => toErrorEnvelope(new Error("x"), " "), /requestId/);
});
