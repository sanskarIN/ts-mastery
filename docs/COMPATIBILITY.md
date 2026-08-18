# Compatibility

## Supported Node.js versions

The repository supports Node.js **20 and 22**. CI verifies both versions.

The declared Node type definitions are a compile-time development dependency and may be newer than the oldest runtime in the support matrix. Runtime compatibility is therefore enforced by executing the complete CI suite on Node 20 and Node 22; contributors should not assume that declaration availability alone proves runtime support.

## Module system

- Package type: ESM
- TypeScript module: `NodeNext`
- Module resolution: `NodeNext`
- JavaScript target: ES2022

Source imports use `.js` specifiers where required by NodeNext/ESM behavior.

## Platform support

The core TypeScript compiler and Node test runner are cross-platform on Windows, macOS, and Linux.

Some companion projects intentionally use Node-specific APIs, including:

- `AsyncLocalStorage`;
- `node:crypto`;
- `Buffer`;
- the Node test runner.

Those modules are not directly browser-runtime projects.

## TypeScript

The repository declares TypeScript as a development dependency and uses strict compiler settings. A globally installed compiler may differ, so normal development should use the repository dependency through npm scripts.

## Browsers and frameworks

The repository is not a browser bundle and does not ship React, Vue, Angular, NestJS, or other framework dependencies. Framework-oriented curriculum parts may link to dependency-light examples that teach the underlying TypeScript architecture without pulling a large framework dependency tree into the companion repository.

## Generated declarations

Builds emit `.d.ts` files, but the individual project folders are not currently published as independent npm packages. Treat generated declarations as learning/build output rather than a package-distribution contract.

## Compatibility changes

When raising the minimum Node.js version or changing TypeScript/module settings:

1. update `package.json`;
2. update the CI matrix;
3. update this document;
4. run `npm run verify`;
5. record the change in `CHANGELOG.md`.

See [Dependency Policy](DEPENDENCY_POLICY.md) and [Release Checklist](RELEASE_CHECKLIST.md).
