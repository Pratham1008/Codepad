import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function POST(req: NextRequest) {
  const body = await req.text();

  // Forward headers (drop hop-by-hop ones)
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const backendRes = await fetch(`${BACKEND_URL}/api/run/stream`, {
    method: "POST",
    headers,
    body,
  });

  // Build response headers, preserving SSE-critical ones
  const resHeaders = new Headers();
  resHeaders.set("Content-Type", "text/event-stream");
  resHeaders.set("Cache-Control", "no-cache, no-transform");
  resHeaders.set("Connection", "keep-alive");
  resHeaders.set("X-Accel-Buffering", "no"); // Tells Cloudflare/nginx to NOT buffer

  // Stream the backend response body directly to the client
  return new Response(backendRes.body, {
    status: backendRes.status,
    headers: resHeaders,
  });
}
