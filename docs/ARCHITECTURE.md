# Repository Architecture

The repository is designed as a **public, dependency-light TypeScript learning companion** for a 120-part curriculum. It is intentionally not one monolithic application.

## Architectural layers

### Curriculum navigation — `parts/`

`parts/` contains exactly one zero-padded folder for every Part 001–120. Part folders are stable navigation anchors. They explain the public companion scope and link to relevant runnable projects without reproducing the commercial chapter text.

### Focused examples — `examples/`

`examples/` contains small, single-concept TypeScript demonstrations. They are useful when a full project would distract from the language concept being taught.

### Companion projects — `projects/`

`projects/` contains the larger runnable learning artifacts. Each project is self-contained at the source level and has:

- a project README;
- at least one TypeScript implementation file;
- at least one Node test-runner test file;
- no generated build output committed to the project.

Projects are compiled together through the root `tsconfig.json` so the same strictness rules apply everywhere.

### Repository automation — `scripts/`

The automation layer verifies structure, documentation, compilation, test discovery, and repository statistics. This turns repository conventions into executable checks rather than relying only on prose.

### Documentation — `docs/`

Documentation describes how to use, maintain, test, and release the public code. `docs/code-catalog.json` is the machine-readable inventory of runnable groups.

## Type-system architecture

The root TypeScript configuration uses NodeNext modules, ES2022 output, and strict compiler options. Important safety settings include:

- `strict`;
- `noUncheckedIndexedAccess`;
- `exactOptionalPropertyTypes`;
- `noImplicitOverride`;
- `noFallthroughCasesInSwitch`;
- `forceConsistentCasingInFileNames`.

The companion projects deliberately use patterns such as discriminated unions, generics, typed catalogs, runtime guards, readonly data, explicit state machines, and injected clocks to make behavior visible and testable.

## Runtime boundary design

When data enters from an untyped boundary, projects prefer `unknown` plus explicit narrowing rather than unsafe assertions. Examples include configuration validation, GeoJSON guards, API error mapping, and validation pipelines.

Node-specific projects clearly rely on Node APIs. Examples include:

- `AsyncLocalStorage` for request context;
- `node:crypto` for webhook HMAC and ETags;
- `Buffer` for cursor encoding;
- the Node test runner for automated tests.

See [Compatibility](COMPATIBILITY.md).

## Determinism and testability

Time-sensitive code commonly accepts an injected clock. Retry behavior can inject a sleep function. This keeps tests fast and deterministic instead of waiting on real time.

Data structures and scheduling projects use deterministic tie-breaking wherever order matters. This is especially important in dependency graphs, priority queues, region selection, dead-letter ordering, rollout phases, and spatial queries.

## Reliability model

The project collection demonstrates reliability as composable primitives rather than one production service. Examples include:

- retry policies;
- circuit breakers;
- bulkhead concurrency limits;
- token buckets;
- idempotency;
- outbox and dead-letter patterns;
- sagas;
- leases;
- health aggregation;
- adaptive concurrency;
- error budgets;
- deployment rollout;
- multi-region routing.

These projects are educational simulations. Production use still requires domain-specific persistence, observability, distributed coordination, threat modeling, and load testing.

## Build architecture

The repository compiles from the root and emits generated JavaScript, declaration files, and source maps to `dist/`. The build cleans `dist/` first so stale tests or artifacts cannot accidentally participate in later runs.

The test runner script recursively discovers compiled `*.test.js` files instead of relying on shell glob behavior. This makes test execution more consistent across environments.

## Quality architecture

`npm run verify` is the canonical local and CI gate. It combines:

1. structure/catalog verification;
2. documentation-link verification;
3. strict TypeScript checking;
4. clean compilation;
5. recursive test discovery and execution.

GitHub Actions runs the same gate against supported Node.js versions.

## Publishing boundary

The MIT license covers public repository source code. The commercial book manuscript and publication assets use a separate content notice. See [Book-to-Repo Policy](BOOK_TO_REPO_POLICY.md) and the root [Book Content License](../BOOK_CONTENT_LICENSE.md).

---

**Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**
