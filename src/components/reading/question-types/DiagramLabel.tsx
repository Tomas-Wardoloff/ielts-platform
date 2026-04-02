"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  DiagramLabelContent,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function DiagramLabel({ question, userAnswer, onAnswer }: Props) {
  const content = question.content as DiagramLabelContent;

  const handleChange = (labelId: string, value: string) => {
    onAnswer({ ...userAnswer, [labelId]: value });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-gray-600 italic">
        {content.diagramDescription}
      </p>

      {content.options && (
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
            Word bank
          </p>
          <div className="flex flex-wrap gap-2">
            {content.options.map((opt, i) => (
              <span
                key={i}
                className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600"
              >
                {opt}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {content.labels.map((label, i) => (
          <div key={label.id} className="flex items-center gap-3">
            <span className="text-brand min-w-[24px] text-xs font-semibold">
              {i + 1}
            </span>
            {label.hint && (
              <span className="text-xs text-gray-400 italic">{label.hint}</span>
            )}
            <input
              type="text"
              value={(userAnswer[label.id] as string) ?? ""}
              onChange={(e) => handleChange(label.id, e.target.value)}
              placeholder="Type your answer..."
              className="focus:border-brand flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
