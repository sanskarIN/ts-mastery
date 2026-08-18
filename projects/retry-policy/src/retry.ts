export type RetryPredicate = (error: unknown, attempt: number) => boolean;
export type Sleep = (delayMs: number) => Promise<void>;

export type RetryOptions = {
  maxAttempts: number;
  baseDelayMs?: number;
  shouldRetry?: RetryPredicate;
  sleep?: Sleep;
};

const defaultSleep: Sleep = async (delayMs) => {
  await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
};

export async function retry<T>(
  operation: (attempt: number) => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  if (!Number.isInteger(options.maxAttempts) || options.maxAttempts < 1) {
    throw new RangeError('maxAttempts must be a positive integer');
  }

  const baseDelayMs = options.baseDelayMs ?? 0;
  if (!Number.isFinite(baseDelayMs) || baseDelayMs < 0) {
    throw new RangeError('baseDelayMs must be a non-negative finite number');
  }

  const shouldRetry = options.shouldRetry ?? (() => true);
  const sleep = options.sleep ?? defaultSleep;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      const exhausted = attempt === options.maxAttempts;
      if (exhausted || !shouldRetry(error, attempt)) throw error;

      const delayMs = baseDelayMs * 2 ** (attempt - 1);
      await sleep(delayMs);
    }
  }

  throw new Error('retry reached an unreachable state');
}
