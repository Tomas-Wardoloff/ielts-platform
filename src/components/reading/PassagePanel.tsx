import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReadingPassageWithQuestions } from "@/types/exercise";

interface Props {
  passage: ReadingPassageWithQuestions;
}

export function PassagePanel({ passage }: Props) {
  return (
    <div className="w-1/2 shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
      <div className="px-6 py-5">
        <p className="mb-4 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          Passage
        </p>
        <div className="prose prose-sm max-w-none text-gray-700">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            {passage.title}
          </h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="text-gray-700 italic">{children}</em>
              ),
              h1: ({ children }) => (
                <h1 className="mb-3 text-base font-bold text-gray-900">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-2 text-sm font-bold text-gray-900">
                  {children}
                </h2>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-sm leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-gray-300 pl-4 text-gray-500 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {passage.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
