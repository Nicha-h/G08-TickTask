import type { MiddlewareHandler } from 'hono';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import * as dotenv from 'dotenv';
import { findOrCreateUserByAuth } from '../models/User.model.js';
dotenv.config();

// Neon Auth (Managed Better Auth) signs session JWTs with EdDSA; issuer and audience are the Auth URL's origin
const authUrl = process.env.NEON_AUTH_BASE_URL!;
const authOrigin = new URL(authUrl).origin;
const jwks = createRemoteJWKSet(
  new URL(process.env.NEON_AUTH_JWKS_URL || `${authUrl}/.well-known/jwks.json`),
);

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];

  let payload;
  try {
    ({ payload } = await jwtVerify(token, jwks, { issuer: authOrigin, audience: authOrigin }));
  } catch (err) {
    return c.json({ error: 'Invalid or expired token' }, 403);
  }

  if (!payload.sub || typeof payload.email !== 'string') {
    return c.json({ error: 'Invalid or expired token' }, 403);
  }

  // Controllers keep using the app's numeric UserID
  const userId = await findOrCreateUserByAuth(payload.sub, payload.email);
  c.set('user', { id: userId, email: payload.email });
  await next();
};
