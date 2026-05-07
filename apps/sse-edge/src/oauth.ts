import type { FastifyPluginAsync } from 'fastify';

// Browser-side PKCE flows can't POST to Salesforce's /services/oauth2/token
// directly (no CORS headers), so the React app POSTs the code+verifier here
// and we forward it server-side. No secrets cross this boundary — the ECA is
// configured with consumer-secret-optional + PKCE required, so the verifier
// is the only credential needed.

interface ExchangeBody {
  code?: unknown;
  code_verifier?: unknown;
  redirect_uri?: unknown;
  client_id?: unknown;
}

const isShortString = (v: unknown, max: number): v is string =>
  typeof v === 'string' && v.length > 0 && v.length <= max;

export const oauthRoute: FastifyPluginAsync = async (app) => {
  const loginUrl = process.env.SF_LOGIN_URL;
  if (!loginUrl) throw new Error('SF_LOGIN_URL is required');

  app.post<{ Body: ExchangeBody }>('/oauth/exchange', async (req, reply) => {
    const { code, code_verifier, redirect_uri, client_id } = req.body ?? {};
    if (
      !isShortString(code, 1024) ||
      !isShortString(code_verifier, 256) ||
      !isShortString(redirect_uri, 512) ||
      !isShortString(client_id, 256)
    ) {
      return reply.code(400).send({ error: 'invalid_request' });
    }

    const upstream = await fetch(`${loginUrl}/services/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        code_verifier,
        redirect_uri,
        client_id,
      }),
    });

    const text = await upstream.text();
    reply
      .code(upstream.status)
      .header('content-type', upstream.headers.get('content-type') ?? 'application/json')
      .send(text);
  });
};
