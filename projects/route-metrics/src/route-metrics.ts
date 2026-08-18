export interface LonLat {
  readonly longitude: number;
  readonly latitude: number;
}

const EARTH_RADIUS_KM = 6371.0088;

function radians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function validate(point: LonLat): void {
  if (
    !Number.isFinite(point.longitude) ||
    !Number.isFinite(point.latitude) ||
    point.latitude < -90 ||
    point.latitude > 90
  ) {
    throw new RangeError("invalid geographic coordinate");
  }
}

export function haversineDistanceKm(a: LonLat, b: LonLat): number {
  validate(a);
  validate(b);
  const lat1 = radians(a.latitude);
  const lat2 = radians(b.latitude);
  const deltaLat = radians(b.latitude - a.latitude);
  const deltaLon = radians(b.longitude - a.longitude);

  const h =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function segmentDistancesKm(route: readonly LonLat[]): readonly number[] {
  const distances: number[] = [];
  for (let index = 1; index < route.length; index += 1) {
    const previous = route[index - 1];
    const current = route[index];
    if (!previous || !current) continue;
    distances.push(haversineDistanceKm(previous, current));
  }
  return distances;
}

export function routeDistanceKm(route: readonly LonLat[]): number {
  return segmentDistancesKm(route).reduce((sum, distance) => sum + distance, 0);
}
