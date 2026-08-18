export type StoreListener<T> = (value: T, previous: T) => void;

export class TypedStore<T> {
  private listeners = new Set<StoreListener<T>>();

  constructor(private current: T) {}

  get value(): T {
    return this.current;
  }

  set(next: T): void {
    if (Object.is(this.current, next)) {
      return;
    }
    const previous = this.current;
    this.current = next;
    for (const listener of [...this.listeners]) {
      listener(next, previous);
    }
  }

  update(updater: (current: T) => T): void {
    this.set(updater(this.current));
  }

  subscribe(listener: StoreListener<T>): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  get subscriberCount(): number {
    return this.listeners.size;
  }
}
