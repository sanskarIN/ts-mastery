export interface Prioritized<T> {
  value: T;
  priority: number;
}

interface QueueEntry<T> extends Prioritized<T> {
  sequence: number;
}

export class PriorityTaskQueue<T> {
  private readonly entries: QueueEntry<T>[] = [];
  private sequence = 0;

  enqueue(value: T, priority = 0): void {
    if (!Number.isFinite(priority)) {
      throw new TypeError("priority must be finite");
    }

    this.entries.push({ value, priority, sequence: this.sequence++ });
    this.entries.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return a.sequence - b.sequence;
    });
  }

  dequeue(): T | undefined {
    return this.entries.shift()?.value;
  }

  peek(): T | undefined {
    return this.entries[0]?.value;
  }

  get size(): number {
    return this.entries.length;
  }

  clear(): void {
    this.entries.length = 0;
  }

  snapshot(): Prioritized<T>[] {
    return this.entries.map(({ value, priority }) => ({ value, priority }));
  }
}
