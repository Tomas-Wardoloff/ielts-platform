"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";
import type {
  QuestionDraft,
  QuestionType,
  QuestionFormData,
} from "@/types/admin";
import { QuestionFormShell } from "./question-forms/QuestionFormShell";
import { QuestionFormRenderer } from "./question-forms/QuestionFormRenderer";
import { serializeQuestion } from "@/lib/question-serializer";
import { Button } from "../ui/Button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function getDefaultFormData(type: QuestionType): QuestionFormData {
  switch (type) {
    case "TRUE_FALSE_NG":
      return { statements: [{ id: "s1", text: "", answer: "TRUE" }] };
    case "YES_NO_NG":
      return { statements: [{ id: "s1", text: "", answer: "YES" }] };
    case "MULTIPLE_CHOICE":
      return {
        question: "",
        options: [
          { id: "A", text: "" },
          { id: "B", text: "" },
          { id: "C", text: "" },
          { id: "D", text: "" },
        ],
        answer: "",
      };
    case "MATCHING_HEADINGS":
      return {
        paragraphs: [{ id: "A" }],
        headings: [
          { id: "i", text: "" },
          { id: "ii", text: "" },
          { id: "iii", text: "" },
        ],
        solution: {},
      };
    case "MATCHING_INFORMATION":
      return {
        paragraphs: [{ id: "A", text: "" }],
        statements: [{ id: "s1", text: "", answer: "" }],
      };
    case "MATCHING_FEATURES":
      return {
        category: "",
        features: [{ id: "A", text: "" }],
        statements: [{ id: "s1", text: "", answer: "" }],
      };
    case "MATCHING_SENTENCE_ENDINGS":
      return {
        beginnings: [{ id: "b1", text: "", answer: "" }],
        endings: [{ id: "A", text: "" }],
      };
    case "SENTENCE_COMPLETION":
      return {
        sentences: [
          {
            segments: [
              { type: "text", value: "" },
              { type: "blank", id: "b1" },
              { type: "text", value: "" },
            ],
          },
        ],
        blanks: [{ id: "b1", answers: "" }],
      };
    case "NOTE_TABLE_FLOWCHART_SUMMARY":
      return {
        format: "summary",
        title: "",
        segments: [
          { type: "text", value: "" },
          { type: "blank", id: "b1" },
        ],
        blanks: [{ id: "b1", answers: "" }],
      };
    case "DIAGRAM_LABEL":
      return {
        diagramDescription: "",
        labels: [{ id: "l1", hint: "", answers: "" }],
        options: "",
      };
    case "SHORT_ANSWER":
      return { questions: [{ id: "q1", text: "", answers: "" }] };
  }
}

export function PassageForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);

  const [passage, setPassage] = useState({
    title: "",
    text: "",
  });

  const [questions, setQuestions] = useState<QuestionDraft[]>([]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: nanoid(),
        type: "TRUE_FALSE_NG" as QuestionType,
        instructions: "",
        formData: getDefaultFormData("TRUE_FALSE_NG"),
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestionBase = useCallback(
    (id: string, field: string, value: string) => {
      setQuestions((prev) =>
        prev.map((q) => {
          if (q.id !== id) return q;
          if (field === "type") {
            return {
              ...q,
              type: value as QuestionType,
              formData: getDefaultFormData(value as QuestionType),
            };
          }
          return { ...q, [field]: value };
        })
      );
    },
    []
  );

  const updateQuestionFormData = useCallback(
    (id: string, data: QuestionFormData) => {
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, formData: data } : q))
      );
    },
    []
  );

  const handleSubmit = async () => {
    if (!passage.title.trim() || !passage.text.trim()) {
      setError("Title and passage text are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const serializedQuestions = questions.map((q, i) => {
        const { content, solution } = serializeQuestion(q);
        return {
          type: q.type,
          instructions: q.instructions,
          content,
          solution,
          order: i + 1,
        };
      });

      const res = await fetch("/api/admin/passages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...passage, questions: serializedQuestions }),
      });

      if (!res.ok) throw new Error("Failed to create passage.");

      const data = await res.json();
      router.push(`/admin/passages/${data.id}`);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section 1 — Passage */}
      <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-600">
            Title <span className="text-brand">*</span>
          </label>
          <input
            type="text"
            value={passage.title}
            onChange={(e) => setPassage({ ...passage, title: e.target.value })}
            placeholder="e.g. The History of Photography"
            className="focus:border-brand w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-600">
            Passage text <span className="text-brand">*</span>
          </label>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors">
            <div className="flex w-full border-b border-gray-200 bg-gray-50/80">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setPreview(false)}
                className={`flex-1 rounded-none! py-2.5 text-[13px] font-medium transition-colors ${
                  !preview
                    ? "text-brand! bg-white! shadow-[inset_0_-2px_0_0_currentColor]"
                    : "text-gray-500! hover:bg-gray-100! hover:text-gray-700!"
                }`}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setPreview(true)}
                className={`flex-1 rounded-none! py-2.5 text-[13px] font-medium transition-colors ${
                  preview
                    ? "text-brand! bg-white! shadow-[inset_0_-2px_0_0_currentColor]"
                    : "text-gray-500! hover:bg-gray-100! hover:text-gray-700!"
                }`}
              >
                Preview
              </Button>
            </div>

            {preview ? (
              <div className="prose prose-sm min-h-[312px] w-full max-w-none bg-white p-4 text-gray-700">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {passage.text || "*Nothing to preview yet.*"}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={passage.text}
                onChange={(e) =>
                  setPassage({ ...passage, text: e.target.value })
                }
                placeholder="Paste or write the passage here. Supports Markdown formatting."
                rows={14}
                className="block w-full resize-y border-0 bg-transparent p-4 font-mono text-[13px] leading-relaxed text-gray-800 outline-none focus:ring-0"
              />
            )}
          </div>
        </div>
      </div>

      {/* Section 2 — Questions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Questions</h2>

        {questions.map((q, i) => (
          <QuestionFormShell
            key={q.id}
            index={i}
            type={q.type}
            instructions={q.instructions}
            onChangeBase={(field, value) =>
              updateQuestionBase(q.id, field, value)
            }
            onRemove={() => removeQuestion(q.id)}
          >
            <QuestionFormRenderer
              draft={q}
              onChange={(data) => updateQuestionFormData(q.id, data)}
            />
          </QuestionFormShell>
        ))}

        <Button
          onClick={addQuestion}
          variant="secondary"
          leftIcon={<Plus size={12} />}
          className="w-full"
        >
          Add question
        </Button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3 pb-8">
        <Button
          onClick={() => router.push("/admin/passages")}
          variant="outline"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading} variant="primary">
          {loading ? "Saving..." : "Save passage and questions"}
        </Button>
      </div>
    </div>
  );
}
