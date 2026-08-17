export interface ProgressSnapshot {
  readonly completed: readonly number[];
  readonly totalParts: number;
}

export function normalizeCompleted(parts: readonly number[], totalParts = 120): number[] {
  return [...new Set(parts)]
    .filter((part) => Number.isInteger(part) && part >= 1 && part <= totalParts)
    .sort((a, b) => a - b);
}

export function createSnapshot(parts: readonly number[], totalParts = 120): ProgressSnapshot {
  return { completed: normalizeCompleted(parts, totalParts), totalParts };
}

export function percentage(snapshot: ProgressSnapshot): number {
  if (snapshot.totalParts <= 0) return 0;
  return Math.round((snapshot.completed.length / snapshot.totalParts) * 100);
}
