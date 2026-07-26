import { useState, useRef, useCallback } from "react";

function getClientX(e: MouseEvent | TouchEvent): number {
  return "touches" in e ? e.touches[0].clientX : e.clientX;
}
function getClientY(e: MouseEvent | TouchEvent): number {
  return "touches" in e ? e.touches[0].clientY : e.clientY;
}

export function useResizable(initialWidth = 240, initialHeight = 200) {
  // Resizable sidebar (px)
  const [sidebarWidth, setSidebarWidth] = useState(initialWidth);
  const sidebarDragging = useRef(false);

  const onSidebarDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    sidebarDragging.current = true;
    const startX = getClientX(e.nativeEvent as MouseEvent | TouchEvent);
    const startW = sidebarWidth;

    const onMove = (ev: MouseEvent | TouchEvent) => {
      if (!sidebarDragging.current) return;
      const clientX = getClientX(ev);
      setSidebarWidth(Math.min(450, Math.max(160, startW + (clientX - startX))));
    };
    const onUp = () => {
      sidebarDragging.current = false;
      document.removeEventListener("mousemove", onMove as any);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove as any);
      document.removeEventListener("touchend", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove as any);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove as any, { passive: false });
    document.addEventListener("touchend", onUp);
  }, [sidebarWidth]);

  // Resizable console height
  const [consoleHeight, setConsoleHeight] = useState(initialHeight);
  const consoleDragging = useRef(false);

  const onConsoleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    consoleDragging.current = true;
    const startY = getClientY(e.nativeEvent as MouseEvent | TouchEvent);
    const startH = consoleHeight;

    const onMove = (ev: MouseEvent | TouchEvent) => {
      if (!consoleDragging.current) return;
      const clientY = getClientY(ev);
      setConsoleHeight(Math.min(600, Math.max(80, startH + (startY - clientY))));
    };
    const onUp = () => {
      consoleDragging.current = false;
      document.removeEventListener("mousemove", onMove as any);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove as any);
      document.removeEventListener("touchend", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove as any);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove as any, { passive: false });
    document.addEventListener("touchend", onUp);
  }, [consoleHeight]);

  return {
    sidebarWidth,
    onSidebarDragStart,
    consoleHeight,
    onConsoleDragStart,
  };
}
