export interface IndexedPoint<T> {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly value: T;
}

export interface QueryBounds {
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
}

export class GridSpatialIndex<T> {
  private readonly cells = new Map<string, Map<string, IndexedPoint<T>>>();
  private readonly byId = new Map<string, IndexedPoint<T>>();

  constructor(readonly cellSize: number) {
    if (!Number.isFinite(cellSize) || cellSize <= 0) {
      throw new RangeError("cellSize must be positive");
    }
  }

  insert(point: IndexedPoint<T>): void {
    if (!point.id.trim()) throw new Error("point id must not be empty");
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) throw new RangeError("point coordinates must be finite");
    if (this.byId.has(point.id)) throw new Error(`duplicate point id: ${point.id}`);

    const key = this.cellKey(point.x, point.y);
    let cell = this.cells.get(key);
    if (!cell) {
      cell = new Map();
      this.cells.set(key, cell);
    }
    cell.set(point.id, point);
    this.byId.set(point.id, point);
  }

  remove(id: string): boolean {
    const point = this.byId.get(id);
    if (!point) return false;
    const key = this.cellKey(point.x, point.y);
    const cell = this.cells.get(key);
    cell?.delete(id);
    if (cell?.size === 0) this.cells.delete(key);
    this.byId.delete(id);
    return true;
  }

  query(bounds: QueryBounds): readonly IndexedPoint<T>[] {
    this.validateBounds(bounds);
    const minCellX = Math.floor(bounds.minX / this.cellSize);
    const maxCellX = Math.floor(bounds.maxX / this.cellSize);
    const minCellY = Math.floor(bounds.minY / this.cellSize);
    const maxCellY = Math.floor(bounds.maxY / this.cellSize);
    const matches: IndexedPoint<T>[] = [];

    for (let cx = minCellX; cx <= maxCellX; cx += 1) {
      for (let cy = minCellY; cy <= maxCellY; cy += 1) {
        const cell = this.cells.get(`${cx}:${cy}`);
        if (!cell) continue;
        for (const point of cell.values()) {
          if (
            point.x >= bounds.minX &&
            point.x <= bounds.maxX &&
            point.y >= bounds.minY &&
            point.y <= bounds.maxY
          ) {
            matches.push(point);
          }
        }
      }
    }

    return matches.sort((a, b) => a.id.localeCompare(b.id));
  }

  get size(): number {
    return this.byId.size;
  }

  private cellKey(x: number, y: number): string {
    return `${Math.floor(x / this.cellSize)}:${Math.floor(y / this.cellSize)}`;
  }

  private validateBounds(bounds: QueryBounds): void {
    const values = [bounds.minX, bounds.minY, bounds.maxX, bounds.maxY];
    if (values.some((value) => !Number.isFinite(value)) || bounds.minX > bounds.maxX || bounds.minY > bounds.maxY) {
      throw new RangeError("query bounds are invalid");
    }
  }
}
