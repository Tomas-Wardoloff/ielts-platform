"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  MatchingSentenceEndingsContent,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function MatchingSentenceEndings({
  question,
  userAnswer,
  onAnswer,
}: Props) {
  const content = question.content as MatchingSentenceEndingsContent;

  const handleSelect = (beginningId: string, endingId: string) => {
    onAnswer({ ...userAnswer, [beginningId]: endingId });
  };

  const usedEndings = Object.values(userAnswer) as string[];

  return (
    <div className="space-y-5">
      <div className="space-y-1.5 rounded-lg bg-gray-50 p-3">
        <p className="mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          Sentence endings
        </p>
        {content.endings.map((e) => (
          <div key={e.id} className="flex items-start gap-2">
            <span className="min-w-[16px] text-xs font-semibold text-gray-400">
              {e.id}.
            </span>
            <span className="text-xs text-gray-600">{e.text}</span>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {content.beginnings.map((b, i) => (
          <div key={b.id} className="space-y-1.5">
            <div className="flex items-start gap-2">
              <span className="text-brand min-w-[16px] text-xs font-semibold">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-gray-700">{b.text}</p>
            </div>
            <select
              value={(userAnswer[b.id] as string) ?? ""}
              onChange={(e) => handleSelect(b.id, e.target.value)}
              className="focus:border-brand w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-colors outline-none"
            >
              <option value="">Select an ending...</option>
              {content.endings.map((e) => (
                <option
                  key={e.id}
                  value={e.id}
                  disabled={
                    usedEndings.includes(e.id) && userAnswer[b.id] !== e.id
                  }
                >
                  {e.id}. {e.text}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
