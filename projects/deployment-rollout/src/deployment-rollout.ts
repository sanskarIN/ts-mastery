export interface RolloutPhase {
  readonly name: string;
  readonly percent: number;
}

export interface RolloutSnapshot {
  readonly phase: RolloutPhase;
  readonly index: number;
  readonly complete: boolean;
}

export class DeploymentRollout {
  private indexValue = 0;

  constructor(private readonly phases: readonly RolloutPhase[]) {
    if (phases.length === 0) throw new Error("at least one rollout phase is required");
    let previous = -1;
    for (const phase of phases) {
      if (!phase.name.trim()) throw new Error("phase names must not be empty");
      if (!Number.isFinite(phase.percent) || phase.percent <= previous || phase.percent <= 0 || phase.percent > 100) {
        throw new Error("phase percentages must be strictly increasing within 1..100");
      }
      previous = phase.percent;
    }
    if (phases.at(-1)?.percent !== 100) {
      throw new Error("final rollout phase must reach 100%");
    }
  }

  snapshot(): RolloutSnapshot {
    const phase = this.phases[this.indexValue];
    if (!phase) throw new Error("rollout phase is unavailable");
    return {
      phase,
      index: this.indexValue,
      complete: this.indexValue === this.phases.length - 1,
    };
  }

  advance(healthy: boolean): RolloutSnapshot {
    if (healthy && this.indexValue < this.phases.length - 1) {
      this.indexValue += 1;
    }
    return this.snapshot();
  }

  rollback(): RolloutSnapshot {
    this.indexValue = Math.max(0, this.indexValue - 1);
    return this.snapshot();
  }
}
