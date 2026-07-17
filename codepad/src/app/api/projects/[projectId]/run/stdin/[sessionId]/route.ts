import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string; sessionId: string }> }
) {
  const { projectId, sessionId } = await params;
  const body = await req.text();

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const backendRes = await fetch(
    `${BACKEND_URL}/api/projects/${projectId}/run/stdin/${sessionId}`,
    {
      method: "POST",
      headers,
      body,
    }
  );

  return NextResponse.json(await backendRes.text());
}
