# llm-worker

Production consumer for `chat:worker-inbox`. Streams replies from
**Google Gemini** (via `@google/genai`) for general topics, or from an
**Agentforce agent in a separate Salesforce org** for Human Resources
topics (vacations, labor law, benefits, payroll, leave, etc.). Persists
conversation turns in Heroku Postgres for prompt history, and fires
`Chat_Message_Finalized__e` Platform Events to the primary Salesforce
org so the existing Apex trigger writes them to `Chat_Message__c`.

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

## Agentforce env vars (HR routing)

When all five vars below are set, the worker routes turns the topic router
classifies as **HR** to the Agentforce agent. If any of them is missing —
or `ROUTE_HR_TO_AGENTFORCE=false` — every turn keeps going to Gemini and
Agentforce is bypassed entirely. This is the kill-switch.

| Var                        | Purpose                                                                           |
| -------------------------- | --------------------------------------------------------------------------------- |
| `AGENTFORCE_LOGIN_URL`     | My-Domain login URL of the _partner_ org (e.g. `https://hr.my.salesforce.com`)    |
| `AGENTFORCE_INSTANCE_URL`  | API host of the partner org (often the same as login URL)                         |
| `AGENTFORCE_CLIENT_ID`     | Consumer Key of a Connected App **in the Agentforce org** with Client Credentials |
| `AGENTFORCE_CLIENT_SECRET` | Consumer Secret of that Connected App                                             |
| `AGENTFORCE_AGENT_ID`      | The agent identifier from Agent Builder in the partner org                        |

One-time setup in the **Agentforce org** (not in this repo's metadata):

1. Build / pick the HR agent and copy its `agentId`.
2. Create a Connected App with OAuth scopes `api`, `sfap_api`, `chatbot_api`,
   `refresh_token`, then enable **Client Credentials Flow** with a "Run As"
   integration user that has access to the agent.
3. Copy the Consumer Key / Consumer Secret / instance URL into the env vars
   above (e.g. `heroku config:set AGENTFORCE_AGENT_ID=… -a sse-edge-prod`).

## Optional env vars

| Var                      | Default            | Purpose                                                             |
| ------------------------ | ------------------ | ------------------------------------------------------------------- |
| `GEMINI_MODEL`           | `gemini-2.5-flash` | Override the chat model (e.g. `gemini-2.5-pro`, `gemini-2.0-flash`) |
| `ROUTER_MODEL`           | `gemini-2.5-flash` | Override the topic-classifier model                                 |
| `ROUTE_HR_TO_AGENTFORCE` | `true`             | Set to `false` to disable the HR route (kill-switch)                |
| `SYSTEM_PROMPT`          | hardcoded fallback | Override the system prompt (Gemini path only)                       |
| `HISTORY_LIMIT`          | `20`               | Max prior turns sent to the model                                   |
| `CONSUMER_GROUP`         | `llm`              | Redis Streams consumer group                                        |
| `CONSUMER_NAME`          | `<group>-<pid>`    | Per-process consumer name                                           |
| `SF_API_VERSION`         | `v66.0`            | Salesforce REST API version                                         |
| `LOG_LEVEL`              | `info`             | pino log level                                                      |

## Behavior

For each message in the inbox:

1. **Persist** the user's turn in Postgres (`chat_history`, idempotent by `message_id`).
2. **Load** up to `HISTORY_LIMIT` recent turns for the conversation.
3. **Route**: a two-tier classifier picks `hr` or `general`.
   - Tier 1: keyword/regex prefilter (English + Portuguese HR vocabulary).
   - Tier 2: only on ambiguous turns — one Gemini structured-output call
     returning `{topic: "hr" | "general"}`.
4. **Stream**: HR turns go to the Agentforce Agent API (per-conversation
   session, native `fetch()` SSE parser); general turns go to Gemini via
   `client.models.generateContentStream(...)`. Either way, each text delta
   is published as a `token` frame to `chat:user:<userId>` and the browser's
   open SSE connection forwards it.
5. **Finalize**: persist the assistant turn, publish `message_complete`, and
   fire-and-forget two `Chat_Message_Finalized__e` Platform Events (one for
   the user turn, one for the assistant turn). SFDC publish failures are
   logged but don't fail the chat — the events can be replayed from Postgres
   if needed.
6. **ACK** the inbox entry. Errors publish an `error` frame to the user
   stream and ACK to avoid poison-message loops.

## Switching back to echo

For local-dev-style testing without an LLM bill:

```bash
heroku config:set WORKER_MODE=echo -a sse-edge-prod
heroku ps:restart worker -a sse-edge-prod
```
