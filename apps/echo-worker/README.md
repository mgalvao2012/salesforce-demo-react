# echo-worker

Local-dev / smoke-test consumer for `chat:worker-inbox`. For each message it reads,
it publishes an `assistant` reply to `chat:user:<userId>` that simply echoes the
user's input, streamed as small token chunks. Useful for proving the
SSE pipe end-to-end without an LLM bill.

## Run locally

```bash
# requires a Redis on the default URL
REDIS_URL=redis://localhost:6379 pnpm dev:worker
```

## Heroku deployment

This worker ships in the **same combined slug** as `sse-edge`, deployed by
`apps/sse-edge/scripts/deploy-heroku.sh` (run via `pnpm deploy:edge`). Both
process types are declared in the slug's `Procfile`:

```
web: node web/dist/index.js
worker: node worker/dist/index.js
```

After deploying, scale the worker dyno:

```bash
heroku ps:scale web=1 worker=1 -a sse-edge-prod
```

Both processes share the same `REDIS_URL` (provided by the Heroku Redis add-on
attached to the app). The worker process honors `SIGTERM` (drains in-flight jobs
for up to 25s).

## Env vars

| Var                   | Default                  | Purpose                                             |
| --------------------- | ------------------------ | --------------------------------------------------- |
| `REDIS_URL`           | `redis://localhost:6379` | Provided by Heroku Redis add-on                     |
| `CONSUMER_GROUP`      | `echo`                   | Redis Streams consumer group name                   |
| `CONSUMER_NAME`       | `<group>-<pid>`          | Per-process consumer name within the group          |
| `ECHO_TOKEN_DELAY_MS` | `40`                     | Sleep between token frames (typing effect)          |
| `ECHO_PREFIX`         | `You said: `             | Prefix the echo response (set to `''` for raw echo) |
| `LOG_LEVEL`           | `info`                   | pino log level                                      |
