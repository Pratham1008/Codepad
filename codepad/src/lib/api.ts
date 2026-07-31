import { getSession } from "./session";

const getApiBase = () => process.env.BACKEND_API_URL || "http://127.0.0.1:8080";

export async function fetchAuthenticated(path: string, options: RequestInit = {}) {
  const { token } = await getSession();
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  return fetch(`${getApiBase()}${path}`, {
    ...options,
    headers,
    cache: 'no-store' // Authenticated requests should generally not be cached
  });
}

// Next 16 explicitly cached function
export async function fetchPublicCached(path: string, tag: string) {
  try {
    return await fetch(`${getApiBase()}${path}`);
  } catch (e) {
    console.warn(`[fetchPublicCached] Backend unavailable for ${path}`);
    return new Response(JSON.stringify({ content: [] }), { status: 503 });
  }
}
