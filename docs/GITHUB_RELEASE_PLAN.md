# GitHub Release Plan

## Recommended repository identity

A clear public name is:

`TypeScript-Full-Mastery-Companion`

Suggested description:

> Open-source TypeScript examples, exercises, tests, and companion projects for the 120-part TypeScript Full Mastery series by Ram Sandesh.

## First public release

Release `v1.0.0` after:

- `npm run verify` passes
- the repository contains no book PDF/DOCX manuscript
- no secrets are present
- README/licensing files are reviewed
- each of Parts 1–120 has a navigation folder
- at least a few representative runnable examples are included

## Good future additions

- one tested starter/solution pair for each major language topic
- framework-specific projects kept in independent subfolders
- geospatial examples with tiny redistributable fixtures
- CI checks for TypeScript compilation and tests
- release notes tied to companion-code changes
- issue labels by part number or curriculum area

## Avoid

Do not create 120 nearly identical repositories. A single well-organized companion repository is easier for readers to discover, clone, search, and keep updated. Split out a project only when it becomes a substantial independent application/library with its own release lifecycle.
