"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  TrueFalseNGContent,
  YesNoNGContent,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];
type TFValue = "TRUE" | "FALSE" | "NOT GIVEN" | "YES" | "NO";

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function TrueFalseNG({ question, userAnswer, onAnswer }: Props) {
  const content = question.content as TrueFalseNGContent | YesNoNGContent;
  const isYesNo = question.type === "YES_NO_NG";
  const options: { label: string; value: TFValue }[] = isYesNo
    ? [
        { label: "Yes", value: "YES" },
        { label: "No", value: "NO" },
        { label: "NG", value: "NOT GIVEN" },
      ]
    : [
        { label: "True", value: "TRUE" },
        { label: "False", value: "FALSE" },
        { label: "NG", value: "NOT GIVEN" },
      ];

  const handleSelect = (statementId: string, value: TFValue) => {
    onAnswer({ ...userAnswer, [statementId]: value });
  };

  return (
    <div className="space-y-4">
      {content.statements.map((stmt, i) => (
        <div key={stmt.id} className="flex items-start gap-3">
          <span className="text-brand mt-0.5 min-w-4 text-xs font-semibold">
            {i + 1}
          </span>
          <p className="flex-1 text-sm leading-relaxed text-gray-700">
            {stmt.text}
          </p>
          <div className="flex shrink-0 gap-1.5">
            {options.map((opt) => {
              const selected = userAnswer[stmt.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(stmt.id, opt.value)}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    selected
                      ? "bg-brand-light border-brand text-brand"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
