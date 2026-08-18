export type Comparator<T> = (left: T, right: T) => number;

export class BinaryHeap<T> {
  private readonly items: T[] = [];

  constructor(private readonly compare: Comparator<T>) {}

  get size(): number {
    return this.items.length;
  }

  peek(): T | undefined {
    return this.items[0];
  }

  push(value: T): void {
    this.items.push(value);
    this.bubbleUp(this.items.length - 1);
  }

  pop(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    }

    const top = this.items[0] as T;
    const last = this.items.pop() as T;
    if (this.items.length > 0) {
      this.items[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(index: number): void {
    let current = index;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      const currentValue = this.items[current] as T;
      const parentValue = this.items[parent] as T;
      if (this.compare(currentValue, parentValue) >= 0) {
        return;
      }
      [this.items[current], this.items[parent]] = [parentValue, currentValue];
      current = parent;
    }
  }

  private bubbleDown(index: number): void {
    let current = index;
    while (true) {
      const left = current * 2 + 1;
      const right = left + 1;
      let best = current;

      if (left < this.items.length) {
        const leftValue = this.items[left] as T;
        const bestValue = this.items[best] as T;
        if (this.compare(leftValue, bestValue) < 0) {
          best = left;
        }
      }

      if (right < this.items.length) {
        const rightValue = this.items[right] as T;
        const bestValue = this.items[best] as T;
        if (this.compare(rightValue, bestValue) < 0) {
          best = right;
        }
      }

      if (best === current) {
        return;
      }

      const currentValue = this.items[current] as T;
      const nextValue = this.items[best] as T;
      [this.items[current], this.items[best]] = [nextValue, currentValue];
      current = best;
    }
  }
}
