import { useState, useRef, useEffect } from "react";
import { runProject } from "../actions";

export function useRunExecution(
  projectId: string | null,
  activeFilePath: string | null,
  handleSave: () => Promise<void>,
  setBottomTab: (tab: 'problems' | 'output' | 'terminal') => void
) {
  const [output, setOutput] = useState<{ stdout?: string, stderr?: string, exitCode?: number, executionTimeMs?: number, memoryUsageKb?: number } | null>(null);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [staticStdin, setStaticStdin] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [streamRunning, setStreamRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const consoleRef = useRef<HTMLDivElement>(null);
  const consoleInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLines]);

  useEffect(() => {
    if (interactiveMode && streamRunning) {
      consoleInputRef.current?.focus();
    }
  }, [interactiveMode, streamRunning]);

  const appendConsole = (text: string) => {
    if (!text) return;
    setConsoleLines(prev => {
      const next = [...prev];
      const combined = (next.pop() ?? "") + text;
      const split = combined.split("\n");
      return [...next, ...split];
    });
  };

  const handleRunStatic = async () => {
    if (!projectId) return;
    if (activeFilePath) {
      await handleSave();
    }
    setLoading(true);
    setBottomTab('output');
    setOutput(null);
    const res = await runProject(projectId, staticStdin);
    setLoading(false);
    if (!res.error) {
      setOutput(res);
    } else {
      setOutput({ stderr: res.error });
    }
  };

  const handleRunStream = async () => {
    if (!projectId) return;
    if (activeFilePath) {
      await handleSave();
    }
    setLoading(true);
    setStreamRunning(true);
    setBottomTab('terminal');
    setOutput(null);
    setConsoleLines([]);
    setCurrentLine("");
    setSessionId(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(`/api/projects/${projectId}/run/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        appendConsole("\nFailed to start execution.");
        setLoading(false);
        setStreamRunning(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let currentEvent = "";
      let buffer = "";

      const finish = () => {
        setLoading(false);
        setStreamRunning(false);
        setSessionId(null);
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) { finish(); break; }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) { currentEvent = ""; continue; }

          if (trimmedLine.startsWith("event:")) {
            currentEvent = trimmedLine.replace("event:", "").trim();
          } else if (trimmedLine.startsWith("data:")) {
            const rawData = trimmedLine.replace("data:", "").trim();
            if (!rawData) continue;

            try {
              const parsed = JSON.parse(rawData);
              if (currentEvent === "session") {
                setSessionId(parsed.sessionId);
              } else if (currentEvent === "stdout" || currentEvent === "stderr") {
                appendConsole(parsed.chunk ?? "");
              } else if (currentEvent === "done") {
                appendConsole("\n[Process exited]");
                finish();
              } else if (currentEvent === "error") {
                appendConsole("\n[Error] " + (parsed.chunk ?? "Unknown error"));
                finish();
              }
            } catch (e) {
              console.error("Error parsing stream chunk:", e, rawData);
              appendConsole(rawData);
            }
          }
        }
      }
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        appendConsole(`\n[Connection error] ${error.message}`);
      }
      setLoading(false);
      setStreamRunning(false);
    }
  };

  const handleRun = () => {
    if (interactiveMode) handleRunStream();
    else handleRunStatic();
  };

  const handleConsoleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!sessionId || !projectId) return;

    const line = currentLine;
    appendConsole(line + "\n");
    setCurrentLine("");

    try {
      const res = await fetch(`/api/projects/${projectId}/run/stdin/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ line }),
      });
      if (!res.ok) {
        appendConsole(`\n[Failed to send input: ${res.status}]`);
      }
    } catch (err) {
      appendConsole(`\n[Failed to send input: ${err}]`);
    }
  };

  return {
    output, setOutput,
    interactiveMode, setInteractiveMode,
    staticStdin, setStaticStdin,
    sessionId, setSessionId,
    consoleLines, setConsoleLines,
    currentLine, setCurrentLine,
    streamRunning, setStreamRunning,
    loading, setLoading,
    consoleRef,
    consoleInputRef,
    abortRef,
    appendConsole,
    handleRunStatic,
    handleRunStream,
    handleRun,
    handleConsoleKeyDown,
  };
}
