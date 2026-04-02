"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  MatchingHeadingsContent,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function MatchingHeadings({ question, userAnswer, onAnswer }: Props) {
  const content = question.content as MatchingHeadingsContent;

  const handleSelect = (paragraphId: string, headingId: string) => {
    onAnswer({ ...userAnswer, [paragraphId]: headingId });
  };

  const usedHeadings = Object.values(userAnswer) as string[];

  return (
    <div className="space-y-5">
      <div className="space-y-1.5 rounded-lg bg-gray-50 p-3">
        <p className="mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          List of headings
        </p>
        {content.headings.map((h) => (
          <div key={h.id} className="flex items-start gap-2">
            <span className="min-w-[16px] text-xs font-semibold text-gray-400">
              {h.id}.
            </span>
            <span className="text-xs text-gray-600">{h.text}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {content.paragraphs.map((para) => {
          const selected = userAnswer[para.id] as string | undefined;
          const selectedHeading = content.headings.find(
            (h) => h.id === selected
          );

          return (
            <div key={para.id} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-brand text-xs font-semibold">
                  Paragraph {para.id}
                </span>
              </div>
              <select
                value={selected ?? ""}
                onChange={(e) => handleSelect(para.id, e.target.value)}
                className="focus:border-brand w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-colors outline-none"
              >
                <option value="">Select a heading...</option>
                {content.headings.map((h) => (
                  <option
                    key={h.id}
                    value={h.id}
                    disabled={usedHeadings.includes(h.id) && selected !== h.id}
                  >
                    {h.text}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
