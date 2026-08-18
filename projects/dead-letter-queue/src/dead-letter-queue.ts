export interface DeadLetter<T> {
  readonly id: string;
  readonly payload: T;
  readonly reason: string;
  readonly attempts: number;
  readonly failedAt: number;
}

export class DeadLetterQueue<T> {
  private readonly items = new Map<string, DeadLetter<T>>();

  constructor(private readonly now: () => number = Date.now) {}

  enqueue(id: string, payload: T, reason: string, attempts = 1): DeadLetter<T> {
    if (!id.trim()) throw new Error("id must not be empty");
    if (!reason.trim()) throw new Error("reason must not be empty");
    if (!Number.isInteger(attempts) || attempts <= 0) throw new RangeError("attempts must be positive");

    const item: DeadLetter<T> = { id, payload, reason, attempts, failedAt: this.now() };
    this.items.set(id, item);
    return item;
  }

  get(id: string): DeadLetter<T> | undefined {
    return this.items.get(id);
  }

  list(): readonly DeadLetter<T>[] {
    return [...this.items.values()].sort((a, b) => a.failedAt - b.failedAt || a.id.localeCompare(b.id));
  }

  requeue(id: string): DeadLetter<T> | undefined {
    const item = this.items.get(id);
    if (!item) return undefined;
    this.items.delete(id);
    return item;
  }

  get size(): number {
    return this.items.size;
  }
}
