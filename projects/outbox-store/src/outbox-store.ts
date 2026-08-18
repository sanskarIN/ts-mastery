export interface OutboxRecord<Event> {
  id: string;
  event: Event;
  createdAt: number;
  publishedAt: number | null;
}

export class InMemoryOutbox<Event> {
  private readonly records = new Map<string, OutboxRecord<Event>>();

  constructor(private readonly now: () => number = Date.now) {}

  enqueue(id: string, event: Event): OutboxRecord<Event> {
    const normalized = id.trim();
    if (!normalized) {
      throw new Error("outbox id must not be empty");
    }
    if (this.records.has(normalized)) {
      throw new Error(`duplicate outbox id: ${normalized}`);
    }

    const record: OutboxRecord<Event> = {
      id: normalized,
      event,
      createdAt: this.now(),
      publishedAt: null,
    };
    this.records.set(normalized, record);
    return { ...record };
  }

  pending(limit = 100): OutboxRecord<Event>[] {
    if (!Number.isInteger(limit) || limit <= 0) {
      throw new RangeError("limit must be a positive integer");
    }

    return [...this.records.values()]
      .filter((record) => record.publishedAt === null)
      .sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id))
      .slice(0, limit)
      .map((record) => ({ ...record }));
  }

  markPublished(ids: readonly string[]): number {
    const publishedAt = this.now();
    let changed = 0;

    for (const id of ids) {
      const record = this.records.get(id);
      if (!record || record.publishedAt !== null) {
        continue;
      }
      record.publishedAt = publishedAt;
      changed += 1;
    }

    return changed;
  }

  get(id: string): OutboxRecord<Event> | undefined {
    const record = this.records.get(id);
    return record ? { ...record } : undefined;
  }

  get size(): number {
    return this.records.size;
  }
}
