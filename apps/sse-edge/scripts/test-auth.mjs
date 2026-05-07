#!/usr/bin/env node
// Mints a Salesforce ID token via OAuth Web Server flow + PKCE, then opens an
// SSE connection to the edge with that token. Pure CLI — no React involved.
//
// Usage:
//   node apps/sse-edge/scripts/test-auth.mjs
//
// Reads env (with sane defaults for our org/app):
//   SF_LOGIN_URL    - https://trailsignup-dba79162784e65.my.salesforce.com
//   SF_CLIENT_ID    - Connected App Consumer Key
//   SF_CALLBACK_URL - http://localhost:8765/cb (must be added to the Connected App!)
//   EDGE_URL        - https://sse-edge-prod-6e1ea40ce0ee.herokuapp.com

import http from 'node:http';
import crypto from 'node:crypto';
import { URL } from 'node:url';

const SF_LOGIN_URL    = process.env.SF_LOGIN_URL    ?? 'https://ability-nosoftware-5380.scratch.my.salesforce.com';
const SF_CLIENT_ID    = process.env.SF_CLIENT_ID    ?? '3MVG9LY8n98IRTt1_cmlOv3XnYeLkYArt_3_v3ztyrq89L5oY5X6AkFWLix.uCN3OkPg4rFRRAOeeZv3rPBWQ';
const SF_CALLBACK_URL = process.env.SF_CALLBACK_URL ?? 'http://localhost:8765/cb';
const EDGE_URL        = process.env.EDGE_URL        ?? 'https://sse-edge-prod-6e1ea40ce0ee.herokuapp.com';

const cb = new URL(SF_CALLBACK_URL);
if (cb.hostname !== 'localhost') {
  console.error(`SF_CALLBACK_URL must be http://localhost:* — got ${SF_CALLBACK_URL}`);
  process.exit(1);
}

const verifier  = crypto.randomBytes(32).toString('base64url');
const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');
const state     = crypto.randomBytes(16).toString('base64url');

const authUrl = new URL(`${SF_LOGIN_URL}/services/oauth2/authorize`);
authUrl.searchParams.set('response_type',         'code');
authUrl.searchParams.set('client_id',             SF_CLIENT_ID);
authUrl.searchParams.set('redirect_uri',          SF_CALLBACK_URL);
authUrl.searchParams.set('scope',                 'openid id profile api refresh_token');
authUrl.searchParams.set('state',                 state);
authUrl.searchParams.set('code_challenge',        challenge);
authUrl.searchParams.set('code_challenge_method', 'S256');

console.log('\nOpen this URL in your browser (logged in as the user you want to test):\n');
console.log('  ' + authUrl.toString() + '\n');
console.log(`Waiting for redirect to ${SF_CALLBACK_URL} ...\n`);

const code = await new Promise((resolve, reject) => {
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, `http://${req.headers.host}`);
    // Ignore anything that isn't the real callback (favicon, reloads, etc.)
    if (u.pathname !== cb.pathname || !u.searchParams.has('state')) {
      res.writeHead(404).end();
      return;
    }
    if (u.searchParams.get('state') !== state) {
      // Stale callback from a previous run — log and keep waiting.
      console.warn(`(ignored callback with stale state=${u.searchParams.get('state')})`);
      res.writeHead(400, { 'Content-Type': 'text/plain' }).end(
        'stale state — please re-run the script and use the new URL it prints',
      );
      return;
    }
    const oauthErr = u.searchParams.get('error');
    if (oauthErr) {
      const desc = u.searchParams.get('error_description') ?? oauthErr;
      res.writeHead(400, { 'Content-Type': 'text/plain' }).end(`OAuth error: ${desc}`);
      server.close();
      reject(new Error(`OAuth error: ${desc}`));
      return;
    }
    const c = u.searchParams.get('code');
    if (!c) {
      res.writeHead(400, { 'Content-Type': 'text/plain' }).end('no code in callback');
      server.close();
      reject(new Error('no code in callback'));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' }).end(
      '<h2>Got the code. You can close this tab.</h2>',
    );
    server.close();
    resolve(c);
  });
  server.listen(Number(cb.port), cb.hostname);
});

const tokenRes = await fetch(`${SF_LOGIN_URL}/services/oauth2/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type:    'authorization_code',
    code,
    redirect_uri:  SF_CALLBACK_URL,
    client_id:     SF_CLIENT_ID,
    code_verifier: verifier,
  }),
});
const tokenJson = await tokenRes.json();
if (!tokenRes.ok) {
  console.error('Token exchange failed:', tokenJson);
  process.exit(1);
}
const idToken = tokenJson.id_token;
if (!idToken) {
  console.error('No id_token in response. Did the Connected App enable openid scope?', tokenJson);
  process.exit(1);
}

const [, payloadB64] = idToken.split('.');
const claims = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
console.log('ID token claims (full):');
console.log(JSON.stringify(claims, null, 2));
console.log();

const subMatch = typeof claims.sub === 'string' ? claims.sub.match(/\/([0-9a-zA-Z]{18})$/) : null;
if (!subMatch) {
  console.error('!! sub claim not in expected Salesforce id format — the edge will reject this token.');
  console.error('   Got sub =', claims.sub, '\n');
} else {
  console.log(`Extracted user id from sub: ${subMatch[1]}\n`);
}

console.log(`Opening SSE: ${EDGE_URL}/sse\n`);
const sseRes = await fetch(`${EDGE_URL}/sse`, {
  headers: { Authorization: `Bearer ${idToken}`, Accept: 'text/event-stream' },
});
console.log(`HTTP ${sseRes.status} ${sseRes.statusText}`);
sseRes.headers.forEach((v, k) => console.log(`${k}: ${v}`));
if (sseRes.status !== 200) {
  console.error('\nSSE handshake failed.');
  console.error(await sseRes.text());
  process.exit(1);
}
console.log('\nSSE stream open. Reading 10s of events...\n');
const reader = sseRes.body.getReader();
const decoder = new TextDecoder();
const stop = setTimeout(() => reader.cancel(), 10_000);
try {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    process.stdout.write(decoder.decode(value, { stream: true }));
  }
} finally {
  clearTimeout(stop);
}
console.log('\n\nDone.');
