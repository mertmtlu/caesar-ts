/**
 * Generate a UUID v4 compatible ID
 * Falls back to a custom implementation if crypto.randomUUID is not available
 * (e.g., on HTTP connections or older browsers)
 */
export function generateUUID(): string {
  // Try native crypto.randomUUID first (modern browsers, HTTPS/localhost only)
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Fallback for HTTP contexts or older browsers
  // This generates a v4 UUID using Math.random()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
