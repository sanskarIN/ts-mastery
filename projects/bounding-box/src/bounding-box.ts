export interface Point2D {
  x: number;
  y: number;
}

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

function assertFinite(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${label} must be finite`);
  }
}

export function createBoundingBox(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
): BoundingBox {
  assertFinite(minX, "minX");
  assertFinite(minY, "minY");
  assertFinite(maxX, "maxX");
  assertFinite(maxY, "maxY");

  if (minX > maxX || minY > maxY) {
    throw new RangeError("minimum coordinates must not exceed maximum coordinates");
  }

  return { minX, minY, maxX, maxY };
}

export function contains(box: BoundingBox, point: Point2D): boolean {
  return point.x >= box.minX && point.x <= box.maxX &&
    point.y >= box.minY && point.y <= box.maxY;
}

export function intersects(a: BoundingBox, b: BoundingBox): boolean {
  return !(a.maxX < b.minX || b.maxX < a.minX || a.maxY < b.minY || b.maxY < a.minY);
}

export function expand(box: BoundingBox, point: Point2D): BoundingBox {
  assertFinite(point.x, "point.x");
  assertFinite(point.y, "point.y");
  return {
    minX: Math.min(box.minX, point.x),
    minY: Math.min(box.minY, point.y),
    maxX: Math.max(box.maxX, point.x),
    maxY: Math.max(box.maxY, point.y),
  };
}

export function fromPoints(points: readonly Point2D[]): BoundingBox {
  const first = points[0];
  if (!first) {
    throw new Error("at least one point is required");
  }

  let box = createBoundingBox(first.x, first.y, first.x, first.y);
  for (const point of points.slice(1)) {
    box = expand(box, point);
  }
  return box;
}
