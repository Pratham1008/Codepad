import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join("/");
  const url = `${API_BASE}/webauthn/${path}`;

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const options: RequestInit = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    options.body = await req.text();
  }

  const response = await fetch(url, options);

  const resHeaders = new Headers(response.headers);
  resHeaders.delete("set-cookie");
  resHeaders.delete("content-encoding");
  resHeaders.delete("content-length");
  resHeaders.delete("transfer-encoding");

  const bodyText = await response.text();

  const res = new NextResponse(bodyText, {
    status: response.status,
    statusText: response.statusText,
    headers: resHeaders,
  });

  const setCookies = response.headers.getSetCookie();
  const cookieStore = await cookies();

  for (const cookieStr of setCookies) {
    const parsed = parseSetCookie(cookieStr);
    if (!parsed) continue;

    res.cookies.set(parsed.name, parsed.value, {
      path: parsed.path ?? "/",
      httpOnly: parsed.httpOnly,
      secure: parsed.secure,
      sameSite: parsed.sameSite,
      maxAge: parsed.maxAge,
      expires: parsed.expires,
    });
  }

  return res;
}

function parseSetCookie(setCookieStr: string) {
  const parts = setCookieStr.split(";").map((p) => p.trim());
  const [nameValue, ...attrs] = parts;
  const eqIdx = nameValue.indexOf("=");
  if (eqIdx === -1) return null;

  const name = nameValue.slice(0, eqIdx);
  const value = nameValue.slice(eqIdx + 1);

  const result: {
    name: string;
    value: string;
    path?: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite?: "lax" | "strict" | "none";
    maxAge?: number;
    expires?: Date;
  } = { name, value, httpOnly: false, secure: false };

  for (const attr of attrs) {
    const [rawKey, rawVal] = attr.split("=");
    const key = rawKey.toLowerCase();
    if (key === "path") result.path = rawVal;
    else if (key === "httponly") result.httpOnly = true;
    else if (key === "secure") result.secure = true;
    else if (key === "samesite") {
      const v = (rawVal || "").toLowerCase();
      if (v === "lax" || v === "strict" || v === "none") result.sameSite = v;
    } else if (key === "max-age") result.maxAge = parseInt(rawVal, 10);
    else if (key === "expires") result.expires = new Date(rawVal);
  }

  return result;
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
