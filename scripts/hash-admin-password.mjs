#!/usr/bin/env node
/**
 * Generates the `ADMIN_PASSWORD_HASH` value read by
 * `src/app/utils/admin-credentials.ts`.
 *
 *   pnpm admin:hash                 # prompts, then Ctrl-D
 *   pass show admin | pnpm admin:hash   # or pipe it in
 *
 * Avoid passing the password as an argument — it would land in shell history.
 */
import { randomBytes, scrypt } from 'node:crypto';

// Raising these stays backwards compatible: the parameters are stored inside
// the hash, so existing values keep verifying with the cost they were made at.
const N = 16384;
const R = 8;
const P = 1;
const KEY_LENGTH = 64;
const SALT_BYTES = 16;

const readStdin = async () => {
  if (process.stdin.isTTY) {
    process.stderr.write('Password (then press Ctrl-D): ');
  }

  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);

  return Buffer.concat(chunks)
    .toString('utf8')
    .replace(/\r?\n$/, '');
};

const password = await readStdin();

if (!password) {
  process.stderr.write('\nNo password supplied — nothing to hash.\n');
  process.exit(1);
}

const salt = randomBytes(SALT_BYTES);
const key = await new Promise((resolve, reject) => {
  scrypt(password, salt, KEY_LENGTH, { N, r: R, p: P }, (error, derivedKey) =>
    error ? reject(error) : resolve(derivedKey)
  );
});

const hash = ['scrypt', N, R, P, salt.toString('base64'), key.toString('base64')].join(':');

process.stderr.write('\nAdd this to .env.local and to your Vercel env:\n\n');
process.stdout.write(`ADMIN_PASSWORD_HASH=${hash}\n`);
