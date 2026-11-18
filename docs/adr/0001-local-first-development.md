# ADR 0001: Local-first development and monorepo

- **Status:** Accepted
- **Date:** 2026-11-18

## Context

The project is a personal learning dashboard with a modest cloud budget. Its hosting target is undecided. Frontend, API, database, and observability should be runnable and testable without provisioning cloud resources.

## Decision

Use one GitHub monorepo. Build the UI with React, Vite, and TypeScript; build the API with Go; use PostgreSQL for persistence. Use Docker Compose for the local development stack. Keep deployment to AWS or a Raspberry Pi as a later decision, and keep EKS an optional time-boxed learning exercise.

## Consequences

- Feature development and CI can happen without AWS costs.
- Local Compose configuration and CI provide a repeatable baseline for later deployment comparisons.
- A monorepo simplifies changes across API contracts and clients, but components should retain clear boundaries.
- Hosting, access model, and production operations remain open decisions.
