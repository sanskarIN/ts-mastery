export interface ErrorBudgetStatus {
  readonly samples: number;
  readonly failures: number;
  readonly observedFailureRate: number;
  readonly budgetFailureRate: number;
  readonly remainingFraction: number;
  readonly exhausted: boolean;
}

export class ErrorBudgetTracker {
  private readonly outcomes: boolean[] = [];

  constructor(
    readonly targetAvailability: number,
    readonly windowSize: number,
  ) {
    if (!(targetAvailability > 0 && targetAvailability < 1)) {
      throw new RangeError("targetAvailability must be between 0 and 1");
    }
    if (!Number.isInteger(windowSize) || windowSize <= 0) {
      throw new RangeError("windowSize must be a positive integer");
    }
  }

  record(success: boolean): ErrorBudgetStatus {
    this.outcomes.push(success);
    while (this.outcomes.length > this.windowSize) {
      this.outcomes.shift();
    }
    return this.status();
  }

  status(): ErrorBudgetStatus {
    const samples = this.outcomes.length;
    const failures = this.outcomes.filter((value) => !value).length;
    const observedFailureRate = samples === 0 ? 0 : failures / samples;
    const budgetFailureRate = 1 - this.targetAvailability;
    const remainingFraction =
      budgetFailureRate === 0
        ? 0
        : Math.max(0, Math.min(1, (budgetFailureRate - observedFailureRate) / budgetFailureRate));

    return {
      samples,
      failures,
      observedFailureRate,
      budgetFailureRate,
      remainingFraction,
      exhausted: samples > 0 && observedFailureRate >= budgetFailureRate,
    };
  }
}
