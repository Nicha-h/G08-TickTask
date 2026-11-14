import { useState, useEffect, useCallback } from 'react';
import { RESEND_COOLDOWN_S } from '../util/otp';

const storageKey = (key) => `cooldown:${key}`;

function readEnd(key) {
  try {
    return Number(sessionStorage.getItem(storageKey(key))) || 0;
  } catch {
    return 0;
  }
}

function secondsUntil(end) {
  return Math.max(0, Math.ceil((end - Date.now()) / 1000));
}

// Countdown for "Resend code" buttons. The end time lives in sessionStorage so a refresh can't skip it.
export function useCooldown(key) {
  const [end, setEnd] = useState(() => readEnd(key));
  const [secondsLeft, setSecondsLeft] = useState(() => secondsUntil(end));

  useEffect(() => {
    const stored = readEnd(key);
    setEnd(stored);
    setSecondsLeft(secondsUntil(stored));
  }, [key]);

  useEffect(() => {
    if (secondsUntil(end) === 0) return;
    const id = setInterval(() => {
      const left = secondsUntil(end);
      setSecondsLeft(left);
      if (left === 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [end]);

  const start = useCallback((seconds = RESEND_COOLDOWN_S) => {
    const next = Date.now() + seconds * 1000;
    try {
      sessionStorage.setItem(storageKey(key), String(next));
    } catch {
      // storage blocked; the countdown still runs for this page
    }
    setEnd(next);
    setSecondsLeft(seconds);
  }, [key]);

  const clear = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey(key));
    } catch {
      // nothing to clear
    }
    setEnd(0);
    setSecondsLeft(0);
  }, [key]);

  return { secondsLeft, start, clear };
}
