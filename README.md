# Salesforce Chat UI over External SSE

A Salesforce-embedded React chat UI that streams responses from an external Server-Sent Events (SSE) edge, designed to scale to 10,000+ concurrent users. Three pillars:

- **React 19 uiBundle** served by Salesforce LWR (Experience Cloud) for the chat UI.
- **Stateless Fastify SSE edge** on Heroku, fronting a worker pool.
- **Redis Streams** as the fan-out bus between workers and the edge — no sticky sessions, horizontal scale by adding dynos.

The worker routes per-turn between two backends: **Google Gemini** for general topics and an **Agentforce agent in a separate Salesforce org** for Human Resources topics (vacations, labor law, benefits, payroll, leave). Finalized messages are persisted to Salesforce custom objects via Platform Events; hot streaming state lives in Heroku Postgres.

## Solution Architecture

### High-level component view

```mermaid
flowchart TB
    subgraph SF["Salesforce — primary org (LWR / Experience Cloud)"]
        Browser["Browser<br/>React uiBundle<br/>ChatView · useSSE · chatStore"]
        Apex["Apex<br/>ChatTokenBroker.mintToken()"]
        GraphQL["GraphQL<br/>history read"]
        PE["Platform Event<br/>Chat_Message_Finalized__e<br/>+ Trigger → Writer"]
        Obj["Custom Objects<br/>Chat_Conversation__c<br/>Chat_Message__c<br/>(planned: Chat_Message_Archive__b)"]
        IdP["Named + External Credential<br/>(JWT mint, server-side secret)"]
    end

    subgraph Edge["External / Cloud — Heroku (team-owned)"]
        SSE["SSE Edge (Fastify)<br/>stateless · JWT verify ·<br/>heartbeat · backpressure"]
        Send["POST /send (REST)"]
        Bus["Event bus<br/>Redis Streams<br/>(NATS JetStream alt)"]
        Worker["llm-worker<br/>topic router"]
        DB["Hot DB<br/>Postgres"]
    end

    subgraph LLM["LLM backends"]
        Gemini["Google Gemini<br/>general topics"]
        AF["Agentforce Agent API<br/>partner Salesforce org<br/>(HR topics)"]
    end

    Browser -- "GraphQL" --> GraphQL
    Browser -- "Apex" --> Apex
    Apex --> IdP
    Browser -- "GET /sse + POST /send<br/>Bearer JWT" --> SSE
    Browser --> Send
    Send --> Bus
    Bus -- "subscribe" --> SSE
    SSE -- "stream tokens" --> Browser
    Bus -- "consume" --> Worker
    Worker -- "topic=general" --> Gemini
    Worker -- "topic=hr" --> AF
    Gemini -- "token deltas" --> Bus
    AF -- "token deltas" --> Bus
    Worker --> DB
    Worker -- "publish on<br/>message_complete" --> PE
    PE --> Obj
    GraphQL --> Obj
```

### How the React UI gets notified from the SSE edge

The browser holds **one long-lived HTTPS connection** directly from the user's browser (running the React uiBundle served by Salesforce LWR) to the Heroku-hosted SSE edge. **Salesforce is NOT a relay.** The edge pushes bytes into that open connection; the browser parses each frame and updates the React store.

**Sequence Diagram (Mermaid Notation):**

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser (React)
    participant L as SFDC LWR uiBundle
    participant A as Apex ChatTokenBroker
    participant I as External IdP
    participant E as Heroku SSE Edge
    participant R as Redis Streams
    participant W as LLM Worker (router)
    participant G as Gemini API
    participant F as Agentforce Agent API (partner SF org)
    participant T as Apex Trigger and Chat_Message__c

    B->>L: GET /chat
    L-->>B: HTML and JS bundle
    B->>L: loadHistory via GraphQL (@salesforce/sdk-data)
    L-->>B: prior Chat_Conversation__c and Chat_Message__c

    B->>A: getSseToken (Apex invocable)
    A->>I: Named Cred callout to mint user-scoped JWT
    I-->>A: JWT
    A-->>B: jwt, sseUrl, exp

    Note over B,E: Direct browser to Heroku, NOT proxied through Salesforce
    B->>E: GET /sse with Bearer JWT and Last-Event-ID 42
    E->>E: verifyJwt via jose and JWKS
    E->>R: XREAD BLOCK chat user stream
    E-->>B: 200 OK text/event-stream (body stays open)

    B->>E: POST /send with content
    E->>R: XADD worker-inbox
    E-->>B: messageId
    R-->>W: consume worker-inbox

    Note over W: classifyTopic(text) → 'hr' or 'general'
    alt topic = hr
        W->>F: OAuth client_credentials + start session (cached per conversationId)
        F-->>W: sessionId
        W->>F: POST /messages/stream (text/event-stream)
    else topic = general
        W->>G: generateContentStream(prompt)
    end

    loop For each token delta (sub-50ms each)
        alt topic = hr
            F-->>W: SSE chunk
        else
            G-->>W: stream chunk
        end
        W->>R: XADD chat user stream with token frame
        R-->>E: XREAD returns
        E-->>B: SSE frame event token
        Note over B: store append delta and re-render last bubble
    end

    W->>R: XADD chat user stream with message_complete
    W-->>T: Pub/Sub publish Chat_Message_Finalized__e
    T->>T: Apex trigger upserts Chat_Message__c
    R-->>E: XREAD returns
    E-->>B: SSE frame event message_complete
    Note over B: reconcile streaming message and aria-live announce

    loop Every 15 seconds
        E-->>B: heartbeat ping comment
    end

    Note over B,E: Network drop or dyno cycle ends the fetch stream
    B->>E: reconnect with Last-Event-ID (jittered backoff up to 30s)
    E->>R: XREAD from Last-Event-ID
    E-->>B: resume frames from last delivered event
```

**Key facts the diagram makes explicit:**

1. The browser opens a **direct TLS connection to Heroku** (`sse.mycompany.com`). Salesforce is in the picture only for serving the JS bundle, GraphQL history reads, and minting the JWT.
2. **Salesforce lets the browser go to Heroku** because of the **CSP Trusted URL** (`connect-src https://sse.mycompany.com`) and Heroku's CORS allow-list including the LWR site origin.
3. The connection is **opened by the browser** and stays open. The edge writes into the open response body whenever Redis Streams delivers a new event for that user. Each `\n\n`-terminated frame triggers `fetchEventSource`'s `onmessage` callback synchronously.
4. **No polling**, **no webhook into Salesforce for tokens**, **no Platform Event involved in the live UI path.** Platform Events only fire on `message_complete` for persistence.
5. **Reconnect** is initiated by the browser when the fetch stream ends; the edge resumes from `Last-Event-ID` against Redis Streams, so no tokens are lost across dyno cycles or network blips.
6. **Backend selection happens inside the worker**, after the inbox dispatch. The browser, edge, and Redis path don't know or care whether a given turn was answered by Gemini or Agentforce — they see the same `token` and `message_complete` frames either way.

### Runtime flows

**A. Open chat (cold load)**

1. User navigates to `/chat` in the LWR site.
2. React uiBundle mounts → calls GraphQL via `@salesforce/sdk-data` to load last N `Chat_Conversation__c` + `Chat_Message__c` for current user.
3. Calls `ChatTokenBroker.mintToken()` via Apex → returns `{jwt, sseUrl, exp}`.
4. `useSSE` opens `GET {sseUrl}` with `Authorization: Bearer {jwt}` and last known `Last-Event-ID`.
5. Edge authenticates JWT, subscribes to the user's subject on the event bus, starts forwarding frames.

**B. Send message + stream response**

1. User submits input → optimistic `{role:'user', status:'pending'}` appended to store.
2. `POST /send` to external REST with JWT → returns `messageId`.
3. Worker classifies the turn (HR vs general). HR turns stream from the Agentforce Agent API in the partner org; general turns stream from Gemini. Either way, token deltas land on the same per-user Redis Stream.
4. Edge forwards frames as SSE → browser store appends to `streamingMessage` ref; only the last bubble re-renders.
5. Worker emits `message_complete` frame **and** publishes Platform Event to Salesforce.
6. Apex trigger (`ChatMessageFinalizedTrigger`) → `ChatMessageWriter` upserts `Chat_Message__c` + rolls `Chat_Conversation__c.Ended_At__c`.

**C. Reconnect**

1. Connection drops (network / Safari bfcache / 45s idle with no ping).
2. `useSSE` backs off (1 → 30s, jittered), refreshes token if expired.
3. Reconnect sends `Last-Event-ID` → edge resumes from last event in the bus.

### How the client knows when the edge publishes — push, not poll

SSE is one long-lived HTTP response whose body is never closed. The edge writes `data:` frames into that same response as events occur; the browser's `ReadableStream` parser fires a callback the instant a frame's terminating blank line arrives.

Frame shape (wire envelope):

```
id: 44
event: token
data: {"delta":" world"}

id: 45
event: message_complete
data: {"messageId":"abc"}

: ping
```

Each frame ends with a blank line (`\n\n`) — that delimiter is the "deliver now" signal.

Event-type routing (single stream, multiple semantics):

| `event:`           | Meaning                 | Client behavior                                                       |
| ------------------ | ----------------------- | --------------------------------------------------------------------- |
| `token`            | partial delta           | append to `streamingMessage` ref; only last bubble re-renders         |
| `message_complete` | assistant message final | move into `messages[]`; fire aria-live; reconcile w/ Salesforce write |
| `tool_call`        | tool triggered          | render tool-call card                                                 |
| `error`            | server-side error       | show banner; keep connection                                          |
| `ping` (comment)   | heartbeat               | reset idle watchdog; not surfaced to app                              |

Why the push works end-to-end:

- Edge is subscribed to a per-user subject on NATS/Redis Streams; bus routes to whichever pod holds that user's connection — **no sticky sessions** required.
- Edge calls `res.write(frame)` then flushes immediately (disable Nagle / buffering).
- ALB idle timeout 600s; HTTP/2 multiplexing; heartbeat every 15s keeps LB/CDN from cutting "idle" conns.
- Every frame has `id:` → client echoes `Last-Event-ID` on reconnect so the bus replays from the last delivered event.

Failure detection client-side:

- Clean close / network drop → fetch stream ends → backoff + reconnect with `Last-Event-ID`.
- No pings for 45s → client watchdog aborts → reconnect.
- 401 mid-stream → refresh JWT via `ChatTokenBroker` → reconnect.

### Browser ↔ Platform Events: not the same channel

`fetchEventSource` **does not** subscribe to Salesforce Platform Events. The two paths are independent:

- **Browser real-time path:** worker → Redis Streams → SSE edge → `fetchEventSource`. Tokens, completions, errors flow here. Sub-50ms latency, no per-message Salesforce cost.
- **Salesforce persistence path:** worker → Platform Event → Apex trigger → `Chat_Message__c`. Used only for finalized messages, never per token.

Why not feed the browser from Platform Events directly?

- Platform Events ride **CometD long-polling** or the server-side **Pub/Sub gRPC API** — neither is consumable by `EventSource` or `fetchEventSource`.
- **Daily delivery caps** would be exhausted by token volume at 10K users.
- **Latency** of CometD (~250ms+) is unsuitable for token streaming.

If a Platform Event must reach the live UI (e.g., presence, external system signals): the edge subscribes to Platform Events via Pub/Sub gRPC server-side and republishes relevant events onto the user's Redis Streams subject, so the browser sees them as a normal SSE frame. Client code is unchanged.

```
Salesforce ──▶ Pub/Sub gRPC ──▶ SSE Edge ──▶ Redis Streams (chat:user:<id>) ──▶ Browser
```

### Topic routing — Gemini vs Agentforce

Inside `handleJob()` ([apps/llm-worker/src/index.ts](apps/llm-worker/src/index.ts)), each user turn is classified before streaming:

1. **Tier 1 — keyword/regex prefilter** ([apps/llm-worker/src/router.ts](apps/llm-worker/src/router.ts)): English + Portuguese HR vocabulary (`vacation|PTO|payroll|labor law|benefits|férias|licença|salário|CLT|...`). Free, synchronous, catches obvious HR turns.
2. **Tier 2 — Gemini structured-output classifier**: only fires when the prefilter is ambiguous. One extra Gemini call returns `{topic: "hr" | "general"}`.

HR turns route to the **Agentforce Agent API** in a separate Salesforce org via [apps/llm-worker/src/agentforce.ts](apps/llm-worker/src/agentforce.ts) — OAuth2 client_credentials, per-conversation session cache, native `fetch()` SSE parser, retry-once on session expiry. Other turns keep going to Gemini. Either way, the worker emits the same `token` and `message_complete` frames; the SSE edge, browser, and Salesforce persistence path are unchanged.

Setting `ROUTE_HR_TO_AGENTFORCE=false` (or omitting any of the five `AGENTFORCE_*` env vars) disables routing entirely — all turns fall back to Gemini. This is the production kill-switch; restart the worker dyno after flipping it.

```
                                       ┌── topic=hr  ──▶ Agentforce org (Agent API)
   user turn ─▶ classifyTopic() ─▶─────┤
                                       └── topic=general ─▶ Gemini
                                                      ↓
                                              token deltas → Redis Streams → SSE edge → Browser
```

### Deployment view

| Layer         | What                                    | Where                    | Scale unit                                  |
| ------------- | --------------------------------------- | ------------------------ | ------------------------------------------- |
| Client        | React uiBundle                          | Salesforce LWR CDN       | per-user browser                            |
| SFDC platform | Apex broker + triggers + custom objects | Salesforce org           | per-org governor limits                     |
| Edge          | Stateless SSE service (Node 22 or Go)   | Heroku (Fir) / k8s / ECS | horizontal; ~2K active / ~10K idle per dyno |
| Bus           | NATS JetStream / Redis Streams          | Managed cluster          | 3-node quorum min                           |
| Producers     | LLM / chat workers                      | Heroku worker dyno / ASG | horizontal                                  |
| Hot DB        | Postgres or DynamoDB                    | Managed                  | reads+writes scale-out                      |
| Observability | Prometheus + Grafana + Loki             | Shared cluster           | —                                           |

### Security boundaries

- **Browser ↔ Salesforce:** existing LWR session; `@AuraEnabled` gated by `ChatUser` permission set.
- **Browser ↔ External Edge:** JWT Bearer (user-scoped, 5-min TTL) over TLS; CSP Trusted URL allows `connect-src`; CORS allow-list includes the LWR site origin.
- **Salesforce ↔ IdP:** Named Credential + External Credential (client secret server-side only).
- **Edge ↔ Bus ↔ Workers:** mTLS or VPC-internal; JWT re-verified at the edge on every connect.
- **Worker ↔ Agentforce org:** OAuth2 client_credentials against a Connected App in the partner org; secret kept in Heroku config vars only. Run-As integration user has agent-invocation rights but no broader CRM access. Browser tokens are not used here — only the worker holds the partner-org secret.
- **Salesforce custom objects:** with-sharing Apex, FLS enforced, optional Shield encryption on `Content__c`.

### Technology choices summary

| Concern               | Choice                                     | Reason                                          |
| --------------------- | ------------------------------------------ | ----------------------------------------------- |
| UI framework          | React 19 uiBundle (existing)               | Streaming UX; tooling already wired             |
| SSE transport         | `@microsoft/fetch-event-source`            | Custom headers, `Last-Event-ID`, reconnect      |
| State                 | Zustand                                    | Minimal re-renders for token streams            |
| Virtualization        | `@tanstack/react-virtual`                  | Dynamic message heights                         |
| Auth broker           | Apex + Named Credential                    | Client secret never in browser                  |
| Edge                  | Node 22 (Fastify)                          | High conn/dyno, HTTP/2 at router                |
| Bus                   | Redis Streams (Heroku) / NATS JetStream    | Low-latency fan-out                             |
| General LLM           | Google Gemini (`@google/genai`)            | Streaming, structured output for the classifier |
| HR LLM                | Agentforce Agent API (separate SF org)     | Domain-grounded answers, CRM context            |
| Topic router          | keyword prefilter + Gemini fallback        | Cheap on the obvious 90%; one LLM call max      |
| Hot DB                | Postgres (Heroku)                          | OLTP write-heavy; Salesforce is not             |
| Persistence of record | `Chat_Conversation__c` + `Chat_Message__c` | CRM linkage, sharing, audit                     |
| Archive (planned)     | Big Object `Chat_Message_Archive__b`       | Cheap long-term retention — not yet implemented |

## Monorepo layout

```
my-react-project/
├── force-app/main/default/
│   ├── uiBundles/myreactapp/           React 19 + Vite + Tailwind + shadcn chat UI (LWR)
│   │                                   (workspace name: base-react-app — used by `pnpm --filter`)
│   ├── classes/                        ChatTokenBroker, ChatMessageWriter, tests
│   ├── objects/                        Chat_Conversation__c, Chat_Message__c,
│   │                                   Chat_Message_Finalized__e, Chat_Settings__mdt
│   ├── triggers/                       ChatMessageFinalizedTrigger
│   ├── connectedApps/                  SSEEdgeChat — OAuth/JWT-bearer client used by
│   │                                   ChatTokenBroker and the llm-worker Platform Event publisher
│   ├── cspTrustedSites/                Allows browser → Heroku connect-src
│   ├── namedCredentials/ + externalCredentials/   IdP token mint (server-side secret)
│   └── permissionsets/                 ChatUser
├── apps/
│   ├── sse-edge/                       Fastify SSE edge — Heroku web dyno
│   ├── echo-worker/                    Smoke-test worker (echoes user input)
│   └── llm-worker/                     Production worker — topic router + Gemini (general)
│                                       + Agentforce Agent API (HR, separate SF org)
├── packages/
│   └── chat-protocol/                  Shared TS types for the SSE wire envelope
├── .github/workflows/                  CI + deploy lanes (see .github/workflows/README.md)
├── pnpm-workspace.yaml
└── package.json                        Workspace scripts (dev:*, build:*, deploy:edge)
```

`packages/chat-protocol` is the single source of truth for the wire format. Both the React uiBundle and the Heroku apps import from `@chat/protocol` — wire-format drift becomes a compile error, not a 3 a.m. surprise.

`Chat_Settings__mdt` is a Custom Metadata Type that holds runtime configuration (SSE URL, JWT audience) read by `ChatTokenBroker`. The `SSEEdgeChat` Connected App backs both the user-scoped JWTs minted for the browser and the Client-Credentials token used by `llm-worker` to publish `Chat_Message_Finalized__e`.

## Wire envelope

```ts
export type ChatFrame =
  | { id: string; type: "token"; data: { messageId: string; delta: string } }
  | {
      id: string;
      type: "message_complete";
      data: { messageId: string; tokens: number };
    }
  | { id: string; type: "tool_call"; data: { name: string; args: unknown } }
  | { id: string; type: "error"; data: { code: string; message: string } };

export interface SendMessageRequest {
  conversationId: string;
  content: string;
}
export interface SendMessageResponse {
  messageId: string;
}
```

Each frame carries an `id`; the client echoes `Last-Event-ID` on reconnect so the bus replays from the last delivered event. Token frames may be dropped under backpressure; discrete events (`message_complete`, `tool_call`, `error`) never are.

## Getting started

```bash
pnpm install                # from repo root

pnpm dev:ui                 # React uiBundle (Vite dev server)
pnpm dev:edge               # Fastify SSE edge (tsx watch)
pnpm dev:worker:echo        # local echo worker — proves the pipe end-to-end
pnpm dev:worker:llm         # production worker (Gemini + Agentforce HR routing)
```

The edge and workers both expect a Redis on `REDIS_URL` (default `redis://localhost:6379`). The `llm-worker` additionally needs Postgres on `DATABASE_URL`, Salesforce Connected App credentials for the primary org, and (optionally) the five `AGENTFORCE_*` vars to enable HR routing to the partner org. Without those five, every turn falls back to Gemini. See [apps/llm-worker/README.md](apps/llm-worker/README.md) for the full env matrix and the partner-org Connected App setup.

Salesforce metadata is deployed with the standard CLI:

```bash
sf project deploy start -d force-app
```

## Deploying

**Salesforce side.** `sf project deploy start -d force-app` ships Apex, custom objects, triggers, the CSP Trusted Site, and the Named Credential. Experience Builder Trusted URLs are per-site and **not** captured by DX metadata — confirm `connect-src` includes the SSE edge's custom domain after every deploy to a new org/site.

**Heroku side.** `pnpm deploy:edge` builds the SSE edge and the worker into one combined slug and force-pushes it to the `heroku` git remote. The slug's `Procfile` declares both `web` and `worker` process types so they share one Redis add-on. Worker mode (`echo` vs `llm`) is a config-var change, not a redeploy. One-time app/add-on setup and the `WORKER_MODE` switch are documented in [apps/sse-edge/README.md](apps/sse-edge/README.md) and [apps/llm-worker/README.md](apps/llm-worker/README.md).

## Persistence model

- **Hot state — Heroku Postgres.** Recent conversation turns the worker needs for prompt history. All streaming writes land here.
- **System of record — Salesforce.** On `message_complete`, the worker publishes `Chat_Message_Finalized__e`; an Apex trigger upserts `Chat_Message__c` (one row per finalized message, never per token) and rolls `Chat_Conversation__c.Ended_At__c`. CRM linkage, sharing rules, FLS, Shield encryption, audit trail come for free.

This split keeps token-rate writes off the Salesforce platform (governor limits, $/GB) while still making finalized chats reportable and linkable to Contacts/Cases.

## Future implementation

The original architecture plan included pieces that are **not yet shipped**. They make sense and are worth tracking, but no code/metadata exists for them today:

- **Big Object archive `Chat_Message_Archive__b`** — for >90-day retention of finalized messages, offloading older `Chat_Message__c` rows to cheap long-term storage. No metadata file exists in [force-app/main/default/objects/](force-app/main/default/objects/).
- **Tool-call rendering UI** — the wire envelope already supports `tool_call` frames and the Zustand store [stores/chatStore.ts:95](force-app/main/default/uiBundles/myreactapp/src/stores/chatStore.ts#L95) has a comment noting "not handled in MVP store." Renderable tool-call cards (name, args, result) still need to be designed.
- **End-to-end Playwright tests** — referenced in the plan as `tests/e2e/chat.spec.ts` with a local Node SSE mock. No Playwright config or `e2e/` directory exists in the uiBundle yet.
- **k6 + xk6-sse load test** — to validate the 10K-concurrent-stream SLO (p99 first-token < 500 ms, reconnect rate < 0.5%/min). No load-test scripts in the repo.
- **Edge-side rate limiting** — plan calls for "1 open stream/user, 50 sends/min/user" via a Redis token bucket. `MAX_CONN_PER_USER=1` is set in [apps/sse-edge/app.json](apps/sse-edge/app.json) but no enforcement code exists in [apps/sse-edge/src/](apps/sse-edge/src/) yet.
- **Pub/Sub gRPC bridge for Platform Events into the live UI** — design path for relaying selected Salesforce Platform Events (presence, external signals) onto Redis Streams so the browser sees them as normal SSE frames. Not implemented.
- **NATS JetStream as an alternative to Redis Streams** — the architecture diagram shows it as an option for lower-latency fan-out. Current implementation uses Redis Streams only.

## Where to read more

- [apps/sse-edge/README.md](apps/sse-edge/README.md) — Heroku slug layout, deploy script, scaling.
- [apps/echo-worker/README.md](apps/echo-worker/README.md) — local-dev worker, env vars.
- [apps/llm-worker/README.md](apps/llm-worker/README.md) — Gemini + Agentforce HR routing, env vars, partner-org Connected App setup, `WORKER_MODE` and `ROUTE_HR_TO_AGENTFORCE` switches.
- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
