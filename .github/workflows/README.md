# CI / CD lanes

This monorepo deploys two artifacts to two different platforms. Each lane is path-filtered so changes to one side don't trigger work on the other.

| Lane                    | Trigger paths                                                                 | PR behavior                                  | `main` push behavior                                                    |
| ----------------------- | ----------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `ci-uibundle.yml`       | `force-app/main/default/uiBundles/myreactapp/**`, `packages/chat-protocol/**` | lint + test + build                          | same, plus uploads `dist/` artifact                                     |
| `ci-sse-edge.yml`       | `apps/sse-edge/**`, `packages/chat-protocol/**`                               | test + build                                 | same                                                                    |
| `deploy-salesforce.yml` | `force-app/**`, `packages/chat-protocol/**`                                   | `sf project deploy validate` against sandbox | `sf project deploy start` against prod                                  |
| `deploy-heroku.yml`     | `apps/sse-edge/**`, `packages/chat-protocol/**`                               | (no PR action)                               | git push to Heroku app, healthcheck `/healthz` with rollback on failure |

A change to `packages/chat-protocol/**` (the shared SSE wire envelope) is the only path that fans out to both deploy lanes. The CI lanes share that path too so the protocol is built/typechecked from both consumers' perspective.

## Required GitHub repository secrets

Add these via **Settings → Secrets and variables → Actions**.

### Salesforce

- `SF_AUTH_URL_SANDBOX` — Output of `sf org display --target-org <sandbox-alias> --verbose --json | jq -r '.result.sfdxAuthUrl'` for the sandbox/scratch org used by PR validations.
- `SF_AUTH_URL_PROD` — Same, for the production org targeted on `main` push.

The deploy workflow runs both with `--tests ChatTokenBrokerTest --tests ChatMessageWriterTest --test-level RunSpecifiedTests`. PR runs use validate (dry-run, no commit); main runs use `deploy start`.

### Heroku

- `HEROKU_API_KEY` — Long-lived API key from `heroku auth:token`. Prefer a service-account user, not a human's personal token.
- `HEROKU_APP_NAME` — e.g. `sse-edge-prod`.
- `HEROKU_EMAIL` — Email of the Heroku account that owns the API key.

The Heroku app must already be provisioned with the [monorepo buildpack](https://github.com/lstoll/heroku-buildpack-monorepo) and `APP_BASE=apps/sse-edge`. See `apps/sse-edge/README.md` for the one-time setup.

## Branching model assumed

- `main` is the deploy-on-merge branch. Every push triggers prod deploys.
- PRs targeting `main` run validation (Salesforce dry-run; full uiBundle and sse-edge build/test).
- No staging/UAT branch yet. If you need one, add a `staging` branch trigger to each deploy workflow with its own `SF_AUTH_URL_STAGING` and `HEROKU_APP_NAME_STAGING`.

## Concurrency

Each workflow uses a `concurrency` group keyed on `${github.ref}`:

- CI workflows have `cancel-in-progress: true` (newer commits supersede older ones)
- Deploy workflows have `cancel-in-progress: false` (don't kill an in-flight deploy mid-callout)

## Local equivalents

Before pushing, you can run the same checks locally:

```bash
# Both CI lanes
pnpm install --frozen-lockfile
pnpm --filter @chat/protocol build
pnpm --filter base-react-app lint
pnpm --filter base-react-app exec vitest run
pnpm --filter base-react-app build
pnpm --filter sse-edge test
pnpm --filter sse-edge build

# Salesforce dry-run (requires authenticated org)
sf project deploy validate --source-dir force-app \
  --tests ChatTokenBrokerTest --tests ChatMessageWriterTest \
  --test-level RunSpecifiedTests
```
