export type FeatureFlag = {
  key: string;
  enabled: boolean;
  rolloutPercentage?: number;
};

function bucket(value: string): number {
  let hash = 2_166_136_261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16_777_619);
  }
  return (hash >>> 0) % 100;
}

export class FeatureFlags {
  private readonly flags = new Map<string, FeatureFlag>();

  constructor(flags: readonly FeatureFlag[]) {
    for (const flag of flags) {
      const rollout = flag.rolloutPercentage ?? 100;
      if (!Number.isFinite(rollout) || rollout < 0 || rollout > 100) {
        throw new RangeError(`Invalid rollout percentage for ${flag.key}`);
      }
      this.flags.set(flag.key, flag);
    }
  }

  isEnabled(key: string, subjectId: string): boolean {
    const flag = this.flags.get(key);
    if (!flag?.enabled) return false;

    const rollout = flag.rolloutPercentage ?? 100;
    if (rollout === 100) return true;
    if (rollout === 0) return false;
    return bucket(`${key}:${subjectId}`) < rollout;
  }

  require(key: string, subjectId: string): void {
    if (!this.isEnabled(key, subjectId)) {
      throw new Error(`Feature flag '${key}' is disabled for this subject`);
    }
  }
}
