# TypeScript Full Mastery — Companion Code

A public companion-code repository for the **TypeScript Full Mastery — Complete 120-Part Master Edition** by **Ram Sandesh**.

This repository is intentionally focused on **source code, exercises, small reusable examples, tests, and companion projects**. The complete commercial book text, merged PDF, merged DOCX, cover artwork, and other publication assets are **not** included in this public-code repository.

## Repository

- GitHub: https://github.com/sanskarIN/ts-mastery
- Author: Ram Sandesh
- Code license: MIT

## Repository goals

- Give readers runnable TypeScript examples tied to Parts 1–120.
- Keep examples small enough to learn from and production-minded enough to teach good habits.
- Provide tests and strict compiler settings instead of copy-paste-only snippets.
- Separate the open-source code license from the book-content copyright.
- Make it easy to add larger companion projects without turning the repository into one giant application.

## Quick start

```bash
npm install
npm run check
npm test
npm run build
```

Node.js and TypeScript versions change over time. Use a currently supported Node.js release and install the development dependencies declared in `package.json`.

## Structure

```text
examples/        Small focused examples
projects/        Larger runnable companion projects
parts/           Part-by-part navigation for Parts 001–120
docs/            Book-to-repository policy, code catalog, and contribution notes
scripts/         Repository-wide verification helpers
```

## Book ↔ code navigation

Start with [`docs/PARTS_INDEX.md`](docs/PARTS_INDEX.md). Each part has a matching folder under `parts/part-XXX-*`.

## Licensing

- Source code: see [`LICENSE`](LICENSE) (MIT).
- Book text, explanations, cover, PDF/DOCX publication files, and other editorial assets: see [`BOOK_CONTENT_LICENSE.md`](BOOK_CONTENT_LICENSE.md).

These are deliberately separate. Publishing code under MIT does **not** place the book itself under MIT.

## Quality rule

Every code contribution should aim to pass:

```bash
npm run check
npm test
npm run build
```

## Security

Please do not publish secrets, API keys, access tokens, production credentials, private datasets, or copied proprietary code. See [`SECURITY.md`](SECURITY.md).
