export type CircuitState = 'closed' | 'open' | 'half-open';
export type Clock = () => number;

export class CircuitOpenError extends Error {
  constructor() {
    super('Circuit breaker is open');
    this.name = 'CircuitOpenError';
  }
}

export class CircuitBreaker {
  private failures = 0;
  private stateValue: CircuitState = 'closed';
  private openedAt: number | undefined;

  constructor(
    private readonly failureThreshold: number,
    private readonly resetAfterMs: number,
    private readonly now: Clock = Date.now,
  ) {
    if (!Number.isInteger(failureThreshold) || failureThreshold < 1) {
      throw new RangeError('failureThreshold must be a positive integer');
    }
    if (!Number.isFinite(resetAfterMs) || resetAfterMs < 0) {
      throw new RangeError('resetAfterMs must be non-negative');
    }
  }

  get state(): CircuitState {
    if (
      this.stateValue === 'open' &&
      this.openedAt !== undefined &&
      this.now() - this.openedAt >= this.resetAfterMs
    ) {
      return 'half-open';
    }
    return this.stateValue;
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    const state = this.state;
    if (state === 'open') throw new CircuitOpenError();
    if (state === 'half-open') this.stateValue = 'half-open';

    try {
      const value = await operation();
      this.failures = 0;
      this.openedAt = undefined;
      this.stateValue = 'closed';
      return value;
    } catch (error) {
      this.failures += 1;
      if (this.stateValue === 'half-open' || this.failures >= this.failureThreshold) {
        this.stateValue = 'open';
        this.openedAt = this.now();
      }
      throw error;
    }
  }
}
