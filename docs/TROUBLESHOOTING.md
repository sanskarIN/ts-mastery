# Troubleshooting

## `node` or `npm` is not recognized

Install a supported Node.js version and reopen your terminal. Verify:

```bash
node --version
npm --version
```

Use Node 20 or 22.

## TypeScript compiler errors immediately after cloning

Install dependencies first:

```bash
npm install
npm run check
```

Do not depend on a random globally installed TypeScript version.

## `npm test` reports a failure in generated `dist/`

Run:

```bash
npm run clean
npm test
```

The normal test command already performs a clean build. If you manually invoked generated files, remove `dist/` and rebuild.

## Structure verification says a project is missing from the catalog

Every directory directly under `projects/` and `examples/` must appear exactly once in `docs/code-catalog.json`. Add the catalog entry in the same change as the project.

## Structure verification says a project is missing source/tests

Every project requires:

- `README.md`;
- `src/`;
- at least one non-test `.ts` implementation;
- at least one `.test.ts` file.

## Documentation verification reports a broken link

The error identifies the Markdown file and target. Fix the target path, restore the file, or remove the obsolete link. Local link checks are case-sensitive in CI even if a local Windows filesystem is not.

## `exactOptionalPropertyTypes` errors

An optional property is not automatically the same as a property explicitly set to `undefined`. Prefer omitting the property when absent unless the declared type explicitly includes `undefined`.

## `noUncheckedIndexedAccess` errors

Array/object indexed access may be undefined. Narrow or validate the value before use rather than using an unsafe non-null assertion unless an invariant has already been established.

## ESM import errors

The repository uses NodeNext/ESM. Source files commonly import sibling modules using a `.js` specifier:

```ts
import { retry } from "./retry.js";
```

TypeScript resolves this to the `.ts` source while emitting ESM-compatible JavaScript.

## A timing-sensitive test is flaky

Prefer an injected clock or injected sleep function. Several repository projects demonstrate this pattern. Avoid real multi-second sleeps in unit tests.

## A new test is not being executed

Run:

```bash
npm run stats
npm test
```

The repository test runner recursively discovers compiled `*.test.js` files. Confirm the source file ends with `.test.ts`, sits under `examples/` or `projects/`, and is included by `tsconfig.json`.

## CI fails but local verification passes

Check:

- Node version;
- filename casing;
- uncommitted files;
- broken local links that only differ by case;
- dependencies installed from a different lock state;
- environment-specific assumptions.

Re-run locally from a clean checkout when possible.

## Still blocked

Read [Getting Started](GETTING_STARTED.md), [Build and Run](BUILD_AND_RUN.md), and [Support](../SUPPORT.md). For reproducible bugs, open a GitHub issue with the failing command and minimal output needed to diagnose it.
