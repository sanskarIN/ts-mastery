# Security Policy

This repository contains educational companion code. Security issues that could put users at risk should be reported privately rather than published with exploit details in a normal public issue.

## Never commit

- API keys or access tokens
- passwords or private keys
- production connection strings
- real webhook secrets
- authentication cookies/session material
- personal/private datasets
- proprietary source code you do not have permission to publish

Examples must use fake values, local fixtures, or environment-variable placeholders.

## Security-sensitive examples

Projects such as webhook signature verification, API error mapping, policy decisions, idempotency, leases, and distributed-system simulations are learning implementations. Production systems require provider/domain-specific threat modeling, persistent/transactional storage where appropriate, replay protection, auditability, observability, rate limits, and operational controls.

Read [`docs/SECURITY_HARDENING.md`](docs/SECURITY_HARDENING.md).

## Dependency reports

If a dependency vulnerability affects this repository, include the package/version and the shortest reproduction or advisory reference needed to assess it. Do not paste unrelated secrets or private system information.

## Reporting

Use GitHub's private vulnerability/security-advisory reporting capability for this repository when available. If private reporting is unavailable, contact the repository owner through a private channel rather than posting actionable exploit details publicly.

Normal non-security bugs belong in the standard bug-report issue form.
