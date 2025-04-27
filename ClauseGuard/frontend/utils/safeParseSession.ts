// utils/safeParseSession.ts

/**
 * Safely parse a session or cookie value that may be JSON, base64-encoded JSON, or JWT.
 * Returns the parsed object or null if parsing fails.
 */
export function safeParseSession(cookieValue: string): any | null {
  if (!cookieValue) return null;
  try {
    // Try plain JSON first
    return JSON.parse(cookieValue);
  } catch {
    // Try base64 (plain or JWT payload)
    try {
      // JWT: header.payload.signature
      if (cookieValue.split('.').length === 3) {
        const payload = cookieValue.split('.')[1];
        // Pad base64 if needed
        const pad = payload.length % 4;
        const base64 = pad ? payload + '='.repeat(4 - pad) : payload;
        const decoded = Buffer.from(base64, 'base64').toString('utf-8');
        return JSON.parse(decoded);
      }
      // Otherwise, treat as base64-encoded JSON
      const pad = cookieValue.length % 4;
      const base64 = pad ? cookieValue + '='.repeat(4 - pad) : cookieValue;
      const decoded = Buffer.from(base64, 'base64').toString('utf-8');
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}
