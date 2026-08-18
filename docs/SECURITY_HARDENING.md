# Security Hardening Guide

This repository contains educational code, but examples should still teach safe defaults.

## Secrets

Never commit real:

- API keys;
- access tokens;
- passwords;
- private keys;
- webhook secrets;
- production connection strings;
- session/cookie material.

Security-related tests use fake local values.

## Trust boundaries

Prefer `unknown` for external/runtime input and narrow it deliberately. Relevant companion examples include configuration validation, GeoJSON guards, validation pipelines, and API error mapping.

## Error disclosure

Do not return arbitrary exception text to an external caller. `api-error-envelope` demonstrates mapping known application errors while replacing unexpected internal exceptions with a stable generic message.

## Webhook verification

`webhook-signature` demonstrates HMAC-SHA256 verification and timing-safe comparison. A real webhook integration should additionally define:

- provider-specific canonical payload rules;
- timestamp/replay protection;
- secret rotation;
- body-byte preservation;
- request-size limits.

## Authentication and authorization

The repository's policy examples are not a complete identity system. Production authorization requires authenticated principals, trusted claims, resource-level rules, auditability, and careful default-deny behavior.

## Distributed-system examples

In-memory idempotency, leases, outboxes, dead-letter queues, and sagas are educational models. A production distributed system requires durable/transactional storage and well-defined consistency semantics.

## Dependency and CI security

- keep CI permissions read-only unless a job truly needs write access;
- review dependency updates;
- do not expose repository secrets to untrusted pull-request code;
- avoid downloading unpinned arbitrary executables in scripts.

## Reporting a vulnerability

Follow the root [Security Policy](../SECURITY.md). Avoid publishing exploit details in a normal public issue when disclosure could put users at risk.
