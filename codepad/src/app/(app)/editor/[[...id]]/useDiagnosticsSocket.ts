import { useEffect, useRef, useCallback, useState } from "react";

export type ConnectionStatus = "connecting" | "connected" | "disconnected";

export function useDiagnosticsSocket(
  sessionKey: string | null,
  language: string | null,
  getToken: () => Promise<string>,
  onDiagnostics: (diags: any[]) => void
) {
  const socketRef = useRef<WebSocket | null>(null);
  const requestIdRef = useRef(0);
  const retryRef = useRef(0);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const onDiagnosticsRef = useRef(onDiagnostics);
  const getTokenRef = useRef(getToken);

  useEffect(() => {
    onDiagnosticsRef.current = onDiagnostics;
    getTokenRef.current = getToken;
  }, [onDiagnostics, getToken]);

  const connect = useCallback(async () => {
    if (!sessionKey || !language) return;
    setStatus("connecting");
    try {
      const token = await getTokenRef.current();
      
      let wsBase = process.env.NEXT_PUBLIC_WS_URL;
      if (!wsBase && process.env.NEXT_PUBLIC_API_URL) {
          wsBase = process.env.NEXT_PUBLIC_API_URL.replace("http", "ws") + "/api/projects/diagnostics/stream";
      }
      if (!wsBase) {
          const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
          if (window.location.port === '3000') {
              wsBase = `${protocol}//${window.location.hostname}:8080/api/projects/diagnostics/stream`;
          } else {
              wsBase = `${protocol}//${window.location.host}/api/projects/diagnostics/stream`;
          }
      }

      // SECURITY (CWE-598): pass the token via Sec-WebSocket-Protocol instead of
      // a query-string parameter. Query strings land in server access logs, browser
      // history, and proxy logs — a leaked ID token is a full session hijack.
      const ws = new WebSocket(
        `${wsBase}?sessionKey=${sessionKey}&language=${language}`,
        [token]
      );

      ws.onopen = () => { retryRef.current = 0; setStatus("connected"); };

      ws.onmessage = (evt) => {
        const { requestId, diagnostics } = JSON.parse(evt.data);
        if (requestId === requestIdRef.current) onDiagnosticsRef.current(diagnostics);
      };

      ws.onclose = () => {
        setStatus("disconnected");
        if (socketRef.current === ws) socketRef.current = null;
        // exponential backoff, capped at 15s, so a dead backend doesn't hammer it
        const delay = Math.min(1000 * 2 ** retryRef.current, 15000);
        retryRef.current += 1;
        setTimeout(connect, delay);
      };

      ws.onerror = () => ws.close();
      socketRef.current = ws;
    } catch (error) {
      console.error("Failed to get token for websocket connect", error);
      setStatus("disconnected");
      const delay = Math.min(1000 * 2 ** retryRef.current, 15000);
      retryRef.current += 1;
      setTimeout(connect, delay);
    }
  }, [sessionKey, language]);

  useEffect(() => {
    connect();
    return () => {
      const ws = socketRef.current;
      if (ws) {
        ws.onclose = null; // Prevent reconnect loop when unmounting/reconnecting
        ws.close();
      }
    };
  }, [connect]);

  const check = useCallback((content: string, language: string, activeFile?: string) => {
    const ws = socketRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    const requestId = ++requestIdRef.current;
    ws.send(JSON.stringify({ requestId, content, language, activeFile }));
  }, []);

  return { check, status };
}

