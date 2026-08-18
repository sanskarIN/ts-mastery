# Changelog

> **📘 Official Gumroad Store:** **https://ramsandesh.gumroad.com**

All notable changes to the public companion-code repository are documented here.

## Third companion project expansion

- Added a bulkhead concurrency limiter with bounded queued work and overload rejection.
- Added an in-memory outbox store for reliable-message publication exercises.
- Added a typed onion-style middleware pipeline.
- Added geospatial bounding-box utilities for containment, intersection, expansion, and point-derived bounds.
- Added a typed health-check aggregator with `up`, `degraded`, and `down` states.
- Added a dependency-aware DAG task runner with missing-dependency and cycle detection.
- Added **18 new automated tests** across the six projects.
- Validation found and fixed a bulkhead lifecycle bug before finalizing the batch.
- Expanded CI from one runtime to a Node.js 20/22 matrix.
- Added automatic 120-part/catalog/project structure validation.
- Added graphical Gumroad repository banner, project matrix, project standards, testing guide, CODEOWNERS, and stronger issue/PR workflows.
- Repository now contains **3 focused examples + 23 larger projects** with **65 expected tests**.

## Second companion project expansion

- Added a generic LRU cache with deterministic least-recently-used eviction.
- Added an idempotency store that deduplicates repeated async work by key and allows retries after failures.
- Added a strongly typed command bus with register, dispatch, unregister, and duplicate-handler protection.
- Added a composable validation pipeline with discriminated-union results and reusable validators.
- Added a stable priority task queue with deterministic ordering for equal priorities.
- Added opaque cursor pagination with safe decoding and forward-page navigation.
- Added **18 new automated tests** across these six projects.
- Fixed an `exactOptionalPropertyTypes` issue found by strict validation before finalizing the expansion.

## First companion project expansion

- Added a strongly typed event bus.
- Added a deterministic TTL cache.
- Added a reusable retry policy.
- Added a circuit breaker.
- Added deterministic percentage-based feature flags.
- Added dependency graph ordering and cycle detection.
- Added a token-bucket rate limiter.
- Added a GeoJSON Point Feature runtime guard.
- Expanded repository verification to **29 passing automated tests** with strict TypeScript compilation.

## Storefront visibility update

- Highlighted the official Gumroad storefront across reader-facing repository documentation.
- Added Gumroad to repository funding and package metadata.
- Added a repository-owned graphical Gumroad banner.

## 1.0.0 — Initial public companion release

- Added repository policy and licensing separation.
- Added navigation folders for Parts 001–120.
- Added focused TypeScript examples with tests.
- Added study-progress, runtime-configuration, and workflow-state-machine companion projects.
- Added CI, contribution, security, and issue/PR templates.

---

**Official store:** **https://ramsandesh.gumroad.com**
