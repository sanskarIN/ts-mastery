# Companion Project API Reference

This reference summarizes the public learning surface of all **48 larger companion projects**. The TypeScript source file remains the authoritative definition for signatures, generic parameters, and error behavior.

| Project | Primary public API | Learning purpose |
|---|---|---|
| [`study-progress-cli`](../projects/study-progress-cli/) | `ProgressSnapshot`, `normalizeCompleted`, `createSnapshot`, `percentage` | Study-progress domain and completion percentage |
| [`runtime-config`](../projects/runtime-config/) | `AppConfig`, `loadConfig` | Runtime environment validation |
| [`workflow-state-machine`](../projects/workflow-state-machine/) | `WorkflowState`, `WorkflowEvent`, `transition` | Explicit workflow transitions |
| [`typed-event-bus`](../projects/typed-event-bus/) | `EventHandler`, `TypedEventBus` | Typed event subscription and emission |
| [`ttl-cache`](../projects/ttl-cache/) | `Clock`, `TtlCache` | TTL cache with deterministic time |
| [`retry-policy`](../projects/retry-policy/) | `RetryPredicate`, `Sleep`, `RetryOptions`, `retry` | Bounded retries and backoff |
| [`circuit-breaker`](../projects/circuit-breaker/) | `CircuitState`, `CircuitOpenError`, `CircuitBreaker` | Closed/open/half-open resilience |
| [`feature-flags`](../projects/feature-flags/) | `FeatureFlag`, `FeatureFlags` | Deterministic rollout decisions |
| [`dependency-graph`](../projects/dependency-graph/) | `DependencyCycleError`, `DependencyGraph` | Topological order and cycle detection |
| [`token-bucket-rate-limiter`](../projects/token-bucket-rate-limiter/) | `Clock`, `TokenBucket` | Refillable request-capacity limiting |
| [`geojson-guard`](../projects/geojson-guard/) | `Position`, `PointGeometry`, `PointFeature`, `isPointFeature`, `parsePointFeature`, `pointDistanceSquared` | GeoJSON Point runtime guard |
| [`lru-cache`](../projects/lru-cache/) | `LruCache` | Bounded least-recently-used cache |
| [`idempotency-store`](../projects/idempotency-store/) | `IdempotencyStore` | Retry-safe operation deduplication |
| [`command-bus`](../projects/command-bus/) | `CommandCatalog`, `CommandBus` | Typed command registration and execution |
| [`validation-pipeline`](../projects/validation-pipeline/) | `ValidationRule`, `ValidationResult`, `ValidationPipeline`, `requiredText`, `minLength` | Composable validation rules |
| [`priority-task-queue`](../projects/priority-task-queue/) | `Prioritized`, `PriorityTaskQueue` | Stable priority scheduling |
| [`cursor-pagination`](../projects/cursor-pagination/) | `PageInfo`, `Edge`, `Connection`, `encodeCursor`, `decodeCursor`, `paginate` | Opaque forward pagination |
| [`bulkhead-limiter`](../projects/bulkhead-limiter/) | `BulkheadLimiter` | Bounded concurrency and queues |
| [`outbox-store`](../projects/outbox-store/) | `OutboxRecord`, `InMemoryOutbox` | Outbox record and publication tracking |
| [`middleware-pipeline`](../projects/middleware-pipeline/) | `Next`, `Middleware`, `composeMiddleware` | Onion-style middleware composition |
| [`bounding-box`](../projects/bounding-box/) | `Point2D`, `BoundingBox`, `createBoundingBox`, `contains`, `intersects`, `expand`, `fromPoints` | 2D bounds utilities |
| [`health-check-aggregator`](../projects/health-check-aggregator/) | `HealthStatus`, `HealthCheckResult`, `HealthReport`, `HealthCheckAggregator` | Readiness and health aggregation |
| [`dag-task-runner`](../projects/dag-task-runner/) | `DagTask`, `runDag` | Dependency-aware task execution |
| [`typed-store`](../projects/typed-store/) | `StoreListener`, `TypedStore` | Observable typed state |
| [`immutable-diff`](../projects/immutable-diff/) | `RecordPatch`, `diffRecord`, `applyRecordPatch` | Shallow immutable record diffs |
| [`binary-heap`](../projects/binary-heap/) | `Comparator`, `BinaryHeap` | Comparator-driven generic heap |
| [`schema-migration-planner`](../projects/schema-migration-planner/) | `Migration`, `planMigrations` | Forward migration planning |
| [`bounded-memoizer`](../projects/bounded-memoizer/) | `BoundedMemoizer` | Bounded memoization |
| [`request-context-store`](../projects/request-context-store/) | `RequestContext`, `RequestContextStore` | Async request context propagation |
| [`api-error-envelope`](../projects/api-error-envelope/) | `ErrorEnvelope`, `AppError`, `toErrorEnvelope` | Stable API failure mapping |
| [`webhook-signature`](../projects/webhook-signature/) | `signWebhook`, `verifyWebhookSignature` | HMAC-SHA256 webhook verification |
| [`etag-helper`](../projects/etag-helper/) | `createStrongEtag`, `matchesIfNoneMatch` | Conditional-request ETag helpers |
| [`typed-router`](../projects/typed-router/) | `HttpMethod`, `RouteRequest`, `RouteResponse`, `RouteHandler`, `TypedRouter` | Framework-free typed routing |
| [`dead-letter-queue`](../projects/dead-letter-queue/) | `DeadLetter`, `DeadLetterQueue` | Failed-message inspection/requeue |
| [`saga-coordinator`](../projects/saga-coordinator/) | `SagaStep`, `SagaResult`, `runSaga` | Sequential saga and compensation |
| [`lease-lock`](../projects/lease-lock/) | `LeaseSnapshot`, `LeaseLock` | Expiring owner leases |
| [`adaptive-concurrency`](../projects/adaptive-concurrency/) | `ConcurrencySample`, `AdaptiveConcurrencyController` | Latency-aware concurrency limits |
| [`error-budget-tracker`](../projects/error-budget-tracker/) | `ErrorBudgetStatus`, `ErrorBudgetTracker` | Rolling SRE error budget |
| [`deployment-rollout`](../projects/deployment-rollout/) | `RolloutPhase`, `RolloutSnapshot`, `DeploymentRollout` | Health-gated staged rollout |
| [`capacity-allocation`](../projects/capacity-allocation/) | `CapacityRequest`, `CapacityAllocation`, `allocateCapacity` | Weighted capacity allocation |
| [`config-layering`](../projects/config-layering/) | `ConfigLayer`, `mergeConfigLayers`, `requireConfigKey` | Layered runtime configuration |
| [`policy-engine`](../projects/policy-engine/) | `PolicyEffect`, `PolicyRule`, `PolicyDecision`, `decidePolicy` | Priority policy decisions |
| [`multi-region-router`](../projects/multi-region-router/) | `RegionCandidate`, `selectRegion` | Health/latency/capacity routing |
| [`coordinate-normalization`](../projects/coordinate-normalization/) | `Coordinate`, `normalizeLongitude`, `clampLatitude`, `normalizeCoordinate` | Coordinate normalization |
| [`feature-collection-guard`](../projects/feature-collection-guard/) | `GeoJsonGeometry`, `GeoJsonFeature`, `GeoJsonFeatureCollection`, `isFeatureCollection` | FeatureCollection runtime guard |
| [`tile-coordinates`](../projects/tile-coordinates/) | `TileCoordinate`, `GeographicBounds`, `lonLatToTile`, `tileBounds` | XYZ/Web Mercator tile helpers |
| [`grid-spatial-index`](../projects/grid-spatial-index/) | `IndexedPoint`, `QueryBounds`, `GridSpatialIndex` | Fixed-grid point index |
| [`route-metrics`](../projects/route-metrics/) | `LonLat`, `haversineDistanceKm`, `segmentDistancesKm`, `routeDistanceKm` | Route distance metrics |

## Usage model

These projects are compiled by the repository root rather than published as separate npm packages. Import paths inside tests therefore use local ESM-style `.js` specifiers, which TypeScript resolves through `moduleResolution: NodeNext`.

A typical source-level import inside a project test looks like:

```ts
import { TypedStore } from "./typed-store.js";
```

After compilation the corresponding JavaScript lives under `dist/projects/...`.

## Stability

The repository is an educational companion. Public symbols are documented so readers can navigate the code, but this repository does not currently promise semantic-version compatibility for each individual learning project. If an API changes, its tests, README, catalog/matrix references, and this document should change in the same pull request.

## Production use

Several projects model production patterns, but they are intentionally compact. Before using an educational implementation in a production system, evaluate persistence, concurrency semantics, observability, security, performance, distributed failure modes, and domain-specific correctness.

See [Architecture](ARCHITECTURE.md), [Project Standards](PROJECT_STANDARDS.md), and [Security Hardening](SECURITY_HARDENING.md).

---

**Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**
