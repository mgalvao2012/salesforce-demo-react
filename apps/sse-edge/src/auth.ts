import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import type { FastifyRequest } from 'fastify';

const jwksUrl = process.env.JWT_JWKS_URL;
if (!jwksUrl) throw new Error('JWT_JWKS_URL is required');

const JWKS = createRemoteJWKSet(new URL(jwksUrl));

export type ChatClaims = JWTPayload & { sfdc_user_id: string };

export async function verifyJwt(token: string): Promise<ChatClaims> {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  });
  if (typeof payload.sfdc_user_id !== 'string' || payload.sfdc_user_id.length === 0) {
    throw new Error('missing sfdc_user_id claim');
  }
  return payload as ChatClaims;
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
