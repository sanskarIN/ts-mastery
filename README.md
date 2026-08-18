# TypeScript Full Mastery — Companion Code

A public companion-code repository for the **TypeScript Full Mastery — Complete 120-Part Master Edition** by **Ram Sandesh**.

[![Official Gumroad Store](assets/gumroad-store-banner.svg)](https://ramsandesh.gumroad.com)

> ## 📘 Get the Complete TypeScript Full Mastery eBook
> **Official Store:** **https://ramsandesh.gumroad.com**

This repository contains the open-source companion **code, tests, exercises, and code documentation**. The commercial manuscript, merged PDF/DOCX, cover package, and other publication assets are intentionally separate.

## Current repository

- **120** curriculum navigation folders
- **3** focused runnable examples
- **48** larger companion projects
- **51** runnable groups in the machine catalog
- **140 expected automated tests** after final integration
- strict TypeScript / NodeNext / ES2022
- Node.js **20 + 22** CI
- MIT source-code license
- separate book-content license

## Quick start

```bash
git clone https://github.com/sanskarIN/ts-mastery.git
cd ts-mastery
npm install
npm run verify
```

`npm run verify` checks repository/catalog structure, local documentation links, strict TypeScript, a clean build, and every recursively discovered compiled test.

## Documentation

Start with [`docs/README.md`](docs/README.md).

Key guides:

- [Getting Started](docs/GETTING_STARTED.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Build and Run](docs/BUILD_AND_RUN.md)
- [Project Matrix](docs/PROJECT_MATRIX.md)
- [Testing Guide](docs/TESTING_GUIDE.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Quality Gates](docs/QUALITY_GATES.md)
- [Release Checklist](docs/RELEASE_CHECKLIST.md)

## Repository structure

```text
examples/        3 focused examples
projects/        48 larger runnable companion projects
parts/           Parts 001–120 navigation
docs/            Complete public code documentation
scripts/         Verification, test discovery, cleanup, statistics
assets/          Repository-owned documentation assets
.github/         CI, issue forms, ownership, dependency automation
```

Browse [`projects/README.md`](projects/README.md) for the categorized project catalog and [`docs/PARTS_INDEX.md`](docs/PARTS_INDEX.md) for curriculum navigation.

## Commands

```bash
npm run clean
npm run check
npm run build
npm test
npm run verify:structure
npm run verify:docs
npm run stats
npm run verify
```

## Quality and security

Contributions should follow:

- [`CONTRIBUTING.md`](CONTRIBUTING.md)
- [`docs/PROJECT_STANDARDS.md`](docs/PROJECT_STANDARDS.md)
- [`docs/CODE_STYLE.md`](docs/CODE_STYLE.md)
- [`docs/TESTING_GUIDE.md`](docs/TESTING_GUIDE.md)
- [`SECURITY.md`](SECURITY.md)

Security-sensitive examples use fake/local values. Never commit credentials, private datasets, production secrets, or proprietary code.

## Licensing

- Public source code: [`LICENSE`](LICENSE) — MIT
- Commercial/editorial book content: [`BOOK_CONTENT_LICENSE.md`](BOOK_CONTENT_LICENSE.md)

The MIT license for this repository does **not** place the commercial book under MIT.

## Support

See [`SUPPORT.md`](SUPPORT.md) for issue-routing guidance.

---

**📘 Official TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**
