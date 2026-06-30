import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const body = await req.text();

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const backendRes = await fetch(
    `${BACKEND_URL}/api/run/stdin/${sessionId}`,
    {
      method: "POST",
      headers,
      body,
    }
  );

  const resBody = await backendRes.text();
  return new NextResponse(resBody, {
    status: backendRes.status,
    headers: { "Content-Type": "application/json" },
  });
}
