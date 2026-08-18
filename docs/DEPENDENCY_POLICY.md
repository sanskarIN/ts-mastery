# Dependency Policy

The companion repository intentionally stays dependency-light.

## Current principle

Use the JavaScript/TypeScript language, Node.js built-ins, and small local abstractions when they are sufficient to teach the concept.

Runtime dependencies should not be added merely to avoid writing a small educational implementation.

## Development dependencies

The repository needs TypeScript and Node.js type declarations for compilation. Development dependencies should track supported runtimes rather than assuming only the newest Node APIs.

## Adding a dependency

A new dependency should have a clear learning or tooling benefit that cannot reasonably be achieved with existing platform capabilities. Before adding one, evaluate:

- maintenance activity;
- license compatibility;
- transitive dependency size;
- security history;
- runtime/browser requirements;
- whether it obscures the TypeScript concept being taught.

Document meaningful additions in the changelog.

## Updating dependencies

Use automated dependency-update proposals as a starting point, not as an automatic approval. For every update:

1. inspect the change/release notes when relevant;
2. run `npm run verify`;
3. ensure Node 20 and 22 remain supported;
4. review compiler-option behavior for TypeScript updates.

## Lockfile policy

If a package lock is maintained, commit it and prefer reproducible installs. If the repository intentionally changes lockfile strategy, document the change in the changelog and release notes.

## Supply-chain hygiene

Do not add install scripts, binary downloads, or opaque build tooling without a clear need and review. Keep CI permissions minimal.

See [Security Hardening](SECURITY_HARDENING.md) and [Compatibility](COMPATIBILITY.md).
