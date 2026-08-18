# Part 098 — Geospatial Platform Reliability and SRE with TypeScript: SLIs, Capacity, Chaos Engineering, Multi-Region Recovery, and Production Operations

> ## 📘 Complete eBook on Gumroad
> **Official Store:** **https://ramsandesh.gumroad.com**
>
> Get the complete *TypeScript Full Mastery* eBook and future publication releases from the official Gumroad storefront.

**Book mapping:** TypeScript Full Mastery, Part 98.

## Public companion scope

Use this folder for runnable TypeScript code, tests, exercises, concise setup notes, and links to larger companion projects related to this part. Keep the complete commercial chapter text, PDF/DOCX publication pages, private data, secrets, and unlicensed third-party assets out of the public repository.

## Runnable reliability projects

- [`retry-policy`](../../projects/retry-policy/) — bounded retries and exponential backoff.
- [`circuit-breaker`](../../projects/circuit-breaker/) — open, half-open, and closed resilience states.
- [`token-bucket-rate-limiter`](../../projects/token-bucket-rate-limiter/) — deterministic capacity protection and refill behavior.
- [`bulkhead-limiter`](../../projects/bulkhead-limiter/) — bound concurrent work and reject overload when a queue is full.
- [`health-check-aggregator`](../../projects/health-check-aggregator/) — combine service checks into `up`, `degraded`, and `down` readiness states.

## Suggested code artifact

Compose the resilience primitives into a simulated production service and measure retries, rejected overload, circuit state, health status, and capacity decisions.

---

**📚 TypeScript Full Mastery Store:** **https://ramsandesh.gumroad.com**
