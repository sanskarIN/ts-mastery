# TypeScript Full Mastery — Companion Projects

[![Official Gumroad Store](../assets/gumroad-store-banner.svg)](https://ramsandesh.gumroad.com)

This directory contains the **48 larger runnable companion projects** for the TypeScript Full Mastery curriculum. Every project is included in the root strict TypeScript build and automated test collection.

## Foundations, state, data structures

- [`study-progress-cli`](study-progress-cli/) — 120-part study progress domain and CLI.
- [`runtime-config`](runtime-config/) — Runtime environment validation before typed use.
- [`typed-store`](typed-store/) — Generic observable state with typed subscriptions and updates.
- [`immutable-diff`](immutable-diff/) — Deterministic immutable record diff and patch operations.
- [`binary-heap`](binary-heap/) — Generic comparator-driven binary heap.
- [`bounded-memoizer`](bounded-memoizer/) — Bounded memoization with LRU-style refresh.
- [`lru-cache`](lru-cache/) — Generic least-recently-used caching and deterministic eviction.
- [`ttl-cache`](ttl-cache/) — Generic in-memory cache with deterministic TTL expiry.
- [`validation-pipeline`](validation-pipeline/) — Composable validation rules with typed success/failure results.
- [`schema-migration-planner`](schema-migration-planner/) — Deterministic forward schema migration planning.

## Application and API architecture

- [`workflow-state-machine`](workflow-state-machine/) — Explicit durable workflow states and transitions.
- [`typed-event-bus`](typed-event-bus/) — Strongly typed event subscriptions, emission and one-shot listeners.
- [`command-bus`](command-bus/) — Strongly typed command registration and async dispatch.
- [`middleware-pipeline`](middleware-pipeline/) — Typed asynchronous middleware composition and ordering.
- [`request-context-store`](request-context-store/) — Async request correlation context propagation.
- [`api-error-envelope`](api-error-envelope/) — Stable API error contracts and safe unexpected-error mapping.
- [`cursor-pagination`](cursor-pagination/) — Opaque cursor encoding and forward API pagination.
- [`typed-router`](typed-router/) — Framework-free typed route registration and dispatch.
- [`webhook-signature`](webhook-signature/) — HMAC-SHA256 webhook signing and timing-safe verification.
- [`etag-helper`](etag-helper/) — Strong ETag generation and If-None-Match matching.
- [`feature-flags`](feature-flags/) — Deterministic percentage rollouts and feature gating.

## Reliability and distributed systems

- [`retry-policy`](retry-policy/) — Bounded asynchronous retries with exponential backoff.
- [`circuit-breaker`](circuit-breaker/) — Closed, open and half-open resilience state transitions.
- [`bulkhead-limiter`](bulkhead-limiter/) — Concurrency isolation, bounded queues, and overload rejection.
- [`token-bucket-rate-limiter`](token-bucket-rate-limiter/) — Token-bucket request limiting with deterministic refill.
- [`idempotency-store`](idempotency-store/) — Request/job deduplication and retry-safe operation reuse.
- [`outbox-store`](outbox-store/) — Reliable messaging outbox records and publication tracking.
- [`dead-letter-queue`](dead-letter-queue/) — Failed-message metadata, inspection, and requeue simulation.
- [`saga-coordinator`](saga-coordinator/) — Sequential saga execution with reverse compensation.
- [`lease-lock`](lease-lock/) — Deterministic expiring owner lease/lock model.
- [`health-check-aggregator`](health-check-aggregator/) — Typed up/degraded/down readiness aggregation.
- [`adaptive-concurrency`](adaptive-concurrency/) — Latency- and failure-aware adaptive concurrency limits.
- [`error-budget-tracker`](error-budget-tracker/) — Rolling availability and error-budget tracking.
- [`priority-task-queue`](priority-task-queue/) — Stable priority scheduling for workers and orchestration.
- [`dag-task-runner`](dag-task-runner/) — Dependency-aware task execution with cycle detection.

## Platform engineering

- [`dependency-graph`](dependency-graph/) — Topological ordering and dependency cycle detection.
- [`deployment-rollout`](deployment-rollout/) — Health-gated staged deployment and rollback model.
- [`capacity-allocation`](capacity-allocation/) — Weighted capacity allocation with minimum guarantees.
- [`config-layering`](config-layering/) — Precedence-based configuration merging and required-key narrowing.
- [`policy-engine`](policy-engine/) — Priority policy decisions with default-deny behavior.
- [`multi-region-router`](multi-region-router/) — Health-, latency-, and capacity-aware region selection.

## Geospatial TypeScript

- [`geojson-guard`](geojson-guard/) — Runtime-safe GeoJSON Point Feature validation.
- [`bounding-box`](bounding-box/) — Validated geospatial bounds, containment, intersection and expansion.
- [`coordinate-normalization`](coordinate-normalization/) — Longitude wrapping and latitude clamping helpers.
- [`feature-collection-guard`](feature-collection-guard/) — Runtime GeoJSON FeatureCollection structural validation.
- [`tile-coordinates`](tile-coordinates/) — Web Mercator XYZ tile coordinate and bounds helpers.
- [`grid-spatial-index`](grid-spatial-index/) — Fixed-grid point spatial indexing and bounding-box queries.
- [`route-metrics`](route-metrics/) — Haversine segment and total route distance metrics.

## Quality expectations

Every project must have a README, TypeScript implementation, automated tests, a machine-catalog entry, and a curriculum mapping. Run from the repository root:

```bash
npm run verify
```

See [Project Matrix](../docs/PROJECT_MATRIX.md), [API Reference](../docs/API_REFERENCE.md), and [Project Standards](../docs/PROJECT_STANDARDS.md).

---

**Official TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**
