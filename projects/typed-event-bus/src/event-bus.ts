export type EventHandler<T> = (payload: T) => void;

export class TypedEventBus<Events extends object> {
  private readonly listeners = new Map<keyof Events, Set<EventHandler<Events[keyof Events]>>>();

  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    const listeners = this.listeners.get(event) ?? new Set<EventHandler<Events[keyof Events]>>();
    listeners.add(handler as EventHandler<Events[keyof Events]>);
    this.listeners.set(event, listeners);

    return () => this.off(event, handler);
  }

  once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    const unsubscribe = this.on(event, (payload) => {
      unsubscribe();
      handler(payload);
    });
    return unsubscribe;
  }

  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    const listeners = this.listeners.get(event);
    if (!listeners) return;

    listeners.delete(handler as EventHandler<Events[keyof Events]>);
    if (listeners.size === 0) this.listeners.delete(event);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): number {
    const listeners = this.listeners.get(event);
    if (!listeners) return 0;

    for (const listener of [...listeners]) {
      listener(payload);
    }
    return listeners.size;
  }

  listenerCount<K extends keyof Events>(event: K): number {
    return this.listeners.get(event)?.size ?? 0;
  }
}
