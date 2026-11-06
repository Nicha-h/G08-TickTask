import { useEffect, useRef } from 'react';
import { createRealtimeClient } from '@neon/realtime/client';
import { apiClient } from '../util/apiClient';

// Sealed queries last ~60s; renew this long before they expire, retrying failed fetches every second
const RENEW_EARLY_MS = 10_000;
const RETRY_MS = 1_000;

// One Realtime client per page load: every subscription shares its WebSocket
let client;
function getClient() {
  client ??= createRealtimeClient({ url: import.meta.env.VITE_NEON_REALTIME_URL });
  return client;
}

async function fetchSealed(feed) {
  const { data } = await apiClient.post(`/api/live/${feed}`);
  return data;
}

function isSignedOut(err) {
  const status = err?.response?.status;
  return status === 401 || status === 403;
}

/**
 * Calls `onChange` whenever the signed-in user's rows behind `feed` ('tasks' or 'pomodoro')
 * change in Postgres, from this tab or any other device. Pages keep their own fetch logic and
 * simply refetch in `onChange`.
 */
export function useLiveSync(feed, onChange) {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    let cancelled = false;
    let subscription;
    let timer;
    let lastRows;

    function scheduleRenew(expiresAt) {
      clearTimeout(timer);
      timer = setTimeout(renew, Math.max(0, expiresAt - Date.now() - RENEW_EARLY_MS));
    }

    async function renew() {
      let next;
      try {
        next = await fetchSealed(feed);
      } catch (err) {
        if (!cancelled && !isSignedOut(err)) timer = setTimeout(renew, RETRY_MS);
        return;
      }
      if (cancelled) return;
      scheduleRenew(next.expiresAt);
      // A rejected renewal means the subscription already failed; stop renewing it
      subscription.renew(next).catch(() => clearTimeout(timer));
    }

    fetchSealed(feed)
      .then((sealed) => {
        if (cancelled) return;
        subscription = getClient().subscribe(sealed);
        subscription.onChange((snapshot) => {
          if (snapshot.status === 'error') {
            console.error(`[live:${feed}] stopped:`, snapshot.error?.message);
            return;
          }
          if (snapshot.status !== 'live' || snapshot.data === undefined) return;

          // Realtime may resend an unchanged result; only refetch when the rows really differ
          const rows = JSON.stringify(snapshot.data);
          if (lastRows !== undefined && rows !== lastRows) onChangeRef.current();
          lastRows = rows;
        });
        scheduleRenew(sealed.expiresAt);
      })
      .catch((err) => {
        if (!isSignedOut(err)) console.error(`[live:${feed}] could not subscribe:`, err);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      subscription?.unsubscribe();
    };
  }, [feed]);
}
