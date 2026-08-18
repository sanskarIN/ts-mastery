import assert from "node:assert/strict";
import test from "node:test";

import { mergeConfigLayers, requireConfigKey } from "./config-layering.js";

test("later layers override earlier values without mutation", () => {
  const base = { region: "global", timeout: 100 };
  const local = { timeout: 250 };
  const result = mergeConfigLayers(base, local);
  assert.deepEqual(result, { region: "global", timeout: 250 });
  assert.deepEqual(base, { region: "global", timeout: 100 });
});

test("undefined values do not erase earlier configuration and special keys stay data", () => {
  const layer = JSON.parse('{"a":null,"__proto__":{"polluted":true}}') as Record<string, unknown>;
  layer.a = undefined;
  const result = mergeConfigLayers({ a: 1 }, layer, { b: 2 });
  assert.equal(result.a, 1);
  assert.equal(result.b, 2);
  assert.deepEqual(result["__proto__"], { polluted: true });
  assert.equal(({} as { polluted?: boolean }).polluted, undefined);
});

test("requireConfigKey narrows runtime configuration", () => {
  const config = mergeConfigLayers({ port: 8080 });
  const port = requireConfigKey(config, "port", (value): value is number => typeof value === "number");
  assert.equal(port, 8080);
  assert.throws(
    () => requireConfigKey(config, "host", (value): value is string => typeof value === "string"),
    /invalid or missing/,
  );
});
