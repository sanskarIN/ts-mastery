# Code Style

The repository optimizes for teaching clarity, strict type safety, deterministic tests, and small reusable modules.

## Type safety

Prefer:

- generics over broad casts;
- discriminated unions for state/results;
- `unknown` at untrusted runtime boundaries;
- explicit runtime guards before narrowing;
- readonly inputs and outputs when mutation is not part of the lesson.

Avoid introducing `any` merely to silence the compiler.

## Optional values

Because `exactOptionalPropertyTypes` is enabled, model “property absent” and “property explicitly undefined” intentionally.

## Indexed access

Because `noUncheckedIndexedAccess` is enabled, validate array/map lookups before using them.

## Errors

Reject invalid configuration early. Error messages should describe the violated invariant without leaking secrets or unrelated internal state.

When a public error envelope is involved, keep unexpected exception details private.

## Async code

- await asynchronous operations explicitly;
- make retry limits bounded;
- inject sleep/time where it improves deterministic testing;
- avoid unresolved background work in unit tests;
- make cleanup/lifecycle ordering observable and tested.

## Data and mutation

Prefer returning new values when the learning objective is immutable design. Stateful utilities may mutate their own private state but should avoid exposing writable internal collections.

## Naming

- project directories: `kebab-case`;
- TypeScript classes/types: `PascalCase`;
- functions/variables: `camelCase`;
- constants: clear descriptive names;
- test names: behavioral sentences.

## Formatting

Use the repository `.editorconfig`. Keep files readable without depending on a formatter-specific style trick. Small modules are preferred to clever abstractions.

## Tests

Every runnable project requires meaningful behavior tests, including error paths or boundary cases when relevant. See [Testing Guide](TESTING_GUIDE.md).

## Security

Never commit real credentials, tokens, private keys, customer data, or proprietary code. See [Security Hardening](SECURITY_HARDENING.md).
