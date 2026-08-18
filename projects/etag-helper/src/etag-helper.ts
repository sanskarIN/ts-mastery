import { createHash } from "node:crypto";

function bodyBuffer(body: string | Uint8Array): Uint8Array {
  return typeof body === "string" ? Buffer.from(body, "utf8") : body;
}

export function createStrongEtag(body: string | Uint8Array): string {
  const digest = createHash("sha256").update(bodyBuffer(body)).digest("base64url");
  return `"${digest}"`;
}

function opaqueTag(value: string): string {
  const trimmed = value.trim();
  return trimmed.startsWith("W/") ? trimmed.slice(2).trim() : trimmed;
}

export function matchesIfNoneMatch(header: string | undefined, currentEtag: string): boolean {
  if (header === undefined) {
    return false;
  }

  const candidates = header.split(",").map((value) => value.trim()).filter(Boolean);
  if (candidates.includes("*")) {
    return true;
  }

  const current = opaqueTag(currentEtag);
  return candidates.some((candidate) => opaqueTag(candidate) === current);
}
