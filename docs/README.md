# Documentation Hub

[![Official Gumroad Store](../assets/gumroad-store-banner.svg)](https://ramsandesh.gumroad.com)

This directory is the documentation hub for the **TypeScript Full Mastery companion-code repository**. The public repository contains source code, tests, exercises, and concise code documentation. The commercial book manuscript, merged PDF/DOCX, cover package, and other publishing assets remain outside this repository.

## Start here

For readers who want to run the code, begin with [Getting Started](GETTING_STARTED.md), then use the [Parts Index](PARTS_INDEX.md) or [Project Matrix](PROJECT_MATRIX.md) to move between the 120-part curriculum and runnable projects.

For contributors, read [Project Standards](PROJECT_STANDARDS.md), [Code Style](CODE_STYLE.md), [Testing Guide](TESTING_GUIDE.md), and the root [Contributing Guide](../CONTRIBUTING.md) before opening a change.

For maintainers, use [Quality Gates](QUALITY_GATES.md), [Maintenance](MAINTENANCE.md), [Dependency Policy](DEPENDENCY_POLICY.md), [Security Hardening](SECURITY_HARDENING.md), [Release Checklist](RELEASE_CHECKLIST.md), and [Final Audit](FINAL_AUDIT.md).

## Documentation map

| Document | Purpose |
|---|---|
| [Getting Started](GETTING_STARTED.md) | Clone, install, verify, build, and navigate the repository |
| [Architecture](ARCHITECTURE.md) | Repository architecture, design boundaries, and quality model |
| [API Reference](API_REFERENCE.md) | Public learning APIs exposed by all companion projects |
| [Build and Run](BUILD_AND_RUN.md) | Script lifecycle, generated output, and test execution |
| [Repository Layout](REPOSITORY_LAYOUT.md) | Directory-by-directory ownership and conventions |
| [Parts Index](PARTS_INDEX.md) | Navigation for Parts 001–120 |
| [Project Matrix](PROJECT_MATRIX.md) | Companion projects mapped to curriculum concepts |
| [Project Standards](PROJECT_STANDARDS.md) | Minimum standard for every runnable project |
| [Code Style](CODE_STYLE.md) | TypeScript design and implementation conventions |
| [Testing Guide](TESTING_GUIDE.md) | Unit-test patterns and deterministic test guidance |
| [Quality Gates](QUALITY_GATES.md) | What `npm run verify` enforces |
| [Compatibility](COMPATIBILITY.md) | Node.js, module, and runtime compatibility |
| [Troubleshooting](TROUBLESHOOTING.md) | Common setup/build/test failures and fixes |
| [Maintenance](MAINTENANCE.md) | How to add, rename, remove, or evolve projects safely |
| [Dependency Policy](DEPENDENCY_POLICY.md) | Dependency-light policy and update procedure |
| [Security Hardening](SECURITY_HARDENING.md) | Secret handling and secure-example rules |
| [Release Checklist](RELEASE_CHECKLIST.md) | Repeatable pre-release and release procedure |
| [GitHub Release Plan](GITHUB_RELEASE_PLAN.md) | Final release/tag strategy |
| [Final Audit](FINAL_AUDIT.md) | Executed validation vs unsurfaced GitHub-hosted checks |
| [Book-to-Repo Policy](BOOK_TO_REPO_POLICY.md) | Public-code vs commercial-content boundary |
| [Commit Policy](COMMIT_POLICY.md) | Commit-quality expectations |
| [Validation Record](VALIDATION.md) | Recorded validation milestones |
| [Repository Build Summary](REPOSITORY_BUILD_SUMMARY.md) | Current repository scale and build summary |
| [FAQ](FAQ.md) | Short answers to common questions |
| [Final Release Status](FINAL_RELEASE_STATUS.md) | Current completion and release-readiness status |
| [`code-catalog.json`](code-catalog.json) | Machine-readable runnable-group catalog |

## One-command quality check

```bash
npm install
npm run verify
```

The verification command checks repository structure, documentation links, strict TypeScript compilation, a clean build, and the complete automated-test collection.

---

**Official TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**
