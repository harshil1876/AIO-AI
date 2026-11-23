/**
 * Shared client & server security utilities for AIO AI.
 * Prevents DOM XSS, javascript: URI injection, and malformed slug inputs.
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;',
};

export function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[&<>"'`]/g, (ch) => HTML_ESCAPE_MAP[ch] || ch);
}

/**
 * Strictly validates an external URL to prevent javascript:, data:, or vbscript: XSS.
 * Returns '#' if the URL is invalid or uses a disallowed protocol.
 */
export function safeExternalUrl(input: unknown): string {
  if (typeof input !== 'string') return '#';
  const trimmed = input.trim();
  if (!trimmed) return '#';

  // Allow relative site links safely (no protocol-relative //evil.com)
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
    return '#';
  } catch {
    return '#';
  }
}

export function sanitizeSlug(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

export function sanitizePlainText(input: unknown, maxLength = 2000): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLength);
}
