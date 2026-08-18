# TypeScript Full Mastery — Companion Projects

[![Official Gumroad Store](../assets/gumroad-store-banner.svg)](https://ramsandesh.gumroad.com)

> **📘 Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**

This folder contains the larger runnable companion projects for the 120-part TypeScript Full Mastery curriculum.

## API, validation, and application architecture

- [`command-bus`](command-bus/) — typed command dispatch and application boundaries
- [`validation-pipeline`](validation-pipeline/) — composable validation with typed results
- [`cursor-pagination`](cursor-pagination/) — opaque cursor pagination for REST/GraphQL
- [`runtime-config`](runtime-config/) — safe runtime configuration validation

## Events, workflows, and distributed reliability

- [`typed-event-bus`](typed-event-bus/) — strongly typed event routing
- [`idempotency-store`](idempotency-store/) — operation deduplication and retry safety
- [`workflow-state-machine`](workflow-state-machine/) — explicit workflow transitions
- [`priority-task-queue`](priority-task-queue/) — stable priority scheduling
- [`retry-policy`](retry-policy/) — bounded retries and exponential backoff
- [`circuit-breaker`](circuit-breaker/) — failure isolation and recovery states
- [`token-bucket-rate-limiter`](token-bucket-rate-limiter/) — deterministic capacity limiting

## Data structures, caching, and platform tooling

- [`ttl-cache`](ttl-cache/) — expiry-aware generic cache
- [`lru-cache`](lru-cache/) — bounded least-recently-used cache
- [`dependency-graph`](dependency-graph/) — topological ordering and cycle detection
- [`feature-flags`](feature-flags/) — deterministic percentage rollouts

## Specialized companions

- [`geojson-guard`](geojson-guard/) — runtime-safe GeoJSON Point validation
- [`study-progress-cli`](study-progress-cli/) — curriculum progress domain and CLI

## Quality expectations

Every project should:

- compile under repository-wide strict TypeScript settings;
- include meaningful automated tests;
- avoid secrets and production credentials;
- document its learning purpose;
- remain separate from the commercial book manuscript;
- pass `npm run verify` before merge.

See [`../docs/PROJECT_MATRIX.md`](../docs/PROJECT_MATRIX.md) for the book-part mapping.

---

**📚 Official Gumroad Store:** **https://ramsandesh.gumroad.com**
