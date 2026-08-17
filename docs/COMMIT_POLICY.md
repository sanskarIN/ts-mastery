# Commit Policy

This repository prefers small, reviewable commits that represent real changes. Empty/no-op commits should not be created merely to inflate the commit count.

## Preferred identity

For local Git work, use the repository owner's preferred commit email:

```bash
git config user.email "sanskarin@outlook.in"
```

A matching name may be configured separately with `git config user.name`.

## Commit style

Use concise Conventional-Commit-style prefixes where practical:

- `docs:` documentation
- `examples:` focused learning examples
- `projects:` companion applications
- `test:` automated tests
- `build:` repository/tooling configuration
- `ci:` automation
- `parts:` part-navigation changes
- `legal:` licensing/copyright separation

Commits created through tooling that cannot set Git author metadata should record the preferred identity in a `Signed-off-by` trailer when appropriate.
