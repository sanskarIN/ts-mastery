# Release Checklist

Use this checklist before declaring a repository milestone or GitHub release complete.

## Source and structure

- [ ] `npm run verify:structure` passes.
- [ ] All 120 part folders remain present exactly once.
- [ ] Every project/example has README, source, and tests.
- [ ] `docs/code-catalog.json` exactly matches runnable directories.
- [ ] No generated `dist/` files are committed.

## Documentation

- [ ] `npm run verify:docs` passes.
- [ ] Root README counts and links are current.
- [ ] `projects/README.md` lists every project.
- [ ] `docs/PROJECT_MATRIX.md` maps every project.
- [ ] `docs/API_REFERENCE.md` reflects public APIs.
- [ ] `CHANGELOG.md` describes the release.
- [ ] `ROADMAP.md` reflects completed/next work.
- [ ] Validation/status documents do not overstate what was actually executed.

## Quality

- [ ] `npm run check` passes.
- [ ] `npm test` passes.
- [ ] `npm run verify` passes from a clean install.
- [ ] Node.js 20 CI passes.
- [ ] Node.js 22 CI passes.
- [ ] No known flaky tests remain.

## Security

- [ ] No secrets or private data are present.
- [ ] Security-sensitive examples contain only fake/local credentials.
- [ ] Dependency changes have been reviewed.
- [ ] CI permissions remain minimal.
- [ ] Unexpected error details are not exposed by public examples.

## Licensing and publishing boundary

- [ ] `LICENSE` still applies to public source code.
- [ ] `BOOK_CONTENT_LICENSE.md` remains separate.
- [ ] Commercial manuscript/PDF/DOCX/cover files were not accidentally committed.

## GitHub release

- [ ] Choose a release version/tag.
- [ ] Confirm the target commit is the intended `main`.
- [ ] Write release notes from the changelog.
- [ ] Create the tag/release only after CI is green.
- [ ] Do not attach commercial book files to the open-source code release unless intentionally licensed for that purpose.

## After release

- [ ] Confirm README and repository navigation render correctly.
- [ ] Open the next roadmap milestone only if there is meaningful planned work.
- [ ] Keep automated dependency/CI checks active.
