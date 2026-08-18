export type GeoJsonGeometry =
  | { readonly type: "Point"; readonly coordinates: readonly unknown[] }
  | { readonly type: "MultiPoint"; readonly coordinates: readonly unknown[] }
  | { readonly type: "LineString"; readonly coordinates: readonly unknown[] }
  | { readonly type: "MultiLineString"; readonly coordinates: readonly unknown[] }
  | { readonly type: "Polygon"; readonly coordinates: readonly unknown[] }
  | { readonly type: "MultiPolygon"; readonly coordinates: readonly unknown[] }
  | { readonly type: "GeometryCollection"; readonly geometries: readonly GeoJsonGeometry[] };

export interface GeoJsonFeature {
  readonly type: "Feature";
  readonly properties: Readonly<Record<string, unknown>> | null;
  readonly geometry: GeoJsonGeometry | null;
}

export interface GeoJsonFeatureCollection {
  readonly type: "FeatureCollection";
  readonly features: readonly GeoJsonFeature[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isGeometry(value: unknown): value is GeoJsonGeometry {
  if (!isRecord(value) || typeof value.type !== "string") return false;

  if (value.type === "GeometryCollection") {
    return Array.isArray(value.geometries) && value.geometries.every(isGeometry);
  }

  const coordinateTypes = new Set([
    "Point",
    "MultiPoint",
    "LineString",
    "MultiLineString",
    "Polygon",
    "MultiPolygon",
  ]);

  return coordinateTypes.has(value.type) && Array.isArray(value.coordinates);
}

function isFeature(value: unknown): value is GeoJsonFeature {
  if (!isRecord(value) || value.type !== "Feature") return false;
  const propertiesValid = value.properties === null || isRecord(value.properties);
  const geometryValid = value.geometry === null || isGeometry(value.geometry);
  return propertiesValid && geometryValid;
}

export function isFeatureCollection(value: unknown): value is GeoJsonFeatureCollection {
  return (
    isRecord(value) &&
    value.type === "FeatureCollection" &&
    Array.isArray(value.features) &&
    value.features.every(isFeature)
  );
}
