# Project Coding Standards

## Testing

- Write tests before code (TDD)
- For bugs: write a failing test first (Prove-It pattern)

## Code Quality

- Review across five axes: correctness, readability, architecture,
  security, performance
- Every PR must pass: lint, type check, tests, build

## Implementation

- Build in small, verifiable increments: implement → test → verify →
  commit

## Boundaries

- Never: commit secrets, skip tests, remove failing tests
