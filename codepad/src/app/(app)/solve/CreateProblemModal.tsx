"use client";

import { useState } from "react";
import { Modal } from "@/components/modal";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { createProblem } from "./actions";

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  isSample: boolean;
  explanation: string;
}

export function CreateProblemModal({ isOpen, onClose, onCreated }: { isOpen: boolean, onClose: () => void, onCreated: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [timeLimitMs, setTimeLimitMs] = useState(2000);
  const [memoryLimitKb, setMemoryLimitKb] = useState(256000);

  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [nextTcId, setNextTcId] = useState(1);

  const [starterCode, setStarterCode] = useState({
    "java": "public class Solution {\n    \n}\n",
    "python": "class Solution:\n    pass\n",
    "cpp": "class Solution {\npublic:\n    \n};\n"
  });

  const handleAddTestCase = () => {
    setTestCases([...testCases, { id: nextTcId, input: "", expectedOutput: "", isSample: false, explanation: "" }]);
    setNextTcId(nextTcId + 1);
  };

  const handleRemoveTestCase = (id: number) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const updateTestCase = (id: number, field: keyof TestCase, value: any) => {
    setTestCases(testCases.map(tc => tc.id === id ? { ...tc, [field]: value } : tc));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description) {
      setError("Please fill in title, slug, and description");
      return;
    }

    setLoading(true);
    setError("");

    const data = {
      title,
      slug,
      difficulty,
      description,
      timeLimitMs,
      memoryLimitKb,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      starterCode,
      testCases: testCases.map(tc => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isSample: tc.isSample,
        explanation: tc.explanation
      })),
      isPublished: true,
      solutionMarkdown: "",
      solutionCode: {}
    };

    const res = await createProblem(data);
    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      setTitle("");
      setSlug("");
      setDescription("");
      setTags("");
      setTestCases([]);
      setStarterCode({
        "java": "public class Solution {\n    \n}\n",
        "python": "class Solution:\n    pass\n",
        "cpp": "class Solution {\npublic:\n    \n};\n"
      });
      onCreated();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-4xl"
      title={<span className="flex items-center gap-2"><Plus size={20} className="text-primary" /> Create New Problem</span>}
      footer={
        <>
          <button 
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold bg-primary text-on-primary hover:bg-orange-600 rounded transition-colors flex items-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Create Problem
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {error && <div className="text-sm text-error bg-error-container/20 p-3 rounded font-semibold border border-error/30">{error}</div>}
        
        {/* Basic Info Section */}
        <section className="flex flex-col gap-4">
          <h3 className="font-semibold text-primary border-b border-outline-variant/50 pb-2">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                  }
                }}
                className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none" 
                placeholder="e.g. Two Sum"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Slug</label>
              <input 
                type="text" 
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none" 
                placeholder="e.g. two-sum"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Difficulty</label>
              <select 
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Tags (comma separated)</label>
              <input 
                type="text" 
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none" 
                placeholder="e.g. arrays, hash-table"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Description (Markdown)</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-sm font-code-sm text-on-surface focus:border-primary outline-none resize-y" 
              placeholder="Write problem description here..."
            />
          </div>
        </section>

        {/* Execution Limits Section */}
        <section className="flex flex-col gap-4">
          <h3 className="font-semibold text-primary border-b border-outline-variant/50 pb-2">Execution Limits</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Time Limit (ms)</label>
              <input 
                type="number" 
                value={timeLimitMs}
                onChange={e => setTimeLimitMs(Number(e.target.value))}
                className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Memory Limit (KB)</label>
              <input 
                type="number" 
                value={memoryLimitKb}
                onChange={e => setMemoryLimitKb(Number(e.target.value))}
                className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none" 
              />
            </div>
          </div>
        </section>

        {/* Starter Code Section */}
        <section className="flex flex-col gap-4">
          <h3 className="font-semibold text-primary border-b border-outline-variant/50 pb-2">Starter Code</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["java", "python", "cpp"] as const).map(lang => (
              <div key={lang}>
                <label className="block text-sm font-semibold mb-1 text-on-surface-variant">{lang.toUpperCase()}</label>
                <textarea
                  value={starterCode[lang]}
                  onChange={e => setStarterCode({ ...starterCode, [lang]: e.target.value })}
                  rows={6}
                  className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-xs font-code text-on-surface focus:border-primary outline-none resize-y"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Test Cases Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-outline-variant/50 pb-2">
            <h3 className="font-semibold text-primary">Test Cases</h3>
            <button 
              type="button" 
              onClick={handleAddTestCase}
              className="flex items-center gap-1 text-xs font-semibold bg-surface-variant text-on-surface-variant px-3 py-1 rounded hover:bg-primary hover:text-on-primary transition-colors"
            >
              <Plus size={14} /> Add Test Case
            </button>
          </div>
          
          {testCases.length === 0 ? (
            <div className="text-center text-sm text-on-surface-variant p-4 border border-dashed border-outline-variant rounded">
              No test cases added yet.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {testCases.map((tc, index) => (
                <div key={tc.id} className="bg-surface-container-low border border-outline-variant rounded-lg p-4 relative group">
                  <button 
                    type="button"
                    onClick={() => handleRemoveTestCase(tc.id)}
                    className="absolute top-2 right-2 p-1.5 bg-surface-variant text-on-surface-variant hover:text-error hover:bg-error-container rounded opacity-0 group-hover:opacity-100 transition-all"
                    title="Remove Test Case"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="font-semibold text-sm mb-3 flex items-center gap-3">
                    Test Case {index + 1}
                    <label className="flex items-center gap-1.5 font-normal text-xs cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tc.isSample}
                        onChange={e => updateTestCase(tc.id, "isSample", e.target.checked)}
                        className="rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      Visible (Sample)
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-on-surface-variant">Input</label>
                      <textarea
                        value={tc.input}
                        onChange={e => updateTestCase(tc.id, "input", e.target.value)}
                        rows={2}
                        className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-xs font-code text-on-surface focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-on-surface-variant">Expected Output</label>
                      <textarea
                        value={tc.expectedOutput}
                        onChange={e => updateTestCase(tc.id, "expectedOutput", e.target.value)}
                        rows={2}
                        className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-xs font-code text-on-surface focus:border-primary outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-on-surface-variant">Explanation (Optional)</label>
                    <input 
                      type="text" 
                      value={tc.explanation}
                      onChange={e => updateTestCase(tc.id, "explanation", e.target.value)}
                      className="w-full bg-surface border border-outline-variant rounded-md px-3 py-1.5 text-xs text-on-surface focus:border-primary outline-none" 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </form>
    </Modal>
  );
}
