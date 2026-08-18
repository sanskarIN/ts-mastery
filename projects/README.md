# TypeScript Full Mastery — Companion Projects

[![Official Gumroad Store](../assets/gumroad-store-banner.svg)](https://ramsandesh.gumroad.com)

> **📘 Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**

This folder contains **23 larger runnable companion projects** for the 120-part TypeScript Full Mastery curriculum.

## API, validation, and application architecture

- [`command-bus`](command-bus/) — typed command dispatch and application boundaries
- [`validation-pipeline`](validation-pipeline/) — composable validation with typed results
- [`cursor-pagination`](cursor-pagination/) — opaque cursor pagination for REST/GraphQL
- [`runtime-config`](runtime-config/) — safe runtime configuration validation
- [`middleware-pipeline`](middleware-pipeline/) — typed onion-style middleware composition

## Events, workflows, and distributed reliability

- [`typed-event-bus`](typed-event-bus/) — strongly typed event routing
- [`idempotency-store`](idempotency-store/) — operation deduplication and retry safety
- [`outbox-store`](outbox-store/) — reliable message publication simulation
- [`workflow-state-machine`](workflow-state-machine/) — explicit workflow transitions
- [`priority-task-queue`](priority-task-queue/) — stable priority scheduling
- [`dag-task-runner`](dag-task-runner/) — dependency-aware task execution
- [`retry-policy`](retry-policy/) — bounded retries and exponential backoff
- [`circuit-breaker`](circuit-breaker/) — failure isolation and recovery states
- [`bulkhead-limiter`](bulkhead-limiter/) — concurrency isolation and bounded queues
- [`token-bucket-rate-limiter`](token-bucket-rate-limiter/) — deterministic capacity limiting
- [`health-check-aggregator`](health-check-aggregator/) — readiness and service-health aggregation

## Data structures, caching, and platform tooling

- [`ttl-cache`](ttl-cache/) — expiry-aware generic cache
- [`lru-cache`](lru-cache/) — bounded least-recently-used cache
- [`dependency-graph`](dependency-graph/) — topological ordering and cycle detection
- [`feature-flags`](feature-flags/) — deterministic percentage rollouts

## Geospatial companions

- [`geojson-guard`](geojson-guard/) — runtime-safe GeoJSON Point validation
- [`bounding-box`](bounding-box/) — point containment, intersection, and computed bounds

## Learning utility

- [`study-progress-cli`](study-progress-cli/) — curriculum progress domain and CLI

## Quality expectations

Every project should compile under repository-wide strict TypeScript settings, include meaningful automated tests, avoid secrets/private data, document its learning purpose, and pass:

```bash
npm run verify
```

See [`../docs/PROJECT_MATRIX.md`](../docs/PROJECT_MATRIX.md) for book-part mapping and [`../docs/PROJECT_STANDARDS.md`](../docs/PROJECT_STANDARDS.md) for the project definition of done.

---

**📚 Official Gumroad Store:** **https://ramsandesh.gumroad.com**
