# sse-edge

Heroku-deployed SSE edge that streams chat events from Redis Streams to browsers.

## Layout

This app lives inside the monorepo at `apps/sse-edge/`. It depends on `@chat/protocol` (`packages/chat-protocol/`) for shared wire-envelope types.

## Local development

```bash
pnpm install                  # from repo root
pnpm dev:edge                 # tsx watch src/index.ts
```

## Heroku deploy

The deploy script builds **both** sse-edge (web) and echo-worker (worker), assembles
one combined slug, and force-pushes it as a fresh git history to the `heroku` remote.
The slug's `Procfile` declares both process types so they run in the same Heroku app
and share the Redis add-on. Heroku runs a clean `npm install` against the slug — no
monorepo buildpack, no workspace deps, no shipped node_modules.

```
slug/
├── package.json   # union of edge + worker runtime deps
├── Procfile       # web + worker
├── web/dist/      # sse-edge built output
├── worker/dist/   # echo-worker built output
└── vendor/chat-protocol/  # vendored shared types
```

One-time setup:

```bash
heroku apps:create sse-edge-prod --region=us
heroku addons:create heroku-redis:premium-0      -a sse-edge-prod
heroku addons:create heroku-postgresql:standard-0 -a sse-edge-prod
heroku config:set \
  JWT_ISSUER=<issuer> \
  JWT_AUDIENCE=<audience> \
  JWT_JWKS_URL=<jwks-url> \
  ALLOWED_ORIGINS=<origins> \
  -a sse-edge-prod
git remote add heroku https://git.heroku.com/sse-edge-prod.git
```

Deploy (run from repo root):

```bash
pnpm deploy:edge
```

After the first deploy, scale both dyno types:

```bash
heroku ps:scale web=1 worker=1 -a sse-edge-prod
```

`web` is the Fastify SSE edge; `worker` is the echo consumer. Scale them
independently — typically `web` scales horizontally with active users, and
`worker` scales with throughput on `chat:worker-inbox` (Redis Streams
consumer groups distribute jobs across worker dynos automatically).

The `heroku` git remote URL is read from `git remote get-url heroku`. To target a
different app, set `HEROKU_GIT_URL=https://git.heroku.com/<app>.git` before running.
Set `DEPLOY_DRY_RUN=1` to assemble and inspect the slug without pushing.
