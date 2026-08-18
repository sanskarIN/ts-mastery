import assert from "node:assert/strict";
import test from "node:test";

import {
  ValidationPipeline,
  minLength,
  requiredText,
} from "./validation-pipeline.js";

test("returns the original value when all rules pass", () => {
  const pipeline = new ValidationPipeline<string>()
    .add(requiredText("name"))
    .add(minLength("name", 3));

  assert.deepEqual(pipeline.validate("TypeScript"), {
    ok: true,
    value: "TypeScript",
  });
});

test("collects all validation errors", () => {
  const pipeline = new ValidationPipeline<string>()
    .add(requiredText("name"))
    .add(minLength("name", 3));

  assert.deepEqual(pipeline.validate(""), {
    ok: false,
    errors: ["name is required", "name must be at least 3 characters"],
  });
});

test("rejects invalid minimum lengths", () => {
  assert.throws(() => minLength("name", -1), RangeError);
});
