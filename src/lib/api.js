// Base URL of the backend. In dev, Vite proxies /api to the backend (see vite.config.js).
// In production, set VITE_API_BASE_URL to the deployed backend origin.
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Sends a message to the AI spokesperson endpoint.
 * Backend route: POST /api/ai
 */
export async function sendChatMessage(messages) {
  const res = await fetch(`${API_BASE}/api/ai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `AI request failed (${res.status})`);
  }

  return res.json(); // { reply: string }
}

/**
 * Reports a lightweight, anonymous web traffic event.
 * Backend route: POST /api/analytics
 */
export async function trackEvent(event) {
  try {
    await fetch(`${API_BASE}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...event,
        path: window.location.pathname,
        referrer: document.referrer || null,
        ts: new Date().toISOString(),
      }),
      keepalive: true,
    });
  } catch {
    // Analytics failures should never break the UI.
  }
}
