export type HealthStatus = "up" | "degraded" | "down";

export interface HealthCheckResult {
  name: string;
  status: HealthStatus;
  detail: string | null;
}

export interface HealthReport {
  status: HealthStatus;
  checks: HealthCheckResult[];
}

type HealthCheck = () => Promise<Omit<HealthCheckResult, "name">> | Omit<HealthCheckResult, "name">;

export class HealthCheckAggregator {
  private readonly checks = new Map<string, HealthCheck>();

  register(name: string, check: HealthCheck): () => void {
    const normalized = name.trim();
    if (!normalized) {
      throw new Error("health check name must not be empty");
    }
    if (this.checks.has(normalized)) {
      throw new Error(`health check already registered: ${normalized}`);
    }

    this.checks.set(normalized, check);
    return () => {
      this.checks.delete(normalized);
    };
  }

  async evaluate(): Promise<HealthReport> {
    const checks = await Promise.all(
      [...this.checks.entries()].map(async ([name, check]) => {
        try {
          const result = await check();
          return { name, ...result } satisfies HealthCheckResult;
        } catch (error) {
          return {
            name,
            status: "down" as const,
            detail: error instanceof Error ? error.message : "health check failed",
          };
        }
      }),
    );

    const status: HealthStatus = checks.some((check) => check.status === "down")
      ? "down"
      : checks.some((check) => check.status === "degraded")
        ? "degraded"
        : "up";

    return { status, checks };
  }

  get size(): number {
    return this.checks.size;
  }
}
