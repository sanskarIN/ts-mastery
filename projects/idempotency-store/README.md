# Idempotency Store

> **📘 Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**

A small in-memory idempotency helper for APIs, background jobs, payments-like request flows, webhook handling, and distributed-systems exercises.

## Highlights

- deduplicates concurrent calls sharing the same key
- reuses completed successful results
- failed operations are removed so they can be retried
- validates blank keys
- dependency-free and fully testable

This project demonstrates promises, maps, request deduplication, reliability boundaries, and failure-aware state cleanup.

```bash
npm run verify
```

---

**Official Gumroad Store:** **https://ramsandesh.gumroad.com**
