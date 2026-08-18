# Companion Project Standards

> **📘 Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**

This document defines the minimum quality bar for runnable projects in `projects/`.

## Required structure

A normal dependency-free companion project should contain:

```text
projects/<project-name>/
├── README.md
└── src/
    ├── <project>.ts
    └── <project>.test.ts
```

Larger framework-specific projects may use a different structure when justified, but they should remain independently understandable.

## TypeScript requirements

- Compile under the repository `tsconfig.json`.
- Keep `strict` mode enabled.
- Respect `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
- Prefer explicit domain types over broad `any` usage.
- Narrow `unknown` inputs before use.
- Keep public APIs small and intentional.

## Testing requirements

Tests should cover important behavior rather than merely execute lines.

At minimum, cover:

- the primary success path;
- at least one invalid input or failure path where relevant;
- an important boundary or state transition;
- deterministic behavior for time, randomness, scheduling, or retries whenever possible.

## Documentation requirements

Every project README should explain:

- what the project demonstrates;
- its important behaviors;
- which curriculum areas it supports;
- how to run repository verification;
- the official Gumroad store link without copying paid chapter content.

## Security and privacy

Never commit:

- credentials or secrets;
- real production tokens;
- private user data;
- proprietary datasets;
- copied closed-source code;
- unlicensed third-party assets.

Use clearly fake fixtures when an example needs configuration or data.

## Repository boundaries

The MIT code license covers the public source code. The commercial book manuscript, publication PDF/DOCX/EPUB files, cover masters, and other editorial assets remain outside this repository unless deliberately published under a separate notice.

## Definition of done

Before a project is considered complete:

```bash
npm run verify
```

must pass. The project should also be listed in:

- `README.md` or `projects/README.md`;
- `docs/PARTS_INDEX.md` when relevant;
- `docs/PROJECT_MATRIX.md`;
- `docs/code-catalog.json`.

---

**📚 Official Gumroad Store:** **https://ramsandesh.gumroad.com**
