import { useState, useRef, useCallback } from "react";

export function useResizable(initialWidth = 240, initialHeight = 200) {
  // Resizable sidebar (px)
  const [sidebarWidth, setSidebarWidth] = useState(initialWidth);
  const sidebarDragging = useRef(false);

  const onSidebarDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    sidebarDragging.current = true;
    const startX = e.clientX;
    const startW = sidebarWidth;
    const onMove = (ev: MouseEvent) => {
      if (!sidebarDragging.current) return;
      setSidebarWidth(Math.min(450, Math.max(160, startW + (ev.clientX - startX))));
    };
    const onUp = () => {
      sidebarDragging.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [sidebarWidth]);

  // Resizable console height
  const [consoleHeight, setConsoleHeight] = useState(initialHeight);
  const consoleDragging = useRef(false);

  const onConsoleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    consoleDragging.current = true;
    const startY = e.clientY;
    const startH = consoleHeight;
    const onMove = (ev: MouseEvent) => {
      if (!consoleDragging.current) return;
      setConsoleHeight(Math.min(600, Math.max(80, startH + (startY - ev.clientY))));
    };
    const onUp = () => {
      consoleDragging.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [consoleHeight]);

  return {
    sidebarWidth,
    onSidebarDragStart,
    consoleHeight,
    onConsoleDragStart,
  };
}
