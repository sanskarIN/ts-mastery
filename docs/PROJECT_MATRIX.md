# Companion Project Matrix

> **Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**

This matrix maps all **48 larger runnable companion projects** to the 120-part TypeScript Full Mastery curriculum.

| Project | Primary concepts | Suggested parts |
|---|---|---|
| [`study-progress-cli`](../projects/study-progress-cli/) | 120-part study progress domain and CLI | 18, 28 |
| [`runtime-config`](../projects/runtime-config/) | Runtime environment validation before typed use | 12, 28, 51–54 |
| [`workflow-state-machine`](../projects/workflow-state-machine/) | Explicit durable workflow states and transitions | 18, 118–120 |
| [`typed-event-bus`](../projects/typed-event-bus/) | Strongly typed event subscriptions, emission and one-shot listeners | 23, 116–117 |
| [`ttl-cache`](../projects/ttl-cache/) | Generic in-memory cache with deterministic TTL expiry | 16, 20, 33 |
| [`retry-policy`](../projects/retry-policy/) | Bounded asynchronous retries with exponential backoff | 13, 98, 114–120 |
| [`circuit-breaker`](../projects/circuit-breaker/) | Closed, open and half-open resilience state transitions | 98, 114–120 |
| [`feature-flags`](../projects/feature-flags/) | Deterministic percentage rollouts and feature gating | 104–107, 120 |
| [`dependency-graph`](../projects/dependency-graph/) | Topological ordering and dependency cycle detection | 94, 106–107 |
| [`token-bucket-rate-limiter`](../projects/token-bucket-rate-limiter/) | Token-bucket request limiting with deterministic refill | 21, 25, 98, 120 |
| [`geojson-guard`](../projects/geojson-guard/) | Runtime-safe GeoJSON Point Feature validation | 12, 80–84 |
| [`lru-cache`](../projects/lru-cache/) | Generic least-recently-used caching and deterministic eviction | 16, 20, 33 |
| [`idempotency-store`](../projects/idempotency-store/) | Request/job deduplication and retry-safe operation reuse | 23, 25, 115–118 |
| [`command-bus`](../projects/command-bus/) | Strongly typed command registration and async dispatch | 22, 30, 46–47 |
| [`validation-pipeline`](../projects/validation-pipeline/) | Composable validation rules with typed success/failure results | 12, 25–30 |
| [`priority-task-queue`](../projects/priority-task-queue/) | Stable priority scheduling for workers and orchestration | 13, 47, 115–120 |
| [`cursor-pagination`](../projects/cursor-pagination/) | Opaque cursor encoding and forward API pagination | 25–26, 48–50 |
| [`bulkhead-limiter`](../projects/bulkhead-limiter/) | Concurrency isolation, bounded queues, and overload rejection | 13, 98, 114–120 |
| [`outbox-store`](../projects/outbox-store/) | Reliable messaging outbox records and publication tracking | 23, 116–118 |
| [`middleware-pipeline`](../projects/middleware-pipeline/) | Typed asynchronous middleware composition and ordering | 22, 25, 29–30, 46–50 |
| [`bounding-box`](../projects/bounding-box/) | Validated geospatial bounds, containment, intersection and expansion | 80–95 |
| [`health-check-aggregator`](../projects/health-check-aggregator/) | Typed up/degraded/down readiness aggregation | 98, 114, 120 |
| [`dag-task-runner`](../projects/dag-task-runner/) | Dependency-aware task execution with cycle detection | 106–107, 118–120 |
| [`typed-store`](../projects/typed-store/) | Generic observable state with typed subscriptions and updates | 16–18, 31–34 |
| [`immutable-diff`](../projects/immutable-diff/) | Deterministic immutable record diff and patch operations | 4, 16–18, 104–105 |
| [`binary-heap`](../projects/binary-heap/) | Generic comparator-driven binary heap | 8–9, 16, 20, 94 |
| [`schema-migration-planner`](../projects/schema-migration-planner/) | Deterministic forward schema migration planning | 24, 82, 104–106 |
| [`bounded-memoizer`](../projects/bounded-memoizer/) | Bounded memoization with LRU-style refresh | 8, 16, 20, 33 |
| [`request-context-store`](../projects/request-context-store/) | Async request correlation context propagation | 13, 25–30, 46–50, 98 |
| [`api-error-envelope`](../projects/api-error-envelope/) | Stable API error contracts and safe unexpected-error mapping | 12, 21, 25–30, 48–50, 109 |
| [`webhook-signature`](../projects/webhook-signature/) | HMAC-SHA256 webhook signing and timing-safe verification | 21, 25, 47–50, 108–110 |
| [`etag-helper`](../projects/etag-helper/) | Strong ETag generation and If-None-Match matching | 25, 29, 50–54, 98 |
| [`typed-router`](../projects/typed-router/) | Framework-free typed route registration and dispatch | 22, 25, 28–30, 46–50 |
| [`dead-letter-queue`](../projects/dead-letter-queue/) | Failed-message metadata, inspection, and requeue simulation | 23, 47, 116–120 |
| [`saga-coordinator`](../projects/saga-coordinator/) | Sequential saga execution with reverse compensation | 23, 117–120 |
| [`lease-lock`](../projects/lease-lock/) | Deterministic expiring owner lease/lock model | 13, 23, 114–120 |
| [`adaptive-concurrency`](../projects/adaptive-concurrency/) | Latency- and failure-aware adaptive concurrency limits | 13, 20, 98, 114–120 |
| [`error-budget-tracker`](../projects/error-budget-tracker/) | Rolling availability and error-budget tracking | 98, 114–120 |
| [`deployment-rollout`](../projects/deployment-rollout/) | Health-gated staged deployment and rollback model | 98, 104–107, 114, 120 |
| [`capacity-allocation`](../projects/capacity-allocation/) | Weighted capacity allocation with minimum guarantees | 98–100, 114, 120 |
| [`config-layering`](../projects/config-layering/) | Precedence-based configuration merging and required-key narrowing | 12, 28, 51–54, 104–107 |
| [`policy-engine`](../projects/policy-engine/) | Priority policy decisions with default-deny behavior | 21–22, 97, 109–112 |
| [`multi-region-router`](../projects/multi-region-router/) | Health-, latency-, and capacity-aware region selection | 98–100, 114, 120 |
| [`coordinate-normalization`](../projects/coordinate-normalization/) | Longitude wrapping and latitude clamping helpers | 75–90 |
| [`feature-collection-guard`](../projects/feature-collection-guard/) | Runtime GeoJSON FeatureCollection structural validation | 12, 80–84, 96 |
| [`tile-coordinates`](../projects/tile-coordinates/) | Web Mercator XYZ tile coordinate and bounds helpers | 75, 81–88 |
| [`grid-spatial-index`](../projects/grid-spatial-index/) | Fixed-grid point spatial indexing and bounding-box queries | 82–95 |
| [`route-metrics`](../projects/route-metrics/) | Haversine segment and total route distance metrics | 80, 90, 94–95 |

## How to use the matrix

1. Open the relevant book part.
2. Follow its public companion links.
3. Read the project README and tests.
4. Modify or extend the implementation.
5. Run `npm run verify`.

A project may support several parts, and a part may use multiple projects. The matrix is navigation metadata, not a replacement for the commercial manuscript.

See [API Reference](API_REFERENCE.md) and [Parts Index](PARTS_INDEX.md).

---

**Official TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**
