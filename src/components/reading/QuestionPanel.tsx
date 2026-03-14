"use client";

import type { ReadingPassageWithQuestions, UserAnswer } from "@/types/exercise";
import { QuestionRenderer } from "./question-types/QuestionRender";

import { Button } from "@/components/ui/Button";
import { MoveRight, MoveLeft } from "lucide-react";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, UserAnswer>;
  isAnswered: (id: string) => boolean;
  onAnswer: (questionId: string, answer: UserAnswer) => void;
  onNavigate: (index: number) => void;
  answeredCount: number;
  totalQuestions: number;
}

export function QuestionPanel({
  questions,
  currentIndex,
  answers,
  isAnswered,
  onAnswer,
  onNavigate,
  answeredCount,
  totalQuestions,
}: Props) {
  const currentQuestion = questions[currentIndex];

  return (
    <div className="flex h-1/2 w-full flex-col overflow-hidden bg-gray-50 lg:h-full lg:w-1/2">
      {/* Progress header */}
      <div className="shrink-0 border-b border-gray-200 bg-white px-5 pt-4 pb-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <div className="flex gap-1.5">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => onNavigate(i)}
                className={`h-2 w-2 cursor-pointer rounded-full transition-colors ${
                  i === currentIndex
                    ? "bg-brand"
                    : isAnswered(q.id)
                      ? "bg-red-200"
                      : "bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question body — scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          {/* Question type label */}
          <p className="text-brand mb-1.5 text-[10px] font-semibold tracking-widest uppercase">
            {formatType(currentQuestion.type)}
          </p>

          {/* Instructions */}
          <p className="mb-4 border-b border-gray-100 pb-3 text-xs leading-relaxed text-gray-500">
            {currentQuestion.instructions}
          </p>

          {/* Renderer */}
          <QuestionRenderer
            question={currentQuestion}
            userAnswer={answers[currentQuestion.id] ?? {}}
            onAnswer={(answer) => onAnswer(currentQuestion.id, answer)}
          />
        </div>
      </div>

      {/* Navigation footer */}
      <div className="flex shrink-0 items-center justify-between border-t border-gray-100 bg-white px-5 py-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={currentIndex === 0}
          leftIcon={<MoveLeft size={14} />}
        >
          Previous
        </Button>
        <span className="text-xs text-gray-400">
          {answeredCount} of {totalQuestions} answered
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate(currentIndex + 1)}
          disabled={currentIndex === totalQuestions - 1}
          rightIcon={<MoveRight size={14} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function formatType(type: string): string {
  const labels: Record<string, string> = {
    TRUE_FALSE_NG: "True / False / Not Given",
    YES_NO_NG: "Yes / No / Not Given",
    MULTIPLE_CHOICE: "Multiple Choice",
    MATCHING_HEADINGS: "Matching Headings",
    MATCHING_INFORMATION: "Matching Information",
    MATCHING_FEATURES: "Matching Features",
    MATCHING_SENTENCE_ENDINGS: "Matching Sentence Endings",
    SENTENCE_COMPLETION: "Sentence Completion",
    NOTE_TABLE_FLOWCHART_SUMMARY: "Note / Table / Flow Chart / Summary",
    DIAGRAM_LABEL: "Diagram Label Completion",
    SHORT_ANSWER: "Short Answer Questions",
  };
  return labels[type] ?? type;
}
