# @modelescrow/openapi-core

OpenAPI 3.1 contracts for Modelescrow.

| Domain | Spec |
|--------|------|
| identity | `src/identity.yaml` |
| contests | `src/contests.yaml` |
| submissions | `src/submissions.yaml` |
| evaluations | `src/evaluations.yaml` |
| escrows | `src/escrows.yaml` |
| settlements | `src/settlements.yaml` |
| disputes | `src/disputes.yaml` |
| deploygates | `src/deploygates.yaml` |

Shared components live under `src/common/`.

```bash
pnpm lint:domains
pnpm bundle:domains
```

**Rule:** After routine YAML edits, regenerate **core only** and handwrite lower layers (see `ddd-codegen` skill).
