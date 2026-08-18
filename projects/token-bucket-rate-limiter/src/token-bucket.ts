export type Clock = () => number;

export class TokenBucket {
  private tokens: number;
  private lastRefillAt: number;

  constructor(
    private readonly capacity: number,
    private readonly refillPerSecond: number,
    private readonly now: Clock = Date.now,
  ) {
    if (!Number.isFinite(capacity) || capacity <= 0) {
      throw new RangeError('capacity must be a positive finite number');
    }
    if (!Number.isFinite(refillPerSecond) || refillPerSecond < 0) {
      throw new RangeError('refillPerSecond must be a non-negative finite number');
    }
    this.tokens = capacity;
    this.lastRefillAt = this.now();
  }

  private refill(): void {
    const current = this.now();
    const elapsedMs = Math.max(0, current - this.lastRefillAt);
    this.lastRefillAt = current;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + (elapsedMs / 1_000) * this.refillPerSecond,
    );
  }

  consume(amount = 1): boolean {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new RangeError('amount must be a positive finite number');
    }

    this.refill();
    if (this.tokens < amount) return false;
    this.tokens -= amount;
    return true;
  }

  available(): number {
    this.refill();
    return this.tokens;
  }
}
