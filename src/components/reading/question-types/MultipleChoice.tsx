"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  MultipleChoiceContent,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function MultipleChoice({ question, userAnswer, onAnswer }: Props) {
  const content = question.content as MultipleChoiceContent;

  const handleSelect = (optionId: string) => {
    onAnswer({ answer: optionId });
  };

  return (
    <div className="space-y-3">
      <p className="mb-4 text-sm leading-relaxed font-medium text-gray-800">
        {content.question}
      </p>
      {content.options.map((opt) => {
        const selected = userAnswer.answer === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
              selected
                ? "bg-brand-light border-brand"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <span
              className={`mt-0.5 min-w-[16px] text-xs font-bold ${selected ? "text-brand" : "text-gray-400"}`}
            >
              {opt.id}
            </span>
            <span
              className={`text-sm leading-relaxed ${selected ? "text-brand" : "text-gray-700"}`}
            >
              {opt.text}
            </span>
          </button>
        );
      })}
    </div>
  );
}
