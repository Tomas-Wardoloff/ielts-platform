"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  ShortAnswerContent,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function ShortAnswer({ question, userAnswer, onAnswer }: Props) {
  const content = question.content as ShortAnswerContent;

  const handleChange = (questionId: string, value: string) => {
    onAnswer({ ...userAnswer, [questionId]: value });
  };

  return (
    <div className="space-y-4">
      {content.questions.map((q, i) => (
        <div key={q.id} className="space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="text-brand mt-0.5 min-w-[16px] text-xs font-semibold">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-gray-700">{q.text}</p>
          </div>
          <input
            type="text"
            value={(userAnswer[q.id] as string) ?? ""}
            onChange={(e) => handleChange(q.id, e.target.value)}
            placeholder="Type your answer..."
            className="focus:border-brand ml-5 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors outline-none"
          />
        </div>
      ))}
    </div>
  );
}
