import 'server-only';

export const MAX_FAILED_LOGIN_ATTEMPTS = 5;
export const LOGIN_ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

/**
 * Best-effort, in-memory brute-force brake for the admin login. It lives in the
 * function instance's memory, so it is not shared across serverless instances —
 * it slows an attacker down, it does not lock them out. Move this to a shared
 * store (Redis/Upstash) if the admin area ever holds anything sensitive.
 */
const failedAttempts = new Map<string, number[]>();

const recentAttempts = (key: string, nowMs: number): number[] =>
  (failedAttempts.get(key) ?? []).filter(
    timestamp => nowMs - timestamp < LOGIN_ATTEMPT_WINDOW_MS
  );

export const isLoginThrottled = (
  key: string,
  nowMs: number = Date.now()
): boolean => recentAttempts(key, nowMs).length >= MAX_FAILED_LOGIN_ATTEMPTS;

export const registerFailedLogin = (
  key: string,
  nowMs: number = Date.now()
): void => {
  failedAttempts.set(key, [...recentAttempts(key, nowMs), nowMs]);
};

export const clearFailedLogins = (key: string): void => {
  failedAttempts.delete(key);
};

/** Test helper — resets the module-level attempt log. */
export const resetLoginThrottle = (): void => {
  failedAttempts.clear();
};
