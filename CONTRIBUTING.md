# Contributing

Contributions are welcome for companion **code** and code-related documentation.

## Before opening a pull request

1. Keep the change tied to a specific TypeScript concept or book part.
2. Do not copy large passages from the commercial book into the repository.
3. Add or update tests when behavior changes.
4. Keep `strict` TypeScript enabled.
5. Avoid committing generated `dist/`, credentials, secrets, private data, or machine-specific files.
6. Run:

```bash
npm run verify
```

## Folder choice

- Small single-concept example → `examples/`
- Multi-file application or capstone → `projects/`
- Navigation/notes tied to a book part → `parts/part-XXX-*/`

## Pull request description

State the related part number, what the example demonstrates, how it was tested, and any compatibility assumptions.
