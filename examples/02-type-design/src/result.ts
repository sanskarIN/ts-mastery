export type Success<T> = { readonly ok: true; readonly value: T };
export type Failure<E extends string = string> = {
  readonly ok: false;
  readonly error: E;
};
export type Result<T, E extends string = string> = Success<T> | Failure<E>;

export function parsePositiveInteger(value: unknown): Result<number, 'not-a-number' | 'not-positive-integer'> {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return { ok: false, error: 'not-a-number' };
  }
  if (!Number.isInteger(value) || value <= 0) {
    return { ok: false, error: 'not-positive-integer' };
  }
  return { ok: true, value };
}
