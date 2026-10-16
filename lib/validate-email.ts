/**
 * Pragmatic client-side email check. It catches typos, not deliverability;
 * the real backend should validate again.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type EmailCheck = { ok: true; value: string } | { ok: false; error: string };

export function validateEmail(raw: string): EmailCheck {
  const value = raw.trim();
  if (!value) return { ok: false, error: "Enter your email address." };
  if (value.length > 254) return { ok: false, error: "That email address is too long." };
  if (!EMAIL_RE.test(value)) {
    return { ok: false, error: "That doesn't look like an email address. Check for typos." };
  }
  return { ok: true, value };
}
