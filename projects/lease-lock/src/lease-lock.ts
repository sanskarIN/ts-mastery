export interface LeaseSnapshot {
  readonly owner: string;
  readonly expiresAt: number;
}

export class LeaseLock {
  private lease: LeaseSnapshot | undefined;

  constructor(private readonly now: () => number = Date.now) {}

  tryAcquire(owner: string, ttlMs: number): boolean {
    this.validate(owner, ttlMs);
    this.expireIfNeeded();
    if (this.lease && this.lease.owner !== owner) {
      return false;
    }
    this.lease = { owner, expiresAt: this.now() + ttlMs };
    return true;
  }

  renew(owner: string, ttlMs: number): boolean {
    this.validate(owner, ttlMs);
    this.expireIfNeeded();
    if (!this.lease || this.lease.owner !== owner) {
      return false;
    }
    this.lease = { owner, expiresAt: this.now() + ttlMs };
    return true;
  }

  release(owner: string): boolean {
    this.expireIfNeeded();
    if (!this.lease || this.lease.owner !== owner) {
      return false;
    }
    this.lease = undefined;
    return true;
  }

  snapshot(): LeaseSnapshot | undefined {
    this.expireIfNeeded();
    return this.lease;
  }

  private expireIfNeeded(): void {
    if (this.lease && this.lease.expiresAt <= this.now()) {
      this.lease = undefined;
    }
  }

  private validate(owner: string, ttlMs: number): void {
    if (!owner.trim()) throw new Error("owner must not be empty");
    if (!Number.isFinite(ttlMs) || ttlMs <= 0) throw new RangeError("ttlMs must be positive");
  }
}
