# Changelog

All notable changes to the public companion-code repository are documented here.

## Final repository completion and hardening

- Implemented the remaining 25 roadmap projects across core TypeScript, backend/API, reliability, platform engineering, and geospatial themes.
- Added 75 independently validated tests for the final roadmap batch.
- Expanded the repository to 48 larger projects and 51 total runnable groups.
- Raised the expected integrated automated-test total to 140.
- Added complete architecture, API, setup, build/run, troubleshooting, compatibility, maintenance, dependency, quality, security, release, FAQ, and final-status documentation.
- Fixed generic `undefined` edge cases in binary heap, bounded memoizer, and TTL cache semantics.
- Corrected event-bus emit counts when one-shot listeners unsubscribe during delivery.
- Hardened configuration layering against special-key/prototype assignment surprises.
- Replaced shell-glob-dependent test invocation with recursive compiled-test discovery.
- Made builds clean `dist/` before compilation to prevent stale artifacts/tests.
- Strengthened structure verification so every project/example must be represented exactly once in the code catalog and contain README/source/tests.
- Added local Markdown link verification.
- Added repository statistics reporting.
- Added scheduled/manual CI support and dependency-update automation.
- Added support and documentation issue-routing metadata.

## Third project expansion

- Added bulkhead limiter, outbox store, typed middleware, bounding-box utilities, health aggregation, and DAG task runner.
- Detected and fixed a bulkhead promise/cleanup lifecycle ordering issue during tests.
- Added 18 tests for this batch.

## Second project expansion

- Added LRU cache, idempotency store, command bus, validation pipeline, priority task queue, and cursor pagination.
- Detected and fixed an `exactOptionalPropertyTypes` issue in cursor-pagination tests.
- Added 18 tests for this batch.

## First project expansion

- Added typed event bus, TTL cache, retry policy, circuit breaker, feature flags, dependency graph, token-bucket limiter, and GeoJSON guard.
- Expanded the validated suite to 29 tests at that milestone.

## Initial public companion release

- Added Parts 001–120 navigation.
- Added focused TypeScript examples and initial companion projects.
- Added MIT source-code licensing separated from commercial book-content licensing.
- Added CI, contribution, security, and repository policy files.

---

**Official TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**
