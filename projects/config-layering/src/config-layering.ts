export type ConfigLayer = Readonly<Record<string, unknown>>;

export function mergeConfigLayers(
  ...layers: readonly ConfigLayer[]
): Readonly<Record<string, unknown>> {
  const result: Record<string, unknown> = {};
  for (const layer of layers) {
    for (const [key, value] of Object.entries(layer)) {
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}

export function requireConfigKey<T>(
  config: Readonly<Record<string, unknown>>,
  key: string,
  guard: (value: unknown) => value is T,
): T {
  const value = config[key];
  if (!guard(value)) {
    throw new Error(`invalid or missing configuration key: ${key}`);
  }
  return value;
}
