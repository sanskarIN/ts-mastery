export type RecordPatch =
  | { readonly type: "set"; readonly key: string; readonly value: unknown }
  | { readonly type: "delete"; readonly key: string };

export function diffRecord(
  before: Readonly<Record<string, unknown>>,
  after: Readonly<Record<string, unknown>>,
): readonly RecordPatch[] {
  const patches: RecordPatch[] = [];
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);

  for (const key of [...keys].sort()) {
    if (!(key in after)) {
      patches.push({ type: "delete", key });
      continue;
    }
    if (!(key in before) || !Object.is(before[key], after[key])) {
      patches.push({ type: "set", key, value: after[key] });
    }
  }

  return patches;
}

export function applyRecordPatch(
  input: Readonly<Record<string, unknown>>,
  patches: readonly RecordPatch[],
): Readonly<Record<string, unknown>> {
  const output: Record<string, unknown> = { ...input };
  for (const patch of patches) {
    if (patch.type === "delete") {
      delete output[patch.key];
    } else {
      output[patch.key] = patch.value;
    }
  }
  return output;
}
