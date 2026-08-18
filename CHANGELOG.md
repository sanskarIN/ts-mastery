# Changelog

> **📘 Official Gumroad Store:** **https://ramsandesh.gumroad.com**

All notable changes to the public companion-code repository are documented here.

## Second companion project expansion

- Added a generic LRU cache with deterministic least-recently-used eviction.
- Added an idempotency store that deduplicates repeated async work by key and allows retries after failures.
- Added a strongly typed command bus with register, dispatch, unregister, and duplicate-handler protection.
- Added a composable validation pipeline with discriminated-union results and reusable validators.
- Added a stable priority task queue with deterministic ordering for equal priorities.
- Added opaque cursor pagination with safe decoding and forward-page navigation.
- Added **18 new automated tests** across these six projects.
- Fixed an `exactOptionalPropertyTypes` issue found by strict validation before finalizing the expansion.
- Updated repository navigation, machine-readable catalog, build summary, and validation records.

## Companion project expansion

- Added a strongly typed event bus with subscription and one-shot listener tests.
- Added a deterministic TTL cache with expiry and sweeping behavior.
- Added a reusable retry policy with bounded attempts and exponential backoff.
- Added a circuit breaker with closed, open, and half-open transitions.
- Added deterministic percentage-based feature flags.
- Added dependency graph ordering and cycle detection.
- Added a token-bucket rate limiter with injectable time.
- Added a GeoJSON Point Feature runtime guard for safe `unknown` narrowing.
- Linked the new projects from relevant TypeScript Full Mastery part-navigation pages.
- Expanded repository verification to **29 passing automated tests** with strict TypeScript compilation.

## Storefront visibility update

- Highlighted the official Gumroad storefront across the main repository landing page.
- Added the Gumroad link to all Part 001–120 navigation pages.
- Added Gumroad callouts to runnable example and project documentation.
- Added Gumroad to repository funding and package metadata.
- Added storefront references across reader-facing documentation.

**Official store:** **https://ramsandesh.gumroad.com**

## 1.0.0 — Initial public companion release

- Added repository policy and licensing separation.
- Added navigation folders for Parts 001–120.
- Added focused TypeScript examples with tests.
- Added study-progress, runtime-configuration, and workflow-state-machine companion projects.
- Added CI, contribution, security, and issue/PR templates.
