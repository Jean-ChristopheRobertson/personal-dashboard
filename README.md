# Personal Dashboard

Local-first personal dashboard and software-learning project. The current scaffold contains a React + Vite + TypeScript frontend, a small Go API, PostgreSQL, and an optional local observability profile (Prometheus, Loki, Grafana, and OpenTelemetry Collector).

> This is an early development scaffold, not an authenticated or production-ready application. The dashboard currently displays synthetic preview content; the API does not yet persist dashboard data. Do not enter real personal or financial information.

## Prerequisites

- Docker Desktop with the Linux container engine running
- Git

The web frontend and Go API run in containers, so Node.js and Go are not required on the host for the default Compose workflow. For direct frontend development, install Node.js 22 or newer and use `apps/web`.

## Start the local stack

From the repository root in PowerShell:

```powershell
Copy-Item .env.example .env
# Optional: edit .env and replace the local-only passwords.
docker compose up --build
```

Open:

- Dashboard: http://localhost:5173
- API health: http://localhost:8080/healthz
- API sample summary: http://localhost:8080/api/v1/summary

Start the full local observability profile in a second terminal:

```powershell
docker compose --profile observability up --build
```

Then open Grafana at http://localhost:3000 (default local-only credentials: `admin` / `local-only-change-me`) and Prometheus at http://localhost:9090. Grafana provisions Prometheus and Loki data sources automatically. The OpenTelemetry Collector accepts OTLP on localhost ports 4317 (gRPC) and 4318 (HTTP); application instrumentation and log shipping are follow-up work. Prometheus currently scrapes the Go API's starter metrics endpoint.

Stop containers with `Ctrl+C`, or run `docker compose down`. To also delete local database and observability volumes, run `docker compose down --volumes`; this permanently deletes that local state.

All exposed ports bind to `127.0.0.1`. Do not change them to public interfaces or reuse the sample passwords outside local development.

## Run frontend directly (optional)

```powershell
Set-Location apps/web
npm ci
npm run dev
```

## Current scaffold

- `apps/web` — React + Vite + TypeScript dashboard preview
- `services/api` — Go HTTP API with health, sample summary, and starter Prometheus metrics endpoints
- `db/migrations` — initial PostgreSQL table; the API does not yet connect to it
- `observability` — local Prometheus, Loki, Grafana provisioning, and OTLP collector config
- `compose.yaml` — core services plus an optional `observability` profile
- `.github/workflows/ci.yml` — frontend build/typecheck and Go test/vet checks
- `project.md` — project goals, plan, architecture, and decisions

## Next implementation slices

1. Replace the static preview with accessible UI components and define its visual/data contracts.
2. Connect the Go API to PostgreSQL and add migrations, repository tests, and task/habit endpoints.
3. Add OpenAPI and contract checks; wire the UI to the API.
4. Add OpenTelemetry instrumentation, log collection, and a useful Grafana dashboard.
5. Add authentication and integrations only after the security and privacy requirements are designed.
