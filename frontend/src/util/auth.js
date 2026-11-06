import { createAuthClient } from '@neon/auth';

// Neon Auth (Managed Better Auth). The browser talks to it directly; our API only sees the JWT it issues.
export const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL);

// Auth calls either resolve to { data, error } or throw an AuthApiError (message, status, code); treat both alike
export async function authResult(call) {
  try {
    return await call;
  } catch (err) {
    if (err?.status === undefined) throw err;
    return { data: null, error: { message: err.message, status: err.status, code: err.code } };
  }
}

// Neon Auth JWTs expire after ~15 minutes, so refresh one shortly before that
const REFRESH_EARLY_MS = 60_000;
let pendingToken = null;

function expiresAt(token) {
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return exp * 1000;
  } catch {
    return 0;
  }
}

// Returns a valid JWT for the signed-in user, or null when signed out.
// The current JWT is kept under localStorage 'token', which the pages already use to check for a signed-in user.
export async function getAuthToken() {
  const stored = localStorage.getItem('token');
  if (stored && expiresAt(stored) - Date.now() > REFRESH_EARLY_MS) {
    return stored;
  }

  pendingToken ??= authClient
    .token()
    .then(({ data }) => {
      const token = data?.token ?? null;
      if (token) localStorage.setItem('token', token);
      else localStorage.removeItem('token');
      return token;
    })
    .catch(() => null)
    .finally(() => {
      pendingToken = null;
    });

  return pendingToken;
}

// After sign-in or sign-up: store the JWT and the app's numeric user id (some API routes take it in the path)
export async function completeSignIn(apiClient) {
  localStorage.removeItem('token');
  const token = await getAuthToken();
  if (!token) {
    throw new Error('Signed in, but no Neon Auth token was issued.');
  }

  const { data: profile } = await apiClient.get('/api/users/profile');
  localStorage.setItem('userId', profile.UserID);
}

export async function signOut() {
  try {
    await authClient.signOut();
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
