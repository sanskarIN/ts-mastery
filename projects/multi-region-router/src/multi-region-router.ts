export interface RegionCandidate {
  readonly name: string;
  readonly healthy: boolean;
  readonly latencyMs: number;
  readonly availableCapacity: number;
}

export function selectRegion(
  regions: readonly RegionCandidate[],
): RegionCandidate {
  const eligible = regions.filter(
    (region) =>
      region.healthy &&
      Number.isFinite(region.latencyMs) &&
      region.latencyMs >= 0 &&
      Number.isFinite(region.availableCapacity) &&
      region.availableCapacity > 0,
  );

  eligible.sort(
    (a, b) =>
      a.latencyMs - b.latencyMs ||
      b.availableCapacity - a.availableCapacity ||
      a.name.localeCompare(b.name),
  );

  const selected = eligible[0];
  if (!selected) {
    throw new Error("no healthy region with available capacity");
  }
  return selected;
}
