# GitHub Release Plan

> ## 📘 Official Gumroad Store
> **https://ramsandesh.gumroad.com**
>
> Keep the public repository focused on open-source companion code while directing readers to the official storefront for the complete eBook and publication releases.

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
- the official Gumroad store is clearly linked: **https://ramsandesh.gumroad.com**

## Good future additions

- one tested starter/solution pair for each major language topic
- framework-specific projects kept in independent subfolders
- geospatial examples with tiny redistributable fixtures
- CI checks for TypeScript compilation and tests
- release notes tied to companion-code changes
- issue labels by part number or curriculum area

## Avoid

Do not create 120 nearly identical repositories. A single well-organized companion repository is easier for readers to discover, clone, search, and keep updated. Split out a project only when it becomes a substantial independent application/library with its own release lifecycle.

---

**📚 TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**
