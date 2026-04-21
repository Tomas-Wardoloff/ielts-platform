"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  MultipleChoiceContent,
} from "@/types/exercise";
import { Button } from "@/components/ui/Button";

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
          <Button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            variant={selected ? "secondary" : "outline"}
            className={`h-auto w-full items-start! justify-start! gap-3 px-4 py-3 ${selected ? "border-brand border" : ""
              }`}
          >
            <span
              className={`mt-0.5 min-w-[16px] text-xs font-bold ${selected ? "text-brand" : "text-gray-400"}`}
            >
              {opt.id}
            </span>
            <span
              className={`text-left text-sm leading-relaxed font-normal whitespace-normal ${selected ? "text-brand" : "text-gray-700"}`}
            >
              {opt.text}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
