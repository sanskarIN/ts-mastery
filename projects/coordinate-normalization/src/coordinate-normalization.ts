export interface Coordinate {
  readonly longitude: number;
  readonly latitude: number;
}

export function normalizeLongitude(longitude: number): number {
  if (!Number.isFinite(longitude)) {
    throw new RangeError("longitude must be finite");
  }
  return ((longitude + 180) % 360 + 360) % 360 - 180;
}

export function clampLatitude(latitude: number): number {
  if (!Number.isFinite(latitude)) {
    throw new RangeError("latitude must be finite");
  }
  return Math.max(-90, Math.min(90, latitude));
}

export function normalizeCoordinate(coordinate: Coordinate): Coordinate {
  return {
    longitude: normalizeLongitude(coordinate.longitude),
    latitude: clampLatitude(coordinate.latitude),
  };
}
