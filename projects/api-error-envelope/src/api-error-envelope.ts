export interface ErrorEnvelope {
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly requestId: string;
    readonly details?: Readonly<Record<string, unknown>>;
  };
}

export class AppError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: number,
    readonly details?: Readonly<Record<string, unknown>>,
  ) {
    super(message);
    this.name = "AppError";
    if (!code.trim()) {
      throw new Error("error code must not be empty");
    }
    if (!Number.isInteger(status) || status < 400 || status > 599) {
      throw new RangeError("status must be an HTTP error status");
    }
  }
}

export function toErrorEnvelope(error: unknown, requestId: string): ErrorEnvelope {
  if (!requestId.trim()) {
    throw new Error("requestId must not be empty");
  }

  if (error instanceof AppError) {
    const base = {
      code: error.code,
      message: error.message,
      requestId,
    };
    return error.details === undefined
      ? { error: base }
      : { error: { ...base, details: error.details } };
  }

  return {
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
      requestId,
    },
  };
}
