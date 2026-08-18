# Testing Guide

The repository uses the built-in Node.js test runner with TypeScript tests compiled through the root configuration.

## Required pattern

Every runnable project/example must include at least one `*.test.ts` file under its `src/` directory.

Tests should cover meaningful behavior, not only constructor smoke tests. Include boundary/error cases where the implementation has important invariants.

## Run all tests

```bash
npm test
```

The test lifecycle:

1. deletes `dist/`;
2. compiles the complete repository;
3. recursively discovers generated `*.test.js`;
4. fails if zero tests are found;
5. invokes `node --test` with the complete sorted file list.

This avoids shell-specific `**` glob behavior and stale generated tests.

## Full verification

```bash
npm run verify
```

This adds structure, docs-link, and strict no-emit checks before the test build.

## Deterministic testing

Prefer injectable time/sleep/capacity inputs over real waits. Examples include TTL cache, token bucket, retry policy, circuit breaker, leases, outbox records, dead letters, and adaptive concurrency.

## Async lifecycle testing

When a class tracks concurrency or cleanup, test the state visible immediately after awaited completion. This caught a real bulkhead cleanup-ordering defect during repository development.

## Runtime-boundary tests

For guards/validation code, test:

- valid input;
- malformed structure;
- missing values;
- invalid numeric ranges;
- unexpected values typed as `unknown`.

## Data-structure tests

Test ordering, duplicates, empty behavior, capacity/eviction, and deterministic tie-breaking.

## Geospatial tests

Use small deterministic coordinates. Test range validation, boundary inclusion, invalid bounds, and known reference cases such as the world tile or one degree at the equator.

## Focused development

You may run one compiled test after building:

```bash
npm run build
node --test dist/projects/retry-policy/src/retry.test.js
```

Always run the full `npm run verify` before contributing.

## Test count

The current integrated repository is expected to contain **140 automated test cases** across **51 source test files**. `npm run stats` reports source test-file count; the Node test runner reports actual executed test cases.

See [Validation Record](VALIDATION.md).
