# Roadmap

[![Official Gumroad Store](assets/gumroad-store-banner.svg)](https://ramsandesh.gumroad.com)

> **📘 Complete TypeScript Full Mastery eBook:** **https://ramsandesh.gumroad.com**

The repository grows by adding tested companion code without publishing the commercial book text. The official storefront for the complete eBook and publication releases is **https://ramsandesh.gumroad.com**.

## Current foundation

- 120 curriculum navigation folders
- 3 focused runnable examples
- 17 larger dependency-light companion projects
- strict TypeScript compiler settings
- automated structure/catalog checks
- GitHub Actions verification on Node.js 20 and 22
- project matrix, testing guide, contribution standards, and ownership rules

## Next project themes

### Core TypeScript and data structures

- typed observable/store primitive
- immutable patch/diff engine
- generic binary heap
- schema migration planner
- bounded memoization utility

### Backend and API engineering

- typed middleware pipeline
- request correlation/context store
- API error envelope mapper
- webhook signature-verification demo using fake test secrets
- ETag/conditional-request helper

### Reliability and distributed systems

- bulkhead concurrency limiter
- outbox/inbox pattern simulation
- dead-letter queue simulator
- saga coordinator
- lease/lock state model
- health/readiness state aggregator

### Platform and workflow engineering

- DAG task runner
- deployment rollout simulator
- capacity allocation model
- configuration layering engine
- policy decision engine
- multi-region routing simulator

### Geospatial TypeScript

- bounding-box utilities
- coordinate normalization
- GeoJSON FeatureCollection validation
- tile-coordinate conversion helpers
- spatial indexing learning example

## Documentation roadmap

- Keep `docs/PARTS_INDEX.md`, `docs/PROJECT_MATRIX.md`, and `docs/code-catalog.json` synchronized with every new runnable artifact.
- Add architecture notes only where they help readers understand public code without reproducing the paid manuscript.
- Keep the official Gumroad link prominent in reader-facing documentation.

## Quality gate

Every new runnable artifact should compile under strict TypeScript settings, include meaningful tests, satisfy the repository structure validator, and pass:

```bash
npm run verify
```

---

**📚 Official Gumroad Store:** **https://ramsandesh.gumroad.com**
