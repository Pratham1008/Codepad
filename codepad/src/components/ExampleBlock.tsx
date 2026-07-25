import React from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface ExampleBlockProps {
  index: number;
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export function ExampleBlock({ index, input, expectedOutput, explanation }: ExampleBlockProps) {
  return (
    <div className="mb-6 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
      <h3 className="font-semibold text-zinc-100 mb-3">Example {index}:</h3>
      
      <div className="space-y-3 text-sm">
        <div>
          <span className="font-bold text-zinc-400">Input: </span>
          <code className="font-mono text-zinc-300 bg-zinc-800/50 px-1.5 py-0.5 rounded">{input}</code>
        </div>
        
        <div>
          <span className="font-bold text-zinc-400">Output: </span>
          <code className="font-mono text-zinc-300 bg-zinc-800/50 px-1.5 py-0.5 rounded">{expectedOutput}</code>
        </div>
        
        {explanation && (
          <div className="mt-3 pt-3 border-t border-zinc-800">
            <span className="font-bold text-zinc-400 block mb-1">Explanation: </span>
            <MarkdownRenderer content={explanation} />
          </div>
        )}
      </div>
    </div>
  );
}
