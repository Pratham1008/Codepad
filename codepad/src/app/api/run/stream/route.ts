import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const backendRes = await fetch(`${BACKEND_URL}/api/run/stream`, {
    method: "POST",
    headers,
    body,
  });

  const resHeaders = new Headers();
  resHeaders.set("Content-Type", "text/event-stream");
  resHeaders.set("Cache-Control", "no-cache, no-transform");
  resHeaders.set("Connection", "keep-alive");
  resHeaders.set("X-Accel-Buffering", "no"); 

  return new NextResponse(backendRes.body as any, {
    status: backendRes.status,
    headers: resHeaders,
  });
}
