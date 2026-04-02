"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  MatchingFeaturesContent,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function MatchingFeatures({ question, userAnswer, onAnswer }: Props) {
  const content = question.content as MatchingFeaturesContent;

  const handleSelect = (statementId: string, featureId: string) => {
    onAnswer({ ...userAnswer, [statementId]: featureId });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5 rounded-lg bg-gray-50 p-3">
        <p className="mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          {content.category}
        </p>
        {content.features.map((f) => (
          <div key={f.id} className="flex items-start gap-2">
            <span className="min-w-[16px] text-xs font-semibold text-gray-400">
              {f.id}.
            </span>
            <span className="text-xs text-gray-600">{f.text}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {content.statements.map((stmt, i) => (
          <div key={stmt.id} className="flex items-start gap-3">
            <span className="text-brand mt-2.5 min-w-[16px] text-xs font-semibold">
              {i + 1}
            </span>
            <p className="flex-1 text-sm leading-relaxed text-gray-700">
              {stmt.text}
            </p>
            <select
              value={(userAnswer[stmt.id] as string) ?? ""}
              onChange={(e) => handleSelect(stmt.id, e.target.value)}
              className="focus:border-brand w-20 shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm transition-colors outline-none"
            >
              <option value="">—</option>
              {content.features.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
