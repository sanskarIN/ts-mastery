# GitHub Release Plan

> **Official TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**

The repository is now in release-candidate/final-maintenance shape rather than initial scaffolding.

## Repository identity

- Repository: `sanskarIN/ts-mastery`
- Public role: open-source companion code for the 120-part TypeScript Full Mastery series
- Source-code license: MIT
- Commercial/editorial content: kept separate under `BOOK_CONTENT_LICENSE.md`

## Current release scope

The final companion collection contains:

- 120 curriculum navigation folders;
- 3 focused examples;
- 48 larger projects;
- 51 cataloged runnable groups;
- 140 expected integrated automated test cases.

## `v1.0.0` release gate

Create or mark `v1.0.0` only after the exact target commit has:

- passed `npm run verify` from a clean install;
- passed the Node.js 20 CI job;
- passed the Node.js 22 CI job;
- passed local Markdown-link and structure/catalog checks;
- been reviewed for secrets/private data;
- been reviewed for licensing/publishing-boundary mistakes;
- had its changelog/release notes checked for accuracy.

Use [Release Checklist](RELEASE_CHECKLIST.md) as the operational checklist.

## Release contents

A GitHub source-code release may contain/tag the public repository code and public documentation. Do not attach the commercial manuscript, merged PDF/DOCX, cover masters, or other paid publication assets unless they are intentionally released under an explicit compatible notice.

## After `v1.0.0`

Prefer maintenance releases for:

- reproducible bug fixes;
- security hardening;
- supported-runtime/compiler changes;
- documentation corrections;
- dependency maintenance;
- genuinely useful new companion projects that fill a clear curriculum gap.

Do not create artificial releases or commits only to increase counts.

## Audit status

See [Final Audit](FINAL_AUDIT.md) and [Final Release Status](FINAL_RELEASE_STATUS.md) before tagging.

---

**Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**
