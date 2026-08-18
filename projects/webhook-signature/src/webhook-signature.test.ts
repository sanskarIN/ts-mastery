import assert from "node:assert/strict";
import test from "node:test";

import { signWebhook, verifyWebhookSignature } from "./webhook-signature.js";

test("verifies a matching HMAC signature", () => {
  const secret = "unit-test-secret";
  const payload = JSON.stringify({ event: "created" });
  const signature = signWebhook(secret, payload);
  assert.equal(verifyWebhookSignature(secret, payload, signature), true);
});

test("rejects modified payloads and malformed signatures", () => {
  const secret = "unit-test-secret";
  const signature = signWebhook(secret, "original");
  assert.equal(verifyWebhookSignature(secret, "changed", signature), false);
  assert.equal(verifyWebhookSignature(secret, "original", "bad"), false);
});

test("requires a non-empty signing secret", () => {
  assert.throws(() => signWebhook("", "payload"), /secret/);
});
