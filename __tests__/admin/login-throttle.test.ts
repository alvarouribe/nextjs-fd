import {
  LOGIN_ATTEMPT_WINDOW_MS,
  MAX_FAILED_LOGIN_ATTEMPTS,
  clearFailedLogins,
  isLoginThrottled,
  registerFailedLogin,
  resetLoginThrottle,
} from '../../src/app/utils/login-throttle';

const NOW = 1_700_000_000_000;

describe('login-throttle', () => {
  beforeEach(() => {
    resetLoginThrottle();
  });

  it('allows attempts below the limit', () => {
    for (let i = 0; i < MAX_FAILED_LOGIN_ATTEMPTS - 1; i += 1) {
      registerFailedLogin('1.1.1.1', NOW);
    }

    expect(isLoginThrottled('1.1.1.1', NOW)).toBe(false);
  });

  it('throttles once the limit is reached', () => {
    for (let i = 0; i < MAX_FAILED_LOGIN_ATTEMPTS; i += 1) {
      registerFailedLogin('1.1.1.1', NOW);
    }

    expect(isLoginThrottled('1.1.1.1', NOW)).toBe(true);
  });

  it('tracks each key independently', () => {
    for (let i = 0; i < MAX_FAILED_LOGIN_ATTEMPTS; i += 1) {
      registerFailedLogin('1.1.1.1', NOW);
    }

    expect(isLoginThrottled('2.2.2.2', NOW)).toBe(false);
  });

  it('forgets attempts older than the window', () => {
    for (let i = 0; i < MAX_FAILED_LOGIN_ATTEMPTS; i += 1) {
      registerFailedLogin('1.1.1.1', NOW);
    }

    expect(isLoginThrottled('1.1.1.1', NOW + LOGIN_ATTEMPT_WINDOW_MS + 1)).toBe(false);
  });

  it('clears attempts after a successful login', () => {
    for (let i = 0; i < MAX_FAILED_LOGIN_ATTEMPTS; i += 1) {
      registerFailedLogin('1.1.1.1', NOW);
    }
    clearFailedLogins('1.1.1.1');

    expect(isLoginThrottled('1.1.1.1', NOW)).toBe(false);
  });
});
