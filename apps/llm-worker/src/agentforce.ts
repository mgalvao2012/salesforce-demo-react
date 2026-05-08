/**
 * Agentforce Agent API client. Used when the topic router decides a turn
 * should be answered by an Agentforce agent in a separate Salesforce org.
 *
 * Auth: OAuth2 client_credentials against the Agentforce org's Connected App.
 * Cached separately from sfdc.ts so a 401 in one org never invalidates the
 * other org's token.
 *
 * Sessions are cached per conversationId (in-memory) so multi-turn HR threads
 * keep agent context. On session-expiry (401/404/410), the session is re-created
 * and the user turn is replayed once.
 */

import type { StreamCallbacks, StreamResult } from './llm.js';

const loginUrl = process.env.AGENTFORCE_LOGIN_URL;
const instanceUrl = process.env.AGENTFORCE_INSTANCE_URL;
const clientId = process.env.AGENTFORCE_CLIENT_ID;
const clientSecret = process.env.AGENTFORCE_CLIENT_SECRET;
const agentId = process.env.AGENTFORCE_AGENT_ID;

export const isConfigured = (): boolean =>
  Boolean(loginUrl && instanceUrl && clientId && clientSecret && agentId);

function requireConfigured(): void {
  if (!isConfigured()) {
    throw new Error(
      'Agentforce is not configured: set AGENTFORCE_LOGIN_URL, AGENTFORCE_INSTANCE_URL, AGENTFORCE_CLIENT_ID, AGENTFORCE_CLIENT_SECRET, AGENTFORCE_AGENT_ID',
    );
  }
}

interface AccessToken {
  token: string;
  exp: number;
}

let cachedToken: AccessToken | null = null;
const REFRESH_BUFFER_SECONDS = 60;

async function mintToken(): Promise<AccessToken> {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId!,
    client_secret: clientSecret!,
  });
  const res = await fetch(`${loginUrl}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) {
    throw new Error(`Agentforce token mint failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token: string };
  const exp = Math.floor(Date.now() / 1000) + 60 * 60;
  return { token: json.access_token, exp };
}

async function getToken(forceRefresh = false): Promise<AccessToken> {
  const now = Math.floor(Date.now() / 1000);
  if (!forceRefresh && cachedToken && cachedToken.exp - now > REFRESH_BUFFER_SECONDS) {
    return cachedToken;
  }
  cachedToken = await mintToken();
  return cachedToken;
}

interface SessionEntry {
  sessionId: string;
  sequenceId: number;
  expiresAt: number;
}

const SESSION_TTL_MS = 25 * 60 * 1000;
const sessions = new Map<string, SessionEntry>();

function endpointHost(): string {
  return new URL(loginUrl!).host;
}

async function startSession(): Promise<string> {
  const tok = await getToken();
  const externalSessionKey =
    typeof globalThis.crypto?.randomUUID === 'function'
      ? globalThis.crypto.randomUUID()
      : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const res = await fetch(
    `${instanceUrl}/einstein/ai-agent/v1/agents/${encodeURIComponent(agentId!)}/sessions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tok.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        externalSessionKey,
        instanceConfig: { endpoint: endpointHost() },
        streamingCapabilities: { chunkTypes: ['Text'] },
        bypassUser: true,
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`Agentforce session start failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { sessionId: string };
  return json.sessionId;
}

async function getOrCreateSession(conversationId: string): Promise<SessionEntry> {
  const now = Date.now();
  const existing = sessions.get(conversationId);
  if (existing && existing.expiresAt > now) return existing;
  const sessionId = await startSession();
  const entry: SessionEntry = {
    sessionId,
    sequenceId: 0,
    expiresAt: now + SESSION_TTL_MS,
  };
  sessions.set(conversationId, entry);
  return entry;
}

function dropSession(conversationId: string): void {
  sessions.delete(conversationId);
}

interface SseFrame {
  event: string;
  data: string;
}

async function* parseSse(body: ReadableStream<Uint8Array>, signal: AbortSignal): AsyncGenerator<SseFrame> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    while (!signal.aborted) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let idx: number;
      while ((idx = buffer.indexOf('\n\n')) !== -1) {
        const raw = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        let event = 'message';
        const dataLines: string[] = [];
        for (const line of raw.split('\n')) {
          if (line.startsWith(':')) continue;
          if (line.startsWith('event:')) event = line.slice(6).trim();
          else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
        }
        if (dataLines.length > 0) yield { event, data: dataLines.join('\n') };
      }
    }
  } finally {
    try {
      await reader.cancel();
    } catch {
      // best-effort
    }
  }
}

/**
 * Pulls the user-visible text delta out of an Agentforce SSE frame. The wire
 * format varies across Agent API versions and event types — we accept the
 * common shapes (`message.message`, `message.text`, `text`, `delta`).
 */
function extractDelta(event: string, data: string): string | null {
  const upper = event.toUpperCase();
  if (upper === 'PING' || upper === 'END_OF_TURN' || upper === 'PROGRESS_INDICATOR') return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null) return null;
  const obj = parsed as Record<string, unknown>;
  const msg = obj['message'];
  if (typeof msg === 'string') return msg;
  if (typeof msg === 'object' && msg !== null) {
    const inner = msg as Record<string, unknown>;
    if (typeof inner['message'] === 'string') return inner['message'] as string;
    if (typeof inner['text'] === 'string') return inner['text'] as string;
  }
  if (typeof obj['text'] === 'string') return obj['text'] as string;
  if (typeof obj['delta'] === 'string') return obj['delta'] as string;
  return null;
}

export interface AgentforceArgs {
  conversationId: string;
  userMessage: string;
}

/**
 * Streams an Agentforce reply for the given user message on a per-conversation
 * session. Each text chunk fires `onDelta`. Returns the full assembled text
 * and a token-count proxy (chunk count) since the Agent API doesn't expose a
 * usage field on the wire today.
 *
 * Retries once on 401/404/410 by refreshing the token and re-creating the
 * session, then replaying the same user message.
 */
export async function streamChat(
  args: AgentforceArgs,
  callbacks: StreamCallbacks,
  signal: AbortSignal,
): Promise<StreamResult> {
  requireConfigured();

  let assistantText = '';
  let chunkCount = 0;
  let lastErr: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    if (signal.aborted) break;

    const session = await getOrCreateSession(args.conversationId);
    session.sequenceId += 1;
    const tok = await getToken(attempt === 1);

    const res = await fetch(
      `${instanceUrl}/einstein/ai-agent/v1/sessions/${encodeURIComponent(session.sessionId)}/messages/stream`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tok.token}`,
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          message: {
            sequenceId: session.sequenceId,
            type: 'Text',
            text: args.userMessage,
          },
          variables: [],
        }),
        signal,
      },
    );

    if (res.status === 401 || res.status === 404 || res.status === 410) {
      dropSession(args.conversationId);
      lastErr = new Error(`Agentforce stream rejected: ${res.status}`);
      if (attempt === 0) continue;
      throw lastErr;
    }
    if (!res.ok || !res.body) {
      throw new Error(`Agentforce stream failed: ${res.status} ${await res.text()}`);
    }

    for await (const frame of parseSse(res.body, signal)) {
      const delta = extractDelta(frame.event, frame.data);
      if (delta) {
        assistantText += delta;
        chunkCount += 1;
        await callbacks.onDelta(delta);
      }
    }
    return { text: assistantText, tokens: chunkCount };
  }

  throw lastErr ?? new Error('Agentforce stream failed');
}
