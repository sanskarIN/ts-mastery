import { createHmac, timingSafeEqual } from "node:crypto";

const PREFIX = "sha256=";

export function signWebhook(secret: string, payload: string | Uint8Array): string {
  if (!secret) {
    throw new Error("secret must not be empty");
  }
  const digest = createHmac("sha256", secret).update(payload).digest("hex");
  return `${PREFIX}${digest}`;
}

export function verifyWebhookSignature(
  secret: string,
  payload: string | Uint8Array,
  signature: string,
): boolean {
  if (!signature.startsWith(PREFIX)) {
    return false;
  }

  const expected = Buffer.from(signWebhook(secret, payload), "utf8");
  const received = Buffer.from(signature, "utf8");
  if (expected.length !== received.length) {
    return false;
  }
  return timingSafeEqual(expected, received);
}
