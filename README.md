# TypeScript Full Mastery — Companion Code

A public companion-code repository for the **TypeScript Full Mastery — Complete 120-Part Master Edition** by **Ram Sandesh**.

[![Official Gumroad Store](assets/gumroad-store-banner.svg)](https://ramsandesh.gumroad.com)

> ## 📘 Get the Complete TypeScript Full Mastery eBook
> **Gumroad Store:** **https://ramsandesh.gumroad.com**
>
> Visit the official Gumroad storefront for the complete book and future publication releases.

This repository is intentionally focused on **source code, exercises, small reusable examples, tests, and companion projects**. The complete commercial book text, merged PDF, merged DOCX, cover artwork, and other publication assets are **not** included in this public-code repository.

## Repository

- GitHub: https://github.com/sanskarIN/ts-mastery
- **Official Gumroad Store: https://ramsandesh.gumroad.com**
- Author: Ram Sandesh
- Code license: MIT

## Quick start

```bash
npm install
npm run verify
```

`npm run verify` checks the 120-part repository structure, catalog paths, strict TypeScript compilation, the project build, and automated tests. GitHub Actions runs the same verification on Node.js 20 and 22.

## Structure

```text
examples/        Small focused examples
projects/        23 larger runnable companion projects
parts/           Part-by-part navigation for Parts 001–120
docs/            Project matrix, testing guide, catalog, standards, and publishing boundaries
scripts/         Repository-wide verification helpers
assets/          Repository-owned visual assets
```

## Runnable companion projects

See [`projects/README.md`](projects/README.md) for the categorized landing page and [`docs/PROJECT_MATRIX.md`](docs/PROJECT_MATRIX.md) for curriculum mapping.

- [`study-progress-cli`](projects/study-progress-cli/) — study progress domain and CLI
- [`runtime-config`](projects/runtime-config/) — runtime environment validation
- [`workflow-state-machine`](projects/workflow-state-machine/) — explicit workflow states and transitions
- [`typed-event-bus`](projects/typed-event-bus/) — strongly typed event routing
- [`ttl-cache`](projects/ttl-cache/) — deterministic TTL caching
- [`retry-policy`](projects/retry-policy/) — bounded retries with exponential backoff
- [`circuit-breaker`](projects/circuit-breaker/) — open/half-open/closed resilience states
- [`feature-flags`](projects/feature-flags/) — deterministic percentage rollouts
- [`dependency-graph`](projects/dependency-graph/) — topological ordering and cycle detection
- [`token-bucket-rate-limiter`](projects/token-bucket-rate-limiter/) — rate limiting with refillable tokens
- [`geojson-guard`](projects/geojson-guard/) — runtime-safe GeoJSON Point validation
- [`lru-cache`](projects/lru-cache/) — least-recently-used eviction cache
- [`idempotency-store`](projects/idempotency-store/) — deduplicated request/job execution
- [`command-bus`](projects/command-bus/) — strongly typed command dispatch
- [`validation-pipeline`](projects/validation-pipeline/) — composable validation rules
- [`priority-task-queue`](projects/priority-task-queue/) — stable priority scheduling
- [`cursor-pagination`](projects/cursor-pagination/) — opaque cursor pagination
- [`bulkhead-limiter`](projects/bulkhead-limiter/) — bounded concurrent work and overload protection
- [`outbox-store`](projects/outbox-store/) — reliable messaging outbox simulation
- [`middleware-pipeline`](projects/middleware-pipeline/) — typed onion-style middleware composition
- [`bounding-box`](projects/bounding-box/) — geospatial bounding-box utilities
- [`health-check-aggregator`](projects/health-check-aggregator/) — typed readiness/health aggregation
- [`dag-task-runner`](projects/dag-task-runner/) — dependency-aware task execution

## Book ↔ code navigation

Start with [`docs/PARTS_INDEX.md`](docs/PARTS_INDEX.md). Each book part has a matching folder under `parts/part-XXX-*` and relevant parts link directly to runnable projects.

## Repository standards

- [`docs/PROJECT_STANDARDS.md`](docs/PROJECT_STANDARDS.md)
- [`docs/TESTING_GUIDE.md`](docs/TESTING_GUIDE.md)
- [`CONTRIBUTING.md`](CONTRIBUTING.md)
- [`SECURITY.md`](SECURITY.md)

## Licensing

- Source code: [`LICENSE`](LICENSE) (MIT).
- Book/editorial content: [`BOOK_CONTENT_LICENSE.md`](BOOK_CONTENT_LICENSE.md).

Publishing code under MIT does **not** place the commercial book itself under MIT.

---

**📘 TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**
