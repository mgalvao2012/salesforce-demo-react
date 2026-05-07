/**
 * Publishes Chat_Message_Finalized__e Platform Events to Salesforce so the
 * Apex trigger persists Chat_Message__c. Uses OAuth client_credentials flow
 * against the same Connected App that mints user JWTs (the app must have
 * "Enable Client Credentials Flow" enabled in Setup).
 */

const loginUrl = process.env.SF_LOGIN_URL;
const clientId = process.env.SF_CLIENT_ID;
const clientSecret = process.env.SF_CLIENT_SECRET;

if (!loginUrl) throw new Error('SF_LOGIN_URL is required');
if (!clientId) throw new Error('SF_CLIENT_ID is required');
if (!clientSecret) throw new Error('SF_CLIENT_SECRET is required');

const API_VERSION = process.env.SF_API_VERSION ?? 'v66.0';

interface AccessToken {
  token: string;
  instanceUrl: string;
  exp: number;
}

let cached: AccessToken | null = null;
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
    throw new Error(`SFDC token mint failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as {
    access_token: string;
    instance_url: string;
    issued_at: string;
  };
  // Salesforce client_credentials tokens are good for the org's session timeout
  // (typically hours). We refresh hourly to be safe.
  const exp = Math.floor(Date.now() / 1000) + 60 * 60;
  return { token: json.access_token, instanceUrl: json.instance_url, exp };
}

async function getToken(forceRefresh = false): Promise<AccessToken> {
  const now = Math.floor(Date.now() / 1000);
  if (!forceRefresh && cached && cached.exp - now > REFRESH_BUFFER_SECONDS) {
    return cached;
  }
  cached = await mintToken();
  return cached;
}

export interface FinalizedMessage {
  conversationExternalId: string;
  messageExternalId: string;
  userId: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  tokenCount: number;
  createdAt: Date;
}

/**
 * Publishes a Chat_Message_Finalized__e record. Returns the platform event id.
 * Retries once on 401 by refreshing the token (handles session expiry).
 */
export async function publishFinalizedMessage(msg: FinalizedMessage): Promise<string> {
  const body = {
    Conversation_External_Id__c: msg.conversationExternalId,
    Message_External_Id__c: msg.messageExternalId,
    User_Id__c: msg.userId,
    Role__c: msg.role,
    Content__c: msg.content,
    Token_Count__c: msg.tokenCount,
    Created_At__c: msg.createdAt.toISOString(),
  };

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const tok = await getToken(attempt === 1);
    const res = await fetch(
      `${tok.instanceUrl}/services/data/${API_VERSION}/sobjects/Chat_Message_Finalized__e/`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tok.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    if (res.status === 401 && attempt === 0) continue;
    if (!res.ok) {
      throw new Error(`platform event publish failed: ${res.status} ${await res.text()}`);
    }
    const json = (await res.json()) as { id: string };
    return json.id;
  }
  throw new Error('platform event publish failed after refresh');
}
