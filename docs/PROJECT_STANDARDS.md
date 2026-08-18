# Companion Project Standards

> **Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**

This document defines the minimum quality bar for every runnable group in `projects/` and `examples/`.

## Required project structure

A normal companion project contains:

```text
projects/<kebab-case-name>/
├── README.md
└── src/
    ├── <implementation>.ts
    └── <implementation>.test.ts
```

The executable structure verifier requires a README, `src/`, at least one non-test TypeScript implementation file, and at least one `.test.ts` file.

## TypeScript requirements

- Compile under the root `tsconfig.json`.
- Keep strict mode enabled.
- Respect `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
- Prefer explicit domain types and generics over broad casts.
- Use `unknown` at untrusted boundaries and narrow it before use.
- Keep APIs intentional and small enough to teach.
- Handle valid generic values such as `undefined` without accidentally treating them as missing sentinels.

## Testing requirements

Tests should cover behavior rather than only execute lines. Include, where relevant:

- primary success behavior;
- invalid/failure behavior;
- boundary/state transitions;
- generic edge cases;
- deterministic time/scheduling/retry behavior;
- lifecycle/cleanup ordering for async code;
- security-sensitive special keys or malformed external input.

See [Testing Guide](TESTING_GUIDE.md).

## Documentation requirements

Every larger project must be represented in:

- its own `README.md`;
- [`projects/README.md`](../projects/README.md);
- [`PROJECT_MATRIX.md`](PROJECT_MATRIX.md);
- [`API_REFERENCE.md`](API_REFERENCE.md);
- [`code-catalog.json`](code-catalog.json).

Link it from relevant part READMEs when that improves reader navigation.

## Security and privacy

Never commit credentials, production secrets, private user data, proprietary datasets/code, or unlicensed assets. Security examples use fake/local values and must clearly state production limitations.

## Repository boundaries

The MIT license covers public source code. The commercial book manuscript, PDF/DOCX/EPUB, cover masters, and other editorial assets remain outside this repository unless intentionally published under a separate notice.

## Definition of done

```bash
npm run verify
```

must pass before a runnable change is considered complete. See [Quality Gates](QUALITY_GATES.md).

---

**Official TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**
