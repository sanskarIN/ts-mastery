export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface Edge<T> {
  node: T;
  cursor: string;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

export function encodeCursor(offset: number): string {
  if (!Number.isInteger(offset) || offset < 0) {
    throw new RangeError("offset must be a non-negative integer");
  }

  return Buffer.from(JSON.stringify({ offset }), "utf8").toString("base64url");
}

export function decodeCursor(cursor: string): number {
  try {
    const parsed: unknown = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "offset" in parsed &&
      Number.isInteger((parsed as { offset: unknown }).offset) &&
      (parsed as { offset: number }).offset >= 0
    ) {
      return (parsed as { offset: number }).offset;
    }
  } catch {
    // Normalize all malformed cursor failures into one public error.
  }

  throw new Error("invalid cursor");
}

export function paginate<T>(
  items: readonly T[],
  options: { first: number; after?: string },
): Connection<T> {
  if (!Number.isInteger(options.first) || options.first <= 0) {
    throw new RangeError("first must be a positive integer");
  }

  const start = options.after === undefined ? 0 : decodeCursor(options.after) + 1;
  const slice = items.slice(start, start + options.first);
  const edges = slice.map((node, index) => ({
    node,
    cursor: encodeCursor(start + index),
  }));
  const lastOffset = start + slice.length - 1;

  return {
    edges,
    pageInfo: {
      hasNextPage: start + slice.length < items.length,
      endCursor: slice.length === 0 ? null : encodeCursor(lastOffset),
    },
  };
}
