# Repository Layout

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── CODEOWNERS
├── assets/
├── docs/
├── examples/
├── parts/
├── projects/
├── scripts/
├── BOOK_CONTENT_LICENSE.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── ROADMAP.md
├── SECURITY.md
├── SUPPORT.md
├── package.json
└── tsconfig.json
```

## `.github/`

Repository collaboration and automation metadata: CI, dependency updates, issue forms, pull-request template, funding configuration, and ownership rules.

## `assets/`

Repository-owned visual assets used in public documentation. This currently includes the Gumroad storefront banner.

## `docs/`

Long-form public code documentation, project/curriculum navigation, release procedures, validation history, and the machine-readable code catalog.

## `examples/`

Three focused examples for small language/type-system concepts. Examples follow the same strict compiler and test rules as projects.

## `parts/`

Exactly 120 zero-padded curriculum-navigation folders. Every part has one README and must appear exactly once.

## `projects/`

The larger companion projects. Folder names use kebab-case. Every project must contain:

```text
README.md
src/
  *.ts
  *.test.ts
```

The exact filenames may differ, but at least one implementation and one automated test are required.

## `scripts/`

Repository-level maintenance scripts:

- clean generated output;
- verify structure/catalog;
- verify documentation links;
- recursively run compiled tests;
- report repository statistics.

## Root policy files

The root README is the landing page. `LICENSE` covers code; `BOOK_CONTENT_LICENSE.md` covers the separate editorial/publication boundary. `SECURITY.md`, `CONTRIBUTING.md`, and `CODE_OF_CONDUCT.md` define collaboration expectations.

## Generated output

`dist/` is created only by compilation. It is excluded from version control and is safe to delete at any time.

See [Architecture](ARCHITECTURE.md) and [Maintenance](MAINTENANCE.md).
