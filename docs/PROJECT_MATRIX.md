# Companion Project Matrix

> **📘 Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**

This matrix maps the larger runnable projects to the TypeScript Full Mastery curriculum. It is a navigation guide, not a replacement for the book.

| Project | Primary concepts | Suggested parts |
|---|---|---|
| [`study-progress-cli`](../projects/study-progress-cli/) | domain modeling, CLI design, progress state | 18, 28 |
| [`runtime-config`](../projects/runtime-config/) | `unknown` input, environment validation, safe startup | 12, 28, 51–54 |
| [`workflow-state-machine`](../projects/workflow-state-machine/) | explicit states, legal transitions, durable workflows | 18, 118–120 |
| [`typed-event-bus`](../projects/typed-event-bus/) | typed events, subscriptions, decoupling | 23, 116–117 |
| [`ttl-cache`](../projects/ttl-cache/) | caching, expiry, deterministic time | 16, 20, 33 |
| [`retry-policy`](../projects/retry-policy/) | async retries, backoff, transient failure | 13, 98, 114–120 |
| [`circuit-breaker`](../projects/circuit-breaker/) | resilience states, failure thresholds, recovery | 98, 114–120 |
| [`feature-flags`](../projects/feature-flags/) | deterministic rollout, release safety | 104–107, 120 |
| [`dependency-graph`](../projects/dependency-graph/) | graphs, topological order, cycles, build dependencies | 94, 106–107 |
| [`token-bucket-rate-limiter`](../projects/token-bucket-rate-limiter/) | rate limiting, capacity, refill algorithms | 21, 25, 98, 120 |
| [`geojson-guard`](../projects/geojson-guard/) | runtime narrowing, GeoJSON validation | 12, 80–84 |
| [`lru-cache`](../projects/lru-cache/) | generics, `Map`, bounded memory, eviction | 16, 20, 33 |
| [`idempotency-store`](../projects/idempotency-store/) | deduplication, exactly-once effects, retry safety | 23, 25, 115–118 |
| [`command-bus`](../projects/command-bus/) | clean architecture, application boundaries, typed dispatch | 22, 30, 46–47 |
| [`validation-pipeline`](../projects/validation-pipeline/) | composable validation, result unions, boundary safety | 12, 25–30 |
| [`priority-task-queue`](../projects/priority-task-queue/) | scheduling, workers, orchestration, stable priority | 13, 47, 115–120 |
| [`cursor-pagination`](../projects/cursor-pagination/) | API contracts, opaque cursors, GraphQL connections | 25–26, 48–50 |

## How to use this matrix

1. Open the relevant book part.
2. Read the concept and architecture discussion.
3. Run the linked companion project.
4. Read its tests before changing the implementation.
5. Add one extension from the part README as a practice task.
6. Run `npm run verify` before committing.

## Repository quality rule

The project matrix is kept separate from the commercial manuscript. Public code should remain independently understandable, tested, and reusable under the repository code license.

---

**📚 Official Gumroad Store:** **https://ramsandesh.gumroad.com**
