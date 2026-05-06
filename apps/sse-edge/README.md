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

This app deploys via the [heroku-buildpack-monorepo](https://github.com/lstoll/heroku-buildpack-monorepo) so Heroku sees only `apps/sse-edge/` as the application root.

```bash
heroku apps:create sse-edge-prod --generation=fir --region=us
heroku buildpacks:add -i 1 https://github.com/lstoll/heroku-buildpack-monorepo -a sse-edge-prod
heroku buildpacks:add -i 2 heroku/nodejs                                       -a sse-edge-prod
heroku config:set APP_BASE=apps/sse-edge -a sse-edge-prod
heroku addons:create heroku-redis:premium-0      -a sse-edge-prod
heroku addons:create heroku-postgresql:standard-0 -a sse-edge-prod
git push heroku main
```
