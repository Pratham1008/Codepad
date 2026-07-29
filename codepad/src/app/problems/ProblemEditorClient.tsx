"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { createProblem, updateProblem } from "./actions";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const SUPPORTED_LANGUAGES = [
  { id: "JAVA", label: "Java", monaco: "java" },
  { id: "PYTHON", label: "Python", monaco: "python" },
  { id: "CPP", label: "C++", monaco: "cpp" },
  { id: "C", label: "C", monaco: "c" },
  { id: "JAVASCRIPT", label: "JavaScript", monaco: "javascript" },
  { id: "TYPESCRIPT", label: "TypeScript", monaco: "typescript" },
  { id: "RUST", label: "Rust", monaco: "rust" },
  { id: "KOTLIN", label: "Kotlin", monaco: "kotlin" },
];

export function ProblemEditorClient({ initialData }: { initialData: any | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "description" | "code" | "testcases">("general");

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "EASY");
  const [timeLimit, setTimeLimit] = useState(initialData?.timeLimitMs || 2000);
  const [memoryLimit, setMemoryLimit] = useState(initialData?.memoryLimitKb || 262144);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished || false);
  const [description, setDescription] = useState(initialData?.description || "");

  const [starterCode, setStarterCode] = useState<Record<string, string>>(initialData?.starterCode || {});
  const [solutionCode, setSolutionCode] = useState<Record<string, string>>(initialData?.solutionCode || {});
  
  const [testCases, setTestCases] = useState<any[]>(initialData?.testCases || []);

  const [selectedLang, setSelectedLang] = useState("JAVA");

  useEffect(() => {
    if (!initialData && title && !slug) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  }, [title, initialData, slug]);

  const handleSave = async () => {
    if (!title || !slug || !description) {
      alert("Title, Slug, and Description are required");
      return;
    }

    setLoading(true);
    const payload = {
      title,
      slug,
      difficulty,
      timeLimitMs: timeLimit,
      memoryLimitKb: memoryLimit,
      isPublished,
      description,
      starterCode,
      solutionCode,
      testCases: testCases.map((tc, idx) => ({ ...tc, orderIndex: idx }))
    };

    let res;
    if (initialData?.problemId) {
      res = await updateProblem(initialData.problemId, payload);
    } else {
      res = await createProblem(payload);
    }

    setLoading(false);
    if (res?.error) {
      alert(res.error);
    } else {
      router.push("/problems");
    }
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "", isSample: false }]);
  };

  const updateTestCase = (index: number, field: string, value: any) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const removeTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#1e1e1e] text-[#cccccc] font-sans overflow-hidden">
      <div className="h-14 shrink-0 border-b border-[#3c3c3c] flex items-center justify-between px-6 bg-[#252526]">
        <div className="flex items-center gap-4">
          <Link href="/problems" className="p-1.5 hover:bg-[#3c3c3c] rounded text-[#858585] hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-semibold text-lg text-white">{initialData ? "Edit Problem" : "Create Problem"}</h1>
        </div>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="bg-[#007acc] text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-[#005f9e] transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {initialData ? "Update" : "Save"}
        </button>
      </div>

      <div className="flex shrink-0 border-b border-[#3c3c3c] bg-[#252526] px-6">
        {[
          { id: "general", label: "General" },
          { id: "description", label: "Description" },
          { id: "code", label: "Code Templates" },
          { id: "testcases", label: "Test Cases" }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === t.id ? "border-[#007acc] text-white" : "border-transparent text-[#858585] hover:text-[#cccccc]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "general" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[#858585] mb-1">Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)}
                className="w-full bg-[#3c3c3c] border border-[#454545] rounded p-2 text-white focus:outline-none focus:border-[#007acc]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#858585] mb-1">Slug</label>
              <input value={slug} onChange={e => setSlug(e.target.value)}
                className="w-full bg-[#3c3c3c] border border-[#454545] rounded p-2 text-white focus:outline-none focus:border-[#007acc]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#858585] mb-1">Difficulty</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
                className="w-full bg-[#3c3c3c] border border-[#454545] rounded p-2 text-white focus:outline-none focus:border-[#007acc]">
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#858585] mb-1">Time Limit (ms)</label>
                <input type="number" value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))}
                  className="w-full bg-[#3c3c3c] border border-[#454545] rounded p-2 text-white focus:outline-none focus:border-[#007acc]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#858585] mb-1">Memory Limit (KB)</label>
                <input type="number" value={memoryLimit} onChange={e => setMemoryLimit(Number(e.target.value))}
                  className="w-full bg-[#3c3c3c] border border-[#454545] rounded p-2 text-white focus:outline-none focus:border-[#007acc]" />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-white cursor-pointer">
                <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)}
                  className="accent-[#007acc] w-4 h-4" />
                Publish Problem
              </label>
              <p className="text-xs text-[#858585] mt-1 ml-6">If unchecked, the problem will only be visible to admins.</p>
            </div>
          </div>
        )}

        {activeTab === "description" && (
          <div className="h-full flex gap-4 min-h-[500px]">
            <div className="flex-1 flex flex-col border border-[#3c3c3c] rounded bg-[#1e1e1e] overflow-hidden">
              <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-semibold text-[#858585]">Markdown Editor</div>
              <Editor
                language="markdown"
                theme="vs-dark"
                value={description}
                onChange={(val) => setDescription(val || "")}
                options={{ minimap: { enabled: false }, wordWrap: "on" }}
              />
            </div>
            <div className="flex-1 flex flex-col border border-[#3c3c3c] rounded bg-[#1e1e1e] overflow-hidden">
              <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-semibold text-[#858585]">Preview</div>
              <div className="p-6 overflow-y-auto prose prose-invert prose-blue max-w-none flex-1">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="h-full flex flex-col min-h-[600px]">
            <div className="flex gap-2 mb-4">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded border ${
                    selectedLang === lang.id ? "bg-[#007acc] border-[#007acc] text-white" : "bg-[#252526] border-[#3c3c3c] text-[#858585] hover:border-[#858585]"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            
            <div className="flex-1 flex gap-4">
              <div className="flex-1 flex flex-col border border-[#3c3c3c] rounded bg-[#1e1e1e] overflow-hidden">
                <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-semibold text-[#858585]">
                  Starter Code
                </div>
                <Editor
                  language={SUPPORTED_LANGUAGES.find(l => l.id === selectedLang)?.monaco || "plaintext"}
                  theme="vs-dark"
                  value={starterCode[selectedLang] || ""}
                  onChange={(val) => setStarterCode(prev => ({ ...prev, [selectedLang]: val || "" }))}
                  options={{ minimap: { enabled: false } }}
                />
              </div>
              <div className="flex-1 flex flex-col border border-[#3c3c3c] rounded bg-[#1e1e1e] overflow-hidden">
                <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-semibold text-[#858585] flex justify-between">
                  <span>Solution/Driver Code</span>
                  <span className="text-yellow-500">Use {'{{USER_CODE}}'} placeholder</span>
                </div>
                <Editor
                  language={SUPPORTED_LANGUAGES.find(l => l.id === selectedLang)?.monaco || "plaintext"}
                  theme="vs-dark"
                  value={solutionCode[selectedLang] || ""}
                  onChange={(val) => setSolutionCode(prev => ({ ...prev, [selectedLang]: val || "" }))}
                  options={{ minimap: { enabled: false } }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "testcases" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#858585]">Define inputs and expected outputs for this problem.</p>
              <button onClick={addTestCase} className="flex items-center gap-1 text-sm bg-[#252526] hover:bg-[#3c3c3c] border border-[#3c3c3c] px-3 py-1.5 rounded transition-colors">
                <Plus size={16} /> Add Test Case
              </button>
            </div>

            <div className="space-y-4">
              {testCases.map((tc, idx) => (
                <div key={idx} className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-4 relative group">
                  <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => removeTestCase(idx)} className="text-red-400 hover:text-red-300 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-semibold text-white">Test Case #{idx + 1}</h3>
                    <label className="flex items-center gap-2 text-xs text-[#858585] cursor-pointer hover:text-white">
                      <input type="checkbox" checked={tc.isSample} onChange={e => updateTestCase(idx, "isSample", e.target.checked)}
                        className="accent-[#007acc] w-3 h-3" />
                      Is Sample (Visible to users)
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#858585] mb-1">Input</label>
                      <textarea
                        value={tc.input}
                        onChange={e => updateTestCase(idx, "input", e.target.value)}
                        className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded p-2 text-white text-sm font-mono focus:outline-none focus:border-[#007acc] min-h-[100px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#858585] mb-1">Expected Output</label>
                      <textarea
                        value={tc.expectedOutput}
                        onChange={e => updateTestCase(idx, "expectedOutput", e.target.value)}
                        className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded p-2 text-white text-sm font-mono focus:outline-none focus:border-[#007acc] min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {testCases.length === 0 && (
                <div className="text-center py-12 border border-dashed border-[#3c3c3c] rounded-lg text-[#858585]">
                  No test cases added yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
