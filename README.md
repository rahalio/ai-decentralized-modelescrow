# Modelescrow

Trustless ML model bounty desk: requesters escrow rewards against a dataset hash and evaluation function; providers submit models; settlement pays winners from independent evaluation.

Product specs: [PRODUCT.md](PRODUCT.md), [USER_STORIES.md](USER_STORIES.md), [WEBAPP.md](WEBAPP.md).

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp        →  SPA (generated services/features + product UI)
```

Package scope: **`@modelescrow/*`**.

## Quick start

```bash
# Obtain local codegen tooling (never committed — see below)
rsync -a --delete /path/to/zero-apps-codegen-scaffold/.codegen/ .codegen/

pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: modelescrow_demo_local_dev_key
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=modelescrow-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## `.codegen` is local-only

The `zero-codegen` tool lives under `.codegen/` for local generation. **Never commit or push `.codegen/`** (enforced by `.gitignore` and `.cursor/rules/no-codegen-commit.mdc`). On a fresh clone, copy `.codegen` from [zero-apps-codegen-scaffold](https://github.com/) (or your local scaffold checkout), then set `package_scope` to `@modelescrow` if needed and run `pnpm codegen:paths`.

## Codegen rules (agents)

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
