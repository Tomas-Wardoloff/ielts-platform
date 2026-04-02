"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  MatchingInformationContent,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function MatchingInformation({ question, userAnswer, onAnswer }: Props) {
  const content = question.content as MatchingInformationContent;

  const handleSelect = (statementId: string, paragraphId: string) => {
    onAnswer({ ...userAnswer, [statementId]: paragraphId });
  };

  return (
    <div className="space-y-3">
      <p className="mb-4 text-xs text-gray-500">
        Match each statement to the paragraph (A, B, C...) where the information
        appears. A paragraph may be used more than once.
      </p>
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
            {content.paragraphs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
