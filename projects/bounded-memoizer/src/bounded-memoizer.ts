export class BoundedMemoizer<K, V> {
  private readonly cache = new Map<K, V>();

  constructor(private readonly capacity: number) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new RangeError("capacity must be a positive integer");
    }
  }

  get size(): number {
    return this.cache.size;
  }

  getOrCompute(key: K, compute: () => V): V {
    const existing = this.cache.get(key);
    if (existing !== undefined || this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, existing as V);
      return existing as V;
    }

    const value = compute();
    this.cache.set(key, value);
    this.evict();
    return value;
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  private evict(): void {
    while (this.cache.size > this.capacity) {
      const oldest = this.cache.keys().next().value as K | undefined;
      if (oldest === undefined) {
        return;
      }
      this.cache.delete(oldest);
    }
  }
}
