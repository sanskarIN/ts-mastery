type StartJob = () => void;

export class BulkheadLimiter {
  private activeCount = 0;
  private readonly queue: StartJob[] = [];

  constructor(
    private readonly maxConcurrent: number,
    private readonly maxQueued = Number.POSITIVE_INFINITY,
  ) {
    if (!Number.isInteger(maxConcurrent) || maxConcurrent <= 0) {
      throw new RangeError("maxConcurrent must be a positive integer");
    }
    if (
      maxQueued !== Number.POSITIVE_INFINITY &&
      (!Number.isInteger(maxQueued) || maxQueued < 0)
    ) {
      throw new RangeError("maxQueued must be a non-negative integer or Infinity");
    }
  }

  get active(): number {
    return this.activeCount;
  }

  get queued(): number {
    return this.queue.length;
  }

  run<T>(task: () => Promise<T> | T): Promise<T> {
    if (this.activeCount >= this.maxConcurrent && this.queue.length >= this.maxQueued) {
      return Promise.reject(new Error("bulkhead queue is full"));
    }

    return new Promise<T>((resolve, reject) => {
      const start = () => {
        this.activeCount += 1;
        Promise.resolve()
          .then(task)
          .then(resolve, reject)
          .finally(() => {
            this.activeCount -= 1;
            this.pump();
          });
      };

      if (this.activeCount < this.maxConcurrent) {
        start();
      } else {
        this.queue.push(start);
      }
    });
  }

  private pump(): void {
    while (this.activeCount < this.maxConcurrent) {
      const next = this.queue.shift();
      if (!next) {
        return;
      }
      next();
    }
  }
}
