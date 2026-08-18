export interface Migration {
  readonly version: number;
  readonly name: string;
}

export function planMigrations(
  currentVersion: number,
  targetVersion: number,
  available: readonly Migration[],
): readonly Migration[] {
  if (!Number.isInteger(currentVersion) || !Number.isInteger(targetVersion) || currentVersion < 0 || targetVersion < 0) {
    throw new RangeError("versions must be non-negative integers");
  }
  if (targetVersion < currentVersion) {
    throw new Error("downgrade planning is not supported");
  }

  const byVersion = new Map<number, Migration>();
  for (const migration of available) {
    if (!Number.isInteger(migration.version) || migration.version <= 0) {
      throw new RangeError("migration versions must be positive integers");
    }
    if (byVersion.has(migration.version)) {
      throw new Error(`duplicate migration version: ${migration.version}`);
    }
    byVersion.set(migration.version, migration);
  }

  const plan: Migration[] = [];
  for (let version = currentVersion + 1; version <= targetVersion; version += 1) {
    const migration = byVersion.get(version);
    if (!migration) {
      throw new Error(`missing migration version: ${version}`);
    }
    plan.push(migration);
  }
  return plan;
}
