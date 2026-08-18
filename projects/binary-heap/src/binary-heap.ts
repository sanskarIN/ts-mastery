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
    const top = this.items[0];
    const last = this.items.pop();
    if (this.items.length > 0 && last !== undefined) {
      this.items[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(index: number): void {
    let current = index;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      const currentValue = this.items[current];
      const parentValue = this.items[parent];
      if (currentValue === undefined || parentValue === undefined || this.compare(currentValue, parentValue) >= 0) {
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

      const bestValue = this.items[best];
      const leftValue = this.items[left];
      if (bestValue !== undefined && leftValue !== undefined && this.compare(leftValue, bestValue) < 0) {
        best = left;
      }

      const updatedBest = this.items[best];
      const rightValue = this.items[right];
      if (updatedBest !== undefined && rightValue !== undefined && this.compare(rightValue, updatedBest) < 0) {
        best = right;
      }

      if (best === current) {
        return;
      }

      const currentValue = this.items[current];
      const nextValue = this.items[best];
      if (currentValue === undefined || nextValue === undefined) {
        return;
      }
      [this.items[current], this.items[best]] = [nextValue, currentValue];
      current = best;
    }
  }
}
