import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const resolvedParams = await params;
  const { token } = await getSession();
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const res = await fetch(`${API_BASE}/api/projects/${resolvedParams.projectId}/download`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: "no-store"
    });

    if (!res.ok) {
      return new NextResponse("Failed to download", { status: res.status });
    }

    const blob = await res.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="project_${resolvedParams.projectId}.zip"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
