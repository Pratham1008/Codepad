export const SUPPORTED_LANGUAGES = [
  { id: "JAVA", label: "Java", monaco: "java" },
  { id: "CPP", label: "C++", monaco: "cpp" },
  { id: "PYTHON", label: "Python", monaco: "python" },
  { id: "C", label: "C", monaco: "c" },
  { id: "JAVASCRIPT", label: "JavaScript", monaco: "javascript" },
  { id: "TYPESCRIPT", label: "TypeScript", monaco: "typescript" },
  { id: "RUST", label: "Rust", monaco: "rust" },
  { id: "KOTLIN", label: "Kotlin", monaco: "kotlin" },
];

export function getLangFromPath(path: string) {
  if (path.endsWith('.java')) return 'java';
  if (path.endsWith('.cpp') || path.endsWith('.c') || path.endsWith('.h')) return 'cpp';
  if (path.endsWith('.py')) return 'python';
  if (path.endsWith('.js') || path.endsWith('.jsx')) return 'javascript';
  if (path.endsWith('.ts') || path.endsWith('.tsx')) return 'typescript';
  if (path.endsWith('.json')) return 'json';
  if (path.endsWith('.xml')) return 'xml';
  if (path.endsWith('.md')) return 'markdown';
  return 'text';
}

export function getFileName(path: string) {
  return path.split('/').pop() || path;
}
