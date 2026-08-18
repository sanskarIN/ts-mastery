# Quality Gates

`npm run verify` is the canonical repository gate. A change is not considered ready merely because one file compiles.

## Gate 1 — Repository structure and catalog

`npm run verify:structure` checks:

- exactly 120 part directories;
- exactly one folder for each Part 001–120;
- one README per part;
- valid `docs/code-catalog.json`;
- catalog `totalParts` equals 120;
- every actual project/example appears exactly once in the catalog;
- no catalog entry points outside `projects/` or `examples/`;
- project directories use kebab-case;
- every project/example has a README and `src/`;
- every project/example has implementation TypeScript and automated tests;
- required documentation/policy files exist.

This prevents silent navigation/catalog drift.

## Gate 2 — Documentation links

`npm run verify:docs` recursively checks local Markdown links and images. External URLs are not fetched during this local check.

The goal is to catch broken repository navigation caused by rename/delete operations.

## Gate 3 — Strict TypeScript

`npm run check` performs a no-emit strict compilation using the root TypeScript configuration.

Important strictness includes `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes`.

## Gate 4 — Clean build

`npm run build` deletes `dist/` before compiling. Cleaning is part of the build contract so removed or renamed tests cannot remain as stale JavaScript.

## Gate 5 — Complete tests

`npm test` builds, recursively discovers every compiled `*.test.js`, fails if none are found, and runs the complete collection with `node --test`.

Test discovery is explicit rather than relying on shell glob expansion.

## CI

GitHub Actions runs the complete `npm run verify` command on Node.js 20 and 22. The workflow also supports manual dispatch and scheduled verification.

## Review rule

A green gate means the automated checks found no violations they know how to test. It is not a proof that software can never contain a defect. Code review, threat modeling, performance testing, and domain validation remain necessary when an educational project is adapted for production.
