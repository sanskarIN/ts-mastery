export class IdempotencyStore<T> {
  private readonly operations = new Map<string, Promise<T>>();

  run(key: string, operation: () => Promise<T> | T): Promise<T> {
    const normalized = key.trim();
    if (!normalized) {
      return Promise.reject(new Error("idempotency key must not be empty"));
    }

    const existing = this.operations.get(normalized);
    if (existing) {
      return existing;
    }

    const promise = Promise.resolve().then(operation);
    this.operations.set(normalized, promise);

    promise.catch(() => {
      if (this.operations.get(normalized) === promise) {
        this.operations.delete(normalized);
      }
    });

    return promise;
  }

  has(key: string): boolean {
    return this.operations.has(key.trim());
  }

  delete(key: string): boolean {
    return this.operations.delete(key.trim());
  }

  clear(): void {
    this.operations.clear();
  }

  get size(): number {
    return this.operations.size;
  }
}
