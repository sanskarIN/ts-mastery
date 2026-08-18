# Testing Guide

> **📘 Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**

The companion repository treats tests as executable learning material. A reader should be able to understand important behavior by reading a project's tests before reading every implementation detail.

## Standard verification

Install dependencies and run:

```bash
npm install
npm run verify
```

The `verify` command performs:

1. repository structure and catalog verification;
2. strict TypeScript type checking;
3. TypeScript build;
4. Node.js automated tests.

## Run individual stages

```bash
npm run verify:structure
npm run check
npm run build
npm test
```

## What a useful test should prove

Prefer behavior-oriented tests such as:

- an LRU cache evicts the least recently used key;
- an idempotency store executes duplicate concurrent requests once;
- a circuit breaker transitions to open after its failure threshold;
- a priority queue preserves FIFO order when priorities match;
- a cursor parser rejects malformed input;
- a validation pipeline returns all relevant errors.

Avoid tests that only repeat an implementation line without proving a contract.

## Determinism

When a project depends on time, retries, randomness, capacity, or scheduling, make the changing dependency injectable where practical. Deterministic tests are easier to learn from and less likely to become flaky.

## Type-system tests

The repository's `tsc --noEmit` check is part of the test strategy. Compiler failures can expose API-design regressions that runtime tests cannot.

Important options include:

- `strict`;
- `noUncheckedIndexedAccess`;
- `exactOptionalPropertyTypes`;
- `noImplicitOverride`;
- `noFallthroughCasesInSwitch`.

## CI coverage

GitHub Actions runs the repository verification suite across Node.js 20 and 22. A contribution should not assume behavior from only one supported CI runtime.

## Before submitting a pull request

- run `npm run verify`;
- read the changed test output;
- confirm no secrets or private fixtures were added;
- update docs/catalog entries if a project was added, renamed, or removed;
- ensure tests cover at least one meaningful boundary or failure case when relevant.

---

**📚 Official Gumroad Store:** **https://ramsandesh.gumroad.com**
