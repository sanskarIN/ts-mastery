# Maintenance Guide

## Add a new project

A new project should be added as one coherent change:

1. create `projects/<kebab-case-name>/`;
2. add `README.md`;
3. add `src/<name>.ts`;
4. add meaningful `src/<name>.test.ts`;
5. add it to `docs/code-catalog.json`;
6. add it to `projects/README.md`;
7. add its curriculum mapping to `docs/PROJECT_MATRIX.md`;
8. add its public surface to `docs/API_REFERENCE.md`;
9. link it from relevant `parts/` README files where useful;
10. update counts/status docs when repository scale changes;
11. run `npm run verify`.

## Rename a project

Treat a rename as a navigation change, not only a filesystem operation. Update every reference in:

- catalog;
- root/project READMEs;
- project matrix;
- API reference;
- relevant part READMEs;
- changelog/roadmap where the old name appears.

`npm run verify:docs` and `npm run verify:structure` should catch most missed local references.

## Remove a project

Remove its directory and all navigation/catalog references in one change. Explain why in `CHANGELOG.md` if readers could rely on it.

## Update TypeScript or Node.js support

When updating TypeScript or Node type definitions:

1. read release notes for compiler/runtime changes;
2. install the new development dependency;
3. run the complete suite on every supported Node major;
4. update `COMPATIBILITY.md` and CI when support changes;
5. record compatibility-impacting changes in the changelog.

## Keep generated output out of Git

Do not commit `dist/`, `node_modules/`, test coverage output, editor caches, local environment files, or secrets.

## Catalog invariants

`docs/code-catalog.json` is machine-readable repository metadata. Keep it valid JSON and represent every runnable group exactly once.

## Documentation maintenance

Prefer links to source/project directories rather than copying large source files into documentation. This reduces duplicate documentation drift.

## Security maintenance

Review dependency updates, avoid production secrets in examples, and keep security-sensitive examples deliberately fake/local. See [Dependency Policy](DEPENDENCY_POLICY.md) and [Security Hardening](SECURITY_HARDENING.md).

## Final check

Before merging any maintenance batch:

```bash
npm run verify
npm run stats
```
