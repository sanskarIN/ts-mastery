export interface CapacityRequest {
  readonly id: string;
  readonly minimum: number;
  readonly desired: number;
  readonly weight: number;
}

export interface CapacityAllocation {
  readonly id: string;
  readonly allocated: number;
}

export function allocateCapacity(
  total: number,
  requests: readonly CapacityRequest[],
): readonly CapacityAllocation[] {
  if (!Number.isFinite(total) || total < 0) throw new RangeError("total must be non-negative");

  const seen = new Set<string>();
  for (const request of requests) {
    if (!request.id.trim() || seen.has(request.id)) throw new Error("request ids must be unique and non-empty");
    seen.add(request.id);
    if (
      !Number.isFinite(request.minimum) ||
      !Number.isFinite(request.desired) ||
      request.minimum < 0 ||
      request.desired < request.minimum ||
      !Number.isFinite(request.weight) ||
      request.weight <= 0
    ) {
      throw new RangeError("capacity requests must satisfy 0 <= minimum <= desired and weight > 0");
    }
  }

  const minimumTotal = requests.reduce((sum, request) => sum + request.minimum, 0);
  if (minimumTotal > total + Number.EPSILON) {
    throw new Error("total capacity cannot satisfy minimum allocations");
  }

  const allocated = new Map(requests.map((request) => [request.id, request.minimum] as const));
  let remaining = total - minimumTotal;
  let active = requests.filter((request) => request.desired > request.minimum);

  while (remaining > 1e-12 && active.length > 0) {
    const totalWeight = active.reduce((sum, request) => sum + request.weight, 0);
    let distributed = 0;

    for (const request of active) {
      const current = allocated.get(request.id) ?? 0;
      const room = request.desired - current;
      const share = remaining * (request.weight / totalWeight);
      const grant = Math.min(room, share);
      allocated.set(request.id, current + grant);
      distributed += grant;
    }

    remaining -= distributed;
    if (distributed <= 1e-12) break;
    active = active.filter((request) => (allocated.get(request.id) ?? 0) < request.desired - 1e-12);
  }

  return requests.map((request) => ({
    id: request.id,
    allocated: allocated.get(request.id) ?? 0,
  }));
}
