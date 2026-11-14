import { z } from 'zod';

// Neon Auth rate-limits code emails to 3 a minute, so match that in the UI
export const RESEND_COOLDOWN_S = 60;
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 128;

// Trim and lowercase so "A@x.com " and "a@x.com" request and use the same code
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email('Please enter a valid email'));

export const codeSchema = z.string().regex(/^\d{6}$/, 'Enter the 6-digit code from your email');

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN, `Your password needs to be at least ${PASSWORD_MIN} characters.`)
  .max(PASSWORD_MAX, `Your password can't be longer than ${PASSWORD_MAX} characters.`);

// Paste-friendly: "123 456" or "123-456" becomes "123456"
export const digitsOnly = (value) => value.replace(/\D/g, '').slice(0, 6);

// Neon's SDK rewrites Better Auth error codes (e.g. INVALID_OTP becomes "validation_failed") but keeps
// Better Auth's message, so match on either
const ERROR_MESSAGES = {
  INVALID_OTP: 'Invalid OTP',
  OTP_EXPIRED: 'OTP expired',
  TOO_MANY_ATTEMPTS: 'Too many attempts',
  PASSWORD_TOO_SHORT: 'Password too short',
  PASSWORD_TOO_LONG: 'Password too long',
};
const NEON_CODES = {
  EMAIL_NOT_VERIFIED: 'email_not_confirmed',
  USER_ALREADY_EXISTS: 'user_already_exists',
};

// True when a Neon Auth error is the given Better Auth error code
export function isAuthError(error, code) {
  if (!error) return false;
  if (error.code === code || (NEON_CODES[code] && error.code === NEON_CODES[code])) return true;
  return Boolean(ERROR_MESSAGES[code]) && error.message?.toLowerCase() === ERROR_MESSAGES[code].toLowerCase();
}

// Turns a Neon Auth error from a code step into a message for the user.
// needsNewCode means the current code can never work, so the user has to request another one.
export function otpErrorMessage(error) {
  if (isAuthError(error, 'INVALID_OTP')) {
    return { message: "That code isn't right. Check the latest email and try again.", needsNewCode: false };
  }
  if (isAuthError(error, 'OTP_EXPIRED')) {
    return { message: 'This code has expired.', needsNewCode: true };
  }
  if (isAuthError(error, 'TOO_MANY_ATTEMPTS')) {
    return { message: 'Too many wrong tries. This code no longer works.', needsNewCode: true };
  }
  if (isAuthError(error, 'PASSWORD_TOO_SHORT')) {
    return { message: `Your password needs to be at least ${PASSWORD_MIN} characters.`, needsNewCode: false };
  }
  if (isAuthError(error, 'PASSWORD_TOO_LONG')) {
    return { message: `Your password can't be longer than ${PASSWORD_MAX} characters.`, needsNewCode: false };
  }
  if (error?.code === 'weak_password') {
    return { message: `Your password needs to be ${PASSWORD_MIN} to ${PASSWORD_MAX} characters.`, needsNewCode: false };
  }
  if (error?.status === 429) {
    return { message: 'Too many requests. Please wait a minute and try again.', needsNewCode: false };
  }
  return { message: 'Something went wrong. Please try again.', needsNewCode: false };
}

// The email being reset or verified is kept in sessionStorage (this tab only), never in the URL
export const pendingEmail = {
  get(kind) {
    try {
      return sessionStorage.getItem(`${kind}Email`) ?? '';
    } catch {
      return '';
    }
  },
  set(kind, email) {
    try {
      sessionStorage.setItem(`${kind}Email`, email);
    } catch {
      // storage blocked; the page still works through router state
    }
  },
  clear(kind) {
    try {
      sessionStorage.removeItem(`${kind}Email`);
    } catch {
      // nothing to clear
    }
  },
};
