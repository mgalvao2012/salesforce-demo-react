# llm-worker

Production consumer for `chat:worker-inbox`. Streams replies from
**Google Gemini** (via `@google/genai`), persists conversation turns in
Heroku Postgres for prompt history, and fires `Chat_Message_Finalized__e`
Platform Events to Salesforce so the existing Apex trigger writes them to
`Chat_Message__c`.

## Run locally

Requires Redis and Postgres reachable on the URLs below.

```bash
REDIS_URL=redis://localhost:6379 \
DATABASE_URL=postgres://localhost/chat \
GOOGLE_API_KEY=AIza... \
SF_LOGIN_URL=https://<my-domain>.my.salesforce.com \
SF_CLIENT_ID=<connected-app-consumer-key> \
SF_CLIENT_SECRET=<connected-app-consumer-secret> \
pnpm dev:worker:llm
```

## Heroku deployment

Ships in the **same combined slug** as `sse-edge` and `echo-worker`, deployed
via `pnpm deploy:edge`. The slug includes a small dispatcher (`worker.js`)
that picks an implementation at runtime via `WORKER_MODE`:

```
worker: node worker.js          # dispatcher
  → WORKER_MODE=echo  → worker_echo/dist/index.js
  → WORKER_MODE=llm   → worker_llm/dist/index.js
```

Switching workers is a config-var change — no redeploy:

```bash
heroku config:set WORKER_MODE=llm -a sse-edge-prod
heroku ps:restart worker -a sse-edge-prod
```

## Required env vars

| Var                | Purpose                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- |
| `REDIS_URL`        | Heroku Redis add-on (shared with web + echo-worker)                                |
| `DATABASE_URL`     | Heroku Postgres add-on; idempotent `CREATE TABLE IF NOT EXISTS` runs at startup    |
| `GOOGLE_API_KEY`   | Google AI Studio API key (`AIza…`) — get one at https://aistudio.google.com/apikey |
| `SF_LOGIN_URL`     | Salesforce instance / my-domain URL (e.g. `https://acme.my.salesforce.com`)        |
| `SF_CLIENT_ID`     | Consumer Key of the Connected App (the same one that mints user JWTs)              |
| `SF_CLIENT_SECRET` | Consumer Secret of that Connected App                                              |

The Connected App must have **Enable Client Credentials Flow** turned on in
Setup → App Manager → Manage → OAuth Policies, with a "Run As" user that has
permission to publish `Chat_Message_Finalized__e`. The pre-existing JWT-bearer
flow keeps working alongside it.

## Optional env vars

| Var              | Default            | Purpose                                                             |
| ---------------- | ------------------ | ------------------------------------------------------------------- |
| `GEMINI_MODEL`   | `gemini-2.5-flash` | Override the chat model (e.g. `gemini-2.5-pro`, `gemini-2.0-flash`) |
| `SYSTEM_PROMPT`  | hardcoded fallback | Override the system prompt                                          |
| `HISTORY_LIMIT`  | `20`               | Max prior turns sent to the model                                   |
| `CONSUMER_GROUP` | `llm`              | Redis Streams consumer group                                        |
| `CONSUMER_NAME`  | `<group>-<pid>`    | Per-process consumer name                                           |
| `SF_API_VERSION` | `v66.0`            | Salesforce REST API version                                         |
| `LOG_LEVEL`      | `info`             | pino log level                                                      |

## Behavior

For each message in the inbox:

1. **Persist** the user's turn in Postgres (`chat_history`, idempotent by `message_id`).
2. **Load** up to `HISTORY_LIMIT` recent turns for the conversation.
3. **Stream** Gemini via `client.models.generateContentStream(...)`, publishing
   `token` frames to `chat:user:<userId>` as each delta arrives. The browser's
   open SSE connection forwards them. The system prompt is sent as Gemini's
   `systemInstruction`; assistant turns map to Gemini's `model` role.
4. **Finalize**: persist the assistant turn, publish `message_complete`, and
   fire-and-forget two `Chat_Message_Finalized__e` Platform Events (one for
   the user turn, one for the assistant turn). SFDC publish failures are
   logged but don't fail the chat — the events can be replayed from Postgres
   if needed.
5. **ACK** the inbox entry. Errors publish an `error` frame to the user
   stream and ACK to avoid poison-message loops.

## Switching back to echo

For local-dev-style testing without an LLM bill:

```bash
heroku config:set WORKER_MODE=echo -a sse-edge-prod
heroku ps:restart worker -a sse-edge-prod
```
