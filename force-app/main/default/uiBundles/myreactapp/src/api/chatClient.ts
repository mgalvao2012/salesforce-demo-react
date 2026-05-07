import { createDataSDK } from '@salesforce/sdk-data';
import type { ChatToken, SendMessageRequest, SendMessageResponse } from '@chat/protocol';
import { executeGraphQL } from './graphqlClient';
import type { ChatMessage, Role } from '../stores/chatStore';

interface CachedToken {
  token: string;
  sseUrl: string;
  exp: number;
}

let cached: CachedToken | null = null;
const REFRESH_BUFFER_SECONDS = 60;

/**
 * Mints an SSE token via the Apex REST broker (`/services/apexrest/chat/mintToken`).
 *
 * The Salesforce SDK's `data.fetch` already carries the user's session cookie,
 * so no OAuth handshake is needed. This works in every Salesforce surface —
 * standalone LWR, embedded LWC, Flow screens — because we never navigate the
 * browser to a Salesforce login page (which would be blocked by
 * `frame-ancestors 'none'` in iframe contexts).
 */
async function callBroker(): Promise<ChatToken> {
  const sdk = await createDataSDK();
  if (!sdk.fetch) throw new Error('DataSDK.fetch is unavailable in this surface');
  const res = await sdk.fetch('/services/apexrest/chat/mintToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Token broker returned ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as ChatToken;
}

export async function getSseToken(forceRefresh = false): Promise<CachedToken> {
  const now = Math.floor(Date.now() / 1000);
  if (!forceRefresh && cached && cached.exp - now > REFRESH_BUFFER_SECONDS) {
    return cached;
  }
  const fresh = await callBroker();
  cached = { token: fresh.token, sseUrl: fresh.sseUrl, exp: fresh.exp };
  return cached;
}

export function clearTokenCache(): void {
  cached = null;
}

/* ----------------------------- Conversation list -------------------------- */

const CONVERSATION_LIST_QUERY = /* GraphQL */ `
  query ListRecentConversations($limit: Int!) {
    uiapi {
      query {
        Chat_Conversation__c(
          orderBy: { Started_At__c: { order: DESC, nulls: LAST } }
          first: $limit
        ) {
          edges {
            node {
              Id
              External_Id__c { value }
              Title__c { value }
              Started_At__c { value }
              Ended_At__c { value }
              Status__c { value }
            }
          }
        }
      }
    }
  }
`;

interface ConversationListResult {
  uiapi: {
    query: {
      Chat_Conversation__c: {
        edges: Array<{ node: ConversationListNode }>;
      };
    };
  };
}

interface ConversationListNode {
  Id: string;
  External_Id__c: ScalarString;
  Title__c: ScalarString | null;
  Started_At__c: ScalarString | null;
  Ended_At__c: ScalarString | null;
  Status__c: ScalarString | null;
}

export interface ConversationSummary {
  externalId: string;
  title: string;
  startedAt: number | null;
  endedAt: number | null;
  status: string | null;
}

const fallbackTitle = (startedAt: number | null): string => {
  if (startedAt === null) return 'Untitled conversation';
  return new Date(startedAt).toLocaleString();
};

export function mapConversationListNode(node: ConversationListNode): ConversationSummary | null {
  const externalId = node.External_Id__c?.value;
  if (!externalId) return null;
  const startedAt = node.Started_At__c?.value ? new Date(node.Started_At__c.value).getTime() : null;
  const endedAt = node.Ended_At__c?.value ? new Date(node.Ended_At__c.value).getTime() : null;
  return {
    externalId,
    title: node.Title__c?.value || fallbackTitle(startedAt),
    startedAt,
    endedAt,
    status: node.Status__c?.value ?? null,
  };
}

export async function loadConversationList(limit = 30): Promise<ConversationSummary[]> {
  const data = await executeGraphQL<ConversationListResult, { limit: number }>(
    CONVERSATION_LIST_QUERY,
    { limit },
  );
  return (data.uiapi.query.Chat_Conversation__c.edges ?? [])
    .map(({ node }) => mapConversationListNode(node))
    .filter((c): c is ConversationSummary => c !== null);
}

/* ----------------------------- History loader ----------------------------- */

const HISTORY_QUERY = /* GraphQL */ `
  query LoadRecentConversation($externalId: String!) {
    uiapi {
      query {
        Chat_Conversation__c(
          where: { External_Id__c: { eq: $externalId } }
          first: 1
        ) {
          edges {
            node {
              Id
              External_Id__c { value }
              Title__c { value }
              Started_At__c { value }
              Ended_At__c { value }
              Status__c { value }
              Chat_Messages__r(orderBy: { Created_At__c: { order: ASC } }, first: 200) {
                edges {
                  node {
                    Id
                    External_Id__c { value }
                    Role__c { value }
                    Content__c { value }
                    Created_At__c { value }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface ScalarString {
  value: string | null;
}

interface ConversationNode {
  Id: string;
  External_Id__c: ScalarString;
  Title__c: ScalarString | null;
  Started_At__c: ScalarString;
  Ended_At__c: ScalarString | null;
  Status__c: ScalarString;
  Chat_Messages__r?: {
    edges: Array<{ node: MessageNode }>;
  } | null;
}

interface MessageNode {
  Id: string;
  External_Id__c: ScalarString;
  Role__c: ScalarString;
  Content__c: ScalarString | null;
  Created_At__c: ScalarString;
}

interface HistoryQueryResult {
  uiapi: {
    query: {
      Chat_Conversation__c: {
        edges: Array<{ node: ConversationNode }>;
      };
    };
  };
}

const ROLES: ReadonlySet<Role> = new Set(['user', 'assistant', 'system', 'tool']);

export function mapMessageNodeToChatMessage(node: MessageNode): ChatMessage | null {
  const externalId = node.External_Id__c?.value;
  const role = node.Role__c?.value;
  const createdAt = node.Created_At__c?.value;
  if (!externalId || !role || !createdAt) return null;
  if (!ROLES.has(role as Role)) return null;
  return {
    id: externalId,
    role: role as Role,
    content: node.Content__c?.value ?? '',
    status: 'final',
    createdAt: new Date(createdAt).getTime(),
  };
}

export interface ConversationHistory {
  messages: ChatMessage[];
}

/**
 * Loads a single conversation (by External_Id__c) and its messages from
 * Salesforce. Returns an empty history if the conversation hasn't been
 * persisted yet (first-time chat).
 */
export async function loadRecentConversation(externalId: string): Promise<ConversationHistory> {
  const data = await executeGraphQL<HistoryQueryResult, { externalId: string }>(HISTORY_QUERY, {
    externalId,
  });
  const conv = data.uiapi.query.Chat_Conversation__c.edges[0]?.node;
  if (!conv) return { messages: [] };

  const messages = (conv.Chat_Messages__r?.edges ?? [])
    .map(({ node }) => mapMessageNodeToChatMessage(node))
    .filter((m): m is ChatMessage => m !== null);

  return { messages };
}

/* ------------------------------- Send message ----------------------------- */

export async function sendMessage(
  sseUrl: string,
  token: string,
  req: SendMessageRequest,
): Promise<SendMessageResponse> {
  const origin = new URL(sseUrl).origin;
  const res = await fetch(`${origin}/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    throw new Error(`send failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as SendMessageResponse;
}
