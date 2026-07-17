import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");
  
  // The client doesn't send a body anymore, so we don't need to forward it. 
  // Wait, does stream run take stdin? No, stdin goes to a separate endpoint.
  // Actually, wait, /api/projects/{projectId}/run/stream doesn't take a body in the backend?
  // Let's check the API inventory: 
  // POST /api/projects/{projectId}/run/stream -> Request Body: — (takes HttpServletResponse)
  // Wait, Next.js EditorClient previously sent: body: JSON.stringify({ sourceCode: code, language })
  // But now we don't send sourceCode anymore since it's a project. So body is empty!

  const backendRes = await fetch(`${BACKEND_URL}/api/projects/${projectId}/run/stream`, {
    method: "POST",
    headers,
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
