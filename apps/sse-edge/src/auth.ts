import type { FastifyRequest } from 'fastify';

const sfLoginUrl = process.env.SF_LOGIN_URL;
if (!sfLoginUrl) throw new Error('SF_LOGIN_URL is required');

export interface ChatClaims {
  sfdc_user_id: string;
  sub: string;
}

interface CacheEntry {
  claims: ChatClaims;
  expiresAt: number;
}

const CACHE_TTL_MS = 60_000;
const cache = new Map<string, CacheEntry>();

const SFDC_USER_ID_RE = /\/([0-9a-zA-Z]{18})$/;

/**
 * Validates a Salesforce access token by calling /services/oauth2/userinfo.
 * On success, returns the SF user ID extracted from the `sub` URL.
 *
 * The `sub` claim from userinfo looks like:
 *   https://login.salesforce.com/id/<orgId>/<userId>
 * where userId is the 18-char Salesforce ID.
 *
 * Tokens are cached for 60s to avoid round-tripping Salesforce on every
 * inbound HTTP request — long-lived SSE connections only verify once anyway,
 * but POST /send also calls this and benefits from the cache.
 */
export async function verifyJwt(token: string): Promise<ChatClaims> {
  const now = Date.now();
  const cached = cache.get(token);
  if (cached && cached.expiresAt > now) {
    return cached.claims;
  }

  const res = await fetch(`${sfLoginUrl}/services/oauth2/userinfo`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`userinfo returned ${res.status}: ${await res.text()}`);
  }
  const body = (await res.json()) as { sub?: string; user_id?: string };
  const sub = body.sub;
  if (typeof sub !== 'string') throw new Error('userinfo missing sub claim');

  const match = sub.match(SFDC_USER_ID_RE);
  const userId = body.user_id ?? match?.[1];
  if (!userId) {
    throw new Error(`userinfo sub not in expected format: ${sub}`);
  }

  const claims: ChatClaims = { sfdc_user_id: userId, sub };
  cache.set(token, { claims, expiresAt: now + CACHE_TTL_MS });

  // Lazy cache pruning: when the map gets large, drop expired entries.
  if (cache.size > 1024) {
    for (const [k, v] of cache) {
      if (v.expiresAt <= now) cache.delete(k);
    }
  }

  return claims;
}

export function bearerFromReq(req: FastifyRequest): string {
  const h = req.headers['authorization'];
  if (typeof h !== 'string') throw new Error('missing authorization header');
  const [scheme, token] = h.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    throw new Error('expected Bearer token');
  }
  return token;
}
