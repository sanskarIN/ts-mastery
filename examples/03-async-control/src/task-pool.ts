export async function mapWithConcurrency<T, R>(
  values: readonly T[],
  concurrency: number,
  worker: (value: T, index: number) => Promise<R>,
): Promise<R[]> {
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new RangeError('concurrency must be a positive integer');
  }

  const results = new Array<R>(values.length);
  let nextIndex = 0;

  async function run(): Promise<void> {
    while (true) {
      const index = nextIndex++;
      if (index >= values.length) return;
      const value = values[index] as T;
      results[index] = await worker(value, index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, () => run()),
  );
  return results;
}
