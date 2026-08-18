export interface ConcurrencySample {
  readonly latencyMs: number;
  readonly success: boolean;
}

export class AdaptiveConcurrencyController {
  private limitValue: number;

  constructor(
    readonly minLimit: number,
    readonly maxLimit: number,
    readonly targetLatencyMs: number,
    initialLimit = minLimit,
  ) {
    if (!Number.isInteger(minLimit) || minLimit <= 0) throw new RangeError("minLimit must be positive");
    if (!Number.isInteger(maxLimit) || maxLimit < minLimit) throw new RangeError("maxLimit must be >= minLimit");
    if (!Number.isFinite(targetLatencyMs) || targetLatencyMs <= 0) throw new RangeError("targetLatencyMs must be positive");
    if (!Number.isInteger(initialLimit) || initialLimit < minLimit || initialLimit > maxLimit) {
      throw new RangeError("initialLimit must be within bounds");
    }
    this.limitValue = initialLimit;
  }

  get limit(): number {
    return this.limitValue;
  }

  observe(sample: ConcurrencySample): number {
    if (!Number.isFinite(sample.latencyMs) || sample.latencyMs < 0) {
      throw new RangeError("latencyMs must be non-negative");
    }

    if (!sample.success || sample.latencyMs > this.targetLatencyMs * 1.2) {
      this.limitValue = Math.max(this.minLimit, Math.floor(this.limitValue * 0.8));
    } else if (sample.latencyMs < this.targetLatencyMs * 0.8) {
      this.limitValue = Math.min(this.maxLimit, this.limitValue + 1);
    }

    return this.limitValue;
  }
}
