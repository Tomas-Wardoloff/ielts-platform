"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  SentenceCompletionContent,
  ContentSegment,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function SentenceCompletion({ question, userAnswer, onAnswer }: Props) {
  const content = question.content as SentenceCompletionContent;

  const handleChange = (blankId: string, value: string) => {
    onAnswer({ ...userAnswer, [blankId]: value });
  };

  const renderSegments = (
    segments: ContentSegment[],
    sentenceIndex: number
  ) => {
    return segments.map((seg, i) => {
      if (seg.type === "text") {
        return (
          <span key={i} className="text-sm text-gray-700">
            {seg.value}
          </span>
        );
      }
      return (
        <input
          key={i}
          type="text"
          value={(userAnswer[seg.id] as string) ?? ""}
          onChange={(e) => handleChange(seg.id, e.target.value)}
          className="focus:border-brand mx-1 inline-block w-32 border-b-2 border-gray-300 bg-transparent text-center text-sm transition-colors outline-none"
        />
      );
    });
  };

  return (
    <div className="space-y-5">
      {content.sentences?.map((sentence, i) => (
        <div
          key={i}
          className="flex flex-wrap items-center gap-y-1 leading-loose"
        >
          <span className="text-brand mr-2 text-xs font-semibold">{i + 1}</span>
          {renderSegments(sentence, i)}
        </div>
      ))}
    </div>
  );
}
