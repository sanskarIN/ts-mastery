export type Clock = () => number;

type Entry<V> = {
  value: V;
  expiresAt: number;
};

export class TtlCache<K, V> {
  private readonly entries = new Map<K, Entry<V>>();

  constructor(private readonly now: Clock = Date.now) {}

  set(key: K, value: V, ttlMs: number): void {
    if (!Number.isFinite(ttlMs) || ttlMs <= 0) {
      throw new RangeError('ttlMs must be a positive finite number');
    }
    this.entries.set(key, { value, expiresAt: this.now() + ttlMs });
  }

  get(key: K): V | undefined {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt <= this.now()) {
      this.entries.delete(key);
      return undefined;
    }
    return entry.value;
  }

  has(key: K): boolean {
    const entry = this.entries.get(key);
    if (!entry) return false;
    if (entry.expiresAt <= this.now()) {
      this.entries.delete(key);
      return false;
    }
    return true;
  }

  delete(key: K): boolean {
    return this.entries.delete(key);
  }

  sweep(): number {
    let removed = 0;
    const now = this.now();
    for (const [key, entry] of this.entries) {
      if (entry.expiresAt <= now) {
        this.entries.delete(key);
        removed += 1;
      }
    }
    return removed;
  }

  get size(): number {
    this.sweep();
    return this.entries.size;
  }
}
