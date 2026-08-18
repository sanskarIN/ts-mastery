export type ValidationRule<T> = (value: T) => string | null;

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };

export class ValidationPipeline<T> {
  private readonly rules: ValidationRule<T>[] = [];

  add(rule: ValidationRule<T>): this {
    this.rules.push(rule);
    return this;
  }

  validate(value: T): ValidationResult<T> {
    const errors: string[] = [];

    for (const rule of this.rules) {
      const message = rule(value);
      if (message) {
        errors.push(message);
      }
    }

    return errors.length === 0
      ? { ok: true, value }
      : { ok: false, errors };
  }

  get size(): number {
    return this.rules.length;
  }
}

export function requiredText(label: string): ValidationRule<string> {
  return (value) => value.trim() ? null : `${label} is required`;
}

export function minLength(label: string, minimum: number): ValidationRule<string> {
  if (!Number.isInteger(minimum) || minimum < 0) {
    throw new RangeError("minimum must be a non-negative integer");
  }

  return (value) => value.length >= minimum
    ? null
    : `${label} must be at least ${minimum} characters`;
}
