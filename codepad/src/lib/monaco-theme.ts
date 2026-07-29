import type { Monaco } from "@monaco-editor/react";

/**
 * Registers "codepad-dark" / "codepad-light" Monaco themes.
 * Hardcoded to match the app's CSS tokens since we cannot read
 * both light and dark CSS variables at the same time using getComputedStyle.
 */
export function defineCodepadMonacoThemes(monaco: Monaco) {
  monaco.editor.defineTheme("codepad-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#1e1e1e",
      "editor.foreground": "#cccccc",
      "editorLineNumber.foreground": "#858585",
      "editorLineNumber.activeForeground": "#007acc",
      "editorCursor.foreground": "#007acc",
      "editor.selectionBackground": "#094771",
      "editor.lineHighlightBackground": "#2d2d30",
      "editorGutter.background": "#1e1e1e",
    },
  });

  monaco.editor.defineTheme("codepad-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#ffffff",
      "editor.foreground": "#333333",
      "editorLineNumber.foreground": "#616161",
      "editorLineNumber.activeForeground": "#007acc",
      "editorCursor.foreground": "#007acc",
      "editor.selectionBackground": "#e6f2ff",
      "editor.lineHighlightBackground": "#f3f3f3",
      "editorGutter.background": "#ffffff",
    },
  });
}

export function resolveMonacoThemeName(resolvedTheme: string | undefined) {
  return resolvedTheme === "dark" ? "codepad-dark" : "codepad-light";
}
