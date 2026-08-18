export type Position = readonly [number, number, ...number[]];

export type PointGeometry = {
  type: 'Point';
  coordinates: Position;
};

export type PointFeature = {
  type: 'Feature';
  geometry: PointGeometry;
  properties: Record<string, unknown> | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isPosition(value: unknown): value is Position {
  if (!Array.isArray(value) || value.length < 2 || !value.every((item) => typeof item === 'number' && Number.isFinite(item))) {
    return false;
  }
  const longitude = value[0];
  const latitude = value[1];
  return longitude !== undefined && latitude !== undefined && longitude >= -180 && longitude <= 180 && latitude >= -90 && latitude <= 90;
}

export function isPointFeature(value: unknown): value is PointFeature {
  if (!isRecord(value) || value.type !== 'Feature') return false;
  if (!(value.properties === null || isRecord(value.properties))) return false;

  const geometry = value.geometry;
  if (!isRecord(geometry) || geometry.type !== 'Point') return false;
  return isPosition(geometry.coordinates);
}

export function parsePointFeature(value: unknown): PointFeature {
  if (!isPointFeature(value)) {
    throw new TypeError('Expected a valid GeoJSON Point Feature');
  }
  return value;
}

export function pointDistanceSquared(a: PointFeature, b: PointFeature): number {
  const [ax, ay] = a.geometry.coordinates;
  const [bx, by] = b.geometry.coordinates;
  return (ax - bx) ** 2 + (ay - by) ** 2;
}
