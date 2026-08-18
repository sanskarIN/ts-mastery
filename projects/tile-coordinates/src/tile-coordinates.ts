const MAX_MERCATOR_LATITUDE = 85.05112878;

export interface TileCoordinate {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface GeographicBounds {
  readonly west: number;
  readonly south: number;
  readonly east: number;
  readonly north: number;
}

function validateZoom(z: number): void {
  if (!Number.isInteger(z) || z < 0 || z > 30) {
    throw new RangeError("zoom must be an integer from 0 through 30");
  }
}

function wrapLongitude(longitude: number): number {
  if (!Number.isFinite(longitude)) throw new RangeError("longitude must be finite");
  return ((longitude + 180) % 360 + 360) % 360 - 180;
}

export function lonLatToTile(longitude: number, latitude: number, z: number): TileCoordinate {
  validateZoom(z);
  if (!Number.isFinite(latitude)) throw new RangeError("latitude must be finite");

  const lon = wrapLongitude(longitude);
  const lat = Math.max(-MAX_MERCATOR_LATITUDE, Math.min(MAX_MERCATOR_LATITUDE, latitude));
  const n = 2 ** z;
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n,
  );

  return {
    x: Math.max(0, Math.min(n - 1, x)),
    y: Math.max(0, Math.min(n - 1, y)),
    z,
  };
}

function tileYToLatitude(y: number, n: number): number {
  return (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * 180) / Math.PI;
}

export function tileBounds(tile: TileCoordinate): GeographicBounds {
  validateZoom(tile.z);
  const n = 2 ** tile.z;
  if (!Number.isInteger(tile.x) || !Number.isInteger(tile.y) || tile.x < 0 || tile.y < 0 || tile.x >= n || tile.y >= n) {
    throw new RangeError("tile x/y are outside the zoom range");
  }

  return {
    west: (tile.x / n) * 360 - 180,
    east: ((tile.x + 1) / n) * 360 - 180,
    north: tileYToLatitude(tile.y, n),
    south: tileYToLatitude(tile.y + 1, n),
  };
}
